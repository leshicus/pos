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
                    rootProperty: 'children',
                    totalProperty: 'results'
                }
            },
            storeId: 'timeline',
            autoLoad: false,
            listeners: {
                // * почему-то store.load callback только здесь отлавливается, а не в Util.storeLoad
                load: function(store, records, success, eOpts) {
                    if (!success) {
                       var gridtimeline= Ext.ComponentQuery.query('gridtimeline')[0];
                        gridtimeline.getController().resetAllButTerm();
                    }
                }
            }
        }

        //timelinetype: {
        //    fields: ['id', 'name'],
        //    data: [
        //        ['5', "Sport"],
        //        ['6', "Game"],
        //    ]
        //}
    },
    formulas: {
        get_fio: function (get) {
            var fio = get('fio'),
                passport = get('passport'),
                phone = get('phone'),
                resident = get('resident'),
                out = '';
            if (fio){
                out += ', ' + fio;
                //out += ', ФИО: ' + fio;
                if (passport)
                    out += ', ' + passport;
                    //out += ', паспорт: ' + passport;
                if (phone)
                    out += ', ' + phone;
                    //out += ', телефон: ' + phone;
                if (resident)
                    out += ', ' + resident;
            }

            return out;
        }
    }
});
