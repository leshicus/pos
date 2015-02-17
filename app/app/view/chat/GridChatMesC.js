Ext.define('Office.view.chat.GridChatMesC', {
    extend: 'Ext.app.ViewController',
    requires: [
    ],
    alias: 'controller.gridchatmes',

    listen: {
        component: {
            '#': {},
            'tool[type=refresh]': {
                click: function (tool) {
                    console.log('refresh');
                    var grid = tool.up('panel');
                    grid.store.reload();
                }
            }
        },
        store: {
            '#chatmes': {
                load: function (store, arr, success, resp) {
                   /* var o = Ext.decode(resp._response.responseText);
                    if (!success) {
                        Ext.MessageBox.alert('Ошибка', o.message);
                    }else{
                        // * скроллинг на последнюю запись
                        var gridChatMes = Ext.ComponentQuery.query('gridchatmes')[0];
                        gridChatMes.getView().scrollBy(Infinity, Infinity);
                    }*/
                    var mainController = Office.app.getController('Main');
                    if(mainController.askLogoutIfAccessDenied(store)){
                        var gridChatMes = Ext.ComponentQuery.query('gridchatmes')[0];
                        gridChatMes.getView().scrollBy(Infinity, Infinity);
                    }
                }
            }
        }
    },
    onCellclick: function (view, td, cellIndex, record, tr, rowIndex, e) {
        var columnDataIndex = view.ownerCt.columns[cellIndex].dataIndex,
            gridChatMes = this.getView(),
            formMes = gridChatMes.up('window').down('formmessage');
        gridChatMes.getViewModel().set('filters.id',id);
        gridChatMes.getViewModel().set('filters.value',value);
        if(columnDataIndex == 'text'){ // * нажали на ячейку с Сообщением для редактирования
            var selected = gridChatMes.getSelectionModel().getSelection()[0],
                id = selected.get('id'),
                value = selected.get('text');
            formMes.getViewModel().set('value',value);
            formMes.getViewModel().set('id',id);
        }else{ // * нажали в сторону
            formMes.getViewModel().set('value',null);
            formMes.getViewModel().set('id',null);
        }
    },
    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var mainController = Office.app.getController('Main'),
                grid = this.getView();
            mainController.storeLoadVm(grid);
        }
    },



});
