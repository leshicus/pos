Ext.define('Office.view.virtual.GridVirtualV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.Img',
        'Office.view.virtual.GridVirtualM',
        'Office.view.virtual.GridVirtualC'
    ],
    xtype: 'gridvirtual',
    viewModel: {
        type: 'gridvirtual'
    },
    columnLines: true,
    flex: 1,
    title: 'Виртуальные заявки',
    frame: true,
    controller: 'gridvirtual',
    viewConfig: {
        stripeRows: true
    },
    /*glyph: Glyphs.get('virtual'),
    cls: 'gridvirtual',*/
    bind: '{virtual}',
    initComponent: function () {
        Utilities.initClassParams({
            scope: this,
            params: [
                'filters.short_number',
                'filters.place_id'
            ]
        });
        var short_number = Ext.create('Ext.form.field.Text', {
                _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                itemId: 'bidNum',
                bind:'{filters.short_number}',
                listeners: {
                    specialkey: 'onEnter'
                }
            }),
            clubId = Ext.create('Ext.form.field.Text', {
                _fireEventOnEnter: true,
                itemId: 'clubId',
                bind:'{filters.place_id}',
                listeners: {
                    specialkey: 'onEnter'
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
                    text: '&nbsp<br>Номер заявки',
                    dataIndex: 'short_number',
                    itemId: 'short_number',
                    width: 110,
                    defaults: {
                        enableKeyEvents: true,
                        margin: 2
                    },
                    items: [
                        short_number
                    ]
                },
                {
                    text: 'Номер игровой<br>консоли',
                    dataIndex: 'club_id',
                    itemId: 'club_id',
                    width: 110,
                    defaults: {
                        enableKeyEvents: true,
                        margin: 2
                    },
                    items: [
                        clubId
                    ]
                },
                {
                    text: 'Сумма',
                    dataIndex: 'sum',
                    itemId: 'sum',
                    width: 80,
                    renderer: Ext.util.Format.numberRenderer('0,0.00')
                },
                {
                    text: 'Дата создания',
                    dataIndex: 'create_datetime',
                    itemId: 'create_datetime',
                    width: 150
                },
                {
                    text: 'Дата удаления',
                    dataIndex: 'fin_datetime',
                    itemId: 'fin_datetime',
                    width: 150
                },
                {
                    text: 'Открыть<br>заявку',
                    dataIndex: 'is_copy_to_coupon',
                    itemId: 'copyToCoupon',
                    width: 70,
                    renderer: 'clickCopyToCoupon'
                    /*items: [{
                        getGlyph: function(v, meta, rec) {
                            if (rec.get('is_copy_to_coupon') == "0") {
                                meta.align = 'center';
                                //return '<span role="button" class="fa fa-arrow-right virtualGreen" data-qtip="Скопировать в купон"></span>';
                                return Glyphs.get('card');
                            }else{
                                meta.align = 'center';
                                //return '<span role="button" class="fa fa-arrow-right virtualBlue" data-qtip="Уже скопирована в купон"></span>';
                                return '&' + Glyphs.get('card');
                            }
                        },
                        handler: function (grid, rowIndex, colIndex) {
                            console.info(arguments);
                        }
                    }]*/

                }
            ]
        }

        this.tools = [
            {
                type: 'refresh',
                tooltip: 'Обновить'
            }
        ]

        this.callParent();
    }
});