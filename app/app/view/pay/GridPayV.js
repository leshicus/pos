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
    //flex: 1,
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
        //specialkey: 'onEnter',
        //scope: 'controller'
    },
    initComponent: function () {
        Utilities.initClassParams({
            scope: this,
            params: [
                'filters.slipId',
                'filters.code'
            ]
        });

        var slipId = Ext.create('Ext.form.field.Text', {
            emptyText: 'Номер квитанции',
            //margin: '0 0 0 15',
            enableKeyEvents: true,
            _fireEventOnEnter: true,
            itemId: 'slipId',
            bind:'{filters.slipId}',
            listeners: {
                specialkey: 'onEnter'
            },
            triggers: {// * значек лупы
                one: {
                    cls: 'x-form-search-trigger'
                }
            }
        })/*,
         buttonMake = Ext.create('Ext.button.Button', {
         text: 'Провести',
         handler: 'onButtonMake',
         itemId:'buttonMake',
         disabled:true
         })*/;



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
                text: 'Печать чека',
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
                hidden: true,
                items: [
                    {
                        xtype: 'button',
                        text: 'Выплатить с чеком',
                        handler: 'onButtonMakeBill',
                        //itemId: 'buttonMake',
                        glyph: Glyphs.get('print'),
                        cls: 'print'
                    },
                    {
                        xtype: 'button',
                        text: 'Выплатить без чека',
                        handler: 'onButtonMake',
                        //itemId: 'buttonMake',
                        glyph: Glyphs.get('dollar'),
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