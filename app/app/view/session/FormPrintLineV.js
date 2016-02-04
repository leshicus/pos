Ext.define('Office.view.session.FormPrintLineV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Office.view.session.FormPrintLineC',
        'Office.view.session.FormPrintLineM',
        'Office.view.common.ComboCheckV',
        'Office.view.common.DateFromToV',
        'Office.model.SportM'
    ],
    xtype: 'formprintline',
    controller: 'formprintline',
    viewModel: {
        type: 'formprintline'
    },
    frame: true,
    border: true,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    //collapsible: true,
    title: 'Печать линии',
    defaults: {
        // labelWidth: 150,
        margin: '0 5 0 5'
    },
    initComponent: function () {
        var me = this;
        Util.initClassParams({
            scope: this,
            params: [
                'filters.cbSport',
                'filters.cbTournament',
                // 'cbSport_model'
            ]
        });

        Ext.defer(function () {
            // * нельзя сначала объявить переменную стор, а потом написать storeSport.load().
            // * ругается, что метод load() не определен. Наверно, потому что в момент определения переменной
            // * стор еще не создан, и storeSport=null
            me.getViewModel().getStore('sport').load();
            me.getViewModel().getStore('tournament').load();
        }, 20);

        this.items = [
            {
                xtype: 'combocheck',
                emptyText: 'Вид спорта',
                itemId: 'cbSport',
                editable: false,
                queryMode: 'local',
                displayField: 'value',
                valueField: 'id',
                _checkField: 'checked',
                margin: '5 5 0 5',
                _bind: {
                    store: '{sport}',
                    //selection: '{cbSport_model}',
                    value: '{filters.cbSport}'
                },
                _funcCollapse: function (combo, n) {
                    me.controller.reloadTournamentCombo(combo, n);
                },
                //_func: function (combo, n) {
                //    me.getViewModel().set('cbSport', n);
                //}
            },
            {
                xtype: 'combocheck',
                emptyText: 'Турнир',
                itemId: 'cbTournament',
                editable: true,
                queryMode: 'remote',//'remote',
                displayField: 'name',
                valueField: 'id',
                _checkField: 'checked',
                _bind: {
                    store: '{tournament}',
                    value: '{filters.cbTournament}'
                }
            },
            {
                xtype: 'datefromto',
                _itemIdFrom: 'begin',
                _itemIdTo: 'end',
                _layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                _listenersFrom: {
                    change: function (combo, n) {
                        me.getViewModel().set('begin', combo.getValue());
                    }
                },
                _listenersTo: {
                    change: function (combo, n) {
                        me.getViewModel().set('end', combo.getValue());
                    }
                }
            },
            //{
            //    text: 'Сбросить',
            //    xtype: 'button',
            //    glyph: Glyphs.get('refresh'),
            //    width: 150,
            //    textAlign: 'center',
            //    handler: 'onResetFilter'
            //},
            {
                layout: {
                    type: 'hbox'
                },
                margin: '0 5 5 5',
                cls:'button-like-toolbar',
                items: [
                    {
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        flex:1,
                        defaults: {
                            xtype: 'button',
                            margin: '5 0 0 0'
                        },
                        items: [
                            {
                                text: 'Упрощенная линия',
                                glyph: Glyphs.get('print'),
                                width: 150,
                                textAlign: 'left',
                                handler: 'onPrintLine',
                                _type: 'short'
                            },
                            {
                                text: 'Полная линия',
                                glyph: Glyphs.get('print'),
                                width: 150,
                                textAlign: 'left',
                                handler: 'onPrintLine',
                                _type: 'full'
                            },
                            {
                                text: 'Результаты',
                                glyph: Glyphs.get('print'),
                                width: 150,
                                textAlign: 'left',
                                handler: 'onPrintResults',
                                _type: 'short'
                            }
                        ]
                    },
                    {
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        flex:1,
                        defaults: {
                            xtype: 'button',
                            margin: '5 0 0 5'
                        },
                        items: [
                            {
                                text: 'Пятерочка',
                                glyph: Glyphs.get('print'),
                                hidden: !(Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals').keepRecordsOfPlayers && Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals').use_express_day),
                                width: 150,
                                textAlign: 'left',
                                handler: 'onPrintDayExpress',
                                _type: '0'
                            },
                            {
                                text: 'Двойной шанс',
                                glyph: Glyphs.get('print'),
                                hidden: !(Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals').keepRecordsOfPlayers && Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals').use_express_day_dc),
                                width: 150,
                                textAlign: 'left',
                                handler: 'onPrintDayExpress',
                                _type: '1'
                            }
                        ]
                    }
                ]
            }
        ];

        this.tools = [
            {
                type: 'close',
                tooltip: 'Удалить фильтры',
                handler: 'onResetFilter'
            }
        ]

        this.callParent();
    }
});
