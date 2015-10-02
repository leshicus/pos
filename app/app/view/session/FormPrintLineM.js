Ext.define('Office.view.session.FormPrintLineM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.TreeStore'
    ],
    alias: 'viewmodel.formprintline',
    stores: {
        sport: {
            fields: ['id', 'value', 'checked', 'iconCls'],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Filters_Sport',
                    token: '{token}',
                    params: {
                        mode: 'office'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'sportfilter.types'
                }
            },
            storeId: 'sport',
            autoLoad: false
        }
    }
});
