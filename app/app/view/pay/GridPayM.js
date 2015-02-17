Ext.define('Office.view.pay.GridPayM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gridpay',
    stores: {
        pay: {
            fields: [
                'id',
                'param',
                'value',
                'event',
                'coeff',
                'result',
                'score'
            ],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Slips_Info',
                    token: '{token}',
                    params: {
                        slipId: '{filters.slipId}',
                        code: '{filters.code}'
                    }
                }),
                reader: {type: 'json'}
            },
            storeId: 'pay'
        },
        statusbets: {
            fields: [
                'id',
                'value',
            ],
            proxy: {
                type: 'ajax',
                url: Server.getStatusBets(),
                reader: {
                    type: 'json',
                    rootProperty: 'status'
                }
            },
            autoLoad: true,
            storeId: 'statusbets'
        }
    }
});
