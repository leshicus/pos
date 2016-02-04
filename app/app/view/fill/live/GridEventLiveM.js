Ext.define('Office.view.fill.live.GridEventLiveM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.proxy.SessionStorage',
        'Office.view.menumain.MenuMainM',
    ],
    alias: 'viewmodel.grideventlive',
    data: {
        activeTabEventId: '',
        expanded: false,
        firstFillFromLocal: 1 // * для первоначальной загрузки из хранилища при создании грида (последующие будут при нажатии пункта меню Ставки)
    },
    stores: {
        /* подготовленные данные для грида событий */
        //eventstore: {
        //    fields: [],
        //    proxy: {
        //        type: 'sessionstorage',
        //        id: 'myProxyKey',
        //        reader: {
        //            type: 'json'
        //        }
        //    },
        //    storeId: 'eventstore',
        //    listeners: {
        //        //datachanged: 'onEventStoreChange',
        //        //add: 'onAdd'
        //    }
        //},
        //// * chained store, только для отображения в гриде
        //eventstore_chained: {
        //   // source: '{line_chained}',
        //    source: '{eventstore}',
        //    itemId: 'eventstore_chained',
        //    sorters: 'time', // * сортировка внутри группы
        //    grouper: {
        //        property: 'tournament_id',
        //        // * двойная сортировка глобальных групп, сначала по спорту, потом по рейтингу
        //        // * -1 значит, что 1 перед 2, 0: на одном уровне, 1: 1 после 2
        //        sorterFn: function (person1, person2) {
        //            var sport1 = person1.data.sport_id,
        //                sport2 = person2.data.sport_id,
        //                rating1 = person1.data.rating,
        //                rating2 = person2.data.rating,
        //                tournament_name1 = person1.data.tournament_name,
        //                tournament_name2 = person2.data.tournament_name;
        //
        //            if (sport1 > sport2) { // * спорт: по возрастанию
        //                return 1;
        //            } else if (sport1 == sport2) {
        //                if (rating1 < rating2) { // * рейтинг: по убыванию
        //                    return 1;
        //                } else if (rating1 == rating2) {
        //                    if (tournament_name1 > tournament_name2) { // * турнир: по возрастанию имени
        //                        return 1;
        //                    } else if (tournament_name1 == tournament_name2) {
        //                        return 0;
        //                    } else {
        //                        return -1;
        //                    }
        //                } else {
        //                    return -1;
        //                }
        //            } else {
        //                return -1;
        //            }
        //        }
        //    },
        //    isLoadBlocked: Ext.emptyFn // * todo обход бага в 5.1.0
        //},
        //
        //sport_chained: {  // * на самом деле не chained, а обычный
        //    fields: ['id', 'name', 'slug', 'group', 'rating', 'checked', 'iconCls'],
        //    proxy: {
        //        type: 'ajax',
        //        url: Ext.util.Format.format(Server.getFillEvent(), 'sports', '{locale}'),
        //        reader: {
        //            type: 'json'
        //        },
        //        useDefaultXhrHeader: false // * для кроссдоменных запросов
        //    },
        //    autoLoad: true
        //}
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
    },

    constructor: function () {
        this.callParent(arguments);

        Ext.defer(function () {
            var menumain = Ext.ComponentQuery.query('menumain')[0],
                vm = menumain.getViewModel(),
                type = this.get('type'),
                line = vm.getStore(type),
                line_version = 'line_version.' + type,
                sportsslug = vm.getStore('sportsslug');

            if (type == 'line' || type == 'live' || type == 'rats') {
                this.setData({
                    line_version: vm.get(line_version)
                });
                this.setStores(
                    {
                        eventstore_chained: {
                            source: line,
                            itemId: 'eventstore_chained',
                            sorters: 'time', // * сортировка внутри группы
                            grouper: {
                                property: 'tournament_id',
                                // * двойная сортировка глобальных групп, сначала по спорту, потом по рейтингу
                                // * -1 значит, что 1 перед 2, 0: на одном уровне, 1: 1 после 2
                                sorterFn: function (person1, person2) {
                                    var sport1 = person1.data.sport_id,
                                        sport2 = person2.data.sport_id,
                                        rating1 = person1.data.rating,
                                        rating2 = person2.data.rating,
                                        tournament_name1 = person1.data.tournament_name,
                                        tournament_name2 = person2.data.tournament_name;

                                    if (sport1 > sport2) { // * спорт: по возрастанию
                                        return 1;
                                    } else if (sport1 == sport2) {
                                        if (rating1 < rating2) { // * рейтинг: по убыванию
                                            return 1;
                                        } else if (rating1 == rating2) {
                                            if (tournament_name1 > tournament_name2) { // * турнир: по возрастанию имени
                                                return 1;
                                            } else if (tournament_name1 == tournament_name2) {
                                                return 0;
                                            } else {
                                                return -1;
                                            }
                                        } else {
                                            return -1;
                                        }
                                    } else {
                                        return -1;
                                    }
                                }
                            },
                            isLoadBlocked: Ext.emptyFn
                        },
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
                            listeners:{
                                load:'filterSports'
                            }
                        }
                    }
                );
            }
        }, 100, this);
    }

});
