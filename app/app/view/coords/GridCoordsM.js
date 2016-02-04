Ext.define('Office.view.coords.GridCoordsM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridcoords',
    stores: {
        coords: {
            fields: [],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Coords_Coordsannounceread',
                    token: '{token}',
                    params: {
                        date: '{get_date}'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty: 'results'
                }
            },
            storeId: 'coords',
            autoLoad: false
        }
    },
    formulas: {
        get_date: function (get) {
            return Ext.Date.format(get('filters.date'), 'Y-m-d');
        }
    }

});
