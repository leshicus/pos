Ext.define('Office.view.session.FormStartSessionV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Office.view.session.FormStartSessionC',
        'Office.view.menumain.MenuMainM'
    ],
    xtype: 'formstartsession',
    controller: 'formstartsession',
    viewModel: {
        type: 'menumain'
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        labelWidth: 150,
        margin: 5
    },
    initComponent: function () {
        var vm = this.getViewModel(),
            menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel();

        vm.set('theSession', vmMenumain.getData().theSession);

        this.items = [
            {
                xtype: 'datefield',
                itemId: 'open_time',
                fieldLabel: 'Время начала',
                value: new Date(),
                allowBlank: false,
                format: 'Y-m-d H:i:s'
            },
            {
                fieldLabel: 'ФИО кассира',
                xtype: 'textfield',
                itemId: 'operator_fullname',
                allowBlank:false,
                msgTarget:'side',
                validator: this.getController().onOperatorFullname
            },
            {
                fieldLabel: 'Текущая сумма в кассе',
                xtype: 'displayfield',
                bind: '{theSession.currentSumInCash}'
            }
        ];

        this.callParent();
    }
});