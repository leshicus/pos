Ext.define('Office.view.menumain.MenuMainC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.session.GridCurrentV',
        'Office.view.session.GridLastSessionV',
        'Office.view.session.GridPaySlipV',
        'Office.view.session.FormPrintLineV',

        'Office.view.pay.GridPayV',

        'Office.view.accept.GridAcceptV',

        //'Office.view.timeline.GridTimelineV',
        //'Office.view.timeline.GridSlipV',

        'Office.view.rat.GridRatV',

        //'Office.view.ratbets.FaceRatbetsV',

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

        'Office.view.fill.WsF',

        'Ext.window.MessageBox',
        'Ext.layout.container.Border'
    ],
    alias: 'controller.menumain',

    // * загрузка данных о смене (Смены)
    loadSessionData: function (callback, btn) {
        //console.info(arguments);
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            objUrl = {
                class: 'Pos_Sessions_Lastsessioninfo'
            };
        // Ext.defer(function () { // * без задержки иногда ругается, что стор какой-то не загружен
        Ext.Ajax.request({
            url: Server.getUrl(objUrl),
            success: function (response) {
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
                                Util.toast('Ошибка', 'Смена закрыта. Начните новую смену.');
                            }
                        } else
                            callback(session);
                    }

                    // * заполним gridCurrent и статусы disabled его кнопок
                    var gridCurrent = Ext.ComponentQuery.query('gridcurrent')[0];
                    if (gridCurrent) {
                        var vmCurrent = gridCurrent.getViewModel();

                        vmCurrent.set('theSession', session);

                        //if (vm.get('globals').use_ndfl) {
                        //    gridCurrent.hiddenProperties = ["sessionAcceptedPerSessionWithoutAccounts",
                        //        "sessionAcceptedPerSessionForAccounts",
                        //        "sessionPaidPerSession",
                        //        "sessionPaidPerSessionWithoutAccounts",
                        //        "sessionPaidPerSessionForAccounts"];
                        //}
                        //else {
                        //    gridCurrent.hiddenProperties = ["acceptedPerSessionWithoutTL",
                        //        "acceptedPerSessionForTL",
                        //        "paidPerSessionWithTLPOs",
                        //        "paidPerSession",
                        //        "cashMovementTLOutput",
                        //        "cachierFullname"];
                        //}
                        gridCurrent.store.filterBy(this.filterGridCurrent, this);
                    }
                }
            },
            failure: function (response) {
                Util.toast('Внимание', 'Не загружены данные о смене: ошибка сервера');
            },
            method: 'POST',
            scope: this
        });
        // }, 10);
    },

    // * фильтрует строки в таблице gridcurrent в зависимости от св-ва hiddenProperties
    filterGridCurrent: function (record) {
        var fieldName = record.data.name,
            grid = Ext.ComponentQuery.query('gridcurrent')[0],
            menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            use_ndfl = vm.get('globals').use_ndfl;

        if (use_ndfl) {
            for (var x = 0; x < grid._use_ndfl_hideProperties.length; x++) {
                if (fieldName == grid._use_ndfl_hideProperties[x]) {
                    return false;
                }
            }
        } else {
            for (var x = 0; x < grid._use_ndfl_showProperties.length; x++) {
                if (fieldName == grid._use_ndfl_showProperties[x]) {
                    return false;
                }
            }
        }

        return true;
    },

    onClickMenumain: function (item) {
        var menumain = this.getView(),
            bottomMenumain = menumain.down('#bottomMenumain'),
            me = this;

        switch (item.getItemId()) {
            case 'session':
                var gridcurrent = Ext.ComponentQuery.query('gridcurrent')[0],
                    gridpayslip = Ext.ComponentQuery.query('gridpayslip')[0],
                    formprintline = Ext.ComponentQuery.query('formprintline')[0],
                    gridlastsession = Ext.ComponentQuery.query('gridlastsession')[0],
                    container_2 = Ext.ComponentQuery.query('#session_container_2')[0],
                    container_1 = Ext.ComponentQuery.query('#session_container_1')[0],
                    container = Ext.ComponentQuery.query('#session_container_1')[0];

                if (!gridcurrent)
                    gridcurrent = Ext.create('Office.view.session.GridCurrentV', {
                        margin: '10 0 0 0',
                        width: 450
                    });

                if (!gridpayslip)
                    gridpayslip = Ext.create('Office.view.session.GridPaySlipV');

                if (!formprintline)
                    formprintline = Ext.create('Office.view.session.FormPrintLineV', {
                        margin: '15 0 0 0'
                    });

                if (!gridlastsession)
                    gridlastsession = Ext.create('Office.view.session.GridLastSessionV', {
                        margin: '15 0 0 0'
                    });

                if (!container_2)
                    container_2 = Ext.create('Ext.container.Container', {
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        width: 370,
                        itemId: 'session_container_2',
                        margin: '10 0 0 15',
                        items: [gridpayslip, formprintline]
                    });

                if (!container_1)
                    container_1 = Ext.create('Ext.container.Container', {
                        layout: {
                            type: 'hbox'
                            //align: 'stretch'
                        },
                        itemId: 'session_container_1',
                        items: [gridcurrent, container_2]
                    });

                if (!container)
                    container = Ext.create('Ext.container.Container', {
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        itemId: 'session_container',
                        autoScroll: true,
                        flex: 1,
                        items: [container_1, gridlastsession]
                    });
                try {
                    menumain.removeAll(Util.AUTO_DESTROY_ON_REMOVE);
                    menumain.add(container);
                } catch (e) {
                    Util.erMes(e.message);
                }
                break;
            case 'fill':
                var panel = Ext.ComponentQuery.query('fill')[0];
                if (!panel) {
                    panel = Ext.create('Office.view.fill.FillV', {
                        margin: '10 0 0 0'
                    });

                    // * окончание в ApplyChangedData::loadMatchdataData
                    //menumain.getEl().mask('Загрузка событий...');
                } else {
                    // * переключим вкладку в Событиях, если нужно
                    var localStorage = Ext.util.LocalStorage.get('newpos'),
                        activeEventTab = parseInt(localStorage.getItem('activeEventTab')),
                        tabpanel = panel.down('#eventstab');

                    tabpanel.setActiveItem(activeEventTab);

                    // * для того, чтобы ставки, сделанные из Виртуальных заявок и Принятых появились
                    var gridEvent = Ext.ComponentQuery.query('grideventlive')[activeEventTab];
                    if (gridEvent.getStore().count())
                        BasketF.fillBasketFromLocal(gridEvent, 0);
                }

                menumain.removeAll(Util.AUTO_DESTROY_ON_REMOVE);
                menumain.add(panel);
                break;
            case 'timeline':
                var gridtimeline = Ext.ComponentQuery.query('gridtimeline')[0],
                    gridslip = Ext.ComponentQuery.query('gridslip')[0],
                    timeline_container = Ext.ComponentQuery.query('#timeline_container')[0];

                // * просили каждый раз очищать раздел при заходе
                if (gridtimeline)
                    gridtimeline.getController().resetAll();

                if (!gridtimeline)
                    gridtimeline = Ext.create('Office.view.timeline.GridTimelineV', {
                        region: 'center',
                        flex: 1
                    });

                if (!gridslip)
                    gridslip = Ext.create('Office.view.timeline.GridSlipV', {
                        region: 'south',
                        flex: 1,
                        height: 300,
                        split: true
                    });

                if (!timeline_container)
                    timeline_container = Ext.create('Ext.container.Container', {
                        layout: 'border',
                        flex: 1,
                        itemId: 'timeline_container',
                        margin: '10 0 0 0',
                        items: [
                            gridtimeline,
                            gridslip
                        ]
                    });

                try {
                    menumain.removeAll(Util.AUTO_DESTROY_ON_REMOVE);
                    menumain.add(timeline_container);


                } catch (e) {
                    Util.erMes(e.message);
                }
                break;
            case 'accept':
                var grid = Ext.ComponentQuery.query('gridaccept')[0];

                if (!grid)
                    grid = Ext.create('Office.view.accept.GridAcceptV', {
                        region: 'center',
                        margin: '10 0 0 0'
                    });
                else // * просили каждый раз обновлять раздел при заходе
                    grid.getStore().reload();

                try {
                    menumain.removeAll(Util.AUTO_DESTROY_ON_REMOVE);
                    menumain.add(grid);
                } catch (e) {
                    Util.erMes(e.message);
                }
                break;
            case 'card':
                var grid = Ext.ComponentQuery.query('gridcard')[0];

                if (!grid)
                    grid = Ext.create('Office.view.card.GridCardV', {
                        margin: '10 0 0 0'
                    });

                try {
                    menumain.removeAll(Util.AUTO_DESTROY_ON_REMOVE);
                    menumain.add(grid);
                } catch (e) {
                    Util.erMes(e.message);
                }
                break;
            case 'pay':
                var grid = Ext.ComponentQuery.query('gridpay')[0];

                if (!grid)
                    grid = Ext.create('Office.view.pay.GridPayV', {
                        margin: '10 0 0 0'
                    });
                else // * просили каждый раз обновлять раздел при заходе
                    PayF.resetData();

                try {
                    menumain.removeAll(Util.AUTO_DESTROY_ON_REMOVE);
                    menumain.add(grid);
                } catch (e) {
                    Util.erMes(e.message);
                }
                break;
            //case 'rat':
            //    var grid = Ext.create('Office.view.rat.GridRatV', {
            //        region: 'center',
            //        margin: '10 0 0 0',
            //        flex: 1
            //    });
            //    try {
            //        menumain.removeAll(Util.AUTO_DESTROY_ON_REMOVE);
            //        menumain.add(grid);
            //    } catch (e) {
            //        Util.erMes(e.message);
            //    }
            //    break;
            //case 'ratbets':
            //    var grid = Ext.create('Office.view.ratbets.FaceRatbetsV', {
            //        region: 'center',
            //        margin: '10 0 0 0'
            //    });
            //    try {
            //        menumain.removeAll(Util.AUTO_DESTROY_ON_REMOVE);
            //        menumain.add(grid);
            //    } catch (e) {
            //        Util.erMes(e.message);
            //    }
            //    break;
            case 'gameacc':
                var gridGameAcc = Ext.ComponentQuery.query('gridgameacc')[0],
                    gridGameAction = Ext.ComponentQuery.query('gridgameaction')[0],
                    container = Ext.ComponentQuery.query('#gameacc_container')[0];

                if (!gridGameAcc)
                    gridGameAcc = Ext.create('Office.view.gameacc.GridGameAccV', {
                        region: 'center',
                        margin: '10 0 0 0',
                        width: 500
                    });

                if (!gridGameAction)
                    gridGameAction = Ext.create('Office.view.gameacc.GridGameActionV', {
                        region: 'center',
                        margin: '10 0 0 10',
                        width: 400
                    });

                if (!container)
                    container = Ext.create('Ext.container.Container', {
                        layout: {
                            type: 'hbox'
                            //align: 'stretch'  // * так не работает верт скроллинг
                        },
                        itemId: 'gameacc_container',
                        autoScroll: true,
                        flex: 1,
                        items: [gridGameAcc, gridGameAction]
                    });

                try {
                    menumain.removeAll(Util.AUTO_DESTROY_ON_REMOVE);
                    menumain.add(container);
                } catch (e) {
                    Util.erMes(e.message);
                }
                break;
            case 'panels':
                var gridParam = Ext.ComponentQuery.query('gridparam')[0],
                    gridPanels = Ext.ComponentQuery.query('gridpanels')[0],
                    container = Ext.ComponentQuery.query('#panel_container')[0];

                if (!gridParam)
                    gridParam = Ext.create('Office.view.panels.GridParamV', {
                        region: 'center',
                        margin: '10 0 0 10',
                        width: 400
                    });

                if (!gridPanels)
                    gridPanels = Ext.create('Office.view.panels.GridPanelsV', {
                        region: 'center',
                        margin: '10 0 0 0',
                        width: 300
                    });

                if (!container)
                    container = Ext.create('Ext.container.Container', {
                        layout: {
                            type: 'hbox'
                        },
                        autoScroll: true,
                        flex: 1,
                        itemId: 'panel_container',
                        items: [gridPanels, gridParam]
                    });

                try {
                    menumain.removeAll(Util.AUTO_DESTROY_ON_REMOVE);
                    menumain.add(container);
                } catch (e) {
                    Util.erMes(e.message);
                }
                break;
            case 'virtual':
                var gridVirtual = Ext.ComponentQuery.query('gridvirtual')[0];

                if (!gridVirtual)
                    gridVirtual = Ext.create('Office.view.virtual.GridVirtualV', {
                        margin: '10 0 0 0'
                    });

                try {
                    menumain.removeAll(Util.AUTO_DESTROY_ON_REMOVE);
                    menumain.add(gridVirtual);
                } catch (e) {
                    Util.erMes(e.message);
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
                win.show();

                me.startTaskChat(win, gridChatMes);

                break;
            case 'exit':
                Office.util.Setup.logout();
                break;
        }
        //menumainVM.set('sectionName', item.getItemId()); // * открытый раздел
        //}
    },
    // * старт задания для чата
    startTaskChat: function (win, gridChatMes) {
        var runner = new Ext.util.TaskRunner(),
            taskChat = runner.newTask({
                run: function () {
                    gridChatMes.store.reload();
                },
                interval: 1000 * Util.chatAskInterval // в секундах
            });

        win.on('close', function () {
            taskChat.stop();
        });
        taskChat.start();

        //win.show();
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
        //var menumain = Ext.ComponentQuery.query('menumain')[0];
        this.loadSessionData();

        // * сразу открывать определенный пункт меню после авторизации
        var session = menumain.down('#' + Debug.DEFAULT_MENU_ITEM);
        if (session && session.getEl())
            session.getEl().dom.click();

        // * сохраним ссылку на локальное хранилище
        //var localStorage = Ext.util.LocalStorage.get('newpos');
        //if (!localStorage)
        //    localStorage = new Ext.util.LocalStorage({
        //        id: 'newpos'
        //    });
        //menumain.getViewModel().set('localStorage',localStorage);

        // * скрыть пункты меню, которые не положено показывать (типа с признаком _use_ndfl)
        //var menumain = Ext.ComponentQuery.query('menumain')[0],
        //    arrUseNdfl = Ext.ComponentQuery.query('menumain [_use_ndfl=true], [_use_ndfl=false]'),
        //    arrClub = Ext.ComponentQuery.query('menumain [_user_in_club=true], [_user_in_club=false]'),
        //    arr = Ext.Array.merge(),
        //    vm = menumain.getViewModel(),
        //    globals = vm.getData().globals;

        //Ext.Array.each(arrUseNdfl, function (item) {
        //    if (globals.use_ndfl)
        //        item.setHidden(!item._use_ndfl);
        //    else
        //        item.setHidden(item._use_ndfl);
        //});
        //
        //Ext.Array.each(arrClub, function (item) {
        //    if (globals.user_in_club)
        //        item.setHidden(!item._user_in_club);
        //    else
        //        item.setHidden(item._user_in_club);
        //});
        // * подписываюсь на веб-сокеты по кэфам
        //WsF.startLoadWS();
    },

    // * загрузка файлов markets.js, ru_prep.yaml
    loadMarkets: function () {
        var _this = this,
            menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            loadRuYaml = function () {
                YAML.load('resources/data/fill/markets/ru_prep.yml', function (result) {
                    vm.set('localeYaml', result);
                    Ext.Ajax.request({
                        url: "resources/data/fill/markets/markets.js",
                        method: 'POST',
                        callback: fooReplaceMarkets
                    });
                    Ext.Ajax.request({
                        url: "resources/data/fill/markets/marketGroups.js",
                        method: 'POST',
                        callback: fooReplaceMarketGroups
                    });
                });
            },
            fooReplaceMarkets = function (opt, success, response) {
                if (success) {
                    var txt = response.responseText;
                    if (txt) {
                        var reg = new RegExp('t\\(', 'gm'),
                            regGetSportsSlug = new RegExp('getAllSportSlugs\\(', 'gm'),
                            regGetSportWithDraw = new RegExp('getSportWithDraw\\(', 'gm');
                        txt = txt.replace(reg, 'UtilMarkets.t(');
                        txt = txt.replace(regGetSportsSlug, 'UtilMarkets.getAllSportSlugs(');
                        txt = txt.replace(regGetSportWithDraw, 'UtilMarkets.getSportWithDraw(');
                        txt = eval(txt);
                        vm.set('markets', txt);
                    }
                } else {
                    Util.toast('Ошибка', 'Локализация не загружена. Повторная попытка загрузки.');
                    // * повторим попытку загрузки локали через 1с
                    Ext.defer(function () {
                        loadRuYaml();
                    }, 1000, this);
                }
            },
            fooReplaceMarketGroups = function (opt, success, response) {
                if (success) {
                    var txt = response.responseText;
                    if (txt) {
                        var reg = new RegExp('t\\(', 'gm');
                        txt = txt.replace(reg, 'UtilMarkets.t(');
                        txt = eval(txt);
                        vm.set('marketGroups', txt);


                        /* Ext.defer(function () {
                         _this.addEmptyCoefGrids(fill);
                         }, 1000, this);*/

                    }
                }
            };
        // * загрузка во viewmodel fill данных по markets, marketGroups, localeYaml
        loadRuYaml();
    },
    onDestroy: function (menumain) {
        window.WS.UnsubscribeAll();

        //var ls = Ext.util.LocalStorage.get('newpos');
        //ls.release();
    },

});
