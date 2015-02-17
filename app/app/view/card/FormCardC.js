Ext.define('Office.view.card.FormCardC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.card.FormKladrV'
    ],
    alias: 'controller.formcard',

    listen: {
        component: {
            '#': {

            }
        }
    },
    onClickSave: function (button) {
        var window = button.up('window'),
            form = window.down('form').getForm(),
            values = form.getValues(),
            rec = form.getRecord(),
            grid = Ext.ComponentQuery.query('gridcard')[0],
            vm = grid.getViewModel(),
            store = vm.getStore('card'),
            vmForm = window.down('form').getViewModel(),
            selected = vmForm.getData().theClient,
            mainController = Office.app.getController('Main'),
            player,
            callbackBarcodeUpdate = function (opt, success, response) {
                if (response.responseText) {
                    var respBarcode = Ext.decode(response.responseText);
                    if (respBarcode.success) {
                        Utilities.toast('Успех', 'Штрих-код сохранен');
                        store.commitChanges();
                    } else {
                        Ext.Msg.alert('Ошибка', respBarcode.mes);
                    }
                } else {
                    store.rejectChanges();
                    Ext.Msg.alert('Ошибка', 'Штрих-код не сохранен');
                }
                Utilities.initClassParams({
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
                vm.set('filters.barcode', values['barcode']);
                mainController.storeLoadVm(grid);
            },
            callbackSavebypassportUpdate = function (opt, success, response) {
                if (response.responseText) {
                    var respUpdate = Ext.decode(response.responseText);
                    if (respUpdate.success) {
                        if (values['barcode']) {
                            var objUrlBarcode = {
                                class: 'Pos_Barcode_Update',
                                params: {
                                    player: player,
                                    barcode: values['barcode'],
                                    edit_player: 1
                                }
                            };
                            Ext.Ajax.request({
                                url: Server.getUrl(objUrlBarcode),
                                method: 'POST',
                                callback: callbackBarcodeUpdate
                            });
                        } else {
                            Utilities.toast('Успех', 'Данные сохранены');
                        }
                    } else {
                        store.rejectChanges();
                        Ext.Msg.alert('Ошибка', respUpdate.message);
                    }
                } else {
                    store.rejectChanges();
                    Ext.Msg.alert('Ошибка', 'Данные не сохранены');
                }
            },
            callbackSavebypassportNew = function (opt, success, response) {
                if (response.responseText) {
                    var respUpdate = Ext.decode(response.responseText);
                    if (respUpdate.success) {
                        Utilities.toast('Успех', 'Добавлен новый пользователь с ID ' + respUpdate.user_id);
                        store.commitChanges();
                        Utilities.initClassParams({
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
                        vm.set('filters.barcode', values['barcode']);
                        mainController.storeLoadVm(grid);
                    } else {
                        store.rejectChanges();
                        Ext.Msg.alert('Ошибка', respUpdate.message);
                    }
                } else {
                    store.rejectChanges();
                    Ext.Msg.alert('Ошибка', 'Данные не сохранены');
                }
            };

        if (form.isValid()) {
            if (selected) {
                player = selected.getData();
            } else {
                player = values;
            }
            player['passport_number'] = values['passer'] + values['pasnom'];
            var objUrl = {
                class: 'Pos_Players_Savebypassport',
                params: {
                    player: player
                }
            };
            if (selected.get('id').indexOf(Utilities.extModel) != -1) {// * новый пользователь
                console.info('новый пользователь');
                Ext.Ajax.request({
                    url: Server.getUrl(objUrl),
                    method: 'POST',
                    callback: callbackSavebypassportNew
                });
            } else {  // * исправление
                console.info('исправление');
                Ext.Ajax.request({
                    url: Server.getUrl(objUrl),
                    method: 'POST',
                    callback: callbackSavebypassportUpdate
                });
            }
            window.close();
        }
    },
    onClickCancel: function (button) {
        var form = button.up('form'),
            window = form.up('window');
        var grid = Ext.ComponentQuery.query('gridcard')[0],
            selected = grid.getSelectionModel().getSelection()[0];
        if (selected)
            selected.reject();
        else
            grid.store.rejectChanges();
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
    }


});
