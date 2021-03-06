Ext.define('Office.view.gameacc.FormInputCashGameaccC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.gameacc.FormInputPinV'
    ],
    alias: 'controller.forminputcashgameacc',
    listen: {
        component: {
            '#': {}
        },
        store: {}
    },
    onClickSave: function (button) {
        var window = button.up('window'),
            form = window.down('form'),
            type = form._type,
            amount = window.down('#amount').getValue(),
            name = window.down('#name').getValue(),
            gridgameacc = Ext.ComponentQuery.query('gridgameacc')[0],
            vmGridgameacc = gridgameacc.getViewModel(),
            user_id = vmGridgameacc.getData().user_id,
            username = vmGridgameacc.getData().username;

        if (form.isValid()) {
            if (type == 'input') {
                var objUrl = {
                    class: 'Pos_Accounts_Create',
                    params: {
                        amount: amount,
                        name: name
                    }
                };
                Ext.Ajax.request({
                    //url: Ext.util.Format.format(Server.accountsCreate(), Server.getToken(), user_id, username),
                    url: Server.getUrl(objUrl),
                    /*                    params: {
                     amount: amount,
                     name: name
                     },*/
                    method: 'POST',
                    callback: function (opt, success, response) {
                        if (response.responseText) {
                            var o = Ext.decode(response.responseText);
                            if (o.success) {
                                Util.sucMes('Внесение прошло успешно');
                                vmGridgameacc.getStore('gameacc').reload();
                                var gridgameaction = Ext.ComponentQuery.query('gridgameaction')[0];
                                gridgameaction.getViewModel().getStore('gameaction').reload();
                            } else {
                                Util.erMes(o.errorText || o.errors[0]);
                            }
                        } else {
                            Util.erMes('Нет ответа от сервера');
                        }
                        window.close();
                    }
                });
            }
            if (type == 'output') {
                var objUrl = {
                    class: 'Pos_Accounts_Withdrawrequest',
                    params: {
                        amount: amount,
                        name: name
                    }
                };
                Ext.Ajax.request({
                    /*url: Ext.util.Format.format(Server.accountsWithdrawRequest(), Server.getToken(), user_id, username),
                     params: {
                     amount: amount,
                     name: name
                     },*/
                    url: Server.getUrl(objUrl),
                    method: 'POST',
                    callback: function (opt, success, response) {
                        if (response.responseText) {
                            var o = Ext.decode(response.responseText);
                            if (o.success) {
                                // * запросим пин-код
                                var forminputpin = Ext.create('Office.view.gameacc.FormInputPinV', {
                                        viewModel: {
                                            data: {
                                                moneyTransferId: o.moneyTransferId,
                                                name: name,
                                                amount: amount,
                                                user_id: user_id,
                                                username: username
                                            }
                                        }
                                    }),
                                    winPin = new Ext.window.Window({
                                        title: 'Введите пин-код',
                                        modal: true,
                                        closable: false,
                                        constrain: true,
                                        width: 360,
                                        layout: {
                                            type: 'vbox',
                                            align: 'stretch'
                                        },
                                        items: [
                                            forminputpin
                                        ],
                                        buttons: Util.getButtonsSaveCancel({
                                            scope: forminputpin.getController(),
                                            textSave: 'Отправить пин-код'
                                        })
                                    });
                                winPin.show();
                            } else {
                                Util.erMes(o.errorText || o.errors[0]);
                            }
                        } else {
                            Util.erMes('Нет ответа от сервера');
                        }
                    }
                });
            }
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
            var win = field.up('window'),
                button = win.down('button[action=save]');
            this.onClickSave(button);
        }
    },

    onAfterRender: function (form) {
        Util.validate(form);
        // * если телефон есть- фокусируемся на сумме, если нет- на телефоне
        var phone = form.down('#name'),
            amount = form.down('#amount'),
            vm = form.getViewModel();
        if (vm.get('theClient.mobile_phone'))
            amount.focus();
        else
            phone.focus();
    }

});
