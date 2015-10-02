Ext.define('Office.view.session.GridPaySlipC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.session.GridDetailTLV',
        'Office.view.session.GridDetailPlayerAccountsV'
    ],
    alias: 'controller.gridpayslip',
    listen: {
        component: {
            '#': {}

        },
        store: {}
    },
// * загрузка данных о ставках к выплате (Смены)
    loadPaySlipData: function () {
        var gridpayslip = this.getView(),
            dateTo = Ext.Date.format(new Date(), 'Y-m-d'),
            dateFrom = new Date();

        // * получаем первое число месяца
        dateFrom.setDate(dateFrom.getDate() - 30);
        dateFrom = Ext.Date.format(dateFrom, 'Y-m-d');

        var objUrl = {
            class: 'Pos_Sessions_Fillcashreport',
            params: {
                dateFrom: dateFrom,
                dateTo: dateTo
            }
        };

        // * не понимаю, почему здесь ругается, что типа ф-ия mask не существует
        if (gridpayslip && gridpayslip.mask === 'function') {
            gridpayslip.mask('Загружаем...');
        }

        Ext.defer(function () {
            Ext.Ajax.request({
                url: Server.getUrl(objUrl),
                success: function (response) {
                    if (gridpayslip && gridpayslip.mask === 'function') {
                        gridpayslip.unmask();
                    }
                    var payslip = Ext.decode(response.responseText);
                    if (typeof payslip.success != 'undefined') {
                        Util.toast('Внимание', 'Данные по ставкам к выплате не загружены');
                    } else {
                        Ext.defer(function () {   // * иногда не успевает создаться
                            if (gridpayslip.getViewModel())
                                gridpayslip.getViewModel().set({thePaySlip: payslip});
                        }, 100, this);
                    }
                },
                failure: function (response) {
                    if (gridpayslip) {
                        gridpayslip.unmask();
                    }
                    Util.toast('Внимание', 'Не загружены данные о ставках к выплате: ошибка сервера');
                },
                method: 'POST',
                scope: this
            });
        }, 10);

    },
    onClickCancel: function (button) {
        var window = button.up('window');
        window.close();
    },
    onDetailsTL: function (btn) {
        var objUrl = {
            class: 'Pos_Sessions_Getavgdataofcurrentsession'
        };
        Ext.Ajax.request({
            url: Server.getUrl(objUrl),
            success: function (response) {
                var o = Ext.decode(response.responseText),
                    countSubTransaction = o.countSubTransaction,
                    countTL = o.countTL,
                    sessionId = o.sessionId,
                    sumAllSubTransaction = o.sumAllSubTransaction,
                    griddetailtl = Ext.create('Office.view.session.GridDetailTLV', {
                        margin: 0
                    }),
                    win = new Ext.window.Window({
                        title: 'Детали по изъятию таймлайн',
                        modal: true,
                        constrain: true,
                        glyph: Glyphs.get('list'),
                        cls: 'detail',
                        width: 280,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            margin: '0 5 5 5',
                            labelWidth: 200
                        },
                        items: [
                            griddetailtl,
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Смена',
                                value: o.sessionId
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Количество частичных снятий',
                                value: o.countSubTransaction
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Сумма снятий',
                                value: o.sumAllSubTransaction
                            }
                        ],
                        buttons: Util.getButtonCancel({
                            textCancel: 'Закрыть',
                            scope: this
                        })
                    });
                win.show();
            },
            failure: function (response) {
                Ext.toast({
                    html: 'Не загружены данные о смене: ошибка сервера',
                    title: 'Внимание',
                    width: 200,
                    align: 't'
                })
            },
            method: 'POST',
            scope: this
        });
    },
    onDetailsAccounts: function (btn) {
        var objUrl = {
            class: 'Pos_Sessions_Getavgdataofcurrentsession'
        };
        Ext.Ajax.request({
            url: Server.getUrl(objUrl),
            success: function (response) {
                var o = Ext.decode(response.responseText),
                    countSubTransaction = o.countSubTransaction,
                    countTL = o.countTL,
                    sessionId = o.sessionId,
                    sumAllSubTransaction = o.sumAllSubTransaction,
                    griddetailplayeraccounts = Ext.create('Office.view.session.GridDetailPlayerAccountsV', {
                        margin: 0
                    }),
                    win = new Ext.window.Window({
                        title: 'Детали по игровым счетам',
                        modal: true,
                        closable: false,
                        glyph: Glyphs.get('list'),
                        cls: 'detail',
                        width: 550,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        defaults: {
                            margin: '0 5 5 5',
                            labelWidth: 200
                        },
                        items: [
                            griddetailplayeraccounts,
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Смена',
                                value: o.sessionId
                            },
                            {
                                xtype: 'displayfield',
                                id: 'countOperation',
                                fieldLabel: 'Количество операций',
                                value: o.countSubTransaction
                            },
                            {
                                xtype: 'displayfield',
                                id: 'totalSum',
                                fieldLabel: 'Сумма (общая)',
                                value: o.sumAllSubTransaction
                            }
                        ],
                        buttons: Util.getButtonCancel({
                            textCancel: 'Закрыть',
                            scope: this
                        })
                    });
                win.show();
            },
            failure: function (response) {
                Ext.toast({
                    html: 'Не загружены данные о смене: ошибка сервера',
                    title: 'Внимание',
                    width: 200,
                    align: 't'
                })
            },
            method: 'POST',
            scope: this
        });
    }
});
