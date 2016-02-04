Ext.define('Office.view.timeline.contextmenu.MenuTimelineV', {
    extend: 'Ext.menu.Menu',
    requires: [
        'Office.view.timeline.contextmenu.MenuTimelineC'
    ],
    alias: 'widget.menutimeline',
    controller: 'menutimeline',
    itemId: 'menutimeline',
    border: false,
    defaults:{
        disabled:true
    },
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
                glyph: Glyphs.get('minus'),
                cls: 'cancel',
                handler:'onClickButtonWithdraw'
            },
            {
                text: 'Пополнение',
                itemId: 'menuPayin',
                glyph: Glyphs.get('plus'),
                cls: 'plus',
                handler:'onClickButtonPayin'
            },
            {
                text: 'Закрыть ТЛ',
                itemId: 'menuClose',
                glyph: Glyphs.get('cancel'),
                cls: 'cancel',
                handler:'onClickButtonClose'
            }
        ]
        this.callParent(arguments);
    }
});