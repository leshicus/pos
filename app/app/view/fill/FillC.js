Ext.define('Office.view.fill.FillC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.timeline.GridSearchV',
        'Office.view.fill.BasketF',
        'Office.view.fill.MonitorF',
        //'Office.view.fill.coeff.MarketsHtml',
        //'Office.view.fill.WsF',
        'Office.view.fill.FastInputF',
        'Office.view.timeline.FormUserSearchV'
    ],
    alias: 'controller.fill',

    // * рендер grideventlive
    onGridEventRender: function (grid) {
        // * задание на обновление коэффициентов
        var interval = 10;
        TaskF.startTaskClearEventStore(grid, interval);

        if (grid.getItemId() == 'live'
            || grid.getItemId() == 'rats') {
            TaskF.taskSecondsStart(grid.getItemId());
        }

        //Ext.defer(function () {
        //    if ((grid.getItemId() == 'line' || grid.getItemId() == 'live')
        //        && BasketF.isActiveEventTab(grid)
        //        && grid.store.count() == 0) {
        //        var fill = this.getView(),
        //            west = fill.down('panel[region=west]');
        //        // * окончание маски в GridEventLiveC::setLiveCountProperty
        //
        //        west.getEl().mask('Загрузка матчей...');
        //    }
        //}, 200, this);
    },

    // * рендер fill
    onFillRender: function (fill) {
        var menumain = Ext.ComponentQuery.query('menumain')[0];
        // * выделим вкладку в событиях (линия или лайв), если есть указание в локальном хранилище
        Ext.defer(function () { // * localStorage.getItem: Cannot read property 'getItem' of null
            menumain.getController().setLiveCountProperty();

            var localStorage = Ext.util.LocalStorage.get('newpos'),
                activeEventTab = parseInt(localStorage.getItem('activeEventTab')),
                tabpanel = fill.down('#eventstab');

            if (!activeEventTab
                || activeEventTab == BasketF.getActiveTabIndexEvent()
                || !tabpanel.items.items[activeEventTab]
                || tabpanel.items.items[activeEventTab].disabled)
                activeEventTab = 0;

            tabpanel.setActiveItem(activeEventTab);

            // * для того, чтобы ставки, сделанные из Виртуальных заявок и Принятых появились
            BasketF.fillBasketFromLocal(null, 0);

            var center = fill.down('container[region=center]');
            center._initWidth = center.getWidth();
        }, 100, this);
    },

    // * смена вкладок в Событиях: Линия/Лайв/Экспресс дня
    onEventTabChange: function (tabpanel, newCard, oldCard) {
        FillF.resetCenterArea();

        var fill = Ext.ComponentQuery.query('fill')[0],
            vm = fill.getViewModel();

        // * будем очищать купон и заполнять его из локального хр., если переключаем вкладки с line/live на rats или de
        if (((oldCard.getItemId() == 'line' || oldCard.getItemId() == 'live')
            && (!newCard.getItemId() == 'line' || !newCard.getItemId() == 'live' ))
            || (oldCard.getItemId() != 'line' && oldCard.getItemId() != 'live')
            || (newCard.getItemId() != 'line' && newCard.getItemId() != 'live')) {

            // * очистка купона
            FillF.clearBasketSum();
            FillF.clearSystem();

            Ext.defer(function () {
                BasketF.clearBetSeries();
            }, 10, this);

            var storeBasket = vm.getStore('basket'),
                basket_count = vm.get('basket_count');

            storeBasket.suspendEvent('clear');// * чтобы ивент clear в basket не сработал
            storeBasket.removeAll();
            storeBasket.resumeEvent('clear');

            BasketF.refreshBasketGrids();

            vm.set('basket_count', 0);

            // * заполнение купона из localstorage
            BasketF.fillBasketFromLocal(newCard, 0);
        }

        Ext.defer(function () {
            oldCard.setSelection(null); // * при открытии вкладки, снимаем выделение в таблице событий- чтоб не путало
            newCard.setSelection(null); // * при открытии вкладки, снимаем выделение в таблице событий- чтоб не путало
            if (!oldCard || !newCard)
                console.info(oldCard, newCard);
        }, 10, this);

        // * сохраним активную вкладку в локальное хранилище
        var localStorage = Ext.util.LocalStorage.get('newpos');
        localStorage.setItem('activeEventTab', BasketF.getActiveTabIndexEvent());

        // * нужно для фильтра disableFastInputField, чтобы скрыть некоторые поля для Экспресс дня
        var activeTabEventId = BasketF.getActiveTabEventId();
        vm.set('activeTabEventId', activeTabEventId);
        newCard.getViewModel().set('activeTabEventId', activeTabEventId);

        // * для Экспресса дня переключим вкладку в купоне сразу на Экспресс
        var tabpanelBet = fill.down('#tabpanelBet');
        if (BasketF.isDayExpress()) {// * Экспресс дня
            // * для Экспресса дня запускаем показ кэфов отсюда, сразу при нажатии на вкладку
            MarketsHtml.dayExpressClick(newCard);

            Ext.defer(function () {
                // * можно выбрать только один исход для каждого события
                if (FillF.checkCanSwitchTab())
                    tabpanelBet.setActiveItem(1);
            }, 100, this);
        }

        // * для Крыс добавим gridrat- список забегов
        if (newCard.getItemId() == 'rats') {
            var bbar = fill.down('#centerArea toolbar[dock=bottom]'),
                gridrat = Ext.create('Office.view.rat.GridRatV', {
                    margin: 5,
                    flex: 1,
                    height: 300
                });
            bbar.add(gridrat);
        }

        // * фокус на Быстрый ввод игрока
        var fastInputGambler = fill.down('#fastInputGambler');
        if (fastInputGambler)
            fastInputGambler.focus();
    },

