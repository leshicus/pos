Ext.define('Office.view.session.GridDetailPlayerAccountsM', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.griddetailplayeraccounts',
    stores: {
        detailplayeraccounts: {
            fields: [],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Sessions_Playerssessionhistory',
                    token: '{token}',
                    params: {}
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            listeners: {
                    load: function(st, obj)
                    {
                        var reader = st.getProxy().getReader();
                        var respData = reader.rawData;
                        Ext.getCmp('countOperation').setValue(respData.total);
                        Ext.getCmp('totalSum').setValue(respData.totalSum);
                    }
                },
            storeId:'detailplayeraccounts',
            autoLoad: true
        }
    }
});

