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
    frame: true,
    resizable: true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        getRowClass: function (record, index, rowParams, store) { // * класс для строки грида
            if (record.get('other_cash') == true) return 'blocked-card-row';
        }
    },
    glyph: Glyphs.get('list_1'),
    cls: 'gridtimeline',
    bind: {
        store: '{timeline}',
        title: 'Таймлайн{get_fio}'
    },
    listeners: {
        cellclick: 'onCellclick',
        afterrender:'onAfterRender',
        scope: 'controller'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'filters.term',
                'filters.includeArchieved',
                'fio',
                'passport',
                'phone',
                'resident'
            ]
        });
        var fieldSearch = Ext.create('Ext.form.field.Text', {
            emptyText: 'Номер и код таймлайна или телефон игрока',
            width: 200,
            enableKeyEvents: true,
            _fireEventOnEnter: true,
            selectOnFocus: true,
            itemId: 'term',
            listeners: {
                specialkey: 'onEnter',
                change: 'onChangeTerm'
            },
            bind: {
                value: '{filters.term}'
            },
            triggers: {// * значек лупы
                one: {
                    cls: 'x-form-search-trigger',
                    handler: 'onPressLoupe'
                }
            }
        });

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
                    width: 60
                },
                {
                    text: 'Тип',
                    dataIndex: 'type',
                    width: 70,
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
                    text: 'Дата расчета',
                    dataIndex: 'timeline_close_datetime',
                    width: 150
                },
                {
                    text: 'Внесено',
                    dataIndex: 'stake',
                    width: 100,
                    renderer: Ext.util.Format.numberRenderer('0,0.00')
                },
                {
                    text: 'В игре',
                    dataIndex: 'in_game_sum',
                    width: 100,
                    renderer: Ext.util.Format.numberRenderer('0,0.00')
                },
                {
                    text: 'Остаток',
                    dataIndex: 'to_pay',
                    width: 100,
                    renderer: Ext.util.Format.numberRenderer('0,0.00')
                },
                {
                    text: 'Статус',
                    dataIndex: 'status_text',
                    width: 110
                },
                {
                    text: 'Касса',
                    dataIndex: 'cash_info',
                    flex: 1
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
                bind: {
                    value: '{filters.includeArchieved}'
                }
            }

        ];
        //this.bbar = [
        //    {
        //        xtype: 'displayfield',
        //        itemId: 'displayFio',
        //        fieldLabel: 'ФИО',
        //        labelWidth: 50,
        //        margin: '0 20 0 0',
        //        bind:'{fio}',
        //        style: {
        //            'color': "rgb(39, 127, 204) !important"
        //        }
        //    },
        //    {
        //        xtype: 'displayfield',
        //        itemId: 'displayPassport',
        //        fieldLabel: 'Паспорт',
        //        labelWidth: 70,
        //        bind:'{passport}',
        //        margin: '0 20 0 0'
        //    },
        //    {
        //        xtype: 'displayfield',
        //        itemId: 'displayPhone',
        //        fieldLabel: 'Телефон',
        //        bind:'{phone}',
        //        labelWidth: 80
        //    }
        //];

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