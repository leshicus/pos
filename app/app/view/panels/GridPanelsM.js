Ext.define('Office.view.panels.GridPanelsM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.proxy.Rest'
    ],
    alias: 'viewmodel.gridpanels',
    stores: {
        panels: {
            fields: [],
            idProperty: 'panel_num',
            proxy: {
                // * синтаксис {filters.value} означает, что значение value нужно подставить из data.filters этой viewmodel,
                // * а сохраняет его туда ф-ия в контроллере
                type: 'ajax',
                api: {
                    create: Server.getUrl({
                        class: 'Pos_Panel_Panelinsert',
                        token: '{token}',
                        params: {}
                    }),
                    read: Server.getUrl({
                        class: 'Pos_Panel_Panelread',
                        token: '{token}',
                        params: {}
                    }),
                    update: Server.getUrl({
                        class: 'Pos_Panel_Panelupdate',
                        token: '{token}',
                        params: {
                            'rows': '{"task_id":"{filters.task_id}", "id":"{filters.panel_id}"}'
                        }
                    }),
                    destroy: Server.getUrl({
                        class: 'Pos_Panel_Paneldelete',
                        token: '{token}',
                        params: {
                            id: '{filters.panel_id}'
                        }
                    })
                },
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                },
                writer: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            storeId: 'panels',
            autoLoad: false, // * загружать панели будем только после того, как загрузим режимы
            autoSync: true
        },
        workmode: {
            fields: [],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Panel_Moderead',
                    token: '{token}',
                    params: {}
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            storeId: 'workmode',
            autoLoad: true
        }
    }
});
