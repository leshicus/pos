Ext.define('Office.view.session.GridCurrentV', {
    extend: 'Ext.grid.property.Grid',
    requires: [
        'Office.view.session.GridCurrentC',
        'Office.view.session.GridCurrentM',
        'Office.view.menumain.MenuMainM'
    ],
    xtype: 'gridcurrent',
    viewModel:{
        type:'gridcurrent'
    },
    title: 'Смена',
    frame: true,
    border: true,
    autoScroll: true,
    viewConfig: {
        stripeRows: true
    },
    collapsible: true,
    controller: 'gridcurrent',
    /*glyph: Glyphs.get('clock'),
     cls: 'gridcard',*/
    sortableColumns: false,
    bind: {
        source: {
            sumAtOpenTime: '{theSession.sumAtOpenTime}',
            acceptedPerSession: '{theSession.acceptedPerSession}',
            acceptedPerSessionWithoutTL: '{theSession.acceptedPerSessionWithoutTL}',
            acceptedPerSessionForTL: '{theSession.acceptedPerSessionForTL}',
            paidPerSessionWithTLPOs: '{theSession.paidPerSessionWithTLPOs}',
            paidPerSession: '{theSession.paidPerSession}',
            cashMovementTLOutput: '{theSession.cashMovementTLOutput}',
            returnedPerSession: '{theSession.returnedPerSession}',
            administrativeBalance: '{theSession.administrativeBalance}',
            cashMovementInput: '{theSession.cashMovementInput}',
            cashMovementOutputWithoutTL: '{theSession.cashMovementOutputWithoutTL}',
            currentSumInCash: '{theSession.currentSumInCash}',
            balanceByBSO: '{theSession.balanceByBSO}',
            openDatetime: '{theSession.openDatetime}',
            closeDatetime: '{theSession.closeDatetime}',
            cachierFullname: '{theSession.cachierFullname}'
        }
    },
    listeners: {
        // * чтобы нельзя было редактировать ячейки
        beforeedit: {
            fn: function () {
                return false;
            }
        },
        // * адаптивная под содержание ширина столбца Названий
        afterrender: function (grid) {
            grid.columns[0].setWidth(250);

            // * проверяю, если данные не загрузились, то попробовать еще раз
            // * не знаю как по-другому
            var vm = this.getViewModel();
            if (!vm.getData().theSession) {
                Ext.defer(function () {
                    var menumain = Ext.ComponentQuery.query('menumain')[0],
                        vmMenumain = menumain.getViewModel();
                    vm.set('theSession', vmMenumain.getData().theSession);
                }, 500);
            }
        }
    },
    initComponent: function () {
        Utilities.initClassParams({
            scope: this,
            params: [
            ]
        });

        var menumain = Ext.ComponentQuery.query('menumain')[0];
        menumain.getController().loadSessionData();

        var toolbar_1 = new Ext.toolbar.Toolbar({
                items: [
                    {
                        text: 'Завершить смену',
                        _handler: 'onCloseSession', // * кастомный параметр
                        glyph: Glyphs.get('cancel'),
                        cls: 'cancel',
                        bind: {
                            disabled: '{isGlobalSession}'
                        },
                        listeners:{
                            click: 'onButtonClick'
                        }
                    },
                    {
                        text: 'Начать новую смену',
                        handler: 'onStartSession',
                        glyph: Glyphs.get('create'),
                        cls: 'plus',
                        bind: {
                            disabled: '{!isGlobalSession}'
                        }
                    },
                    {
                        text: 'Отчет по смене',
                        _handler: 'onPrintSession',
                        glyph: Glyphs.get('print'),
                        bind: {
                            disabled: '{isGlobalSession}'
                        },
                        listeners:{
                            click: 'onButtonClick'
                        }
                    }
                ]
            }),
            toolbar_2 = new Ext.toolbar.Toolbar({
                items: [
                    {
                        text: 'Расширенный отчет по смене',
                        _handler: 'onPrintSessionExtended',
                        glyph: Glyphs.get('print'),
                        bind: {
                            disabled: '{isGlobalSession}'
                        },
                        listeners:{
                            click: 'onButtonClick'
                        }
                    },
                    {
                        text: 'Внести',
                        _handler: 'onInputCash',
                        glyph: Glyphs.get('plus'),
                        cls: 'plus',
                        bind: {
                            disabled: '{isGlobalSession}'
                        },
                        listeners:{
                            click: 'onButtonClick'
                        }
                    },
                    {
                        text: 'Изъять',
                        _handler: 'onOutputCash',
                        glyph: Glyphs.get('minus'),
                        cls: 'cancel',
                        bind: {
                            disabled: '{isGlobalSession}'
                        },
                        listeners:{
                            click: 'onButtonClick'
                        }
                    }
                ]
            });

        this.tbar = new Ext.container.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [toolbar_1, toolbar_2]
        });

        this.sourceConfig = {
            sumAtOpenTime: {
                displayName: '1. Сумма в кассе на начало смены',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            acceptedPerSession: {
                displayName: '2. Принято за смену',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            acceptedPerSessionWithoutTL: {
                displayName: '&nbsp&nbsp 2.1. Спорт',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            acceptedPerSessionForTL: {
                displayName: '&nbsp&nbsp 2.2. ТЛ',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            paidPerSessionWithTLPOs: {
                displayName: '3. Выплачено за смену',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            paidPerSession: {
                displayName: '&nbsp&nbsp 3.1. Спорт',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            cashMovementTLOutput: {
                displayName: '&nbsp&nbsp 3.2. ТЛ',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            returnedPerSession: {
                displayName: '4. Возвращено',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            administrativeBalance: {
                displayName: '5. Баланс',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            cashMovementInput: {
                displayName: '6. Внесено денег за смену',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            cashMovementOutputWithoutTL: {
                displayName: '7. Изъято денег за смену',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            currentSumInCash: {
                displayName: '8. Текущая сумма в кассе',
                renderer: function (v) {
                    return '<b>' + Ext.util.Format.number(v, '0,0.00') + '</b>';
                }
            },
            balanceByBSO: {
                displayName: '9. Учет по БСО',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            openDatetime: {
                displayName: 'Смена начата'
            },
            closeDatetime: {
                displayName: 'Смена завершена'
            },
            cachierFullname: {
                displayName: 'Кассир'
            }
        };

        this.tools = [
            {
                type: 'refresh',
                tooltip: 'Обновить'
            }
        ]

        this.callParent();
    }
});