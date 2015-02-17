Ext.define('Office.view.session.FormPrintLineM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.TreeStore'
    ],
    alias: 'viewmodel.formprintline',
    stores: {
        sport: {
            model: new Office.model.SportM,
            storeId: 'sport',
            autoLoad: false
        }
    }
});
