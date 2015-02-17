Ext.define('Office.view.session.GridCloseSessionV', {
    extend: 'Ext.grid.property.Grid',
    requires: [
        //'Office.view.session.GridClosesessionM',
        'Office.view.session.GridCloseSessionC',
        'Office.view.menumain.MenuMainM'
    ],
    xtype: 'gridclosesession',
    viewModel: {
        type: 'menumain'
    },
    columnLines: true,
    //height: 600,
    //title: 'Смена',
    //frame: true,
    border: true,
    autoScroll: true,
    viewConfig: {
        stripeRows: true
    },
    controller: 'gridclosesession',
    /*glyph: Glyphs.get('clock'),
     cls: 'gridcard',*/
    sortableColumns: false,
    bind: {
        source: {
            sumAtOpenTime: '{theSession.sumAtOpenTime}',
            acceptedPerSession: '{theSession.acceptedPerSession}',
            paidPerSessionWithTLPOs: '{theSession.paidPerSessionWithTLPOs}',
            currentSumInCash: '{theSession.currentSumInCash}',
            cashMovementInput: '{theSession.cashMovementInput}',
            cashMovementOutputWithoutTL: '{theSession.cashMovementOutputWithoutTL}'
        }
    },
    listeners: {
        // * чтобы нельзя было редактировать ячейки
        beforeedit: {
            fn: function () {
                return false;
            }
        },
        // * ширина столбца Названий
        afterrender: function (grid) {
            grid.columns[0].setWidth(250);
        }
    },
    initComponent: function () {
        var vm = this.getViewModel(),
            menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel();

        vm.set('theSession', vmMenumain.getData().theSession);

        this.sourceConfig = {
            sumAtOpenTime: {
                displayName: 'Сумма в кассе на начало смены',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            acceptedPerSession: {
                displayName: 'Принято за смену',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            paidPerSessionWithTLPOs: {
                displayName: 'Выплачено за смену',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            currentSumInCash: {
                displayName: 'Текущая сумма в кассе',
                renderer: function (v) {
                    return '<b>' + Ext.util.Format.number(v,'0,0.00') + '</b>';
                }
            },
            cashMovementInput: {
                displayName: 'Внесено за смену',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            cashMovementOutputWithoutTL: {
                displayName: 'Изъято за смену',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            }
        };

        this.callParent();
    }
});