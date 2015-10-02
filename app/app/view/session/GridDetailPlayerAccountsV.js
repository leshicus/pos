Ext.define('Office.view.session.GridDetailPlayerAccountsV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.session.GridDetailPlayerAccountsM',
        'Office.view.menumain.MenuMainM'
    ],
    xtype: 'griddetailplayeraccounts',
    viewModel: {
        type: 'griddetailplayeraccounts'
    },
    height:215,
    columnLines: true,
    border: true,
    autoScroll: true,
    viewConfig: {
        stripeRows: true
    },
    sortableColumns: false,
    bind: '{detailplayeraccounts}',
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
            ]
        });

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false,
                flex:1
            },
            items: [
                {
                    text: 'Мобильный телефон',
                    //width: 250,
                    dataIndex: 'mobile_phone'
                },
                {
                    text: 'Действие',
                   // width: 60,
                    dataIndex: 'operation',
                },
                {
                    text: 'Дата и время',
                   // width: 150,
                    dataIndex: 'datetime',
                },
                {
                    text: 'Сумма',
                  //  width: 70,
                    dataIndex: 'stake',
                    renderer: Ext.util.Format.numberRenderer('0,0.00')
                }
            ]
        };

        this.callParent();
    }
});