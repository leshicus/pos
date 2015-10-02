Ext.define('Office.view.fill.live.GridEventLiveM', {
    extend: 'Ext.app.ViewModel',
   // extend: 'Ext.app.ViewModel',
    requires: [
        // 'Office.view.menumain.MenuMainM'
    ],
    alias: 'viewmodel.grideventlive',
    data: {
        activeTabEventId:'',
        firstFillFromLocal:1 // * для первоначальной загрузки из хранилища при создании грида (последующие будут при нажатии пункта меню Ставки)
    },
    stores: {
        rawdata: {
            fields: [], // * без этой строчки ругается на стор без модели и на schema
            proxy: {
                type: 'ajax',
                url: Ext.util.Format.format(Server.getFillEvent(), '{command}', '{locale}', '{line_version}'),
                reader: {
                    type: 'json'
                },
                useDefaultXhrHeader: false // * для кроссдоменных запросов
            },
            storeId: 'rawdata',
            listeners: {
                datachanged: 'loadRawData'
            }
        },
        /* подготовленные данные для грида событий */
        eventstore: {
            fields: [],
            proxy: {
                type: 'memory',
                reader: {
                    type: 'json'
                }
            },
            //groupField: 'tournament_name',
            //groupField: 'sport_id',
            storeId: 'eventstore',
            listeners: {
                datachanged: 'onEventStoreChange'
            }
        },
        // * chained store, только для отображения в гриде
        eventstore_chained: {
            source: '{eventstore}',
            itemId: 'eventstore_chained',
            //groupField: 'tournament_name',
            sorters: 'time', // * сортировка внутри группы
            grouper: {
                property: 'tournament_name',
                // * двойная сортировка глобальных групп, сначала по спорту, потом по рейтингу
                sorterFn: function (person1, person2) {
                    var sport1 = person1.data.sport_id,
                        sport2 = person2.data.sport_id,
                        rating1 = person1.data.rating,
                        rating2 = person2.data.rating;
                    if (sport1 > sport2) {
                        return 1;
                    } else if (sport1 == sport2) {
                        return (rating1 < rating2) ? 1 : (rating1 === rating2 ? 0 : -1);
                    } else {
                        return -1;
                    }
                }
            },
            isLoadBlocked: Ext.emptyFn // * todo обход бага в 5.1.0
        },

        sport_chained: {  // * на самом деле не chained, а обычный
            fields: ['id', 'name', 'slug', 'group', 'rating', 'checked', 'iconCls'],
            proxy: {
                type: 'ajax',
                url: Ext.util.Format.format(Server.getFillEvent(), 'sports', '{locale}'),
                reader: {
                    type: 'json'
                },
                useDefaultXhrHeader: false // * для кроссдоменных запросов
            },
            //storeId: 'sportsslug',
            autoLoad: true,
            listeners: {
                //load: 'loadMarkets' // * ex onFillRender
            }
        }
    },

    formulas: {
        disableFastInputField: {
            bind: {
                activeTabEventId: '{activeTabEventId}'
            },
            get: function (data) {
                return BasketF.isDayExpress(data.activeTabEventId);
            }
        }

    }

});