// * смена вкладок в купоне
    onBetTabChange: function (tabpanel, n, o) {
        var fill = Ext.ComponentQuery.query('fill')[0],
            activeTabIndex = BasketF.getActiveTabIndex(),
            gridbasketsingle = fill.down('gridbasketsingle'),
            checkBetSeries = gridbasketsingle.down('#checkBetSeries'),
            betResult = gridbasketsingle.down('#betResult'),
            gridbasketexpress = fill.down('gridbasketexpress'),
            amount = gridbasketexpress.down('#amount'),
            arrGrid = tabpanel.query('gridpanel'),
            activeTabEvent = BasketF.getActiveTabEventId();

        // * делаем чтобы значения обновились в гриде, а то если в одной вкладке добавить ставку, то во второй этого не видно
        BasketF.refreshBasketGrids();

        // * делаем автофокус определенных ячеек
        if (activeTabIndex == 0) {// * single, поле Общая сумма ставки
            //if (checkBetSeries) {
            //    betResult.focus();
            //}
        } else if (activeTabIndex == 1) {// * express, поле Ставка в итогах
            // * обновим грид с итогами
            BasketF.getMaxMin();

            if (activeTabEvent != 'dayexpress' && activeTabEvent != 'dayexpressDC')
                amount.focus();
        }

        // * отправим ставки на монитор игрока
        MonitorF.sendBetsToMonitor();
    },

