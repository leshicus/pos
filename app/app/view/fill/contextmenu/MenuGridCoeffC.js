Ext.define('Office.view.fill.contextmenu.MenuGridCoeffC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    alias: 'controller.menugridcoeff',
    listen: {
        component: {
            '#': {
                click: function (menu, item) {
                    var amount = parseInt(item.text || item.value)||0,
                        vm = menu.getViewModel(),
                        span = vm.get('span'),
                        objSpan = Util.getDataset(span, 'span'),
                        coefId = objSpan.coefid,
                        eventId = objSpan.eventid,
                        activeTabIndexEvent = BasketF.getActiveTabIndexEvent(),
                        gridEvent = Ext.ComponentQuery.query('grideventlive')[activeTabIndexEvent] /*|| Ext.ComponentQuery.query('grideventrats')[0]*/,
                        selected = gridEvent.selection;

                    if (eventId != 0) // * Экспресс дня
                        MarketsHtml.addToBasket(coefId, amount, eventId);
                    else
                        MarketsHtml.addToBasket(coefId, amount, selected);
                }
            }
        }
    },

    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var menu = field.up('menu'),
                amount = field.getValue()||0,
                vm = menu.getViewModel(),
                span = vm.get('span'),
                objSpan = Util.getDataset(span, 'span'),
                coefId = objSpan.coefid,
                eventId = objSpan.eventid;

            MarketsHtml.addToBasket(coefId, amount, eventId);

            menu.close();
        }
    }
});
