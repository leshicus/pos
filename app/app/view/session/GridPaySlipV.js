Ext.define('Office.view.session.GridPaySlipV', {
    extend: 'Ext.grid.property.Grid',
    requires: [
        'Office.view.session.GridPaySlipC',
        'Office.view.menumain.MenuMainM'
    ],
    xtype: 'gridpayslip',
    viewModel: {
        type: 'menumain'
    },
    title: 'Данные по ставкам к выплате',
    frame: true,
    border: true,
    autoScroll: true,
    viewConfig: {
        stripeRows: true
    },
    controller: 'gridpayslip',
    /*glyph: Glyphs.get('card'),
     cls: 'gridcard',*/
    sortableColumns: false,
    collapsible: true,
    bind: {
        source: {
            slipToOutpay: '{thePaySlip.slipToOutpay}',
            sumToOutpay: '{thePaySlip.sumToOutpay}',
            countTimelines: '{thePaySlip.countTimelines}',
            sumTimelines: '{thePaySlip.sumTimelines}'
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
            grid.columns[1].setWidth(120);
        }
    },
    initComponent: function () {
        var vm = this.getViewModel(),
            menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel();
        Utilities.initClassParams({
            scope: this,
            params: []
        });
        vm.set('thePaySlip', vmMenumain.getData().thePaySlip);


        this.getController().loadPaySlipData();

        this.sourceConfig = {
            slipToOutpay: {
                displayName: 'Ставок к выплате'
            },
            sumToOutpay: {
                displayName: 'Данные по ставкам к выплате',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            },
            countTimelines: {
                displayName: 'Таймлайнов'
            },
            sumTimelines: {
                displayName: 'Сумма по таймлайнам',
                renderer: Ext.util.Format.numberRenderer('0,0.00')
            }
        };

        this.tbar = {
            items: [
                {
                    text: 'Детали по изъятию ТЛ',
                    handler: 'onDetailsTL',
                    glyph: Glyphs.get('list'),
                    cls: 'detail'
                    //itemId: 'startSession'
                }
            ]
        };

        this.callParent();
    }
});