Ext.define('Office.view.panels.GridParamM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridparam',
    stores: {
        param: {
            fields: [],
            proxy: {
                // * синтаксис {parameter.value} означает, что значение value нужно подставить из data.filters этой viewmodel,
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
                            'rows':'{"value":"{parameter.value}", "id":"{parameter.id}"}'
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
        },
        tournaments: {
            fields: [],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Panel_Compactline',
                    token: '{token}',
                    params: {}
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            storeId: 'tournaments',
            autoLoad: true
        }
    }
});
