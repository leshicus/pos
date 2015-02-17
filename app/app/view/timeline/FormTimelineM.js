Ext.define('Office.view.timeline.FormTimelineM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.formtimeline',
    stores: {
        timelinetype: {
            fields: ['id', 'name'],
            data: [
                ['5', "Sport"],
                ['6', "Game"],
            ]
        },
        lifetime: {
            fields: ['id', 'name'],
            data: [
                ['30', "30 дней"]
            ]
        },
        searchtimelinegambler: {
            fields: [],
            storeId: 'searchtimelinegambler',
            proxy: {
                type: 'ajax',
                url: Ext.util.Format.format(Server.getSearch(), '{token}','{filters.term}'),
                reader: {
                    type: 'json',
                    rootProperty:'response'
                }
            },
            autoLoad: false
        }
    }

});