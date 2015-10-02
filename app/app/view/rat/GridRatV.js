Ext.define('Office.view.rat.GridRatV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.toolbar.Paging',
        'Office.view.rat.GridRatM',
        'Office.view.rat.GridRatC',
        'Office.view.common.DateFromToV'
    ],
    xtype: 'gridrat',
    viewModel: {
        type: 'gridrat'
    },
    controller: 'gridrat',
    columnLines: true,
    //flex: 1,
    title: 'Крысы: история ставок',
    frame: true,
    viewConfig: {
        stripeRows: true
    },
    bind: '{rat}',
    listeners: {
        //render: 'onRatRender'
    },
    bbar: [
        {
            xtype: 'pagingtoolbar',
            pageSize:Util.ITEMS_PER_PAGE,
            bind: {
                store: '{rat}'
            },
            displayInfo: true,
            displayMsg: 'Показаны записи {0} - {1} из {2}',
            emptyMsg: "Нет записей для отображения"
        }
    ],
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'filters.min_date',
                'filters.max_date',
                'filters.race_number'
            ]
        });

        var grid = this,
            viewModel = this.getViewModel(),
            date = Ext.create('Office.view.common.DateFromToV', {
                margin: 2,
                _layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                _itemIdFrom: 'min_date',
                _itemIdTo: 'max_date',
                _allowBlankFrom: false,
                _allowBlankTo: true,
                _bindFrom:'{filters.min_date}',
                _bindTo:'{filters.max_date}',
                //_dateFrom:dateFrom,
                _format: 'Y-m-d H:i:s',
                _listenersFrom: {
                    //change: 'onAddFilter',
                    // * почему-то не получается сделать как выше, пишет 'unable to dynamically resolve method onAddFilter'
                    // * поменял select to change, чтобы срабатывал ивент на setValue
                    change: function (field, n, o, e) {
                        var mainController = Office.app.getController('Main'),
                            store = viewModel.getStore('rat');
                        // mainController.onAddFilterVm(field, n, o, e, false, store, me);
                        mainController.storeLoadVm(grid);
                    }
                },
                _listenersTo: {
                    //change: 'onAddFilter',
                    // * почему-то не получается сделать как выше, пишет 'unable to dynamically resolve method onAddFilter'
                    // * поменял select to change, чтобы срабатывал ивент на setValue
                    change: function (field, n, o, e) {
                        var mainController = Office.app.getController('Main'),
                            store = viewModel.getStore('rat');
                        // mainController.onAddFilterVm(field, n, o, e, false, store, me);
                        mainController.storeLoadVm(grid);
                    }
                }
            });

        // * установка начального значения Дата с
        var dateFrom = Ext.Date.subtract(new Date(), Ext.Date.MINUTE, 20);
        Ext.defer(function(){
            viewModel.set('filters.min_date',dateFrom);
        },100,this);

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
                    text: 'Дата и время',
                    dataIndex: 'date_time',
                    itemId: 'date_time',
                    width: 180,
                    items: [
                        date
                    ]
                },
                {
                    text: 'Номер забега',
                    dataIndex: 'race_number',
                    itemId: 'race_number',
                    width: 120,
                    defaults: {
                        enableKeyEvents: true,
                        margin: 2
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                            itemId: 'race_number',
                            bind:'{filters.race_number}',
                            listeners: {
                                specialkey: 'onEnter',
                                afterrender: 'tooltipRace_number'
                            }
                        }
                    ]
                },
                {
                    text: 'Результат',
                    dataIndex: 'result',
                    itemId: 'result',
                    width: 100
                },
                {
                    text: 'I место',
                    align: 'center',
                    dataIndex: 'first',
                    itemId: 'first',
                    //renderer: Util.renderRat,
                    width: 70
                },
                {
                    text: 'II место',
                    align: 'center',
                    dataIndex: 'second',
                    itemId: 'second',
                    width: 70
                },
                {
                    text: 'III место',
                    align: 'center',
                    dataIndex: 'third',
                    itemId: 'third',
                    width: 75
                },
                {
                    xtype: 'actioncolumn',
                    text: 'Повтор записи',
                    width:120,
                    align: 'center',
                    dataIndex: 'url_video',
                    items: [
                        {
                            id: 'button',
                            getClass: function(v, meta, rec) {  // Or return a class from a function
                                return 'icon-go-to-game';
                            },
                            disabled: false,
                            handler: function (grid, rowIndex, colIndex, item, e) 
                            { 
                                var rec = grid.getStore().getAt(rowIndex);
                                console.log(item);
                                Ext.Msg.confirm('<?php echo Language::getCaption(Language::ID_CONFIRMATION); ?>', 'Вы действительно хотите вывести забег номер ' + rec.data.race_number + ' на монитор пользователя?', function (btn) {
                                    if (btn == 'yes') {
                                        var btnImgHtml = Ext.query('.button_url_' + rec.id + ' img')[0];
                                        var btnImgObj = Ext.get(btnImgHtml);

                                        if(btnImgObj.hasCls('icon-go-to-game'))
                                        {
                                            var btnsImgHtml = Ext.query('td[class*="button_url_"] img');
                                            var btnsImgObj = Ext.get(btnsImgHtml);
                                            btnsImgObj.removeCls('icon-go-blue-to-game').addCls('icon-go-to-game');

                                            btnImgObj.removeCls('icon-go-to-game').addCls('icon-go-blue-to-game');
                                        }

                                        var data = grid.getStore().getAt(rowIndex).data;

                                        FayeClient.sendCommand({
                                            command: 'rats_replay',
                                            url: data.url_video,
                                            race: data.race_number
                                        });
                                    }
                                });
                            }
                        }
                    ],
                    renderer: function(val, meta, rec, rowIndex, colIndex, store)
                    {
                        meta.css = 'button_url_' + rec.id;
                    }  
                }
            ]
        }

        /*this.bbar = Ext.create('Ext.PagingToolbar', {
         bind: {
         store: '{rat}'
         },
         displayInfo: true,
         displayMsg: 'Показаны записи {0} - {1} из {2}',
         emptyMsg: "Нет записей для отображения"
         });*/
        this.tools = [
            {
                type: 'refresh',
                tooltip: 'Обновить'
            },
            {
                type: 'close',
                tooltip: 'Удалить фильтры'
            }
        ]
        this.callParent();
    }
});