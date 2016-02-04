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
        labelWidth: 80,
        margin: 5
    },
    listeners: {
        afterrender:'onAfterRender'
    },
    initComponent: function () {
        this.items = [
            {
                layout:'hbox',
                fles:1,
                items:[
                    {
                        fieldLabel: 'Сумма',
                        xtype: 'textfield',
                        itemId: 'summ',
                        labelWidth: 80,
                        bind:{
                          value:'{to_pay}'
                        },
                        allowBlank:false,
                        maskRe:/^[0-9.]$/, // * не дает ввести иные символы
                        validator: function (val) { // * определяет корректность структуры введенного значения
                            var regex = /^\d+(\.\d+)?$/,
                                val = parseFloat(val);

                            if (val <= 0)
                                return 'Число должно быть положительным';

                            if (!regex.test(val)) {
                                return 'Допустимо только число (разделитель - точка)';
                            } else {
                                return true;
                            }
                        },
                        listeners: {
                            specialkey: 'onEnterSumm'
                            //render: 'registerClickEvent'
                        }
                    },
                    {
                        xtype: 'button',
                        margin: '0 5 0 5',
                        bind: {
                            text: 'Вся сумма ({session.currentSumInCash})',
                            hidden:'{!withdrawal}'
                        },
                        itemId: 'buttonBalance',
                        glyph: Glyphs.get('plus'),
                        handler: 'onClickButtonBalance'
                    }
                ]
            } ,
            {
                fieldLabel: 'Примечание',
                xtype: 'textfield',
                itemId: 'comment',
                listeners: {
                    specialkey: 'onEnter'
                }
            }
        ];

        this.callParent();
    }
});