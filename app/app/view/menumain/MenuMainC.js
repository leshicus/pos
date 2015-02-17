Ext.define('Office.view.menumain.MenuMainC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.session.GridCurrentV',
        'Office.view.session.GridLastSessionV',
        'Office.view.session.GridPaySlipV',
        'Office.view.session.FormPrintLineV',

        'Office.view.pay.GridPayV',

        'Office.view.accept.GridAcceptV',

        'Office.view.timeline.GridTimelineV',
        'Office.view.timeline.GridSlipV',

        'Office.view.rat.GridRatV',

        'Office.view.gameacc.GridGameAccV',
        'Office.view.gameacc.GridGameActionV',

        'Office.view.card.GridCardV',
        'Office.view.card.GridCardM',
        'Office.view.card.FormCardV',

        'Office.view.common.GridSummaryV',

        'Office.view.panels.GridPanelsV',
        'Office.view.panels.GridParamV',

        'Office.view.virtual.GridVirtualV',

        'Office.view.chat.GridChatGroupV',
        'Office.view.chat.GridChatUserV',
        'Office.view.chat.GridChatMesV',
        'Office.view.chat.FormMessageV',

        'Ext.window.MessageBox',
        'Ext.layout.container.Border'
    ],
    alias: 'controller.menumain',

    listen: {
        controller: {
            '#': {
                /* afterrender: function (menumain) {
                 console.info(arguments);
                 var session = menumain.down('#session');
                 if (session)
                 session.fireEvent('click');
                 }*/
            }
        }
    },

    control: {},
    // * загрузка данных о смене (Смены)
    loadSessionData: function (callback, btn) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            objUrl = {
                class: 'Pos_Sessions_Lastsessioninfo'
            };
        Ext.defer(function () { // * без задержки иногда ругается, что стор какой-то не загружен
            Ext.Ajax.request({
                url: Server.getUrl(objUrl),
                success: function (response) {
                    console.info('successSession');
                    var session = Ext.decode(response.responseText);
                    if (typeof session.success != 'undefined') {
                        var mainController = Office.app.getController('Main');
                        mainController.confirmLogoutMessage(session);
                    } else {
                        vm.set({theSession: session});
                        // * сообщить компонентам, которые используют данные о сессии, что данные изменились, и нужно обновиться
                        vm.notify(); // * без этого данные в гриде gridcurrent не обновляются, он типа не знает, что в vm что-то изменилось
                        // * запустить какую-либо ф-ию после обновления данных по сессии
                        if (callback) {
                            // * если указана кнопка как параметр
                            if (btn) {
                                if (!btn.disabled) {
                                    callback(btn);
                                } else {
                                    Utilities.toast('Ошибка', 'Смена закрыта. Начните новую смену.');
                                }
                            } else
                                callback(session);
                        }
                    }
                },
                failure: function (response) {
                    console.info('failureSession');
                    Utilities.toast('Внимание', 'Не загружены данные о смене: ошибка сервера');
                },
                method: 'POST',
                scope: this
            });
        }, 10);
    },
    onClickMenumain: function (item) {
        var menumain = this.getView(),
            bottomMenumain = menumain.down('#bottomMenumain'),
            menumainVM = menumain.getViewModel(),
            globals = menumainVM.getData().globals,
            me = this;
        switch (item.getItemId()) {
            case 'session':
                var gridcurrent = Ext.create('Office.view.session.GridCurrentV', {
                        margin: '10 0 0 0',
                        width: 450
                    }),
                    gridpayslip = Ext.create('Office.view.session.GridPaySlipV'),
                    formprintline = Ext.create('Office.view.session.FormPrintLineV', {
                        margin: '15 0 0 0'
                    }),
                    gridlastsession = Ext.create('Office.view.session.GridLastSessionV', {
                        margin: '15 0 0 0'
                    }),
                    container_2 = Ext.create('Ext.container.Container', {
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        width: 370,
                        margin: '10 0 0 15',
                        items: [gridpayslip, formprintline]
                    }),
                    container_1 = Ext.create('Ext.container.Container', {
                        layout: {
                            type: 'hbox'
                            //align: 'stretch'
                        },
                        items: [gridcurrent, container_2]
                    }),
                    container = Ext.create('Ext.container.Container', {
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        autoScroll: true,
                        flex: 1,
                        items: [container_1, gridlastsession]
                    });
                try {
                    menumain.removeAll(true);
                    menumain.add(container);
                } catch (e) {
                    Ext.Msg.alert('Ошибка', e.message);
                }
                break;
            case 'fill':
                var panel = Ext.create('Office.view.fill.FillV', {
                    margin: '10 0 0 0'
                });
                try {
                    menumain.removeAll(true);
                    menumain.add(panel);
                } catch (e) {
                    Ext.Msg.alert('Ошибка', e.message);
                }
                break;
            case 'timeline':
                var gridTimeline = Ext.create('Office.view.timeline.GridTimelineV', {
                        margin: '10 0 0 0'
                    }),
                    gridSlip = Ext.create('Office.view.timeline.GridSlipV');
                try {
                    menumain.removeAll(true);
                    menumain.add(gridTimeline);
                    menumain.add(gridSlip);
                } catch (e) {
                    Ext.Msg.alert('Ошибка', e.message);
                }
                break;
            case 'accept':
                var grid = Ext.create('Office.view.accept.GridAcceptV', {
                    region: 'center',
                    margin: '10 0 0 0'
                });
                try {
                    menumain.removeAll(true);
                    menumain.add(grid);
                } catch (e) {
                    Ext.Msg.alert('Ошибка', e.message);
                }
                break;
            case 'card':
                var grid = Ext.create('Office.view.card.GridCardV', {
                    margin: '10 0 0 0'
                });
                try {
                    menumain.removeAll(true);
                    menumain.add(grid);
                } catch (e) {
                    Ext.Msg.alert('Ошибка', e.message);
                }
                break;
            case 'pay':
                var grid = Ext.create('Office.view.pay.GridPayV', {
                    margin: '10 0 0 0'
                });
                try {
                    menumain.removeAll(true);
                    menumain.add(grid);
                } catch (e) {
                    Ext.Msg.alert('Ошибка', e.message);
                }
                break;
            case 'rat':
                var grid = Ext.create('Office.view.rat.GridRatV', {
                    region: 'center',
                    margin: '10 0 0 0'
                });
                try {
                    menumain.removeAll(true);
                    menumain.add(grid);
                } catch (e) {
                    Ext.Msg.alert('Ошибка', e.message);
                }
                break;
            case 'gameacc':
                var gridGameAcc = Ext.create('Office.view.gameacc.GridGameAccV', {
                        region: 'center',
                        margin: '10 0 0 0',
                        width: 500
                    }),
                    gridGameAction = Ext.create('Office.view.gameacc.GridGameActionV', {
                        region: 'center',
                        margin: '10 0 0 10',
                        width: 400
                    }),
                    container = Ext.create('Ext.container.Container', {
                        layout: {
                            type: 'hbox'
                            //align: 'stretch'  // * так не работает верт скроллинг
                        },
                        autoScroll: true,
                        flex: 1,
                        items: [gridGameAcc, gridGameAction]
                    });
                try {
                    menumain.removeAll(true);
                    menumain.add(container);
                } catch (e) {
                    Ext.Msg.alert('Ошибка', e.message);
                }

                break;
            case 'panels':
                var gridParam = Ext.create('Office.view.panels.GridParamV', {
                        region: 'center',
                        margin: '10 0 0 10',
                        width: 400
                    }),
                    gridPanels = Ext.create('Office.view.panels.GridPanelsV', {
                        region: 'center',
                        margin: '10 0 0 0',
                        width: 300
                    }),
                    container = Ext.create('Ext.container.Container', {
                        layout: {
                            type: 'hbox'
                        },
                        autoScroll: true,
                        flex: 1,
                        items: [gridPanels, gridParam]
                    });
                try {
                    menumain.removeAll(true);
                    menumain.add(container);
                } catch (e) {
                    Ext.Msg.alert('Ошибка', e.message);
                }
                break;
            case 'virtual':
                var gridVirtual = Ext.create('Office.view.virtual.GridVirtualV', {
                    margin: '10 0 0 0'
                });
                try {
                    menumain.removeAll(true);
                    menumain.add(gridVirtual);
                } catch (e) {
                    Ext.Msg.alert('Ошибка', e.message);
                }
                break;
            case 'chat':
                var win = Ext.ComponentQuery.query('#windowChat')[0];
                if (win) {
                    var gridChatMes = win.down('gridchatmes'),
                        gridChatGroup = win.down('gridchatgroup'),
                        gridChatUser = win.down('gridchatuser'),
                        formMes = win.down('formmessage');
                } else {
                    var gridChatMes = Ext.create('Office.view.chat.GridChatMesV', {
                            flex: 1
                        }),
                        gridChatGroup = Ext.create('Office.view.chat.GridChatGroupV', {}),
                        gridChatUser = Ext.create('Office.view.chat.GridChatUserV', {
                            margin: '10 0 0 0',
                            flex: 1
                        }),
                        formMes = Ext.create('Office.view.chat.FormMessageV', {
                            margin: '10 0 0 0'
                        }),
                        containerLeft = Ext.create('Ext.container.Container', {
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            itemId: 'containerLeft',
                            width: 200,
                            resizable: true,
                            autoScroll: true,
                            items: [gridChatGroup, gridChatUser]
                        }),
                        containerRight = Ext.create('Ext.container.Container', {
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            margin: '0 0 0 10',
                            flex: 1,
                            itemId: 'containerRight',
                            autoScroll: true,
                            items: [gridChatMes, formMes]
                        }),
                        containerMain = Ext.create('Ext.container.Container', {
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            margin: '10 10 10 10',
                            itemId: 'containerMain',
                            autoScroll: true,
                            flex: 1,
                            items: [containerLeft, containerRight]
                        });
                    win = new Ext.window.Window({
                        title: 'Чат',
                        modal: true,
                        id: 'windowChat',
                        closeAction: 'hide',
                        constrain: true,
                        width: 900,
                        height: 600,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            containerMain
                        ]
                    });
                }

                gridChatGroup.getViewModel().set('login', Ext.util.Cookies.get('betzet_login'));
                gridChatUser.getViewModel().set('login', Ext.util.Cookies.get('betzet_login'));
                gridChatMes.getViewModel().set('login', Ext.util.Cookies.get('betzet_login'));
                formMes.getViewModel().set('login', Ext.util.Cookies.get('betzet_login'));

                me.startTaskChat(win, gridChatMes);

                break;
            case 'exit':
                Office.util.Setup.logout();
                break;
        }
    },
    // * старт задания для чата
    startTaskChat: function (win, gridChatMes) {
        var runner = new Ext.util.TaskRunner(),
            taskChat = runner.newTask({
                run: function () {
                    gridChatMes.store.reload();
                },
                interval: 1000 * Utilities.chatAskInterval // в секундах
            });

        win.on('close', function () {
            taskChat.stop();
        });
        taskChat.start();

        win.show();
    },
    /*isHidden: function (itemId) {
     var menumain = this.getView(),
     selector = '#' + itemId,
     item = Ext.ComponentQuery.query(selector)[0],
     vm = menumain.getViewModel(),
     globals = vm.getData().globals;
     console.info(item);
     if (item)
     return globals.use_ndfl;
     },*/

    afterRender: function (menumain) {
        // * сразу открывать Смены после авторизации
        var session = menumain.down('#session');
        if (session && session.getEl())
            session.getEl().dom.click();

        // * скрыть пункты меню, которые не положено показывать (типа с признаком _use_ndfl)
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            arrUseNdfl = Ext.ComponentQuery.query('menumain [_use_ndfl=true], [_use_ndfl=false]'),
            arrClub = Ext.ComponentQuery.query('menumain [_user_in_club=true], [_user_in_club=false]'),
            arr = Ext.Array.merge(),
            vm = menumain.getViewModel(),
            globals = vm.getData().globals;

        Ext.Array.each(arrUseNdfl, function (item) {
            if (globals.use_ndfl)
                item.setHidden(!item._use_ndfl);
            else
                item.setHidden(item._use_ndfl);
        });

        Ext.Array.each(arrClub, function (item) {
            if (globals.user_in_club)
                item.setHidden(!item._user_in_club);
            else
                item.setHidden(item._user_in_club);
        });
    }
});
