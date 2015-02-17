Ext.define('Office.view.session.FormPrintLineV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Office.view.session.FormPrintLineC',
        'Office.view.session.FormPrintLineM',
        'Office.view.common.ComboCheckV',
        'Office.view.common.DateFromToV'
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
    collapsible:true,
    title: 'Печать линии',
    defaults: {
        // labelWidth: 150,
        margin: 5
    },
    initComponent: function () {
        var me = this;
        Utilities.initClassParams({
            scope: this,
            params: [
                'filters.cbSport',
                'cbSport_model'
            ]
        });

        Ext.defer(function(){
            me.getViewModel().getStore('sport').load();
        },10);

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
                    store:'{sport}',
                    selection:'{cbSport_model}',
                    value:'{filters.cbSport}'
                },
                _func: function (combo, n) {
                    me.getViewModel().set('cbSport', n);
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
                            _type:'short'
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
                            _type:'full'
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
                            _type:'short'
                        }
                    ]
                }
            ]
        });




        this.callParent();
    }
});
