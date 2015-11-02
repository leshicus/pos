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
        'Ext.tab.Panel',
        'Ext.form.Label'
    ],
    xtype: 'fill',
    controller: 'fill',
    //reference: 'fill',
    viewModel: {
        type: 'fill'
    },
    itemId: 'main',
    layout: 'border',
    flex: 1,
    listeners: {
        render: 'onFillRender',
        //beforerender: 'onFillBeforeRender',
        // afterrender: 'onFillRender'
        destroy: 'onDestroy'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                //'filters.cbSport',
                //'filters.filterEvent',
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
                width: 360,
                title: 'События',
                //bind:{
                //    title: 'События ' + '{timer}',
                //},
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
                        xtype: 'tabpanel',
                        flex: 1,
                        //activeTab: null,
                        itemId: 'eventstab',
                        cls: 'eventstab',
                        //deferredRender:false, // * чтобы все содержимое вкладок рендерились сразу, а не в момент клика по вкладке
                        defaults:{
                            xtype: 'grideventlive',
                            flex: 1,
                            cls: 'gridgroupheader'
                        },
                        items: [
                            {
                                itemId: 'line',
                                title: 'Линия'
                            },
                            {
                                itemId: 'live',
                                title: 'Лайв'
                            },
                            {
                                itemId: 'rats',
                                glyph: Glyphs.get('paw'),
                                title: 'Крысы'
                            },
                            {
                                itemId: 'dayexpress',
                                title: 'ЭД 5ка',
                                bind:{
                                    disabled:'{!dayexpress_Loaded}'
                                },
                                listeners:{
                                    disable:'onGrideventliveDisable'
                                }
                            },
                            {
                                itemId: 'dayexpressDC',
                                title: 'ЭД ДШ',
                                bind:{
                                    disabled:'{!dayexpressDC_Loaded}'
                                },
                                listeners:{
                                    disable:'onGrideventliveDisable'
                                }
                            }
                        ],
                        listeners: {
                            tabchange: 'onEventTabChange' // * очистка центральной области
                        }
                    }
                ],
                tools: [
                    /* {
                     type: 'maximize',
                     tooltip: 'Скрыть/Раскрыть экспрессы'
                     },*/
                    {
                        type: 'cancel',
                        tooltip: 'Удалить фильтры',
                        handler:'clickEventRefresh'
                    }
                ]
            },
            {
                region: 'center',
                xtype: 'panel',
                itemId: 'centerArea',
                bind: {
                    title: '{title}'
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
                bbar: []
                //    {
                //        xtype: 'gridrat',
                //        margin: 5,
                //       // itemId:'gridrat',
                //        flex: 1,
                //        height: 300,
                //        //bind:{
                //        //    hidden:'{!showGridrat}'
                //        //}
                //    }
                //]
            },
            {
                region: 'east',
                width: 300,
                title: 'Купон',
                itemId:'eastRegion',
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
                                bind:{
                                    disabled:'{disableFastInputField}'
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
                            },
                            //{
                            //    layout: {
                            //        type: 'hbox'
                            //    },
                            //    items: [
                            //        {
                            //            xtype: 'textfield',
                            //            emptyText: 'Быстрый ввод таймлайн',
                            //            flex: 1,
                            //            enableKeyEvents: true,
                            //            //_fireEventOnEnter: true,
                            //            //selectOnFocus: true,
                            //            itemId: 'fastInputTL',
                            //            listeners: {
                            //                specialkey: 'onEnterFastInputTL'
                            //            },
                            //            bind: {
                            //                hidden: '{!showButtonBusketSearchTimeline}'
                            //            }
                            //        },
                            //        {
                            //            xtype: 'button',
                            //            tooltip: 'Выбрать таймлайн',
                            //            text: 'ТЛ',
                            //            //margin: '0 2 0 2',
                            //            //glyph: Glyphs.get('list_1'),
                            //            handler: 'onClickTimeline',
                            //            bind: {
                            //                hidden: '{!showButtonBusketSearchTimeline}'
                            //            }
                            //        }
                            //    ]
                            //}


                        ]
                    },
                    {
                        xtype: 'tabpanel',
                        flex: 1,
                        //activeTab: 0,
                        itemId: 'tabpanelBet',
                        cls: 'baskettab',
                        items: [
                            {
                                xtype: 'gridbasketsingle',
                                flex: 1,
                                minHeight:100,
                                glyph: Glyphs.get('file'),
                                itemId: 'single',
                                //title: 'Одиночные',
                                cls: 'basket-grid',
                                bind: {
                                    //disabled: '{showTabSingle}',
                                    title: 'Одиночные'+'{getCountSingle}'
                                }
                            },
                            {
                                xtype: 'gridbasketexpress',
                                flex: 1,
                                minHeight:100,
                                glyph: Glyphs.get('files'),
                                itemId: 'express',
                                cls: 'basket-grid',
                                //title: 'Экспресс',
                                bind: {
                                    //disabled: '{showTabExpress}',
                                    title: 'Экспресс'+'{getCountExpress}'
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
                        //flex: 1,
                        //padding:'5 0 0 0',
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
                                text: 'Очистить все',
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
