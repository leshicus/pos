Ext.define('Office.view.card.PanelFilterCardM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.panelfiltercard',
    stores: {
        sport: {
            fields: ['id', 'name'],
            proxy: {
                type: 'ajax',
                url: 'resources/data/card/getSport.json',
                reader: {type: 'json'}
            },
            autoLoad: true
        }
    }

});