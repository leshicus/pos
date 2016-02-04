Ext.define('Office.view.menumain.MenuMainM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.menumain',

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
        },
        line: {
            fields: [],
            proxy: {
                type: 'sessionstorage',
                id  : 'myProxyKey',
                reader: {
                    type: 'json'
                }
            },
            storeId: 'line',
            listeners: {
                datachanged: 'onEventStoreChange',
                add:'onAdd'
            }
        },
        live: {
            fields: [],
            proxy: {
                type: 'sessionstorage',
                id  : 'myProxyKey',
                reader: {
                    type: 'json'
                }
            },
            storeId: 'live',
            listeners: {
                datachanged: 'onEventStoreChange',
                add:'onAdd'
            }
        },
        rats: {
            fields: [],
            proxy: {
                type: 'sessionstorage',
                id  : 'myProxyKey',
                reader: {
                    type: 'json'
                }
            },
            storeId: 'rats',
            listeners: {
                datachanged: 'onEventStoreChange',
                add:'onAdd'
            }
        },
        dayexpress: {
            fields: [],
            proxy: {
                type: 'sessionstorage',
                id  : 'myProxyKey',
                reader: {
                    type: 'json'
                }
            },
            storeId: 'dayexpress',
            //listeners: {
            //    datachanged: 'onEventStoreChange',
            //    add:'onAdd'
            //}
        },
        dayexpressDC: {
            fields: [],
            proxy: {
                type: 'sessionstorage',
                id  : 'myProxyKey',
                reader: {
                    type: 'json'
                }
            },
            storeId: 'dayexpressDC',
            //listeners: {
            //    datachanged: 'onEventStoreChange',
            //    add:'onAdd'
            //}
        }
    },
    formulas: {
        isGlobalSession: function (get) {
            var openDatetime = get('theSession.openDatetime');
            if (openDatetime) {
                return openDatetime == 'Глобальная смена';
            }
        },
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
        showButtonInfo: {
            get: function (data) {
                return parseInt(Util.getGlobalConst('ACCESS_TO_VIEW_GENERAL_RULES_IN_OFFICE_CANCEL'));
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