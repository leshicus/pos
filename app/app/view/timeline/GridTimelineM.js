Ext.define('Office.view.timeline.GridTimelineM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gridtimeline',
    stores: {
        timeline: {
            fields: [],
            proxy: {
                type: 'ajax',
                //url:Ext.util.Format.format(Server.getTimeline(),'{token}','{term}','{includeArchieved}'),
                url: Server.getUrl({
                    class: 'Pos_Timeline_Search',
                    token: '{token}',
                    params: {
                        term: '{filters.term}',
                        includeArchieved: '{filters.includeArchieved}'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty:'children',
                    totalProperty: 'results'
                }
            },
            storeId: 'timeline',
            autoLoad: false
        }
    }
});
