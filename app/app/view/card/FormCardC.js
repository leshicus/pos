Ext.define('Office.view.card.FormCardC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.card.FormKladrV'
    ],
    alias: 'controller.formcard',

    control: {},
    onClickSave: function (button) {
        var window = button.up('window'),
            form = window.down('form');
        // * удалим маски из полей с маской, если она там осталась (бывает, если onblur не успевает сработать)
        FormCardF.removeMask(form);

        var values = form.getValues(),
            grid = Ext.ComponentQuery.query('gridcard')[0],
            vm = grid.getViewModel(),
            store = vm.getStore('card'),
            vmForm = form.getViewModel(),
            selected = vmForm.getData().theClient,
            mainController = Office.app.getController('Main'),
            player;

            function callbackBarcodeUpdate (opt, success, response) {
                if (response.responseText) {
                    var respBarcode = Ext.decode(response.responseText);
                    if (respBarcode.success) {
                        Util.sucMes('Штрих-код сохранен');
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
                mainController.storeLoadVm(grid);
            };

            function callbackSavebypassportUpdate (opt, success, response) {
                if (response.responseText) {
                    var respUpdate = Ext.decode(response.responseText);
                    if (respUpdate.success) {
                        if (values['barcode']) {
                            var objUrlBarcode = {
                                class: 'Pos_Barcode_Update',
                                params: {
                                    player: player,
                                    barcode: values['barcode']
                                }
                            };

                            Ext.Ajax.request({
                                url: Server.getUrl(objUrlBarcode),
                                method: 'POST',
                                callback: callbackBarcodeUpdate
                            });
                        } else {
                            Util.sucMes('Данные сохранены');
                            mainController.storeLoadVm(grid);
                            window.close();
                        }
                    } else {
                        Util.erMes(respUpdate.message);
                    }
                } else {
                    Util.warnMes('Данные не сохранены');
                }
            };

            function callbackSavebypassportNew (opt, success, response) {
                if (response.responseText) {
                    var respUpdate = Gui.JSONDecodeSafe(response.responseText);

                    if (respUpdate && respUpdate.success) {
                        var mes = respUpdate.mes,
                            str = 'Добавлен новый пользователь с ID ' + respUpdate.user_id;
                        if (mes) {
                            str += '<br>' + mes;
                        }

                        if (values['barcode']) {
                            var objUrlBarcode = {
                                class: 'Pos_Barcode_Update',
                                params: {
                                    player: player,
                                    barcode: values['barcode']
                                }
                            };

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

                        Util.infoMes(str);
                        window.close();
                    } else {
                        Util.erMes(respUpdate.mes || response.responseText);
                    }
                } else {
                    Util.erMes('Данные не сохранены');
                }
            };

        if (form.getForm().isValid()) {
            if (selected) {
                player = selected.getData();
                Ext.Object.merge(player, values);
            } else {
                player = values;
            }
            //player['passport_number'] = values['passer'] + values['pasnom'];
            player['country'] = values['country'];
            //player['birthday'] = Gui.formatPassportIssueDate(Ext.Date.format(player['birthday'], 'Y-m-d'));
            var objUrl = {
                class: 'Pos_Players_Savewithoutpassport',
                params: {
                    player: player
                }
            };
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
        } else {
            Util.erMes(Config.STR_FORM_ERROR);
        }
    },

    onClickCancel: function (button) {
        var form = button.up('form'),
            window = form.up('window'),
            grid = Ext.ComponentQuery.query('gridcard')[0];
        if (grid) {
            window.close();

            var selected = grid.getSelectionModel().getSelection()[0];
            if (selected)
                selected.reject();
            else {
                grid.store.remove(grid.store.getById(0));
            }
        }
    },


    onClickEditAdress: function (field, val) {
        var formCard = field.up('formcard'),
            address = formCard.getViewModel().getData().theClient.get('address'),
            grid = Ext.ComponentQuery.query('gridcard')[0];
        if (grid) {
            var formKladr = Ext.create('Office.view.card.FormKladrV');
            formKladr.getViewModel().set('theAddress', address);

            var window = Ext.create('Ext.Window', {
                width: 400,
                title: 'Заполнение адреса',
                constrain: true,
                closable: true,
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
            vm = form.getViewModel(),
            selectedDocument = vm.get('selectedDocument'),
        //passer = form.down('#passer'),
            country = form.down('#country'),
            document_type = form.down('#document_type'),
            fieldResident = form.down('#is_resident'),
            is_resident = fieldResident.getValue(),
            pasnom = form.down('#passport_number');

        // passer.allowBlank = !is_resident;
        pasnom.setReadOnly(false);

        document_type.setReadOnly(false);

        if (is_resident) { // * такой изврат, т.к. нельзя сделать disabled- так значение поля не будет передаваться при form::submit
            country.select(643);
            //country.addCls('x-item-disabled');
            country.setReadOnly(true);
        } else {
            country.reset();
            //country.removeCls('x-item-disabled');
            country.setReadOnly(false);
        }

        //if (selectedDocument) {
        //    // * серия только для паспорта РФ
        //    if (is_resident && selectedDocument.get('id') == '21') { // * такой изврат, т.к. нельзя сделать disabled- так значение поля не будет передаваться при form::submit
        //        passer.removeCls('x-item-disabled');
        //        passer.setReadOnly(false);
        //    } else {
        //        passer.addCls('x-item-disabled');
        //        passer.setReadOnly(true);
        //    }
        //}

        // * отфильтруем типы документов
        FormCardF.filterStoreDocument(is_resident, form);
    },

    // * проставим маски ввода на серию/номер документа
    onDocumentTypeChange: function (combo) {
        var form = Ext.ComponentQuery.query('formcard')[0],
            pasnom = form.down('#passport_number');

        FormCardF.setFieldMask(pasnom);

        Ext.defer(function () {
            pasnom.focus();
        }, 10, this);
    },

    onFocus: function (pasnom) {
        if (!pasnom.readOnly && !pasnom.disabled) {
            FormCardF.setFieldMask(pasnom);
            pasnom.setValue(pasnom.plugin[0].applyFormatToString(pasnom.getValue()));
        }
    },

    onAfterRender: function (form) {
        Util.validate(form);
        FormCardF.afterRender(form);
    },

    // * сделать заполненные поля не редактируемыми. Но если информация в поле ошибочная, то можно редактировать
    setNotEditable: function () {
        var form = this.getView(),
            objFields = form.getForm().getValues(),
            field = '',
            editableResidentFlag = false; // * признак, давать ли редактировать признак Резидент

        Ext.Object.each(objFields, function (key, val) {
            var id = '#' + key;
            field = form.down(id);

            if (field) {
                if (val && key != 'barcode' && field.isValid()) {
                    field.setReadOnly(true);

                    if (key == 'address' && form.down('#address').getValue()) {
                        // * скрыть кнопку КЛАДР
                        var buttonKladr = form.down('#buttonKladr');
                        buttonKladr.disable();
                    }
                } else {
                    if (key != 'barcode')
                        editableResidentFlag = true;
                    field.setReadOnly(false);
                }

                field.suspendEvent('specialkey');
            }

            // * признак Резидент нужно давать редактировать, если есть хоть одно другое редактируемое поле
            if (editableResidentFlag) {
                form.down('#is_resident').setReadOnly(false);
            }
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
            closable: true,
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
        // * различающийся код
        function diffCode(selected, window) {
            var formCard = Ext.ComponentQuery.query('formcard')[0];

            formCard.getViewModel().set('theClient', selected);
            formCard.loadRecord(selected);
            window.close();

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
                this.onCellDblclick(null, null, null, records[0]);
            }, 100, this);
        }
    },


});
