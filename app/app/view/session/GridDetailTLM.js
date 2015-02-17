Ext.define('Office.view.session.GridDetailTLM', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.griddetailtl',
    stores: {
        detailtl: {
            fields: [],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Sessions_Detailtimeline',
                    token: '{token}',
                    params: {}
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            storeId:'detailtl',
            autoLoad: true
        }
    }
});
