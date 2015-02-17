Ext.define('Office.view.rat.GridRatM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gridrat',
    stores: {
        rat: {
            fields: [], // * без этой строчки ругается на стор без модели и на schema
            idProperty: 'id',
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Rats_Read',
                    token: '{token}',
                    params:{
                        min_date:'{filters.min_date}',
                        max_date:'{filters.max_date}',
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
            autoLoad: false
        }
    }
});