// * изменение в купоне
    onBasketChange: function (storeBasket, rec, oper, modifiedFieldName) {
        var fill = Ext.ComponentQuery.query('fill')[0],
            vm = fill.getViewModel(),
            menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel(),
            storeBasketLocal = vmMenumain.getStore('basket_localstorage'),
            gridbasketexpress = fill.down('gridbasketexpress');

        vm.set('basket_count', storeBasket.count());

        if (!modifiedFieldName) {// * !modifiedFieldName- добавление/удаление, modifiedFieldName == 'amount'- изменение суммы
            // * для формулы, которая определяет нужно ли показывать некоторые поля, в зависимости от количества записей в сторе

            var comboSystem = gridbasketexpress.down('#system'),
                vmExpress = gridbasketexpress.getViewModel(),
                storeSystem = vmExpress.getStore('system'),
                arrRec = [];

            // * обновить гриды с кэфами, чтобы применился цвет к ячейкам добавленных кэфов
            var tabpanel = Ext.ComponentQuery.query('#eventstab')[0];
            if (tabpanel)
                var grideventlive = tabpanel.getActiveTab();

            if (grideventlive) {
                if (BasketF.isDayExpress()) { // * для Экспресса дня нужно щелкать не по записи в гриде, а по вкладке
                    MarketsHtml.dayExpressClick(grideventlive);
                } else { // * щелкаем по строке грида grideventlive
                    var selection = grideventlive.getSelectionModel().getSelection()[0];
                    if (selection && BasketF.isActiveEventTab(grideventlive)) {
                        Ext.defer(function () {// * чтобы колонки cont_ успевали создаться, а то почему-то не успевают
                            grideventlive.getController().showCoefs(selection);
                            // grideventlive.fireEventArgs('itemclick', [{}, selection]);
                        }, 10, this);
                    } else if (!selection) {// * бывает выделение пропадает (разрыв связи с WS)- нужно очистить центральную область
                        FillF.resetCenterArea();
                    }

                    // * переключение табов, если нужно
                    var activeTabIndexBasket = BasketF.getActiveTabIndex(),
                        cnt = storeBasket.count(),
                        tabpanelBet = fill.down('#tabpanelBet');

                    if (cnt <= 1 && activeTabIndexBasket == 1 && FillF.checkCanSwitchTab()) { // * переключим таб на Одиночные
                        tabpanelBet.setActiveItem(0);
                    }

                    // * system
                    if (cnt < 3 && storeSystem.count()) {
                        storeSystem.removeAll();
                        comboSystem.reset();
                        vmExpress.set('system_count', null);
                    }

                    // * если больше 2 ставок, то показать комбик Системы
                    if (cnt > 2) {
                        for (var i = 1; i < cnt; i++) {
                            if (i == 1) {
                                arrRec.push([i, 'Экспресс', 0]);
                            } else {
                                // * число вариантов системы
                                var value = BasketF.countSystemValue(i, cnt),
                                    txt = 'Система ' + i + ' из ' + cnt + ' (вариантов: ' + value + ')';

                                arrRec.push([i, txt, value]);
                            }
                        }

                        // * для формулы, которая определяет нужно ли показывать некоторые поля, в зависимости от количества записей в сторе
                        vmExpress.set('system_count', arrRec.length);

                        Ext.defer(function () {
                            storeSystem.loadData(arrRec);

                            // * выделим строку Экспресс
                            comboSystem.select(1);
                        }, 100, this);
                    }

                    if (cnt == 2 && activeTabIndexBasket == 0 && FillF.checkCanSwitchTab()) {
                        Ext.defer(function () {
                            tabpanelBet.setActiveItem(1);  // * todo тут плохо работает, если перейти на Таймлайн, а потом вернуться, то вкладка Экспресс выделяется, а маска не пропадает
                        }, 100, this);
                    }
                }
            }

            Ext.defer(function () {// * нужно, а то какая-то петля образуется и refreshBasketGrids много раз вызывается
                BasketF.refreshBasketGrids();
            }, 100, this);
        } else { // * поменяли сумму имеющейся ставки
            var data = Util.cloneObject(rec.getData()),
                arrCoef = data.arrCoef,
                cf = arrCoef[2];

            // * удалим ставку с нулевым кэфом
            if (!cf)
                storeBasket.remove(rec);

            // * сохраним Итоговую ставку экспресса и выбранную систему в локальное хранилище
            var vmSum = gridbasketexpress.getViewModel(),
                storeBasketSum = vmSum.getStore('basketSum');
            data.multi_value = storeBasketSum.getAt(0).get('amount');
            data.system_value = vmSum.get('system_value');
            data.system_value = vmSum.get('system_value');

            // * найдем в локальном сторе требуемую ставку и поменяем параметры
            storeBasketLocal.each(function (item) {
                var query = item.get('query');
                if (query && query.event_id == rec.get('event_id')
                    && query.arrCoef[1] == rec.get('arrCoef')[1]) {
                    delete data.id;

                    if (cf)
                        item.set('query', data);
                }
            }, this);
        }

        FillF.actualPrizeAndBetResult();

        // * отправим ставки на монитор игрока
        MonitorF.sendBetsToMonitor();
    },

    clickEventRefresh: function () {
        var activeTab = BasketF.getActiveTabIndexEvent(),
            grid = Ext.ComponentQuery.query('grideventlive')[activeTab],
            activeTabId = BasketF.getActiveTabEventId(),
            menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            storeEvent = vm.getStore(grid.getItemId()),
            store_chained = grid.getViewModel().getStore('eventstore_chained'),
            channel;

        if (activeTabId == 'line')
            channel = 'prematch';

        if (activeTabId == 'live' || activeTabId == 'rats')
            channel = 'inplay';

        if (channel == 'inplay' || channel == 'prematch') {
            if (activeTabId != 'rats') {
                storeEvent.removeAll();
            }

            MatchdataTransport.reconnect(channel);
        } else {
            FillF.getDayExpressData();
        }
    },

    clickEventCancel: function () {
        var activeTab = BasketF.getActiveTabIndexEvent(),
            grid = Ext.ComponentQuery.query('grideventlive')[activeTab] /*|| Ext.ComponentQuery.query('grideventrats')[0]*/,
            store = grid.getViewModel().getStore('eventstore_chained'),
            combocheck = grid.down('#cbSport'),
            filterEvent = grid.down('#filterEvent'),
            filterDate = grid.down('#filterDate'),
            filterTime = grid.down('#filterTime');

        grid.getViewModel().set('filters', null);
        store.clearFilter();

        if (combocheck) {
            var comboSport = combocheck.down('combo');
            comboSport.reset();
        }
        if (filterEvent) {
            filterEvent.reset();
        }
        if (filterDate) {
            filterDate.setValue(null);
        }
        if (filterTime) {
            filterTime.setValue(null);
        }
    },

    // * срабатывает при деактивации вкладки
    onGrideventliveDisable: function (tab) {
        var fill = Ext.ComponentQuery.query('fill')[0],
            eventstab = fill.down('#eventstab');
        if (tab.getItemId() == 'dayexpress' || tab.getItemId() == 'dayexpressDC')
            eventstab.setActiveItem(0);
    },

    onClearFilterVm: function (field, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView();
        mainController.onClearFilterVm(field, e, grid.store, grid);
    },

    // * нажали на фильтр кэфов (Основные, Форы...)
    eventTypeClick: function (btn) {
        var id = btn._id,
            fill = Ext.ComponentQuery.query('fill')[0],
            tabEvent = fill.down('tabpanel'),
            activeTab = tabEvent.getActiveTab(),
            rec = activeTab.selection;
        MarketsHtml.eventTypeSecondClick(activeTab, rec, id);
    },

