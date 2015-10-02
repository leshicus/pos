Ext.define('Office.view.timeline.FormTimelineV', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Office.view.card.FormCardV',
        'Office.view.timeline.GridSearchV',
        'Office.view.timeline.FormTimelineC',
        'Office.view.timeline.FormTimelineM',
        'Ext.layout.container.Card',
        'Ext.toolbar.Spacer'
    ],
    xtype: 'formtimeline',
    viewModel: {
        type: 'formtimeline'
    },
    controller: 'formtimeline',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    flex: 1,
    listeners: {},
    initComponent: function () {
        this.items = [
            {
                xtype: 'formcard',
                controller: 'formtimeline',
                viewModel: {
                    data: {
                        theClient: this.getViewModel().getData().theClient
                    }
                }
            },
            {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                flex: 1,
                items: [
                    {

                        xtype: 'fieldset',
                        title: 'Параметры ставки',
                        margin: 5,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'combobox',
                                name: 'type',
                                itemId: 'type',
                                emptyText: 'Тип',
                                queryMode: 'local',
                                displayField: 'name',
                                valueField: 'id',
                                editable: false,
                                allowBlank: false,
                                bind: {
                                    store: '{timelinetype}',
                                    value: '{theStake.type}'
                                },
                                listeners: {
                                    afterrender: 'onTypeRender'
                                }
                            },
                            {
                                xtype: 'textfield',
                                emptyText: 'Сумма',
                                allowBlank: false,
                                name: 'sum',
                                itemId: 'sum',
                                bind: {
                                    value: '{theStake.stake}'
                                }
                            }
                        ]
                    }
                ]
            }
        ]

        this.callParent();
    }
});