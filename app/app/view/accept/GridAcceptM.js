Ext.define('Office.view.accept.GridAcceptM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gridaccept',
    stores: {
        accept: {
            type: 'tree',
            fields: [],
            idProperty: 'id',
            proxy: {
                type: 'ajax',
                url: 'resources/php/accept/bets.php',
                reader: {type: 'json'}
            },
            pageSize: Office.util.Utilities.pageSize,
            remoteSort: true,
            sorters: [{
                property: 'slip_id',
                direction: 'DESC'
            }],
            root: {
                text: 'текст',
                //expanded: true,
                loaded:true // * нужно, чтобы реагировало на autoLoad: false, а иначе все равно грузит
            },
            autoLoad: false,
            // * todo убрать после обновления - баг с двойной загрузкой стора дерева
            listeners: {
                beforeload: function (store, operation, eOpts) {
                    if (store.isLoading()) return false;
                }
            }
        },
        result: {
            fields: [
                {
                    name: 'types',
                    reference: {
                        fields: [
                            'id', 'value', 'checked'
                        ]
                    }
                }
            ],
            proxy: {
                type: 'ajax',
                url: 'resources/php/accept/filters.php',
                reader: {
                    type: 'json',
                    rootProperty: 'slipstatefilter'
                },
                extraParams: {
                    mode: 'office',
                    xaction: 'slip_state'
                }
            },
            pageSize: Office.util.Utilities.pageSize,
            autoLoad: true,
            listeners: {
                //todo попытаться сделать, чтобы сразу данные байндились нормально, без этого обхода
                load: function (store) {
                    var rec = store.getAt(0),
                        types = rec.get('types');
                    store.loadData(types);
                }
            }
            /*hasMany: {
             model: {
             fields: [
             'id', 'value'
             ]
             },
             name: 'types'
             }*/
        }
    }
});
