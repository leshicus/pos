Ext.define('Office.view.timeline.GridSlipM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.TreeStore'
    ],
    alias: 'viewmodel.gridslip',
    stores: {
        slip: {
            type: 'tree',
            fields: [],
            storeId: 'slip',
            idProperty:'slip_id',
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Timeline_Subslipstree',
                    token: '{token}',
                    params: {
                        timelineId: '{filters.timelineId}'
                    }
                }),
                reader: {
                    type: 'json'
                }
            },
            root: {
                expanded: true,
                //text: 'rows',
                loaded: true // * нужно, чтобы реагировало на autoLoad: false, а иначе все равно грузит
            },
            autoLoad: false
        }
    }
});