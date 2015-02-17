Ext.define('Office.view.timeline.contextmenu.MenuTimelineV', {
    extend: 'Ext.menu.Menu',
    requires: [
        'Office.view.timeline.contextmenu.MenuTimelineC'
    ],
    alias: 'widget.menutimeline',
    controller: 'menutimeline',
    itemId: 'menutimeline',
    border: false,
    initComponent: function () {
        console.log('MenutimelineV init');

        this.items = [
            {
                text: 'Чек',
                itemId: 'menuBill',
                glyph: Glyphs.get('print'),
                cls: 'print',
                handler:'onClickButtonPrint'
            },
            {
                text: 'История',
                itemId: 'menuHist',
                glyph: Glyphs.get('print'),
                cls: 'print',
                handler:'onClickButtonPrint'
            },
            {
                text: 'Баланс',
                itemId: 'menuBalance',
                glyph: Glyphs.get('print'),
                cls: 'print',
                handler:'onClickButtonPrint'
            },
            {
                text: 'Частичное снятие',
                itemId: 'menuWithdraw',
                glyph: Glyphs.get('dollar'),
                cls: 'buyout',
                handler:'onClickButtonWithdraw'
            }
        ]
        this.callParent(arguments);
        console.log('MenutimelineV end');
    }
});