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
    stores: {
        basket_chained: {
            source: '{basket}',
            isLoadBlocked: Ext.emptyFn, // * todo обход бага в 5.1.0
            listeners:{
                //datachanged:'onBasketChange', // * add/remove records
                //remove:'onBasketRemove', // * add/remove records
                //add:'onBasketAdd', // * add/remove records
                //update:'onBasketChange' // * changing records
            }
        }
    },
    formulas:{
        //formatedPrize: {
        //    bind: {
        //        bindTo: '{basket_chained}',
        //        deep: true
        //    },
        //    get: function (storeBasket) {
        //        console.info(arguments);
        //            var //storeBasket = getter.get('basket_chained'),
        //                sum = 0,
        //                coef = 0,
        //                prize = 0;
        //            console.info(storeBasket);
        //            storeBasket.each(function (item) {
        //                sum += parseInt(item.get('amount'));
        //                coef += parseFloat(item.get('arrCoef')[2]);
        //                prize = sum * coef;
        //            }, this);
        //            return prize.toFixed(2);
        //
        //    }
        //},
    //
    //    get_prize: function (get) {
    //        var storeBasket = get('basket_chained'),
    //            sum = 0,
    //            coef = 0,
    //            prize = 0;
    //        console.info(storeBasket);
    //        storeBasket.each(function (item) {
    //            sum += parseInt(item.get('amount'));
    //            coef += parseFloat(item.get('arrCoef')[2]);
    //            prize = sum * coef;
    //        }, this);
    //        return prize.toFixed(2);
    //    },
    //    get_betResult: function (get) {
    //        var storeBasket = get('basket_chained'),
    //            sum = 0;
    //        console.info(storeBasket);
    //        storeBasket.each(function (item) {
    //            sum += parseInt(item.get('amount'));
    //        }, this);
    //        return sum;
    //    }
    }


});
