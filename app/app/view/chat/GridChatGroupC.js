Ext.define('Office.view.chat.GridChatGroupC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridchatgroup',
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
            '#chatgroup': {
                load: function (store, arr, success, resp) {
                    /*var o = Ext.decode(resp._response.responseText);
                    if (!success) {
                        Util.erMes('Ошибка', o.message);
                    }*/
                }
            }
        }
    },

    onCellclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        var mainController = Office.app.getController('Main'),
            gridChatGroup = this.getView(),
            gridChatUser = gridChatGroup.up('window').down('gridchatuser'),
            gridChatMes = gridChatGroup.up('window').down('gridchatmes'),
            selected = gridChatGroup.getSelectionModel().getSelection()[0],
            id = selected.get('id');
        gridChatUser.getViewModel().set('filters.groupid', id);

        gridChatMes.getViewModel().set('filters.groupid', id);
        gridChatMes.getViewModel().set('filters.userid', null);
        gridChatUser.setSelection(null);
        mainController.storeLoadVm(gridChatUser);
        mainController.storeLoadVm(gridChatMes);
    }

});
