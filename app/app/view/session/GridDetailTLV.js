Ext.define('Office.view.session.GridDetailTLV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.session.GridDetailTLM',
        'Office.view.menumain.MenuMainM'
    ],
    xtype: 'griddetailtl',
    viewModel: {
        type: 'griddetailtl'
    },
    minHeight:100,
    columnLines: true,
    border: true,
    autoScroll: true,
    viewConfig: {
        stripeRows: true
    },
    sortableColumns: false,
    bind: '{detailtl}',
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
                    text: '№ ТЛ',
                    dataIndex: 'tl_id'
                },
                {
                    text: 'Сумма',
                    dataIndex: 'sum',
                    renderer: Ext.util.Format.numberRenderer('0,0.00')
                }
            ]
        };

        this.callParent();
    }
});