Ext.define('Office.view.fill.basket.GridBasketProtoV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.fill.basket.GridBasketProtoM',
        'Office.view.fill.basket.GridBasketProtoC',
        'Ext.grid.column.Template'
    ],
    xtype: 'gridbasketproto',
    controller: 'gridbasketproto',
    viewModel: {
        type: 'gridbasketproto'
    },
    columnLines: true,
    autoScroll: true,
    frame: true,
    border: true,
    reserveScrollbar: true,
    hideHeaders: true,
    viewConfig: {
        preserveScrollOnRefresh: true
    },
    cls: 'bet-cancel-grid',
    bind: {
        store: '{basket}'
    },
    listeners: {
        cellclick: 'onClickCancelCell'
    },
    flex: 1,
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'command',
            ]
        });

        this.callParent();
    }
});