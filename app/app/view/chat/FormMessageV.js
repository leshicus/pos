Ext.define('Office.view.chat.FormMessageV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Office.view.chat.FormMessageC',
        'Ux.Img'
    ],
    xtype: 'formmessage',
    controller: 'formmessage',
    viewModel: 'default',
    title: 'Сообщение',
    glyph: Glyphs.get('comment'),
    layout: {
        type: 'hbox'
    },
    initComponent: function () {
        Utilities.initClassParams({
            scope: this,
            params: [
                'filters.id',
                'filters.value'
            ]
        });

        var me = this;
        this.items = [
            {
                xtype: 'htmleditor',
                height:150,
                itemId: 'message',
                bind:{
                    value:'{value}'
                },
                flex: 1
            },
            {
                xtype:'ux-img',
                glyph: Glyphs.get('send'),
                cls: 'sendButton',
                //id:'sendButton',
                margin: '75 0 0 10',
                title: 'Отправить',
                listeners: {
                    click: 'onClickSend',
                    scope:'controller'
                }
            }
        ]

        this.callParent();
    }
});