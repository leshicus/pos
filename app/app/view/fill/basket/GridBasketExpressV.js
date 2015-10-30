Ext.define('Office.view.fill.basket.GridBasketExpressV', {
    extend: 'Office.view.fill.basket.GridBasketProtoV',
    requires: [
        'Office.view.fill.basket.GridBasketExpressM',
        'Office.view.fill.basket.GridBasketExpressC',
        'Office.view.fill.basket.GridBasketProtoV'
    ],
    xtype: 'gridbasketexpress',
    controller: 'gridbasketexpress',
    viewModel: {
        type: 'gridbasketexpress'
    },
    //viewConfig: {
    //    loadingHeight: 100
    //},
    //listeners : {
    //    afterrender : 'onPanelAfterRender',
    //    scope : 'controller'
    //},

    initComponent: function () {
        var _this = this,
            basketSum = this.getViewModel().getStore('basketSum');
        basketSum.loadData(basketSum._defaults);
        //FillF.clearBasketSum();

        //var combo = Ext.create('Ext.form.field.ComboBox', {
        //    //xtype: 'combo',
        //    displayField: 'name',
        //    valueField: 'id',
        //    editable: false,
        //    itemId: 'system',
        //    queryMode: 'local',
        //    flex: 1,
        //    bind: {
        //        store: '{system}',
        //        hidden: '{!showSystemCombo}',
        //        value: '{system_value}'
        //    },
        //    listeners: {
        //        change: function (c, n, o) {
        //            Ext.defer(function () {
        //                // * отправим ставки на монитор игрока
        //                MonitorF.sendBetsToMonitor();
        //            }, 100, this);
        //
        //        }
        //    },
        //
        //    // * все нижеследующие относится к хитрому способу показывать пустую ячейку в комбике
        //    emptyText: 'Система',
        //    //listConfig: {
        //    //    tpl: '<div class="my-boundlist-item-menu">&nbsp;</div>'
        //    //    + '<tpl for=".">'
        //    //    + '<div class="x-boundlist-item">{name}</div></tpl>',
        //    //    listeners: {
        //    //        el: {
        //    //            delegate: '.my-boundlist-item-menu',
        //    //            click: function () {
        //    //                combo.clearValue();
        //    //            }
        //    //        }
        //    //    }
        //    //}
        //});

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            flex: 1,
            items: [
                {
                    xtype: 'combo',
                    displayField: 'name',
                    valueField: 'id',
                    editable: false,
                    itemId: 'system',
                    queryMode: 'local',
                    flex: 1,
                    bind: {
                        store: '{system}',
                        hidden: '{!showSystemCombo}',
                        value: '{system_value}'
                    },
                    listeners: {
                        change: function (c, n, o) {
                            Ext.defer(function () {
                                var fill = Ext.ComponentQuery.query('#main')[0],
                                    vm = fill.getViewModel(),
                                    storeBasket = vm.getStore('basket');

                                // * сохраним значение выбранной системы в system_value каждой записи
                                //storeBasket.suspendEvent('update');
                                storeBasket.each(function (item) {
                                    item.set('system_value',n);
                                });
                                //storeBasket.resumeEvent('update');

                                // * отправим ставки на монитор игрока
                                MonitorF.sendBetsToMonitor();
                            }, 100, this);
                        }
                    },
                    emptyText: 'Система'
                },
                {
                    title: 'Итог',
                    xtype: 'grid',
                    scrollable: false,
                    columnLines: true,
                    bind: '{basketSum}',
                    itemId: 'gridBasketSum',
                    cls: 'market-header',
                    selModel: {
                        allowDeselect: true,
                        type: 'cellmodel'
                    },
                    flex: 1,
                    viewConfig: {
                        forceFit: true // * чтобы горизонтальный скрол не появлялся при редактировании ставки
                    },
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            clicksToEdit: 1,
                            pluginId: 'cellEditorId'
                        })
                    ],
                    margin: '0 0 8 0',
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            align: 'center'
                        },
                        items: [
                            {
                                text: 'Кф',
                                dataIndex: 'coef',
                                width: 50,
                                tdCls: 'bet-bold'
                            },
                            {
                                text: 'Min',
                                dataIndex: 'min',
                                width: 40
                            },
                            {
                                text: 'Ставка',
                                dataIndex: 'amount',
                                itemId: 'bet',
                                width: 50,
                                tdCls: 'bet-bold-blue',
                                editor: {
                                    xtype: 'numberfield',
                                    flex: 1,
                                    minValue: 0,
                                    hideTrigger: true,
                                    cls: 'bet',
                                    maskRe: /^[0-9.]$/, // * не дает ввести иные символы
                                    itemId: 'betEditor',
                                   // selectOnFocus: true,
                                    listeners: {
                                        specialkey: 'onKeyPressAmount',
                                        change: 'onChangeAmount'// * костыль, потому что при первичном редактировании поля при автофокусе не сохраняются данные :(((
                                    }
                                }
                            },
                            {
                                text: 'Max',
                                dataIndex: 'max',
                                width: 50
                            },
                            {
                                text: 'Выигрыш',
                                // dataIndex: 'prize',
                                flex: 1,
                                tdCls: 'bet-bold',
                                renderer: function (val, meta, rec) {
                                    var amount = parseInt(rec.get('amount')) || 0,
                                        coef = parseFloat(rec.get('coef')) || 0,
                                        mult = amount * coef;
                                    return mult.toFixed(2);
                                }
                            }
                        ]
                    },
                    listeners: {}
                }
            ]
        }];

        //this.bbar = [
        //    {
        //        xtype: 'container',
        //        layout: {
        //            type: 'vbox',
        //            align: 'stretch'
        //        },
        //        //cls: 'bbar-bet',
        //        flex: 1,
        //        items: [
        //            combo,
        //            {
        //                title: 'Итог',
        //                xtype: 'grid',
        //                scrollable: false,
        //                columnLines: true,
        //                bind: '{basketSum}',
        //                itemId: 'gridBasketSum',
        //                cls: 'market-header',
        //                selModel: {
        //                    allowDeselect: true,
        //                    type: 'cellmodel'
        //                },
        //                flex: 1,
        //                viewConfig: {
        //                    forceFit: true // * чтобы горизонтальный скрол не появлялся при редактировании ставки
        //                },
        //                plugins: [
        //                    Ext.create('Ext.grid.plugin.CellEditing', {
        //                        clicksToEdit: 1,
        //                        pluginId: 'cellEditorId'
        //                    })
        //                ],
        //                margin: '0 0 8 0',
        //                columns: {
        //                    defaults: {
        //                        menuDisabled: true,
        //                        sortable: false,
        //                        align: 'center'
        //                    },
        //                    items: [
        //                        {
        //                            text: 'Кф',
        //                            dataIndex: 'coef',
        //                            width: 50,
        //                            tdCls: 'bet-bold'
        //                        },
        //                        {
        //                            text: 'Min',
        //                            dataIndex: 'min',
        //                            width: 40
        //                        },
        //                        {
        //                            text: 'Ставка',
        //                            dataIndex: 'amount',
        //                            itemId: 'bet',
        //                            width: 50,
        //                            tdCls: 'bet-bold-blue',
        //                            editor: {
        //                                xtype: 'numberfield',
        //                                flex: 1,
        //                                minValue: 0,
        //                                hideTrigger: true,
        //                                cls: 'bet',
        //                                maskRe: /^[0-9.]$/, // * не дает ввести иные символы
        //                                itemId: 'betEditor',
        //                                selectOnFocus: true,
        //                                listeners: {
        //                                    specialkey: 'onKeyPressAmount',
        //                                    change: 'onChangeAmount'// * костыль, потому что при первичном редактировании поля при автофокусе не сохраняются данные :(((
        //                                }
        //                            }
        //                        },
        //                        {
        //                            text: 'Max',
        //                            dataIndex: 'max',
        //                            width: 50
        //                        },
        //                        {
        //                            text: 'Выигрыш',
        //                            // dataIndex: 'prize',
        //                            flex: 1,
        //                            tdCls: 'bet-bold',
        //                            renderer: function (val, meta, rec) {
        //                                var amount = parseInt(rec.get('amount')) || 0,
        //                                    coef = parseFloat(rec.get('coef')) || 0,
        //                                    mult = amount * coef;
        //                                return mult.toFixed(2);
        //                            }
        //                        }
        //                    ]
        //                },
        //                listeners: {}
        //            }
        //        ]
        //    }
        //]

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false
            },
            items: [
                {
                    xtype: 'templatecolumn',
                    flex: 1,
                    tpl: new Ext.XTemplate(
                        // * заголовок
                        '<table width="100%" class="bet-title" >',
                        '<tr>',
                        '<td align="center"><span class="bet-title">' + '{coefName}' + '</span></td>',
                        '</tr>',
                        '</table>',

                        // * название команд
                        '<table width="100%" class="bet-teams">',
                        '<tr>',
                        '<td align="left"><span>' + '{[this.colorText("green", "1&nbsp&nbsp")]}' + '{home}' + '</span></td>',
                        '<td align="right"><span style="color: #8A259B;">' + '№ ' + '{short_number}' + '</span></td>',
                        '</tr>',
                        '<tr>',
                        '<td align="left"><span>' + '{[this.colorText("red", "2&nbsp&nbsp")]}' + '{away}' + '</span></td>',
                        '</tr>',
                        '</table>',

                        // * параметры ставки
                        '<table width="100%" class="bet-express" >',
                        '<tr>',
                        '<td align="center" width="40"><span style="color: rgb(39, 127, 204);">Кф</span></td>',
                        '<td></td>',
                        '</tr>',
                        '<tr>',
                        '<td align="center" width="40"><span class="bet">' + '{[values.arrCoef[2]]}' + '</span></td>',
                        '<td></td>',
                        '</tr>',
                        '</table>',
                        {
                            colorText: function (color, text) {
                                return '<font color="' + color + '">' + text + '</font>';
                            }
                        })
                },
                {
                    text: 'Cancel',
                    width: 25,
                    renderer: function (val, meta, rec) {
                        meta.align = 'center';
                        meta.tdCls = 'bet-cancel-cell';
                        return '<span role="button" class="fa fa-times" style="color: red;font-size: 24px;" data-qtip="Удалить ставку"></span>';
                    }
                }
            ]
        }

        this.callParent();
    }
});