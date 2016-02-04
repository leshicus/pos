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
        this.getUnfinishedLimitedTimelines(values);
    },

    // * получить список неоконченных таймлайнов
    getUnfinishedLimitedTimelines: function (values) {
        var window = Ext.ComponentQuery.query('#windowSearch')[0],
            formtimeline = window.down('formtimeline'),
            type = formtimeline.down('#type').getValue(),
            sum = formtimeline.down('#sum').getValue(),
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

    onClickSave: function () {
        var window = Ext.ComponentQuery.query('#windowSearch')[0],
            formtimeline = window.down('formtimeline'),
            formcard = formtimeline.down('formcard').getForm(),
            values = formcard.getRecord().getData();
        if (formcard.isValid() && formtimeline.getForm().isValid()) {
           // values['passport_number'] = values['passer'] + values['pasnom'];
            // * сохраним изменения персональных данных клиента
            this.saveClientData(values);
        }else{
            Util.erMes(Config.STR_FORM_ERROR);
        }
    },

    onClickCancel: function (button) {
        var window = button.up('window');
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

    onTypeRender: function (field) {
        Util.validate(field);
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
            var selected = this.getView().getViewModel().get('theClient');

            var formKladr = Ext.create('Office.view.card.FormKladrV');
            formKladr.getViewModel().set('theClient', selected.get('player'));

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

    onAfterRender: function (form) {
        var formTimeline = Ext.ComponentQuery.query('formtimeline')[0],
            term = formTimeline.down('#sum');
        term.focus();

        var formcard = formTimeline.down('formcard');

        FormCardF.afterRender(formcard);
    }

});
