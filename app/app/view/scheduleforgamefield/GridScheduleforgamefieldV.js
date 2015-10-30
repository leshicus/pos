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
    /*glyph: Glyphs.get('virtual'),
    cls: 'gridvirtual',*/
    bind: '{scheduleforgamefield}',
    listeners:{
      render:'onRender'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'filters.cbTimezone',
                'cbTimezone_model'
            ]
        });

        // * создаю taskRunner- менеджер заданий для данного раздела
        //Util.createTaskRunner(this);

       /* var short_number = Ext.create('Ext.form.field.Text', {
                _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                itemId: 'bidNum',
                bind:'{filters.short_number}',
                listeners: {
                    specialkey: 'onEnter'
                }
            }),
            placeId = Ext.create('Ext.form.field.Text', {
                _fireEventOnEnter: true,
                itemId: 'placeId',
                bind:'{filters.place_id}',
                listeners: {
                    specialkey: 'onEnter'
                }
            });*/
        
        var fieldCurrentTime = Ext.create('Ext.form.field.Text', {
            width: 200,
            selectOnFocus: true,
            itemId: 'currentTime',
          //  id: 'currentTime',
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
                width: 170,
                margin: '2 2 0 0',
                padding: '5 0 0 0',
                itemId: 'cbTimezone',
              //  id: 'cbTimezone',
                editable: false,
                queryMode: 'local',
                displayField: 'value',
                valueField: 'name',
               // _checkField: 'checked',
                /*_func: function (combo, n) {
                 me.controller.onAddFilter(combo, n);
                 },*/
                bind: {
                    store: '{timezone}',
                    selection: '{cbTimezone_model}',
                    value: '{filters.cbTimezone}'
                },
                listeners: {
                    change: 'getTimeTimeZone'
                }
            },
           /*  {
                    xtype: 'combobox',
                    itemId: 'cbIsLive',
                    width: 170,
                    //labelWidth: 50,
                    // margin: '2 2 2 30',
                    emptyText: 'Лайв',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    editable: false,
                    bind: {
                        store: '{live}',
                        selection: '{cbIsLive_model}',
                        value: '{filters.cbIsLive}'
                    },
                    listeners: {
                        change: 'onAddFilter'
                    }
                },*/
            fieldCurrentTime,
            /*{
                xtype: 'checkbox',
                itemId: 'includeArchieved',
                margin: '2 2 2 5',
                inputValue: true,
                uncheckedValue: false,
                boxLabel: 'Архивные',
                flex: 1,
                bind: {
                    value: '{filters.includeArchieved}'
                }
            }*/

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
                    width: 50,
                    /*defaults: {
                        enableKeyEvents: true,
                        margin: 2
                    },
                    items: [
                        short_number
                    ]*/
                },
                {
                    text: '№ события',
                    dataIndex: 'event_id',
                    itemId: 'event_id',
                    width: 120,
                    /*defaults: {
                        enableKeyEvents: true,
                        margin: 2
                    },
                    items: [
                        placeId
                    ]*/
                },
                {
                    text: 'Событие',
                    dataIndex: 'event_name',
                    itemId: 'event_name',
                    width: 80
                },
                {
                    text: 'Турнир',
                    dataIndex: 'tournament_name',
                    itemId: 'tournament_name',
                    width: 80
                },
                {
                    text: 'Дата',
                    dataIndex: 'start_date_time',
                    itemId: 'start_date_time',
                    width: 150
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
                    width: 150
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