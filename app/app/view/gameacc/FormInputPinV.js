Ext.define('Office.view.gameacc.FormInputPinV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Office.view.gameacc.FormInputPinC'
    ],
    xtype: 'forminputpin',
    controller: 'forminputpin',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        labelWidth: 200,
        margin: 5
    },
    listeners:{
        afterrender:'onAfterRender'
    },
    initComponent: function () {
        this.items = [
            {
                fieldLabel: 'Пин-код',
                xtype: 'textfield',
                itemId: 'pin',
                maskRe:/^[0-9.]$/,
                allowBlank:false,
                listeners: {
                    specialkey: 'onEnter'
                }
            }
        ];

        this.callParent();
    }
});