// * EAST
// * ПОСТАВИТЬ
    clickMakeBet: function () {
        // * проверим, что указан игрок
        var fill = Ext.ComponentQuery.query('fill')[0],
            vmFill = fill.getViewModel(),
            selectedGamer = vmFill.get('selectedGamer'),
            menumain = Ext.ComponentQuery.query('menumain')[0],
            globals = menumain.getViewModel().get('globals'),
            storeBasket = vmFill.getStore('basket');


        // * проверки соответствию глобальным настройкам системы
        if (!FillF.checkConstants(storeBasket))
            return false;

        // * Наличие игрока: если стоят настройки Вести налоговый учет или Вести учет игроков, то выбор игрока обязателен
        if (!selectedGamer && globals.keepRecordsOfPlayers) {
            Util.erMes('Не указан игрок', function (btn) {
                // * переведем фокус на поле ввода игрока
                var fastInputGambler = fill.down('#fastInputGambler');
                if (btn == 'ok' && fastInputGambler) {
                    fastInputGambler.focus();
                }
            });
            MonitorF.sendErrorToMonitor('Заполните паспортные данные игрока, анонимные ставки запрещены');
            return false;
        } else if (!selectedGamer && globals.use_ndfl) {
            Util.erMes('Не указан ТЛ');
            MonitorF.sendErrorToMonitor('Заполните паспортные данные игрока, анонимные ставки запрещены');
            return false;
        }

        // * проверим, что нет нулевых ставок
        if (!FillF.checkNotNull(storeBasket))
            return false;

        function makeBet() {
            var fill = Ext.ComponentQuery.query('fill')[0],
                vmFill = fill.getViewModel(),
                store = vmFill.getStore('basket'),
                activeTabIndexEvent = BasketF.getActiveTabIndexEvent(),
                gridevent = fill.query('grideventlive')[activeTabIndexEvent];

            // * удалим просроченные (кф=0) ставки
            BasketF.clearClosedBets();

            //if (gridevent
            //    && (gridevent.getItemId() == 'live'
            //        /*  || gridevent.getItemId() == 'dayexpress'
            //         || gridevent.getItemId() == 'dayexpressDC'*/)) {
            //    BasketF.getMaxMin('BasketF.basketQueue("place")');
            //} else
            //    BasketF.getMaxMin('BasketF.basketPrerequest()');
            BasketF.getMaxMin('BasketF.basketQueue("place")');
        };

        // * если у клиента есть карта и стоит настройка подтверждать ставку картой клиента, то делаем ставку после проверки кода карты
        var confirm = Util.getGlobalConst("CONFIRMATION_SLIP_OUTLET_CARD");
        if (selectedGamer && selectedGamer.found_by_barcode && confirm != 'false') {
            FayeClient.sendCommand({command: 'need_card_scan'}); // * todo как сделать callback?
            FillF.checkCard(makeBet);
        } else {
            makeBet();
        }
    },

    onEnterFastInput: function (field, e) {
        if (e.getKey() == e.ENTER) {
            BasketF.addFastInput(field);
            field.reset();
        }
    },

    onEnterFastInputGambler: function (field, e) {
        var _this = this;
        if (e.getKey() == e.ENTER && field.getValue()) {
            Ext.defer(function () { // * задержка, т.к. vm за сканером не успевает
                // * отправим поисковый запрос на сервер (поиск игрока)
                var userToken = Ext.util.Cookies.get('betzet_token');

                var fill = Ext.ComponentQuery.query('fill')[0],
                    east = fill.down('panel[region=east]');
                east.getEl().mask('Загрузка игроков...');

                Ext.Ajax.request({
                    url: Ext.util.Format.format(Server.getSearch(), userToken, field.getValue()),
                    success: function (resp) {
                        east.getEl().unmask();

                        var res = Gui.JSONDecodeSafe(resp.responseText);

                        if (res.status == 'success') {
                            var rows = res.response;
                            if (rows.length == 0) {
                                // * ругнемся
                                Util.erMes('Игрок не найден');
                            } else if (rows.length == 1) {
                                // * примем- сохраним во viewmodel
                                if (FormCardF.isAllowedPlayer(rows[0])) {
                                    FillF.validateGamerAndSave(rows[0]);
                                } else {
                                    FormCardF.sayNotAllowedPlayer(rows[0]);
                                }
                            } else {
                                // * покажем в гриде
                                _this.clickUser(null, null, rows);
                            }
                        } else {
                            var message = res.message;
                            if (message == 'PLAYER_NOT_FOUND')
                                Util.erMes('Игрок не найден');
                            else
                                Util.erMes('Ошибка: ' + res.message);
                        }
                    },
                    failure: function () {
                        east.getEl().unmask();
                        Util.warnMes(Util.ERROR_500);
                    },
                    method: 'POST'
                });
            }, 100, this);

        }
    },

