Ext.define('Office.view.panels.GridPanelsC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridpanels',
    listen: {
        component: {
            '#': {

            },
            'tool[type=refresh]': {
                click: function (tool) {
                    var grid = tool.up('panel'),
                        gridParam = grid.up('menumain').down('gridparam');
                    grid.store.reload();
                }
            }
        },
        store: {
            '#panels': {
                /*load: function (store, arr, success, resp) {
                    if(!success || !resp._response || !resp._response.responseText){
                        Util.toast('Ошибка', 'Ошибка загрузки стора: ' + store.getStoreId());
                    }
                }*/
            },
            '#workmode': {
                load: function (store, arr, success, resp) {
                    var mainController = Office.app.getController('Main');
                    if(mainController.askLogoutIfAccessDenied(store)){
                        if(!store.isLoading()){
                            var storePanels = Ext.data.StoreManager.lookup('panels');
                            storePanels.load();
                        }
                    }

                }
            }
        }
    },

    onCellclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        var mainController = Office.app.getController('Main'),
            gridPanels = this.getView(),
            gridParam = gridPanels.up('menumain').down('gridparam'),
            selected = gridPanels.getSelectionModel().getSelection()[0];
        if(selected){
            var panel_id = selected.get('panel_num'),
                task_id = selected.get('task_id');
            gridPanels.getViewModel().set('filters.panel_id', panel_id);
            gridPanels.getViewModel().set('filters.task_id', task_id);
            gridParam.getViewModel().set('filters.panel_id', panel_id);
            gridParam.getViewModel().set('filters.task_id', task_id);
            mainController.storeLoadVm(gridParam);
        }
    },

    // * добавить панель
    onAddPanel: function (btn) {
        var gridPanels = this.getView(),
            gridParam = gridPanels.up('menumain').down('gridparam'),
            storePanel = gridPanels.getViewModel().getStore('panels'),
            newRecord = storePanel.add({})[0];
    },
    // * удалить панель
    onDelPanel: function (btn) {
        var gridPanels = this.getView(),
            gridParam = gridPanels.up('menumain').down('gridparam'),
            mainController = Office.app.getController('Main'),
            selected = gridPanels.getSelectionModel().getSelection()[0],
            storePanel = gridPanels.getViewModel().getStore('panels');
        storePanel.remove(selected);
        Util.initClassParams({
            scope: gridParam,
            params: [
                'filters.panel_id',
                'filters.task_id',
                'filters.value',
                'filters.id'
            ]
        });
        mainController.storeLoadVm(gridParam);
    }


});
