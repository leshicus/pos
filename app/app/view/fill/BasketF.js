// *
Ext.define('Office.view.fill.BasketF', {
    singleton: true,
    alternateClassName: ['BasketF'],

    // * перепишем данные из локального хранилища в купон, если только кэф не устарел
    fillBasketFromLocal: function (grid, timeout) {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            activeTabEvent = BasketF.getActiveTabEventId(),
            menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel(),
            storeBasketLocal = vmMenumain.getStore('basket_localstorage'),
            gridbasketexpress = Ext.ComponentQuery.query('gridbasketexpress')[0],
            vmExpress = gridbasketexpress.getViewModel(),
            storeBasketSum = vmExpress.getStore('basketSum'),
            storeSystem = vmExpress.getStore('system'),
            comboSystem = gridbasketexpress.down('#system'),
            recBasketSum = storeBasketSum.getAt(0),
            localStorage = Ext.util.LocalStorage.get('newpos'),
            multi_value = 0,
        // multi_value = localStorage.getItem('multi_value'),
            system_value = 0;
        //system_value = localStorage.getItem('system_value');

        //if (vm) {
        //Ext.defer(function () {
        var //storeBasket = vm.getStore('basket'),
            basket_count = vm.get('basket_count'),
            countStoreBasketLocal = storeBasketLocal.count(),
            arrToDelete = [];

        // * возьмем ставки из локального хранилища
        if (storeBasketLocal && storeBasketLocal.count() && grid) {
            storeBasketLocal.each(function (record) {
                var dataOld = record.get('query'),
                    data = Util.cloneObject(dataOld);

                if (data&& data.type == activeTabEvent) {
                    var event = grid.getViewModel().getStore('eventstore').findRecord('event_id', data.event_id, 0, false, true, true);

                    if (event) {
                        var arrCoef = UtilMarkets.getCoefByCoefId(grid, data.event_id, data.coefId);

                        if (!arrCoef) { // * указанный кэф закончился- попробуем подобрать преемника
                            arrCoef = UtilMarkets.cf(event.getData(), data.outcome_mnemonic_name);

//console.info(dataOld.coefId);
                            // * удалим закончившийся кэф из локального хранилища
                            delete dataOld;
                        }
//todo подбирать новые кф в купоне по мнемонике для ставок, полученных из Принятые::Копировать не получается, т.к. там нет мнемоник- outcome_mnemonic_name (а в Виртуальныъ заявках- есть)
                        if (arrCoef) {
                            multi_value = data.multi_value;
                            system_value = data.system_value;

                            if (!this.existsInBasket(data)) {// * чтобы в купон не добавлялись ставки из локального хранилища, которые не соответствуют выделенной вкладке линия/лайв

                                if (!data.created) // * по этому признаку я отделяю записи созданные из раздела Виртуальные заявки и Принятые от тех, что созданы в разделе Ставки
                                    arrToDelete.push(record);

                                MarketsHtml.addToBasket(arrCoef[0], data.amount, event);

                                basket_count++;
                                vm.set('basket_count', basket_count);
                            }
                        } else {// * Кф закрылся
                            Util.warnMes('Кф ' + data.coefName + ' закрыт, и не добавлен в купон.');

                            // * удалим закончившийся кэф из локального хранилища
                            delete dataOld;
                        }
                    }
                }else{
                    countStoreBasketLocal--;
                }
            }, this);

            if (!grid.getViewModel().get('firstFillFromLocal'))
                storeBasketLocal.remove(arrToDelete); // * чтобы вновь добавленные ставки в хранилище не дублировались с исходными

            // * если экспресс, то проставим сумму итога и систему
            if (multi_value > 0) {
                recBasketSum.set('amount', multi_value);
                Ext.defer(function () {// * стор system не поспевает
                    if (system_value > 1) {
                        if (basket_count < countStoreBasketLocal) { // * если не все ставки системы доехали до купона (какие-то кэфы закрылись и не были подобраны аналоги), то ранг системы будем сбрасывать
                           // var systemErr = system_value + ' из ' + countStoreBasketLocal;
                           // Util.erMes('Не возможно создать систему \"' + systemErr + '\" - некоторые Кф закрылись');
                            system_value = 1;
                        }

                        var recSystem = storeSystem.getAt(system_value - 1);
                        if (recSystem)
                            comboSystem.select(parseInt(system_value));
                    }
                }, 300, this);
            }

            this.getMaxMin();
        } else { // * если нет ставок в хранилище, то переключаем вкладку на одиночные
            Ext.defer(function () {
                var activeTabBet = BasketF.getActiveTabIndex();
                if (activeTabBet == 1) {
                    var tabpanelBet = fill.down('#tabpanelBet');
                    tabpanelBet.setActiveItem(0);
                }
            }, 100, this);
        }

        // * достанем ФИО игрока или ТЛ из локального хранилища
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            globals = menumain.getViewModel().get('globals'),
            use_ndfl = globals.use_ndfl,
            use_user = globals.keepRecordsOfPlayers;

        var selectedGamer = localStorage.getItem('selectedGamer'),
            timeline_id = localStorage.getItem('timeline_id'),
            balance = localStorage.getItem('balance');

        if (use_user) {
            vm.set('selectedGamer', Ext.decode(selectedGamer));
        } else if (use_ndfl) {
            vm.set('selectedGamer', Ext.decode(selectedGamer));
            vm.set('timeline_id', timeline_id);
            vm.set('balance', balance);
        }

        // * заголовок
        BasketF.setTitleBet();
        //}, timeout, this);
        //}


    },

    // * ставка с таким типом для данного турнира уже имеется в купоне
    existsInBasket: function (data) {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket'),
            flag = false;
        storeBasket.each(function (item) {
            if (item.get('coefTypeId') == data.coefTypeId
                && item.get('event_id') == data.event_id)
                flag = true;
        }, this);
        return flag;
    },

    // * сформируем заголовок Купон: ФИО
    //setTitleFio: function () {
    //    var fill = Ext.ComponentQuery.query('#main')[0],
    //        vm = fill.getViewModel(),
    //        selected = vm.get('selectedGamer'),
    //        east = fill.down('container[region=east]');
    //    if (selected) {
    //        var fio = selected.lastname + ' ' + selected.firstname,
    //            newTitle = 'Купон: ' + fio;
    //        east.setTitle(newTitle);
    //    } else {
    //        east.setTitle('Купон');
    //    }
    //},

    // * сформируем заголовок Купон: ФИО или Купон: ТЛ
    setTitleBet: function () {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            selected = vm.get('selectedGamer'),
            timeline_id = vm.get('timeline_id'),
            balance = vm.get('balance'),
            east = fill.down('container[region=east]');
        if (selected) {
            if (timeline_id) {
                var fio = selected.lastname + ' ' + selected.firstname,
                    newTitle = 'Купон: ' + fio + ' ТЛ ' + timeline_id + ': ' + balance;
                east.setTitle(newTitle);
            } else {
                var fio = selected.lastname + ' ' + selected.firstname,
                    newTitle = 'Купон: ' + fio;
                east.setTitle(newTitle);
            }
        } else {
            east.setTitle('Купон');
        }
    },

    // * сформируем заголовок Купон: ТЛ
    //setTitleTL: function () {
    //    var fill = Ext.ComponentQuery.query('#main')[0],
    //        vm = fill.getViewModel(),
    //        balance = vm.get('balance'),
    //        timeline_id = vm.get('timeline_id'),
    //        selected = vm.get('selectedGamer'),
    //        east = fill.down('container[region=east]');
    //    if (selected) {
    //        var fio = selected.lastname + ' ' + selected.firstname,
    //            newTitle = 'Купон: ' + fio + ' ТЛ ' + timeline_id + ': ' + balance;
    //        east.setTitle(newTitle);
    //    } else {
    //        east.setTitle('Купон');
    //    }
    //},

    // * окно с обратным отсчетом ставки лайв
    showDelayWindow: function (delay, key) {
        var fill = Ext.ComponentQuery.query('#main')[0],
            fillController = fill.getController(),
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket');


        var window = Ext.create('Ext.form.Panel', {
            //var window = Ext.create('Ext.Window', {
            autoScroll: true,
            floating: true,
            shadow: false,
            hidden: true,
            constrain: true,
            itemId: 'windowQueueDelay',
            //closable: true,
            modal: true,
            viewModel: {
                data: {
                    delay: delay,
                    key: key
                }
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            width: 600,
            maxHeight: 600,
            controller: fillController,
            items: [
                {
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    height: 100,
                    items: [
                        {
                            xtype: 'label',
                            itemId: 'labelDelay',
                            style: {
                                'font-size': '100px',
                                opacity: 0.5
                            },
                            padding: '10 0 0 0',
                            bind: {
                                text: '{delay}'
                            }
                        },
                    ]
                },
                {
                    xtype: 'grid',
                    itemId: 'gridDetails',
                    store: new Ext.data.Store({
                        fields: ['name', 'coefName', 'coefVal', 'amount'],
                        proxy: {
                            type: 'memory',
                            reader: {
                                type: 'json'
                            }
                        }
                    }),
                    hideHeaders: true,
                    columns: [
                        {dataIndex: 'name', flex: 1},
                        {dataIndex: 'coefName'},
                        {dataIndex: 'coefVal'},
                        {dataIndex: 'amount'}
                    ],
                    flex: 1,
                    padding: 5
                }
            ],
            buttons: [
                {
                    text: 'Отменить ставку',
                    scale: 'medium',
                    handler: 'cancelBet'
                }
            ]
        });

        var gridDetails = window.down('#gridDetails'),
            storeDetails = gridDetails.store;

        storeBasket.each(function (rec) {
            storeDetails.add({
                name: rec.get('home') + ' - ' + rec.get('away'),
                coefName: rec.get('coefName'),
                coefVal: rec.get('arrCoef')[2],
                amount: rec.get('amount')
            });
        });

        window.show();

        // * старт отсчета
        TaskF.startQueueDelay(window);
    },

    // * обновить гриды в купоне, а то там старые значения в input зависают
    refreshBasketGrids: function () {
       // console.log('refreshBasketGrids');
        var fill = Ext.ComponentQuery.query('#main')[0],
            tabpanel = fill.down('#tabpanelBet'),
            arrGrid = tabpanel.query('gridpanel'),
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket');


            arrGrid.forEach(function (item) {
                item.getView().refresh();
            });

    },

    // * обновить область кэфов
    refreshCenterArea: function () {
        var activeTabIndex = BasketF.getActiveTabIndexEvent(),
            grid = Ext.ComponentQuery.query('grideventlive')[activeTabIndex];

        if (BasketF.isDayExpress()) {
            this.dayExpressClick(grid);
        } else {
            var selection = grid.getSelectionModel().getSelection()[0];
            if (selection)
                grid.fireEventArgs('itemclick', [{}, selection]);
        }
    },

    // * применение изменившегося кэфа к купону, который пришел как ответ от сервера при постановке ставки
    //applyChangedCoef: function (arrResp /*oldCoefId, newCoefId, newCoefVal*/) {
    //    var fill = Ext.ComponentQuery.query('#main')[0],
    //        vm = fill.getViewModel(),
    //        storeBasket = vm.getStore('basket');
    //    Ext.Array.each(arrResp, function (itemOfArray) {
    //        storeBasket.each(function (item) {
    //            var arrCoef = item.get('arrCoef');
    //            //if (Ext.Array.contains(arrOldCoefId,arrCoef[0])) {
    //            if (arrCoef[0] == itemOfArray[0]) {
    //                arrCoef[0] = itemOfArray[1];
    //                arrCoef[2] = itemOfArray[2];
    //                item.set('arrCoef', arrCoef);
    //                item.set('coefId', itemOfArray[1]);
    //            }
    //        }, this);
    //    });
    //
    //    Ext.defer(function () {
    //        this.refreshBasketGrids();
    //
    //        this.refreshCenterArea();
    //        // * обновим кэфы в событиях
    //        //var activeTabIndex = BasketF.getActiveTabIndexEvent(),
    //        //    gridLive = Ext.ComponentQuery.query('grideventlive')[0],
    //        //    selection = gridLive.getSelectionModel().getSelection()[0];
    //        //gridLive.fireEventArgs('itemclick', [{}, selection]);
    //    }, 100, this);
    //},

    // * сохраним отправляемые кэфы в отдельное свойство, чтобы они хоть где-то остались, в случае изменения (изменения )
    saveArrCoef: function () {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket');

        storeBasket.suspendEvent('update');
        storeBasket.each(function (item) {
            item.set('arrCoefSent', Util.cloneObject(item.get('arrCoef')));
            item.set('coefIdSent', item.get('arrCoef')[0]);

            item.set('arrBasisSent', Util.cloneObject(item.get('arrBasis')));
            item.set('basisIdSent', item.get('arrBasis')[0]);
        }, this);
        storeBasket.resumeEvent('update');
    },

    // * сохраним отправляемые кэфы в отдельное свойство, чтобы они хоть где-то остались, в случае изменения (изменения от веб-сокетов)
    saveArrCoefBeforeUpdate: function () {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket');

        storeBasket.each(function (item) {
            item.set('arrCoefOld', Util.cloneObject(item.get('arrCoef')));
            item.set('coefIdOld', item.get('arrCoef')[0]);

            item.set('arrBasisOld', Util.cloneObject(item.get('arrBasis')));
            item.set('basisIdOld', item.get('arrBasis')[0]);
        }, this);
    },

    // * постановка в очередь для лайв
    basketQueue: function (action, key) {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket'),
            betType = this.getBetType();

        this.saveArrCoef();

        var arrBets = this.getArrBetsAmount(storeBasket, betType);

        if (arrBets.length) {// * есть ставки для отправки
            var clientId = this.getClientId(),
                timeline_id = this.getTimelineId(),
                bet_source_id = Util.BET_SOURCE_ID,
                _this = this,
                userToken = Ext.util.Cookies.get('betzet_token'),
                gridbasketexpress = Ext.ComponentQuery.query('gridbasketexpress')[0],
                vmExpress = gridbasketexpress.getViewModel(),
                storeBasketSum = vmExpress.getStore('basketSum'),
            //amount = storeBasketSum.getAt(0).get('amount'),
                system_value = vmExpress.get('system_value'),
                flag = true,
                url,
                de_id = storeBasket.getAt(0).get('de_id'),
                client_enable = true;

            var win = Ext.ComponentQuery.query('#windowQueueDelay')[0];
            if (win)
                win.close();

            switch (action) {
                case 'place':// * поместить ставку в очередь
                    if (betType == 'single') {
                        if (timeline_id) {
                            url = Ext.util.Format.format(
                                Server.getBasketQueueSingleTimeline('basket_queue'),
                                userToken,
                                arrBets,
                                betType,
                                timeline_id,
                                bet_source_id,
                                client_enable,
                                action
                            );
                        } else if (!timeline_id && clientId) {// * вести учет клиентов
                            url = Ext.util.Format.format(
                                Server.getBasketQueueSingleClientId('basket_queue'),
                                userToken,
                                arrBets,
                                betType,
                                clientId,
                                bet_source_id,
                                client_enable,
                                action
                            );
                        } else if (!timeline_id && !clientId) { // * не вести учет клиентов
                            url = Ext.util.Format.format(
                                Server.getBasketQueueSingle('basket_queue'),
                                userToken,
                                arrBets,
                                betType,
                                bet_source_id,
                                client_enable,
                                action
                            );
                        }
                    } else if (betType == 'multi') {
                        var amount = storeBasketSum.getAt(0).get('amount');
                        if (timeline_id) {
                            url = Ext.util.Format.format(
                                Server.getBasketQueueMultiTimeline('basket_queue'),
                                userToken,
                                arrBets,
                                betType,
                                timeline_id,
                                bet_source_id,
                                amount,
                                client_enable,
                                action
                            );
                        } else if (!timeline_id && clientId) {// * вести учет клиентов
                            if (de_id) {  // * Экспресс дня
                                var flags = JSON.stringify(["bet_of_the_day"]);

                                url = Ext.util.Format.format(
                                    Server.getBasketQueueMultiClientIdDay('basket_queue'),
                                    userToken,
                                    arrBets,
                                    betType,
                                    clientId,
                                    bet_source_id,
                                    amount,
                                    client_enable,
                                    de_id,
                                    flags,
                                    action
                                );
                            } else {
                                url = Ext.util.Format.format(
                                    Server.getBasketQueueMultiClientId('basket_queue'),
                                    userToken,
                                    arrBets,
                                    betType,
                                    clientId,
                                    bet_source_id,
                                    amount,
                                    client_enable,
                                    action
                                );
                            }

                        } else if (!timeline_id && !clientId) { // * не вести учет клиентов
                            url = Ext.util.Format.format(
                                Server.getBasketQueueMulti('basket_queue'),
                                userToken,
                                arrBets,
                                betType,
                                bet_source_id,
                                amount,
                                client_enable,
                                action
                            );
                        }
                    } else if (betType == 'system') {
                        var amount = storeBasketSum.getAt(0).get('amount');
                        if (timeline_id) {
                            url = Ext.util.Format.format(
                                Server.getBasketQueueSystemTimeline('basket_queue'),
                                userToken,
                                arrBets,
                                betType,
                                timeline_id,
                                bet_source_id,
                                amount,
                                system_value,
                                client_enable,
                                action
                            );
                        } else if (!timeline_id && clientId) {// * вести учет клиентов
                            url = Ext.util.Format.format(
                                Server.getBasketQueueSystemClientId('basket_queue'),
                                userToken,
                                arrBets,
                                betType,
                                clientId,
                                bet_source_id,
                                amount,
                                system_value,
                                client_enable,
                                action
                            );
                        } else if (!timeline_id && !clientId) { // * не вести учет клиентов
                            url = Ext.util.Format.format(
                                Server.getBasketQueueSystem('basket_queue'),
                                userToken,
                                arrBets,
                                betType,
                                bet_source_id,
                                amount,
                                system_value,
                                client_enable,
                                action
                            );
                        }
                    }
                    break;
                case 'remove':  // * удаление из очереди
                case 'check':   // * проверка статуса ставки в очереди
                    key = key || this.getQueueKey();
                    url = Ext.util.Format.format(
                        Server.getBasketQueueAction('basket_queue'),
                        userToken,
                        key,
                        action
                    );
                    break;
            }

            Ext.Ajax.request({
                url: url,
                useDefaultXhrHeader: false,
                method: 'POST',
                callback: function (opt, success, response) {
                    if (response.responseText) {
                        var resp = Ext.decode(response.responseText);

                        // * ответы сервера на постановку/удаление ставки лайв в очередь
                        if (resp.status == 'queued') {
                            if (resp.key) { // * первичный check, когда приходит key и delay
                                vm.set('queueKey', resp.key);

                                if (resp.delay/* && !BasketF.isDayExpress()*/) {
                                    // * показать окно с обратным отсчетом delay
                                    _this.showDelayWindow(resp.delay, resp.key);
                                } else {
                                    Ext.defer(function () {
                                        BasketF.basketQueue('check', resp.key);
                                    }, 500, this);
                                }
                            } else { // * повторный check
                                var queueKey = vm.get('queueKey');
                                if (queueKey) {
                                    Ext.defer(function () {
                                        BasketF.basketQueue('check', queueKey);
                                    }, 500, this);
                                } else {
                                    Util.erMes('Не определен ключ очереди');
                                }
                            }
                        } else if (resp.status == 'processed') {
                            if (resp.basket_response && resp.basket_response.status == 'error') {
                                _this.basketResponseError(resp);
                            } else if (resp.basket_response && resp.basket_response.status == 'ok') {
                                _this.basketResponseOk(resp.basket_response, storeBasketSum, storeBasket, userToken);
                            }
                        } else if (resp.status == 'error') { // * CLOSED_OR_CHANGED_COEFFICIENTS
                            _this.basketResponseError(resp);
                        } else if (resp.status == 'removed') { // * удалили ставку из очереди
                            Util.warnMes('Ставка отменена');
                        } else if (resp.status == 'fallback') { // * демон очереди не запущен, прием ставки по старому протоколу
                            BasketF.getMaxMin('BasketF.basketPrerequest()');
                        } else {
                            Util.warnMes(resp.status);
                        }
                    } else {
                        Util.erMes('Сервер не отвечает');
                    }
                }
            });
        } else {
            Util.erMes('Нет ставок для постановки');

            this.cleanBasketStore();
        }
    },

    // * удалить не актуальные ставки из купона - те, чей кф поменялся и стал 0
    // * или нет соответствующего кэфа в eventstore todo
    cleanBasketStore: function () {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket');

        storeBasket.each(function (item) {
            if (item) {
                var arrCoef = item.get('arrCoef');
                if (!arrCoef[2]) {
                    storeBasket.remove(item);
                }
            }
        });
    },

    // * проверка, если выделена вкладка в Событиях Экспресс дня (Пятёрочка или ДШ)
    isDayExpress: function (activeTabEventId) {
        if (!activeTabEventId) {
            activeTabEventId = BasketF.getActiveTabEventId();
        }
        return (activeTabEventId == 'dayexpress' || activeTabEventId == 'dayexpressDC');
    },

    basketResponseOk: function (resp, storeBasketSum, storeBasket, userToken) {
        Util.warnMes('Ставка совершена');
        // * удалим ставки из купона
        //storeBasketSum.setData(storeBasketSum._defaults);
        //storeBasket.removeAll();
        //
        //
        //// * очистим поля купона Серия ставок по и Общая сумма ставки
        //var checkBetSeries = Ext.ComponentQuery.query('#checkBetSeries')[0],
        //    betSeries=Ext.ComponentQuery.query('#betSeries')[0],
        //    betResult=Ext.ComponentQuery.query('#betResult')[0];
        //checkBetSeries.reset();
        //betSeries.reset();
        //betResult.reset();

        // * очистим все поля
        var fill = Ext.ComponentQuery.query('#main')[0];
        fill.getController().clickClearBet();

        // * распечатаем квитанции
        var slips = resp.response.slips,
            timeline_balance = resp.response.timeline_balance;

        // * печатаем по-очереди чеки на сделанные ставки
        if (slips && slips.length) {
            Ext.Array.each(slips, function (item) {
                Ext.defer(function () {
                    var objUrl = {
                        class: 'Pos_Pageprinter_Print',
                        params: {
                            slipId: item,
                            token: userToken
                        }
                    };
                    window.open(Server.getUrl(objUrl));
                }, 100, this);
            }, this);

            if (timeline_balance) {
                var fill = Ext.ComponentQuery.query('#main')[0],
                    vm = fill.getViewModel();
                if (vm.get('timeline_id'))
                    vm.set('balance', timeline_balance);
            }
        } else {
            Util.erMes('Ставка не создана: ' + resp.message);
        }
    },

    basketResponseError: function (resp) {
        if (resp.basket_response) {
            if (resp.basket_response.message == Util.CLOSED_OR_CHANGED_COEFFICIENTS) {
                var arrResp = resp.basket_response.response,
                    str = '',
                    _this = this,
                    arrToDelete = [];// * массив ставок в купоне к удалению

                var activeTabEvent = BasketF.getActiveTabIndexEvent(),
                    grid = Ext.ComponentQuery.query('grideventlive')[activeTabEvent],
                    selection = grid.getSelectionModel().getSelection()[0];

                if (arrResp) {
                    // * перебор массива ответа сервера
                    Ext.Array.each(arrResp, function (item) {
                        var old_cf_id = item.cf_id;

                        if (str)
                            str += '<br>';

                        if (item.message == Util.BETTING_CLOSED) {// * исчезли кэфы
                            //var cf_id = item.cf_id;
                            str += 'Кф. закрылся и событие было удалено из купона: ';

                            // * составим текст сообщения об отклоненных ставках
                            str += _this.getClosedBetText(old_cf_id);

                            // * ставки к удалению из купона
                            arrToDelete.push(old_cf_id);

                            // * удалим исходный кэф
                            BasketF.changeOriginalCoef(old_cf_id);
                            //Util.erMes(str, function () {
                            //    // * очистим ставки в купоне, которые относятся к данному событию
                            //    BasketF.clearClosedBets(arrToDelete);
                            //
                            //    if (selection)
                            //        grid.fireEventArgs('itemclick', [{}, selection]);
                            //
                            //    FayeClient.sendCommand({command: 'hide_modal'});
                            //});
                        } else if (item.message == Util.COEFFICIENT_CHANGED) {// * поменялись кэфы
                            // * применим новый кэф в купоне
                            var cf_id = item.data.cf_id,
                                cf_value = item.data.cf_value,
                                odds_id = item.data.odds_id,
                                odds_value = item.data.odds_value,
                                cf_valueFormatted;

                            if (cf_id) {
                                cf_valueFormatted = '<span role="button" style="font-weight: 600;color:green;">' + cf_value + '</span>';
                                str += 'Кф. изменился: ' + _this.getClosedBetText(old_cf_id) + ' \u2192 ' + '(' + cf_valueFormatted + '). '; //todo иногда не ставится исходный кэф 02102015

                                // * поменяем исходный кэф, на тот, что пришел
                                BasketF.changeOriginalCoef(old_cf_id, cf_id, cf_value);

                                //Util.erMes(str, function () {
                                //    if (selection)
                                //        grid.fireEventArgs('itemclick', [{}, selection]);
                                //
                                //    FayeClient.sendCommand({command: 'hide_modal'});
                                //});
                            }

                            if (odds_id) {
                                cf_valueFormatted = '<span role="button" style="font-weight: 600;color:green;">' + odds_value + '</span>';
                                str += '<br>Базис изменился: ' + _this.getClosedBetText(old_cf_id, odds_id) + ' \u2192 ' + '(' + cf_valueFormatted + '). ';

                                // * поменяем исходный кэф, на тот, что пришел
                                BasketF.changeOriginalCoef(old_cf_id, odds_id, odds_value, 1);

                                //Util.erMes(str, function () {
                                //    if (selection)
                                //        grid.fireEventArgs('itemclick', [{}, selection]);
                                //
                                //    FayeClient.sendCommand({command: 'hide_modal'});
                                //});
                            }
                        } else {
                            console.info(str);
                            str += item.message;
                            //Util.erMes(str);
                        }
                    }, this);

                    Util.erMes(str, function () {
                        // * очистим ставки в купоне, которые относятся к данному событию
                        BasketF.clearClosedBets(arrToDelete);

                        if (selection)
                            grid.fireEventArgs('itemclick', [{}, selection]);

                        FayeClient.sendCommand({command: 'hide_modal'});
                    });

                    MonitorF.sendChangedBetsToMonitor(arrResp);
                    MonitorF.sendBetsToMonitor();
                } else {
                    Util.erMes('Неизвестная ошибка');
                    console.info(resp);
                }
            } else if (resp.basket_response.message == Util.WRONG_CASH_OR_CLUB) { // * таймлайн принят в другой кассе
                Util.erMes('Ставка Таймлайн создана не в этом клубе.');
            } else {
                Util.erMes(resp.basket_response.message);
            }
        } else {
            Util.erMes(resp.message || 'Неизвестная ошибка');
        }
    },

    // * старый кэф удаляем, а новый добавляем
    changeOriginalCoef: function (oldCoef, newCoef, newVal, isBasis) {// * isBasis - признак, что это относится к базису
        //if (isBasis)
        //    console.info(arguments);
        // * найдем ставку в купоне
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket'),
            activeTab = BasketF.getActiveTabIndexEvent(),
            grideventlive = Ext.ComponentQuery.query('grideventlive')[activeTab],
            vmEvent = grideventlive.getViewModel(),
            storeEvent = vmEvent.getStore('eventstore');

        //if (isBasis) {
        //    var bet = storeBasket.findRecord('basisIdSent', oldCoef, 0, false, true, true);
        //} else {
        var bet = storeBasket.findRecord('coefIdSent', oldCoef, 0, false, true, true);
        //}

        if (bet) {
            // * найдем исходный кэф в eventstore
            var event_id = bet.get('event_id'),
                event = storeEvent.findRecord('event_id', event_id, 0, false, true, true),
                arrBasis = bet.get('arrBasis'),
                arrCoef = bet.get('arrCoef');

            if (isBasis) {
                var mnemonic = UtilMarkets.getMnemonicByCoefId(grideventlive, event_id, arrBasis[0]);
            } else {
                var mnemonic = UtilMarkets.getMnemonicByCoefId(grideventlive, event_id, oldCoef);
            }

            if (event) {
                var cs = event.get('cs'),
                    cse = event.get('cse');

                // * обновим исходник (eventstore)
                if (cs && cs[mnemonic]) {
                    if (newCoef) { // * изменение старого кэфа
                        cs[mnemonic][0] = newCoef;
                        cs[mnemonic][3] = cs[mnemonic][2];
                        cs[mnemonic][2] = newVal;

                        if (isBasis) {
                            cs[mnemonic][4] = '(' + newVal + ')';
                        }
                    } else {// * удаление старого кэфа
                        delete  cs[mnemonic];
                    }
                }

                if (cse && cse[mnemonic]) {
                    if (newCoef) { // * изменение старого кэфа
                        cse[mnemonic][0] = newCoef;
                        cse[mnemonic][3] = cse[mnemonic][2];
                        cse[mnemonic][2] = newVal;

                        if (isBasis) {
                            cse[mnemonic][4] = '(' + newVal + ')';
                        }
                    } else {// * удаление старого кэфа
                        delete  cse[mnemonic];
                    }
                }

                // * обновим купон
                if (isBasis) {
                    arrBasis[0] = newCoef;
                    arrBasis[3] = arrBasis[2];
                    arrBasis[2] = newVal;
                    arrBasis[4] = '(' + newVal + ')';

                    bet.set('coefName', BasketF.getCoefShortName(arrCoef[1], newVal));
                } else {
                    if (newCoef) { // * изменение старого кэфа
                        arrCoef[0] = newCoef;
                        arrCoef[3] = arrCoef[2];
                        arrCoef[2] = newVal;
                        bet.set('coefId', newCoef);
                    } else {// * удаление старого кэфа
                        //storeBasket.remove(bet);
                    }
                }
            } else {  // * в купоне есть ставка, а в исходнике- нет?
                // * удалить из купона ставку
            }
        }
    },

    basketPrerequest: function () {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket'),
            clientId = this.getClientId(),
            timeline_id = this.getTimelineId(),
            betType = this.getBetType(),
            bet_source_id = Util.BET_SOURCE_ID,
            _this = this,
            userToken = Ext.util.Cookies.get('betzet_token'),
            gridbasketexpress = Ext.ComponentQuery.query('gridbasketexpress')[0],
            vmExpress = gridbasketexpress.getViewModel(),
            storeBasketSum = vmExpress.getStore('basketSum'),
            system_value = vmExpress.get('system_value');

        // * сохраним coefId в свойство coefSentId
        this.saveArrCoef();

        var arrBets = this.getArrBetsAmount(storeBasket, betType);

        if (betType == 'single') {
            if (timeline_id) {
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestSingleTimeline('basket_prerequest'),
                    userToken,
                    arrBets,
                    betType,
                    timeline_id,
                    bet_source_id
                );
            } else if (!timeline_id && clientId) {// * вести учет клиентов
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestSingleClientId('basket_prerequest'),
                    userToken,
                    arrBets,
                    betType,
                    clientId,
                    bet_source_id
                );
            } else if (!timeline_id && !clientId) { // * не вести учет клиентов
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestSingle('basket_prerequest'),
                    userToken,
                    arrBets,
                    betType,
                    bet_source_id
                );
            }
        } else if (betType == 'multi') {
            var amount = storeBasketSum.getAt(0).get('amount');
            if (timeline_id) {
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestMultiTimeline('basket_prerequest'),
                    userToken,
                    arrBets,
                    betType,
                    timeline_id,
                    bet_source_id,
                    amount
                );
            } else if (!timeline_id && clientId) {// * вести учет клиентов
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestMultiClientId('basket_prerequest'),
                    userToken,
                    arrBets,
                    betType,
                    clientId,
                    bet_source_id,
                    amount
                );
            } else if (!timeline_id && !clientId) { // * не вести учет клиентов
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestMulti('basket_prerequest'),
                    userToken,
                    arrBets,
                    betType,
                    bet_source_id,
                    amount
                );
            }
        } else if (betType == 'system') {
            var amount = storeBasketSum.getAt(0).get('amount');
            if (timeline_id) {
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestSystemTimeline('basket_prerequest'),
                    userToken,
                    arrBets,
                    betType,
                    timeline_id,
                    bet_source_id,
                    amount,
                    system_value
                );
            } else if (!timeline_id && clientId) {// * вести учет клиентов
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestSystemClientId('basket_prerequest'),
                    userToken,
                    arrBets,
                    betType,
                    clientId,
                    bet_source_id,
                    amount,
                    system_value
                );
            } else if (!timeline_id && !clientId) { // * не вести учет клиентов
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestSystem('basket_prerequest'),
                    userToken,
                    arrBets,
                    betType,
                    bet_source_id,
                    amount,
                    system_value
                );
            }
        }
        // * запрос к серверу
        Ext.Ajax.request({
            //url: 'http://vocxod.com/api/index.php',
            url: url,
            useDefaultXhrHeader: false,
            method: 'POST',
            callback: function (opt, success, response) {
                if (response.responseText) {
                    var resp = Ext.decode(response.responseText);
                    if (resp.status == 'ok') {
                        // * делаем ставку
                        _this.basketPlaceBets(storeBasket);
                        return true;
                    } else if (resp.status == 'error') { // * CLOSED_OR_CHANGED_COEFFICIENTS
                        _this.basketResponseError(resp);
                    } else {
                        Util.erMes(resp.message);
                        return false;
                    }
                } else {
                    Util.erMes('Сервер не отвечает');
                    return false;
                }
            }
        });
    },

    basketPlaceBets: function () {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket'),
            bet_source_id = Util.BET_SOURCE_ID,
            clientId = this.getClientId(),
            timeline_id = this.getTimelineId(),
            betType = this.getBetType(),
            userToken = Ext.util.Cookies.get('betzet_token'),
            gridbasketexpress = Ext.ComponentQuery.query('gridbasketexpress')[0],
            vmExpress = gridbasketexpress.getViewModel(),
            storeBasketSum = vmExpress.getStore('basketSum'),
        //amount = storeBasketSum.getAt(0).get('amount'),
            system_value = vmExpress.get('system_value'),
            _this = this;

        this.saveArrCoef();

        var arrBets = this.getArrBetsAmount(storeBasket, betType);

        if (betType == 'single') {
            if (timeline_id) {
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestSingleTimeline('basket_place_bets'),
                    userToken,
                    arrBets,
                    betType,
                    timeline_id,
                    bet_source_id
                );
            } else if (!timeline_id && clientId) {// * вести учет клиентов
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestSingleClientId('basket_place_bets'),
                    userToken,
                    arrBets,
                    betType,
                    clientId,
                    bet_source_id
                );
            } else if (!timeline_id && !clientId) { // * не вести учет клиентов
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestSingle('basket_place_bets'),
                    userToken,
                    arrBets,
                    betType,
                    bet_source_id
                );
            }
        } else if (betType == 'multi') {
            var amount = storeBasketSum.getAt(0).get('amount');
            if (timeline_id) {
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestMultiTimeline('basket_place_bets'),
                    userToken,
                    arrBets,
                    betType,
                    timeline_id,
                    bet_source_id,
                    amount
                );
            } else if (!timeline_id && clientId) {// * вести учет клиентов
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestMultiClientId('basket_place_bets'),
                    userToken,
                    arrBets,
                    betType,
                    clientId,
                    bet_source_id,
                    amount
                );
            } else if (!timeline_id && !clientId) { // * не вести учет клиентов
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestMulti('basket_place_bets'),
                    userToken,
                    arrBets,
                    betType,
                    bet_source_id,
                    amount
                );
            }
        } else if (betType == 'system') {
            var amount = storeBasketSum.getAt(0).get('amount');
            if (timeline_id) {
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestSystemTimeline('basket_place_bets'),
                    userToken,
                    arrBets,
                    betType,
                    timeline_id,
                    bet_source_id,
                    amount,
                    system_value
                );
            } else if (!timeline_id && clientId) {// * вести учет клиентов
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestSystemClientId('basket_place_bets'),
                    userToken,
                    arrBets,
                    betType,
                    clientId,
                    bet_source_id,
                    amount,
                    system_value
                );
            } else if (!timeline_id && !clientId) { // * не вести учет клиентов
                var url = Ext.util.Format.format(
                    Server.getBasketPrerequestSystem('basket_place_bets'),
                    userToken,
                    arrBets,
                    betType,
                    bet_source_id,
                    amount,
                    system_value
                );
            }
        }

        // * запрос к серверу
        Ext.Ajax.request({
            url: url,
            useDefaultXhrHeader: false,
            method: 'POST',
            callback: function (opt, success, response) {
                if (response.responseText) {
                    var resp = Ext.decode(response.responseText);
                    if (resp.status == 'ok') {
                        _this.basketResponseOk(resp, storeBasketSum, storeBasket, userToken);
                    } else if (resp.status == 'error') { // * CLOSED_OR_CHANGED_COEFFICIENTS
                        _this.basketResponseError(resp);
                    } else {
                        Util.erMes(resp.message);
                        return false;
                    }
                } else {
                    Util.erMes('Сервер не отвечает');
                    return false;
                }
            }
        });
    },

    // * получить данные по min max, а так же пересчитать Кф и Выигрыш в таблице Итог
    getMaxMin: function (func) { // * func- ф-ия для запуска в колбэке
        var fill = Ext.ComponentQuery.query('#main')[0],
            vmFill = fill.getViewModel(),
            storeBasket = vmFill.getStore('basket'),
            flag = true, // * признак, что все ок и можно отправлять ставку
            userToken = Ext.util.Cookies.get('betzet_token'),
            arrBets = this.getArrBets(storeBasket),
            betType = this.getBetType(),
            gridbasketexpress = Ext.ComponentQuery.query('gridbasketexpress')[0],
            vmExpress = gridbasketexpress.getViewModel(),
            system_value = vmExpress.get('system_value');

        if (arrBets && arrBets.length) {
            if (betType == 'system') {
                var url = Ext.util.Format.format(
                    Server.getBasketLimitsSystem(),
                    userToken,
                    arrBets,
                    betType,
                    system_value
                );
            } else if (betType == 'single') {
                var url = Ext.util.Format.format(
                    Server.getBasketLimitsSingle(),
                    userToken,
                    arrBets,
                    betType
                );
            } else if (betType == 'multi') {
                var url = Ext.util.Format.format(
                    Server.getBasketLimitsMulti(),
                    userToken,
                    arrBets,
                    betType
                );
            }

            // * запрос к серверу
            Ext.Ajax.request({
                url: url,
                //url: 'http://vocxod.com/api/index.php',
                useDefaultXhrHeader: false,
                method: 'POST',
                callback: function (opt, success, response) {
                    if (response.responseText) {
                        var resp = Ext.decode(response.responseText);
                        if (resp.status == 'ok') {
                            var multi = resp.response.multi,
                                single = resp.response.single;

                            // * для одиночных ставок
                            if (single && Ext.Object.getSize(single.value_size)) {
                                // * перебор кэфов, key- это coefId, arrCoef[0]
                                Ext.Object.each(single.value_size, function (key, val) {
                                    // * найдем сооветствующую ключу ставку в корзине
                                    storeBasket.each(function (rec) {
                                        if (rec && rec.get('arrCoef')[0] == key) {
                                            rec.set('min', val[0]);
                                            rec.set('max', val[1]);
                                            // * если вкладка Одиночные активная, то проверим, что сумма ставки соответствует лимиту
                                            if (betType == 'single') {
                                                if (rec.get('amount')) {
                                                    if (rec.get('amount') < rec.get('min')) {
                                                        if (func)
                                                            BasketF.checkBetMaxMin(null, rec.get('min'), rec.get('max'));
                                                        flag = false;
                                                    } else if (rec.get('amount') > rec.get('max') || rec.get('min') >= rec.get('max') || rec.get('max') == 0) {
                                                        if (func)
                                                            BasketF.checkBetMaxMin(null, rec.get('min'), rec.get('max'));
                                                        flag = false;
                                                    }
                                                } else {// * NaN когда в поле ставка были введены не валидные цифры
                                                    rec.set('amount', 0);
                                                }
                                            }
                                        }
                                    }, this);
                                }, this);
                            }

                            // * для экспрессов
                            if (multi && Ext.Object.getSize(multi.value_size)) {
                                var fill = Ext.ComponentQuery.query('#main')[0],
                                    gridbasketexpress = fill.down('gridbasketexpress'),
                                    vmBE = gridbasketexpress.getViewModel(),
                                    getCoefMulti = function (basket_chained) { // * перемножение кэфов экспресса
                                        var coefSum = 0;
                                        if (basket_chained) {
                                            basket_chained.each(function (item, idx) {
                                                var arrCoef = item.get('arrCoef');
                                                if (arrCoef) {
                                                    if (idx == 0)
                                                        coefSum = parseFloat(arrCoef[2]);
                                                    else
                                                        coefSum *= parseFloat(arrCoef[2]);
                                                }
                                            }, this);
                                        }
                                        return coefSum.toFixed(2);
                                    },
                                    coef = getCoefMulti(gridbasketexpress.getStore());

                                var storeBasketSum = vmBE.getStore('basketSum');
                                if (storeBasketSum.count()) {
                                    var amount = storeBasketSum.getAt(0).get('amount'),
                                        rec = [{
                                            coef: coef,
                                            min: multi.value_size[0],
                                            max: multi.value_size[1],
                                            amount: amount
                                        }];
                                    storeBasketSum.loadData(rec);

                                    // * если вкладка Экспрессы активная, то проверим, что сумма ставки соответствует лимиту
                                    if (betType == 'multi') {
                                        if (rec[0].amount) {
                                            if (rec[0].amount < rec[0].min) {
                                                if (func)
                                                    BasketF.checkBetMaxMin(null, rec[0].min, rec[0].max);
                                                flag = false;
                                            } else if (rec[0].amount > rec[0].max || rec[0].max == 0 || rec[0].min >= rec[0].max) {
                                                if (func)
                                                    BasketF.checkBetMaxMin(null, rec[0].min, rec[0].max);
                                                flag = false;
                                            }
                                        } else {// * NaN когда в поле ставка были введены не валидные цифры
                                            rec[0].amount = 0;
                                        }
                                    }
                                }
                            }

                            if (flag && func)
                                eval(func);
                        } else {
                            Util.erMes(resp.message);
                        }
                    } else {
                        Util.erMes('Сервер не отвечает');
                    }
                }
            });
        }
        return flag;
    },

    // * тип ставки, single/multi/system
    getBetType: function () {
        var activeTabIndex = this.getActiveTabIndex(),
            type = activeTabIndex == 0 ? 'single' : 'multi',
            gridbasketexpress = Ext.ComponentQuery.query('gridbasketexpress')[0],
            vmExpress = gridbasketexpress.getViewModel(),
            system_value = vmExpress.get('system_value');
        if (system_value > 1 && type == 'multi')
            type = 'system';
        return type;
    },

    // * убрать из купона ставки по просроченным событиям
    clearClosedBets: function (arrCoefId) {
        console.log('clearClosedBets');
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket'),
            arrDelete = [];
        storeBasket.each(function (item) {
            if (item) {// * иначе ругается, что метод item.get не определен
                if (Ext.Array.contains(arrCoefId, item.get('coefIdSent'))) {
                    arrDelete.push(item);
                }
            }
        }, this);
        storeBasket.remove(arrDelete);

        vm.set('basket_count', storeBasket.count());
    },

    getClosedBetText: function (coefId, odds_id) {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket'),
            out = '';

        var rec = storeBasket.findRecord('coefIdSent', coefId, 0, false, true, true);

        if (rec) {
            var homeAway = rec.get('home') + ' - ' + rec.get('away'),
                coefName = rec.get('coefName');
            if (odds_id) { // * поменялся базис
                var cf = rec.get('arrBasisSent')[2];
            } else {
                var cf = rec.get('arrCoefSent')[2];
            }

            homeAway = '<span role="button" style="font-weight: 600;">' + homeAway + '</span>';
            cf = '<span role="button" style="font-weight: 600;color:red;">' + cf + '</span>';
            coefName = '<span role="button" style="font-weight: 600;">' + coefName + '</span>';
            out = homeAway + ', ' + coefName + ' (' + cf + ')';
        } else {
            console.info('не найдена запись', coefId, rec, storeBasket); //todo почему такое бывает?
        }
        return out;
    },

    // * массив ставок с базисами
    getArrBets: function (storeBasket) {
        var arrBets = [];
        storeBasket.each(function (item) {
            var arrBasis = item.get('arrBasis'),
                arrCoef = item.get('arrCoef');
            if (arrBasis.length > 1)
                var el = [arrCoef[0], arrBasis[0]];
            else
                var el = [arrCoef[0], 0];
            arrBets.push(el);
        }, this);
        if (arrBets.length)
            return JSON.stringify(arrBets);
        else
            return null;
    },

    // * получить массив ставок с базисами и суммами
    getArrBetsAmount: function (storeBasket, type) {
        var arrBets = [];
        storeBasket.each(function (item) {
            var arrBasis = item.get('arrBasis'),
                arrCoef = item.get('arrCoef'),
                amount = item.get('amount');

            if (type == 'single') {
                if (arrBasis.length > 1)
                    var el = [arrCoef[0], arrBasis[0], amount];
                else
                    var el = [arrCoef[0], 0, amount];
            } else if (type == 'multi' || type == 'system') {
                if (arrBasis.length > 1)
                    var el = [arrCoef[0], arrBasis[0]];
                else
                    var el = [arrCoef[0], 0];
            }

            arrBets.push(el);
        }, this);
        return JSON.stringify(arrBets);
    },

    // * получить указанного игрока
    getClientId: function () {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vmFill = fill.getViewModel(),
            selectedGamer = vmFill.get('selectedGamer'),
            menumain = Ext.ComponentQuery.query('menumain')[0],
            globals = menumain.getViewModel().get('globals');

        if (selectedGamer) {
            var clientId = selectedGamer.id;
            return clientId;
        } else if (globals.keepRecordsOfPlayers) {
            Util.erMes('Не указан игрок');
            return null;
        } else if (globals.use_ndfl) {
            Util.erMes('Не указан ТЛ');
            return null;
        } else {
            return null;
        }
    },

    // * получить указанный ТЛ
    getTimelineId: function () {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vmFill = fill.getViewModel(),
            timelineId = vmFill.get('timeline_id');
        return timelineId;
    },

    // * ключ очереди ставки
    getQueueKey: function () {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vmFill = fill.getViewModel(),
            timelineId = vmFill.get('key');
        return timelineId;
    },

