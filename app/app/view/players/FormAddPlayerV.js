Ext.define('Office.view.players.FormAddPlayerV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Office.view.players.FormAddPlayerC'
    ],
    xtype: 'formaddplayer',
    controller: 'formaddplayer',
    //viewModel: 'default',
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
                fieldLabel: 'Имя игрока:',
                xtype: 'textfield',
                itemId: 'name',
                allowBlank:false,
                //msgTarget:'side',
                /*bind:{
                    value:'{theClient.name}'
                },*/
                listeners: {
                    specialkey: 'onEnter'
                }
            }

        ];

        this.callParent();
    }
});