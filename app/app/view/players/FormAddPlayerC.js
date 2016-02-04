Ext.define('Office.view.players.FormAddPlayerC', {
    extend: 'Ext.app.ViewController',
    requires: [
       /* 'Office.view.players.FormAddPlayerV'*/
    ],
    alias: 'controller.formaddplayer',
    listen: {
        component: {
            '#': {}
        },
        store: {}
    },
    onClickSave: function (button) {
        var window = button.up('window'),
            form = window.down('form'),
            name = window.down('#name').getValue(),
            gridplayers = Ext.ComponentQuery.query('gridplayers')[0],
            vmGridplayers = gridplayers.getViewModel();

        if (form.isValid()) {
            
                var objUrl = {
                    class: 'Pos_Officeplayers_Officeplayersadd',
                    params: {
                        name: name
                    }
                };
                Ext.Ajax.request({
                    url: Server.getUrl(objUrl),
                    method: 'POST',
                    callback: function (opt, success, response) {
                        if (response.responseText) {
                            var o = Ext.decode(response.responseText);
                            if (o.success) {
                                Util.sucMes('Добавлен новый игрок');
                                gridplayers.store.reload();
                            } else {
                                Util.erMes(o.errorText || o.errors[0]);
                            }
                        } else {
                            Util.erMes('Нет ответа от сервера');
                        }
                        window.close();
                    }
                });
            
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
        var term = form.down('#name');
        term.focus();
    }


});
