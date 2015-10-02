Ext.define('Office.view.chat.GridChatMesV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.chat.GridChatMesM',
        'Office.view.chat.GridChatMesC',
        'Ext.scroll.Scroller'
    ],
    xtype: 'gridchatmes',
    controller: 'gridchatmes',
    viewModel: {
        type: 'gridchatmes'
    },
    scrollable: true,
    //columnLines: true,
    rowLines: false,
    title: 'Переписка',
    frame: true,
    border: true,
    viewConfig: {
        // stripeRows: true,
        enableTextSelection: true
    },
    plugins: [
        {
            ptype: 'cellediting',
            pluginId: 'cellediting',
            clicksToEdit: 1
        }
    ],
    glyph: Glyphs.get('comments'),
    cls: 'glyphWithPadding',
    bind: '{chatmes}',
    listeners: {
        cellclick: 'onCellclick',
        scope: 'controller'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'filters.userid',
                'filters.userlogin',
                'filters.groupid',
                'filters.min_date',
                'filters.max_date',
                'filters.id',
                'filters.value',
                'login'
            ]
        });


        var grid = this,
            viewModel = this.getViewModel(),
            dateFromTo = Ext.create('Office.view.common.DateFromToV', {
                margin: 2,
                _layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                _itemIdFrom: 'min_date',
                _itemIdTo: 'max_date',
                _allowBlankFrom: false,
                _allowBlankTo: true,
                _bindFrom: '{filters.min_date}',
                _bindTo: '{filters.max_date}',
                _format: 'Y-m-d H:i:s',
                _listenersFrom: {
                    //change: 'onAddFilter',
                    // * почему-то не получается сделать как выше, пишет 'unable to dynamically resolve method onAddFilter'
                    // * поменял select to change, чтобы срабатывал ивент на setValue
                    change: function (field, n, o, e) {
                        var mainController = Office.app.getController('Main'),
                            store = viewModel.getStore('chatmes');
                        mainController.storeLoadVm(grid);
                    }
                },
                _listenersTo: {
                    //change: 'onAddFilter',
                    // * почему-то не получается сделать как выше, пишет 'unable to dynamically resolve method onAddFilter'
                    // * поменял select to change, чтобы срабатывал ивент на setValue
                    change: function (field, n, o, e) {
                        var mainController = Office.app.getController('Main'),
                            store = viewModel.getStore('chatmes');
                        mainController.storeLoadVm(grid);
                    }
                }
            });

        Ext.defer(function(){
            viewModel.set('filters.min_date', new Date());
        },10);


        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false
            },
            items: [
                {
                    text: '&nbsp<br>Пользователь',
                    dataIndex: 'login',
                    width: 140,
                    renderer: function (val) {
                        if (val) {
                            if (val == Ext.util.Cookies.get('betzet_login')) {
                                var str = '<span style="color: #54C645;font-weight: bold;float:right;">я:</span>';
                            } else {
                                var str = '<span style="color: #038D98;font-weight: bold;float:right;">' + val + ':</span>';
                            }
                            return str;
                        }
                    },
                    defaults: {
                        enableKeyEvents: true,
                        margin: 2
                    },
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            emptyText: 'Поиск',
                            //flex: 1,
                            enableKeyEvents: true,
                            _fireEventOnEnter: true,
                            itemId: 'findUser',
                            listeners: {
                                specialkey: 'onEnter'
                            },
                            bind: {
                                value: '{filters.userlogin}'
                            },
                            triggers: {// * значек лупы
                                one: {
                                    cls: 'x-form-search-trigger'
                                }
                            }
                        }
                    ]
                },
                {
                    text: 'Сообщение',
                    dataIndex: 'text',
                    cellWrap: true,
                    flex: 1
                },
                {
                    text: 'Дата',
                    dataIndex: 'datesend',
                    width: 160,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        enableKeyEvents: true,
                        margin: 2
                    },
                    items: [
                        dateFromTo
                    ]
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