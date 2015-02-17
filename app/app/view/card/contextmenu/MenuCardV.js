Ext.define('Office.view.card.contextmenu.MenuCardV', {
    extend: 'Ext.menu.Menu',
    requires: [
        'Office.view.card.contextmenu.MenuCardC'
    ],
    alias: 'widget.menucard',
    controller: 'menucard',
    itemId: 'menucard',
    border: false,
    initComponent: function () {
        console.log('MenucardV init');

        this.items = [
            {
                text: 'Заблокировать',
                itemId: 'menuBlock',
                glyph: Glyphs.get('lock'),
                cls: 'lock'
            }
        ]
        this.callParent(arguments);
        console.log('MenucardV end');
    }
});