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
    //glyph: Glyphs.get('list_1'),
    //cls: 'gridtimeline',
    bind: {
        store: '{timeline}',
        title: 'Таймлайн'
        //title: 'Таймлайн{get_fio}'
    },
    listeners: {
        cellclick: 'onCellClick',
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
        //var fieldSearch = Ext.create('Ext.form.field.Text', {
        //    emptyText: 'Номер таймлайна или телефон игрока',
        //    width: 300,
        //    enableKeyEvents: true,
        //    _fireEventOnEnter: true,
        //    selectOnFocus: true,
        //    itemId: 'term',
        //    listeners: {
        //        specialkey: 'onEnter',
        //        change: 'onChangeTerm'
        //    },
        //    bind: {
        //        value: '{filters.term}'
        //    },
        //    triggers: {// * значек лупы
        //        one: {
        //            cls: 'x-form-search-trigger',
        //            handler: 'onPressLoupe'
        //        }
        //    }
        //});

        var comboSearch = Ext.create('Ext.form.field.ComboBox', {
            emptyText: 'Номер таймлайна или телефон игрока',
            width: 300,
            enableKeyEvents: true,
            itemId: 'term',
            valueField: 'id',
            hideLabel: true,
            queryMode: 'remote',
            //hideTrigger:true,
            displayField: 'query',
            autoSelect:false,
            minChars:30,
                listeners: {
                specialkey: 'onEnter',
                change: 'onChangeTerm'
            },
            bind: {
                store:'{search}'
            },
            //triggers: {// * значек лупы
            //    one: {
            //        cls: 'x-form-search-trigger',
            //        handler: 'onPressLoupe'
            //    }
            //}
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
                    width: 120
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
                    dataIndex: 'total_charged_sum',
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
                    text: 'Кол.ставок',
                    dataIndex: 'count',
                    width: 90
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
            //fieldSearch,
            comboSearch,
            {
                xtype: 'checkbox',
                itemId: 'includeArchieved',
               // margin: '2 2 2 5',
                inputValue: true,
                uncheckedValue: false,
                boxLabel: 'Архивные',
                //flex: 1,
                bind: {
                    value: '{filters.includeArchieved}'
                }
            },
            {
                xtype:'displayfield',
                fieldLabel:'Клиент:',
                bind:{
                    value:'{get_fio}'
                },
                labelWidth:60,
                style:{
                    'padding-top': '4px',
                    'padding-left': '10px'
                }
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
        ];

        this.callParent();
    }
});