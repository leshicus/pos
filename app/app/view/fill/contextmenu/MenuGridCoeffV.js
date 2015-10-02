Ext.define('Office.view.fill.contextmenu.MenuGridCoeffV', {
    extend: 'Ext.menu.Menu',
    requires: [
        'Office.view.fill.contextmenu.MenuGridCoeffC'
    ],
    alias: 'widget.menugridcoeff',
    controller: 'menugridcoeff',
    itemId: 'menugridcoeff',
    plain: true,
    border: true,

    initComponent: function () {
        this.items = [
            {
                xtype: 'textfield',
                margin: '5 5 0 5',
                itemId: 'id_1',
                maskRe: /^[0-9]$/,
                regex: /^\d+(\d+)?$/,
                bind: {
                    value: '{lastBet}'
                },
                emptyText: 'Произвольная сумма',
                regexText: 'Требуется целое число',
                listeners: {
                    specialkey: 'onEnter'
                }
            },
            {
                text: '0',
                itemId: 'id_0'
            },
            {
                text: '10',
                itemId: 'id_10'
            },
            {
                text: '20',
                itemId: 'id_20'
            },
            {
                text: '50',
                itemId: 'id_50'
            },
            {
                text: '100',
                itemId: 'id_100'
            },
            {
                text: '500',
                itemId: 'id_500'
            },
            {
                text: '1000',
                itemId: 'id_1000'
            },
            {
                text: '2000',
                itemId: 'id_2000'
            },
            {
                text: '3000',
                itemId: 'id_3000'
            },
            {
                text: '4000',
                itemId: 'id_4000'
            },
            {
                text: '5000',
                itemId: 'id_5000'
            }
        ]
        this.callParent(arguments);
    }
});