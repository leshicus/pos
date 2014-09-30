Ext.define('Office.view.card.PanelFilterCardV', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Office.view.card.PanelFilterCardM',
        'Ext.form.field.Tag',
        'Ext.form.FieldSet'
    ],
    xtype: 'panelfiltercard',
    viewModel: {
        type: 'panelfiltercard'
    },
    layout: {
        type: 'hbox'
    },
    autoScroll: true,
    collapsible: true,
    split: true,
    title: 'Фильтры',
    glyph: 'xf0b0@FontAwesome',
    controller: 'panelfiltercard',
    stateful: true,
    stateId: 'panelfiltercard',
    initComponent: function () {
        console.log('panelfiltercard view');

        var tagSport = Ext.create('Ext.form.field.Tag', {
            fieldLabel: 'Вид спорта',
            itemId: 'comboSport',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            filterPickList: true,
            enableKeyEvents: true,
            bind: {
                store: '{sport}'
            }
        });
        this.items = [
            {
                xtype: 'fieldset',
                title: 'Поиск игроков',
                width: 350,
                margin: 2,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    enableKeyEvents: true,
                    flex:1,
                    _fireEventOnEnter: true,
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel:'Игрок',
                        emptyText: 'Фамилия, имя или паспорт',
                        itemId: 'gamblerSearch'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel:'Штрих-код',
                        itemId: 'barcodeSearch'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Проверка штрих-кода',
                width: 350,
                margin: 2,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    enableKeyEvents: true,
                    flex:1,
                    _fireEventOnEnter: true,
                },
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel:'Штрих-код',
                        itemId: 'barcodeCheck'
                    }
                ]
            }
        ];

        this.tools = [
            /* {
             type: 'gear',
             tooltip: 'Настройка'
             },*/
            {
                type: 'close',
                tooltip: 'Удалить фильтры'
            }
        ]
        this.callParent(); // * без этого пишет Cannot read property 'items' of undefined
    }
})