// * монитор игрока
Ext.define('Office.view.fill.MonitorF', {
    singleton: true,
    alternateClassName: ['MonitorF'],

    // * отправим ставки на монитор игрока
    sendBetsToMonitor: function () {
        //FayeClient.sendCommand({command: 'hide_modal'});

        var fill = Ext.ComponentQuery.query('fill')[0],
            vm = fill.getViewModel(),
            selectedGamer = vm.get('selectedGamer'),
            timeline_id = vm.get('timeline_id') || null,
            balance = vm.get('balance') || null,
            storeBasket = vm.getStore('basket'),
            arrBets = [],
            data = new Object(),
            curDate = Math.ceil((new Date().getTime()) / 1000),
            gridExpress = Ext.ComponentQuery.query('gridbasketexpress')[0],
            vmExpress = gridExpress.getViewModel(),
            comboSystem = vmExpress.getStore('system'),
            system_value = vmExpress.get('system_value'),
            recSystem = comboSystem.getById(system_value),
            storeBasketSum = vmExpress.getStore('basketSum'),
            recBasketSum = storeBasketSum.getAt(0),
            arr_total_value = Ext.Array.pluck(Ext.Array.pluck(Ext.ComponentQuery.query('fill')[0].getViewModel().getStore('basket').getRange(), 'data'), 'amount'), // * массив сумм ставок
            type = BasketF.getBetType() == 'single' ? 'single' : 'multi',
            multi_value = type == "multi" ? recBasketSum.get('amount') : 0,
            total_possible_winning = 0,
            total_cf_value = 0,
            timeline_counter = timeline_id > 0 ? 1 : 0,
            bonus_type = null;

        arr_total_value = Ext.Array.map(arr_total_value, function (item) {
            return parseInt(item);
        });

        var total_value = type == "single" ? Ext.Array.sum(arr_total_value) : 0;

        if (recSystem) {
            var system_variants_value = recSystem.get('system_variants');
        } else {
            var system_variants_value = 0;
        }

        if (selectedGamer) {
            var gamerId = selectedGamer.id,
                gamerName = selectedGamer.firstname + ' ' + selectedGamer.lastname,
                have_user_card = selectedGamer.have_user_card,
                found_by_barcode = selectedGamer.found_by_barcode;
        } else {
            var gamerId = null,
                gamerName = null,
                have_user_card = false,
                found_by_barcode = false;
        }

        if (system_value == 1)
            system_value = 0;
        system_value = type == "multi" ? system_value : 0;
// * barcode 93307185 79261539419 79281296006
        var state = {
            "type": type,
            "vip_id": 0,
            "multi_value": multi_value,
            "system_value": system_value,
            "series": false,
            "series_part": 0,
            "series_total": 0,
            "client_id": gamerId,
            "client_name": gamerName,
            "client_type": true,
            "client_have_card": have_user_card,
            "client_found_by_barcode": found_by_barcode,
            "timeline_id": timeline_id,
            "timeline_player_id": gamerId,
            "timeline_player_name": gamerName,
            "timeline_player_balance": balance,
            "timeline_code": null, //?
            "timeline_counter": timeline_counter,//?
            "timeline_start_timestamp": 0,//?
            "login": Ext.util.Cookies.get('betzet_login'),
            "hash": "1",
            "bonus_type": bonus_type,
            "system_variants_value": system_variants_value,
            "system_variants": system_variants_value + " X"
        };

        if (selectedGamer || timeline_id)
            state['client_enable'] = true;

        storeBasket.each(function (item, idx) {
            var rec = Util.cloneObject(item.getData()),
                cf_value = parseFloat(rec['arrCoef'][2]),
                amount = parseFloat(rec['amount']),
                arrCoef = item.get('arrCoef'),
                arrBasis = item.get('arrBasis');

            if (item.get('arrCoefOld') && item.get('arrCoefOld')[0] != item.get('arrCoef')[0])
                rec['replaced'] = item.get('arrCoefOld')[2];
            else
                rec['replaced'] = false;

            if (item.get('arrBasisOld') && item.get('arrBasisOld')[2] != item.get('arrBasis')[2])
                rec['previous_short_name'] = BasketF.getCoefShortName(item.get('arrCoefOld')[1], item.get('arrBasisOld')[2]);
            else
                rec['previous_short_name'] = false;

            rec['id'] = rec['event_id'] + '-' + rec['outcome_mnemonic_name'];
            rec['cf_id'] = rec['coefId'];
            rec['cf_value'] = cf_value;
            rec['odds_id'] = rec['arrBasis'][0] || 0;
            rec['short_name'] = rec['coefName'];
            rec['created'] = curDate;
            rec['possible_winning'] = (cf_value * amount).toFixed(2);
            rec['value'] = amount;
            rec['bonus'] = 0;
            rec['order'] = idx + 1;
            rec['event_name'] = rec['home'] + ' - ' + rec['away'];
            rec['event_rolled_id'] = rec['short_number'];
            rec['event'] = {
                "rolled_id": rec['short_number'],
                "home": rec['home'],
                "away": rec['away'],
                "time": rec['time']
            };

            if (idx == 0) {
                total_cf_value = cf_value;
                total_possible_winning = cf_value * amount;
            } else {
                total_cf_value *= cf_value;
                total_possible_winning += cf_value * amount;
            }

            // * bonus_type будет 5-ка или ДШ только если по колличеству ставок удовлетворяет (5 или 6-7), а так просто Экспресс
            if (rec['type'] == "dayexpress") {
                bonus_type = "day_express";
                rec['type'] = bonus_type;

                var numberEvents = parseInt(Util.getGlobalConst("NUMBER_EVENTS_IN_DAY_EXPRESS")),
                    cntBasket = storeBasket.count();

                // * количество ставок должно быть не меньше того, что указано в константах системы
                if (cntBasket >= numberEvents) {
                    state['bonus_type'] = bonus_type;
                }
            } else if (rec['type'] == "dayexpressDC") {
                bonus_type = "day_express_dc";
                rec['type'] = bonus_type;

                var numberEvents = parseInt(Util.getGlobalConst("MIN_NUMBER_EVENTS_IN_COUPON_DAY_EXPRESS_DOUBLE_CHANCE")),
                    cntBasket = storeBasket.count();

                // * количество ставок должно быть не меньше того, что указано в константах системы
                if (cntBasket >= numberEvents) {
                    state['bonus_type'] = bonus_type;
                }
            }

            state['count'] = idx + 1;
            state['min'] = rec['min'];
            state['max'] = rec['max'];

            arrBets.push(rec);

            // * сохранение значения кэфа и базиса для того, чтобы при изменении кэфа было с чем сравнивать новое значение
            storeBasket.suspendEvents();

            if(!item.get('arrCoefOld')){
                item.set('arrCoefOld', Util.cloneObject(arrCoef));
                item.set('coefIdOld', arrCoef[0]);
            }

            if(!item.get('arrBasisOld')
               /* || (item.get('arrBasisOld') && item.get('arrBasisOld')[2] != arrBasis[2])*/){
                if (arrBasis) {
                    item.set('arrBasisOld', Util.cloneObject(arrBasis));
                    item.set('basisIdOld', arrBasis[0]);
                }
            }

            storeBasket.resumeEvents();
        });

        if (type == 'multi') {
            total_possible_winning = multi_value * recBasketSum.get('coef');
        }

        state['total_cf_value'] = total_cf_value.toFixed(2);
        state['total_possible_winning'] = total_possible_winning.toFixed(2);
        state['total_value'] = total_value;


        data['state'] = state;
        data['bets'] = arrBets;

        FayeClient.sendCommand({command: 'snapshot', data: data});
    },

    // * отправка на монитор изменивщихся и удаленных ставок
    // * flag = 1 - отправка после ответа сервера об изменении кэфов, flag = 0 - отправка после изменения от веб-сокетов об изменении кэфов
    sendChangedBetsToMonitor: function (arrResp, flag) {
        FayeClient.sendCommand({command: 'hide_modal'});

        var data = new Object(),
            bets = [],
            fill = Ext.ComponentQuery.query('fill')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket');

        function addDeleteBet(item, flag) {
            var old_cf_id = item.cf_id;

            if (flag) {
                var coefIdSent = 'coefId';
            } else {
                var coefIdSent = 'coefIdSent';
            }

            var rec = storeBasket.findRecord(coefIdSent, old_cf_id, 0, false, true, true);
            if (rec) {
                var home = rec.get('home'),
                    away = rec.get('away');

                bets.push({
                    "home": home,
                    "away": away,
                    "server_message": item.message,
                    "message": "Кф. закрылся и событие было удалено из купона:"
                });
            }
        };

        function addChangeBet(item, flag) {
            //console.info(arguments);

            if (flag) {
                var coefIdSent = 'coefIdOld',
                    arrBasisSent = 'arrBasisOld',
                    arrCoefSent = 'arrCoefOld';
            } else {
                var coefIdSent = 'coefIdSent',
                    arrBasisSent = 'arrBasisSent',
                    arrCoefSent = 'arrCoefSent';
            }

            var cf_id = item.data.cf_id,
                cf_value = item.data.cf_value,
                odds_id = item.data.odds_id,
                odds_value = item.data.odds_value,
                old_cf_id = item.cf_id;

            var rec = storeBasket.findRecord(coefIdSent, old_cf_id, 0, false, true, true);

            if (rec) {
                var home = rec.get('home'),
                    away = rec.get('away'),
                    coefName = rec.get('coefName'),
                    dat = new Object();

                if (rec.get(arrBasisSent))
                    var basis = rec.get(arrBasisSent)[2];
                else
                    var basis = null;

                dat["home"] = home;
                dat["away"] = away;
                dat["server_message"] = item.message;
                dat["message"] = "Кф. изменился:";
                dat["prev_short_name"] = BasketF.getCoefShortName(rec.get(arrCoefSent)[1], basis);
                dat["prev_cf_value"] = rec.get(arrCoefSent)[2];

                if (cf_value) {
                    dat["cf_value"] = cf_value;
                } else {
                    dat["cf_value"] = rec.get(arrCoefSent)[2];
                }

                if (odds_value) { // * поменялся базис
                    dat["short_name"] = BasketF.getCoefShortName(rec.get('arrCoef')[1], odds_value);
                } else {
                    dat["short_name"] = coefName;
                }

                bets.push(dat);
            }
        };

        Ext.Array.each(arrResp, function (item) {
            if (item.message == Util.BETTING_CLOSED) {// * исчезли кэфы
                addDeleteBet(item, flag);
            } else if (item.message == Util.COEFFICIENT_CHANGED) {// * поменялись кэфы
                addChangeBet(item, flag);
            }
        }, this);

        if (bets.length) {
            data['bets'] = bets;
            FayeClient.sendCommand({command: 'bet_fail', data: data});
        }
    },

    sendErrorToMonitor: function (message) {
        FayeClient.sendCommand({command: 'hide_modal'});

        var data = new Object();

        data['message'] = message;

        FayeClient.sendCommand({command: 'error_message', data: data});
    }


});