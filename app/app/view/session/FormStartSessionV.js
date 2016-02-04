Ext.define('Office.view.session.FormStartSessionV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Office.view.session.FormStartSessionC',
        'Office.view.session.GridCurrentM'
        //'Office.view.menumain.MenuMainM'
    ],
    xtype: 'formstartsession',
    controller: 'formstartsession',
    viewModel: {
        type: 'gridcurrent'
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        labelWidth: 150,
        margin: 5
    },
    listeners: {
        afterrender: 'onAfterRender'
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'datefield',
                itemId: 'open_time',
                fieldLabel: 'Время начала',
                value: new Date(),
                allowBlank: false,
                format: 'Y-m-d H:i:s'
            },
            {
                fieldLabel: 'ФИО кассира',
                xtype: 'textfield',
                itemId: 'operator_fullname',
                allowBlank: false,
                validator: function (val) {
                    //val = val.trim(); // * удаление пробелов по краям
                    //val = val.replace(/\s+/g, " "); // * удаление сдвоенных пробелов
                    //if (val.split(' ').length >= 3)
                    //    return true;
                    //else
                    //    return 'ФИО должно состоять не менее чем из трех слов';
                    var pp = /^[a-zA-Zа-яА-Я.]+ [a-zA-Zа-яА-Я.]+ [a-zA-Zа-яА-Я.]+$/;
                    if (val.match(pp)) {
                        return true;
                    } else
                        return 'ФИО должно состоять из трех слов';
                },
                bind: {
                    disabled: '{!showOperatorFio}'
                },
                listeners: {
                    specialkey: 'onEnter'
                }
            },
            {
                fieldLabel: 'Текущая сумма в кассе',
                xtype: 'displayfield',
                bind: '{theSession.currentSumInCash}'
            }
        ];

        this.callParent();
    }
});