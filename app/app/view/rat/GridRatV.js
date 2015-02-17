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
    flex: 1,
    title: 'Крысы',
    frame: true,
    viewConfig: {
        stripeRows: true
    },
    bind: '{rat}',
    initComponent: function () {
        Utilities.initClassParams({
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

        // * устанавливает начальное значение поля "с"
        //Debug.setGridAcceptMadeFrom(date);

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
                    dataIndex: 'first',
                    itemId: 'first',
                    renderer: Utilities.renderRat,
                    width: 70
                },
                {
                    text: 'II место',
                    dataIndex: 'second',
                    itemId: 'second',
                    width: 70
                },
                {
                    text: 'III место',
                    dataIndex: 'third',
                    itemId: 'third',
                    width: 75
                }/*,
                 {
                 text: 'Повтор записи',
                 width: 130
                 //flex:1
                 }*/
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