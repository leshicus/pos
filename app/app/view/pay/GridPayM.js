Ext.define('Office.view.pay.GridPayM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gridpay',
    data: {
        slipRawValue: null,
        slipInfo: null,
        is_win: false
    },
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
                        slipId: '{get_slipId}',
                        code: '{get_code}'
                    }
                }),
                reader: {type: 'json'}
            },
            storeId: 'pay',
            listeners: {
                load: 'onPayLoad'
            }
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
    },
    formulas: {
        get_code: function (get) {
            var slipRawValue = get('slipRawValue'),
                code = '';
            if (slipRawValue) {
                slipRawValue = slipRawValue.replace(new RegExp("Х|х|X|Ч|ч", 'g'), 'x');
                if (slipRawValue.indexOf('x') > 0) { // * номер_х_код
                    code = slipRawValue.split('x')[1];
                }
            }
            return code;
        },
        get_slipId: function (get) {
            var slipRawValue = get('slipRawValue'),
                slipId = '';
            if (slipRawValue) {
                slipRawValue = slipRawValue.replace(new RegExp("Х|х|X|Ч|ч", 'g'), 'x');
                if (slipRawValue.indexOf('x') > 0) { // * номер_х_код
                    slipId = slipRawValue.split('x')[0];
                } else {
                    slipId = slipRawValue;
                }
            }
            return slipId;
        },

        showButtonPayWithoutPrint: {
            bind: {
                is_win: '{is_win}'
            },
            get: function (data) {
                var payWithoutCheck = Util.getGlobalConst('ENABLE_PAY_WITHOUT_CHECK');
                return data.is_win && payWithoutCheck;
            }
        },
        showButtonPayWithPrint: {
            bind: {
                is_win: '{is_win}'
            },
            get: function (data) {
                return data.is_win && Util.getGlobalProp('use_ndfl');
            }
        }
    }
});
