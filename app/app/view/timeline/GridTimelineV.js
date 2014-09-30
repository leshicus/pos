Ext.define('Office.view.timeline.GridTimelineV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.timeline.GridTimelineM'
    ],
    xtype: 'gridtimeline',
    viewModel: {
        type: 'gridtimeline'
    },
    columnLines: true,
    flex: 1,
    title:'Ставки Таймлайн',
    frame: true,
    viewConfig: {
        stripeRows: true
    },
    bind:'{gridtimeline}',
    initComponent: function () {
        this.columns = [
            {
                text: '№',
                dataIndex: 'num',
                itemId: 'num',
                width: 70
            },
            {
                text: 'Тип',
                dataIndex: 'type',
                itemId: 'type',
                width: 70
            },
            {
                text: 'Дата расчета',
                dataIndex: 'datecalc',
                itemId: 'datecalc',
                //width: 150
                flex:1
            }
        ];

        this.callParent();
    }
});