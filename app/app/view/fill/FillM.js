Ext.define('Office.view.fill.FillM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Office.view.menumain.MenuMainM',
        'Ext.data.TreeStore',
        'Ext.util.LocalStorage'
    ],
    alias: 'viewmodel.fill',
    data: {
        numGridCoef: 0,
        basket_count: 0,
        timeline_id: '',
        balance: '',
        activeTabEventId: '', // * название активной вкладки событий (для некоторых фильтров)
        dayexpress_Loaded: false, // * стор Пятерочка загружен
        dayexpressDC_Loaded: false// * стор ДШ загружен
    },
    stores: {},
    formulas: {
        // * определяет, нужно ли показывать некоторые поля, в зависимости от количества записей в сторе
        showBetsSeries: {
            bind: {
                basket_count: '{basket_count}'
            },
            get: function (data) {
                if (data.basket_count > 1)
                    return 1;
                else
                    return 0;
            }
        },
        // * количество Одиночных ставок в купоне
        getCountSingle: {
            bind: {
                basket_count: '{basket_count}',
                showTabSingle:'{showTabSingle}'
            },
            get: function (data) {
                if (data.basket_count > 0 && !data.showTabSingle)
                    return ' (' + data.basket_count + ')';
                else
                    return '';
            }
        },
        getCountExpress: {
            bind: {
                basket_count: '{basket_count}',
                showTabExpress:'{showTabExpress}'
            },
            get: function (data) {
                if (data.basket_count > 0 && !data.showTabExpress)
                    return ' (' + data.basket_count + ')';
                else
                    return '';
            }
        },
        showTabExpress: {
            bind: {
                basket_count: '{basket_count}',
                basket: '{basket}',
                activeTabEventId: '{activeTabEventId}'
            },
            get: function (data) {
                var storeBasket = data.basket,
                    activeTabEventId = data.activeTabEventId,
                    arrEventId = Ext.Array.pluck(Ext.Array.pluck(storeBasket.getRange(), 'data'), 'event_id');

                if (BasketF.isDayExpress(activeTabEventId)) {
                    return 0;
                } else {
                    if (data.basket_count > 1 && !Util.hasDuplicates(arrEventId)) {// * Util.hasDuplicates(arrEventId) проверяет, что кэфы из разных событий
                        return 0;
                    } else {
                        return 1;
                    }
                }
            }
        },
        showTabSingle: {
            bind: {
                activeTabEventId: '{activeTabEventId}'
            },
            get: function (data) {
                var activeTabEventId = data.activeTabEventId;
                return (BasketF.isDayExpress(activeTabEventId));
            }
        },
        showBetsBetButton: {
            bind: {
                basket_count: '{basket_count}'
            },
            get: function (data) {
                if (data.basket_count > 0)
                    return 1;
                else
                    return 0;
            }
        },
        showButtonBusketSearchUser: {
            get: function (data) {
                var globals = Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals');
                return globals.keepRecordsOfPlayers;
            }
        },
        showButtonBusketSearchTimeline: {
            get: function (data) {
                var globals = Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals');
                return globals.use_ndfl;
            }
        },
        disableFastInputField: {
            bind: {
                activeTabEventId: '{activeTabEventId}'
            },
            get: function (data) {
                return (BasketF.isDayExpress(data.activeTabEventId) || data.activeTabEventId == 'rats');
            }
        }
    },
    // * пришлось так делать, потому что модель не видела стор sportsslug из menumain
    constructor: function () {
        this.callParent(arguments);

        this.setStores({
            basket: {
                fields: [],
                storeId: 'basket',
                listeners: {
                    datachanged: 'onBasketChange', // * add/remove records чтобы onBasketChange срабатывал и при добавлении/удалении
                    remove: 'onBasketRemove', // * remove
                    clear: 'onBasketClear', // * removeAll
                    add: 'onBasketAdd', // * add
                    update: 'onBasketChange' // * changing records
                }
            },

            //basket_localstorage: {
            //    fields: ['id', 'query'],
            //    extend: 'Ext.data.Model',
            //    autoLoad: true,
            //    autoSync: true,
            //    proxy: {
            //        type: 'localstorage',
            //        id: 'newpos_basket'
            //    }
            //}
        });
    }
});
