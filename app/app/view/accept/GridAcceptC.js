Ext.define('Office.view.accept.GridAcceptC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.accept.AcceptF',
        'Office.view.accept.contextmenu.MenuAcceptV',

    ],
    alias: 'controller.gridaccept',
    listen: {
        store: {
            '#accept': {
                load: function (store, arr) {
                    var mainController = Office.app.getController('Main');
                    if (mainController.askLogoutIfAccessDenied(store)) {
                        // * такая вот самоделка, пока не сделают штатную summary для treepanel
                        // * задержка, чтобы стор полностью успел загрузиться, т.к. метод срабатывает тут же, как только появилась хоть одна запись
                        var me = this.getView();
                        //todo строка ИТОГ
                        //Ext.defer(function () {
                        //if (store.getCount() > 0) {
                        //    var total = '<span style="font-weight: bold">ИТОГ</span>',
                        //        recTotalId = store.findBy(function (rec, id) {
                        //            if (rec.get('operation').indexOf('ИТОГ') > 0)
                        //                return true;
                        //        }),
                        //        recTotal = store.getAt(recTotalId);
                        //    if (recTotal) { // * итог уже существует- обновляем
                        //        var config = {
                        //            //stake: '<span style="font-weight: bold">' + Util.getSummary(store, 'stake') + '</span>',
                        //            //balance_change: '<span style="font-weight: bold">' + Util.getSummary(store, 'balance_change') + '</span>'
                        //        };
                        //        recTotal.set(config);
                        //        //recTotal.commit();
                        //    } else { // * итог добавляем
                        //        // * добавка строки с итогами в конце
                        //        var summaryRec = me.getViewModel().getStore('accept').add({
                        //            operation: total,
                        //            leaf: true,
                        //            children: null,
                        //            expanded: false,
                        //            stake: '<span style="font-weight: bold">' + Util.getSummary(store, 'stake') + '</span>',
                        //            balance_change: '<span style="font-weight: bold">' + Util.getSummary(store, 'balance_change') + '</span>'
                        //        })[0];
                        //        //summaryRec.set(config);
                        //        //summaryRec.commit();
                        //    }
                        //}


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
                        //}, 100, this);
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
                    e.stopEvent(); // * чтобы не показывалось нативное меню Хрома

                    var menu = Ext.ComponentQuery.query('menuaccept')[0];

                    if (!menu)
                        menu = Ext.create('Office.view.accept.contextmenu.MenuAcceptV');

                    menu.showAt(e.getXY());

                    rec = rec.getData();

                    // * печать
                    if (this.enablePrint(rec))
                        menu.down('#menuPrint').enable();

                    // * подтвердить
                    if (this.enableConfirm(rec))
                        menu.down('#menuConfirm').enable();

                    // * копировать
                    if (this.enableCopy(rec))
                        menu.down('#menuCopy').enable();

                    // * выкуп
                    if (this.enableBuyout(rec))
                        menu.down('#menuBuyout').enable();

                    // * фикс. возврат
                    if (this.enableReturn(rec))
                        menu.down('#menuReturn').enable();
                }
                return false;
            }
        },
        'tool[type=refresh]': {
            click: function (tool) {
                var grid = tool.up('panel');
                grid.store.reload();
                grid.getView().refresh();
            }
        },
        // * Скрыть/Раскрыть Экспрессы
        'tool[type=maximize]': {
            click: Util.treeCollapse
        },
        // * очистка фильтров в grid column header
        'tool[type=close]': {
            click: function (button) {
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

    enablePrint: function (rec) {
        if ((rec.result_text == 'в игре'
            || (this.isTimelineSlip(rec) && rec.cls == 'timeline_payed_out'))
            && (rec.stake != "")) {
            if (this.isTimelineSlip(rec)) {
                var tmpStr = rec.paid;
            } else {
                var tmpStr = rec.made_datetime;
            }

            tmpStr = tmpStr.replace(/\./gi, '/');
            var fromDateTime = new Date(tmpStr);
            var addTime;

            if (rec.reject_or_approve_datetime != '0000-00-00 00:00:00') {
                addTime = Util.getGlobalConst('SLIP_CONFIRMED_PRINT_MINUTES');
            } else {
                addTime = (rec.is_live == 'Нет') ? Util.getGlobalConst('SLIP_DUPLICATE_PRINT_MINUTES') : Util.getGlobalConst('SLIP_LIVE_DUPLICATE_PRINT_MINUTES');
            }

            fromDateTime.setTime(fromDateTime.getTime() + addTime * 1000 * 60);
            var currentDateTime = new Date(Date.parse(new Date())); // todo разобраться с timezone
            // var currentDateTime = new Date(Date.parse(new Date()) + ( 111 - offsetTimeJS) * 3600 * 1000);//new Date();

            var showIt = currentDateTime.getTime() < fromDateTime.getTime();

            if (!showIt && rec.reject_or_approve_datetime != '0000-00-00 00:00:00') {
                var rejectOrAcceptDateTime = new Date(rec.reject_or_approve_datetime);
                rejectOrAcceptDateTime.setTime(rejectOrAcceptDateTime.getTime() + addTime * 1000 * 60);
                showIt = currentDateTime.getTime() < rejectOrAcceptDateTime.getTime();
            }

            if (showIt) {
                return true;
            }
        }
    },

    enableReturn: function (rec) {
        var tmpStr = rec.made_datetime;
        tmpStr = tmpStr.replace(/\./gi, '/');
        var madeDateTime = new Date(tmpStr);
        var addTime = Util.getGlobalConst('TIME_FOR_DELETING_STAKE');
        madeDateTime.setTime(madeDateTime.getTime() + addTime * 1000);
        var currentDateTime = new Date();
        var countSubSlips = 0,
            _this = this;

        var getSlip = function () {
            var objUrl = {
                    class: 'Pos_Timeline_Subslipstree',
                    params: {
                        timelineId: rec.slip_id
                    }
                },
                flag = false;

            Ext.Ajax.request({
                url: Server.getUrl(objUrl),
                async: false, // * !!! синхронный запрос
                success: function (response) {
                    var checkUserRes = Gui.JSONDecodeSafe(response.responseText);

                    // * как я понимаю, проверяется, что по ТЛ были ставки. Тогда не показывать Возврат
                    for (var i = 0; i < checkUserRes.length; i++) {
                        if (checkUserRes[i].is_live != "") {
                            countSubSlips++;
                        }
                    }
                    if (rec.status != 6) {
                        if ((rec.result_text == 'ожидает подтверждения' && rec.sport != 'SPORT_RATS')
                            || (currentDateTime.getTime() < madeDateTime.getTime() && rec.sport != 'SPORT_RATS' && rec.is_live == 'Нет' && rec.stake != "" && rec.result_text == 'в игре')
                            || (_this.isTimelineSlip(rec) && rec.result_text == '' && currentDateTime.getTime() < madeDateTime.getTime() && rec.is_live == 'Нет' && rec.stake != "" && rec.status != "11" && rec.is_timeline_closed != 1 && countSubSlips == 0)) {
                            flag = true;
                        }
                    }
                },
                failure: function (response) {
                    Util.warnMes('Не загружены данные по ставкам');
                },
                method: 'POST',
                scope: this
            });
            return flag;
        }

        if (this.isTimelineSlip(rec)) {
            return getSlip();
        } else {
            if (rec.status != 6) {// * STS_WAITING
                if ((rec.result_text == 'ожидает подтверждения' && rec.sport != 'SPORT_RATS')
                    || (currentDateTime.getTime() < madeDateTime.getTime() && rec.sport != 'SPORT_RATS' && rec.is_live == 'Нет' && rec.stake != "" && rec.result_text == 'в игре')
                    || (this.isTimelineSlip(rec) && rec.result_text == '' && currentDateTime.getTime() < madeDateTime.getTime() && rec.is_live == 'Нет' && rec.stake != "" && rec.status != "11" && rec.is_timeline_closed != 1 && countSubSlips == 0)) {
                    return true;
                }
            }
        }
    },

    // * выкуп
    enableBuyout: function (rec) {
        var source = typeof(rec.source) != 'undefined' ? rec.source : 3;

        if (rec.stake != ""
            && rec.coefficient != ""
            && rec.result_text == 'в игре'
            && typeof(rec.type) != 'undefined'
            && (rec.type == 0 || rec.type == 1)
            && typeof(rec.sport) != 'undefined'
            && rec.sport != 'SPORT_RATS'
            && rec.status != '10'
            && source == 3) {
            return true;
        }
    },

    enableCopy: function (rec) {
        if (rec.stake != "" && (rec.coefficient != "" || rec.initial_coeff) && (rec.fin_datetime == '0000-00-00 00:00:00') && !this.isTimelineSlip(rec)) { // 5 = TIMELINE, 6 = TIMELINE_GAME
            return true;
        }
    },

    enableConfirm: function (rec) {
        if (rec.stake != ""
            && rec.coefficient != ""
            && rec.result_text == 'ожидает подтверждения'
            && !this.isTimelineSlip(rec)) {
            return true;
        }
    },

    isTimelineSlip: function (slip) {
        return (slip.type == 5) || (slip.type == 6);
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
        /* var tip = rec.get('qtip') || '-';
         if (rec.get('qtipTitle'))
         tip += ' | ' + rec.get('qtipTitle');
         view.up('gridaccept').down('#tipTarget').update(tip);*/
    },
    // * сделал централизованную обработку фильтров, т.к. понадобится так же в других разделах
    onAddFilter: function (field, n, o, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView(),
            store = grid.getViewModel().getStore('accept');
        grid.getEl().mask('Загрузка...');
        mainController.storeLoadVm(grid);
    },

    onClearFilterVm: function (field, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView();
        mainController.onClearFilterVm(field, e, grid.store, grid);
    },

    // * ошибка при загрузке стора
    onProxyException: function (proxy, response, options) {
        console.info(arguments);
        Util.erMes(response.status + ": " + response.statusText);
    }
    //showBalance: function (store, records, successful, operation, node, eOpts) {
    //    var grid = Ext.ComponentQuery.query('gridaccept')[0];
    //    grid.getEl().unmask();
    //
    //    var objUrl = {
    //        class: 'Pos_Sessions_Lastsessioninfo'
    //    };
    //    Ext.Ajax.request({
    //        url: Server.getUrl(objUrl),
    //        success: function (response) {
    //            var session = Ext.decode(response.responseText),
    //                cashBalance = grid.down('#cashBalance');
    //            cashBalance.setValue(session.currentSumInCash);
    //        },
    //        failure: function (response) {
    //            Util.warnMes('Не загружены данные о смене: ошибка сервера');
    //        },
    //        method: 'POST',
    //        scope: this
    //    });
    //}


});
