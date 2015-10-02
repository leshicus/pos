Ext.define('Office.view.timeline.FormWithdrawV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Office.view.timeline.FormWithdrawC',
        'Ext.util.Observable'
    ],
    xtype: 'formwithdraw',
    controller: 'formwithdraw',
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
                fieldLabel: 'Сумма',
                xtype: 'textfield',
                itemId: 'sum',
                allowBlank: false,
                //msgTarget: 'side',
                bind: {
                    value: '{to_pay}'
                },
                listeners:{
                    render: 'registerClickEvent',
                    specialkey: 'onEnter'
                }
            }
        ];

        this.callParent();
    }
});