Ext.define('Office.view.session.GridCloseSessionC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridclosesession',
    listen: {
        component: {
            '#': {}
        },
        store: {}
    },
    onClickSave: function (button) {
        var window = button.up('window'),
            close_time = window.down('#close_time').getRawValue(),
            objUrl = {
                class: 'Pos_Sessions_Lastsessionend',
                params: {
                    close_time: close_time
                }
            },
            gridcurrent = Ext.ComponentQuery.query('gridcurrent')[0],
            gridcurrentController = gridcurrent.getController();
        Ext.Ajax.request({
            url: Server.getUrl(objUrl),
            method: 'POST',
            callback: function (opt, success, response) {
                if (response.responseText) {
                    var o = Ext.decode(response.responseText);
                    if (o.success) {
                        Utilities.toast('Успех', 'Смена завершена');
                        gridcurrentController.onPrintSession();
                        var gridcurrent = Ext.ComponentQuery.query('gridcurrent')[0];
                        Ext.defer(function(){
                            gridcurrent.getController().reloadGrids();
                        },100);

                    } else {
                        Ext.Msg.alert('Смена не завершена', o.message);
                    }
                } else {
                    Utilities.toast('Ошибка', 'Нет ответа от сервера');
                }
            }
        });
        window.close();
    },
    onClickCancel: function (button) {
        var window = button.up('window');
        window.close();
    }

});
