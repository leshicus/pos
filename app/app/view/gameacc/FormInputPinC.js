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
                            Utilities.toast('Успех', 'Снятие прошло успешно');
                            vmGridgameacc.getStore('gameacc').reload();
                            var gridgameaction = Ext.ComponentQuery.query('gridgameaction')[0];
                            gridgameaction.getViewModel().getStore('gameaction').reload();
                        } else {
                            Ext.Msg.alert('Ошибка', o.errorText);
                        }
                    } else {
                        Ext.Msg.alert('Ошибка', 'Нет ответа от сервера');
                    }
                }
            });
            windowOutput.close();
            window.close();
        }
    },
    onClickCancel: function (button) {
        var window = button.up('window');
        window.close();
    }

});
