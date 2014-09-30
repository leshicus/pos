Ext.define('Office.view.accept.PanelFilterAcceptM', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.panelfilteraccept',
    stores: {
        sport: {
            fields: [
                {
                    name:'types',
                    reference:{
                        fields: [
                            'id', 'value','checked'
                        ]
                    }
                }
            ],
            proxy: {
                type: 'ajax',
                url: 'resources/php/accept/filters.php',
                reader: {
                    type: 'json',
                    rootProperty: 'sportfilter'
                },
                extraParams:{
                    mode:'office',
                    xaction:'sport'
                }
            },
            pageSize: Office.util.Utilities.pageSize,
            autoLoad: true,
            listeners : {
                //todo попытаться сделать, чтобы сразу данные байндились нормально, без этого обхода
                load : function(store) {
                    var rec      = store.getAt(0),
                        types  = rec.get('types');
                    store.loadData(types);
                }
            }
        },
        yesNo: {
            fields: ['id', 'name'],
            data: [
                ['0', "нет"],
                ['1', "да"],
            ]
        },
        live: {
            fields: ['id', 'name'],
            data: [
                ['0', "предматч"],
                ['1', "лайв"],
            ]
        }

    },
    links: {
        theSessions: {
            reference: 'Office.model.Sessions',
            id:1
        }
    },
     /*data:{
        sessions: {
            fields: [
                'administrativeBalance',
                'closeDatetime'
            ],
            proxy: {
                type: 'ajax',
                url: 'resources/php/accept/sessions.php',
                reader: {type: 'json'},
                extraParams:{
                    xaction:'getLastSessionInfo'
                }
            }
        }
    }*/
});