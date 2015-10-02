Ext.define('Office.view.fill.basket.GridBasketProtoM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Office.view.fill.FillM'
    ],
    alias: 'viewmodel.gridbasketproto',
    data: {
        checkBetSeries:0
    },
    stores: {
        //basket_chained: {
        //    source: '{basket}',
        //    isLoadBlocked: Ext.emptyFn, // * todo обход бага в 5.1.0
        //    listeners:{
        //        //datachanged:'onBasketChange', // * add/remove records
        //        remove:'onBasketRemove', // * add/remove records
        //        add:'onBasketAdd', // * add/remove records
        //        update:'onBasketChange' // * changing records
        //    }
        //}
    }
});
