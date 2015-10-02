Ext.define('Office.view.session.FormInputCashV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Office.view.session.FormInputCashC',
        'Office.view.menumain.MenuMainM'
    ],
    xtype: 'forminputcash',
    controller: 'forminputcash',
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
        this.items = [
            {
                fieldLabel: 'Сумма',
                xtype: 'textfield',
                itemId: 'summ',
                allowBlank:false,
                maskRe:/^[0-9.]$/, // * не дает ввести иные символы
                validator: function (val) { // * определяет корректность структуры введенного значения
                    var regex = /^\d+(\.\d+)?$/;
                    if (!regex.test(val)) {
                        return 'Допустимо только число (разделитель - точка)';
                    } else {
                        return true;
                    }
                },
                //msgTarget:'side'
            },
            {
                fieldLabel: 'Примечание',
                xtype: 'textfield',
                itemId: 'comment'
            }
        ];

        this.callParent();
    }
});