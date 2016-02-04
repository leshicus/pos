Ext.define('Office.view.card.FormCardV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.Panel',
        'Ext.layout.container.Column',
        'Office.view.card.FormCardM',
        'Office.view.card.FormCardC',
        'Office.view.timeline.FormUserSearchV'
    ],
    xtype: 'formcard',
    viewModel: {
        type: 'formcard'
    },
    controller: 'formcard',
    height: 550,
    width: 700,
    listeners: {
        afterrender: 'onAfterRender'
    },
    initComponent: function () {
        // * чтобы работал запрет на редактирование заполненных полей, itemId и name должны называться одинаково

        // * это нужно, чтобы стор понимал это: url: Server.getUrl({class: 'Pos_Filters_Country', token: '{token}',
        Util.initClassParams({
            scope: this,
            params: []
        });

        var vmForm = this.getViewModel(),
            selected = vmForm.getData().theClient,
            minBirthday;

        // * дата рождения старше 18 лет
        var now = new Date(),
            nowDay = now.getDate(),
            nowMonth = now.getMonth() + 1,
            nowYear = now.getFullYear(),
            oldYear = nowYear - 18,
            oldDate = [oldYear, nowMonth, nowDay].join('-');
        minBirthday = new Date(oldDate);

        var comboDocumentTpl = Ext.create('Ext.XTemplate',
            '<tpl for=".">',
            '<div class="x-boundlist-item">{value} (',
            '<font color="#777">{id}</font>',
            '<tpl if="id == 91">',
            ' <i class="fa fa-question" style="color: #3386C2;font-size:22px;"',
            'data-qtip="<u>Иные документы (91)</u><br>Паспорт гражданина СССР<br>Удостоверение личности военнослужащего СССР<br>Общегражданские заграничные паспорта"',
            '></i>',
            '</tpl>',
            ')</div>',
            '</tpl>'
        );

        this.items = [
            {
                layout: {
                    type: 'hbox'
                },
                margin: '5 5 0 5',
                items: [
                    {
                        xtype: 'fieldset',
                        style: 'float:left;',
                        title: 'Штрих-код',
                        flex: 1,
                        //width: 340,
                        defaults: {
                            enableKeyEvents: true,
                            // margin: 2,
                            margin: '2 0 10 0'
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Штрих-код',
                                labelWidth: 100,
                                name: 'barcode',
                                itemId: 'barcode'
                            }
                        ]
                    },
                    {
                        xtype: 'fieldset',
                        title: 'Выбрать игрока',
                        margin: '0 0 0 10',
                        flex: 1,
                        layout: {
                            type: 'hbox'
                        },
                        defaults: {
                            enableKeyEvents: true
                        },
                        items: [
                            {
                                xtype: 'button',
                                text: 'Выбрать из списка игроков',
                                margin: '2 20 10 20',
                                handler: 'onChooseUser',
                                bind:{
                                    disabled: '{theClient.id}'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'ФИО',
                margin: '0 5 0 5',
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
                        flex: 1,
                        items: [
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Фамилия',
                                labelWidth: 100,
                                allowBlank: false,
                                flex: 3,
                                margin: '2 2 0 0',
                                name: 'lastname',
                                itemId: 'lastname'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Имя',
                                labelWidth: 40,
                                flex: 2,
                                allowBlank: false,
                                margin: '2 0 2 20',
                                name: 'firstname',
                                itemId: 'firstname'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Отчество',
                                labelWidth: 70,
                                flex: 3,
                                margin: '2 2 0 20',
                                name: 'patronymic_name',
                                itemId: 'patronymic_name'
                            }
                        ]
                    },
                    {
                        layout: {
                            type: 'hbox'
                        },
                        items: [
                            {
                                xtype: 'datefield',
                                fieldLabel: 'Дата рождения',
                                format: 'Y-m-d',
                                labelWidth: 100,
                                allowBlank: false,
                                width: 210,
                                margin: '2 2 10 0',
                                name: 'birthday',
                                itemId: 'birthday',
                                maxValue: minBirthday,
                                validator: function (val) {
                                    if (!Gui.isValidBirthdayDate(val)) {
                                        return 'Год рождения должна быть больше 1900';
                                    } else {
                                        return true;
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Документ, удостоверяющий личность',
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
                                listeners: {
                                    el: { // * + логика в onAfterRender
                                        click: 'makePasserRequired' // * так лихо закручено, чтобы ловить именно кликание по чекбоксу, а не программное изменение
                                    }
                                }
                            },
                            {
                                xtype: 'combobox',
                                itemId: 'country',
                                name: 'country',
                                width: 270,
                                matchFieldWidth: false,
                                fieldLabel: 'Гражданство',
                                labelWidth: 90,
                                queryMode: 'local',
                                margin: '2 2 2 18',
                                displayField: 'value',
                                valueField: 'id',
                                allowBlank: false,
                                bind: {
                                    store: '{country}'
                                }
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
                        items: [
                            {
                                xtype: 'combobox',
                                itemId: 'document_type',
                                name: 'document_type',
                                width: 300,
                                fieldLabel: 'Тип документа',
                                matchFieldWidth: false, // * чтобы список был шире, чем сам комбо
                                queryMode: 'local',
                                margin: '2 2 2 2',
                                displayField: 'value',
                                valueField: 'id',
                                editable: false,
                                allowBlank: false,
                                bind: {
                                    store: '{document}',
                                    selection: '{selectedDocument}'
                                },
                                tpl: comboDocumentTpl,
                                listeners: {
                                    select: 'onDocumentTypeChange'
                                }
                            },
                            //{
                            //    xtype: 'textfield',
                            //    fieldLabel: 'Серия',
                            //    labelWidth: 50,
                            //    //width: 150,
                            //    flex: 1,
                            //    plugin: [new Ux.InputTextMaskNewPos("SSSSSSSSSSSSSSSSSSSSSSSSS")],
                            //    margin: '2 2 2 10',
                            //    name: 'passer',
                            //    itemId: 'passer',
                            //    bind: {
                            //        disabled: '{!selectedDocument}'
                            //    },
                            //    listeners: {
                            //        // *
                            //        specialkey: function (field, e) {
                            //            if (e.getKey() == e.DELETE) {
                            //                return false;
                            //            }
                            //        }
                            //    },
                            //    validator: function (val) {
                            //        if (val.indexOf('_') > -1) {
                            //            return 'Значение не соответствует шаблону';
                            //        } else {
                            //            return true;
                            //        }
                            //    }
                            //},
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Серия и номер',
                                labelWidth: 100,
                                _mask: "SSSSSSSSSSSSSSSSSSSSSSSSS",
                                plugin: [new Ux.InputTextMaskNewPos("SSSSSSSSSSSSSSSSSSSSSSSSS")],
                                width: 320,
                                allowBlank: false,
                                margin: '2 2 2 10',
                                name: 'passport_number',
                                itemId: 'passport_number',
                                bind: {
                                    disabled: '{!selectedDocument}'
                                },
                                listeners: {
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.DELETE) {
                                            return false;
                                        }
                                    },
                                    focus: 'onFocus'
                                },
                                validator: function (val) {
                                    if (!this.plugin[0].validateSting(val)) {
                                        //if (val.indexOf('_') > -1 && val && val.match(/_/g).length != this._mask.length) {
                                        //return;
                                        return 'Значение не соответствует шаблону';
                                    } else {
                                        return true;
                                    }
                                }
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
                                labelWidth: 100,
                                name: 'passport_issuer',
                                itemId: 'passport_issuer'
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
                                width: 210,
                                margin: '2 2 0 2',
                                name: 'passport_issue_datetime',
                                itemId: 'passport_issue_datetime'
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: 'Код подразделения',
                                labelWidth: 130,
                                width: 200,
                                margin: '2 2 0 20',
                                name: 'passport_code',
                                itemId: 'passport_code'
                            }
                        ]
                    }
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
                        readOnly: true,
                        name: 'address',
                        itemId: 'address',
                        bind: '{theClient.address}' // * для обмена с формой редактирования адреса
                    },
                    {
                        xtype: 'button',
                        icon: null,
                        itemId: 'buttonKladr',
                        glyph: Glyphs.get('edit'),
                        width: 62,
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
                        width: 230,
                        margin: '2 2 10 2',
                        name: 'mobile_phone',
                        itemId: 'mobile_phone'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'ИНН',
                        _mask: "999999999999",
                        plugin: [new Ux.InputTextMaskNewPos("999999999999")],
                        labelWidth: 35,
                        width: 150,
                        margin: '2 2 10 20',
                        name: 'inn',
                        itemId: 'inn',
                        listeners: {
                            specialkey: function (field, e) {
                                if (e.getKey() == e.DELETE) {
                                    return false;
                                }
                            },
                            render: function (field) {
                                field.plugin[0].setInputMask(field._mask);
                                field.plugin[0].init(field);
                            }
                        },
                        validator: function (val) {
                            if (!this.plugin[0].validateSting(val) && val && val.match(/_/g).length != this._mask.length) {
                                //if (val.indexOf('_') > -1 && val && val.match(/_/g).length != this._mask.length) {
                                return 'Значение не соответствует шаблону';
                            } else {
                                return true;
                            }
                        }
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
                        itemId: 'is_vip'
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
                        itemId: 'is_blacklisted'
                    }
                ]
            }
        ];
        this.buttons = Util.getButtonsSaveCancel({
            scope: this.getController()
        });
        this.callParent();
    }
});