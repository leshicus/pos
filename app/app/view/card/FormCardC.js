Ext.define('Office.view.card.FormCardC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.card.FormKladrV'
    ],
    alias: 'controller.formcard',

    control: {},
    onClickSave: function (button) {
        var window = button.up('window'),
            form = window.down('form'),
            values = form.getValues(),
            grid = Ext.ComponentQuery.query('gridcard')[0],
            vm = grid.getViewModel(),
            store = vm.getStore('card'),
            vmForm = form.getViewModel(),
            selected = vmForm.getData().theClient,
            mainController = Office.app.getController('Main'),
            player,
            objUrlBarcode = {
                class: 'Pos_Barcode_Update',
                params: {
                    player: player,
                    barcode: values['barcode'],
                    edit_player: 1
                }
            },
            callbackBarcodeUpdate = function (opt, success, response) {
                if (response.responseText) {
                    var respBarcode = Ext.decode(response.responseText);
                    if (respBarcode.success) {
                        Util.warnMes('Штрих-код сохранен');
                        window.close();
                        //  store.commitChanges();
                    } else {
                        Util.erMes(respBarcode.mes);
                    }
                } else {
                    //store.rejectChanges();
                    Util.erMes('Штрих-код не сохранен');
                }

                Util.initClassParams({
                    scope: grid,
                    params: [
                        'filters.userid',
                        'filters.lastname',
                        'filters.firstname',
                        'filters.passport_number',
                        'filters.barcode'
                    ]
                });
                vm.set('filters.lastname', values['lastname']);
                //vm.set('filters.barcode', values['barcode']);
                mainController.storeLoadVm(grid);
            },
            callbackSavebypassportUpdate = function (opt, success, response) {
                if (response.responseText) {
                    var respUpdate = Ext.decode(response.responseText);
                    if (respUpdate.success) {
                        if (values['barcode']) {
                            Ext.Ajax.request({
                                url: Server.getUrl(objUrlBarcode),
                                method: 'POST',
                                callback: callbackBarcodeUpdate
                            });
                        } else {
                            Util.toast('Успех', 'Данные сохранены');
                            mainController.storeLoadVm(grid);
                            window.close();
                        }
                    } else {
                        //store.rejectChanges();
                        Util.erMes(respUpdate.message);
                    }
                } else {
                    //store.rejectChanges();
                    Util.erMes('Данные не сохранены');
                }
            },
            callbackSavebypassportNew = function (opt, success, response) {
                if (response.responseText) {
                    //var respUpdate = Ext.decode(response.responseText);
                    var respUpdate = Gui.JSONDecodeSafe(response.responseText);
                    if (respUpdate && respUpdate.success) {
                        if (values['barcode']) {
                            Ext.Ajax.request({
                                url: Server.getUrl(objUrlBarcode),
                                method: 'POST',
                                callback: callbackBarcodeUpdate
                            });
                        } else {
                            Util.initClassParams({
                                scope: grid,
                                params: [
                                    'filters.userid',
                                    'filters.lastname',
                                    'filters.firstname',
                                    'filters.passport_number',
                                    'filters.barcode'
                                ]
                            });
                            vm.set('filters.lastname', values['lastname']);
                            mainController.storeLoadVm(grid);
                        }

                        Util.infoMes('Добавлен новый пользователь с ID ' + respUpdate.user_id);
                        window.close();
                        //store.commitChanges();
                        //vm.set('filters.barcode', values['barcode']);
                    } else {
                        //store.rejectChanges();
                        Util.erMes(respUpdate.mes || response.responseText);
                    }
                } else {
                    //store.rejectChanges();
                    Util.erMes('Данные не сохранены');
                }
            };

        if (form.getForm().isValid()) {
            if (selected) {
                player = selected.getData();
            } else {
                player = values;
            }
            player['passport_number'] = values['passer'] + values['pasnom'];

            var objUrl = {
                class: 'Pos_Players_Savewithoutpassport',
                //class: 'Pos_Players_Savebypassport',
                params: {
                    player: player
                }
            };
            //if (selected.get('id').indexOf(Util.extModel) != -1) {// * новый пользователь
            if (selected.get('id') == 0) {// * новый пользователь
                Ext.Ajax.request({
                    url: Server.getUrl(objUrl),
                    method: 'POST',
                    callback: callbackSavebypassportNew
                });
            } else {  // * исправление
                Ext.Ajax.request({
                    url: Server.getUrl(objUrl),
                    method: 'POST',
                    callback: callbackSavebypassportUpdate
                });
            }
        }
    },

    onClickCancel: function (button) {
        var form = button.up('form'),
            window = form.up('window'),
            grid = Ext.ComponentQuery.query('gridcard')[0];
        if (grid) {
            var selected = grid.getSelectionModel().getSelection()[0];

            if (selected)
                selected.reject();
            else {
                //grid.store.rejectChanges();
                grid.store.remove(grid.store.getById(0));
            }
        }

        window.close();
    },

    onClickEditAdress: function (field, val) {
        var formCard = field.up('formcard'),
        //address = formCard.down('#address'),
            address = formCard.getViewModel().getData().theClient.get('address'),
            grid = Ext.ComponentQuery.query('gridcard')[0];
        if (grid) {
            //var selected = grid.getSelectionModel().getSelection()[0];
            var formKladr = Ext.create('Office.view.card.FormKladrV', {
                viewModel: {
                    data: {
                        theAddress: address
                    }
                }
            });
            var window = Ext.create('Ext.Window', {
                width: 400,
                title: 'Заполнение адреса',
                constrain: true,
                closable: false,
                modal: true,
                layout: 'fit'
            });
            window.add(formKladr);
            window.show();
        }
    },

    // * преобразование сероНомера паспорта в серию
    onPasSerChange: function (field, newValue, oldValue) {
        if (newValue && newValue.length == 10) {
            var val = newValue.substr(0, 4);
            field.setValue(val);
        }
    },
    // * преобразование сероНомера паспорта в номер
    onPasNomChange: function (field, newValue, oldValue) {
        if (newValue && newValue.length == 10) {
            var val = newValue.substr(-6, 6);
            field.setValue(val);
        }
    },
    convertCkeckboxValue: function (field, val) {
        var grid = Ext.ComponentQuery.query('gridcard')[0];
        if (grid) {
            var selected = grid.getSelectionModel().getSelection()[0],
                name = field.getName();
            if (selected) {
                if (val)
                    selected.set(name, '1');
                else
                    selected.set(name, '0');
            }
        }
    },

    // * переключает allowBlank для passer в зависимости от is_resident
    makePasserRequired: function (e, input) {
        var form = Ext.ComponentQuery.query('formcard')[0],
            passer = form.down('#passer'),
            fieldResident = form.down('#is_resident'),
            is_resident = fieldResident.getValue(),
            pasnom = form.down('#pasnom');

        passer.allowBlank = !is_resident;
        pasnom.setReadOnly(false);

        if (!is_resident) { // * такой изврат, т.к. нельзя сделать disabled- так значение поля не будет передаваться при form::submit
            passer.addCls('x-item-disabled');
            passer.setReadOnly(true);
        } else {
            passer.removeCls('x-item-disabled');
            passer.setReadOnly(false);
        }
    },

    onAfterRender: function (form) {
        Ext.defer(function () {// * задержка должна быть больше 100мс
            var form = Ext.ComponentQuery.query('formcard')[0],
                passer = form.down('#passer'),
                fieldResident = form.down('#is_resident'),
                is_resident = fieldResident.getValue();

            if (!is_resident) { // * такой изврат, т.к. нельзя сделать disabled- так значение поля не будет передаваться при form::submit
                passer.addCls('x-item-disabled');
                passer.setReadOnly(true);
            } else {
                passer.removeCls('x-item-disabled');
            }
        }, 200, this);
    },

    // * сделать заполненные поля не редактируемыми
    setNotEditable: function () {
        var form = this.getView(),
            objFields = form.getForm().getValues(),
            field = '',
            editableResidentFlag = false; // * признак, давать ли редактировать признак Резидент

        Ext.Object.each(objFields, function (key, val) {
            var id = '#' + key;
            field = form.down(id);
            if (field && val && key != 'barcode'/*&& key != 'passer'&& key != 'pasnom'*/) {
                field.setReadOnly(true);

                if (key == 'address') {
                    // * скрыть кнопку КЛАДР
                    var buttonKladr = form.down('#buttonKladr');
                    buttonKladr.disable();
                }
            } else {
                if (key != 'barcode')
                    editableResidentFlag = true;
                field.setReadOnly(false);
            }
            // * признак Резидент нужно давать редактировать, если есть хоть одно другое редактируемое поле
            if (editableResidentFlag) {
                form.down('#is_resident').setReadOnly(false);
            }

            field.suspendEvent('specialkey');
        });
    },
    onChooseUser: function () {
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

            var formCard = Ext.ComponentQuery.query('formcard')[0];

            formCard.getViewModel().set('theClient', selected);
            formCard.loadRecord(selected);
            window.close();

            // * сделать не пустые поля не редактируемыми
            Ext.defer(function () { // * без задержки не успевают проставиться признаки
                formCard.getController().setNotEditable();
            }, 100);
        } else {
            var str = record.get('enabled') != 1 ? 'не активен; ' : '';
            str += record.get('is_blacklisted') == 1 ? 'в черном списке; ' : '';
            str += record.get('is_demo') == 1 ? 'демо; ' : '';

            Util.toast('Внимание', 'Нельзя выполнить операцию: ' + str);
        }

    },

    loadSearchTimelineGambler: function (store, records) {
        if (!records.length)
            Util.erMes('Игрок не найден');
        else if (records.length == 1) {


            Ext.defer(function () {// * иначе какая-то ошибка возникает
                this.onCellDblclick(null, null, null, records[0]);
            }, 100, this);
        }
    },


});
