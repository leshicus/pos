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
    flex: 1,
    title: 'Клубные карты',
    frame: true,
    controller: 'gridcard',
    viewConfig: {
        stripeRows: true
    },
    referenceHolder: true,
    reference: 'gridcardRef',
    bind: '{storeGridcard}',
    initComponent: function () {
        var lock = Ext.create('Ext.Img', {
            glyph: '59403@fontello',
            style: {
                color: 'green'
            }
        });
        this.columns = [
            {
                text: 'id',
                dataIndex: 'cardid',
                itemId: 'cardid',
                width: 70
            },
            {
                text: 'Фамилия',
                dataIndex: 'family',
                itemId: 'family',
                width: 130,
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
                        emptyText: '=',
                        _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                        itemId: 'textFamily'
                    }
                ]
            },
            {
                text: 'Имя',
                dataIndex: 'firstname',
                itemId: 'firstname',
                width: 130
            },
            {
                text: 'Отчество',
                dataIndex: 'lastname',
                itemId: 'lastname',
                width: 130
            },
            {
                text: 'Паспорт',
                //dataIndex: 'passport',
                itemId: 'passport',
                width: 100,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    enableKeyEvents: true,
                    margin: 2
                },
                renderer: function (val, w, rec) {
                    var passer = '',
                        pasnum = '';
                    if (rec) {
                        passer = rec.get('passer') || '';
                        pasnum = rec.get('pasnum') || '';
                    }
                    return passer + pasnum;
                },
                items: [
                    {
                        xtype: 'textfield',
                        emptyText: '=',
                        _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                        itemId: 'textPassport'
                    }
                ]
            },
            {
                text: 'Штрих-код',
                dataIndex: 'barcode',
                itemId: 'barcode',
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
                        emptyText: '=',
                        _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                        itemId: 'textBarcode'
                    }
                ]
            },
            {
                text: 'Статус<br>карты',
                //xtype: 'actioncolumn',
                dataIndex: 'status',
                itemId: 'status',
                width: 70,
                renderer:function (val, meta, rec) {
                    if (rec.get('status') == 1) {
                        return '<span role="button" class="icon-lock-4" data-qtip="Заблокирована"></span>';
                    }
                }
                /*items: [
                    {
                        getClass: function (v, meta, rec) {  // Or return a class from a function
                            if (rec.get('status') == 1) {
                                this.items[0].glyph = 'xf011@FontAwesome';
                                console.info(rec,this);
                                meta.attr = 'style="color:red;"';
                            }
                        },
                        getTip: function (v, meta, rec) {  // Or return a class from a function
                            if (rec.get('status') == 1) {
                                meta.attr = 'style="color:red;"';
                                return 'Заблокирована';
                            }
                        },
                        tooltip: 'Заблокирована'
                    }
                ]*/

            }

        ];
        this.tbar = [
            {
                text: 'Добавить клиента',
                action: 'addClient'
            },
            {
                xtype: 'textfield',
                //fieldLabel:'Проверить штрих-код',
                emptyText: 'Проверить штрих-код',
                margin: '0 0 0 15',
                labelWidth: 140,
                enableKeyEvents: true,
                itemId: 'checkBarcode',
                triggers: {
                    one: {
                        cls: 'x-form-clear-trigger',
                        handler: function () {
                            console.info('one');
                        }
                    }
                }
            }
        ];
        this.bbar = Ext.create('Ext.PagingToolbar', {
            bind: {
                store: '{gridcard}'
            },
            displayInfo: true,
            displayMsg: 'Показаны записи {0} - {1} из {2}',
            emptyMsg: "Нет записей для отображения"
        });
        this.callParent();
    }
});