Ext.define('Office.view.timeline.GridSlipM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.TreeStore'
    ],
    alias: 'viewmodel.gridslip',
    stores: {
        slip: {
            type: 'tree',
            fields: [],
            storeId: 'slip',
            idProperty: 'slip_id',
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Timeline_Subslipstree',
                    token: '{token}',
                    params: {
                        timelineId: '{filters.timelineId}',
                        sports: '{filters.sports}',
                        timelineactions: '{filters.timelineactions}',
                        stakefrom: '{filters.stakefrom}',
                        staketo: '{filters.staketo}',
                        made_datetime_from: '{get_cbDateFrom}',
                        made_datetime_to: '{get_cbDateTo}',
                        limit: '{filters.limit}'
                    }
                }),
                reader: {
                    type: 'json'
                }
            },
            root: {
                expanded: true,
                //text: 'rows',
                loaded: true // * нужно, чтобы реагировало на autoLoad: false, а иначе все равно грузит
            },
            autoLoad: false,
            listeners: {
                // * этот beforeload для: если быстро щелкнуть на Обовить, то одни и те же данные загружаются несколько раз
                beforeload: function (store, operation, eOpts) {
                    if (store.isLoading()) return false;
                }
            }
        },
        sport: {
            fields: ['id', 'value', 'checked', 'iconCls'],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Filters_Sport',
                    token: '{token}',
                    params: {
                        mode: 'office'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'sportfilter.types'
                }
            },
            storeId: 'sport',
            autoLoad: true
        },
        limit: {
            fields: ['id', 'name'],
            data: [
                ['10', "10"],
                ['100', "100"],
                ['200', "200"],
                ['300', "300"],
                ['400', "400"],
                ['500', "500"],
                ['1000', "1000"]
            ]
        },
        timelineactions: {
            fields: ['id', 'value', 'checked'],
            data: [
                ['-1', "[Все]"],
                ['stakes', "Ставки"],
                ['t:1', "Открытие/Пополнение"],
                ['t:2', "Выплаты"],
                ['st:8', "Бонус за баллы"],
                ['st:7', "Бонус"],
                ['st:2', "Пополнение (внутренняя транзакция)"],
                ['st:1', "Снятие с баланса"]
            ]
        }
    },
    formulas: {
        get_cbDateFrom: function (get) {
            return Ext.Date.format(get('filters.made_datetime_from'), 'Y-m-d');
        },
        get_cbDateTo: function (get) {
            return Ext.Date.format(get('filters.made_datetime_to'), 'Y-m-d');
        }
    }
});