// * краткое наименование кэфа
    getCoefShortName: function (coefTypeId, basis) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmmenumain = menumain.getViewModel(),
            storeOutcomes = vmmenumain.getStore('outcomes'),
            recOutcomes = storeOutcomes.getAt(0), // * модель, в которой поля объекты: groupNames, mnemonics и др. outcomes
            oddsOutcomeIdsByOutcomeId = recOutcomes.get('oddsOutcomeIdsByOutcomeId'),// * соответствие coefId : basisId
            mnemonics = recOutcomes.get('mnemonics'),
            objSlipOutcomeNames = recOutcomes.get('slipOutcomeNames'),// * название коэфф.
            coeffName = objSlipOutcomeNames[coefTypeId];

        if (coeffName) {
            coeffName = coeffName.toString();
            // * для получения знака базиса действует правила перемножения (-ODDS * -basis = +basis, -ODDS * basis = -basis)
            if (basis == 0) {
                coeffName = coeffName.replace("-ODDS", '+' + Math.abs(basis)).replace("+ODDS", '+' + Math.abs(basis));
            } else if (basis < 0) {
                coeffName = coeffName.replace("-ODDS", '+' + Math.abs(basis)).replace("+ODDS", '-' + Math.abs(basis));
            } else if (basis > 0) {
                coeffName = coeffName.replace("-ODDS", '-' + Math.abs(basis)).replace("+ODDS", '+' + Math.abs(basis));
            }
            coeffName = coeffName.replace("ODDS", basis);
        } else {
            console.info('coeffName is null', arguments);
            coeffName = null;
        }

        return coeffName;
    },

    getCoefShortNameByCoefId: function (coefId) {
        console.info('getCoefShortNameByCoefId');
        var activeTabIndexEvent = this.getActiveTabIndexEvent(),
            gridEvent = Ext.ComponentQuery.query('grideventlive')[activeTabIndexEvent],
            vmGrid = gridEvent.getViewModel(),
            eventstore = vmGrid.getStore('eventstore');

        // * найдем турнир, к которому относится данный кэф
        var event = eventstore.findBy(function (item) {
            var coef = UtilMarkets.getCoefByCoefId(gridEvent, item.get('event_id'), coefId);
            if (coef) {
                var event_id = item.get('event_id'),
                    menumain = Ext.ComponentQuery.query('menumain')[0],
                    vmMenumain = menumain.getViewModel(),
                    storeOutcomes = vmMenumain.getStore('outcomes'),
                    recOutcomes = storeOutcomes.getAt(0), // * модель, в которой поля объекты: groupNames, mnemonics и др. outcomes
                    oddsOutcomeIdsByOutcomeId = recOutcomes.get('oddsOutcomeIdsByOutcomeId'),// * соответствие coefId : basisId
                    mnemonics = recOutcomes.get('mnemonics'),
                    objSlipOutcomeNames = recOutcomes.get('slipOutcomeNames'),// * название коэфф.
                    coef = UtilMarkets.getCoefByCoefId(gridEvent, event_id, coefId),
                    coefTypeId = coef[1],
                    coeffName = objSlipOutcomeNames[coefTypeId].toString(),
                    basisTypeId = oddsOutcomeIdsByOutcomeId[coefTypeId],
                    basis = UtilMarkets.getCoefByCoefTypeId(basisTypeId, gridEvent, event_id);

                if (basis == 0) {
                    coeffName = coeffName.replace("-ODDS", '+' + Math.abs(basis)).replace("+ODDS", '+' + Math.abs(basis));
                } else if (basis < 0) {
                    coeffName = coeffName.replace("-ODDS", '+' + Math.abs(basis)).replace("+ODDS", '-' + Math.abs(basis));
                } else if (basis > 0) {
                    coeffName = coeffName.replace("-ODDS", '-' + Math.abs(basis)).replace("+ODDS", '+' + Math.abs(basis));
                }
                coeffName = coeffName.replace("ODDS", basis);
                return coeffName;
            }
        }, this);
        return;
    },

