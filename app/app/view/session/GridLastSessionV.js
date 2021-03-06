Ext.define('Office.view.session.GridLastSessionV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.session.GridLastSessionM',
        'Office.view.session.GridLastSessionC'
    ],
    xtype: 'gridlastsession',
    controller: 'gridlastsession',
    viewModel: {
        type: 'gridlastsession'
    },
    columnLines: true,
    autoScroll: true,
    title: 'Данные по предыдущим сменам',
    frame: true,
    border:true,
    viewConfig: {
        stripeRows: true
    },
    bind: '{lastsession}',
    listeners: {
        //cellclick: 'onCellclick',
        scope: 'controller'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: []
        });


        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            items: [
                {
                    text: '№',
                    dataIndex: 'number',
                    width: 65,
                    renderer: function (val) {
                        return val; // * чтобы денежный формат не применялся
                    }
                },
                {
                    text: 'Начата',
                    dataIndex: 'actual_open_datetime',
                    width: 140,
                    renderer: function (val) {
                        return val; // * чтобы денежный формат не применялся
                    }
                },
                {
                    text: 'Завершена',
                    dataIndex: 'actual_close_datetime',
                    width: 140,
                    renderer: function (val) {
                        return val; // * чтобы денежный формат не применялся
                    }
                },
                {
                    text: 'К началу<br>смены',
                    dataIndex: 'sum_at_open_time',
                    width: 105
                },
                {
                    text: 'Принято',
                    dataIndex: 'in_cashflow',
                    width: 90
                },
                {
                    text: 'Выплачено',
                    dataIndex: 'out_cashflow',
                    width: 95
                },
                {
                    text: 'Возвращено',
                    dataIndex: 'returned',
                    width: 105
                },
                {
                    text: 'Внесено',
                    dataIndex: 'input_cash_mov',
                    width: 90
                },
                {
                    text: 'Изъято',
                    dataIndex: 'output_cash_mov',
                    width: 105
                },
                {
                    text: 'Баланс',
                    dataIndex: 'balance',
                    width: 105
                },
                {
                    text: 'Итого',
                    dataIndex: 'total',
                    width: 105
                },
                {
                    text: 'На конец<br>смены',
                    dataIndex: 'sum_at_close_time',
                    width: 105
                },
                {
                    xtype: 'actioncolumn',
                    width:28,
                    align: 'center',
                    items: [
                        {
                            iconCls: 'icon-print',
                            tooltip: 'Печать отчета по смене',// всплывающая подсказка
                            handler: function (grid, rowIndex, colIndex, item, e) 
                            { 
                                var rec = grid.getStore().getAt(rowIndex);
                                Ext.Msg.confirm('Подтверждение', 'Вы действительно хотите распечатать выписку по выбранной смене?', function (btn) {
                                        if (btn == 'yes') 
                                        {
                                            var objUrl = {
                                                class: 'Pos_Sessions_Print',
                                                params: {
                                                    id: rec.id,
                                                    extended: false
                                                }
                                            };
                                            window.open(Server.getUrl(objUrl), '_blank');
                                        }
                                    }
                                );
                            }
                        }
                    ]
                },
                {
                    xtype: 'actioncolumn',
                    width:28,
                    align: 'center',
                    items: [
                        {
                            iconCls: 'icon-print-extended',
                            tooltip: 'Печать расширенного отчета по смене',// всплывающая подсказка
                            handler: function (grid, rowIndex, colIndex, item, e) 
                            { 
                                var rec = grid.getStore().getAt(rowIndex);
                                Ext.Msg.confirm('Подтверждение', 'Вы действительно хотите распечатать выписку по выбранной смене?', function (btn) {
                                        if (btn == 'yes') 
                                        {
                                            var objUrl = {
                                                class: 'Pos_Sessions_Print',
                                                params: {
                                                    id: rec.id,
                                                    extended: true
                                                }
                                            };
                                            window.open(Server.getUrl(objUrl), '_blank');
                                        }
                                    }
                                );
                            }
                        }
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