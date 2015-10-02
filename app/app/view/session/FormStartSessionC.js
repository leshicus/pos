Ext.define('Office.view.session.FormStartSessionC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.formstartsession',
    listen: {
        component: {
            '#': {}
        },
        store: {}
    },
    onClickSave: function (button) {
        var window = button.up('window'),
            form = window.down('form'),
            open_time = window.down('#open_time').getRawValue(),
            operator_fullname = window.down('#operator_fullname').getValue(),
            objUrl = {
                class: 'Pos_Sessions_Newsession',
                params: {
                    open_time: open_time,
                    operator_fullname:operator_fullname
                }
            };
        if (form.isValid()) {
            Ext.Ajax.request({
                url: Server.getUrl(objUrl),
                method: 'POST',
                callback: function (opt, success, response) {
                    if (response.responseText) {
                        var o = Ext.decode(response.responseText);
                        if (o.success) {
                            Util.toast('Успех', 'Смена начата');
                            var gridcurrent = Ext.ComponentQuery.query('gridcurrent')[0];
                            gridcurrent.getController().reloadGrids();
                        } else {
                            Util.erMes('Смена не начата: '+ o.message||o.errors[0]);
                        }
                    } else {
                        Util.erMes('Нет ответа от сервера');
                    }
                }
            });
            window.close();
        }
    },
    onClickCancel: function (button) {
        var window = button.up('window');
        window.close();
    },
    /* валидация ФИО */
    onOperatorFullname: function (val) {
        if (val) {
            val = val.trim(); // * удаление пробелов по краям
            val = val.replace(/\s+/g, " "); // * удаление сдвоенных пробелов
            if (val.split(' ').length >= 3)
                return true;
            else
                return 'ФИО должно состоять не менее чем из трех слов';
        } else {
            return 'Обязательное поле';
        }
    }

});
