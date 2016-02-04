Ext.define('Office.view.session.FormInputCashC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.forminputcash',

    //registerClickEvent: function (field) {
    //    field.getEl().on('click', function () {
    //        var form = field.up('form'),
    //            vm = form.getViewModel();
    //        vm.set('to_pay',"");
    //    }, this);
    //},

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
                        summ:parseFloat(summ),
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
                                Util.sucMes('Операция внесения прошла успешно');
                                SessionF.reloadGrids();
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
                        summ: parseFloat(summ),
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
                                Util.sucMes('Операция изъятия прошла успешно');

                                SessionF.reloadGrids();
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
        }else{
            Util.erMes(Config.STR_FORM_ERROR);
        }
    },

    onClickCancel: function (button) {
        var window = button.up('window');
        window.close();
    },

    onAfterRender: function (form) {
        Util.validate(form);
        var term = form.down('#summ');
        term.focus();
    },

    onEnterSumm: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var win = field.up('window'),
                comment = win.down('#comment');
            comment.focus();
        }
    },

    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var win = field.up('window'),
                button = win.down('button[action=save]');
            this.onClickSave(button);
        }
    },

    onClickButtonBalance: function (btn) {
        var form = btn.up('form'),
            vm = form.getViewModel();
        vm.set('to_pay',vm.get('session.currentSumInCash'));
    }

});
