Ext.define('Office.view.session.FormPrintLineM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.TreeStore'
    ],
    alias: 'viewmodel.formprintline',
    stores: {
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
            autoLoad: false
        },
        tournament: {
            fields: ['id', 'value', 'checked', 'iconCls'],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Filters_Tournament',
                    token: '{token}',
                    params: {
                        sport_id: '{filters.cbSport}',
                        mode:0,

                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            storeId: 'tournament',
            autoLoad: true
        }
    }
});