// * активная вкладка в купоне
    getActiveTabIndex: function () {
        var fill = Ext.ComponentQuery.query('#main')[0],
            tabpanel = fill.down('#tabpanelBet');
        if (tabpanel) {
            var activeTab = tabpanel.getActiveTab(),
                activeTabIndex = tabpanel.items.findIndex('id', activeTab.id);
            return activeTabIndex;
        }
        return null;
    },

// * активная вкладка в событиях
    getActiveTabIndexEvent: function () {
        var fill = Ext.ComponentQuery.query('#main')[0],
            tabpanel = fill.down('#eventstab');
        if (tabpanel) {
            var activeTab = tabpanel.getActiveTab();
            if (activeTab) {
                var activeTabIndex = tabpanel.items.findIndex('id', activeTab.id);
                return activeTabIndex;
            } else
                return null;
        } else
            return 0;
    },

    // * активная вкладка в событиях - название
    getActiveTabEventName: function () {
        var fill = Ext.ComponentQuery.query('#main')[0];
        if (fill) {
            var tabpanel = fill.down('#eventstab');
            if (tabpanel) {
                var activeTab = tabpanel.getActiveTab();
                if (activeTab) {
                    return activeTab.title;
                } else
                    return null;
            } else
                return null;
        }
    },

    // * активная вкладка в событиях - itemId
    getActiveTabEventId: function () {
        var fill = Ext.ComponentQuery.query('#main')[0];
        if (fill) {
            var tabpanel = fill.down('#eventstab');
            if (tabpanel) {
                var activeTab = tabpanel.getActiveTab();
                if (activeTab) {
                    return activeTab.getItemId();
                } else
                    return null;
            } else
                return null;
        }
    },

    // * выделить поле ввода Ставка в купоне
    selectBetField: function (tabpanel, storeBasket, coefTypeId) {
        var tab = tabpanel.getActiveTab(),
            xtype = tab.getXType();

        switch (xtype) {
            case 'gridbasketsingle':
                //var rec = storeBasket.findRecord('coefTypeId', coefTypeId, 0, false, true, true);
                //if (rec) {
                //    var id = rec.get('id'),
                //        input = Ext.get(id);
                //    if (input)
                //        //input.focus(10);
                //        document.getElementById(id).select();
                //}
                break;
            case 'gridbasketexpress':
                var gridBasketSum = tab.down('#gridBasketSum'),
                    editor = gridBasketSum.getPlugin('cellEditorId');
                editor.startEditByPosition({
                    row: 0,
                    column: 2
                });
                break;
        }
    },

    // * быстрый ввод ставок
    addFastInput: function (field) {
        var text = field.getValue(),
            arrValue = this.parseFastInput(text);
        if (arrValue.length) {
            Ext.Array.each(arrValue, function (arrBlock) {// * перебор блоков параметров
                if (arrBlock.length >= 2) {
                    var eventId = arrBlock[0],
                        coefNum = arrBlock[1],
                        amount = arrBlock[2] || 0;
                    MarketsHtml.addToBasketFastInput(eventId, coefNum, amount);
                }
            });
        }
    },

    // * разобрать строку быстрого ввода ставок
    parseFastInput: function (text) {
        var reg = new RegExp('\\.', 'g'),
            text = text.replace(reg, ','), // * заменим точки на запятые
            arrStr = text.split(','), // * разделим текст на блоки параметров
            arrParsed = Ext.Array.map(arrStr, function (item) { // * разделим блок на отдельные параметры
                var arrParams = item.split(' '),
                    arrTrimmedParams = Ext.Array.map(arrParams, function (param) {
                        var out = param.trim();
                        if (out)
                            return out; // * удалим лижние пробелы в параметре
                    }),
                    arrFiltered = Ext.Array.filter(arrTrimmedParams, function (item) {// * удалим пустые элементы из массива
                        if (item)
                            return true;
                    });
                return arrFiltered;
            });
        return arrParsed;
    },

    checkBetMaxMin: function (input, min, max) {
        Util.erMes('Ставка не соответствует лимитам: ' + min + '..' + max, function (btn) {
            // * вторая попытка ввода суммы
            if (btn == 'ok' && input) {
                input.select();
            }
        });
    },

});