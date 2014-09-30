Ext.define('Office.view.rat.GridRatM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gridrat',
    stores: {
        gridrat: {
            fields: [
                'id',
                'daterun',
                'numrun',
                'result',
                'firstplace',
                'secondplace',
                'thirdplace',
                'firstcolor'
            ],
            idProperty:'id',
            proxy: {
                type: 'ajax',
                url: 'resources/data/rat/getGridRat.json',
                reader: {type: 'json'}
            },
            pageSize: Office.util.Utilities.pageSize,
            remoteSort: true,
            sorters: [{
                property: 'numrun',
                direction: 'DESC'
            }],
            autoLoad: true
        }
    }
});
