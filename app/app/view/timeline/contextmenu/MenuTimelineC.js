Ext.define('Office.view.timeline.contextmenu.MenuTimelineC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.timeline.FormSmsCodeV',
        'Office.view.timeline.FormWithdrawV'
    ],
    alias: 'controller.menutimeline',

    // * форма отправки смс
    showFormSms: function (phone, button, slipId) {
        var itemId = button.getItemId(),
            //user_id = Ext.util.Cookies.get('userId'),
            userLogin = Ext.util.Cookies.get('betzet_login'),
            userToken = Ext.util.Cookies.get('betzet_token'),
            type,
            className,
            objUrlXaction = {
                class: className,
                params: {
                    slipId: slipId,
                    code: null,
                    //user_id: user_id || '',
                    username: userLogin || '',
                    token: Server.getToken(),
                    secondTime: true
                }
            };
        switch (itemId) {
            case 'menuBill':
                type = 'printStake';
                className = 'Pos_Pageprinter_Print';
                break;
            case 'menuHist':
                type = 'printHistory';
                className = 'Pos_Pageprinter_Print';
                break;
            case 'menuBalance':
                type = 'printBalance';
                className = 'Pos_Pageprinter_Print';
                break;
        }
        objUrlXaction.params[type] = true;
        objUrlXaction['class'] = className;
        var formsmscode = Ext.create('Office.view.timeline.FormSmsCodeV', {
                viewModel: {
                    data: {
                        theTimeline: {player: {mobile_phone: phone}},
                        objUrlXaction: objUrlXaction
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
                defaultButton: 'code',
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

    // * нажали пункт контекстного меню с печатью
    onClickButtonPrint: function (button) {
        var gridtimeline = Ext.ComponentQuery.query('gridtimeline')[0],
            selection = gridtimeline.getSelectionModel().getSelection()[0],
            slipId = selection.get('id'),
            objUrl = {
                class: 'Pos_Timeline_Xaction',
                params: {
                    xaction: 'sendNewSlipSmsKey',
                    slipId: slipId
                }
            },
            me = this;
        Ext.Ajax.request({
            url: Server.getUrl(objUrl),
            method: 'POST',
            callback: function (opt, success, response) {
                if (response.responseText) {
                    var o = Ext.decode(response.responseText);
                    if (o.success) {
                        if (o.result)
                            me.showFormSms(o.result, button, slipId);
                        else
                            Util.erMes('Сервер не прислал номер телефона');
                    } else {
                        Util.erMes('Не верный код:<br>'+ o.errors[0]);
                    }
                } else {
                    Util.erMes('Нет ответа от сервера');
                }
            }
        });
    },

    // * нажали пункт контекстного меню с частичным снятием
    onClickButtonWithdraw: function (button) {
        var gridtimeline = Ext.ComponentQuery.query('gridtimeline')[0],
            selection = gridtimeline.getSelectionModel().getSelection()[0],
            slipId = selection.get('id'),
            to_pay = selection.get('to_pay'),
            formWithdraw = Ext.create('Office.view.timeline.FormWithdrawV', {
                viewModel: {
                    data: {
                        slipId:slipId,
                        to_pay:''
                        //to_pay:to_pay
                    }
                }
            }),
            win = new Ext.window.Window({
                modal: true,
                constrain: true,
                title: 'Частиное снятие c ТЛ ' + slipId,
                width: 480,
                itemId: 'windowWithdraw',
                defaultButton: 'sum',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    formWithdraw
                ],
                buttons: [
                    {
                        text: 'Выплата с чеком',
                        glyph: Glyphs.get('print'),
                        scale: 'medium',
                        scope: formWithdraw.getController(),
                        handler: 'onClickPayPrint'
                    },
                    {
                        text: 'Выплата без чека',
                        glyph: Glyphs.get('dollar'),
                        scale: 'medium',
                        scope: formWithdraw.getController(),
                        handler: 'onClickPay'
                    },
                    '->',
                    {
                        text:  'Отмена',
                        glyph: Glyphs.get('cancel'),
                        scale: 'medium',
                        scope: formWithdraw.getController(),
                        handler: 'onClickCancel'
                    }
                ]
            });
        win.show();
    },

    // * нажали пункт контекстного меню с пополнением
    onClickButtonPayin: function (button) {
        var gridtimeline = Ext.ComponentQuery.query('gridtimeline')[0],
            selection = gridtimeline.getSelectionModel().getSelection()[0],
            slipId = selection.get('id'),
            to_pay = selection.get('to_pay'),
            formWithdraw = Ext.create('Office.view.timeline.FormWithdrawV', {
                viewModel: {
                    data: {
                        slipId:slipId,
                        to_pay:''
                        //to_pay:to_pay
                    }
                }
            }),
            win = new Ext.window.Window({
                modal: true,
                closable: false,
                title: 'Пополнение ТЛ ' + slipId,
                width: 480,
                itemId: 'windowWithdraw',
                defaultButton: 'sum',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    formWithdraw
                ],
                buttons: [
                    {
                        text: 'Подтвердить',
                        glyph: Glyphs.get('save'),
                        scale: 'medium',
                        scope: formWithdraw.getController(),
                        handler: 'onClickPayin'
                    },
                    '->',
                    {
                        text:  'Отмена',
                        glyph: Glyphs.get('cancel'),
                        scale: 'medium',
                        scope: formWithdraw.getController(),
                        handler: 'onClickCancel'
                    }
                ]
            });
        win.show();
    }
});
