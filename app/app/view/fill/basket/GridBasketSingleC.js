Ext.define('Office.view.fill.basket.GridBasketSingleC', {
    extend: 'Office.view.fill.basket.GridBasketProtoC',
    requires: [
        'Office.view.fill.basket.GridBasketProtoC'
    ],
    alias: 'controller.gridbasketsingle',

    onChangeBetSeries: function (field, n, o, rec) {
        // * по всем записям стора basket поменять ставку на величину n
        var fill = Ext.ComponentQuery.query('#main')[0],
            vmFill = fill.getViewModel(),
            storeBasket = vmFill.getStore('basket'),
            n = n || 0;
        if (storeBasket) {
            storeBasket.each(function (item) {
                item.set('amount', parseInt(n));
            }, this);
        }

        var gridbasketsingle = Ext.ComponentQuery.query('gridbasketsingle')[0];
        gridbasketsingle.getView().refresh(); // * иначе в input остаются старые значения (так отображает браузер, хотя в ДОМе новые...)
    },

    onEnterBetSeries: function (field, e) {
        if (e.getKey() == e.ENTER) {
            //this.onChangeBetSeries(field, field.getValue());
            var fill = Ext.ComponentQuery.query('#main')[0];
            fill.getController().clickMakeBet();
        }
    },

    onChangeBetSum: function (field, n, o, rec) {
        // * по всем записям стора basket поменять ставку на величину n/количество записей
        var fill = Ext.ComponentQuery.query('#main')[0],
            vmFill = fill.getViewModel(),
            storeBasket = vmFill.getStore('basket');
        if (storeBasket) {
            var cnt = storeBasket.count(),
                div = Math.floor(n / cnt) || 0,
                rem = n % cnt || 0,
                num = 0;
            storeBasket.each(function (item) {
                num++;

                if (num == cnt) {
                    item.set('amount', parseInt(div + rem) || 0);
                } else {
                    item.set('amount', parseInt(div) || 0);
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
        //console.info(arguments);
        //// * сделаем поля Ставка в гриде Купон нередактируемыми если отмесена галочка Серия ставок
        //var fill = Ext.ComponentQuery.query('#main')[0],
        //vmFill = fill.getViewModel(),
        //    storeBasket =vmFill.getStore('basket');
        //storeBasket.each(function (item) {
        //    var id = item.get('id'),
        //        input = Ext.get(id);
        //    console.info(input);
        //    if (n)
        //        input.set({disabled: true});
        //    else
        //        input.set({disabled:false}, false);
        //}, this);
        //Ext.ComponentQuery.query('gridbasketsingle')[0].getView().refresh();

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
    }

});
