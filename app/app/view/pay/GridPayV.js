Ext.define('Office.view.pay.GridPayV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.pay.GridPayM',
        'Office.view.pay.GridPayC'
    ],
    xtype: 'gridpay',
    viewModel: {
        type: 'gridpay'
    },
    controller: 'gridpay',
    columnLines: true,
    flex: 1,
    title: 'Выплаты',
    frame: true,
    viewConfig: {
        stripeRows: true
    },
    bind: '{pay}',
    glyph: Glyphs.get('dollar'),
    cls: 'gridpay',
    listeners: {
        celldblclick: 'onCelldblclick'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'slipRawValue'
            ]
        });

        var slipId = Ext.create('Ext.form.field.Text', {
            emptyText: 'Номер квитанции',
            //margin: '0 0 0 15',
            //itemId: 'slipIdField',
            enableKeyEvents: true,
            _fireEventOnEnter: true,
            itemId: 'slipId',
            bind: '{slipRawValue}',
            selectOnFocus: true,
            //в штрихкоде стоит символ x, данный регэксп учитывает все возможности написания - русская буква х, англ буква х, русская ч
            regex: /^[0-9]+[xхчХЧX]?[0-9]+$/,
            maskRe: /[0-9xхчХЧX]+$/,
            listeners: {
                specialkey: 'onEnter',
                render: 'focusSlipId'
            },
            triggers: {// * значек лупы
                one: {
                    cls: 'x-form-search-trigger',
                    handler:'onPressLoupe'
                }
            }
        });


        // * определяет состав параметров, наименование и порядок полей для отображения
        // * нижнее подчеркивание _параметр означает, что этот параметр введен мной и ему не соответствует напрямую ни один входной параметр json
        // * может быть либо рассчетным, либо просто вспомогательным текстом, типа заголовка
        this.getViewModel().set('pattern', {
            operation: 'Тип ставки',
            stake: 'Сумма ставки',
            coefficient: 'Коэффициент',
            _ndfl: 'НДФЛ',
            _status: 'Статус',
            _to_pay_all: 'Всего к выплате',

            _event: '',

            _gambler: '<b><font color="#157FCC">ИГРОК:</font></b>',
            _fio: 'ФИО',
            _resident: 'Гражданство',
            passport_number: 'Паспорт'
        });

        //Debug.setGridPaySlipId(slipId, 'slipId');

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false
            },
            items: [
                {
                    text: 'Параметр',
                    dataIndex: 'param',
                    itemId: 'param',
                    width: 150,
                    cls: 'wrapText'
                },
                {
                    text: 'Значение',
                    dataIndex: 'value',
                    itemId: 'value',
                    //flex: 1,
                    cls: 'wrapText',
                    width: 250,
                    renderer: function (val) {
                        switch (val) {
                            case 'ставка выиграла':
                                return '<b><font color="green">' + val + '</font></b>';
                                break;
                            case 'ставка проиграла':
                                return '<b><font color="red">' + val + '</font></b>';
                                break;
                            case 'ставка не рассчитана':
                                return '<b><font color="graytext">' + val + '</font></b>';
                                break;
                            default:
                                return val;
                                break;
                        }
                    }
                },
                {
                    text: 'Событие',
                    dataIndex: 'event',
                    itemId: 'event',
                    //flex: 1,
                    itemCls: 'wrapText',
                    width: 250
                },
                {
                    text: 'Коэфф.',
                    dataIndex: 'coeff',
                    itemId: 'coeff',
                    width: 90
                },
                {
                    text: 'Результат',
                    dataIndex: 'result',
                    itemId: 'result',
                    width: 100
                },
                {
                    text: 'Счет',
                    dataIndex: 'score',
                    itemId: 'score',
                    width: 100,
                    cls: 'wrapText'
                }
            ]
        };
        this.tbar = [
            slipId,
            {
                xtype: 'button',
                text: 'Повторная печать чека',
                handler: 'onButtonPrintBill',
                itemId: 'buttonPrintBill',
                disabled: true,
                glyph: Glyphs.get('print'),
                cls: 'print'
            }
        ];
        this.bbar = [
            {
                xtype: 'toolbar',
                //layout:'hbox',
                itemId: 'buttonsMake',
                // hidden: true,
                items: [
                    {
                        xtype: 'button',
                        text: 'Выплатить с чеком',
                        handler: 'onButtonMakeBill',
                        //itemId: 'buttonMake',
                        id: 'buttonPayWithPrint',
                        glyph: Glyphs.get('print'),
                        bind: {
                            disabled: '{!get_showMakeButtonCheck}'
                        },
                        cls: 'print'
                    },
                    {
                        xtype: 'button',
                        text: 'Выплатить без чека',
                        handler: 'onButtonMake',
                        id: 'buttonPayWithoutPrint',
                        //itemId: 'buttonMake',
                        glyph: Glyphs.get('dollar'),
                        bind: {
                            disabled: '{!get_showMakeButtons}'
                        },
                        cls: 'plus'
                    }
                ]
            }

        ];
        this.tools = [
            {
                type: 'close',
                tooltip: 'Очистить'
            }
        ]
        this.callParent();
    }
});