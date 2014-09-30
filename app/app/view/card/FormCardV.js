Ext.define('Office.view.card.FormCardV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.Panel',
        'Ext.layout.container.Column',
        'Office.view.card.FormCardC',
        'Office.view.card.GridCardM'
    ],
    xtype: 'formcard',
    controller: 'formcard',
    initComponent: function () {
        var viewModel = Ext.ComponentQuery.query('gridcard')[0].getViewModel();
        this.setViewModel(viewModel);

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
                        bind: '{currentClient.barcode}'
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
                        flex: 3,
                        margin: '2 2 10 2',
                        bind: '{currentClient.family}'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Имя',
                        labelWidth: 40,
                        flex: 2,
                        margin: '2 20 2 20',
                        bind: '{currentClient.firstname}'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Отчество',
                        labelWidth: 70,
                        flex: 3,
                        margin: '2 2 10 2',
                        bind: '{currentClient.lastname}'
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
                                bind: '{currentClient.resident}'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Серия',
                                labelWidth: 50,
                                width: 120,
                                margin: '2 20 2 20',
                                bind: '{currentClient.passer}'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Номер',
                                labelWidth: 50,
                                width: 120,
                                margin: 2,
                                bind: '{currentClient.pasnum}'
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
                                labelWidth: 100,
                                bind: '{currentClient.issued}'
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
                                format: 'd.m.Y',
                                labelWidth: 100,
                                width: 210,
                                margin: 2,
                                bind: '{currentClient.dateissue}'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Код подразделения',
                                labelWidth: 130,
                                width: 200,
                                margin: '2 2 2 20',
                                bind: '{currentClient.depcode}'
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
                    type: 'hbox'
                },
                defaults: {
                    enableKeyEvents: true,
                    margin: '2 2 10 2',
                    flex: 1
                },
                items: [
                    {
                        xtype: 'textarea',
                        fieldLabel: 'Адрес регистрации (РФ)',
                        labelWidth: 100,
                        editable:false,
                        bind: '{currentClient.regaddr}'
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
                        width:'200',
                        margin: '2 2 10 2',
                        bind: '{currentClient.phone}'
                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: 'VIP',
                        labelWidth: 25,
                        margin: 2,
                        margin: '2 20 10 20',
                        bind: '{currentClient.vip}'
                    },
                    {
                        xtype: 'checkbox',
                        fieldLabel: 'Черный список',
                        labelWidth: 100,
                        margin: 2,
                        margin: '2 2 10 2',
                        bind: '{currentClient.blacklist}'
                    }
                ]
            }
        ];
        this.buttons = [
            {
                text: 'Сохранить',
                action: 'save',
                scale: 'medium'
            },
            '->',
            {
                text: 'Отмена',
                action: 'cancel',
                scale: 'medium'
            }
        ];
        this.callParent();
    }
});