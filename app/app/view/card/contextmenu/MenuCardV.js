Ext.define('Office.view.card.contextmenu.MenuCardV', {
    extend: 'Ext.menu.Menu',
    requires: [
        'Office.view.card.contextmenu.MenuCardC'
    ],
    alias: 'widget.menucard',
    controller: 'menucard',
    itemId: 'menucard',
    border: false,
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
                text: 'Заблокировать',
                itemId: 'menuBlock',
                glyph: Glyphs.get('lock'),
                cls: 'lock'
            }
        ]
        this.callParent(arguments);
    }
});