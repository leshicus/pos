Ext.define('Office.view.panels.GridParamM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridparam',
    stores: {
        param: {
            fields: [],
            proxy: {
                // * синтаксис {filters.value} означает, что значение value нужно подставить из data.filters этой viewmodel,
                // * а сохраняет его туда ф-ия в контроллере
                type: 'ajax',
                api: {
                    read: Server.getUrl({
                        class: 'Pos_Panel_Paramread',
                        token: '{token}',
                        params: {
                            task_id:'{filters.task_id}',
                            panel_id:'{filters.panel_id}'
                        }
                    }),
                    update: Server.getUrl({
                        class: 'Pos_Panel_Paramupdate',
                        token: '{token}',
                        params: {
                            task_id:'{filters.task_id}',
                            panel_id:'{filters.panel_id}',
                            'rows':'{"value":"{filters.value}", "id":"{filters.id}"}'
                        }
                    })
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            storeId: 'param',
            autoLoad: true,
            autoSync: true
        }
    }
});
