Ext.define('Office.view.scheduleforgamefield.GridScheduleforgamefieldM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridscheduleforgamefield',
    stores: {
        scheduleforgamefield: {
            fields: [],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Scheduleforgamefield_Scheduleforgamefieldread',
                    token: '{token}',
                    params: {
                        timezones: '{getTimezone}' // * эти значения установливаются при data bind, и стор будет загружен с данными параметрами
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty: 'results'
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
    },
    formulas: {
        // * определяет, нужно ли показывать некоторые поля, в зависимости от количества записей в сторе
        getTimezone: {
            bind: {
                cbTimezone: '{filters.cbTimezone}'
            },
            get: function (data) {
                return encodeURIComponent(data.cbTimezone);
            }
        }
    }

});
