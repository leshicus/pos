// * ф-ии для fill
Ext.define('Office.view.fill.FillF', {
    singleton: true,
    alternateClassName: ['FillF'],

    // * очистка store basketSum
    clearBasketSum: function () {
        var gridbasketexpress = Ext.ComponentQuery.query('gridbasketexpress')[0];
        if (gridbasketexpress) {
            var basketSum = gridbasketexpress.getViewModel().getStore('basketSum');
            basketSum.loadData(basketSum._defaults);
        }
    },

    // * актуализация betResult (обшая сумма ставки) и prize (возможный выигрыш) для Одинаров
    actualPrizeAndBetResult: function () {
        var gridbasketsingle = Ext.ComponentQuery.query('gridbasketsingle')[0],
            vmSingle = gridbasketsingle.getViewModel(),
            fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket'),
            betResult = gridbasketsingle.down('#betResult'),
            sum = 0,
            coef = 0,
            prize = 0;

        storeBasket.each(function (item) {
            var amount = item.get('amount') || 0,
                cf = item.get('arrCoef')[2] || 0;
            sum += parseInt(amount);
            //coef += parseFloat(cf) || 0;
            prize += parseInt(amount) * parseFloat(cf);
        }, this);

        vmSingle.set('prize', prize.toFixed(2));

        // * Общая сумма ставки
        betResult.suspendEvent('change'); // * чтобы метод change в этот раз не срабатывал
        vmSingle.set('betResult', sum.toFixed(2));
        Ext.defer(function () {
            betResult.resumeEvent('change');
        }, 100, this);
    },

    getTimelinePlayer: function (timeline_id) {
        var window = Ext.ComponentQuery.query('#windowSearch')[0],
            labelError = window.down('#labelError'),
            url = Ext.util.Format.format(
                Server.getTimelinePlayer(),
                Ext.util.Cookies.get('betzet_token'),
                timeline_id
            );

        Ext.Ajax.request({
            url: url,
            success: function (resp) {
                var res = Gui.JSONDecodeSafe(resp.responseText);
                if (res.status == 'ok') {

                    // * добавим фио игрока в заголовок после Купон
                    var fill = Ext.ComponentQuery.query('#main')[0],
                        vmFill = fill.getViewModel(),
                        selected = res.response;

                    vmFill.set('balance', selected.balance);
                    vmFill.set('timeline_id', selected.timeline_id);
                    vmFill.set('selectedGamer', selected.player);

                    // * заголовок
                    BasketF.setTitleBet();

                    // * сохраним ТЛ в хранилище
                    // var localStorage = vmFill.getStore('localStorage');
                    var localStorage = Ext.util.LocalStorage.get('newpos');
                    localStorage.setItem('selectedGamer', Ext.encode(selected.player));
                    localStorage.setItem('timeline_id', selected.timeline_id);
                    localStorage.setItem('balance', selected.balance);

                    window.close();
                } else
                    labelError.setText('Ошибка: ' + res.message);
            },
            failure: Util.fatalError,
            method: 'POST'
        });
    },

    // * сохранение выделенного игрока в VM
    saveGamerToViewModel: function (selected) {
        // * добавим фио игрока в заголовок после Купон
        var fill = Ext.ComponentQuery.query('#main')[0],
            vmFill = fill.getViewModel();
        if (typeof selected.getData == 'function')
            var selectedGamer = selected.getData();
        else
            var selectedGamer = selected;
        vmFill.set('selectedGamer', selectedGamer);
        vmFill.set('timeline_id', '');

        // * заголовок
        BasketF.setTitleBet();

        // * сохраним игрока в хранилище
        // var localStorage = vmFill.getStore('localStorage');
        var localStorage = Ext.util.LocalStorage.get('newpos');
        localStorage.setItem('selectedGamer', Ext.encode(selectedGamer));
        localStorage.setItem('timeline_id', '');

        var fio = selectedGamer['lastname'] + ' ' + selectedGamer['firstname'] + ' ' + selectedGamer['patronymic_name'] + ', ' + selectedGamer['id'];
        Util.warnMes('Выбран игрок: ' + fio);

        FayeClient.sendCommand({command: 'hide_modal'});
    },

    // * после загрузки стора gridsearch - поиск игрока
    loadSearchTimelineGambler: function (store, records) {
        if (!records.length)
            Util.erMes('Игрок не найден');
        else if (records.length == 1) {
            FillF.saveGamerToViewModel(records[0]);

            Ext.defer(function () {// * иначе какая-то ошибка возникает
                var win = Ext.ComponentQuery.query('#windowSearch')[0];
                win.close();
            }, 100, this);
        }
    },

    loadRawDayExpress: function (dayExpress, id) {
        Ext.defer(function () {
            var gridDayExpress = Ext.ComponentQuery.query('#main #' + id)[0],
                vmDayExpress = gridDayExpress.getViewModel(),
                storeRawDayExpress = vmDayExpress.getStore('rawdata');
            if (storeRawDayExpress) {
                var result = storeRawDayExpress.loadRawData(dayExpress);
                if (result) {
                    vmDayExpress.runnerTaskWs = null;
                }
            }
        }, 100, this);
    },

    // * получить данные Экспресс дня
    getDayExpressData: function () {
        // * получить события первоначально
        var login = Ext.util.Cookies.get('betzet_login'),
            fill = Ext.ComponentQuery.query('#main')[0],
            _this = this;

        var func = function () {
            Ext.Ajax.request({
                url: Ext.util.Format.format(Server.getDayExpress(), login),
                success: function (resp) {
                    var res = Gui.JSONDecodeSafe(resp.responseText),
                        dayExpress = res.dayExpress,
                        dayExpressDC = res.dayExpressDC;

                    //if (dayExpress.events.length)
                    _this.loadRawDayExpress(new Object({'dayExpress': dayExpress}), 'dayexpress');

                    //if (dayExpressDC.events.length)
                    _this.loadRawDayExpress(new Object({'dayExpress': dayExpressDC}), 'dayexpressDC');
                },
                failure: Util.fatalError,
                method: 'POST'
            });
        };

        func();

        // * запустить таймер на последующее получение событий
        TaskF.startTaskDayExpressLoad(fill, func);
    },

    clearCenterArea: function () {
        var fill = Ext.ComponentQuery.query('#main')[0],
            container = fill.down('#centerArea'),
            activeTabId = BasketF.getActiveTabEventId();

        if (container && typeof container.getDockedItems != 'undefined') {
            var tbarEventTypes = container.getDockedItems('toolbar[dock=top] #toolbarEventTypes segmentedbutton')[0],
                tbarMainLine = container.getDockedItems('toolbar[dock=top] #toolbarMainLine')[0],
                bbar = container.getDockedItems('toolbar[dock=bottom]')[0];
            if (tbarEventTypes)
                tbarEventTypes.removeAll();
            if (tbarMainLine)
                tbarMainLine.removeAll();
            if (activeTabId != 'rats' && bbar && tbarMainLine.items.length == 0) {
                bbar.removeAll();
            }

        }

        if (container)
            container.removeAll();
    },

    // * очистка данных о выделенном событии
    resetCenterArea: function () {
        var fill = Ext.ComponentQuery.query('#main')[0];
        if (fill) {
            var vm = fill.getViewModel();

            this.clearCenterArea();

            var fastInput = fill.down('#fastInput'),
                fastInputGambler = fill.down('#fastInputGambler');

            if (fastInput)
                fastInput.reset();

            if (fastInputGambler)
                fastInputGambler.reset();

            vm.set('title', null);
        }
    },

    // * ставки не 0
    checkNotNull: function (activeTabIndex, storeBasket) {
        var flag = true;

        if (activeTabIndex == 0) {
            storeBasket.each(function (item) {
                if (!item.get('amount')) {
                    Util.erMes('Не указана сумма ставки'/* + item.get('coefName')*/);
                    MonitorF.sendErrorToMonitor('Не указана сумма ставки');
                    flag = false;
                }
            }, this);
        } else {
            var gridbasketexpress = Ext.ComponentQuery.query('gridbasketexpress')[0],
                vmExpress = gridbasketexpress.getViewModel(),
                storeExpress = vmExpress.getStore('basketSum'),
                rec_0 = storeExpress.getAt(0);
            if (!parseInt(rec_0.get('amount'))) {
                Util.erMes('Не указана сумма ставки');
                MonitorF.sendErrorToMonitor('Не указана сумма ставки');
                flag = false;
            }
        }
        return flag;
    },

    // * валидность ставки, соответствие настройкам системы
    checkConstants: function (activeTabIndex, storeBasket) {
        // * Экспресс дня: проверка соответствия константам системы
        var activeTabId = BasketF.getActiveTabEventId(),
            maxCoef = Util.getGlobalConst("MAX_COEFF");

        // * суммарный кф не должен быть больше того, что указан в константах системы
        if (activeTabIndex) {
            var gridbasketexpress = Ext.ComponentQuery.query('gridbasketexpress')[0],
                vmExpress = gridbasketexpress.getViewModel(),
                storeBasketSum = vmExpress.get('basketSum'),
                recBasketSum = storeBasketSum.getAt(0),
                coef = recBasketSum.get('coef');

            if (parseInt(coef) > parseInt(maxCoef)) {
                Util.erMes('Итоговый коэффициент превышает максимально допустимый ' + maxCoef + '. Постановка ставки невозможна.');
                return false;
            }
        }

        if (activeTabId == 'dayexpress') {
            var numberEvents = Util.getGlobalConst("NUMBER_EVENTS_IN_DAY_EXPRESS"),
                cntBasket = storeBasket.count();

            // * количество ставок должно быть не меньше того, что указано в константах системы
            if (cntBasket < parseInt(numberEvents)) {
                Util.erMes('Для Пятёрочки должно быть выбрано не менее ' + numberEvents + ' исходов');
                return false;
            }
        } else if (activeTabId == 'dayexpressDC') {
            var numberEvents = Util.getGlobalConst("MIN_NUMBER_EVENTS_IN_COUPON_DAY_EXPRESS_DOUBLE_CHANCE"),
                cntBasket = storeBasket.count();

            // * количество ставок должно быть не меньше того, что указано в константах системы
            if (cntBasket < parseInt(numberEvents)) {
                Util.erMes('Для ДШ должно быть выбрано не менее ' + numberEvents + ' исходов');
                return false;
            }
        }

        return true;
    },

    // * подтверждение картой клиента
    checkCard: function (callbackFoo) {
        var window = Ext.create('Ext.Window', {
            width: 230,
            height: 140,
            title: 'Подтверждение ставки',
            defaultFocus: "card_number",
            constrain: true,
            itemId: 'windowCardNumber',
            modal: true,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype: 'textfield',
                    margin: 5,
                    itemId: 'card_number',
                    emptyText: 'Номер карты клиента',
                    listeners: {
                        specialkey: function (field, e) {
                            if (e.getKey() == e.ENTER) {
                                var fill = Ext.ComponentQuery.query('#main')[0],
                                    vm = fill.getViewModel(),
                                    selectedGamer = vm.get('selectedGamer'),
                                    token = Ext.util.Cookies.get('betzet_token'),
                                    client_id = selectedGamer.id,
                                    card_number = field.getValue();

                                Ext.Ajax.request({
                                    url: Ext.util.Format.format(Server.getCheckUserCard(), token, client_id, card_number),
                                    success: function (resp) {
                                        var res = Gui.JSONDecodeSafe(resp.responseText);

                                        if (res.response) {
                                            callbackFoo();
                                            window.close();
                                            FayeClient.sendCommand({command: 'hide_modal'});
                                        } else {
                                            var statusLabel = window.down('#statusLabel');
                                            statusLabel.setText('Неправильный номер карты');
                                        }
                                    },
                                    failure: Util.fatalError,
                                    method: 'POST'
                                });
                            }else if(e.getKey() == e.ESC){
                                FayeClient.sendCommand({command: 'hide_modal'});
                            }
                        },
                        scope: this
                    }
                },
                {
                    xtype: 'label',
                    itemId: 'statusLabel',
                    margin: 5
                }
            ],
            buttons: [
                {
                    text: 'Отмена',
                    handler: function () {
                        window.close();
                        FayeClient.sendCommand({command: 'hide_modal'}); // * скрыть сообщение о подтверждении картой на мониторе игрока
                    }
                }
            ]
        }).show();
    }
});