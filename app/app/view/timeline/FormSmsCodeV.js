Ext.define('Office.view.timeline.FormSmsCodeV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Office.view.timeline.FormSmsCodeC'
    ],
    xtype: 'formsmscode',
    controller: 'formsmscode',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        labelWidth: 150,
        margin: 5
    },
    initComponent: function () {
        this.items = [
            {
                bind:{
                    text: 'Код был выслан на телефон ' + '{theTimeline.player.mobile_phone}'
                },
                xtype: 'label'
            },
            {
                fieldLabel: 'Смс-код',
                xtype: 'textfield',
                itemId: 'code',
                allowBlank:false,
                //msgTarget:'side',
                listeners:{
                    specialkey:'onEnter',
                    afterrender: Util.validate
                }
            }
        ];

        this.callParent();
    }
});