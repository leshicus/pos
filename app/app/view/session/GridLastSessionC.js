Ext.define('Office.view.session.GridLastSessionC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.session.contextmenu.MenuLastSessionV'
    ],
    alias: 'controller.gridlastsession',
    listen: {
        component: {
            '#': {
                itemcontextmenu: function (view, rec, node, index, e) {
                    if (view.panel.getSelectionModel().hasSelection()) {
                        e.stopEvent(); // * чтобы не показывалось
                        var menu = Ext.create('Office.view.session.contextmenu.MenuLastSessionV');
                        menu.showAt(e.getXY());
                    }
                    return false;
                }
            },
            'tool[type=refresh]': {
                click: function (tool) {
                    var grid = tool.up('panel');
                    grid.store.reload();
                }
            }
        },
        store: {
            '#lastsession': {
                /* load: function (store, arr, success, resp) {
                    var o = Ext.decode(resp._response.responseText);
                    if (!success) {
                        Util.erMes('Ошибка', o.message);
                    }
                }*/
            }
        }
    }


})
