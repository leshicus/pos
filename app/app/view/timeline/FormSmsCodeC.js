Ext.define('Office.view.timeline.FormSmsCodeC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.formsmscode',
    listen: {
        component: {
            '#': {}
        },
        store: {}
    },
    onClickSave: function (button) {
        var windowSms = button.up('window'),
            form = windowSms.down('formsmscode'),
            vmFormSms = form.getViewModel(),
            objUrlXaction = vmFormSms.getData().objUrlXaction,
            code = windowSms.down('#code').getValue(),
            to_pay = vmFormSms.getData().sum,
            xaction = to_pay ? 'checkCode' : 'checkSlipCode',
            me = this,
            objUrlCheckSms = {
                class: 'Pos_Timeline_Xaction',
                params: {
                    xaction: xaction,
                    code: code
                }
            };
        if (objUrlXaction) { // * контекстное меню
            var slipId = objUrlXaction.params.slipId,
                isPrintable = vmFormSms.getData().isPrintable,
                doAction = function () {
                    if (to_pay) { // * снятие
                        var objUrlPayout = {
                            class: 'Pos_Timeline_Xaction',
                            params: {
                                xaction: 'subPayout',
                                slipId: slipId,
                                code: code
                            }
                        };
                        objUrlPayout.params['sum'] = to_pay;
                        me.subPayout(objUrlPayout, objUrlXaction, isPrintable);
                    } else {
                        objUrlXaction.params['code'] = code;
                        window.open(Server.getUrl(objUrlXaction), '_blank');
                    }
                };
            if (to_pay) {
                objUrlCheckSms.params['sum'] = to_pay;
            }
        } else { // * создание таймлайн
            var slipId = vmFormSms.getData().theTimeline.id,
                objUrlXaction = {
                    class: 'Pos_Pageprinter_Print',
                    params: {
                        slipId: slipId,
                        code: code,
                        user_id: Ext.util.Cookies.get('userId') || '',
                        username: Ext.util.Cookies.get('betzet_login') || '',
                        token: Server.getToken(),
                        secondTime: true
                    }
                },
                doAction = function () {
                    // * напечатаем чек
                    window.open(Server.getUrl(objUrlXaction), '_blank');
                    // * закроем окно таймлайн
                    var windowTimeline = Ext.ComponentQuery.query('#windowTimeline')[0],
                        gridtimeline = Ext.ComponentQuery.query('gridtimeline')[0],
                        fieldSearch = gridtimeline.down('#term'),
                        phone = gridtimeline.getViewModel().getData().thePhone.smsCodeSentTo;
                    if (windowTimeline)
                        windowTimeline.close();
                    // * обновим список таймлан
                    gridtimeline.getViewModel().set('filters.term', phone);
                    gridtimeline.store.rejectChanges(); // * они нам не нужны- все равно обновлять
                    gridtimeline.getController().searchTimeline();
                };
        }
        objUrlCheckSms.params['slipId'] = slipId;

        if (form.isValid()) {
            if (slipId) {
                // * проверим правильность смс-кода
                this.ckeckSmsCode(objUrlCheckSms, windowSms, doAction);
            } else {
                Ext.Msg.alert('Ошибка', 'Не передан номер таймлайн');
            }
        }
    },

    subPayout: function (objUrlPayout, objUrlXaction, isPrintable) {
        Ext.Ajax.request({
            url: Server.getUrl(objUrlPayout),
            method: 'POST',
            callback: function (opt, success, response) {
                if (response.responseText) {
                    var o = Ext.decode(response.responseText);
                    if (o.success) {
                        if (o.rows) {
                            Ext.Msg.alert('Успех', 'Выплата ' + objUrlPayout.params['sum'] + 'р с ТЛ №' + objUrlPayout.params['slipId'] + ' произведена успешно. Остаток ' + o.rows.balance + 'р');

                            if (isPrintable) {
                                objUrlXaction.params['slipId'] = o.rows.sumSlipId;
                                window.open(Server.getUrl(objUrlXaction), '_blank');
                            }

                            var windowWithdraw = Ext.ComponentQuery.query('#windowWithdraw')[0];
                            windowWithdraw.close();

                            // * обновим список таймлайн
                            var gridTimeline = Ext.ComponentQuery.query('gridtimeline')[0],
                                fieldSearch = gridTimeline.down('#term'),
                                mainController = Office.app.getController('Main');
                            mainController.onAddFilterVm(fieldSearch, null, null, null, true, gridTimeline.store, gridTimeline);
                        } else {
                            Ext.Msg.alert('Ошибка', 'Не верный ответ от сервера');
                        }
                    } else {
                        Ext.Msg.alert('Ошибка', 'Снятие не проведено');
                    }
                } else {
                    Ext.Msg.alert('Ошибка', 'Нет ответа от сервера');
                }
            }
        });
    },
    ckeckSmsCode: function (objUrlCheckSms, windowSms, doAction) {
        Ext.Ajax.request({
            url: Server.getUrl(objUrlCheckSms),
            method: 'POST',
            callback: function (opt, success, response) {
                if (response.responseText) {
                    var o = Ext.decode(response.responseText);
                    if (o.success) {
                        if (o.result) {
                            // * код верный, выполняем желаемое действие
                            windowSms.close();
                            doAction();
                        } else {
                            Ext.Msg.alert('Ошибка', 'Неверный смс-код');
                        }
                    } else {
                        Ext.Msg.alert('Ошибка', 'Нет ответа от сервера');
                    }
                } else {
                    Ext.Msg.alert('Ошибка', 'Нет ответа от сервера');
                }
            }
        });
    },

    onClickCancel: function (button) {
        var windowSms = button.up('window'),
            windowTimeline = Ext.ComponentQuery.query('#windowTimeline')[0],
            gridtimeline = Ext.ComponentQuery.query('gridtimeline')[0];
        windowSms.close();
        if (windowTimeline)
            windowTimeline.close();
        Ext.defer(function () {
            gridtimeline.getStore('timeline').rejectChanges();
            gridtimeline.getStore('timeline').reload();
        }, 10);
    },
    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            // * нажмем кнопку ОК
            Utilities.pressOkButton(field);
        }
    }

});