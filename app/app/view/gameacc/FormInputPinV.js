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
    initComponent: function () {
        this.items = [
            {
                fieldLabel: 'Пин-код',
                xtype: 'textfield',
                itemId: 'pin',
                maskRe:/^[0-9.]$/,
                allowBlank:false,
                msgTarget:'side'
            }
        ];

        this.callParent();
    }
});