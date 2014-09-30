Ext.define('Office.view.rat.PanelFilterRatV', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Office.view.rat.PanelFilterRatM',
        'Ext.form.field.Tag',
        'Ext.form.FieldSet'
    ],
    xtype: 'panelfilterrat',
    viewModel: {
        type: 'panelfilterrat'
    },
    layout: {
        type: 'hbox'
    },
    autoScroll: true,
    collapsible: true,
    split: true,
    title: 'Фильтры',
    glyph: 'xf0b0@FontAwesome',
    //controller: 'panelfilter',
    stateful: true,
    stateId: 'panelfilter',
    initComponent: function () {
        console.log('panelfilterrat view');

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
                title: 'Спорт',
                width: 250,
                margin: 2,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    enableKeyEvents: true,
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id'
                },
                items: [
                    tagSport
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