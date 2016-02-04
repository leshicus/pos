Ext.define('Office.view.timeline.FormWithdrawV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Office.view.timeline.FormWithdrawC',
        'Ext.util.Observable'
    ],
    xtype: 'formwithdraw',
    controller: 'formwithdraw',
    layout: {
        type: 'hbox',
        //align: 'end'
    },
    defaults: {
        margin: 5
    },
    flex: 1,
    initComponent: function () {
        this.items = [
            {
                fieldLabel: 'Сумма',
                xtype: 'textfield',
                itemId: 'sum',
                allowBlank: false,
                //msgTarget: 'side',
                bind: {
                    value: '{to_pay}'
                },
                labelWidth: 70,
                listeners: {
                    render: 'registerClickEvent',
                    specialkey: 'onEnter',
                    afterrender: Util.validate
                },
                maskRe: /^[0-9.]$/,
                validator: function (val) { // * определяет корректность структуры введенного значения
                    var regex = /^\d+(\.\d+)?$/,
                        val = parseInt(val),
                        form = this.up('form'),
                        vm = form.getViewModel(),
                        balance = vm.get('balance'),
                        withdrawal = vm.get('withdrawal');

                    if (val <= 0)
                        return 'Число должно быть положительным';

                    if (withdrawal == 1) {// * снятие
                        if (val > balance)
                            return 'Сумма больше остатка на ТЛ';
                    } else if (withdrawal == 0) { // * пополнение
                        var minSum = parseInt(Util.getGlobalConst('MIN_TIMELINE_PAYIN_SUM'));
                        if (val < minSum)
                            return 'Минимальная сумма пополнения ТЛ: ' + minSum;

                        var maxTL = parseInt(Util.getGlobalConst('LIMIT_FOR_TIMELINE'));
                        if (val > maxTL)
                            return 'Максимальная сумма пополнения ТЛ: ' + maxTL;
                    }

                    if (!regex.test(val)) {
                        return 'Допустимо только число (разделитель - точка)';
                    } else {
                        return true;
                    }
                }
            },
            {
                xtype: 'button',
                bind: {
                    text: 'Вся сумма ({balance})',
                    hidden: '{!withdrawal}'
                },
                itemId: 'buttonBalance',
                glyph: Glyphs.get('plus'),
                handler: 'onClickButtonBalance'
            }
        ];

        this.callParent();
    }
});