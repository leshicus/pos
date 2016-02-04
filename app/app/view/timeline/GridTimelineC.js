Ext.define('Office.view.timeline.GridTimelineC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.timeline.FormTimelineV',
        'Office.view.timeline.contextmenu.MenuTimelineV',
        'Office.view.timeline.FormUserSearchV'
    ],
    alias: 'controller.gridtimeline',
    listen: {
        component: {
            '#': {
                // * показ контекстного меню
                itemcontextmenu: function (view, record, node, index, e) {
                    if (view.panel.getSelectionModel().hasSelection()) {
                        e.stopEvent(); // * чтобы не показывалось нативное меню хрома
                        // * не показывать действия для чужой кассы и для закрытых ТЛ
                        if (!record.get('other_cash') && record.get('status') != 4) {
                            var menu = Ext.ComponentQuery.query('menutimeline')[0];
                            if (!menu)
                                menu = Ext.create('Office.view.timeline.contextmenu.MenuTimelineV');

                            menu.showAt(e.getXY());

                            if (!parseInt(record.get('is_timeline_closed'))) {
                                menu.down('#menuBill').enable();
                            }

                            menu.down('#menuHist').enable();

                            if (record.get('status') == 1 || record.get('status') == 7) {
                                menu.down('#menuBalance').enable();
                                menu.down('#menuWithdraw').enable();
                            }

                            if (record.get('timeline_limit') > 0 && ((record.get('status') == 1) || (record.get('status') == 7))) {
                                menu.down('#menuPayin').enable();
                                menu.down('#menuClose').enable();
                            }
                        }
                    }
                    return false;
                }
            },
            'tool[type=refresh]': {
                click: function (tool) {
                    var grid = tool.up('panel'),
                        gridslip = Ext.ComponentQuery.query('gridslip')[0];
                    if (grid.getViewModel().get('filters.term')) {
                        grid.store.reload();
                        gridslip.store.removeAll();
                        gridslip.getView().refresh();
                    }
                }
            },
            'tool[type=close]': {
                click: function (tool) {
                    this.resetAll();
                }
            }
        },
        store: {
            '#timeline': {
                load: function (store, arr, success, resp) {
                    var mainController = Office.app.getController('Main');
                    if (mainController.askLogoutIfAccessDenied(store)) {
                        if (resp._response) {
                            var o = Ext.decode(resp._response.responseText);
                            if (!success) {
                                Util.erMes(o.errors[0] || o.message);
                            }
                            // * посмотрим, а вообще пользователь-то есть
                            if (!o.results) { // * пустой результат
                                var grid = Ext.ComponentQuery.query('gridtimeline')[0],
                                    term = grid.getViewModel().getData().filters.term,
                                    objUrl = {
                                        class: 'Pos_Timeline_Checkuserbyphone',
                                        params: {
                                            term: term
                                        }
                                    };
                                Ext.Ajax.request({
                                    url: Server.getUrl(objUrl),
                                    success: function (response) {
                                        try {
                                            var resp = Ext.decode(response.responseText),
                                                id = resp.children.id;
                                            if (id) {
                                                var text = 'Пользователь ' + term + ' найден в системе, id = ' + resp.children.id + '. Таймлайнов нет.';
                                            } else {
                                                var text = 'Пользователь не найден в системе.';
                                            }
                                            Util.erMes(text);
                                        } catch (e) {
                                            return;
                                        }
                                    },
                                    failure: function (response) {
                                        try {
                                            var mes = Ext.decode(response.responseText);
                                            Util.erMes(mes);
                                        } catch (e) {
                                            return;
                                        }
                                    },
                                    method: 'POST'
                                });
                            }
                        }
                    }
                }
            }
        }
    },

    // * сбросить все данные
    resetAll: function () {
        var grid = Ext.ComponentQuery.query('gridtimeline')[0],
            gridslip = Ext.ComponentQuery.query('gridslip')[0],
            vm = grid.getViewModel();

        this.resetAllButTerm();

        vm.set('filters.term', null);
        vm.set('filters.includeArchieved', null);
    },

    resetAllButTerm: function () {
        var grid = Ext.ComponentQuery.query('gridtimeline')[0],
            gridslip = Ext.ComponentQuery.query('gridslip')[0],
            vm = grid.getViewModel();

        vm.getStore('timeline').removeAll();

        if (gridslip) {
            gridslip.getViewModel().getStore('slip').removeAll();
            gridslip.getView().refresh();
        }

        vm.set('fio', null);
        vm.set('passport', null);
        vm.set('phone', null);
        vm.set('resident', null);
    },

    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            this.searchTimeline();
        }
    },

    onChangeTerm: function (field, n, o) {
        if (!n && o)
            this.resetAll();
    },

    // * поиск ТЛ по критерию, указанному в строке поиска
    searchTimeline: function () {
        var mainController = Office.app.getController('Main'),
            grid = Ext.ComponentQuery.query('gridtimeline')[0],
            field = grid.down('#term'),
            _this = this,
            successFn = function (store, records, operation, success) {
                if (records[0] && records[0].get('player')) {
                    var player = records[0].get('player'),
                        lastname = player.lastname,
                        firstname = player.firstname,
                        patronymic_name = player.patronymic_name,
                        mobile_phone = player.mobile_phone,
                        passport_number = player.passport_number,
                        fio = lastname + ' ' + firstname + ' ' + patronymic_name,
                        isResident = player.is_resident,
                        passportSer = Gui.getPassportSerie(passport_number, isResident),
                        passportNom = Gui.getPassportNumber(passport_number, isResident),
                        color = parseInt(isResident) ? '#2BA13E' : '#ff3300',
                        resident = parseInt(isResident) ? 'резидент' : 'не резидент',
                        passport = parseInt(isResident) ? (passportSer + ' №' + passportNom) : (' №' + passport_number);

                    grid.getViewModel().set('fio', Util.colorText(color, fio));
                    grid.getViewModel().set('passport', Util.colorText(color, passport));
                    grid.getViewModel().set('phone', Util.colorText(color, mobile_phone));
                    grid.getViewModel().set('resident', Util.colorText(color, resident));
                } else {
                    Util.warnMes('ТЛ не найдены');
                    return false;
                }
            },
            failureFn = function () {
                _this.resetAllButTerm();
            };

        _this.resetAllButTerm();

        Ext.defer(function () { // * поле в комбике не успевает выбраться, и отправляется старое значение
            var value = field.getRawValue();
            if (value) {
                grid.getViewModel().set('filters.term', value);

                // * выберем №ТЛ из списка ранее введенных ТЛ или сохраним туда новое значение
                var storeSearch = grid.getViewModel().getStore('search'),
                    recSearch = storeSearch.findRecord('query', value, 0, false, true, true);
                if (!recSearch) {
                    // * сохраним введенные данные в локальное хранилище
                    var newRec = storeSearch.insert(0, {query: value});
                    field.select(newRec);

                    if (storeSearch.count() >= Config.LOCALSTORAGE_ROWS_MAX_CNT) {
                        storeSearch.removeAt(Config.LOCALSTORAGE_ROWS_MAX_CNT - 1);
                    }
                } else {
                    field.select(recSearch);
                }

                // * применим фильтр
                Ext.defer(function () {
                    mainController.storeLoadVm(grid, successFn, failureFn);
                }, 10, this);
            }
        }, 100, this);
    },

    /* onIncludeArchieved: function (field, n, o, e) {
     var mainController = Office.app.getController('Main'),
     grid = this.getView();
     grid.getViewModel().set('filters.includeArchieved', field.getValue());
     Ext.defer(function () {
     mainController.onAddFilterVm(field, null, null, null, true, grid.store, grid);
     }, 10);
     },*/

    /*onClearFilter: function (field, e) {
     var mainController = Office.app.getController('Main'),
     grid = this.getView();
     mainController.onClearFilterVm(field, e, grid.store, grid);
     },79261539419*/

    onCellClick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        var mainController = Office.app.getController('Main'),
            gridTimeline = Ext.ComponentQuery.query('gridtimeline')[0],
            gridSlip = Ext.ComponentQuery.query('gridslip')[0],
            selected = gridTimeline.getSelectionModel().getSelection()[0],
            timelineId = selected.get('id'),
            other_cash = selected.get('other_cash'),
            vmSlip = gridSlip.getViewModel();

        if (other_cash) {
            timelineId = null;
            gridSlip.store.removeAll();
            gridSlip.getView().refresh();
        } else {
            var limit = gridSlip.down('#limit');
            limit.select(100);

            vmSlip.set('filters.timelineId', timelineId);
            mainController.storeLoadVm(gridSlip);
        }
    },

    // * кнопка Отмена в Поиске игроков
    //onClickCancel: function (button) {
    //    var win = button.up('window');
    //    win.close();
    //},

    onAddTimeline: function () {
        var window = Ext.create('Ext.Window', {
            width: 1130,
            height: 580,
            autoScroll: true,
            title: 'Поиск игроков',
            defaultFocus: "term",
            constrain: true,
            itemId: 'windowSearch',
            modal: true,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'formusersearch'
                }
            ]
        });
        window.show();

        // * переопределение ф-ий в gridsearch::controller на те, что описаны в данном контроллере
        var gridsearch = window.down('gridsearch');
        gridsearch.getController().onCellDblclick = this.onCellDblclick;
        gridsearch.getController().loadSearchTimelineGambler = this.loadSearchTimelineGambler;
    },

    // * общий код- сделал для того, чтобы меньше копипасты было
    //cellDblClickCommon: function (diffCode,record) {
    //    var isDemoCash = Util.getGlobalProp('is_demo');
    //
    //    if (record.get('enabled') == 1
    //        && record.get('is_blacklisted') == 0
    //        && (record.get('is_demo') == 0 && isDemoCash == 0
    //        || record.get('is_demo') == 1 && isDemoCash == 1)) {
    //        var gridSearch = Ext.ComponentQuery.query('gridsearch')[0],
    //            selected = record,
    //            window = gridSearch.up('window');
    //
    //        var passport_number = selected.get('passport_number'),
    //            is_resident = selected.get('is_resident'),
    //            passport_issue_datetime = selected.get('passport_issue_datetime'),
    //            birthday = selected.get('birthday');
    //
    //        if (parseInt(is_resident)) {
    //            // * приведем формат полей к тому, как они хранятся в форме
    //            selected.set('passer', Gui.getPassportSerie(passport_number, is_resident));
    //            selected.set('pasnom', Gui.getPassportNumber(passport_number, is_resident));
    //        } else {
    //            selected.set('pasnom', passport_number);
    //        }
    //        selected.set('passport_issue_datetime', Gui.formatPassportIssueDate(passport_issue_datetime));
    //        selected.set('birthday', Gui.formatPassportIssueDate(birthday));
    //
    //        diffCode(selected,window);
    //
    //
    //    } else {
    //        var arr = [];
    //        if (record.get('enabled') != 1)
    //            arr.push('не активен');
    //        if (record.get('is_blacklisted') == 1)
    //            arr.push('в черном списке');
    //        if (record.get('is_demo') == 1)
    //            arr.push('демо');
    //        if (record.get('is_demo') == 0)
    //            arr.push('не демо');
    //
    //        Util.warnMes('Нельзя выбрать игрока: ' + arr.join(','));
    //    }
    //},

    // * Поиск игрока: дважды щелкнули на ячейке с найденным игроком
    onCellDblclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        // * различающийся код
        function diffCode(selected, window) {
            var formTimeline = Ext.create('Office.view.timeline.FormTimelineV', {
                viewModel: {
                    data: {
                        theClient: selected
                    }
                }
            });

            var formCard = formTimeline.down('formcard');

            // * не надо показывать поле штрихкод
            var fieldBarcode = formCard.down('#barcode');
            fieldBarcode.setDisabled(true);

            // * сделать поле Телефон обязательным
            var fieldPhone = formCard.down('#mobile_phone');
            fieldPhone.allowBlank = false;

            formCard.loadRecord(selected);

            window.setTitle('Параметры таймлайн');

            window.removeAll();
            window.add(formTimeline);

            window.setWidth(900);

            // * сделать не пустые поля не редактируемыми
            Ext.defer(function () { // * без задержки не успевают проставиться признаки
                formCard.getController().setNotEditable();
            }, 100);
        }

        // * общий код
        FormCardF.cellDblClickCommon(diffCode, record);
    },

    loadSearchTimelineGambler: function (store, records) {
        if (!records.length)
            Util.erMes('Игрок не найден');
        else if (records.length == 1) {
            Ext.defer(function () {// * иначе какая-то ошибка возникает
                var gridtimeline = Ext.ComponentQuery.query('gridtimeline')[0];
                gridtimeline.getController().onCellDblclick(null, null, null, records[0]);
            }, 100, this);
        }
    },

    onAfterRender: function (form) {
        var term = form.down('#term');
        term.focus();
    }

});
