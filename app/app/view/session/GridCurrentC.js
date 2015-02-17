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
                    console.log('refresh');
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
                            closable: false,
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
                            buttons: Utilities.getButtonsSaveCancel({
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
            me = this,
            callback = function (session, scope) {
                Ext.defer(function () {
                    var formstartsession = Ext.create('Office.view.session.FormStartSessionV'),
                        win = new Ext.window.Window({
                            title: 'Начать новую смену',
                            modal: true,
                            closable: false,
                            constrain: true,
                            width: 360,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                formstartsession
                            ],
                            buttons: Utilities.getButtonsSaveCancel({
                                scope: formstartsession.getController(),
                                textSave: 'Начать смену'
                            })
                        });
                    win.show();
                }, 10);
            };
        menumain.getController().loadSessionData(callback);
    },
    // * если указан handler, то вызывается он
    // * если указан listeners:onButtonClick и _handler, то вызывается _handler, но только если начата смена
    onButtonClick: function (button) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            funcName = button._handler,
            func = this[funcName];
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
                    closable: false,
                    constrain: true,
                    width: 360,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        forminputcash
                    ],
                    buttons: Utilities.getButtonsSaveCancel({
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
                            closable: false,
                            constrain: true,
                            width: 360,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                forminputcash
                            ],
                            buttons: Utilities.getButtonsSaveCancel({
                                scope: forminputcash.getController(),
                                textSave: 'Изъять сумму'
                            })
                        });
                    win.show();
                }, 10);
            };
        menumain.getController().loadSessionData(callback);
    }
});
