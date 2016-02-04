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

    initComponent: function () {
        var _this = this,
            basketSum = this.getViewModel().getStore('basketSum');
        basketSum.loadData(basketSum._defaults);

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
                                var fill = Ext.ComponentQuery.query('fill')[0],
                                    vm = fill.getViewModel(),
                                    storeBasket = vm.getStore('basket');

                                // * сохраним значение выбранной системы в system_value каждой записи
                                storeBasket.each(function (item) {
                                    item.set('system_value', n);
                                });

                                // * отправим ставки на монитор игрока
                                MonitorF.sendBetsToMonitor();
                            }, 100, this);
                        },
                        beforeselect: function (c, rec) {
                            var max_system_count = parseInt(Util.getGlobalConst("MAX_COUNT_VARIANTS_IN_SYSTEM")),
                                system_variants = rec.get('system_variants');
                            if (system_variants > max_system_count) {
                                Util.erMes('Достигнуто максимальное количество вариантов системы ' + max_system_count + '. Постановка ставки невозможна!')
                                return false;
                            }
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
                    margin: 0,
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
                                text: 'Max',
                                dataIndex: 'max',
                                width: 50
                            },
                            {
                                text: 'Выигрыш',
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
                    }
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Ставка',
                    margin: '1 0 0 2',
                    cls: 'bet-express',
                    allowBlank: false,
                    maskRe: /^[0-9.]$/, // * не дает ввести иные символы
                    itemId: 'amount',
                    msgTarget: 'none', // * не показывать сообщение об ошибке
                    labelWidth: 80,
                    bind: {
                        value: '{amount}'
                    },
                    listeners: {
                        specialkey: 'onKeyPressAmount',
                        change: 'onChangeAmount',// * костыль, потому что при первичном редактировании поля при автофокусе не сохраняются данные :(((
                        afterrender: Util.validate
                    }
                }
            ]
        }];

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
                        '<tr style="vertical-align: top;">',
                        '<td align="left" style="white-space: normal;"><span>' + '{[this.colorText("green", "1&nbsp&nbsp")]}' + '{[this.getFirstTeam(values)]}' + '</span></td>',
                        '<td align="right" style="width: 50px;"><span style="color: #8A259B;">' + '№ ' + '{short_number}' + '</span></td>',
                        '</tr>',
                        '<tr>',
                        '<td align="left" style="white-space: normal;" colspan="2"><span>' + '{[this.colorText("red", "2&nbsp&nbsp")]}' + '{[this.getSecondTeam(values)]}' + '</span></td>',
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
                            },
                            getFirstTeam: function (values) {
                                if (values.type == 'rats') {
                                    return values.tournament_name;
                                } else {
                                    return values.home;
                                }
                            },
                            getSecondTeam: function (values) {
                                if (values.type == 'rats') {
                                    return Ext.Date.format(new Date(values.time), 'd F G:i');
                                } else {
                                    return values.away;
                                }
                            }
                        }),
                    listeners: {
                        click: 'onSelect'
                    }
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