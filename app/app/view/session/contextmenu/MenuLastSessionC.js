Ext.define('Office.view.session.contextmenu.MenuLastSessionC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.menulastsession',

    control: {
        '#menuPrint': {
            click: function (button) {
                var gridlastsession = Ext.ComponentQuery.query('gridlastsession')[0],
                    select = gridlastsession.getSelectionModel().getSelection()[0],
                    id = select.get('id'),
                    objUrl = {
                        class: 'Pos_Sessions_Print',
                        params: {
                            id: id,
                            extended: false
                        }
                    };
                window.open(Server.getUrl(objUrl), '_blank');
            }
        },
        '#menuPrintExt': {
            click: function (button) {
                var gridlastsession = Ext.ComponentQuery.query('gridlastsession')[0],
                    select = gridlastsession.getSelectionModel().getSelection()[0],
                    id = select.get('id'),
                    objUrl = {
                        class: 'Pos_Sessions_Print',
                        params: {
                            id: id,
                            extended: true
                        }
                    };
                window.open(Server.getUrl(objUrl), '_blank');
            }
        }
    }
});
