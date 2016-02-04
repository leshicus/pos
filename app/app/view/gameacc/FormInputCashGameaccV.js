Ext.define('Office.view.gameacc.FormInputCashGameaccV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Office.view.gameacc.FormInputCashGameaccC'
    ],
    xtype: 'forminputcashgameacc',
    controller: 'forminputcashgameacc',
    //viewModel: 'default',
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
                fieldLabel: 'Телефон (например: 79031234567)',
                xtype: 'textfield',
                itemId: 'name',
                maskRe:/^[0-9.]$/,
                validator: function (val) { // * определяет корректность структуры введенного значения
                    if (val.length < 11 || val.length > 12) {
                        return 'Длина телефона должна быть 11-12 цифр';
                    } else {
                        return true;
                    }
                },
                allowBlank:false,
                //msgTarget:'side',
                bind:{
                    value:'{mobile_phone}'
                }
            },
            {
                fieldLabel: 'Сумма',
                xtype: 'textfield',
                itemId: 'amount',
                allowBlank:false,
                maskRe:/^[0-9.]$/, // * не дает ввести иные символы
                validator: function (val) { // * определяет корректность структуры введенного значения
                    var regex = /^\d+(\.\d+)?$/;
                    if(val<=0)
                        return 'Число должно быть положительным';

                    if (!regex.test(val)) {
                        return 'Допустимо только число (разделитель - точка)';
                    } else {
                        return true;
                    }
                },
                listeners: {
                    specialkey: 'onEnter'
                }
                //msgTarget:'side'
            }

        ];

        this.callParent();
    }
});