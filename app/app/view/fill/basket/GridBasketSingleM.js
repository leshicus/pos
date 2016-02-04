Ext.define('Office.view.fill.basket.GridBasketSingleM', {
    extend: 'Office.view.fill.basket.GridBasketProtoM',
    requires: [
        'Office.view.fill.basket.GridBasketProtoM'
    ],
    alias: 'viewmodel.gridbasketsingle',
    data: {
        prize:0,
        betResult: 0,
        betSeries: 0
    },
    //stores: {
    //    basket_chained: {
    //        source: '{basket}',
    //        isLoadBlocked: Ext.emptyFn // * todo обход бага в 5.1.0
    //    }
    //}
});
