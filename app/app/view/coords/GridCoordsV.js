Ext.define('Office.view.coords.GridCoordsV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.coords.GridCoordsM',
        'Office.view.coords.GridCoordsC'
    ],
    xtype: 'gridcoords',
    viewModel: {
        type: 'gridcoords'
    },
    columnLines: true,
    flex: 1,
    title: 'Анонс матчей для УГМ',
    frame: true,
    controller: 'gridcoords',
    viewConfig: {
        stripeRows: true,
        loadMask: false // * чтобы сообщение loading не показывалось
    },
    bind: '{coords}',

    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'filters.date'
            ]
        });

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                }
            },
            items: [
                {
                    text: 'Дата начала',
                    dataIndex: 'datetime',
                    itemId: 'datetime',
                    width: 150,
                    items: [
                        {
                            xtype: 'datefield',
                            emptyText: 'Дата начала',
                            itemId: 'date',
                            minValue: new Date(),
                            format: 'Y-m-d',
                            enableKeyEvents: true,
                            margin: '0 2 2 2',
                            listeners: {
                                specialkey: 'onEnter',
                                change:'onChange',
                                afterrender:'onAfterRenderDate'
                            },
                            bind: {
                                value: '{filters.date}'
                            }
                        }
                    ]
                },
                {
                    text: 'Название матча',
                    dataIndex: 'event',
                    itemId: 'event',
                    flex:1
                },
                {
                    text: 'Турнир',
                    dataIndex: 'tournament',
                    itemId: 'tournament',
                    flex:1
                },
                {
                    text: 'Спорт',
                    dataIndex: 'sport',
                    itemId: 'sport',
                    width: 200
                }
            ]
        }

        this.tools = [
            {
                type: 'refresh',
                tooltip: 'Обновить'
            }
        ]

        this.callParent();
    }
});