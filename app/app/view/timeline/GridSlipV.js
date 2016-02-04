Ext.define('Office.view.timeline.GridSlipV', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Office.view.timeline.GridSlipM',
        'Office.view.timeline.GridSlipC',
        'Office.plugin.GridColumnsDefaults',
        'Ext.tree.View',
        'Ext.tree.Panel',
    ],
    xtype: 'gridslip',
    viewModel: {
        type: 'gridslip'
    },
    controller: 'gridslip',
    columnLines: true,
    rowLines: true,
    frame: true,
    title: 'Параметры таймлайна',
    rootVisible: false,
    _collapsed: true,
    viewConfig: {
        stripeRows: true,
        loadMask: false, // * чтобы сообщение loading не показывалось
        enableTextSelection: true,
        listeners: {
            // * чтобы колонка Действие по ширине расширялась если текст большой
            refresh: function(dataview) {
                Ext.each(dataview.panel.columns, function(column) {
                    if (column._autoSizeColumn === true)
                        column.autoSize();
                })
            }
        }
    },
    //enableLocking: true, // * глючит с деревьями
    /*glyph: Glyphs.get('list_1'),
     cls: 'gridslip',*/
    bind: '{slip}',

    initComponent: function () {
        /*
         1) сохраняем токен в VM, чтобы его потом параметризировать там
         2) и timelineId тоже самое, но это сделаем уже в контроллере
         */

        Util.initClassParams({
            scope: this,
            params: [
                'filters.timelineId',
                'filters.timelineactions',
                'filters.stakefrom',
                'filters.staketo',
                'filters.limit',
                'filters.made_datetime_from',
                'filters.made_datetime_to',
                'filters.sports'
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
                    xtype: 'treecolumn',
                    text: 'Действие',
                    dataIndex: 'operation',
                    itemId: 'gridslip-operation',
                    minWidth: 350,
                    maxWidth: 580,
                    _autoSizeColumn:true
                },
                {
                    text: 'Сумма',
                    dataIndex: 'stake',
                    width: 130,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            emptyText: 'От',
                            enableKeyEvents: true,
                            itemId: 'stakefrom',
                            margin: '0 2 0 2',
                            listeners: {
                                specialkey: 'onEnter'
                            },
                            bind: {
                                value: '{filters.stakefrom}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            emptyText: 'До',
                            enableKeyEvents: true,
                            itemId: 'staketo',
                            margin: '2 2 2 2',
                            listeners: {
                                specialkey: 'onEnter'
                            },
                            bind: {
                                value: '{filters.staketo}'
                            }
                        }
                    ]
                },
                {
                    text: 'Коэф.',
                    dataIndex: 'coefficient',
                    width: 70
                },
                {
                    text: 'Результат',
                    dataIndex: 'result_text',
                    width: 130,
                    renderer: Util.renderResult
                },
                {
                    text: 'Совершена',
                    dataIndex: 'made_datetime',
                    width: 130,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'datefield',
                            emptyText: 'Дата с',
                            margin: '0 2 0 2',
                            format: 'Y-m-d',
                            enableKeyEvents: true,
                            itemId: 'made_datetime_from',
                            listeners: {
                                specialkey: 'onEnter'
                            },
                            bind: {
                                value: '{filters.made_datetime_from}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            emptyText: 'Дата по',
                            margin: '2 2 2 2',
                            format: 'Y-m-d',
                            enableKeyEvents: true,
                            itemId: 'made_datetime_to',
                            listeners: {
                                specialkey: 'onEnter'
                            },
                            bind: {
                                value: '{filters.made_datetime_to}'
                            }
                        }
                    ]
                },
                {
                    text: 'Рассчитана',
                    dataIndex: 'calc_datetime',
                    width: 130,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    }
                },
                {
                    text: 'Выигрыш',
                    dataIndex: 'win_sum',
                    width: 130
                },
                {
                    text: 'Лайв',
                    dataIndex: 'is_live',
                    width: 55,
                    renderer: function (val, meta, rec) {
                        if (val == 'Да') {
                            meta.align = 'center';
                            return '<span role="button" class="fa fa-check" style="color: green" data-qtip="Да"></span>';
                        } else if (val == 'Нет') {
                            return '';
                        } else {
                            return val;
                        }
                    }
                }
            ]
        };

        this.tbar = [
            {
                xtype: 'combobox',
                itemId: 'limit',
                width: 110,
                emptyText: 'Количество',
                queryMode: 'local',
                displayField: 'name',
                value: 100,
                valueField: 'id',
                editable: false,
                bind: {
                    store: '{limit}',
                    selection: '{limit_model}',
                    value: '{filters.limit}'
                }
            },
            {
                xtype: 'combocheck',
                emptyText: 'Действие',
                width: 170,
                itemId: 'timelineactions',
                editable: false,
                queryMode: 'local',
                displayField: 'value',
                valueField: 'id',
                padding:'5 0 0 0',
                _checkField: 'checked',
                _bind: {
                    store: '{timelineactions}',
                    //selection: '{timelineactions_model}',
                    value: '{filters.timelineactions}'
                }
            },
            {
                xtype: 'combocheck',
                emptyText: 'Вид спорта',
                width: 170,
                itemId: 'cbSport',
                editable: false,
                queryMode: 'local',
                displayField: 'value',
                valueField: 'id',
                padding:'5 0 0 0',
                _checkField: 'checked',
                _bind: {
                    store: '{sport}',
                    //selection: '{cbSport_model}',
                    value: '{filters.sports}'
                }
            }
        ];

        this.tools = [
            {
                type: 'refresh',
                tooltip: 'Обновить'
            },
            {
                type: 'close',
                tooltip: 'Удалить фильтры'
            }
        ];

        this.callParent();
    }
});