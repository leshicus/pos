Ext.define('Office.view.fill.live.GridEventLiveC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.fill.contextmenu.MenuGridCoeffV',
        //'Office.view.fill.coeff.TemplatesWeb'
    ],
    alias: 'controller.grideventlive',

    onRender: function (grid) {
        var grid = this.getView(),
            fill = grid.up('#main');
        fill.getController().onRender(grid);
    },

    onEventStoreChange: function (store) {
        var activeTabIndex = BasketF.getActiveTabIndexEvent(),
            grid = Ext.ComponentQuery.query('grideventlive')[activeTabIndex];

        // * отфильтруем виды спорта в фильтре по видам спорта
        if (grid.getItemId() != 'rats') {
            this.filterSports();
        }
    },

    /* загрузка данных из апи в модель, и приведение их понятному для ??? виду */
    // * rawdata store load
    loadRawData: function (store, records) {
        var grid = this.getView(),
            vmLive = grid.getViewModel(),
            eventstore = vmLive.getStore('eventstore');

        if (!records || !records.length) {
            records = store.getRange();
        }

        if (records && records.length) {
            var matchdata = records[0].get('matchdata'),
                objDiffs = records[0].get('diffs'),
                dayExpress = records[0].get('dayExpress'); // * Экспресс дня

            if (matchdata) { // * full
                var objData = matchdata['data'], // * полная линия
                    arrDiffs = matchdata['diffs'],// * изменения, их нужно будет смержить в основную коллекцию
                    curLineVers = matchdata['current_line_version']; // * номер текущей линии

                // * блок matchdata.data
                ApplyChangedData.loadMatchdataData(objData, curLineVers, grid);

                // * блок matchdata.diffs
                ApplyChangedData.loadDiffs(arrDiffs, grid);
            } else if (objDiffs) { // * diffs
                ApplyChangedData.loadDiffs(objDiffs, grid);
            } else if (dayExpress) { // * dayexpress
                ApplyChangedData.loadDayExpress(dayExpress, grid);
            }

            if(vmLive.get('firstFillFromLocal')){
                BasketF.fillBasketFromLocal(grid, 100);
                vmLive.set('firstFillFromLocal',0);
            }
        }
    },

    filterSports: function () {
        var grid = this.getView(),
            vm = grid.getViewModel(),
            sport_chained = vm.getStore('sport_chained'),
            storeEvent = vm.getStore('eventstore'),
            arrSports = Ext.Array.pluck(Ext.Array.pluck(storeEvent.getRange(), 'data'), 'sport_id'),
            arrSportUniq = Ext.Array.unique(arrSports);

        if (sport_chained) {
            sport_chained.clearFilter();
            sport_chained.addFilter({
                filterFn: function (item) {
                    if (Ext.Array.contains(arrSportUniq, Number(item.get('id'))))
                        return true;
                }
            });
            grid.getView().refresh();
        }
    },

    // * выбрали событие
    onSelect: function (row, record, idx) {
        var gridLive = this.getView(),
            fill = Ext.ComponentQuery.query('#main')[0],
            modeCoeff = fill.down('#modeCoeff'),
            tabEvent = fill.down('#eventstab'),
            activeTabId = BasketF.getActiveTabEventId();

        if (record) {
            if (activeTabId == 'rats') {// * крысы
                var date = new Date(record.get('time')),
                    dateStr = Ext.Date.format(date, 'd F G:i');
                title = record.get('tournament_name') + ', забег № ' + record.get('short_number') + ' (' + dateStr + ')';
                MarketsHtml.ratsClick(gridLive, record);
            } else {
                var activeTab = tabEvent.getActiveTab();
                if (activeTab && activeTab.getItemId() == gridLive.getItemId()) {
                    var title = record.get('home') + ' - ' + record.get('away');
                    setTimeout(function () { // * чтобы эта ф-ия не тормозила выполнения последующего кода
                        MarketsHtml.eventTypeFirstClick(gridLive, record);
                    }, 10);
                }
            }
            if (title)
                fill.getViewModel().set('title', title);

            // * запишем номер события в быстрый ввод и переведем туда курсор
            var fastInput = fill.down('#fastInput');
            fastInput.setValue(record.get('short_number') + ' ');
            //fastInput.focus(); // * иначе при вводе серии ставок курсор переводится на поле быстрого ввода
        }
    },

    // * поменяли выделение в гриде событий
    onSelectionChange: function (view, selected) {
        var selection = this.getView().getSelectionModel().getSelection();
        if (!selection.length) {
            FillF.resetCenterArea();
        }
    },

    //selectView: function (v) {
    //    var grid = Ext.ComponentQuery.query('gridcoeff')[0],
    //        vm = grid.getViewModel();
    //    Ext.defer(function () {
    //        grid.getView().setScrollY(vm.get('scrollPosition'), false);
    //    }, 20);
    //},

    // * дата и время матча
    dateText: function (val, column, rec) {
        var eventIdText3 = UtilMarkets.durationText(rec.getData());
        if (eventIdText3 != '00:00')
            return val + '<br>' + eventIdText3;
        else
            return val;
    },

    onKeydown: function (field, e) {
        this.onAddFilter(field);
    },

    onAddFilter: function (field, n, o, e) {
        Ext.defer(function () {
            var gridLive = this.getView(),
                vm = gridLive.getViewModel(),
                arrChecked = vm.get('filters.cbSport'),
                filterEvent = vm.get('filters.filterEvent'),
                storeLive = gridLive.store,
            //storeLive = gridLive.getViewModel().getStore('eventstore_chained'),//todo в 5.1.2 поменять на eventstore_chained, т.к. пофиксили баг
            //storeLive = gridLive.getViewModel().getStore('eventstore'),//todo в 5.1.2 поменять на eventstore_chained, т.к. пофиксили баг
                all = 0;
            storeLive.clearFilter();

            if (arrChecked && arrChecked.length) {
                storeLive.filterBy(function (item) {
                    var sport_id = item.get('sport_id');
                    if (Util.in_array(sport_id, arrChecked, false)
                        || Util.in_array(all, arrChecked, false)
                        || arrChecked.length == 0)
                        return true;
                });
            }
            if (filterEvent) {
                storeLive.filterBy(function (item) {
                    var home = item.get('home'),
                        away = item.get('away');
                    if (home && home.toString().toLowerCase().indexOf(filterEvent.toLowerCase()) > -1)
                        return true;
                    if (away && away.toString().toLowerCase().indexOf(filterEvent.toLowerCase()) > -1)
                        return true;
                });
            }
        }, 100, this);
    }
});
