Ext.define('Office.view.ratbets.FaceRatbetsV', {
    extend: 'Ext.container.Container',
    requires: [
        //'Office.view.fill.FillC',
        'Office.view.fill.FillM',
        //'Office.view.fill.live.GridEventLiveV',
        'Office.view.ratbets.GridEventRatsV',
        'Office.view.fill.basket.GridBasketSingleV',
        'Office.view.fill.basket.GridBasketExpressV',
        'Office.view.rat.GridRatV',
        'Ext.tab.Panel',
        'Ext.form.Label'
    ],
    xtype: 'faceratbets',
    controller: 'fill',
    viewModel: {
        type: 'fill'
    },
    itemId: 'main',
    layout: 'border',
    flex: 1,
    listeners: {
        render: 'onFillRenderRats',
        destroy: 'onDestroy'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'locale'
            ]
        });
        var vm = this.getViewModel();
            //runner = new Ext.util.TaskRunner();
        vm.set('locale', Ux.locale.Manager.getCurrentLocale()['abbr']);
       // vm.set('taskRunner', runner);
        Util.createTaskRunner(this);

        this.items = [
            {
                region: 'west',
                width: 240,
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
                        xtype: 'grideventrats',
                        flex: 1,
                        itemId: 'rats',
                        cls: 'gridgroupheader'
                    }
                ],
                tools: [
                    {
                        type: 'refresh',
                        tooltip: 'Обновить'
                    }
                ]
            },
            {
                region: 'center',
                xtype: 'panel',
                bind: {
                    title: '{title}'
                },
                frame: true,
                style: {
                    'border-color': '#CECECE !important'
                },
                layout: {
                    type: 'border'
                },
                items: [
                    {
                        xtype: 'container',
                        flex: 1,
                        region: 'center',
                        itemId: 'centerArea',
                        layout: {
                            type: 'hbox'
                        }
                    },
                    {
                        xtype: 'gridrat',
                        margin: 5,
                        itemId:'rats',
                        height: 300,
                        collapsible: true,
                        collapsed: false,
                        split: true,
                        region: 'south'
                    }
                ]
            },
            {
                region: 'east',
                width: 300,
                title: 'Купон',
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
                                enableKeyEvents: true,
                                itemId: 'fastInput',
                                disabled: true
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
                        activeTab: 0,
                        itemId: 'tabpanelBet',
                        cls: 'eventstab',
                        items: [
                            {
                                xtype: 'gridbasketsingle',
                                flex: 1,
                                glyph: Glyphs.get('file'),
                                itemId: 'single',
                                cls: 'basket-grid',
                                title: 'Одиночные'
                            },
                            {
                                xtype: 'gridbasketexpress',
                                flex: 1,
                                glyph: Glyphs.get('files'),
                                itemId: 'express',
                                cls: 'basket-grid',
                                title: 'Экспресс',
                                bind: {
                                    disabled: '{!showBetsActivateTab}'
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
                                    disabled: '{!get_show_bets_bet_button}'
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