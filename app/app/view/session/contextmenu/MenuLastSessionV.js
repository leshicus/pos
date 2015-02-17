Ext.define('Office.view.session.contextmenu.MenuLastSessionV', {
    extend: 'Ext.menu.Menu',
    requires: [
        'Office.view.session.contextmenu.MenuLastSessionC'
    ],
    alias: 'widget.menulastsession',
    controller: 'menulastsession',
    itemId: 'menulastsession',
    border: true,
    initComponent: function () {
        console.log('MenulastsessionV init');

        this.items = [
            {
                text: 'Отчет по смене',
                itemId: 'menuPrint',
                glyph: Glyphs.get('print'),
                cls: 'print'
            },
            {
                text: 'Расширенный отчет по смене',
                itemId: 'menuPrintExt',
                glyph: Glyphs.get('print'),
                cls: 'print'
            }
        ]
        this.callParent(arguments);
        console.log('MenulastsessionV end');
    }
});