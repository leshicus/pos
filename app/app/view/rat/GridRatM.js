Ext.define('Office.view.rat.GridRatM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gridrat',

    stores: {
        rat: {
            fields: [], // * без этой строчки ругается на стор без модели и на schema
            idProperty: 'id',
            pageSize: Util.ITEMS_PER_PAGE,
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Rats_Read',
                    token: '{token}',
                    params:{
                        min_date:'{get_minDate}',
                        max_date:'{get_maxDate}',
                        race_number:'{filters.race_number}'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty: 'results'
                }
            },
            storeId: 'rat',
            autoLoad: false,
            sorters: [ {
                property:'date_time',
                direction:'DESC'
            }]
        }
    },
    formulas: {
        get_minDate: function (get) {
                return Ext.Date.format(get('filters.min_date'), 'Y-m-d H:i:s');
        },
        get_maxDate: function (get) {
            return Ext.Date.format(get('filters.max_date'), 'Y-m-d H:i:s');
        }
    }
});
