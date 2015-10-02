Ext.define('Office.view.virtual.GridVirtualM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridvirtual',
    stores: {
        virtual: {
            fields: [],
            proxy: {
                type: 'ajax',
                //url: Server.virtualSlip(),
                url: Server.getUrl({
                    class: 'Pos_Virtualslip_Virtualslipread',
                    token: '{token}',
                    params: {
                        short_number: '{filters.short_number}', // * эти значения установливаются при data bind, и стор будет загружен с данными параметрами
                        place_id: '{filters.place_id}'
                    }
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
        },
        //basket_localstorage: {
        //    fields: ['id', 'query'],
        //    extend: 'Ext.data.Model',
        //    autoLoad: true,
        //    autoSync: true,
        //    proxy: {
        //        type: 'localstorage',
        //        id: 'newpos_basket'
        //    }
        //}
    }

});
