Ext.define('Office.view.menumain.MenuMainM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.menumain',
    // * в data добавляется theSession после обновления данных по сессии
    /* data:{
     isGlobalSession:'isGlobalSession'
     },*/
    stores: {
        // * нужен исключительно для того, чтобы получить поле slug для markets.
        // * Виды спорта грузим отдельно
        sportsslug: {
            fields: ['id', 'name', 'slug', 'group', 'rating', 'checked', 'iconCls'],
            proxy: {
                type: 'ajax',
                url: Ext.util.Format.format(Server.getFillEvent(), 'sports', '{locale}'),
                reader: {
                    type: 'json'
                },
                useDefaultXhrHeader: false // * для кроссдоменных запросов
            },
            storeId: 'sportsslug',
            autoLoad: true,
            listeners: {
                load: 'loadMarkets' // * ex onFillRender
            }
        },
        outcomes: {
            fields: [],
            proxy: {
                type: 'ajax',
                url: Ext.util.Format.format(Server.getFillEvent(), 'outcomes', '{locale}'),
                reader: {
                    type: 'json'
                },
                useDefaultXhrHeader: false // * для кроссдоменных запросов
            },
            storeId: 'outcomes',
            autoLoad: true
        },
        basket_localstorage: {
            fields: ['id', 'query'],
            extend: 'Ext.data.Model',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'localstorage',
                id: 'newpos_basket'
            }
        }
    },
    formulas: {
        isGlobalSession: function (get) {
            var openDatetime = get('theSession.openDatetime');
            if (openDatetime) {
                return openDatetime == 'Глобальная смена';
            }
        },
        //getShowButtonPay: {
        //    get: function (data) {
        //        var globals = Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals');
        //        return globals.use_ndfl || globals.keepRecordsOfPlayers;
        //    }
        //},
        getShowButtonGameacc: {
            get: function (data) {
                var globals = Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals');
                return !globals.use_ndfl;
            }
        },
        getShowButtonTimeline: {
            get: function (data) {
                var globals = Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals');
                return globals.use_ndfl;
            }
        },
        getShowButtonVirtual: {
            get: function (data) {
                var globals = Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals');
                return globals.user_in_club;
            }
        },
        getShowButtonPanel: {
            get: function (data) {
                var globals = Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals');
                return globals.user_in_club;
            }
        },
        getShowButtonCard: {
            get: function (data) {
                var globals = Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals');
                return globals.use_ndfl || globals.keepRecordsOfPlayers;
            }
        },
        isGlobalSession: function(get) {
            var openDatetime = get('theSession.openDatetime');
            if (openDatetime) {
                return openDatetime == 'Глобальная смена';
            }
        }
    }

});