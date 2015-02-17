Ext.define('Office.view.accept.contextmenu.MenuAcceptV', {
    extend: 'Ext.menu.Menu',
    requires: [
        'Office.view.accept.contextmenu.MenuAcceptC'
    ],
    alias: 'widget.menuaccept',
    controller: 'menuaccept',
    itemId: 'menuaccept',
    //plain: true,
    border: false,
    defaults:{
        disabled:true
    },
    initComponent: function () {
        console.log('MenuacceptV init');

        this.items = [
            {
                text: 'Печать',
                itemId: 'menuPrint',
                glyph: Glyphs.get('print'),
                cls: 'print'
            },
            {
                text: 'Подтвердить',
                itemId: 'menuConfirm',
                glyph: Glyphs.get('thumbup'),
                cls: 'confirm'
            },
            {
                text: 'Копировать',
                itemId: 'menuCopy',
                glyph: Glyphs.get('copy'),
                cls: 'copy'
            },
            {
                text: 'Выкупить',
                itemId: 'menuBuyout',
                glyph: Glyphs.get('bucks'),
                cls: 'buyout'
            },
            {
                text: 'Фикс. возврат',
                itemId: 'menuReturn',
                glyph: Glyphs.get('return'),
                cls: 'return'
            }
        ]
        this.callParent(arguments);
        console.log('MenuacceptV end');
    }
});