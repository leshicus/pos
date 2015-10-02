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
                itemcontextmenu: function (view, rec, node, index, e) {
                    if (view.panel.getSelectionModel().hasSelection()) {
                        e.stopEvent(); // * чтобы не показывалось нативное меню хрома
                        // * не показывать действия для чужой кассы
                        if (!rec.get('other_cash')) {
                            var menu = Ext.create('Office.view.timeline.contextmenu.MenuTimelineV');
                            menu.showAt(e.getXY());
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

    onPressLoupe: function () {
        this.searchTimeline();
    },

    onChangeTerm: function (field, n, o) {
        if (!n && o)
            this.resetAll();
    },

    // * поиск ТЛ по критерию, указанному в строке поиска
    searchTimeline: function () {
        var mainController = Office.app.getController('Main'),
            grid = Ext.ComponentQuery.query('gridtimeline')[0],
            _this = this,
            successFn = function (store, records, operation, success) {
                if (records[0]) {
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
                        fontSize = '15px',
                        color = parseInt(isResident) ? '#2BA13E' : '#ff3300',
                        resident = parseInt(isResident) ? 'резидент' : 'не резидент',
                        passport = parseInt(isResident) ? (passportSer + ' №' + passportNom) : (' №' + passport_number);

                    fio = '<span style="color:' + color + ';font-size: ' + fontSize + ';">' + fio + '</span>';
                    passport = '<span style="color:' + color + ';font-size: ' + fontSize + ';">' + passport + '</span>';
                    mobile_phone = '<span style="color:' + color + ';font-size: ' + fontSize + ';">' + mobile_phone + '</span>';
                    resident = '<span style="color:' + color + ';font-size: ' + fontSize + ';">' + resident + '</span>';

                    grid.getViewModel().set('fio', fio);
                    grid.getViewModel().set('passport', passport);
                    grid.getViewModel().set('phone', mobile_phone);
                    grid.getViewModel().set('resident', resident);
                }
            },
            failureFn = function () {
                _this.resetAllButTerm();
            };
        mainController.storeLoadVm(grid, successFn, failureFn);
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

    onCellclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
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
            height: 550,
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

    onCellDblclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        if (record.get('enabled') == 1 && record.get('is_blacklisted') == 0 && record.get('is_demo') == 0) {
            var gridSearch = Ext.ComponentQuery.query('gridsearch')[0],
                selected = record,
                window = gridSearch.up('window');

            var passport_number = selected.get('passport_number'),
                is_resident = selected.get('is_resident'),
                passport_issue_datetime = selected.get('passport_issue_datetime');

            if (parseInt(is_resident)) {
                // * приведем формат полей к тому, как они хранятся в форме
                selected.set('passer', Gui.getPassportSerie(passport_number, is_resident));
                selected.set('pasnom', Gui.getPassportNumber(passport_number, is_resident));
            } else {
                selected.set('pasnom', passport_number);
            }
            selected.set('passport_issue_datetime', Gui.formatPassportIssueDate(passport_issue_datetime));

            var formTimeline = Ext.create('Office.view.timeline.FormTimelineV', {
                    viewModel: {
                        data: {
                            theClient: selected
                        }
                    }
                }),
                formCard = formTimeline.down('formcard');

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
        } else {
            var str = record.get('enabled') != 1 ? 'не активен; ' : '';
            str += record.get('is_blacklisted') == 1 ? 'в черном списке; ' : '';
            str += record.get('is_demo') == 1 ? 'демо; ' : '';

            Util.toast('Внимание', 'Нельзя создать таймлайн: ' + str);
        }
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
