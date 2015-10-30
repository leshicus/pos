Ext.define('Office.view.scheduleforgamefield.GridScheduleforgamefieldM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridscheduleforgamefield',
    stores: {
        scheduleforgamefield: {
            fields: [],
            proxy: {
                type: 'ajax',
                //url: Server.virtualSlip(),
                url: Server.getUrl({
                    class: 'Pos_Scheduleforgamefield_Scheduleforgamefieldread',
                    token: '{token}',
                    params: {
                        //timezones: '{filters.cbTimezone}', // * эти значения установливаются при data bind, и стор будет загружен с данными параметрами
                       // place_id: '{filters.place_id}'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty: 'results'
                },
                extraParams: {
                    /*xaction: 'read',
                    short_number: '{filters.short_number}', // * эти значения установливаются при data bind, и стор будет загружен с данными параметрами
                    place_id: '{filters.place_id}'*/
                    timezones: '{filters.cbTimezone}'
                },
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                }
            },
            storeId: 'scheduleforgamefield',
            autoLoad: true
        },
        timezone: {
            fields: ['name', 'value'],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Filters_Timezone',
                    token: '{token}',
                    params: {
                        mode: 'office'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            storeId: 'timezone',
            autoLoad: true
        }
    }

});
