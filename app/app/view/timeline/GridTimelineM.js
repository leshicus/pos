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
                load: function (store, records, success, eOpts) {
                    if (!success) {
                        var gridtimeline = Ext.ComponentQuery.query('gridtimeline')[0];
                        gridtimeline.getController().resetAllButTerm();
                    }
                }
            }
        },

        // * стор для хранения предыдущих поисков ТЛ
        search: {
            fields: ['id', 'query'],
            extend: 'Ext.data.Model',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'localstorage',
                id: 'newpos_timeline_search'
            }
        }
    },
    formulas: {
        get_fio: function (get) {
            var fio = get('fio'),
                passport = get('passport'),
                phone = get('phone'),
                resident = get('resident'),
                out = '';
            if (fio) {
                out += 'ФИО ' + fio;
                //out += ', ФИО: ' + fio;
                if (passport)
                    out += ', паспорт ' + passport;
                //out += ', паспорт: ' + passport;
                if (phone)
                    out += ', тел. ' + phone;
                //out += ', телефон: ' + phone;
                if (resident)
                    out += ', ' + resident;
            }

            return out;
        }
    }
});
