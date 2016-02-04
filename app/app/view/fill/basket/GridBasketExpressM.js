Ext.define('Office.view.fill.basket.GridBasketExpressM', {
    extend: 'Office.view.fill.basket.GridBasketProtoM',
    requires: [
        'Office.view.fill.basket.GridBasketProtoM'
    ],
    alias: 'viewmodel.gridbasketexpress',
    data: {
        amount: 0,
        coef: 0,
        min: 0,
        max: 0,
        system_count: 0, // * количество записей в комбо Система
        system_value: 0 // * выбранная система
    },
    stores: {
        basketSum: {
            fields: ['coef', 'amount', 'min', 'max'],
            storeId: 'basketSum',
            _defaults: [
                [0, 0, 0, 0]
            ]
        },
        system: {
            fields: ['id', 'name','system_variants'],
            storeId: 'systemCombo'
        },
        //basket_chained: {
        //    source: '{basket}',
        //    isLoadBlocked: Ext.emptyFn, // * todo обход бага в 5.1.0
        //}
    },
    formulas: {
        showSystemCombo: {
            bind: {
                system_count: '{system_count}'
            },
            get: function (data) {
                if (data.system_count > 1)
                    return 1;
                else {
                    return 0;
                }
            }
        }
    }
});
