Ext.define('Office.view.chat.GridChatUserC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridchatuser',
    listen: {
        component: {
            '#': {},
            'tool[type=refresh]': {
                click: function (tool) {
                    var grid = tool.up('panel');
                    grid.store.reload();
                }
            }
        },
        store: {
            '#chatuser': {
               /* load: function (store, arr, success, resp) {
                    var o = Ext.decode(resp._response.responseText);
                    if (!success) {
                        Util.erMes('Ошибка', o.message);
                    }
                }*/
            }
        }
    },
    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var mainController = Office.app.getController('Main'),
                grid = this.getView();
            mainController.storeLoadVm(grid);
        }
    },
    onCellclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        var mainController = Office.app.getController('Main'),
            gridChatUser = this.getView(),
            gridChatMes = gridChatUser.up('window').down('gridchatmes'),
            selected = gridChatUser.getSelectionModel().getSelection()[0],
            userid = selected.get('id');
        gridChatMes.getViewModel().set('filters.userid', userid);
        mainController.storeLoadVm(gridChatMes);
    },



});
