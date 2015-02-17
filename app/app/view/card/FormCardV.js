Ext.define('Office.view.card.FormCardV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.Panel',
        'Ext.layout.container.Column',
        'Office.view.card.FormCardC'
    ],
    xtype: 'formcard',
    controller: 'formcard',
    height: 520,
    width: 700,
    initComponent: function () {
        var tabIndex = 0;

        this.items = [
            {
                xtype: 'fieldset',
                title: 'Штрих-код',
                margin: 5,
                defaults: {
                    enableKeyEvents: true,
                    margin: 2,
                    margin: '0 0 10 0'
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Штрих-код',
                        labelWidth: 100,
                        name: 'barcode',
                        itemId: 'barcode',
                        bind: '{theClient.barcode}'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'ФИО',
                margin: 5,
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    enableKeyEvents: true
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Фамилия',
                        labelWidth: 100,
                        allowBlank: false,
                        msgTarget: 'side',
                        flex: 3,
                        margin: '2 2 10 2',
                        name: 'lastname',
                        itemId: 'lastname',
                        bind: '{theClient.lastname}'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Имя',
                        labelWidth: 40,
                        flex: 2,
                        allowBlank: false,
                        msgTarget: 'side',
                        margin: '2 20 2 20',
                        name: 'firstname',
                        itemId: 'firstname',
                        bind: '{theClient.firstname}'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Отчество',
                        labelWidth: 70,
                        flex: 3,
                        margin: '2 2 10 2',
                        name: 'patronymic_name',
                        itemId: 'patronymic_name',
                        bind: '{theClient.patronymic_name}'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Паспорт',
                margin: 5,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    {
                        layout: {
                            type: 'hbox'
                        },
                        defaults: {
                            enableKeyEvents: true
                        },
                        items: [
                            {
                                xtype: 'checkbox',
                                fieldLabel: 'Резидент',
                                labelWidth: 100,
                                margin: 2,
                                inputValue: '1',
                                uncheckedValue: '0',
                                name: 'is_resident',
                                itemId: 'is_resident',
                                bind: '{theClient.is_resident}'
                                //handler: 'convertCkeckboxValue'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Серия',
                                labelWidth: 50,
                                width: 120,
                                allowBlank: false,
                                msgTarget: 'side',
                                margin: '2 20 2 20',
                                name: 'passer',
                                itemId: 'passer',
                                /* listeners:{
                                 change:'onPasSerChange'
                                 }*/
                                bind: '{theClient.passer}'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Номер',
                                labelWidth: 50,
                                width: 150,
                               // allowBlank: false,
                                msgTarget: 'side',
                                margin: 2,
                                name: 'pasnom',
                                itemId: 'pasnom',
                                /* listeners:{
                                 change:'onPasNomChange'
                                 }*/
                                bind: '{theClient.pasnom}'
                            }
                        ]
                    },
                    {
                        layout: {
                            type: 'hbox'
                        },
                        defaults: {
                            enableKeyEvents: true,
                            margin: 2,
                            flex: 1
                        },
                        items: [
                            {
                                xtype: 'textarea',
                                fieldLabel: 'Выдан',
                                allowBlank: false,
                                msgTarget: 'side',
                                labelWidth: 100,
                                name: 'passport_issuer',
                                itemId: 'passport_issuer',
                                bind: '{theClient.passport_issuer}'
                            }
                        ]
                    },
                    {
                        layout: {
                            type: 'hbox'
                        },
                        defaults: {
                            enableKeyEvents: true
                        },
                        margin: '0 0 10 0',
                        items: [
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Дата выдачи',
                                format: 'Y-m-d',
                                labelWidth: 100,
                                allowBlank: false,
                                //msgTarget: 'side',
                                width: 210,
                                margin: 2,
                                name: 'passport_issue_datetime',
                                itemId: 'passport_issue_datetime',
                                bind: '{theClient.passport_issue_datetime}'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Код подразделения',
                                labelWidth: 130,
                                width: 200,
                                margin: '2 2 2 20',
                                name: 'passport_code',
                                itemId: 'passport_code',
                                bind: '{theClient.passport_code}'
                            }
                        ]
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Адрес',
                margin: 5,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                defaults: {
                    enableKeyEvents: true,
                    margin: '2 2 10 2'
                },
                items: [
                    {
                        xtype: 'textarea',
                        itemId: 'address',
                        fieldLabel: 'Адрес регистрации (РФ)',
                        labelWidth: 100,
                        flex: 1,
                        allowBlank: false,
                        msgTarget: 'side',
                        //editable: false,
                        name: 'address',
                        itemId: 'address',
                        bind: '{theClient.address}'
                    },
                    {
                        xtype: 'button',
                        icon: null,
                        itemId:'buttonKladr',
                        glyph: Glyphs.get('edit'),
                        width: 30,
                        xtype: 'button',
                        handler: 'onClickEditAdress',
                        cls: 'glyph_edit', // * цвет иконки
                        componentCls: 'button_edit' // * цвет кнопки
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Другое',
                margin: '5 5 10 5',
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    enableKeyEvents: true
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Телефон',
                        labelWidth: 100,
                        width: '200',
                        margin: '2 2 10 2',
                        allowBlank: false,
                        name: 'mobile_phone',
                        itemId: 'mobile_phone',
                        bind: '{theClient.mobile_phone}'
                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: 'VIP',
                        labelWidth: 25,
                        margin: 2,
                        margin: '2 20 10 20',
                        inputValue: '1',
                        uncheckedValue: '0',
                        name: 'is_vip',
                        itemId: 'is_vip',
                        bind: '{theClient.is_vip}'
                        //handler: 'convertCkeckboxValue'
                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: 'Черный список',
                        labelWidth: 100,
                        margin: 2,
                        margin: '2 2 10 2',
                        inputValue: '1',
                        uncheckedValue: '0',
                        name: 'is_blacklisted',
                        itemId: 'is_blacklisted',
                        bind: '{theClient.is_blacklisted}'
                        //handler: 'convertCkeckboxValue'
                    }
                ]
            }
        ];
        this.buttons = Utilities.getButtonsSaveCancel({
            scope: this.getController()
        });
        this.callParent();
    }
});