// * ф-ии для fill
Ext.define('Office.view.fill.FillF', {
    singleton: true,
    alternateClassName: ['FillF'],

    // * очистка store basketSum
    clearBasketSum: function () {
        var gridbasketexpress = Ext.ComponentQuery.query('gridbasketexpress')[0],
            vmExpress = gridbasketexpress.getViewModel();
        if (gridbasketexpress) {
            var basketSum = vmExpress.getStore('basketSum');
            basketSum.loadData(basketSum._defaults);
            vmExpress.set('amount', 0);
        }
    },

    clearSystem: function () {
        var gridbasketexpress = Ext.ComponentQuery.query('gridbasketexpress')[0],
            vmExpress = gridbasketexpress.getViewModel();
        if (gridbasketexpress) {
            vmExpress.set('system_count', null);
            vmExpress.set('system_value', null);
        }
    },

    // * актуализация betResult (обшая сумма ставки) и prize (возможный выигрыш) для Одинаров
    actualPrizeAndBetResult: function () {
        var gridbasketsingle = Ext.ComponentQuery.query('gridbasketsingle')[0],
            vmSingle = gridbasketsingle.getViewModel(),
            fill = Ext.ComponentQuery.query('fill')[0],
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
        vmSingle.set('betResult', sum.toFixed(0));
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
                    var fill = Ext.ComponentQuery.query('fill')[0],
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
    validateGamerAndSave: function (selected) {
        // * проверим, что у игрока заполнены все необходимые данные
        if (typeof selected.getData == 'function')
            var player = selected.getData();
        else
            var player = selected;

        var pidDateStr = Gui.formatPassportIssueDate(player.passport_issue_datetime),
            birthdayDateStr = Gui.formatPassportIssueDate(player.birthday);
        if (player.firstname != '' && player.address != '' && player.lastname != '' && player.passport_number != '' && player.passport_issuer != ''
            && player.passport_issue_datetime != '' && Gui.isValidPassportIssueDate(pidDateStr) && player.birthday != '' && Gui.isValidPassportIssueDate(birthdayDateStr)) {

            FillF.saveGamerToViewmodel(player);
        } else { // * форма редактирования данных клиента
            PayF.editUserDataIfNeedAndMakeAction(player, false, FillF.saveGamerToViewmodel, FillF);
        }
    },

    // * сохранение выделенного игрока в VM
    saveGamerToViewmodel: function (selected) {
        Ext.defer(function () {// * иначе какая-то ошибка возникает
            var win = Ext.ComponentQuery.query('#windowSearch')[0];
            if (win)
                win.close();
        }, 100, this);

        // * добавим фио игрока в заголовок после Купон
        var fill = Ext.ComponentQuery.query('fill')[0],
            vmFill = fill.getViewModel(),
            selectedGamerOld = vmFill.get('selectedGamer');

        if (typeof selected.getData == 'function')
            var selectedGamer = selected.getData();
        else
            var selectedGamer = selected;

        // * будем что-то делать, только если выбран новый игрок
        if (!selectedGamerOld ||
            (selectedGamerOld && selectedGamer['id'] != selectedGamerOld['id'])) {
            vmFill.set('selectedGamer', selectedGamer);
            vmFill.set('timeline_id', '');

            // * заголовок
            BasketF.setTitleBet();

            // * сохраним игрока в хранилище
            var localStorage = Ext.util.LocalStorage.get('newpos');
            localStorage.setItem('selectedGamer', Ext.encode(selectedGamer));
            localStorage.setItem('timeline_id', '');

            var fio = selectedGamer['lastname'] + ' ' + selectedGamer['firstname'] + ' ' + selectedGamer['patronymic_name'] + ', ' + selectedGamer['id'];
            Util.sucMes('Выбран игрок: ' + fio);

            FayeClient.sendCommand({command: 'hide_modal'});
        }
    },

    // * после загрузки стора gridsearch - поиск игрока
    loadSearchTimelineGambler: function (store, records) {
        if (!records.length)
            Util.erMes('Игрок не найден');
        else if (records.length == 1) {
            FillF.validateGamerAndSave(records[0]);
        }
    },

    loadRawDayExpress: function (dayExpress, id) {
        Ext.defer(function () {
            //var gridDayExpress = Ext.ComponentQuery.query('fill #' + id)[0],
            //    vmDayExpress = gridDayExpress.getViewModel(),
            //    result = gridDayExpress.getController().loadRawDataStright(dayExpress);

            //if (result) {
            //    vmDayExpress.runnerTaskWs = null;
            //}
            ApplyChangedData.saveDataToStore(dayExpress,id);

            // * обновим купон, если требуется
            ApplyChangedData.updateBasket(dayExpress.dayExpress.events);
        }, 100, this);
    },


    // * получить данные Экспресс дня
    getDayExpressData: function () {
        // * получить события первоначально
        var login = Ext.util.Cookies.get('betzet_login'),
           // fill = Ext.ComponentQuery.query('fill')[0],
            _this = this;

        var func = function () {
            Ext.Ajax.request({
                url: Ext.util.Format.format(Server.getDayExpress(), login),
                success: function (resp) {
                    var res = Gui.JSONDecodeSafe(resp.responseText),
                        dayExpress = res.dayExpress,
                        dayExpressDC = res.dayExpressDC;

                    _this.loadRawDayExpress(new Object({'dayExpress': dayExpress}), 'dayexpress');
                    _this.loadRawDayExpress(new Object({'dayExpress': dayExpressDC}), 'dayexpressDC');
                },
                failure: Util.fatalError,
                method: 'POST'
            });
        };

        func();

        // * запустить таймер на последующее получение событий
        TaskF.startTaskDayExpressLoad(func);
    },

    // * очистка центральной области
    clearCenterArea: function () {
        var fill = Ext.ComponentQuery.query('fill')[0],
            vmFill = fill.getViewModel(),
            container = fill.down('#centerArea'),
            activeTabId = BasketF.getActiveTabEventId();
        vmFill.set('title', '&nbsp;');
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
        var fill = Ext.ComponentQuery.query('fill')[0];
        if (fill) {
            var vm = fill.getViewModel();

            this.clearCenterArea();

            var fastInput = fill.down('#fastInput'),
                fastInputGambler = fill.down('#fastInputGambler');

            if (fastInput)
                fastInput.reset();

            if (fastInputGambler)
                fastInputGambler.reset();

            // vm.set('title', '&nbsp;');
        }
    },

    // * ставки не 0
    checkNotNull: function (storeBasket) {
        var flag = true,
            activeTabIndex = BasketF.getActiveTabIndex();

        if (activeTabIndex == 0) {
            storeBasket.each(function (item) {
                if (!item.get('amount')) {
                    Util.erMes('Не указана сумма ставки', function () {
                        // * фокус на сумму ставки
                        var id = item.get('id'),
                            amount = Ext.get(id);
                        if (amount)
                            amount.focus();
                    });
                    MonitorF.sendErrorToMonitor('Не указана сумма ставки');
                    flag = false;
                }
            }, this);
        } else {
            var gridbasketexpress = Ext.ComponentQuery.query('gridbasketexpress')[0],
                vmExpress = gridbasketexpress.getViewModel();

            if (!parseInt(vmExpress.get('amount'))) {
                Util.erMes('Не указана сумма ставки', function () {
                    // * фокус на сумму ставки
                    var amount = gridbasketexpress.down('#amount');
                    if (amount)
                        amount.focus();
                });
                MonitorF.sendErrorToMonitor('Не указана сумма ставки');
                flag = false;
            }
        }
        return flag;
    },

    // * валидность ставки, соответствие настройкам системы
    checkConstants: function (storeBasket) {
        // * Экспресс дня: проверка соответствия константам системы
        var activeTabId = BasketF.getActiveTabEventId(),
            activeTabIndex = BasketF.getActiveTabIndex(),
            gridbasketexpress = Ext.ComponentQuery.query('gridbasketexpress')[0],
            vmExpress = gridbasketexpress.getViewModel(),
            storeBasketSum = vmExpress.get('basketSum'),
            recBasketSum = storeBasketSum.getAt(0),
            coef = recBasketSum.get('coef'),
            gridbasketsingle = Ext.ComponentQuery.query('gridbasketsingle')[0],
            vmSingle = gridbasketsingle.getViewModel();

        if (activeTabIndex == 0) {
            var prize = parseInt(vmSingle.get('prize'));
        } else if (activeTabIndex == 1) {
            var //amount = recBasketSum.get('amount'),
                amount = vmExpress.get('amount'),
                coef = recBasketSum.get('coef'),
                prize = amount * coef;
        }

        if (activeTabId == 'dayexpress') {
            var numberEvents = parseInt(Util.getGlobalConst("NUMBER_EVENTS_IN_DAY_EXPRESS")),
                cntBasket = storeBasket.count(),
                minCoef = parseFloat(Util.getGlobalConst("KOEFF_FOR_DAY_EXPRESS"));

            // * число событий
            if (cntBasket < numberEvents) {
                Util.erMes('Для ЭД Пятёрочки должно быть выбрано не менее ' + numberEvents + ' исходов');
                return false;
            }

            // * минимальный кэф
            if (coef < minCoef) {
                Util.erMes('Минимальный суммарный коэффициента для ЭД Пятерочка: ' + minCoef);
                return false;
            }

            // * максимальная выплата (для ДШ такой нет)
            var maxPayment = parseInt(Util.getGlobalConst("MAX_BET_OF_THE_DAY_PAYMENT"));
            if (prize > maxPayment) {
                Util.erMes('Максимальная выплата для ЭД Пятерочка: ' + maxPayment);
                return false;
            }

            // * минимальная ставка
            var minBet = parseInt(Util.getGlobalConst("MIN_SIZE_BET_DAY_EXPRESS"));
            if (amount < minBet) {
                Util.erMes('Минимальная ставка для ЭД Пятерочка: ' + minBet);
                return false;
            }

            // * максимальная ставка
            var maxBet = parseInt(Util.getGlobalConst("MAX_SIZE_BET_DAY_EXPRESS"));
            if (amount > maxBet) {
                Util.erMes('Максимальная ставка для ЭД Пятерочка: ' + maxBet);
                return false;
            }
        } else if (activeTabId == 'dayexpressDC') {
            var numberEvents = parseInt(Util.getGlobalConst("MIN_NUMBER_EVENTS_IN_COUPON_DAY_EXPRESS_DOUBLE_CHANCE")),
                cntBasket = storeBasket.count(),
                minCoefDC = parseFloat(Util.getGlobalConst("KOEFF_FOR_DAY_EXPRESS_DOUBLE_CHANCE"));

            // * число событий
            if (cntBasket < numberEvents) {
                Util.erMes('Для ЭД ДШ должно быть выбрано не менее ' + numberEvents + ' исходов');
                return false;
            }

            // * минимальный кэф
            if (coef < minCoefDC) {
                Util.erMes('Минимальный суммарный коэффициент для ЭД ДШ: ' + minCoefDC);
                return false;
            }

            // * минимальная ставка
            var minBet = parseInt(Util.getGlobalConst("MIN_SIZE_BET_DAY_EXPRESS_DOUBLE_CHANCE"));
            if (amount < minBet) {
                Util.erMes('Минимальная ставка для ЭД ДШ: ' + minBet);
                return false;
            }

            // * максимальная ставка
            var maxBet = parseInt(Util.getGlobalConst("MAX_SIZE_BET_DAY_EXPRESS_DOUBLE_CHANCE"));
            if (amount > maxBet) {
                Util.erMes('Максимальная ставка для ЭД ДШ: ' + maxBet);
                return false;
            }
        } else if (activeTabId == 'line' || activeTabId == 'live') {
            // * максимальный кэф
            if (activeTabIndex == 1) {
                var maxCoef = Util.getGlobalConst("MAX_COEFF");
                if (parseInt(coef) > parseInt(maxCoef)) {
                    Util.erMes('Итоговый суммарный коэффициент превышает максимально допустимый: ' + maxCoef);
                    return false;
                }
            }

            // * максимальная выплата
            var maxBetPayment = parseInt(Util.getGlobalConst("MAX_BET_PAYMENT"));
            if (prize > maxBetPayment) {
                Util.erMes('Итоговая сумма выплаты превышает максимально допустимую: ' + maxBetPayment);
                return false;
            }
        }

        return true;
    },

    // * подтверждение картой клиента
    checkCard: function (callbackFoo) {
        var window = Ext.ComponentQuery.query('#windowCardNumber')[0];
        if (!window)
            window = Ext.create('Ext.Window', {
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
                                    var fill = Ext.ComponentQuery.query('fill')[0],
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
                                } else if (e.getKey() == e.ESC) {
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
    },

    // * проверка, можно ли переключать вкладку
    checkCanSwitchTab: function () {
        var fill = Ext.ComponentQuery.query('fill')[0],
            activeTabIndex = BasketF.getActiveTabIndex(),
            vmFill = fill.getViewModel(),
            storeBasket = vmFill.getStore('basket'),
            arrEventId = Ext.Array.pluck(Ext.Array.pluck(storeBasket.getRange(), 'data'), 'event_id');

        if ((activeTabIndex == 0
            && (storeBasket.count() < 2 || Util.hasDuplicates(arrEventId))
            && !BasketF.isDayExpress())
            || (activeTabIndex == 1
            && BasketF.isDayExpress())) {

            //Util.warnMes('Переключение купона невозможно. Присутствуют одинары, поставленные на одно событие.');
            return false;
        } else {
            return true;
        }
    },

    // * кнопка Сохранить в форме редактирования данных Игрока
    onClickSave: function (btn) {
        var window = btn.up('window'),
            form = window.down('form'),
            vmForm = form.getViewModel(),
            callbackFn = vmForm.get('callbackFn');

        if (form.getForm().isValid()) {
            var player = form.getRecord().getData();
            //player['passport_number'] = player['passer'] + player['pasnom'];

            // * сохранение данных клиента
            var objUrl = {
                class: 'Pos_Slips_Saveplayer',
                params: {
                    player: player
                }
            };

            Ext.Ajax.request({
                url: Server.getUrl(objUrl),
                success: function (resp) {
                    var res = Gui.JSONDecodeSafe(resp.responseText);
                    if (res.success) {
                        // * при изменении статуса резидента, нужно выполнить декомпенсацию
                        //todo не делаю декомпенсацию
                        callbackFn(player);
                    } else {
                        Util.erMes(res.message);
                    }
                },
                //failure: _this.failureFn,
                method: 'GET',
                scope: this
            });

            window.close();
        } else {
            Util.erMes(Config.STR_FORM_ERROR);
        }
    },

    // * кнопка Отмена в форме редактирования данных Игрока
    onClickCancel: function (btn) {
        var window = btn.up('window');
        window.close();
    },
});