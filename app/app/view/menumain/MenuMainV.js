Ext.define('Office.view.menumain.MenuMainV', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Office.view.menumain.MenuMainC',
        'Office.view.fill.FillV',
        'Ext.plugin.Viewport'
    ],
    xtype: 'menumain',
    controller: 'menumain',
    plugins: 'viewport',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        text: 'Выход',
                        itemId: 'menumain_exit',
                        glyph: 'xf011@FontAwesome',
                        cls: 'exit'
                    },
                    {
                        text: 'Заполнение',
                        itemId: 'menumain_fill'
                    },
                    {
                        text: 'Ставки Таймлайн',
                        itemId: 'menumain_timeline'
                    },
                    {
                        text: 'Принятые',
                        itemId: 'menumain_accept'
                    },
                    {
                        text: 'Клубные карты',
                        itemId: 'menumain_card'
                    },
                    {
                        text: 'Выплаты',
                        itemId: 'menumain_pay'
                    },
                    {
                        text: 'Крысы',
                        itemId: 'menumain_rat'
                    },
                    {
                        text: 'Язык',
                        glyph: 'xf1ab@FontAwesome',
                        cls: 'language',
                        menu: [
                            {
                                text: 'Русский',
                                itemId: 'menumain_russian'
                            },
                            {
                                text: 'English',
                                itemId: 'menumain_english'
                            }
                        ]
                    }
                ]
            }
        ]

        this.callParent();
    }
});