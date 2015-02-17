Ext.define('Office.view.card.GridCardV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.Img',
        'Ext.grid.column.Action',
        'Office.view.card.GridCardM',
        'Office.view.card.GridCardC'
    ],
    xtype: 'gridcard',
    viewModel: {
        type: 'gridcard'
    },
    columnLines: true,
    flex: 1, // * растягивает по верт до низу
    title: 'Клубные карты',
    frame: true,
    //border:1,
    controller: 'gridcard',
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        // * делать сереньким игроков без карты
        /*getRowClass: function (record, index, rowParams, store) { // * класс для строки грида
            if (record.get('card_status') != 1) return 'blocked-card-row';
        }*/
    },
    referenceHolder: true,
    reference: 'gridcardRef',
    glyph: Glyphs.get('card'),
    cls: 'gridcard',
    bind: '{card}',
    /*bbar: {
        xtype: 'pagingtoolbar',
        bind: {
            store: '{card}'
        },
        displayInfo: true,
        displayMsg: 'Показаны записи {0} - {1} из {2}',
        emptyMsg: "Нет записей для отображения"
    },*/
    initComponent: function () {
        /*
         1) itemId: 'user' пока в фамилии, имени и паспорте.
         */

        Utilities.initClassParams({
            scope: this,
            params: [
                'filters.userid',
                'filters.lastname',
                'filters.firstname',
                'filters.passport_number',
                'filters.barcode',
                'barcode_check'
            ]
        });

        var lock = Ext.create('Ext.Img', {
                glyph: '59403@fontello',
                style: {
                    color: 'green'
                }
            }),
            lastname = Ext.create('Ext.form.field.Text', {
                _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                itemId: 'lastname',
                bind: '{filters.lastname}',
                listeners: {
                    specialkey: 'onEnter'
                }
            }),
            barcode = Ext.create('Ext.form.field.Text', {
                emptyText: 'Проверить штрих-код',
                margin: '0 0 0 15',
                labelWidth: 140,
                enableKeyEvents: true,
                _fireEventOnEnter: true,
                itemId: 'barcode',
                bind: '{barcode_check}',
                listeners: {
                    specialkey: 'onEnterBarcodeInfo'
                },
                triggers: {// * значек лупы
                    one: {
                        cls: 'x-form-search-trigger'
                    }
                }
            });

        // * устанавливает начальное значение поля "Фамилия"
        Debug.setCardFio(this.getViewModel(), 'filters.lastname');
        // * устанавливает начальное значение поля "Проверить штрих-код"
        Debug.setBarcode(this.getViewModel(), 'barcode_check');

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                }
            },
            items: [
                {
                    text: 'id',
                    dataIndex: 'id',
                    //itemId: 'id',
                    width: 70,
                    defaults: {
                        enableKeyEvents: true,
                        margin: 2
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                            itemId: 'userid',
                            bind: '{filters.userid}',
                            listeners: {
                                specialkey: 'onEnter'
                            }
                        }
                    ]
                },
                {
                    text: 'Фамилия',
                    dataIndex: 'lastname',
                    //itemId: 'lastname',
                    width: 130,
                    defaults: {
                        enableKeyEvents: true,
                        margin: 2
                    },
                    items: [
                        lastname
                    ]
                },
                {
                    text: 'Имя',
                    dataIndex: 'firstname',
                    //itemId: 'firstname',
                    width: 130,
                    defaults: {
                        enableKeyEvents: true,
                        margin: 2
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                            itemId: 'firstname',
                            bind: '{filters.firstname}',
                            listeners: {
                                specialkey: 'onEnter'
                            }
                        }
                    ]
                },
                {
                    text: 'Отчество',
                    dataIndex: 'patronymic_name',
                    //itemId: 'patronymic_name',
                    width: 130
                },
                {
                    text: 'Паспорт',
                    dataIndex: 'passport_number',
                    //itemId: 'passport_number',
                    width: 100,
                    defaults: {
                        enableKeyEvents: true,
                        margin: 2
                    },
                    // * серия и номер отдельно
                    renderer: function (val, w, rec) {
                        if (val && val.length == 10) {
                            var passer = val.substr(0, 4),
                                pasnum = val.substr(-6, 6);
                            return passer + ' ' + pasnum;
                        } else {
                            return val;
                        }
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                            itemId: 'passport_number',
                            bind: '{filters.passport_number}',
                            listeners: {
                                specialkey: 'onEnter'
                            }
                        }
                    ]
                },
                {
                    text: 'Штрих-код',
                    dataIndex: 'barcode',
                    //itemId: 'barcode',
                    width: 100,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    defaults: {
                        enableKeyEvents: true,
                        margin: 2
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                            itemId: 'barcode',
                            bind: '{filters.barcode}',
                            listeners: {
                                specialkey: 'onEnter'
                            }
                        }
                    ]
                },
                {
                    text: 'Выдана',
                    dataIndex: 'binding_datetime',
                    //itemId: 'binding_datetime',
                    width: 160
                },
                {
                    text: 'Статус<br>карты',
                    dataIndex: 'card_status',
                    //itemId: 'card_status',
                    width: 70,
                    renderer: function (val, meta, rec) {
                        meta.align = 'center';
                        if (rec.get('card_status') != 1) {
                            //return '<span role="button" class="fa fa-lock" style="color: crimson" data-qtip="Заблокирована"></span>';
                        } else {
                            return '<span role="button" class="fa fa-check" style="color: green" data-qtip="Действующая"></span>';
                        }
                    }
                }
            ]
        }

        this.tbar = [
            {
                text: 'Добавить клиента',
                glyph: Glyphs.get('plus'),
                cls: 'plus',
                action: 'addClient'
            },
            barcode
        ];

        this.callParent();
    }
});