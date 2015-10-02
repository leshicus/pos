Ext.define('Office.view.timeline.GridSearchM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gridsearch',
    stores: {
        searchtimelinegambler: {
            fields: [],
            storeId: 'searchtimelinegambler',
            internalId:'id',
            proxy: {
                type: 'ajax',
                url: Ext.util.Format.format(Server.getSearch(), '{token}','{filters.term}'),
                reader: {
                    type: 'json',
                    rootProperty:'response'
                }
            },
            autoLoad: false,
            listeners: {
                load:'loadSearchTimelineGambler'
            }
        }
    }

});