Ext.define('Office.view.timeline.FormTimelineC', {
    //extend: 'Ext.app.ViewController',
    extend: 'Office.view.card.FormCardC',
    requires: [
        'Office.view.card.FormKladrV',
        'Office.view.card.FormCardC',
        'Office.view.timeline.FormSmsCodeV',
        'Ext.window.Toast'
    ],
    alias: 'controller.formtimeline',

    //onDestroy: function (form) {
    //    console.info(arguments);
    //    var vm = form.getViewModel(),
    //        theStake = vm.get('theStake');
    //    theStake.reject();
    //},

    //onClickBack: function (button) {
    //    var formTimeline = this.getView(),
    //        layout = formTimeline.getLayout();
    //    layout.setActiveItem('card-1');
    //},

    createSmsForm: function (timeline) {
        var formsmscode = Ext.create('Office.view.timeline.FormSmsCodeV', {
                viewModel: {
                    data: {
                        theTimeline: timeline
                    }
                }
            }),
            win = new Ext.window.Window({
                title: 'Введите код',
                modal: true,
                closable: false,
                constrain: true,
                width: 360,
                itemId: 'windowSms',
                defaultButton: 'code',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    formsmscode
                ],
                buttons: Util.getButtonsSaveCancel({
                    scope: formsmscode.getController()
                })
            });
        win.show();
    },

    createTimelineRequest: function (objUrlCreate) {
        var window = Ext.ComponentQuery.query('#windowSearch')[0],
            grid = Ext.ComponentQuery.query('gridtimeline')[0],
            _this = this;
        window.getEl().mask(Util.maskText);
        Ext.Ajax.request({
            url: Server.getUrl(objUrlCreate),
            method: 'POST',
            callback: function (opt, success, response) {
                window.getEl().unmask();
                var timelineResp = Ext.decode(response.responseText),
                    result = timelineResp.result,
                    timeline = result.timeline;
                if (timelineResp.success) {
                    if (result.smsCodeSentTo) {
                        grid.getViewModel().set('thePhone', result);
                        // * ввод смс кода
                        _this.createSmsForm(timeline);
                    } else {
                        Util.erMes('Не заполнен номер телефона');
                    }
                } else {
                    Util.erMes(timelineResp.errors[0]);
                }
            }
        });
    },

    // * создание таймлайн
    createTimeline: function (values) {
        //var window = Ext.ComponentQuery.query('#windowSearch')[0];
        //formtimeline = window.down('formtimeline'),
        //type = formtimeline.down('#type').getValue(),
        //sum = formtimeline.down('#sum').getValue(),
        //ttl = formtimeline.down('#ttl').getValue();
        //var objUrlCreate = {
        //    class: 'Pos_Timeline_Create',
        //    params: {
        //        player: values,
        //        type: type,
        //        sum: sum,
        //        ttl: ttl
        //    }
        //};

        this.getUnfinishedLimitedTimelines(values);
        //this.createTimelineRequest(objUrlCreate);
    },

    // * получить список неоконченных таймлайнов
    getUnfinishedLimitedTimelines: function (values) {
        var window = Ext.ComponentQuery.query('#windowSearch')[0],
            formtimeline = window.down('formtimeline'),
            type = formtimeline.down('#type').getValue(),
            sum = formtimeline.down('#sum').getValue(),
        //ttl = formtimeline.down('#ttl').getValue(),
            _this = this;

        window.getEl().mask(Util.maskText);

        var objUrlUnfinished = {
            class: 'Pos_Timeline_Unfinished',
            params: {
                player: values
            }
        };

        Ext.Ajax.request({
            url: Server.getUrl(objUrlUnfinished),
            method: 'POST',
            callback: function (opt, success, response) {
                window.getEl().unmask();
                if (success) {
                    var rows = Ext.decode(response.responseText);
                    var objUrlCreate = {
                        class: 'Pos_Timeline_Create',
                        params: {
                            player: values,
                            type: type,
                            sum: sum
                            //ttl: ttl
                        }
                    };

                    if (rows.length) {
                        Ext.Msg.confirm('Подтверждение', 'У выбранного игрока есть незаконченные таймлайн: ' + Ext.Array.pluck(rows, 'id').join('; ') + '<br> Все равно создать новый таймлайн?', function (btn) {
                            if (btn == 'yes') {
                                _this.createTimelineRequest(objUrlCreate);
                            } else {
                                var grid = Ext.ComponentQuery.query('gridtimeline')[0],
                                    store = grid.getViewModel().getStore('timeline');
                                store.rejectChanges();
                                window.close();
                            }
                        });
                    } else {// * нет таймлайн, продолжим
                        _this.createTimelineRequest(objUrlCreate);
                    }
                } else {
                    Util.erMes(timelineResp || response);
                }
            }
        });
    },

    // * сохраним изменения персональных данных клиента
    saveClientData: function (values) {
        var window = Ext.ComponentQuery.query('#windowSearch')[0],
            grid = Ext.ComponentQuery.query('gridtimeline')[0],
            me = this,
            objUrlPlayer = {
                class: 'Pos_Players_Save',
                params: {
                    player: values
                }
            };

        window.getEl().mask(Util.maskText);

        Ext.Ajax.request({
            url: Server.getUrl(objUrlPlayer),
            method: 'POST',
            callback: function (opt, success, response) {
                window.getEl().unmask();
                var playerResp = Ext.decode(response.responseText);
                if (playerResp.success) {
                   // Util.toast('Успех', 'Персональные данные клиента сохранены');

                    // * создадим таймлайн, если все поля заполнены
                    var formtimeline = Ext.ComponentQuery.query('formtimeline')[0],
                        type = formtimeline.down('#type').getValue(),
                        sum = formtimeline.down('#sum').getValue();
                    if (type == 'undefined') {
                        Util.erMes('Заполните поле Тип ставки');
                        return false;
                    }
                    if (!sum) {
                        Util.erMes('Заполните поле Сумма ставки');
                        return false;
                    }
                    me.createTimeline(values);
                } else {
                    grid.store.rejectChanges();
                    Util.erMes(playerResp.mes);
                }
            }
        });
    },

    onClickSave: function (button) {
        var window = button.up('window'),
            formtimeline = window.down('formtimeline'),
            formcard = formtimeline.down('formcard').getForm(),
            values = formcard.getRecord().getData();
        if (formcard.isValid()) {
            values['passport_number'] = values['passer'] + values['pasnom'];
            // * сохраним изменения персональных данных клиента
            this.saveClientData(values);
        }
    },

    onClickCancel: function (button) {
        var window = button.up('window');
            //grid = Ext.ComponentQuery.query('gridtimeline')[0],
           // store = grid.getViewModel().getStore('timeline');
        //store.rejectChanges();
        window.close();
    },

    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var mainController = Office.app.getController('Main'),
                form = this.getView(),
                gridSearch = form.down('gridsearch'),
                store = gridSearch.getViewModel().getStore('searchtimelinegambler');
            mainController.onAddFilterVm(field, null, null, null, true, store, gridSearch);
        }
    },

    // * выбрали клиента в списке поиска
    //onCellDblclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
    //    if (record.get('enabled') == 1 && record.get('is_blacklisted') == 0 && record.get('is_demo') == 0) {
    //        var gridSearch = this.getView(),
    //            selected = gridSearch.getSelectionModel().getSelection()[0],
    //            window = gridSearch.up('window'),
    //            formCard = window.down('#card-2').down('formcard'),
    //            formTimeline = window.down('formtimeline'),
    //            layout = formTimeline.getLayout();
    //        formCard.reset();
    //
    //        var passport_number = selected.get('passport_number'),
    //            is_resident = selected.get('is_resident'),
    //            passport_issue_datetime = selected.get('passport_issue_datetime');
    //
    //        if (parseInt(is_resident)) {
    //            console.info(is_resident);
    //            // * для резидентов серия паспорта обязательна
    //            var fieldPasser = formCard.down('#passer');
    //            fieldPasser.allowBlank = false;
    //
    //            // * приведем формат полей к тому, как они хранятся в форме
    //            selected.set('passer', Gui.getPassportSerie(passport_number, is_resident));
    //            selected.set('pasnom', Gui.getPassportNumber(passport_number, is_resident));
    //        } else {
    //            selected.set('pasnom', passport_number);
    //        }
    //        console.info(selected);
    //        selected.set('passport_issue_datetime', Gui.formatPassportIssueDate(passport_issue_datetime));
    //
    //        formCard.loadRecord(selected);
    //        layout.setActiveItem('card-2');
    //        window.setTitle('Параметры таймлайн');
    //
    //        // * сделать не пустые поля не редактируемыми
    //        Ext.defer(function () {
    //            Util.setNotEditable(formCard);
    //            //form.down('#is_resident').setReadOnly(true );
    //        }, 100);
    //    } else {
    //        var str = record.get('enabled') != 1 ? 'не активен; ' : '';
    //        str += record.get('is_blacklisted') == 1 ? 'в черном списке; ' : '';
    //        str += record.get('is_demo') == 1 ? 'демо; ' : '';
    //        Util.toast('Внимание', 'Нельзя создать таймлайн: ' + str);
    //    }
    //},

    //onTypeSelect: function (field, recs) {
    //    var form = this.getView(),
    //        comboLifetime = form.down('#ttl');
    //    if (field.getValue()) {
    //        comboLifetime.select(comboLifetime.getStore().getAt(0));
    //    } else {
    //        comboLifetime.reset();
    //    }
    //},

    onTypeRender: function (field) {
        var form = this.getView(),
            timelinetype = form.getViewModel().getStore('timelinetype');
        Ext.defer(function () {
            field.select(timelinetype.getAt(1));
        }, 100, this);
    },

    onClickEditAdress: function (field, val) {
        var formCard = field.up('formcard'),
            address = formCard.down('#address'),
            grid = Ext.ComponentQuery.query('gridtimeline')[0];

        if (grid) {
            var selected = grid.getSelectionModel().getSelection()[0];

            var formKladr = Ext.create('Office.view.card.FormKladrV', {
                viewModel: {
                    data: {
                        theClient: selected.get('player')
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
    }

});
