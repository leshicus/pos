Ext.define('Office.view.session.GridDetalizationV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.session.GridDetalizationM',
        'Office.view.session.GridDetalizationC'
    ],
    xtype: 'griddetalization',
    controller: 'griddetalization',
    viewModel: {
        type: 'griddetalization'
    },
    columnLines: true,
    autoScroll: true,
    title: 'Детализация по текущей смене',
    frame: true,
    border:true,
    viewConfig: {
        stripeRows: true
    },
    bind: '{detalization}',
    listeners: {
        //cellclick: 'onCellclick',
        scope: 'controller'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'filters.firstDate',
                'filters.cbReceiverAccount'
            ]
        });

        var vm = this.getViewModel();
        vm.set('filters.firstDate',Ext.Date.format(new Date(),'d.m.Y'));
        vm.set('filters.cbReceiverAccount',Ext.util.Cookies.get('userId'));

        Ext.defer(function(){
            vm.getStore('detalization').load();
            vm.getStore('totals').load();
        },100,this);

        this.tbar=[
            {
                //title: 'Итог',
                xtype: 'grid',
                scrollable: false,
                columnLines: true,
                bind: '{totals}',
                itemId: 'gridTotal',
                frame: true,
                border:true,
                width:450,
                viewConfig: {
                    forceFit: true // * чтобы горизонтальный скрол не появлялся при редактировании ставки
                },
                columns: {
                    defaults: {
                        menuDisabled: true,
                        sortable: false,
                        align: 'left'
                    },
                    items: [
                        {
                            text: 'Тип платежа',
                            dataIndex: 'typename',
                            flex: 1,
                            renderer: function (value, metadata) {
                                if (value) {
                                    if (value == "2.1. Принято Спорт") metadata.tdCls = 'bg-accept-sport';
                                    if (value == "2.2. Принято ТЛ") metadata.tdCls = 'bg-accept-tl';
                                    if (value == "3.1. Выплачено Спорт") metadata.tdCls = 'bg-pay-sport';
                                    if (value == "3.2. Выплачено ТЛ") metadata.tdCls = 'bg-pay-tl';
                                    if (value == "4. Возвращено") metadata.tdCls = 'bg-return';
                                    if (value == "6. Внесено") metadata.tdCls = 'bg-income';
                                    //if (value == "7. Изъято") metadata.tdCls = 'bg-outcome';
                                }
                                return value || "";
                            }
                        },
                        {
                            text: 'Сумма',
                            dataIndex: 'result',
                            width: 105
                        },
                        {
                            text: 'Количество',
                            dataIndex: 'count',
                            width: 95
                        }
                    ]
                },
                listeners: {}
            }
        ]

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
                    dataIndex: 'transaction_datetime',
                    width: 140
                },
                {
                    text: '№ ставки/ТЛ',
                    dataIndex: 'slip_id',
                    width: 105
                },
                {
                    text: 'Действие',
                    dataIndex: 'comments',
                    flex: 1,
                    renderer: function (value, metadata) {
                        if (value) {
                            if (value.indexOf("Принято Спорт") != -1) metadata.tdCls = 'bg-accept-sport';
                            if (value.indexOf("Принято ТЛ") != -1) metadata.tdCls = 'bg-accept-tl';
                            if (value.indexOf("Выплачено Спорт") != -1) metadata.tdCls = 'bg-pay-sport';
                            if (value.indexOf("Выплачено ТЛ") != -1) metadata.tdCls = 'bg-pay-tl';
                            if (value.indexOf("Возвращено") != -1) metadata.tdCls = 'bg-return';
                            if (value.indexOf("Внесено") != -1) metadata.tdCls = 'bg-income';
                            //if (value == "7. Изъято") metadata.tdCls = 'bg-outcome';
                        }
                        return value || "";
                    }
                },
                {
                    text: 'Сумма',
                    dataIndex: 'sum',
                    width: 105,
                    renderer: Ext.util.Format.numberRenderer('0,0.00')
                },
                {
                    text: '№ транзакци',
                    dataIndex: 'id',
                    width: 100
                },
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