Ext.define('Office.view.fill.FillV', {
    extend: 'Ext.container.Container',
    requires: [
        'Office.view.fill.FillC',
        'Office.view.fill.FillM',
        'Office.view.fill.GridLiveV',
        'Office.view.fill.GridLineV',
        'Ext.tab.Panel',
        'Ext.form.Label'
    ],
    xtype: 'fill',
    controller: 'fill',
    viewModel: {
        type: 'fill'
    },
    layout: 'border',
    flex: 1,
    listeners: {
        // render: 'loadAjaxEvents'
    },
    initComponent: function () {
        Utilities.initClassParams({
            scope: this,
            params: [
                'filters.cbSport'
            ]
        });
        var me = this;

        this.items = [
            {
                region: 'west',
                width: 300,
                title: 'События',
                collapsible: true,
                collapsed: false,
                split: true,
                frame: true,
                border: 0,
                style: {
                    'border-color': '#CECECE !important'
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'combocheck',
                        emptyText: 'Вид спорта',
                        itemId: 'cbSport',
                        editable: false,
                        queryMode: 'local',
                        displayField: 'value',
                        valueField: 'id',
                        _checkField: 'checked',
                        _bind: {
                            store: '{sport}',
                            selection: '{cbSport_model}',
                            value: '{filters.cbSport}'
                        },
                        _func: function (combo, n) {
                            me.controller.onAddFilter(combo, n);
                        }
                    },
                    {
                        xtype: 'tabpanel',
                        flex: 1,
                        autoScroll: true,
                        activeTab: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'gridline',
                                flex: 1,
                                title: 'Линия',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                }
                            },
                            {
                                xtype: 'gridlive',
                                flex: 1,
                                title: 'Лайв',
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch'
                                }
                            }
                        ]
                    }
                ],
                tools: [
                    {
                        type: 'maximize',
                        tooltip: 'Скрыть/Раскрыть экспрессы'
                    },
                    {
                        type: 'refresh',
                        tooltip: 'Обновить'
                    }
                ]
            },
            {
                xtype: 'panel',
                region: 'center',
                flex: 1,
                frame: true,
                border: 1,
                cls: 'eventtypes',
                style: {
                    'border-color': '#CECECE !important'
                },
                tbar: [
                    {
                        xtype: 'segmentedbutton',
                        dock: 'top',
                        cls: 'eventtypes',
                        defaults: {
                            scale: 'medium'
                        },
                        items: [
                            {
                                text: 'Основные',
                                itemId: 'main'
                            },
                            {
                                text: 'Форы',
                                itemId: 'fora',
                            },
                            {
                                text: 'Тоталы',
                                itemId: 'total',
                            },
                            {
                                text: 'Голы',
                                itemId: 'goal',
                            },
                            {
                                text: 'Таймы',
                                itemId: 'time',
                            },
                            {
                                text: 'Разное',
                                itemId: 'misc',
                            },
                            {
                                text: 'Предупреждения',
                                itemId: 'warning',
                            },
                            {
                                text: 'Угловые',
                                itemId: 'corner',
                                style: {
                                    "border-right-width": "0"
                                }
                            }
                        ]
                    }
                ],
                items: []
            },
            {
                region: 'east',
                width: 200,
                title: 'Купон',
                collapsible: true,
                collapsed: false,
                split: true,
                frame: true,
                border: 1,
                style: {
                    'border-color': '#CECECE !important'
                }
            }
        ];

        this.callParent(arguments);
    }

});
