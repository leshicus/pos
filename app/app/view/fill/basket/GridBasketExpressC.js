Ext.define('Office.view.fill.basket.GridBasketExpressC', {
    extend: 'Office.view.fill.basket.GridBasketProtoC',
    requires: [
        'Office.view.fill.basket.GridBasketProtoC'
    ],
    alias: 'controller.gridbasketexpress',

    // * нажали Enter в поле Ставка грида Итог
    onKeyPressAmount: function (field, e) {
        var value = field.getValue() || 0,
            gridBasketSum = field.up('gridpanel'),
            storeBasketSum = gridBasketSum.store,
            min = storeBasketSum.getAt(0).get('min'),
            max = storeBasketSum.getAt(0).get('max');

        // storeBasketSum.getAt(0).set('amount',value);

        if (e.getKey() == e.ENTER) {
            if (!this.validateSingleBetValue(value, min, max)) {
                Util.erMes('Ставка не соответствует лимитам: ' + min + '..' + max, function (btn) {
                    // * вторая попытка ввода суммы
                    if (btn == 'ok') {
                        var editor = gridBasketSum.getPlugin('cellEditorId');
                        editor.startEditByPosition({
                            row: 0,
                            column: 2
                        });
                        storeBasketSum.getAt(0).set('amount', value);
                    }
                });
            } else {
                // * нажмем кнопку Поставить
                var fill = Ext.ComponentQuery.query('#main')[0];
                fill.getController().clickMakeBet();
            }
        }
    },

    // * костыль, потому что при первичном редактировании поля при автофокусе не сохраняются данные :(((
    onChangeAmount: function (field, n, o) {
        var gridBasketSum = field.up('gridpanel'),
            storeBasketSum = gridBasketSum.store,
            n = Math.abs(parseInt(n)) || 0;
        storeBasketSum.getAt(0).set('amount', n);

        // * отправим ставки на монитор игрока
        MonitorF.sendBetsToMonitor();
    },

    validateSingleBetValue: function (bet, min, max) {
        if (bet >= min && bet <= max) {
            return true;
        } else
            return false;
    },

});
