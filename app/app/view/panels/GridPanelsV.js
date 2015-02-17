Ext.define('Office.view.panels.GridPanelsV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.panels.GridPanelsM',
        'Office.view.panels.GridPanelsC'
    ],
    xtype: 'gridpanels',
    controller: 'gridpanels',
    viewModel: {
        type: 'gridpanels'
    },
    columnLines: true,
    autoScroll: true,
    title: 'Панели',
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
    bind: '{panels}',
    listeners: {
        cellclick: 'onCellclick',
        scope: 'controller'
    },
    initComponent: function () {
        Utilities.initClassParams({
            scope: this,
            params: [
                'filters.panel_id',
                'filters.task_id'
            ]
        });
        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false
            },
            items: [
                {
                    text: 'Номер',
                    dataIndex: 'panel_num',
                    width: 60
                },
                {
                    text: 'Режим работы',
                    dataIndex: 'task_id',
                    flex: 1,
                    renderer: function (value, meta, rec, row, col, store, view) {
                        var vm = view.ownerCt.getViewModel(),
                            workmode = vm.getStore('workmode'),
                            record = workmode.findRecord('id', value, 0, false, true, true);
                        if(record){
                            return record.get('ru_description') || record.get('description') || record.get('name');
                        }
                    },
                    editor:{
                        xtype:'combo',
                        queryMode: 'local',
                        displayField: 'ru_description',
                        valueField: 'id',
                        valueNotFoundText: 'not found',
                        editable: false,
                        bind:{
                            store:'{workmode}',
                            value:'{filters.task_id}'
                        }
                    }
                }
            ]
        }

        this.tbar = [
            {
                text: 'Добавить',
                handler: 'onAddPanel',
                glyph: Glyphs.get('plus'),
                cls: 'plus'
            },
            {
                text: 'Удалить',
                handler: 'onDelPanel',
                glyph: Glyphs.get('minus'),
                cls: 'cancel'
            }
        ]

        this.tools = [
            {
                type: 'refresh',
                tooltip: 'Обновить'
            }
        ]

        this.callParent();
    }
});