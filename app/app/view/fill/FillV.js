Ext.define('Office.view.fill.FillV', {
    extend: 'Ext.container.Container',
    requires: [
        'Office.view.fill.FillC',
        'Office.view.fill.FillM',
        'Office.view.fill.FillF',
        'Office.view.fill.live.GridEventLiveV',
        'Office.view.fill.basket.GridBasketSingleV',
        'Office.view.fill.basket.GridBasketExpressV',
        'Office.view.rat.GridRatV',
        'Office.view.menumain.MenuMainM',
        'Ext.tab.Panel',
        'Ext.form.Label'
    ],
    xtype: 'fill',
    controller: 'fill',
    viewModel: {
        type: 'fill'
    },
    itemId: 'fill',
    layout: 'border',
    flex: 1,
    listeners: {
        render: 'onFillRender',
        destroy: 'onDestroy'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'locale'
            ]
        });
        var me = this,
            vm = this.getViewModel();
        vm.set('locale', Ux.locale.Manager.getCurrentLocale()['abbr']);

        Util.createTaskRunner(this);

        var toolbarEventTypes = new Ext.toolbar.Toolbar({
                itemId: 'toolbarEventTypes',
                items: [
                    {
                        xtype: 'segmentedbutton',
                        cls: 'eventtypes',
                        defaults: {
                            scale: 'medium',
                            handler: 'eventTypeClick'
                        }
                    }
                ]
            }),
            toolbarMainLine = new Ext.toolbar.Toolbar({
                itemId: 'toolbarMainLine',
                autoScroll: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                flex: 1
            });

        this.items = [
            {
                region: 'west',
                width: 370,
                title: 'События',
                collapsible: false,
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
                        xtype: 'tabpanel',
                        flex: 1,
                        itemId: 'eventstab',
                        cls: 'eventstab',
                        //deferredRender:false, // * чтобы все содержимое вкладок рендерились сразу, а не в момент клика по вкладке
                        defaults: {
                            xtype: 'grideventlive',
                            cls: 'gridgroupheader'
                        },
                        items: [
                            {
                                itemId: 'line',
                                title: 'Линия',
                                trailingBufferZone: 5,  // Keep 5 rows rendered in the table behind scroll
                                leadingBufferZone: 5, // * !!! эти параметры работают только здесь, а не в прототипе !!!
                                bind: {
                                    title: 'Линия' + '{getCountLine}'
                                }
                            },
                            {
                                itemId: 'live',
                                title: 'Лайв',
                                bufferedRenderer: false,
                                bind: {
                                    title: 'Лайв' + '{getCountLive}'
                                }
                            },
                            {
                                itemId: 'rats',
                                bufferedRenderer: false,
                                features: Ext.emptyFn(),
                                title: 'Крысы'
                            },
                            {
                                itemId: 'dayexpress',
                                bufferedRenderer: false,
                                features: Ext.emptyFn(),
                                title: 'ЭД 5ка',
                                bind: {
                                    disabled: '{!dayexpress_Loaded}'
                                },
                                listeners: {
                                    disable: 'onGrideventliveDisable'
                                }
                            },
                            {
                                itemId: 'dayexpressDC',
                                bufferedRenderer: false,
                                features: Ext.emptyFn(),
                                title: 'ЭД ДШ',
                                bind: {
                                    disabled: '{!dayexpressDC_Loaded}'
                                },
                                listeners: {
                                    disable: 'onGrideventliveDisable'
                                }
                            }
                        ],
                        listeners: {
                            tabchange: 'onEventTabChange' // * очистка центральной области
                        }
                    }
                ],
                tools: [
                    {
                        type: 'refresh',
                        tooltip: 'Обновить события',
                        handler: 'clickEventRefresh'
                    },
                    {
                        type: 'cancel',
                        tooltip: 'Удалить фильтры',
                        handler: 'clickEventCancel'
                    }
                ]
            },
            {
                region: 'center',
                xtype: 'panel',
                itemId: 'centerArea',
                bind: {
                    title: '<span style="color: #4CAE73;font-size: 20px;line-height: 20px;padding:1px;">{title}</span>'
                },
                autoScroll: true,
                frame: true,
                cls: 'eventtypes',
                style: {
                    'border-color': '#CECECE !important'
                },
                layout: {
                    type: 'hbox'
                },
                tbar: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        flex: 1,
                        items: [toolbarMainLine, toolbarEventTypes]
                    }
                ],
                bbar:[]
            },
            {
                region: 'east',
                width: 260,
                title: 'Купон',
                itemId: 'eastRegion',
                collapsible: true,
                collapsed: false,
                split: true,
                frame: true,
                border: 1,
                style: {
                    'border-color': '#CECECE !important'
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                emptyText: 'Быстрый ввод ставок',
                                flex: 1,
                                maskRe: /^[0-9\s\u00E1\u00E9\u00ED\u00F3\u00FA]$/, // * только цифры
                                enableKeyEvents: true,
                                itemId: 'fastInput',
                                listeners: {
                                    specialkey: 'onEnterFastInput',
                                    afterrender: 'onFastInputAfterrender'
                                },
                                bind: {
                                    disabled: '{disableFastInputField}'
                                }
                            },
                            {
                                layout: {
                                    type: 'hbox'
                                },
                                items: [
                                    {
                                        xtype: 'textfield',
                                        emptyText: 'Быстрый ввод игрока',
                                        flex: 1,
                                        enableKeyEvents: true,
                                        itemId: 'fastInputGambler',
                                        listeners: {
                                            specialkey: 'onEnterFastInputGambler'
                                        },
                                        bind: {
                                            hidden: '{!showButtonBusketSearchUser}'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        tooltip: 'Выбрать игрока',
                                        margin: '0 0 0 2',
                                        glyph: Glyphs.getGlyph('user'),
                                        handler: 'clickUser',
                                        bind: {
                                            hidden: '{!showButtonBusketSearchUser}'
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        tooltip: 'Выбрать таймлайн',
                                        text: 'ТЛ',
                                        margin: '0 2 0 2',
                                        handler: 'clickTimeline',
                                        bind: {
                                            hidden: '{!showButtonBusketSearchTimeline}'
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'tabpanel',
                        flex: 1,
                        itemId: 'tabpanelBet',
                        cls: 'baskettab',
                        items: [
                            {
                                xtype: 'gridbasketsingle',
                                flex: 1,
                                minHeight: 100,
                                itemId: 'single',
                                cls: 'basket-grid',
                                bufferedRenderer: false,
                                bind: {
                                    title: 'Одиночные' + '{getCountSingle}'
                                }
                            },
                            {
                                xtype: 'gridbasketexpress',
                                flex: 1,
                                minHeight: 100,
                                itemId: 'express',
                                cls: 'basket-grid',
                                leadingBufferZone: 3,
                                bind: {
                                    title: 'Экспресс' + '{getCountExpress}'
                                }
                            }
                        ],
                        listeners: {
                            tabchange: 'onBetTabChange',
                            beforetabchange: 'onBeforeBetTabChange' // * перед переключением табов проверим, что одинары принадлежат разным событиям
                        }
                    },
                    {
                        xtype: 'container',
                        layout: 'anchor',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Поставить',
                                scale: 'medium',
                                anchor: '50%',
                                margin: '0 2 0 0',
                                glyph: Glyphs.getGlyph('thumbup'),
                                handler: 'clickMakeBet',
                                bind: {
                                    disabled: '{!showBetsBetButton}'
                                }
                            },
                            {
                                xtype: 'button',
                                text: 'Очистить',
                                scale: 'medium',
                                anchor: '50%',
                                margin: '0 0 0 2',
                                glyph: Glyphs.getGlyph('cancel'),
                                handler: 'clickClearBet'
                            }
                        ]
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }

});
