/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
//Ext.Loader.setPath({
//    'Ux' : 'Ux',
//    'Ext' : 'ext'
//});
Ext.application({
    name: 'Office',

    extend: 'Office.Application'

    //autoCreateViewport: 'Office.view.menumain.MenuMainV'

    //-------------------------------------------------------------------------
    // Most customizations should be made to Office.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------

});

// * функции, вызываемые из DOM (события поля input)
Ext.namespace('OfficeGlobalNS').config = {
    // * валидация введенной ставки
    validateSingleBetValue: function (bet, min, max) {
        if (bet >= min) {
            return true;
        } else
            return false;
    },
    // * взять значение из input ставки в гриде купона и поместить ее в стор basket
    setSingleBetValue: function (input, min, max) {
        var val = input.value,
            value = Math.abs(parseInt(val)),
            id = input.id,
            fill = Ext.ComponentQuery.query('fill')[0],
            storeBasket = fill.getViewModel().getStore('basket'),
            rec = storeBasket.findRecord('id', id, 0, false, true, true);

        if (value == 0)
            value = '';

        input.value = value;

        if (rec) {
            rec.set('amount', value);
        }
    },
    addToBasket: function (td) {
        var span = td.innerHTML,
            objSpan = Util.getDataset(span, 'span'),
            coefId = objSpan.coefid,
            eventId = objSpan.eventid;
        if (coefId) {
            if (eventId != '0')
                MarketsHtml.addToBasket(coefId, '', eventId);
            else
                MarketsHtml.addToBasket(coefId);
           // BasketF.getMaxMin();
        }
    },

    // * контекстное меню для кэфов в основной области
    coefContextMenuClick: function (td, event) {
        var span = td.innerHTML;
        return TemplatesHtml.onContextMenuClick(span, event);
    },
    //onBlur: function (input, event) {
    //    console.info(arguments);
    //    Ext.defer(function(){
    //       var inputEl= document.getElementById(input.id),
    //           strLength= inputEl.value.length * 2;
    //        inputEl.focus();
    //        inputEl.setSelectionRange(strLength, strLength);
    //    },10,this);
    //
    //},
    // * нажали Enter в поле Ставка ставки в купоне: выделить поле Ставка следующей ставки или нажать кнопку Поставить
    onKeyPressBet: function (input, event, min, max) {
        var val = input.value || 0,
            value = parseFloat(val),
            id = input.id,
            fill = Ext.ComponentQuery.query('fill')[0],
            storeBasket = fill.getViewModel().getStore('basket'),
            rec = storeBasket.findRecord('id', id, 0, false, true, true);

        if (!min || !max) {
            BasketF.getMaxMin();
        }

        if (rec) {
            if (event.keyCode == 13) {// * enter
                if (!this.validateSingleBetValue(value, min, max)) {
                    BasketF.erMesMaxMin(input, min);
                } else {
                    rec.set('amount', value); // * сохраним ставку в стор

                    // * переключение фокуса на следующую ставку
                    var idx = storeBasket.indexOf(rec), // * индекс текущей записи
                        next = storeBasket.getAt(idx + 1);// * следующая запись

                    if (next) {
                        var idNext = next.getId(),
                            inputNext = document.getElementById(idNext);

                        if (inputNext) {
                            inputNext.select();
                        }
                    } else {
                        // * нажмем кнопку Поставить
                        fill.getController().clickMakeBet();
                    }
                }
            }
        } else {
            console.info('не могу найти исходный исход');
        }
    }
};