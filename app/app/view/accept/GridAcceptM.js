Ext.define('Office.view.accept.GridAcceptM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.TreeStore'
    ],
    alias: 'viewmodel.gridaccept',
    stores: {
        yesNo: {
            fields: ['id', 'name'],
            data: [
                [2, "нет"],
                [1, "да"],
            ]
        },
        accept: {
            type: 'tree',
            fields: [ ],
            idProperty:'slip_id',
            storeId: 'accept', // * чтобы в контроллере можно было обращаться
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Bets_Office',
                    token: '{token}',
                    params: {
                        cbDateType: '{filters.cbDateType}',
                        cbDateFrom: '{get_cbDateFrom}',
                        cbTimeFrom: '{get_cbTimeFrom}',
                        cbDateTo: '{get_cbDateTo}',
                        cbTimeTo: '{get_cbTimeTo}',
                        cbStateSlip: '{filters.cbStateSlip}',
                        cbPaid: '{filters.cbPaid}',
                        cbIsLive: '{filters.cbIsLive}', // формула берет из модели значение
                        cbByBets: '{filters.cbByBets}',
                        cbSport: '{filters.cbSport}',
                        cbSlipId: '{filters.cbSlipId}',
                        placeName: 'office',
                        page: '1'
                    }
                }),
                reader: {
                    type: 'json'
                }
            },
            root: {
                expanded: true,
                loaded: true // * нужно, чтобы реагировало на autoLoad: false, а иначе все равно грузит
            },
            autoLoad: false,
            // * todo убрать после обновления - баг с двойной загрузкой стора дерева
            listeners: {
                /*   beforeload: function (store, operation, eOpts) {
                 if (store.isLoading()) return false;
                 }*/
                //load: 'onStoreLoad'
            }
        },
        result: {
            fields: [
                'id', 'value', 'checked'
            ],
            storeId: 'result',
            proxy: {
                type: 'ajax',
                //url: Ext.util.Format.format(Server.getFilterSlipState(), '{token}'),
                url: Server.getUrl({
                    class: 'Pos_Filters_Slipstate',
                    token: '{token}',
                    params: {
                        mode: 'office'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'slipstatefilter.types'
                }
            },
            pageSize: Utilities.pageSize,
            autoLoad: false
        },
        /*sport: {
            fields: [
                'id', 'value', 'checked', 'iconCls'
            ],
            storeId: 'sport',
            proxy: {
                type: 'ajax',
                //url: Ext.util.Format.format(Server.getFilterSport(),'{token}'),
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
            autoLoad: false,
            listeners: {
                //todo попытаться сделать, чтобы сразу данные байндились нормально, без этого обхода
                *//*load : function(store) {
                 var rec      = store.getAt(0),
                 types  = rec.get('types');
                 store.loadData(types);
                 }*//*
            }
        },*/
        sport: {
            model: new Office.model.SportM,
            storeId: 'sport',
            autoLoad: false
        },
        // * когда 2, тогда показываются и удаленные, со статусом -1
        paid: {
            fields: ['id', 'name'],
            data: [
                ['0', "[Все]"],
                ['1', "да"],
                ['2', "нет"]
            ]
        },
        live: {
            fields: ['id', 'name'],
            data: [
                ['-1', "[Все]"],
                ['0', "предматч"],
                ['1', "лайв"],
            ]
        }
    },
    // * формулы берут из модели значение
    formulas: {
        get_cbIsLive: function (get) {
            if (get('cbIsLive_model') && !get('cbIsLive_model').phantom)
                return get('cbIsLive_model').get('id');
            else
                return '';
        },
        get_cbStateSlip: function (get) {
            if (get('cbStateSlip_model') && !get('cbStateSlip_model').phantom)
                return get('cbStateSlip_model').get('id');
            else
                return '';
        },
        get_cbPaid: function (get) {
            if (get('cbPaid_model') && !get('cbPaid_model').phantom)
                return get('cbPaid_model').get('id');
            else
                return '';
        },
        get_cbSport: function (get) {
            if (get('cbSport_model') && !get('cbSport_model').phantom)
                return get('cbSport_model').get('id');
            else
                return '';
        },
        get_cbDateFrom: function (get) {
            if (get('filters.cbDateType') == '0')
                return Ext.Date.format(get('filters.cbDateFromMade'), 'Y-m-d');
            else
                return Ext.Date.format(get('filters.cbDateFromCalc'), 'Y-m-d');
        },
        get_cbTimeFrom: function (get) {
            if (get('filters.cbDateType') == '0')
                return Ext.Date.format(get('filters.cbTimeFromMade'), 'H:i:s');
            else
                return Ext.Date.format(get('filters.cbTimeFromCalc'), 'H:i:s');
        },
        get_cbDateTo: function (get) {
            if (get('filters.cbDateType') == '0')
                return Ext.Date.format(get('filters.cbDateToMade'), 'Y-m-d');
            else
                return Ext.Date.format(get('filters.cbDateToCalc'), 'Y-m-d');
        },
        get_cbTimeTo: function (get) {
            if (get('filters.cbDateType') == '0')
                return Ext.Date.format(get('filters.cbTimeToMade'), 'H:i:s');
            else
                return Ext.Date.format(get('filters.cbTimeToCalc'), 'H:i:s');
        }
    }
});
