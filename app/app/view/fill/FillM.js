Ext.define('Office.view.fill.FillM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.TreeStore'
    ],
    alias: 'viewmodel.fill',
    stores:{
        sport: {
            model: new Office.model.SportM,
            storeId: 'sport',
            autoLoad: true
        }
    }


});
