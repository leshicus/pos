Ext.define('Office.view.card.FormCardM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.formcard',
    data:{
        selectedDocument:''
    },
    stores: {
        country: {
            fields: ['id', 'value'],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Filters_Country',
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
            storeId: 'country',
            autoLoad: true
        },
        document: {
            fields: ['id', 'value','resident'],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Filters_Document',
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
            storeId: 'country',
            autoLoad: true
        }
    }
});
