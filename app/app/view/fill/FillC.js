Ext.define('Office.view.fill.FillC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.fill',
    listen: {
        component: {
            '#': {},
            'tool[type=refresh]': {
                click: function (button, e, panel) {
                    console.log('refresh');
                    var tabpanel = panel.down('tabpanel'),
                        gridline = tabpanel.down('gridline'),
                        gridlive = tabpanel.down('gridlive'),
                        comboSportLine = gridline.down('combocheck').down('combo'),
                        comboSportLive = gridlive.down('combocheck').down('combo'),
                        vmline = gridline.getViewModel(),
                        vmlive = gridlive.getViewModel(),
                        storeRawDataLine = vmline.getStore('rawdata'),
                        storeRawDataLive = vmlive.getStore('rawdata');
                    comboSportLive.reset();
                    comboSportLine.reset();
                    storeRawDataLine.clearFilter();
                    storeRawDataLive.clearFilter();
                    gridline.mask('Загружаем...');
                    gridlive.mask('Загружаем...');
                    Ext.defer(function () {
                        storeRawDataLine.reload({
                            callback: function () {
                                gridline.unmask();
                            }
                        });
                        storeRawDataLive.reload({
                            callback: function () {
                                gridlive.unmask();
                            }
                        });
                    }, 10);

                }
            },
            // * Скрыть/Раскрыть Экспрессы
            'tool[type=maximize]': {
                click: function (button, e, panel) {
                    var tabpanel = panel.down('tabpanel'),
                        tree = tabpanel.getActiveTab();
                    Utilities.treeCollapse(button, e, tree);
                }
            }

        },
        store: {}
    },

    loadSportStore: function (store, recs, grid) {
        console.info('loadSportStore');
        var comboSportCheck = grid.down('combocheck'),
            comboSport = comboSportCheck.down('combo'),
            storeSport = comboSport.store;
        // * отфильтруем виды спорта в соответствии с пришедшими данными о чемпионатах
        storeSport.clearFilter();
        storeSport.filterBy(function (item) {
            var id = item.get('id');
            return store.findRecord('sport_id', id, 0, false, true, true);
        });
    },

    /*onAddFilter: function (field, n, o, e, storeId, grid) {
        var store = grid.getViewModel().getStore(storeId);
        store.clearFilter();
        if (n.length > 0) {
            store.filterBy(function (item) {
                var sport_id = item.get('sport_id'),
                    children = item.get('children');
                if (item.get('id') == 'root') { // * а то рут фильтровался
                    return true;
                } else {
                    return Utilities.in_array(sport_id, n, 0);
                }
            });
        }
    },*/

    /* загрузка данных из апи в модель, и приведение их понятному для дерева виду */
    loadRawData: function (store, recs, grid) {
        console.info('loadAjaxEvents');
        //console.info(arguments);
        var vmLive = grid.getViewModel();

        var arrTournamentsOut = Array();

        // * внутри arr находятся obj
        if (recs.length > 0) { // * имеются турниры
            Ext.Array.each(recs, function (recTournamentIn) {
                var objTournamentOut = {},
                    arrEventOut = Array(),
                    arrEventIn = recTournamentIn.get('events');
                objTournamentOut['name'] = recTournamentIn.get('name');
                objTournamentOut['sport_id'] = recTournamentIn.get('sport_id');
                if (arrEventIn.length > 0) { // * имеются события
                    objTournamentOut['leaf'] = false;
                    Ext.Array.each(arrEventIn, function (objEventIn) {
                        var objEventOut = {};
                        objEventOut['leaf'] = true;
                        objEventOut['sport_id'] = recTournamentIn.get('sport_id');
                        objEventOut['name'] = objEventIn['home'] + ' - ' + objEventIn['away'];
                        arrEventOut.push(objEventOut);
                    });
                    objTournamentOut['children'] = arrEventOut;
                } else {
                    objTournamentOut['leaf'] = true;
                }
                arrTournamentsOut.push(objTournamentOut);
            });
        }

        var objRoot = {};
        objRoot['children'] = arrTournamentsOut;
        vmLive.set('sourceJson', objRoot);
        vmLive.set('line_version', store.totalCount);

        Ext.defer(function () {
            vmLive.getStore('line').load();
        }, 20);
    },
    onRender: function (grid) {
        // * без задержки пишет, что стор = null
        Ext.defer(function () {
            var vm = grid.getViewModel(),
                storeRawdata = vm.getStore('rawdata');
            if (storeRawdata) {
                grid.mask('Загружаем...');
                storeRawdata.load({
                    callback: function () {
                        grid.unmask();
                    }
                });
            }
        }, 10);
    },

    onAddFilter: function (field, n, o, e) {
        Ext.defer(function(){
            var fillContainer = this.getView(),
                vm = fillContainer.getViewModel(),
                arrChecked = vm.get('filters.cbSport'),
                gridLive = fillContainer.down('gridlive'),
                gridLine = fillContainer.down('gridline'),
                storeLive = gridLive.store,
                storeLine = gridLine.store,
                all = 0;
            storeLive.clearFilter();
            storeLive.filterBy(function (item) {
                var sport_id = item.get('sport_id');
                if ( Utilities.in_array(sport_id, arrChecked, false) || Utilities.in_array(all, arrChecked, false))
                    return true;
            });
            storeLine.clearFilter();
            storeLine.filterBy(function (item) {
                var sport_id = item.get('sport_id');
                if ( Utilities.in_array(sport_id, arrChecked, false) || Utilities.in_array(all, arrChecked, false))
                    return true;
            });
        },10, this);

    },

    onClearFilterVm: function (field, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView();
        // mainController.onClearFilter(field, e, grid.store);
        mainController.onClearFilterVm(field, e, grid.store, grid);
    }


});
