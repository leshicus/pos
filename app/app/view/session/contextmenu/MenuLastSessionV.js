Ext.define('Office.view.session.contextmenu.MenuLastSessionV', {
    extend: 'Ext.menu.Menu',
    requires: [
        'Office.view.session.contextmenu.MenuLastSessionC'
    ],
    alias: 'widget.menulastsession',
    controller: 'menulastsession',
    itemId: 'menulastsession',
    border: true,
    listeners: {
        // * чтобы меню разрушалось каждый раз при закрытии. closeAction:'destroy' не работает
        hide:function(menu, opt){
            Ext.defer(function(){
                Ext.destroy(menu);
            },500,this);
        }
    },
    initComponent: function () {
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
    }
});