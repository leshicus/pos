Ext.define('Office.view.accept.GridAcceptC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.accept.contextmenu.MenuAcceptV'
    ],
    alias: 'controller.gridaccept',
    listen: {
        store: {
            '#accept': {
                load: function (store, arr) {
                    var mainController = Office.app.getController('Main');
                    if(mainController.askLogoutIfAccessDenied(store)){
                        // * такая вот самоделка, пока не сделают штатную summary для treepanel
                        // * задержка, чтобы стор полностью успел загрузиться, т.к. метод срабатывает тут же, как только появилась хоть одна запись
                        var me = this.getView();
                        //todo строка ИТОГ почему-то не видна до ресайза окна
                        Ext.defer(function () {
                            if (store.getCount() > 0) {
                                var total = '<span style="font-weight: bold">ИТОГ</span>',
                                    recTotalId = store.findBy(function (rec, id) {
                                        if (rec.get('operation').indexOf('ИТОГ') > 0)
                                            return true;
                                    }),
                                    recTotal = store.getAt(recTotalId);
                                if (recTotal) { // * итог уже существует- обновляем
                                    var config = {
                                        stake: '<span style="font-weight: bold">' + Utilities.getSummary(store, 'stake') + '</span>',
                                        balance_change: '<span style="font-weight: bold">' + Utilities.getSummary(store, 'balance_change') + '</span>'
                                    };
                                    recTotal.set(config);
                                    recTotal.commit();
                                } else { // * итог добавляем
                                    // * добавка строки с итогами в конце
                                    var summaryRec = me.getViewModel().getStore('accept').add({
                                        operation: total,
                                        leaf: true,
                                        children: null,
                                        expanded: false,
                                        stake: '<span style="font-weight: bold">' + Utilities.getSummary(store, 'stake') + '</span>',
                                        balance_change: '<span style="font-weight: bold">' + Utilities.getSummary(store, 'balance_change') + '</span>'
                                    })[0];
                                    //summaryRec.set(config);
                                    summaryRec.commit();
                                }
                            }


                            // * замена штатных иконок дерева на точечки
                            /*Ext.Array.forEach(arr, function (item) {
                             var children = item.get('children');
                             if (children) { // * дочерние элементы экспресса
                             //item.set("iconCls","icon-express");
                             item.set("iconCls", "icon-folder");
                             Ext.Array.forEach(children, function (item) {
                             if (item.leaf == true) {
                             item.iconCls = "icon-odinar";
                             } else {
                             item.iconCls = "icon-express";
                             }
                             })
                             } else { // * одинары
                             if (item.get('leaf') == true) {
                             item.set('iconCls', "icon-odinar");
                             } else {
                             item.set('iconCls', "icon-express");
                             }
                             }
                             });*/
                        }, 100, this);
                    }

                }
            }
        }
    },

    control: {
        '#': {
            // * контекстное меню в гриде Принятые
            itemcontextmenu: function (view, rec, node, index, e) {
                if (view.panel.getSelectionModel().hasSelection()) {
                    e.stopEvent(); // * чтобы не показывалось
                    var menu = Ext.create('Office.view.accept.contextmenu.MenuAcceptV');
                    menu.showAt(e.getXY());
                    //if (rec.get('is_in_play')) { // * печать
                    menu.down('#menuPrint').enable();
                    //}
                    if (rec.get('can_approve')) { // * подтвердить
                        menu.down('#menuConfirm').enable();
                    }
                    if ((rec.get('stake') != ""
                        && rec.get('coefficient') != ""
                            /*&& !Office.util.UtilitiesUx.betIsCalculated(rec.get('result_text'))*/)
                    /*&& !Office.util.UtilitiesUx.isTimelineSlip(rec)*/) { // * копировать
                        menu.down('#menuCopy').enable();
                    }
                    if (rec.get('can_buy_back')) { // * выкуп
                        menu.down('#menuBuyout').enable();
                    }
                    if (rec.get('can_buy_back')) { // * фикс. возврат
                        menu.down('#menuReturn').enable();
                    }
                }
                return false;
            }
        },
        'tool[type=refresh]': {
            click: function (tool) {
                console.log('refresh');
                var grid = tool.up('panel');
                grid.store.reload();
            }
        },
        // * Скрыть/Раскрыть Экспрессы
        'tool[type=maximize]': {
            click: Utilities.treeCollapse
        },
        // * очистка фильтров в grid column header
        'tool[type=close]': {
            click: function (button) {
                console.log('tool[type=close]');
                var grid = button.up('panel'),
                    mainController = Office.app.getController('Main');
                mainController.resetFilters(grid);
            }
        },
        // * искать можно либо по дате Совершения, либо по дате Рассчета
        // * соответственно когда вводим один вид даты, второй нужно очистить в фильтре.
        // * вид даты передается параметром cbDateType =0/1
        'containerdatetime #cbDateFromMade, #cbTimeFromMade, #cbDateToMade, #cbTimeToMade': { // , #cbDateTo, #cbTimeTo
            select: function (field, n, o, e) {
                console.info('containerdatetime change');
                var grid = field.up('containerdatetime ^ gridaccept'),
                    _cbDateType = field._cbDateType,
                    vm = grid.getViewModel();
                vm.set('filters.cbDateType', _cbDateType);
                vm.set('filters.cbDateFromCalc', null);
                vm.set('filters.cbTimeFromCalc', null);
                vm.set('filters.cbDateToCalc', null);
                vm.set('filters.cbTimeToCalc', null);
            }
        },
        'containerdatetime #cbDateFromCalc, #cbTimeFromCalc, #cbDateToCalc, #cbTimeToCalc': { // , #cbDateTo, #cbTimeTo
            select: function (field, n, o, e) {
                console.info('containerdatetime change');
                var grid = field.up('containerdatetime ^ gridaccept'),
                    _cbDateType = field._cbDateType,
                    vm = grid.getViewModel();
                vm.set('filters.cbDateType', _cbDateType);
                vm.set('filters.cbDateFromMade', null);
                vm.set('filters.cbTimeFromMade', null);
                vm.set('filters.cbDateToMade', null);
                vm.set('filters.cbTimeToMade', null);
            }
        }

    },

    onEnter: function (field, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView().up('container').down('gridaccept');
        mainController.storeLoadVm(grid);
    },
    // * раскрывает содержимое ячейки (нужно когда длинный текст не помещается в ячейке)
    onCelldblclick: function (cell, td, cellIndex, record, tr, rowIndex, e) {
        var mainController = Office.app.getController('Main');
        mainController.onCelldblclick(cell, td, cellIndex, record, tr, rowIndex, e);
    },
    // * отслеживаем перемещение мышы, для показывания tooltip в bbar при наведении на строку грида
    onItemmouseenter: function (view, rec) {
        var tip = rec.get('qtip') || '-';
        if (rec.get('qtipTitle'))
            tip += ' | ' + rec.get('qtipTitle');
        view.up('gridaccept').down('#tipTarget').update(tip);
    },
    // * сделал централизованную обработку фильтров, т.к. понадобится так же в других разделах
    onAddFilter: function (field, n, o, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView(),
            store = grid.getViewModel().getStore('accept');
        mainController.storeLoadVm(grid);
    },

    onClearFilterVm: function (field, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView();
        // mainController.onClearFilter(field, e, grid.store);
        mainController.onClearFilterVm(field, e, grid.store, grid);
    },

    // * ошибка при загрузке стора
    onProxyException: function (proxy, response, options) {
        console.info(arguments);
        Ext.MessageBox.alert('Error', response.status + ": " + response.statusText);
    }


});
