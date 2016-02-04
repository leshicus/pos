Ext.define('Office.view.timeline.FormTimelineV', {
    extend: 'Ext.form.Panel',
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
    listeners: {
        afterrender: 'onAfterRender'
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'formcard',
                controller: 'formtimeline',
                viewModel: {
                    data: {
                        theClient: this.getViewModel().getData().theClient
                    }
                },
                listeners: {
                    afterrender: Util.validate
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
                                    afterrender: 'onTypeRender',
                                    select: function (c, rec) {
                                        var form = this.up('formtimeline'),
                                            vm = form.getViewModel();
                                        vm.set('theStake.stake', '');
                                    }
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
                                },
                                maskRe: /^[0-9.]$/,
                                validator: function (val) { // * определяет соответствие минимальной и максимальной величине ТЛ
                                    var val = parseInt(val),
                                        form = this.up('formtimeline'),
                                        vm = form.getViewModel(),
                                        type = vm.get('theStake.type'),
                                        storeTimelinetype = vm.getStore('timelinetype'),
                                        recType = storeTimelinetype.findRecord('id', type, 0, false, true, true),
                                        typeName = recType.get('name'),
                                        minGame = parseInt(Util.getGlobalConst('MIN_SUM_TL_GAME')),
                                        minSport = parseInt(Util.getGlobalConst('MIN_SUM_TL_SPORT')),
                                        maxTL = parseInt(Util.getGlobalConst('LIMIT_FOR_TIMELINE'));
                                    if (typeName == 'Sport' && val < minSport) {
                                        return 'Минимальная сумма ТЛ Sport: ' + minSport;
                                    } else if (typeName == 'Game' && val < minGame) {
                                        return 'Минимальная сумма ТЛ Game: ' + minGame;
                                    }

                                    if (val > maxTL) {
                                        return 'Максимальная сумма ТЛ: ' + maxTL;
                                    }

                                    return true;
                                },
                                listeners: {
                                    specialkey: function (field, e) {
                                        if (e.getKey() == e.ENTER) {
                                            field.up('formtimeline').getController().onClickSave();
                                        }
                                    }
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