// * перед переключением вкладок проверим, что одинары принадлежат разным событиям
    onBeforeBetTabChange: function () {
        var fill = Ext.ComponentQuery.query('fill')[0],
            activeTabIndex = BasketF.getActiveTabIndex(),
            vmFill = fill.getViewModel(),
            storeBasket = vmFill.getStore('basket'),
            arrEventId = Ext.Array.pluck(Ext.Array.pluck(storeBasket.getRange(), 'data'), 'event_id');
        //
        //// * проверим, что ставки принадлежат разным турнирам, иначе на Экспресс не переключаем
        //if ((activeTabIndex == 0
        //    && (storeBasket.count() < 2 || Util.hasDuplicates(arrEventId))
        //    && !BasketF.isDayExpress())
        //    || (activeTabIndex == 1
        //    && BasketF.isDayExpress())) {
        //
        //    //Util.warnMes('Переключение купона невозможно. Присутствуют одинары, поставленные на одно событие.');
        //    return false;
        //}
        if (FillF.checkCanSwitchTab())
            return true;
        else {
            if (activeTabIndex == 1
                && BasketF.isDayExpress()) {

                Ext.defer(function () { // * иначе сообщение моргает в центре экрана, почему-то
                    Util.warnMes('Переключение купона невозможно. Для ЭД возвожно создать только экспресс.');
                }, 10, this);
            } else if (activeTabIndex == 0
                && (Util.hasDuplicates(arrEventId))
                && !BasketF.isDayExpress()) { // * срабатывает и когда заполнение происходит из лок.хран.

                Ext.defer(function () {
                    Util.warnMes('Переключение купона невозможно. Присутствуют одинары, поставленные на одно событие.');
                }, 10, this);
            } else if (activeTabIndex == 0
                && (storeBasket.count() < 2)
                && !BasketF.isDayExpress()) {

                Ext.defer(function () {
                    Util.warnMes('Переключение купона невозможно. В купоне должно быть больше одной ставки.');
                }, 10, this);
            }

            return false;
        }
    },


