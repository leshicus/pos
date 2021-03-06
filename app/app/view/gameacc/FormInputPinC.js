Ext.define('Office.view.gameacc.FormInputPinC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.forminputpin',

    onClickSave: function (button) {
        var window = button.up('window'),
            windowOutput = Ext.ComponentQuery.query('#windowOutput')[0],
            form = window.down('form'),
            vmPin = form.getViewModel(),
            moneyTransferId = vmPin.getData().moneyTransferId,
            name = vmPin.getData().name,
            amount = vmPin.getData().amount,
            pin = window.down('#pin').getValue(),
            gridgameacc = Ext.ComponentQuery.query('gridgameacc')[0],
            vmGridgameacc = gridgameacc.getViewModel(),
            user_id = vmPin.getData().user_id,
            username = vmPin.getData().username,
            //url = Ext.util.Format.format(Server.accountsWithdraw(), Server.getToken(), user_id, username),
            objUrl = {
                class: 'Pos_Accounts_Withdraw',
                params: {
                    moneyTransferId: moneyTransferId,
                    name: name,
                    amount: amount,
                    pin: pin
                }
            };
        if (form.isValid()) {
            Ext.Ajax.request({
                url: Server.getUrl(objUrl),
                /*url: url,
                 params: {
                 moneyTransferId:moneyTransferId,
                 name:name,
                 amount:amount,
                 pin:pin
                 },*/
                method: 'POST',
                callback: function (opt, success, response) {
                    if (response.responseText) {
                        var o = Ext.decode(response.responseText);
                        if (o.success) {
                            Util.sucMes('Снятие прошло успешно');
                            vmGridgameacc.getStore('gameacc').reload();
                            var gridgameaction = Ext.ComponentQuery.query('gridgameaction')[0];
                            gridgameaction.getViewModel().getStore('gameaction').reload();
                        } else {
                            Util.erMes(o.errorText||o.errors[0]);
                        }
                    } else {
                        Util.erMes('Нет ответа от сервера');
                    }
                }
            });
            windowOutput.close();
            window.close();
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
        var pin = form.down('#pin');
        pin.focus();
    }

});
