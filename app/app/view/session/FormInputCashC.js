Ext.define('Office.view.session.FormInputCashC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.forminputcash',
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
            summ = window.down('#summ').getValue(),
            comment = window.down('#comment').getValue();
            //url = Server.getInputCash();
        if (form.isValid()) {
            if (type == 'input') {
                var objUrl = {
                    class: 'Pos_Cash_Movements',
                    params: {
                        summ: summ,
                        comment: comment
                    }
                };
                Ext.Ajax.request({
                    url: Server.getUrl(objUrl),
                    method: 'POST',
                    callback: function (opt, success, response) {
                        if (response.responseText) {
                            var o = Ext.decode(response.responseText);
                            if (o.success) {
                                Util.toast('Успех', 'Операция внесения прошла успешно');
                                var gridcurrent = Ext.ComponentQuery.query('gridcurrent')[0];
                                gridcurrent.getController().reloadGrids();
                            } else {
                                Util.erMes(o.message||o.errors[0]);
                            }
                        } else {
                            Util.erMes('Нет ответа от сервера');
                        }
                    }
                });
            }
            if (type == 'output') {
                var objUrl = {
                    class: 'Pos_Cash_Output',
                    params: {
                        summ: summ,
                        comment: comment
                    }
                };
                Ext.Ajax.request({
                    url: Server.getUrl(objUrl),
                    /*url: url,
                    params: {
                        xaction: 'outputCash',
                        summ: summ,
                        comment: comment
                    },*/
                    method: 'POST',
                    callback: function (opt, success, response) {
                        if (response.responseText) {
                            var o = Ext.decode(response.responseText);
                            if (o.success) {
                                Util.toast('Успех', 'Операция изъятия прошла успешно');
                                var gridcurrent = Ext.ComponentQuery.query('gridcurrent')[0];
                                gridcurrent.getController().reloadGrids();
                            } else {
                                Util.erMes(o.message||o.errors[0]);
                            }
                        } else {
                            Util.erMes('Нет ответа от сервера');
                        }
                    }
                });
            }

            window.close();
        }
    },
    onClickCancel: function (button) {
        var window = button.up('window');
        window.close();
    }

});
