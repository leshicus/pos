Ext.define('Office.view.menumain.MenuMainC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.session.GridCurrentV',
        'Office.view.session.GridLastSessionV',
        'Office.view.session.GridDetalizationV',
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
        'Office.view.coords.GridCoordsV',
        'Office.view.scheduleforgamefield.GridScheduleforgamefieldV',
        'Office.view.players.GridPlayersV',

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
                                callback(btn, session);
                            } else {
                                Util.warnMes('Смена закрыта. Начните новую смену.');
                            }
                        } else {
                            callback(session);
                        }
                    }

                    // * заполним gridCurrent и статусы disabled его кнопок
                    var gridCurrent = Ext.ComponentQuery.query('gridcurrent')[0];
                    if (gridCurrent) {
                        var vmCurrent = gridCurrent.getViewModel();

                        vmCurrent.set('theSession', session);

                        gridCurrent.store.filterBy(this.filterGridCurrent, this);
                    }
                }
            },
            failure: function (response) {
                Util.warnMes('Не загружены данные о смене: ошибка сервера');
            },
            method: 'POST',
            scope: this
        });
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
                this.removeAllConditional(Util.AUTO_DESTROY_ON_REMOVE);

                var gridcurrent = Ext.ComponentQuery.query('gridcurrent')[0],
                    gridpayslip = Ext.ComponentQuery.query('gridpayslip')[0],
                //formprintline = Ext.ComponentQuery.query('formprintline')[0],
                    gridlastsession = Ext.ComponentQuery.query('gridlastsession')[0],
                    griddetalization = Ext.ComponentQuery.query('griddetalization')[0],
                    container_2 = Ext.ComponentQuery.query('#session_container_2')[0],
                    container_1 = Ext.ComponentQuery.query('#session_container_1')[0],
                    container = Ext.ComponentQuery.query('#session_container')[0];

                if (!gridcurrent) {
                    gridcurrent = Ext.create('Office.view.session.GridCurrentV', {
                        margin: '10 0 0 0',
                        width: 450
                    });
                } else {
                    SessionF.reloadGrids();
                }

                if (!gridpayslip)
                    gridpayslip = Ext.create('Office.view.session.GridPaySlipV', {
                        width: 370
                    });

                if (!gridlastsession)
                    gridlastsession = Ext.create('Office.view.session.GridLastSessionV', {
                        margin: '15 0 0 0'
                    });

                if (!griddetalization)
                    griddetalization = Ext.create('Office.view.session.GridDetalizationV', {
                        margin: '15 0 0 0'
                    });

                if (!container_2)
                    container_2 = Ext.create('Ext.container.Container', {
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        //width: 370,
                        flex: 1,
                        itemId: 'session_container_2',
                        margin: '10 0 0 15',
                        items: [gridpayslip, griddetalization]
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

                menumain.add(container);
                break;
            case 'fill':
                this.removeAllConditional(Util.AUTO_DESTROY_ON_REMOVE);

                var panel = Ext.ComponentQuery.query('fill')[0];
                if (!panel) {
                    panel = Ext.create('Office.view.fill.FillV', {
                        margin: '10 0 0 0'
                    });

                    // * переключим вкладку в Событиях, если нужно
                    //var localStorage = Ext.util.LocalStorage.get('newpos'),
                    //    activeEventTab = parseInt(localStorage.getItem('activeEventTab')) || 0,
                    //    tabpanel = panel.down('#eventstab'),
                    //    menumain = Ext.ComponentQuery.query('menumain')[0],
                    //    vm = menumain.getViewModel();
                    //
                    ////tabpanel.setActiveItem(activeEventTab);
                    //
                    //// * для того, чтобы ставки, сделанные из Виртуальных заявок и Принятых появились
                    //var gridEvent = Ext.ComponentQuery.query('grideventlive')[activeEventTab];
                    //if (gridEvent && vm.getStore(gridEvent.getItemId()).count()) {
                    //    BasketF.fillBasketFromLocal(gridEvent, 0);
                    //}
                }

                menumain.add(panel);
                break;
            case 'timeline':
                this.removeAllConditional(Util.AUTO_DESTROY_ON_REMOVE);

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

                menumain.add(timeline_container);

                var term = gridtimeline.down('#term');
                if (term)
                    term.focus();
                break;
            case 'accept':
                this.removeAllConditional(Util.AUTO_DESTROY_ON_REMOVE);

                var grid = Ext.ComponentQuery.query('gridaccept')[0];

                if (!grid)
                    grid = Ext.create('Office.view.accept.GridAcceptV', {
                        region: 'center',
                        margin: '10 0 0 0'
                    });
                else // * просили каждый раз обновлять раздел при заходе
                    grid.getStore().reload();

                menumain.add(grid);
                break;
            case 'card':
                this.removeAllConditional(Util.AUTO_DESTROY_ON_REMOVE);

                var grid = Ext.ComponentQuery.query('gridcard')[0];

                if (!grid)
                    grid = Ext.create('Office.view.card.GridCardV', {
                        margin: '10 0 0 0'
                    });

                menumain.add(grid);
                break;
            case 'pay':
                this.removeAllConditional(Util.AUTO_DESTROY_ON_REMOVE);

                var grid = Ext.ComponentQuery.query('gridpay')[0];

                if (!grid) {
                    grid = Ext.create('Office.view.pay.GridPayV', {
                        margin: '10 0 0 0'
                    });
                } else // * просили каждый раз обновлять раздел при заходе
                    PayF.resetData();

                menumain.add(grid);
                break;
            case 'gameacc':
                this.removeAllConditional(Util.AUTO_DESTROY_ON_REMOVE);

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

                menumain.add(container);
                break;
            case 'panels':
                this.removeAllConditional(Util.AUTO_DESTROY_ON_REMOVE);

                var gridParam = Ext.ComponentQuery.query('gridparam')[0],
                    gridPanels = Ext.ComponentQuery.query('gridpanels')[0],
                    container = Ext.ComponentQuery.query('#panel_container')[0];

                if (!gridParam)
                    gridParam = Ext.create('Office.view.panels.GridParamV', {
                        region: 'center',
                        margin: '10 0 0 10',
                        width: 820
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

                menumain.add(container);
                break;
            case 'virtual':
                this.removeAllConditional(Util.AUTO_DESTROY_ON_REMOVE);

                var gridVirtual = Ext.ComponentQuery.query('gridvirtual')[0];

                if (!gridVirtual)
                    gridVirtual = Ext.create('Office.view.virtual.GridVirtualV', {
                        margin: '10 0 0 0'
                    });

                menumain.add(gridVirtual);
                break;
            case 'scheduleforgamefield':
                this.removeAllConditional(Util.AUTO_DESTROY_ON_REMOVE);

                var gridScheduleforgamefield = Ext.ComponentQuery.query('gridscheduleforgamefield')[0];

                if (!gridScheduleforgamefield)
                    gridScheduleforgamefield = Ext.create('Office.view.scheduleforgamefield.GridScheduleforgamefieldV', {
                        margin: '10 0 0 0'
                    });

                menumain.add(gridScheduleforgamefield);
                break;
            case 'players':
                this.removeAllConditional(Util.AUTO_DESTROY_ON_REMOVE);

                var gridPlayers = Ext.ComponentQuery.query('gridplayers')[0],
                    players_container = Ext.ComponentQuery.query('#players_container')[0];

                if (!gridPlayers)
                    gridPlayers = Ext.create('Office.view.players.GridPlayersV', {
                        //margin: '10 0 0 0',
                        width: 200
                    });

                if (!players_container)
                    players_container = Ext.create('Ext.container.Container', {
                        layout: {
                            type: 'vbox'
                        },
                        itemId: 'printline_container',
                        margin: '10 0 0 0',
                        items: [gridPlayers]
                    });

                menumain.add(players_container);
                break;
            case 'printline':
                this.removeAllConditional(Util.AUTO_DESTROY_ON_REMOVE);

                var formprintline = Ext.ComponentQuery.query('formprintline')[0],
                    printline_container = Ext.ComponentQuery.query('#printline_container')[0];

                if (!formprintline)
                    formprintline = Ext.create('Office.view.session.FormPrintLineV', {
                        width: 370
                    });

                if (!container)
                    container = Ext.create('Ext.container.Container', {
                        layout: {
                            type: 'vbox'
                        },
                        itemId: 'printline_container',
                        margin: '10 0 0 0',
                        items: [formprintline]
                    });

                menumain.add(container);
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
            case 'coords':
                this.removeAllConditional(Util.AUTO_DESTROY_ON_REMOVE);

                var gridCoords = Ext.ComponentQuery.query('gridcoords')[0];

                if (!gridCoords)
                    gridCoords = Ext.create('Office.view.coords.GridCoordsV', {
                        margin: '10 0 0 0'
                    });

                menumain.add(gridCoords);
                break;
            case 'exit':
                Office.util.Setup.logout();
                break;
        }
    },

    // * не удалять fill из оперативки
    removeAllConditional: function (mode) {
        var fill = Ext.ComponentQuery.query('fill')[0],
            menumain = this.getView();

        //if (fill) {
        //    menumain.removeAll(false);
        //} else {
        menumain.removeAll(mode);
        // }
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
    },

    onAfterRender: function (menumain) {
        // * сразу открывать определенный пункт меню после авторизации
        // Ext.defer(function(){// * нужно дать время кнопкам отрендериться
        function clickDefaultButton() {
            var fill = menumain.down('#' + Debug.DEFAULT_MENU_ITEM);

            if (fill) {
                if (fill.getEl()) {
                    fill.getEl().dom.click();
                    //fill.toggle(true);

                }
                //Ext.ComponentQuery.query('menumain')[0].down('segmentedbutton #session').toggle()
            } else {
                var session = menumain.down('#session');
                if (session) {
                    if (session.getEl()) {
                        session.getEl().dom.click();
                    }
                }
            }
        }

        // },100,this);
        this.loadSessionData(clickDefaultButton);
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
                    Util.warnMes('Локализация не загружена. Повторная попытка загрузки.');
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
                    }
                }
            };
        // * загрузка во viewmodel fill данных по markets, marketGroups, localeYaml
        loadRuYaml();
    },

    onDestroy: function (menumain) {
        //window.WS.UnsubscribeAll();

        //var ls = Ext.util.LocalStorage.get('newpos');
        //ls.release();
    },

    onAdd: function (store, rec) {
        var storeId = store.getStoreId(),
            idxGrid = ApplyChangedData.getGridIdx(storeId),
            grid = Ext.ComponentQuery.query('grideventlive')[idxGrid];
        this.setLiveCountProperty(store);
    },

    onEventStoreChange: function (store) {
        var storeId = store.getStoreId(),
            idxGrid = ApplyChangedData.getGridIdx(storeId),
            grid = Ext.ComponentQuery.query('grideventlive')[idxGrid];

        // * отфильтруем виды спорта в фильтре по видам спорта
        if (storeId != 'rats'
            && storeId != 'dayexpress'
            && storeId != 'dayexpressDC') {

            grid.getController().filterSports();

            this.setLiveCountProperty(store);
        }
    },

    setLiveCountProperty: function (store) {
        var fill = Ext.ComponentQuery.query('fill')[0];
        if (fill) {
            if (store) {
                var storeName = store.getStoreId();

                Ext.defer(function () {
                    var vmFill = fill.getViewModel();
                    if (vmFill) {
                        if (storeName == 'line')
                            vmFill.set('line_count', store.count());
                        else if (storeName == 'live')
                            vmFill.set('live_count', store.count());
                    }
                }, 100, this);
            } else {
                Ext.defer(function () {
                    var menumain = Ext.ComponentQuery.query('menumain')[0],
                        vm = menumain.getViewModel(),
                        storeLine = vm.getStore('line'),
                        storeLive = vm.getStore('live'),
                        vmFill = fill.getViewModel();
                    if (vmFill) {
                        vmFill.set('line_count', storeLine.count());
                        vmFill.set('live_count', storeLive.count());
                    }
                }, 100, this);
            }
        }
    },
});
