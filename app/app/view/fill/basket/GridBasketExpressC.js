Ext.define('Office.view.fill.basket.GridBasketExpressC', {
    extend: 'Office.view.fill.basket.GridBasketProtoC',
    requires: [
        'Office.view.fill.basket.GridBasketProtoC'
    ],
    alias: 'controller.gridbasketexpress',

    // * нажали Enter в поле Ставка грида Итог
    onKeyPressAmount: function (field, e) {
        var value = field.getValue() || 0,
            n = Math.abs(parseInt(value)),
            gridBasketSum = field.up('gridpanel'),
            storeBasketSum = gridBasketSum.store,
            min = storeBasketSum.getAt(0).get('min'),
            max = storeBasketSum.getAt(0).get('max');

        if (e.getKey() == e.ENTER) {
            if (!this.validateSingleBetValue(value, min)) {
                Util.erMes('Минимальная ставка: ' + min, function (btn) {
                    // * вторая попытка ввода суммы
                    if (btn == 'ok') {
                        gridBasketSum.getViewModel().set('amount', n);
                        field.focus();
                    }
                });
            } else {
                // * нажмем кнопку Поставить
                var fill = Ext.ComponentQuery.query('fill')[0];
                fill.getController().clickMakeBet();
            }
        }
    },

    // * костыль, потому что при первичном редактировании поля при автофокусе не сохраняются данные :(((
    onChangeAmount: function (field, n, o) {
        var gridBasketExpress = field.up('gridbasketexpress'),
            gridBasketSum = gridBasketExpress.down('#gridBasketSum'),
            storeBasketSum = gridBasketSum.store,
            n = Math.abs(parseInt(n)) || '';

        // * это чтобы начальный 0 сразу пропадал после начала ввода
        if (o == 0) {
            field.setValue(n);
        }
        n = n || 0;

        storeBasketSum.getAt(0).set('amount', n);
        gridBasketExpress.getViewModel().set('amount', n);

        // * отправим ставки на монитор игрока
        MonitorF.sendBetsToMonitor();

        var fill = Ext.ComponentQuery.query('fill')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket');

        // * сохраним значение ставки в multi_value каждой записи
        storeBasket.each(function (item) {
            item.set('multi_value', n);
        });
    },

    validateSingleBetValue: function (bet, min) {
        if (bet >= min) {
            return true;
        } else
            return false;
    },

    // * обновление грида итогов
    updateBasketSum: function () {
        var gridBasketExpress = this.getView(),
            gridBasketSum = gridBasketExpress.down('#gridBasketSum'),
            storeBasketSum = gridBasketSum.store,
            rec = storeBasketSum.getAt(0),
            coef = this.getCoefMulti();
        if (rec) {
            rec.set('coef', coef);
        }
    },

    getCoefMulti: function () { // * перемножение кэфов экспресса
        var fill = Ext.ComponentQuery.query('fill')[0],
            storeBasket = fill.getViewModel().getStore('basket'),
            coefSum = 0;
        if (storeBasket) {
            storeBasket.each(function (item, idx) {
                var arrCoef = item.get('arrCoef');
                if (arrCoef) {
                    if (idx == 0)
                        coefSum = parseFloat(arrCoef[2]);
                    else
                        coefSum *= parseFloat(arrCoef[2]);
                }
            }, this);
        }
        return coefSum.toFixed(2);
    }


});
