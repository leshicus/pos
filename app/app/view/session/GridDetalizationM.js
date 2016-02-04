Ext.define('Office.view.session.GridDetalizationM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.griddetalization',
    stores: {
        detalization: {
            fields: [], // * без этой строчки ругается на стор без модели и на schema
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Sessions_Detalization',
                    token: '{token}',
                    params: {
                        firstDate: '{filters.firstDate}',
                        cbReceiverAccount: '{filters.cbReceiverAccount}'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty: 'results'
                }
            },
            storeId: 'detalization',
            autoLoad: false
        },
        totals: {
            fields: [], // * без этой строчки ругается на стор без модели и на schema
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Sessions_Detalizationtotal',
                    token: '{token}',
                    params: {
                        firstDate: '{filters.firstDate}',
                        cbReceiverAccount: '{filters.cbReceiverAccount}'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty: 'results'
                }
            },
            storeId: 'totals',
            autoLoad: false
        }
    }
});
