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
    //columnLines: true,
    autoScroll: true,
    title: 'Данные по предыдущим сменам',
    frame: true,
    border:true,
    viewConfig: {
        stripeRows: true
    },
    /*glyph: Glyphs.get('card'),
    cls: 'gridcard',*/
    bind: '{lastsession}',
    listeners: {
        //cellclick: 'onCellclick',
        scope: 'controller'
    },
    initComponent: function () {
        Utilities.initClassParams({
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
                    dataIndex: 'id',
                    //itemId: 'id',
                    width: 80,
                    renderer: function (val) {
                        return val; // * чтобы денежный формат не применялся
                    }
                },
                {
                    text: 'Начата',
                    dataIndex: 'actual_open_datetime',
                    width: 150,
                    renderer: function (val) {
                        return val; // * чтобы денежный формат не применялся
                    }
                },
                {
                    text: 'Завершена',
                    dataIndex: 'actual_close_datetime',
                    width: 150,
                    renderer: function (val) {
                        return val; // * чтобы денежный формат не применялся
                    }
                },
                {
                    text: 'К началу<br>смены',
                    dataIndex: 'sum_at_open_time',
                    //itemId: 'sum_at_open_time',
                    width: 130
                },
                {
                    text: 'Принято',
                    dataIndex: 'in_cashflow',
                    //itemId: 'in_cashflow',
                    width: 90
                },
                {
                    text: 'Выплачено',
                    dataIndex: 'out_cashflow',
                    //itemId: 'out_cashflow',
                    width: 90
                },
                {
                    text: 'Возвращено',
                    dataIndex: 'returned',
                    //itemId: 'returned',
                    width: 90
                },
                {
                    text: 'Внесено',
                    dataIndex: 'input_cash_mov',
                    //itemId: 'input_cash_mov',
                    width: 90
                },
                {
                    text: 'Изъято',
                    dataIndex: 'output_cash_mov',
                    //itemId: 'output_cash_mov',
                    width: 90
                },
                {
                    text: 'Баланс',
                    dataIndex: 'balance',
                    //itemId: 'balance',
                    width: 90
                },
                {
                    text: 'Итого',
                    dataIndex: 'total',
                    //itemId: 'total',
                    width: 90
                },
                {
                    text: 'На конец<br>смены',
                    dataIndex: 'sum_at_close_time',
                    //itemId: 'sum_at_close_time',
                    width: 90
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