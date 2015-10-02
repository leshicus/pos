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
    collapsible: true,
    title: 'Печать линии',
    defaults: {
        // labelWidth: 150,
        margin: 5
    },
    initComponent: function () {
        var me = this;
        Util.initClassParams({
            scope: this,
            params: [
                'filters.cbSport',
               // 'cbSport_model'
            ]
        });

        Ext.defer(function () {
            // * нельзя сначала объявить переменную стор, а потом написать storeSport.load().
            // * ругается, что метод load() не определен. Наверно, потому что в момент определения переменной
            // * стор еще не создан, и storeSport=null
            me.getViewModel().getStore('sport').load();
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
                _bind: {
                    store: '{sport}',
                    //selection: '{cbSport_model}',
                    value: '{filters.cbSport}'
                },
                //_func: function (combo, n) {
                //    me.getViewModel().set('cbSport', n);
                //}
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

        ];

        this.bbar = new Ext.container.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            defaults: {
                xtype: 'toolbar'
            },
            items: [
                {
                    items: [
                        {
                            text: 'Упрощенная линия',
                            glyph: Glyphs.get('print'),
                            width: 150,
                            textAlign: 'left',
                            handler: 'onPrintLine',
                            _type: 'short'
                        }
                    ]
                },
                {
                    items: [
                        {
                            text: 'Полная линия',
                            glyph: Glyphs.get('print'),
                            width: 150,
                            textAlign: 'left',
                            handler: 'onPrintLine',
                            _type: 'full'
                        }
                    ]
                },
                {
                    items: [
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
                    items: [
                        {
                            text: 'Пятерочка',
                            glyph: Glyphs.get('print'),
                            hidden: !(Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals').keepRecordsOfPlayers && Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals').use_express_day),
                            width: 150,
                            textAlign: 'left',
                            handler: 'onPrintDayExpress',
                            _type: '0'
                        }
                    ]
                },
                {
                    items: [
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
        });


        this.callParent();
    }
});
