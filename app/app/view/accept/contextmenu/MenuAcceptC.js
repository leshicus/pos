Ext.define('Office.view.accept.contextmenu.MenuAcceptC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.util.Server'
    ],
    alias: 'controller.menuaccept',

    control: {
        '#menuPrint': {
            click: function (button) {
                console.log('click menuPrint');
                var grid = Ext.ComponentQuery.query('gridaccept')[0],
                    selection = grid.getSelectionModel().getSelection()[0],
                    slipId = selection.get('slip_id'),
                    user_id = Ext.util.Cookies.get('userId'),
                    userLogin = Ext.util.Cookies.get('betzet_login'),
                    userToken = Ext.util.Cookies.get('betzet_token'),
                    url = Office.util.Server.getPageprinter() + '?slipId=' + slipId + '&user_id=' + user_id + '&username=' + userLogin + '&token=' + userToken + '&secondTime=true',
                    objUrl = {
                        class: 'Pos_Pageprinter_Print',
                        params: {
                            slipId: slipId,
                            user_id: user_id,
                            username: userLogin,
                            token: userToken,
                            secondTime: true
                        }
                    };
                window.open(Server.getUrl(objUrl));
            }
        },

        '#menuBlock': {
            click: function (button) {
                console.log('click menuBlock');

                var grid = Ext.ComponentQuery.query('gridUser')[0],
                    selection = grid.getSelected();
                Ext.Msg.confirm('Блокировка пользователя', 'Заблокировать учетную запись пользователя?', function (button) {
                    if (button == 'yes') {
                        var now = new Date(),
                            date = [App.util.Utilities.reverseDate(now.getDate()), App.util.Utilities.reverseDate(now.getMonth() + 1), now.getFullYear()].join('.')
                                + ' ' + now.getHours() + ':' + now.getMinutes();
                        Ext.each(selection, function (item) {
                            item.set('enddate', date);
                        });
                        //grid.store.sync();
                    }
                }, this);
            }
        },
        '#menuUnblock': {
            click: function (button) {
                console.log('click menuUnblock');

                var grid = Ext.ComponentQuery.query('gridUser')[0],
                    selection = grid.getSelected();
                Ext.Msg.confirm('Разблокировка пользователя', 'Разблокировать учетную запись пользователя?', function (button) {
                    if (button == 'yes') {
                        Ext.each(selection, function (item) {
                            item.set('enddate', App.util.Utilities.nullDate);
                        });
                        //grid.store.sync();
                    }
                }, this);

            }
        }
    }
});
