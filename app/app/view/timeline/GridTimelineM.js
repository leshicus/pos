Ext.define('Office.view.timeline.GridTimelineM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gridtimeline',
    stores: {
        yesNo: {
            fields: ['id', 'name'],
            data: [
                ['0', "нет"],
                ['1', "да"],
            ]
        },
        gridtimeline: {
            fields: [
                'id',
                'num',
                'type',
                'datecalc'
            ],
            idProperty:'id',
            proxy: {
                type: 'ajax',
                url: 'resources/data/timeline/getGridTimeline.json',
                reader: {type: 'json'}
            },
            pageSize: Office.util.Utilities.pageSize,
            remoteSort: true,
            sorters: [{
                property: 'num',
                direction: 'DESC'
            }],
            autoLoad: true,
            storeId:'gridtimeline'
        }
    }
});
