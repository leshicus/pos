Ext.define('Office.view.session.GridCurrentV', {
    extend: 'Ext.grid.property.Grid',
    requires: [
        'Office.view.session.GridCurrentC',
        'Office.view.session.GridCurrentM',
        'Office.view.menumain.MenuMainM'
    ],
    xtype: 'gridcurrent',
    viewModel: {
        type: 'gridcurrent'
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
    sortableColumns: false,
    bind: {
        source: {
            sumAtOpenTime: '{theSession.sumAtOpenTime}',
            acceptedPerSession: '{theSession.acceptedPerSession}',

            acceptedPerSessionWithoutTL: '{theSession.acceptedPerSessionWithoutTL}',
            acceptedPerSessionForTL: '{theSession.acceptedPerSessionForTL}',

            sessionAcceptedPerSessionWithoutAccounts: '{theSession.acceptedPerSessionWithoutAccounts}',
            sessionAcceptedPerSessionForAccounts: '{theSession.acceptedPerSessionForAccounts}',

            paidPerSessionWithTLPOs: '{theSession.paidPerSessionWithTLPOs}',
            paidPerSession: '{theSession.paidPerSession}',
            cashMovementTLOutput: '{theSession.cashMovementTLOutput}',

            sessionPaidPerSession: '{theSession.paidPerSession}',
            sessionPaidPerSessionWithoutAccounts: '{theSession.paidPerSessionWithoutAccounts}',
            sessionPaidPerSessionForAccounts: '{theSession.paidPerSessionForAccounts}',

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
        afterrender: 'onAfterrender'
    },
    // * если use_ndfl=true, то скрывать эти поля
    _use_ndfl_hideProperties:[
        "sessionAcceptedPerSessionWithoutAccounts",
        "sessionAcceptedPerSessionForAccounts",
        "sessionPaidPerSession",
        "sessionPaidPerSessionWithoutAccounts",
        "sessionPaidPerSessionForAccounts"
    ],
    // * если use_ndfl=false, то скрывать эти поля
    _use_ndfl_showProperties:[
        "acceptedPerSessionWithoutTL",
        "acceptedPerSessionForTL",
        "paidPerSessionWithTLPOs",
        "paidPerSession",
        "cashMovementTLOutput",
        "cachierFullname",
        'balanceByBSO'
    ],

    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: []
        });

        //var menumain = Ext.ComponentQuery.query('menumain')[0];
        //menumain.getController().loadSessionData();

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
                        listeners: {
                            click: 'onButtonClick'
                        },
                        disabled:true
                    },
                    {
                        text: 'Начать новую смену',
                        handler: 'onStartSession',
                        glyph: Glyphs.get('create'),
                        cls: 'plus',
                        bind: {
                            disabled: '{!isGlobalSession}'
                        },
                        disabled:true
                    },
                    {
                        text: 'Отчет по смене',
                        _handler: 'onPrintSession',
                        glyph: Glyphs.get('print'),
                        bind: {
                            disabled: '{isGlobalSession}'
                        },
                        listeners: {
                            click: 'onButtonClick'
                        },
                        disabled:true
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
                        listeners: {
                            click: 'onButtonClick'
                        },
                        disabled:true
                    },
                    {
                        text: 'Внести',
                        _handler: 'onInputCash',
                        glyph: Glyphs.get('plus'),
                        cls: 'plus',
                        bind: {
                            disabled: '{isGlobalSession}'
                        },
                        listeners: {
                            click: 'onButtonClick'
                        },
                        disabled:true
                    },
                    {
                        text: 'Изъять',
                        _handler: 'onOutputCash',
                        glyph: Glyphs.get('minus'),
                        cls: 'cancel',
                        bind: {
                            disabled: '{isGlobalSession}'
                        },
                        listeners: {
                            click: 'onButtonClick'
                        },
                        disabled:true
                    }
                ]
            });

        this.tbar = new Ext.container.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                toolbar_1,
                toolbar_2
            ]
        });

        this.sourceConfig = {
            sumAtOpenTime: {
                id: 'sumAtOpenTime',
                displayName: '1. Сумма в кассе на начало смены',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            acceptedPerSession: {
                id: 'acceptedPerSession',
                displayName: '2. Принято за смену',
                hidden: true,
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            /* use ndfl*/
            acceptedPerSessionWithoutTL: {
                id: 'acceptedPerSessionWithoutTL',
                displayName: '&nbsp&nbsp 2.1. Спорт',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            acceptedPerSessionForTL: {
                id: 'acceptedPerSessionForTL',
                displayName: '&nbsp&nbsp 2.2. ТЛ',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            /* --------- */
            /* not use ndfl*/
            sessionAcceptedPerSessionWithoutAccounts: {
                id: 'sessionAcceptedPerSessionWithoutAccounts',
                displayName: '&nbsp&nbsp 2.1. Спорт',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            sessionAcceptedPerSessionForAccounts: {
                id: 'sessionAcceptedPerSessionForAccounts',
                displayName: '&nbsp&nbsp 2.2. Счет',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            /* --------- */
            /* use ndfl*/
            paidPerSessionWithTLPOs: {
                id: 'paidPerSessionWithTLPOs',
                displayName: '3. Выплачено за смену',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            paidPerSession: {
                id: 'paidPerSession',
                displayName: '&nbsp&nbsp 3.1. Спорт',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            cashMovementTLOutput: {
                id: 'cashMovementTLOutput',
                displayName: '&nbsp&nbsp 3.2. ТЛ',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            /* --------- */
            /* not use ndfl*/
            sessionPaidPerSession: {
                id: 'sessionPaidPerSession',
                displayName: '3. Выплачено за смену',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            sessionPaidPerSessionWithoutAccounts: {
                id: 'sessionPaidPerSessionWithoutAccounts',
                displayName: '&nbsp&nbsp 3.1. Спорт',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            sessionPaidPerSessionForAccounts: {
                id: 'sessionPaidPerSessionForAccounts',
                displayName: '&nbsp&nbsp 3.2. Счет',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            /* --------- */
            returnedPerSession: {
                id: 'returnedPerSession',
                displayName: '4. Возвращено',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            administrativeBalance: {
                id: 'administrativeBalance',
                displayName: '5. Баланс',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            cashMovementInput: {
                id: 'cashMovementInput',
                displayName: '6. Внесено денег за смену',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            cashMovementOutputWithoutTL: {
                id: 'cashMovementOutputWithoutTL',
                displayName: '7. Изъято денег за смену',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            currentSumInCash: {
                id: 'currentSumInCash',
                displayName: '8. Текущая сумма в кассе',
                renderer: function (v) {
                    return '<b>' + Ext.util.Format.number(v, '0,0.00') + '</b>';
                }
            },
            balanceByBSO: {
                id: 'balanceByBSO',
                displayName: '9. Учет по БСО',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            openDatetime: {
                id: 'openDatetime',
                displayName: 'Смена начата'
            },
            closeDatetime: {
                id: 'closeDatetime',
                displayName: 'Смена завершена'
            },
            cachierFullname: {
                id: 'cachierFullname',
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