Ext.define('Office.view.players.GridPlayersM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridplayers',
    stores: {
        players: {
            fields: [],
            proxy: {
                type: 'ajax',
                //url: Server.virtualSlip(),
                url: Server.getUrl({
                    class: 'Pos_Officeplayers_Officeplayersread',
                    token: '{token}',
                   /* params: {
                        short_number: '{filters.short_number}', // * эти значения установливаются при data bind, и стор будет загружен с данными параметрами
                        place_id: '{filters.place_id}'
                    }*/
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty: 'results'
                },
                /*extraParams: {
                    xaction: 'read',
                    short_number: '{filters.short_number}', // * эти значения установливаются при data bind, и стор будет загружен с данными параметрами
                    place_id: '{filters.place_id}'
                },*/
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                }
            },
            storeId: 'virtual',
            autoLoad: true
        }
    }

});
