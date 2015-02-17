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
    layout: 'card',
    flex: 1,

    initComponent: function () {
        Utilities.initClassParams({
            scope: this,
            params: ['filters.term']
        });

        var textTerm = new Ext.form.field.Text({
            emptyText: 'Фамилия, имя, телефон, ID или паспорт',
            itemId: 'term',
            bind:'{filters.term}',
            _fireEventOnEnter:true,
            listeners: {
                specialkey: 'onEnter'
            }
        });

        Debug.setCardFio(this.getViewModel(), 'filters.term');

        this.items = [
            {
                id: 'card-1',
                width: '100%',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    margin: 5
                },
                items: [
                    textTerm,
                    {
                        xtype: 'gridsearch'
                    }
                ]
            },
            {
                id: 'card-2',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
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
                                        msgTarget: 'side',
                                        allowBlank: false,
                                        bind: {
                                            store: '{timelinetype}',
                                            value: '{theStake.type}'
                                        },
                                        listeners: {
                                            select: 'onTypeSelect'
                                        }
                                    },
                                    {
                                        xtype: 'textfield',
                                        emptyText: 'Сумма',
                                        msgTarget: 'side',
                                        allowBlank: false,
                                        name: 'sum',
                                        itemId: 'sum',
                                        bind: {
                                            value: '{theStake.stake}'
                                        }
                                    },
                                    {
                                        xtype: 'combobox',
                                        name: 'ttl',
                                        itemId: 'ttl',
                                        emptyText: 'Время жизни',
                                        allowBlank: false,
                                        queryMode: 'local',
                                        msgTarget: 'side',
                                        displayField: 'name',
                                        valueField: 'id',
                                        editable: false,
                                        bind: {
                                            store: '{lifetime}',
                                            value: '{theStake.count_days}'
                                        }
                                    }
                                ]
                            },
                            // * вертикальный spacer
                            {
                                xtype: "tbspacer",
                                flex: 1
                            },
                            {
                                xtype: 'button',
                                text: 'Назад',
                                action: 'back',
                                margin: '5 5 5 80',
                                glyph: Glyphs.get('arrow_left'),
                                scale: 'medium',
                                handler: 'onClickBack'
                            }
                        ]
                    }
                ]
            }
        ]

        this.callParent();
    }
});