Ext.define('Office.view.session.GridLastSessionM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridlastsession',
    stores: {
        lastsession: {
            fields: [], // * без этой строчки ругается на стор без модели и на schema
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Sessions_Lastsessions',
                    token: '{token}'
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows',
                    totalProperty: 'results'
                }
            },
            storeId: 'lastsession',
            autoLoad: true
        }
    }
});
