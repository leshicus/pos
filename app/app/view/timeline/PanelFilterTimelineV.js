Ext.define('Office.view.timeline.PanelFilterTimelineV', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Office.view.timeline.PanelFilterTimelineM',
        'Ext.form.field.Tag',
        'Ext.form.FieldSet'
    ],
    xtype: 'panelfiltertimeline',
    viewModel: {
        type: 'panelfiltertimeline'
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
    stateId: 'panelfiltertimeline',
    initComponent: function () {
        console.log('panelfilter view');

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