Ext.define('Office.view.fill.coeff.MarketsHtml', {
    singleton: true,
    alternateClassName: ['MarketsHtml'],

    // * примение шаблонов
    // * obj= cs+cse из record, item- маркет из market.js, record- запись конкретного события(event), panel- где отображать кэф
    applyTemplate: function (template, obj, item, record, panel) {
        if (item.template == 'column_list') {
            // * window['название_ф-ии']['метод_ф-ии'](параметры) - способ вызова ф-ии по имени
            window[template]['templateColumnList'](obj, item, record, panel);
        }
        if (item.template == 'fora') {
            window[template]['templateFora'](obj, item, record, panel);
        }
        if (item.template == 'groupped_list') {
            window[template]['templateGrouppedList'](obj, item, record, panel);
        }
        if (item.template == 'groupped_yes_no_list') {
            window[template]['templateGrouppedYesNoList'](obj, item, record, panel);
        }
        if (item.template == 'simple_list') {
            window[template]['templateSimpleList'](obj, item, record, panel);
        }
        if (item.template == 'total') {
            window[template]['templateTotal'](obj, item, record, panel);
        }
        if (item.template == 'yes_no_list') {
            window[template]['templateYesNoList'](obj, item, record, panel);
        }
        if (item.template == 'mainline') {
            window[template]['templateMainLine'](obj, item, record, panel);
        }
        if (item.template == 'dayexpress' || item.template == 'dayexpressDC') {
            window[template]['templateDayExpress'](obj, item, record, panel);
        }
    },

    // * режим отображения кэфов для крыс
    ratsClick: function (gridLive, record) {
        var fillContainer = gridLive.up('#main'),
            container = fillContainer.down('#centerArea');

        FillF.resetCenterArea();

        // * из cs & cse создадим один объединяющий массив
        var obj = UtilMarkets.mergeCoefs(record);

        // * дополнительные кэфы для крыс
        var contExtra = Ext.create('Ext.container.Container', {
            width: 250,
            //itemId: itemId,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            style: {
                'box-shadow': 'rgb(136, 136, 136) 1px 1px 5px'
            },
            margin: '5 3 5 3'
            //margin: '0 0 0 5'
        });

        TemplatesRats.templateRatsMain(obj, record, container);
        container.add(contExtra);
        TemplatesRats.templateRatsExtra(obj, record, contExtra);
        TemplatesRats.templateRatsTabs(obj, record, container);

        container.unmask();
    },

// * ГЛАВНАЯ ЛИНИЯ- кэфы
    // * при выборе события показываются кэфы главной линии и запускается отображение остальных кэфов (eventTypeSecondClick)
    eventTypeFirstClick: function (gridLive, record) {
        var fillContainer = gridLive.up('#main'),
            container = fillContainer.down('#centerArea');
        if (typeof container.getDockedItems != 'undefined') { // * у крыс их нет
            var tbarEventTypes = container.getDockedItems('toolbar[dock=top] #toolbarEventTypes segmentedbutton')[0],
                tbarMainLine = container.getDockedItems('toolbar[dock=top] #toolbarMainLine')[0],
                menumain = Ext.ComponentQuery.query('menumain')[0],
                vmMenumain = menumain.getViewModel(),
                markets = vmMenumain.get('markets'),
                marketsGroups = [],
                idEventType,
                _this = this,
                marketGroupsNames = vmMenumain.get('marketGroups'),
                addColumns = function (container) { // * колонки для размещения коэф, число зависит от ширины экрана
                    var widthContainer = container.getWidth(),
                        columnMinWidth = 180,
                        numColumn = Math.floor(widthContainer / columnMinWidth);
                    for (var i = 0; i < numColumn; i++) {
                        var itemId = 'cont_' + i,
                            cont = Ext.create('Ext.container.Container', {
                                flex: 1,
                                autoScroll: true,
                                itemId: itemId,
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                style: {
                                    'box-shadow': 'rgb(136, 136, 136) 1px 1px 5px'
                                },
                                margin: '5 3 5 3'
                                //margin: '2 3 5 2'
                            });
                        container.add(cont);
                    }
                };
            // * последовательная обработка маркетов
            //Ext.defer(function () { // * задержка для установления маски
            // * очистка области коэффициентов от предыдущих данных
            //container.removeAll();

            // * запомним состояние нажатых кнопок типов событий
            if (tbarEventTypes)
                var bntPressed = tbarEventTypes.down('button[pressed=true]');

            FillF.clearCenterArea();

            if (!record.get('betting_closed')) { // * ведется прием ставок
                // * проставим признак active=0 на маркеты- т.е. по-умолчанию не отображать ничего
                Ext.Array.each(markets, function (item, idx) {
                    item['active'] = 0;
                });

                // * из cs & cse создадим один объединяющий массив
                var objCs = record.get('cs');
                var objCse = record.get('cse');
                var obj = UtilMarkets.mergeCoefs(record);

                // * проставим признак какие маркеты показывать (active), а какие - нет
                // * в зависимости от того, есть ли соответствующий кэф в группе
                var objTemp = Util.cloneObject(obj);
                // * удалим нулевые кэфы, чтобы в меню не попадали лишние пункты (Основные, Форы...)
                Ext.Object.each(objTemp, function (key, val, o) {
                    if (val[2] == 0)
                        delete o[key];
                });
                marketsGroups = TemplatesHtml.setActiveSign(objTemp, markets, marketsGroups, record);

                // * сортировка групп по возрастанию (основные,...)
                marketsGroups = Util.sortedIntArray(marketsGroups);
                idEventType = marketsGroups[0];
                if (marketsGroups.length) { // * имеются группы
                    // * добавляем колонки, в которые потом будем добавлять гриды с кэфами
                    addColumns(container);

                    // * идем по группам маркетов
                    Ext.Array.each(marketsGroups, function (itemGroup) {
                        var marketGroup = Util.findById(marketGroupsNames, itemGroup),
                            titleGroup = marketGroup.name,
                            idGroup = marketGroup.id;

                        if (titleGroup == 'mainline') {
                            // * идем по активным маркетам и создаем гриды по соответствующим шаблонам из markets.js
                            Ext.Array.each(markets, function (item) {
                                if (item.active && item.group_id == itemGroup) {
                                    if (item.template == 'mainline') {
                                        if (tbarMainLine)
                                            this.applyTemplate('TemplatesHtml', objCs, item, record, tbarMainLine);
                                    }
                                }
                            }, this);
                        } else if (titleGroup != 'mainline'
                            && titleGroup != 'dayexpress'
                            && titleGroup != 'dayexpressDC') {
                            // * добавляем группу фильтрации в тулбар (основные, тоталы...)
                            if (tbarEventTypes) {
                                var navButton = {
                                    text: titleGroup,
                                    value: idGroup,
                                    _id: idGroup
                                };
                                tbarEventTypes.add(navButton);
                            }
                        }
                    }, this);

                    if (bntPressed && bntPressed.text) {
                        var buttonFirst = tbarEventTypes.child('button[text=' + bntPressed.text + ']') || tbarEventTypes.child('button');
                    } else {
                        var buttonFirst = tbarEventTypes.child('button');
                    }

                    if (buttonFirst) {
                        if (typeof buttonFirst.toggle == 'function') // * экст ругался на segmented 200
                            try { // * а то ругается иногда на setPressed
                                buttonFirst.toggle();
                            } catch (e) {
                            }

                        _this.eventTypeSecondClick(gridLive, record, buttonFirst._id);

                        //container.unmask();
                    }
                } else { // * напишем Нет коэффициентов
                    var label = Ext.create('Ext.form.Label', {
                        text: 'Нет коэффициентов',
                        style: {
                            color: 'red',
                            left: '0!important',
                            margin: '10px!important',
                            'font-size': '20px'
                        }
                    });
                    container.add(label);
                    //container.unmask();
                }
            } else { // * напишем Прием ставок приостановлен
                var label = Ext.create('Ext.form.Label', {
                    text: 'Прием ставок приостановлен',
                    style: {
                        color: 'red',
                        left: '0!important',
                        margin: '10px!important',
                        'font-size': '20px'
                    }
                });

                container.add(label);
                // container.unmask();
            }
            //container.unmask();
            //}, 10, this);
        }
    },

// * ОСТАЛЬНЫЕ КЭФЫ
    // * показ кэфов из не главной линии. Second потому что эта ф-ия запускается каждый раз, когда нажимаем кнопки из Основные, Форы...
    eventTypeSecondClick: function (gridLive, record, idEventType) {
        if (record) {
            var fillContainer = gridLive.up('#main'),
                container = fillContainer.down('#centerArea'),
                eventId = record.get('event_id'),
                menumain = Ext.ComponentQuery.query('menumain')[0],
                vmMenumain = menumain.getViewModel(),
                markets = vmMenumain.get('markets');

            // * последовательная обработка маркетов
            //container.mask('Загрузка коэффициентов');
            //Ext.defer(function () {
            // * очистка области коэффициентов от предыдущих данных
            var arrColumnCont = Ext.ComponentQuery.query('#main')[0].query('#centerArea')[0].query('container[itemId^=cont_]');
            Ext.Array.each(arrColumnCont, function (item) {
                item.removeAll();
            });

            if (eventId) { // * выбрали спортивное событие
                if (!record.get('betting_closed')) { // * ведется прием ставок
                    // * из cs & cse создадим один объединяющий массив
                    // var obj = UtilMarkets.mergeCoefs(record);
                    var obj = record.get('cse');
                    // * идем по группам маркетов
                    var itemGroup = idEventType,
                        panel = new Ext.container.Container({
                            //title: titleGroup,
                            border: true,
                            cls: 'market-group-header'
                        });

                    // * идем по активным маркетам и создаем гриды по соответствующим шаблонам
                    Ext.Array.each(markets, function (item) {
                        if (item.active && item.group_id == itemGroup) {
                            // * создание гридов кэфов по шаблонам из markets.js
                            this.applyTemplate('TemplatesHtml', obj, item, record, panel);
                        }
                    }, this);

                    if (panel.query('component') && panel.query('component').length) {
                        var arrGrid = panel.query('component');
                        // * перебираем гриды с кэфами внутри panel
                        Ext.Array.each(arrGrid, function (item) {
                            var arrCont = container.query('container[itemId^=cont_]'),
                                minHeight = Ext.Array.min(arrCont, function (min, item) { // * самая кортокая колонка
                                    if (min.getHeight() <= item.getHeight())
                                        return 0;
                                    else
                                        return 1;
                                });
                            if (minHeight)
                                minHeight.add(item);
                        });
                    }
                    //container.unmask();
                } else { // * напишем Прием ставок приостановлен
                    var label = Ext.create('Ext.form.Label', {
                        text: 'Прием ставок приостановлен',
                        style: {
                            color: 'red',
                            left: '0!important',
                            margin: '10px!important',
                            'font-size': '20px'
                        }
                    });
                    container.add(label);
                    //container.unmask();
                }
            }
            //container.unmask();
            //}, 10, this);
        } else {// * что это за ситуация?
            var selection = gridLive.getSelectionModel().getSelection()[0];
            gridLive.fireEventArgs('itemclick', [{}, selection]);
        }

        // * обновление грида basket
        BasketF.refreshBasketGrids();
    },

// * ЭКСПРЕСС ДНЯ - рисуем кэфы
    dayExpressClick: function (grid) {
        var vmEvent = grid.getViewModel(),
            store = vmEvent.getStore('eventstore'),
            events = store.getRange(),
            fill = Ext.ComponentQuery.query('#main')[0],
        //contDayExpress = fill.down('#contDayExpress'),
        //toolbarMainLine= fill.down('#toolbarMainLine'),
            container = fill.down('#centerArea'),
            tbarMainLine = container.getDockedItems('toolbar[dock=top] #toolbarMainLine')[0],
            panel = new Ext.container.Container({
                border: true,
                flex: 1,
                _title: grid.getTitle(),
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                cls: 'market-group-header'
            }),
            menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel(),
            markets = vmMenumain.get('markets'),
            mainlineMarket = Ext.Array.findBy(markets, function (item) {
                return item.template == grid.getItemId();
            });

        tbarMainLine.removeAll();
        tbarMainLine.add(panel);

        // * цикл по событиям
        Ext.Array.each(events, function (item, index) {
            var objCs = item.get('cs');
            panel._index = index; // * передаем порядковый номер строки, чтобы заголовок только один раз печатать (1,Х,2...)
            this.applyTemplate('TemplatesHtml', objCs, mainlineMarket, item, panel);
        }, this);
    },

    // * добавление ставки в купон
    addToBasket: function (coefId, amount, event) {
        var activeTabIndexEvent = BasketF.getActiveTabIndexEvent(),
            fill = Ext.ComponentQuery.query('#main')[0],
            vmFill = fill.getViewModel(),
            amount = amount || 0,
            storeBasket = vmFill.getStore('basket'),
            gridEvent = Ext.ComponentQuery.query('grideventlive')[activeTabIndexEvent] /*|| Ext.ComponentQuery.query('grideventrats')[0]*/,
            vmEvent = gridEvent.getViewModel(),
            arrBasis = [],
            betting_closed = false;

        // * превышение числа ставок для экспресса
        var maxExpress = Util.getGlobalConst("COUPON_MAX_LENGTH_EVENTS");
        if (storeBasket.count() == (maxExpress - 1)) {
            Util.erMes('Достигнуто максимальное количество событий в купоне: ' + maxExpress);
            return false;
        }

        if (event != 0 && typeof event == 'string') {// * Экспресс дня, event- это eventId
            var selectedEvent = vmEvent.getStore('eventstore').findRecord('event_id', event, 0, false, true, true);
        } else {
            if (event == 0 || !event)
                var selectedEvent = gridEvent.getSelectionModel().getSelection()[0];
            else
                var selectedEvent = event;
        }

        betting_closed = selectedEvent.get('betting_closed');

        if (betting_closed)
            Util.warnMes('До забега осталось менее ' + Util.RATS_TIME_TO_STOP_BETTING + ' секунд, прием ставок прекращен.')

        if (selectedEvent && !betting_closed) {
            var event_id = selectedEvent.get('event_id') || selectedEvent.get('id'),
                arrCoef = UtilMarkets.getCoefByCoefId(gridEvent, event_id, coefId);
            arrBasis = UtilMarkets.getBasisByCoefId(gridEvent, event_id, coefId);

            if (event_id && arrCoef) {
                var coefTypeId = arrCoef[1],
                    existsId = storeBasket.findBy(function (rec, id) {
                        var id = rec.get('event_id') || rec.get('id');
                        if (rec.get('arrCoef')[1] == coefTypeId && id == event_id)
                            return true;
                    }),
                    gridbasketsingle = fill.down('gridbasketsingle'),
                    gridbasketexpress = fill.down('gridbasketexpress'),
                    tabpanel = gridbasketsingle.up('tabpanel'),
                    coefName = BasketF.getCoefShortName(coefTypeId, arrBasis[2]);

                // * если сумма amount явно не указана, то возьмем значение из поля Серия ставок по
                if (!amount) {
                    var betSeries = gridbasketsingle.down('#betSeries'),
                        checkBetSeries = gridbasketsingle.down('#checkBetSeries');
                    if (checkBetSeries.getValue() && betSeries.getValue()) {
                        amount = betSeries.getValue() || 0;
                    }
                }

                var newRec = {
                    coefId: arrCoef[0],
                    coefTypeId: coefTypeId,
                    coefName: coefName,
                    event_id: event_id,
                    short_number: selectedEvent.get('short_number'),
                    arrCoef: arrCoef, // * вот это тот самый код, который обеспечивал мне "чудесную синхронизацию" записей eventstore и basket
                    arrBasis: arrBasis,
                    arrCoefOld: false,// * хранит прежнее значение кэфа после изменении
                    arrBasisOld: false,// * хранит прежнее значение базиса после изменении
                    amount: amount,
                    home: selectedEvent.get('home'),
                    away: selectedEvent.get('away'),
                    de_id: selectedEvent.get('de_id'),
                    type: selectedEvent.get('type'),// * line, live
                    tournament_id: selectedEvent.get('tournament_id'),
                    multi_value: 0,
                    system_value: 0,
                    outcome_mnemonic_name: UtilMarkets.getMnemonicByCoefId(gridEvent, event_id, arrCoef[0]),
                    odds_outcome_mnemonic_name: UtilMarkets.getMnemonicByCoefId(gridEvent, event_id, arrBasis[0]),
                    created: Math.floor(Date.now() / 1000),
                    time: selectedEvent.get('time')
                };

                if (existsId != -1)
                    var recExists = storeBasket.getAt(existsId);

                if (recExists) { // * если такая ставка существует, то меняем сумму найденной записи
                    recExists.set('amount', amount);
                    //recExists.set('arrCoef', arrCoef);
                    //recExists.set('coefId', arrCoef[0]);
                } else { // * добавляем новую ставку
                    // * проверим для экспресса, что исходов данного турнира еще нет в купоне
                    var activeTabIndex = BasketF.getActiveTabIndex();
                    if (activeTabIndex == 1) {// * экспресс
                        var arrEventId = Ext.Array.pluck(Ext.Array.pluck(storeBasket.getRange(), 'data'), 'event_id'); // * массив из event_id
                        arrEventId.push(event_id);
                        if (Util.hasDuplicates(arrEventId)) {// * есть события (включая новое) из одного турнира- покажем окно с вариантами
                            // * если Экспресс дня, то может быть только по одному исходу на каждое событие: удаляем первое, добавляем второе
                            if (BasketF.isDayExpress()) {
                                var oldRec = storeBasket.findRecord('event_id', event_id, 0, false, true, true);
                                storeBasket.remove(oldRec);
                                this.addBetToCoupon(newRec);
                            } else {
                                this.showWindowTransform(newRec);
                            }
                        } else {
                            this.addBetToCoupon(newRec);
                        }
                    } else {// * для одинаров- сразу добавляем
                        this.addBetToCoupon(newRec);
                    }
                }
            }
        } else {
            //Util.toast('Ошибка', 'Не выбран коэффициент');
            return false;
        }
    },

    // * добавление ставки в купон
    addBetToCoupon: function (newRec) {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vmFill = fill.getViewModel(),
            activeTabIdx = BasketF.getActiveTabIndex(),
            storeBasket = vmFill.getStore('basket');

        storeBasket.add(newRec);

        // * переключим вкладку на Экспресс если больше 1 ставки
        var cnt = storeBasket.count(),
            tabpanelBet = fill.down('#tabpanelBet');
        //if (cnt == 2 && activeTabIdx == 0) {
        //    Ext.defer(function () {
        //        tabpanelBet.setActiveItem(1);
        //        activeTabIdx = BasketF.getActiveTabIndex();
        //    }, 100, this);
        //}

        Ext.defer(function () {
            if (activeTabIdx == 1) { // * Экспресс
                var grid = Ext.ComponentQuery.query('gridbasketexpress')[0],
                    vmExpress = grid.getViewModel(),
                    storeBasketSum = vmExpress.getStore('basketSum'),
                    recBasketSum = storeBasketSum.getAt(0);

                // * для экспресса добавляем ставку в грид итогов
                if (recBasketSum) {
                    if (newRec.amount)
                        recBasketSum.set('amount', newRec.amount);

                    // * выделить поле ввода Ставка
                    BasketF.selectBetField(tabpanelBet, storeBasket, newRec.coefTypeId);
                }
            } else // * Одинар
                var grid = Ext.ComponentQuery.query('gridbasketsingle')[0];

            // * скрол к последней строке купона
            grid.getView().scrollBy(0, 999999, false);
        }, 100, this);

        // * получить данные по min max
        BasketF.getMaxMin();
    },

    // * окно с вариантами преобразования ставки: Заменить, Удалить, Одинары, Отменить
    showWindowTransform: function (newRec) {
        var _this = this;
        Ext.Msg.show({
            title: 'Связанные события',
            message: 'В купоне присутствуют связанные события. <br>Что вы хотите сделать?',
            buttonText: {
                ok: 'Заменить', yes: 'Удалить', no: 'Одинары', cancel: 'Отменить'
            },
            scale: 'medium',
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'ok') {// * заменить исход, который уже есть в купоне, на новый

                    // Ext.defer(function () {
                    _this.addBetToCoupon(newRec);
                    //  }, 10, this);
                    _this.deleteBetFromCoupon(newRec.event_id);
                } else if (btn === 'yes') {// * удалить исход, который уже есть в купоне, но конфликтует с новым
                    _this.deleteBetFromCoupon(newRec.event_id);
                } else if (btn === 'no') { // * поменять экспресс на одинары и добавить новый исход
                    Ext.defer(function () {
                        _this.addBetToCoupon(newRec);

                        // * перключим вкладку на Одиночные
                        var fill = Ext.ComponentQuery.query('#main')[0],
                            tabpanelBet = fill.down('#tabpanelBet');
                        tabpanelBet.setActiveItem(0);
                    }, 100);
                } else {
                    return;
                }
            }
        });
    },

    // * удалить ставки из купона, которые имеют такой же event_id
    deleteBetFromCoupon: function (event_id) {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket'),
            rec = storeBasket.findRecord('event_id', event_id, 0, false, true, true);// * такая ставка может быть только одна
        storeBasket.remove(rec);
    },

    // * добавление в купон ставок из строки быстрого ввода
    addToBasketFastInput: function (short_number, coefNum, amount) {// * coefNum - условный номер кэфа из массива FastInputF.outcomes
        var activeTabIndexEvent = BasketF.getActiveTabIndexEvent(),
            gridEvent = Ext.ComponentQuery.query('grideventlive')[activeTabIndexEvent],
            amount = amount || 0;

        var storeEvent = gridEvent.store,
            event = storeEvent.findRecord('short_number', short_number, 0, false, true, true);
        if (event) {// * есть такой турнир
            var sport_slug = event.get('sport_slug');
            if (typeof FastInputF.outcomes[coefNum].outcome_name == 'function')
                var coefMemonic = FastInputF.outcomes[coefNum].outcome_name(sport_slug);
            else
                var coefMemonic = FastInputF.outcomes[coefNum].outcome_name;

            if (coefMemonic) {// * есть такой вид кэфов в принципе
                // * найдем подходящий кэф среди тех, что хранятся в eventstore
                var arrCoef = UtilMarkets.cf(event.getData(), coefMemonic),
                    coefId = arrCoef[0];

                if (arrCoef && coefId && arrCoef[2]) { // * кф не нулевой, а иначе значит его нет
                    this.addToBasket(coefId, amount, event);
                } else {
                    Util.infoMes('Не найден подходящий коэффициент');
                }
            }
        }
    }

});