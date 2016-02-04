Ext.define('Office.view.scheduleforgamefield.GridScheduleforgamefieldV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.Img',
        'Office.view.scheduleforgamefield.GridScheduleforgamefieldM',
        'Office.view.scheduleforgamefield.GridScheduleforgamefieldC'
    ],
    xtype: 'gridscheduleforgamefield',
    viewModel: {
        type: 'gridscheduleforgamefield'
    },
    columnLines: true,
    flex: 1,
    title: 'График для игры на поле',
    frame: true,
    controller: 'gridscheduleforgamefield',
    viewConfig: {
        stripeRows: true,
        loadMask: false // * чтобы сообщение loading не показывалось
    },
    bind: '{scheduleforgamefield}',
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'filters.cbTimezone',
                'cbTimezone_model'
            ]
        });

        var fieldCurrentTime = Ext.create('Ext.form.field.Text', {
            width: 100,
            selectOnFocus: true,
            emptyText:'Время',
            itemId: 'currentTime',
            listeners:{
                afterrender: 'getTimeTimeZone'
            }
        });

        this.tbar = [
            {
                text: 'Печать',
                glyph: Glyphs.get('print'),
                handler: 'onPrintData'
            },
            {
                xtype: 'combobox',
                emptyText: 'Часовой пояс',
                width: 150,
                margin: '2 2 0 0',
                padding: '5 0 0 0',
                itemId: 'cbTimezone',
                editable: false,
                queryMode: 'local',
                displayField: 'value',
                valueField: 'name',
                bind: {
                    store: '{timezone}',
                    selection: '{cbTimezone_model}',
                    value: '{filters.cbTimezone}'
                },
                listeners: {
                    change: 'getTimeTimeZone'
                }
            },
            fieldCurrentTime,
        ];

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
                    text: 'id',
                    dataIndex: 'id',
                    itemId: 'id',
                    width: 70
                },
                {
                    text: '№ события',
                    dataIndex: 'event_id',
                    itemId: 'event_id',
                    width: 100
                },
                {
                    text: 'Событие',
                    dataIndex: 'event_name',
                    itemId: 'event_name',
                    width: 150
                },
                {
                    text: 'Турнир',
                    dataIndex: 'tournament_name',
                    itemId: 'tournament_name',
                    width: 140
                },
                {
                    text: 'Дата',
                    dataIndex: 'start_date_time',
                    itemId: 'start_date_time',
                    width: 140
                },
                {
                    text: 'ТВ канал',
                    dataIndex: 'tv_channel',
                    itemId: 'tv_channel',
                    width: 80,
                    renderer: Ext.util.Format.numberRenderer('0,0.00')
                },
                {
                    text: 'Кликер1',
                    dataIndex: 'clicker1',
                    itemId: 'clicker1',
                    width: 150
                },
                {
                    text: 'Кликер2',
                    dataIndex: 'clicker2',
                    itemId: 'clicker2',
                    width: 150
                },
                {
                    text: 'Аналитик',
                    dataIndex: 'analyst',
                    itemId: 'analyst',
                    width: 150
                },
                {
                    text: 'Телефон',
                    dataIndex: 'phone',
                    itemId: 'phone',
                    width: 110
                },
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