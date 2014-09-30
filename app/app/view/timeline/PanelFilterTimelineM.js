Ext.define('Office.view.timeline.PanelFilterTimelineM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.panelfiltertimeline',
    stores: {
        sport: {
            fields: ['id', 'name'],
            proxy: {
                type: 'ajax',
                url: 'resources/data/timeline/getSport.json',
                reader: {type: 'json'}
            },
            autoLoad: true
        }
    }

});