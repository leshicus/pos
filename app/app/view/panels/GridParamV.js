Ext.define('Office.view.panels.GridParamV', {
    extend: 'Ext.grid.Panel',
    requires: [
         'Office.view.panels.GridParamM',
         'Office.view.panels.GridParamC'
    ],
    xtype: 'gridparam',
    controller: 'gridparam',
    viewModel: {
        type: 'gridparam'
    },
    columnLines: true,
    autoScroll: true,
    title: 'Параметры',
    frame: true,
    border: true,
    viewConfig: {
        stripeRows: true
    },
    plugins: [
        {
            ptype: 'cellediting',
            pluginId: 'cellediting',
            clicksToEdit: 1
        }
    ],
    /*glyph: Glyphs.get('card'),
     cls: 'gridcard',*/
    bind: {store:'{param}'} ,
    listeners: {
        cellclick: 'onCellclick',
        scope: 'controller'
    },
    initComponent: function () {
        Utilities.initClassParams({
            scope: this,
            params: [
                'filters.panel_id',
                'filters.task_id',
                'filters.value',
                'filters.id'
            ]
        });

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false
            },
            items: [
                {
                    text: 'id',
                    dataIndex: 'id',
                    width: 60
                },
                {
                    text: 'Наименование',
                    dataIndex: 'description',
                    flex:1
                },
                {
                    text: 'Значение',
                    dataIndex: 'value',
                    width: 100,
                    editor:{
                        xtype:'textfield',
                        bind:{
                            value:'{filters.value}'
                        }
                    }
                }
            ]
        }

        this.callParent();
    }
});