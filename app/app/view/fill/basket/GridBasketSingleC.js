Ext.define('Office.view.fill.basket.GridBasketSingleC', {
    extend: 'Office.view.fill.basket.GridBasketProtoC',
    requires: [
        'Office.view.fill.basket.GridBasketProtoC'
    ],
    alias: 'controller.gridbasketsingle',

    onChangeBetSeries: function (field, n, o, rec) {
        // * по всем записям стора basket поменять ставку на величину n
        var fill = Ext.ComponentQuery.query('fill')[0],
            vmFill = fill.getViewModel(),
            storeBasket = vmFill.getStore('basket'),
            n = n;

        if (storeBasket && n) {
            storeBasket.each(function (item) {
                item.set('amount', parseInt(n));
            }, this);

            var gridbasketsingle = Ext.ComponentQuery.query('gridbasketsingle')[0];
            gridbasketsingle.getView().refresh(); // * иначе в input остаются старые значения (так отображает браузер, хотя в ДОМе новые...)
        }
    },

    onEnterBetSeries: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var fill = Ext.ComponentQuery.query('fill')[0];
            fill.getController().clickMakeBet();
        }
    },

    onChangeBetSum: function (field, n, o, rec) {
        // * по всем записям стора basket поменять ставку на величину n/количество записей
        var fill = Ext.ComponentQuery.query('fill')[0],
            vmFill = fill.getViewModel(),
            storeBasket = vmFill.getStore('basket');
        if (storeBasket && n) {
            var cnt = storeBasket.count(),
                div = Math.floor(n / cnt) || 0,
                rem = n % cnt || 0,
                num = 0;

            storeBasket.each(function (item) {
                num++;

                if (num == cnt) {
                    item.set('amount', parseInt(div + rem) || '');
                } else {
                    item.set('amount', parseInt(div) || '');
                }
            }, this);

            var gridbasketexpress = Ext.ComponentQuery.query('gridbasketsingle')[0];
            gridbasketexpress.getView().refresh(); // * иначе в input остаются старые значения (так отображает браузер, хотя в ДОМе новые...)
        }
    },

    onFocusBetResult: function (field) {
        field.reset();
    },

    // * изменение чекера Серия ставок по
    onChangeCheckBetSeries: function (field, n, o, rec) {
        if (n) {
            // * фокус на поле ввода Серия ставок по
            var betSeries = Ext.ComponentQuery.query('#betSeries')[0];

            Ext.defer(function () {
                betSeries.focus();
            }, 10, this);
        }
    },

    recalcBet: function (betResult, checkBetSeries, storeBasket) {
        var val = betResult.getValue(),
            checkVal = checkBetSeries.getValue();
        betResult.fireEvent('change', betResult, val);
        checkBetSeries.fireEvent('change', betResult, checkVal);
    },

});
