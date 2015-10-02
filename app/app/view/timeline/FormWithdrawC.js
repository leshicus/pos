Ext.define('Office.view.timeline.FormWithdrawC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.timeline.FormSmsCodeV',
        'Ext.util.Observable'
    ],
    alias: 'controller.formwithdraw',
    listen: {
        component: {
            '#': {}
        },
        store: {}
    },
    registerClickEvent: function (field) {
        field.getEl().on('click', function () {
            var form = this.getView(),
                sumField = form.down('#sum');
            sumField.reset();
        }, this);
    },
    // * форма отправки смс
    showFormSms: function (phone, to_pay, slipId, isPrintable) {
        var objUrlXaction = {
                class: 'Pos_Pageprinter_Print',
                params: {
                    //xaction: 'checkCode',
                    slipId: slipId,
                    login: Ext.util.Cookies.get('betzet_login') || '',
                    token: Server.getToken(),
                    complexMode: 'STAKE_AND_RETURN'
                }
            },
            formsmscode = Ext.create('Office.view.timeline.FormSmsCodeV', {
                viewModel: {
                    data: {
                        theTimeline: {player: {mobile_phone: phone}},
                        slipId: slipId,
                        sum: to_pay,
                        objUrlXaction: objUrlXaction,
                        isPrintable: isPrintable
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
                    scope: formsmscode.getController(),
                    textSave: 'Отправить'
                })
            });
        win.show();
    },
    sendSms: function (button, isPrintable) {
        var formWithdraw = this.getView(),
            vmformWithdraw = formWithdraw.getViewModel(),
            slipId = vmformWithdraw.get('slipId'),
            to_pay = vmformWithdraw.get('to_pay'),
            objUrl = {
                class: 'Pos_Timeline_Xaction',
                params: {
                    xaction: 'sendSmsKeyForPayout',
                    slipId: slipId,
                    sum: to_pay
                }
            };
        Ext.Ajax.request({
            url: Server.getUrl(objUrl),
            method: 'POST',
            callback: function (opt, success, response) {
                if (response.responseText) {
                    var o = Ext.decode(response.responseText);
                    if (o.success) {
                        if (o.rows.sentTo) {
                            var phone = o.rows.sentTo;
                            this.showFormSms(phone, to_pay, slipId, isPrintable);
                        } else
                            Util.erMes('Сервер не прислал номер телефона');
                    } else {
                        Util.erMes(o.errors[0]);
                    }
                } else {
                    Util.erMes('Нет ответа от сервера');
                }
            },
            scope: this
        });
    },
    // * печать с чеком. Форма отправки смс
    onClickPayPrint: function (button) {
        var formWithdraw = this.getView(),
            vmformWithdraw = formWithdraw.getViewModel(),
            slipId = vmformWithdraw.get('slipId'),
            to_pay = vmformWithdraw.get('to_pay');
        if(to_pay > 0)
        {
            this.sendSms(button, true);
        }
        else
        {
            Util.erMes('Сумма не может быть меньше или равна 0!');
        }
    },
    // * печать без чека. Форма отправки смс
    onClickPay: function (button) {
        this.sendSms(button, false);
    },
    onClickCancel: function (button) {
        var windowWithdraw = button.up('window');
        windowWithdraw.close();
    },

    // * нажали кнопку Пополнение
    onClickPayin: function (button) {
        var formWithdraw = this.getView(),
            vmformWithdraw = formWithdraw.getViewModel(),
            slipId = vmformWithdraw.get('slipId'),
            to_pay = vmformWithdraw.get('to_pay'),
            objUrl = {
                class: 'Pos_Timeline_Xaction',
                params: {
                    xaction: 'confirmPayin',
                    slipId: slipId,
                    sum: to_pay
                }
            };
        if(to_pay > 0)
        {
            Ext.Ajax.request({
                url: Server.getUrl(objUrl),
                method: 'POST',
                callback: function (opt, success, response) {
                    if (response.responseText) {
                        var o = Ext.decode(response.responseText);
                        if (o.success) {
                            if (o.rows.confirmation_msg) {
                                this.showPayinConfirmMes(to_pay, slipId, o.rows.confirmation_msg);
                            } else
                                Util.erMes('Сервер не прислал текст ответа');
                        } else {
                            Util.erMes(o.errors[0]);
                        }
                    } else {
                        Util.erMes('Нет ответа от сервера');
                    }
                },
                scope: this
            });
        }
        else
        {
            Util.erMes('Сумма не может быть меньше или равна 0!');
        }
    },

    // * сообщение о подтверждении внесения денег
    showPayinConfirmMes: function (to_pay, slipId, confirmation_msg) {
        // * закроем окно с суммой
        var win = Ext.ComponentQuery.query('#windowWithdraw')[0];
        win.close();

        Ext.Msg.confirm('Подтверждение', confirmation_msg, function (btn, text) {
            if (btn == 'yes') {
                var objUrl = {
                    class: 'Pos_Timeline_Xaction',
                    params: {
                        xaction: 'payin',
                        slipId: slipId,
                        sum: to_pay
                    }
                };
                Ext.Ajax.request({
                    url: Server.getUrl(objUrl),
                    method: 'POST',
                    callback: function (opt, success, response) {
                        if (response.responseText) {
                            var o = Ext.decode(response.responseText);
                            if (o.success) {
                                if (o.rows.balance != 'undefined' && o.rows.new_sms_key != 'undefined' && o.rows.transaction_id != 'undefined') {
                                    // * покажем сообщение об успехе операции
                                    var str = 'Пополнение ' + to_pay + 'р на ТЛ №' + slipId + ' произведено успешно. Остаток ' + o.rows.balance + 'р.';
                                    Util.infoMes(str);

                                    // * печать чека
                                    var objUrlXaction = {
                                        class: 'Pos_Pageprinter_Print',
                                        params: {
                                            slipId: slipId,
                                            code: o.rows.new_sms_key,
                                            token: Server.getToken(),
                                            login: Ext.util.Cookies.get('betzet_login'),
                                            t: o.rows.transaction_id
                                        }
                                    };
                                    window.open(Server.getUrl(objUrlXaction), '_blank');
                                } else
                                    Util.erMes('Сервер не прислал необходимые данные');
                            } else {
                                Util.erMes(o.errors[0]);
                            }
                        } else {
                            Util.erMes('Нет ответа от сервера');
                        }

                        // * обновим грид таймлайн
                        var gridTimeline = Ext.ComponentQuery.query('gridtimeline')[0];
                        if (gridTimeline.getViewModel().get('filters.term'))
                            gridTimeline.getViewModel().getStore('timeline').reload();
                    },
                    scope: this
                });
            } else {
                var win = Ext.ComponentQuery.query('#windowWithdraw')[0];
                win.close();
            }
        });
    },

    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            this.onClickPayin();
        }
    },
});