// * кнопка "Очистить все" в купоне
    clickClearBet: function () {
        var fill = Ext.ComponentQuery.query('fill')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket'),
            fastInput = fill.down('#fastInput'),
            fastInputGambler = fill.down('#fastInputGambler'),
            vmExpress = Ext.ComponentQuery.query('gridbasketexpress')[0].getViewModel();

        // * очищаем стор купона
        storeBasket.removeAll();

        // * обнуляем стор итогов экспресса (нельзя делать removeAll)
        FillF.clearBasketSum();
        FillF.clearSystem();

        // * очищаем что связано с выбранным игроком/таймлайном
        Setup.clearLocalStorage();

        vm.set('basket_count', 0);
        vm.set('selectedGamer', '');
        vm.set('balance', '');
        vm.set('timeline_id', '');
        vm.set('queueKey', '');

        //vmExpress.set('system_count', null);

        // * устанавливаем заголовок Купон
        BasketF.setTitleBet();

        // * очистим поля купона Серия ставок по и Общая сумма ставки
        var checkBetSeries = Ext.ComponentQuery.query('#checkBetSeries')[0],
            betSeries = Ext.ComponentQuery.query('#betSeries')[0],
            betResult = Ext.ComponentQuery.query('#betResult')[0];
        checkBetSeries.reset();
        betSeries.reset();
        betResult.reset();

        // * очищаем поле быстрого ввода
        fastInputGambler.reset();
    },

    // * tooltip для fastInput
    onFastInputAfterrender: function (component) {
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: component.id,
            html: '<u>Формат:</u> №_Матча №_Исхода Сумма, №_Матча №_Исхода Сумма, ...<br><u>Пример:</u> 51122 1 500, 51122 2 300'
            //html: 'Быстрый ввод ставок в формате "номерМатча номерИсхода сумма, и т.д.",<br>например: 51122 1 500,51122 2 300,51122 5 100'
        });
    },

    // * отмена ставки лайв в окне с таймером
    cancelBet: function (btn) {
        var win = btn.up('panel'),
            vm = win.getViewModel(),
            fill = Ext.ComponentQuery.query('fill')[0],
            key = vm.get('key');

        fill.getEl().unmask();
        win.close();

        BasketF.basketQueue('remove', key);
        TaskF.stopTask('taskQueueDelay_' + win.getId());
    },

    // * кнопка Выбрать игрока в купоне
    clickUser: function (button, e, records) {
        var window = Ext.ComponentQuery.query('#windowSearch')[0];
        if (!window)
            window = Ext.create('Ext.Window', {
                width: 1130,
                height: 550,
                autoScroll: true,
                closeAction: 'destroy',
                title: 'Поиск игроков',
                defaultFocus: "term",
                constrain: true,
                itemId: 'windowSearch',
                modal: true,
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'formusersearch'
                    }
                ]
            });
        window.show();

        var gridsearch = window.down('gridsearch');
        // * если окно открывается в результате вызова через Быстрый ввод игрока, когда результат- несколько записей
        if (records) {
            Ext.defer(function () {
                gridsearch.store.loadData(records);
            }, 100, this);
        }

        // * переопределение ф-ий в gridsearch::controller на те, что описаны в данном контроллере
        gridsearch.getController().onCellDblclick = this.onCellDblclick;
        gridsearch.getController().loadSearchTimelineGambler = FillF.loadSearchTimelineGambler;
    },

    // * двойной щелчок по ячейке в Поиске игроков- выбрали игрока
    onCellDblclick: function (button, td, cellIndex, record, tr, rowIndex) {
        var win = button.up('window'),
            grid = win.down('gridsearch'),
            selected = grid.selection;

        if (FormCardF.isAllowedPlayer(record)) {
            FillF.validateGamerAndSave(selected);

            win.close();
        } else {
            FormCardF.sayNotAllowedPlayer(record);
        }
    },

    // * кнопка Отмена в Поиске игроков
    onClickCancel: function (button) {
        var win = button.up('window');
        win.close();
    },

    // * кнопка Выбрать таймлайн в купоне
    clickTimeline: function (button) {
        var window = Ext.create('Ext.Window', {
            width: 360,
            height: 125,
            autoScroll: true,
            title: 'Введите штрихкод ТЛ (отсканируйте чек)',
            defaultFocus: "timelineId",
            constrain: true,
            itemId: 'windowSearch',
            modal: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',
                    emptyText: '№ ТЛ',
                    itemId: 'timelineId',
                    controller: this,
                    allowBlank: false,
                    _fireEventOnEnter: true,
                    margin: 2,
                    listeners: {
                        specialkey: function (field, e) {
                            if (e.getKey() == e.ENTER) {
                                FillF.getTimelinePlayer(field.getValue());
                            }
                        },
                        afterrender: Util.validate
                    }
                },
                {
                    xtype: 'label',
                    margin: 2,
                    itemId: 'labelError'
                }
            ]
        });
        window.show();
    },

    // * кнопка "крестик"-удалить, в корзине
    onBasketRemove: function (store, records, index) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel(),
            storeBasketLocal = vmMenumain.getStore('basket_localstorage');

        storeBasketLocal.each(function (item) {
            if (item) {
                var query = item.get('query');
                if (query && query.event_id == records[0].get('event_id')
                    && query.arrCoef[1] == records[0].get('arrCoef')[1]) {
                    storeBasketLocal.remove(item);
                }
            }
        }, this);
    },

    // * срабатывает при удалении записи из купона
    onBasketClear: function (store, records, index) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel(),
            storeBasketLocal = vmMenumain.getStore('basket_localstorage');

        storeBasketLocal.removeAll();
    },

    // * добавление записи в купон
    onBasketAdd: function (store, records, index) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel(),
            storeBasketLocal = vmMenumain.getStore('basket_localstorage'),
            data = records[0].getData(),
            flag = true;

        var activeTab = BasketF.getActiveTabEventId();

        // * добавление записи в localstorage
        // * Добавлять нужно только если этой записи там еще нет
        storeBasketLocal.each(function (item) {
            var query = item.get('query');
            if (query) {
                var arrCoef = query.arrCoef,
                    coefId = arrCoef[0];
                if (coefId == data.arrCoef[0] && activeTab == query.type)
                    flag = false;
            }
        }, this);

        if (flag) {
            delete data.id;

            storeBasketLocal.add({query: data});
        }

        // * фокус на поле Ставка для Одинаров
        Ext.defer(function () {
            var gridbasketsingle = Ext.ComponentQuery.query('gridbasketsingle')[0],
                row = gridbasketsingle.getView().getRow(index);

            if (row)
                var input = row.getElementsByTagName('input')[0];

            if (input)
                input.focus();
        }, 500, this);
    },

    onDestroy: function (fill) {
        //if (WS)
        //    WS.UnsubscribeAll();
    },

});
