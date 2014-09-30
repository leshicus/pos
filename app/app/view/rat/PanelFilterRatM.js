Ext.define('Office.view.rat.PanelFilterRatM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.panelfilterrat',
    stores: {
        sport: {
            fields: ['id', 'name'],
            proxy: {
                type: 'ajax',
                url: 'resources/data/rat/getSport.json',
                reader: {type: 'json'}
            },
            autoLoad: true
        }
    }

});