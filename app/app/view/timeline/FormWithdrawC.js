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
                    complexMode:'STAKE_AND_RETURN'
                }
            },
            formsmscode = Ext.create('Office.view.timeline.FormSmsCodeV', {
                viewModel: {
                    data: {
                        theTimeline: {player: {mobile_phone: phone}},
                        slipId: slipId,
                        sum: to_pay,
                        objUrlXaction:objUrlXaction,
                        isPrintable:isPrintable
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
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    formsmscode
                ],
                buttons: Utilities.getButtonsSaveCancel({
                    scope: formsmscode.getController(),
                    textSave: 'Отправить'
                })
            });
        win.show();
    },
    sendSms : function (button, isPrintable) {
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
                            Ext.Msg.alert('Ошибка', 'Сервер не прислал номер телефона');
                    } else {
                        Ext.Msg.alert('Ошибка', o.errors[0]);
                    }
                } else {
                    Ext.Msg.alert('Ошибка', 'Нет ответа от сервера');
                }
            },
            scope: this
        });
    },
    // * печать с чеком. Форма отправки смс
    onClickPayPrint: function (button) {
        this.sendSms(button, true);
    },
    // * печать без чека. Форма отправки смс
    onClickPay: function (button) {
        this.sendSms(button, false);
    },
    onClickCancel: function (button) {
        var windowWithdraw = button.up('window');
        windowWithdraw.close();
    }

});
