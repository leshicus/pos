Ext.define('Office.view.gameacc.GridGameActionV', {
    extend: 'Ext.grid.Panel',
    requires: [
         'Office.view.gameacc.GridGameActionM'
    ],
    xtype: 'gridgameaction',
    //controller: 'gridgameaction',
    viewModel: {
        type: 'gridgameaction'
    },
    columnLines: true,
    autoScroll: true,
    title: 'Действия по счету',
    frame: true,
    border: true,
    viewConfig: {
        stripeRows: true
    },
    /*glyph: Glyphs.get('card'),
     cls: 'gridcard',*/
    bind: {store:'{gameaction}'} ,
    initComponent: function () {
        Filters.initFilter('gameaction');

        /*this.getViewModel().set('token', Server.getToken());
        this.getViewModel().set('user_id', '');
        this.getViewModel().set('player_id', '');
        this.getViewModel().set('username', Ext.util.Cookies.get('betzet_login'));*/

        Utilities.initClassParams({
            scope: this,
            params: [
                'filters.player_id'
            ]
        });

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false
            },
            items: [
                {
                    text: 'Действие',
                    dataIndex: 'operation',
                    //width: 120
                    flex:1
                },
                {
                    text: 'Дата',
                    dataIndex: 'datetime',
                    width: 140
                },
                {
                    text: 'Сумма',
                    dataIndex: 'stake',
                    width: 100
                }
            ]
        }

        this.callParent();
    }
});