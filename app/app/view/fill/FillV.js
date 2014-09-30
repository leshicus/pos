Ext.define('Office.view.fill.FillV',{
    extend:'Ext.container.Container',
    requires:[
        'Ext.form.field.Text'
    ],
    xtype:'fill',
    layout:{
        type:'vbox',
        align:'stretch'
    },
    initComponent: function () {
        console.log('TabpanelAuthV init');

        this.items = [
            {
                xtype:'textfield',
                fieldLabel:'1'
            },
            {
                xtype:'textfield',
                fieldLabel:'2'
            }
        ];

        this.callParent(arguments);
    }

});
