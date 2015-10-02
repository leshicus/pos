Ext.define('Office.view.session.GridCurrentC', {
    extend: 'Ext.app.ViewController',
    requires: [
        //'Office.view.current.contextmenu.MenuCurrentV'
        'Office.view.session.GridCloseSessionV',
        'Office.view.session.FormStartSessionV',
        'Office.view.session.FormInputCashV'
    ],
    alias: 'controller.gridcurrent',
    listen: {
        component: {
            '#': {},
            'tool[type=refresh]': {
                click: function (tool) {
                    /*  var mainController = Office.app.getController('Main'),
                     gridcurrent = this.getView(),
                     gridpayslip = gridcurrent.up('container').down('gridpayslip'),
                     gridlastsession = gridcurrent.up('container').up('container').down('gridlastsession'),
                     gridpayslipController = gridpayslip.getController(),
                     callback = function (session) {
                     Ext.defer(function () {
                     gridcurrent.getViewModel().set({
                     theSession: session
                     });
                     }, 10);
                     };
                     gridpayslipController.loadPaySlipData();
                     mainController.loadSessionData(callback);
                     gridlastsession.store.load();*/

                    this.reloadGrids();
                }
            }

        },
        store: {}
    },

    onAfterrender: function (grid) {
        grid.columns[0].setWidth(250);

        // * проверяю, если данные не загрузились, то попробовать еще раз
        // * не знаю как по-другому
        //var vm = grid.getViewModel();
        //if (!vm.getData().theSession) {
        //    Ext.defer(function () {
        //        var menumain = Ext.ComponentQuery.query('menumain')[0],
        //            vmMenumain = menumain.getViewModel(),
        //            vm = grid.getViewModel();
        //        if (vm)
        //            vm.set('theSession', vmMenumain.getData().theSession);
        //    }, 2000);
        //}
        //
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel();

        menumain.getController().loadSessionData();

        //if(vmMenumain.get('globals').use_ndfl)
        //{
        //    this.hiddenProperties = ["sessionAcceptedPerSessionWithoutAccounts",
        //        "sessionAcceptedPerSessionForAccounts",
        //        "sessionPaidPerSession",
        //        "sessionPaidPerSessionWithoutAccounts",
        //        "sessionPaidPerSessionForAccounts"];
        //}
        //else
        //{
        //    this.hiddenProperties = ["acceptedPerSessionWithoutTL",
        //        "acceptedPerSessionForTL",
        //        "paidPerSessionWithTLPOs",
        //        "paidPerSession",
        //        "cashMovementTLOutput",
        //        "cachierFullname"];
        //}
        grid.store.filterBy(menumain.getController().filterGridCurrent, this);
        // grid.getView().refresh();
    },

    // * отчет по смене
    onPrintSession: function () {
        var objUrl = {
            class: 'Pos_Sessions_Print',
            params: {
                id: 'last',
                extended: false
            }
        };
        window.open(Server.getUrl(objUrl), '_blank');
    },

    // * Расширенный отчет по смене
    onPrintSessionExtended: function () {
        var objUrl = {
            class: 'Pos_Sessions_Print',
            params: {
                id: 'last',
                extended: true
            }
        };
        window.open(Server.getUrl(objUrl), '_blank');
    },

    // * обновить значения во всех гридах
    reloadGrids: function () {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            gridcurrent = Ext.ComponentQuery.query('gridcurrent')[0],
            gridpayslip = Ext.ComponentQuery.query('gridpayslip')[0],
            gridlastsession = Ext.ComponentQuery.query('gridlastsession')[0],
            callback = function (session) {
                //Ext.defer(function () {
                gridcurrent.getViewModel().set({
                    theSession: session
                });
                //gridcurrent.getViewModel().notify();
                //}, 10);
            };

        gridpayslip.getController().loadPaySlipData();
        //console.info('reloadGrids');
        menumain.getController().loadSessionData(callback);
        //gridlastsession.store.load();
        gridlastsession.getViewModel().getStore('lastsession').load();
    },

    // * завершить смену
    onCloseSession: function (btn) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            me = this,
            callback = function (session, scope) {
                Ext.defer(function () {
                    var gridclosesession = Ext.create('Office.view.session.GridCloseSessionV'),
                        win = new Ext.window.Window({
                            title: 'Завершение смены',
                            modal: true,
                            constrain: true,
                            width: 360,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                gridclosesession,
                                {
                                    xtype: 'datefield',
                                    itemId: 'close_time',
                                    fieldLabel: 'Время завершения',
                                    value: new Date(),
                                    margin: '5 0 5 5',
                                    labelWidth: 120,
                                    allowBlank: false,
                                    format: 'Y-m-d H:i:s'
                                }
                            ],
                            buttons: Util.getButtonsSaveCancel({
                                scope: gridclosesession.getController(),
                                textSave: 'Завешить смену'
                            })
                        });
                    win.show();
                }, 10);
            };

        menumain.getController().loadSessionData(callback); // * сначала всегда обновляем данные по сессии
    },

    // * начать смену
    onStartSession: function (btn) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            theSession = menumain.getViewModel().get('theSession'),
            me = this,
            callback = function (session, scope) {
                Ext.defer(function () {
                    var formstartsession = Ext.create('Office.view.session.FormStartSessionV', {
                            viewModel: {
                                data: {
                                    theSession: theSession
                                }
                            }
                        }),
                        win = new Ext.window.Window({
                            title: 'Начать новую смену',
                            modal: true,
                            constrain: true,
                            width: 360,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                formstartsession
                            ],
                            buttons: Util.getButtonsSaveCancel({
                                scope: formstartsession.getController(),
                                textSave: 'Начать смену'
                            })
                        });
                    win.show();
                }, 10);
            };
        //console.info('onStartSession');
        menumain.getController().loadSessionData(callback);
    },

    // * если указан handler, то вызывается он
    // * если указан listeners:onButtonClick и _handler, то вызывается _handler, но только если начата смена
    onButtonClick: function (button) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            funcName = button._handler,
            func = this[funcName];
        //console.info('onButtonClick');
        menumain.getController().loadSessionData(func, button);
    },
    // * внести
    onInputCash: function (btn) {
        Ext.defer(function () {
            var forminputcash = Ext.create('Office.view.session.FormInputCashV', {
                    _type: 'input' // * чтобы различать в контроллере внесение и изъятие
                }),
                win = new Ext.window.Window({
                    title: 'Внести',
                    modal: true,
                    constrain: true,
                    width: 360,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        forminputcash
                    ],
                    buttons: Util.getButtonsSaveCancel({
                        scope: forminputcash.getController(),
                        textSave: 'Внести сумму'
                    })
                });
            win.show();
        }, 100);
    },
    // * изъять
    onOutputCash: function (btn) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            me = this,
            callback = function (session, scope) {
                Ext.defer(function () {
                    var forminputcash = Ext.create('Office.view.session.FormInputCashV', {
                            _type: 'output'
                        }),
                        win = new Ext.window.Window({
                            title: 'Изъять',
                            modal: true,
                            constrain: true,
                            width: 360,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                forminputcash
                            ],
                            buttons: Util.getButtonsSaveCancel({
                                scope: forminputcash.getController(),
                                textSave: 'Изъять сумму'
                            })
                        });
                    win.show();
                }, 10);
            };
        //console.info(onOutputCash);
        menumain.getController().loadSessionData(callback);
    }
});
