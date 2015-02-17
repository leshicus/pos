Ext.define('Office.view.timeline.GridTimelineV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.timeline.GridTimelineM',
        'Office.view.timeline.GridTimelineC'
    ],
    xtype: 'gridtimeline',
    controller: 'gridtimeline',
    viewModel: {
        type: 'gridtimeline'
    },
    columnLines: true,
    flex: 1, // * растягивает по верт до низу
    title: 'Таймлайн',
    frame: true,
    resizable:true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    glyph: Glyphs.get('list_1'),
    cls: 'gridtimeline',
    bind: '{timeline}',
    listeners: {
        cellclick: 'onCellclick',
        scope: 'controller'
    },
    initComponent: function () {
        Utilities.initClassParams({
            scope: this,
            params: [
                'filters.term',
                'filters.includeArchieved',
                'fio',
                'passport',
                'phone'
            ]
        });
        var fieldSearch = Ext.create('Ext.form.field.Text', {
            emptyText: 'Номер и код таймлайна или телефон игрока',
            width: 200,
            enableKeyEvents: true,
            _fireEventOnEnter: true,
            itemId: 'term',
            listeners: {
                specialkey: 'onEnter'
            },
            bind:{
                value:'{filters.term}'
            },
            triggers: {// * значек лупы
                one: {
                    cls: 'x-form-search-trigger'
                }
            }
        });

        // * устанавливает начальное значение поля "поиск таймлайн"
        //Debug.setGridPaySlipId(fieldSearch, 'phone_number');
        Debug.setPhone(this.getViewModel(), 'filters.term');

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
                    text: '№',
                    dataIndex: 'id',
                    //itemId: 'id',
                    width: 70
                },
                {
                    text: 'Тип',
                    dataIndex: 'type',
                    //itemId: 'type',
                    width: 130,
                    renderer: function (val) {
                        switch (val) { //todo slip-status
                            case '5':
                                return 'Спорт';
                                break;
                            case '6':
                                return 'Гейм';
                                break;
                        }
                    }
                },
                {
                    text: 'Дата создания',
                    dataIndex: 'timeline_close_datetime',
                    //itemId: 'date_time',
                    width: 180
                },
                {
                    text: 'На начало',
                    dataIndex: 'stake',
                    //itemId: 'patronymic_name',
                    width: 130,
                    renderer: Ext.util.Format.numberRenderer('0,0.00')
                },
                {
                    text: 'В игре',
                    dataIndex: 'in_game_sum',
                    //itemId: 'patronymic_name',
                    width: 130,
                    renderer: Ext.util.Format.numberRenderer('0,0.00')
                },
                {
                    text: 'Остаток',
                    dataIndex: 'to_pay',
                    //itemId: 'patronymic_name',
                    width: 130,
                    renderer: Ext.util.Format.numberRenderer('0,0.00')
                },
                {
                    text: 'Статус',
                    dataIndex: 'status_text',
                    //itemId: 'patronymic_name',
                    width: 130
                }
            ]
        }

        this.tbar = [
            {
                text: 'Создать',
                glyph: Glyphs.get('plus'),
                cls: 'plus',
                action: 'add',
                handler: 'onAddTimeline'
            },
            fieldSearch,
            {
                xtype: 'checkbox',
                itemId: 'includeArchieved',
                margin: '2 2 2 5',
                inputValue: true,
                uncheckedValue: false,
                boxLabel: 'Архивные',
                flex: 1,
                bind:{
                    value:'{filters.includeArchieved}'
                }
            }

        ];
        this.bbar = [
            {
                xtype: 'displayfield',
                itemId: 'displayFio',
                fieldLabel: 'ФИО',
                labelWidth: 50,
                margin: '0 20 0 0',
                bind:'{fio}',
                style: {
                    'color': "rgb(39, 127, 204) !important"
                }
            },
            {
                xtype: 'displayfield',
                itemId: 'displayPassport',
                fieldLabel: 'Паспорт',
                labelWidth: 70,
                bind:'{passport}',
                margin: '0 20 0 0'
            },
            {
                xtype: 'displayfield',
                itemId: 'displayPhone',
                fieldLabel: 'Телефон',
                bind:'{phone}',
                labelWidth: 80
            }
        ];

        this.tools = [
            {
                type: 'refresh',
                tooltip: 'Обновить'
            },
            {
                type: 'close',
                tooltip: 'Удалить фильтры'
            }
        ]

        this.callParent();
    }
});