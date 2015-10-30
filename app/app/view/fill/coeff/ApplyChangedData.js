// * применение изменений по состояниям и кэфам
Ext.define('Office.view.fill.coeff.ApplyChangedData', {
    singleton: true,
    alternateClassName: ['ApplyChangedData'],

    // * загрузка изменений по кэфам и событиям (diffs)
    loadDiffs: function (arrDiffs, grid) {
        var vmLive = grid.getViewModel(),
            eventstore = vmLive.getStore('eventstore'),
            selection = grid.getSelectionModel().getSelection()[0];

        if (arrDiffs && arrDiffs.length) {
            var curLineVers;

            // * перебираем элементы внутри массива diffs
            Ext.Array.each(arrDiffs, function (diff) {
                var diffdata = diff['diffdata'],
                    matchdata = diffdata['matchdata'],
                    tournaments = matchdata['tournaments'];

                curLineVers = matchdata['line_version'];

                if (tournaments && tournaments.length) { // * имеются турниры
                    var arrEventOut = this.getMatchdataTournaments(tournaments, false, grid);
                    if (arrEventOut.length) {
                        if (grid.getItemId() == 'rats') {
                            ApplyChangedData.loadDataToFantomRecords(arrEventOut, grid);
                        } else {
                            this.applyDiffs(grid, arrEventOut);
                        }

                        // * обновим купон, если требуется
                        this.updateBasket(arrEventOut);

                        // * если уже были показаны кэфы (выделено событие), то нужно перепоказать их
                        if (selection && grid.getItemId() == BasketF.getActiveTabEventId()) {// * данная вкладка выделена
                            Ext.Array.each(arrEventOut, function (objTournament) {
                                if (objTournament['short_number'] == selection.get('short_number')) {
                                    grid.fireEventArgs('itemclick', [{}, selection]);
                                }
                            }, this);
                        }
                    }
                }
            }, this);
            vmLive.set('line_version', curLineVers);
        } else {
            //console.warn('matchdata.diffs: is null');
        }
    },

    // * первоначальная загрузка данных по кэфам и событиям (matchdata) - загрузка из rawstore в eventsrore
    loadMatchdataData: function (objData, curLineVers, grid) {
        var vmLive = grid.getViewModel(),
            eventstore = vmLive.getStore('eventstore'),
            arrResp = [];
        if (objData) {
            var tournaments = objData['tournaments'];
            if (tournaments && tournaments.length) { // * имеются турниры
                var arrEventOut = this.getMatchdataTournaments(tournaments, true, grid);
                if (arrEventOut.length) {
                    if (grid.getItemId() == 'rats') {
                        this.loadDataToFantomRecords(arrEventOut, grid);
                    } else {
                        eventstore.loadData(arrEventOut);
                    }

                    // * обновим купон, если требуется
                    this.updateBasket(arrEventOut);
                }
            }
            vmLive.set('line_version', curLineVers);
        } else {
            console.warn('matchdata.data: is null');
        }

        // * начало в MenuMainC::onClickMenumain
        //var menumain = Ext.ComponentQuery.query('menumain')[0];
        //menumain.getEl().unmask();
        //Ext.defer(function () {
        //    var fill = Ext.ComponentQuery.query('#main')[0];
        //    fill.down('panel[region=west]').getEl().unmask();
        //}, 200, this);
    },

    // * Экспресс дня: загрузка из rawstore в eventstore
    loadDayExpress: function (objData, grid) {
        var vmLive = grid.getViewModel(),
            eventstore = vmLive.getStore('eventstore'),
            eventstore_chained = vmLive.getStore('eventstore_chained'),
            fill = Ext.ComponentQuery.query('#main')[0],
            vmFill = fill.getViewModel();

        // * чтобы в гриде не показывались записи с событиями
        eventstore_chained.filterBy(function () {
            return null;
        });

        var arrEventOut = this.getDayExpressTournaments(objData, grid),
            dataName = grid.getItemId() + '_Loaded';

        if (arrEventOut && arrEventOut.length)
            eventstore.loadData(arrEventOut);
        //else
        //eventstore.removeAll();

        // * покажем/скроем вкладку Пятерочка (сформируем название параметра из FillM, означающего, что стор Экспресса дня загружен и нужно показать вкладки Пятерочка и ДШ)
        vmFill.set(dataName, arrEventOut.length);

        var fill = Ext.ComponentQuery.query('#main')[0],
            eventstab = fill.down('#eventstab'),
            activeTabEvent = eventstab.getActiveTab();

        if (BasketF.isDayExpress())
            MarketsHtml.dayExpressClick(activeTabEvent);
    },

    // * обновить купон
    updateBasket: function (arrEventOut) {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket'),
            arrToDelete = [],
            arrResp = [];

        // * перебор пришедших событий
        Ext.Array.each(arrEventOut, function (obj) {
            var cs = Util.cloneObject(obj['cs']),
                cse = Util.cloneObject(obj['cse']),
                objChanged = {};

            Ext.Object.merge(cs, cse);// * чтобы не делать 2 цикла, отдельно по cs & cse

            storeBasket.each(function (item) {
                // console.info(arguments);

                //if (item.get('event_id') == obj['id'])
                //    console.info(obj);

                if (item.get('event_id') == obj['event_id']
                    || item.get('event_id') == obj['id']) {
                    Ext.Object.each(cs, function (key, val) {
                        var arrCoef = item.get('arrCoef'),
                            basketCoefTypeId = arrCoef[1],
                            arrBasis = item.get('arrBasis'),
                            basketBasisTypeId = arrBasis[1],
                            changedCoefTypeId = val[1].toString();

                        // * coefId меняется, но coefTypeId не меняется
                        if (basketCoefTypeId && changedCoefTypeId == basketCoefTypeId.toString()) {
                            if (val[2] == 0
                                && !Util.in_array(item.get('coefId'), Ext.Array.pluck(Ext.Array.pluck(arrToDelete, 'data'), 'coefId'))) {
                                arrToDelete.push(item);

                                objChanged = {
                                    message: 'BETTING_CLOSED',
                                    cf_id: arrCoef[0]
                                };
                                arrResp.push(objChanged);
                            } else {
                                //objChanged = {
                                //    message: 'COEFFICIENT_CHANGED',
                                //    cf_id: arrCoef[0],
                                //    data: {
                                //        cf_id: val[0],
                                //        cf_value: val[2]
                                //    }
                                //};
                                //arrResp.push(objChanged);

                                arrCoef[0] = val[0];
                                arrCoef[3] = arrCoef[2];
                                arrCoef[2] = val[2];

                                item.set('coefId', val[0]);
                            }
                        }

                        if (basketBasisTypeId && changedCoefTypeId == basketBasisTypeId.toString()) {
                            //objChanged = {
                            //    message: 'COEFFICIENT_CHANGED',
                            //    cf_id: arrBasis[0],
                            //    data: {
                            //        odds_id: val[0],
                            //        odds_value: val[2]
                            //    }
                            //};
                            //arrResp.push(objChanged);

                            arrBasis[0] = val[0];
                            arrBasis[3] = arrBasis[2];
                            arrBasis[2] = val[2];

                            item.set('coefName', BasketF.getCoefShortName(arrCoef[1], arrBasis[2]));
                        }
                    }, this);
                }
            }, this);
        }, this);

        // * отправим на монитор изменившиеся значения по ставкам
        if (arrResp.length) {
            MonitorF.sendChangedBetsToMonitor(arrResp, 1);
        }

        Ext.defer(function () {
            if (arrToDelete.length) {
                storeBasket.remove(arrToDelete);
            }
        }, 200, this);

        if (storeBasket.count()) {
            BasketF.refreshBasketGrids();
        }
    },

    loadDataToFantomRecords: function (arrEventOut, grid) {
        var storeEvent = grid.getViewModel().getStore('eventstore');

        // * перебор пришедших событий
        Ext.Array.each(arrEventOut, function (obj) {
            var rec = storeEvent.findRecord('tournament_name', obj.tournament_name, 0, false, true, true);
            // * скопируем некоторые данные из пришедшей записи в фантомную запись
            if (rec) {
                Ext.Object.each(obj, function (key, val) {
                    rec.set(key, val);
                });
            }
        }, this);
    },

    eventNamePartsInit: function () {
        return {
            part: {
                partOver: null,
                status: null,
                partName: null,
                partNum: null
            },
            compensatedTime: null,
            score: {
                score_home: null,
                sep: ':',
                score_away: null
            },
            parts: {
                partsH: {},
                partsA: {}
            },
            game: {
                service: null,
                tiebreak: null,
                gameH: null,
                gameA: null
            },
            inning: null,
            penalty: null,
            removalsFull: null
        };
    },

    applyServiceCoeffs: function (diff, oldRec, grid) {
        if (oldRec) {
            diff['_event_name_parts'] = this.calcEventNameParts(diff, oldRec.getData());
            oldRec.set('_event_name_parts', diff['_event_name_parts']);
            oldRec.set('_event_name', this.eventName(oldRec.getData(), diff['_event_name_parts'], grid));
            return oldRec;
        } else {
            diff['_event_name_parts'] = this.eventNamePartsInit();
            diff['_date_base'] = this.dateBase(diff);
            diff['_event_name_base'] = this.eventNameBase(diff);
            diff['_event_name_parts'] = this.calcEventNameParts(diff, diff);
            diff['_event_name'] = this.eventName(diff, diff['_event_name_parts'], grid);
            return diff;
        }
    },

    iterateCs: function (diffCs, cs) {
        Ext.Object.each(diffCs, function (key, val) {
            if (cs) {
                if (key.indexOf('_SCORE_') == -1) { // * не служебный кэф
                    if (cs[key]) { // * изменение кэфа
                        cs[key][0] = val[0];
                        cs[key][3] = cs[key][2]; // * сохраним прежнее значение кэфа, чтобы потом выделить красным или зеленым
                        cs[key][2] = val[2];
                    } else { // * добавление кэфа
                        cs[key] = val;
                    }
                }
            } else {
                console.warn(oldRec);
            }
        }, this);
    },

    // * применение изменившихся значений кэфов
    // * означает переход к новому элементу внутри diffs.diffdata[]
    // * arrDiffs - массив событий всех events внутри всех tournaments внути данного diffdata
    applyDiffs: function (grid, arrDiffs) {
        var vmGridEventLive = grid.getViewModel(),
            storeEvent = vmGridEventLive.getStore('eventstore'),
            _this = this,
            currentTime = new Date(),
            strCurrentTime = Ext.Date.format(currentTime, 'timestamp');

        // * идем по изменениям
        Ext.Array.each(arrDiffs, function (diff) {
            var time = new Date(diff['time']),
                strTime = Ext.Date.format(time, 'timestamp');

            if(strTime > strCurrentTime){
                var oldRec = storeEvent.findRecord('event_id', diff['event_id'], 0, false, true, true);

                if (oldRec) { // * изменяем событие
                    oldRec.set('current_second', diff['current_second']);
                    oldRec.set('_current_second', diff['current_second']);
                    oldRec.set('betting_closed', diff['betting_closed']);
                    oldRec.set('status', diff['status']);
                    oldRec.set('timer_stopped', diff['timer_stopped']);

                    // * применим служебные кэфы
                    oldRec = this.applyServiceCoeffs(diff, oldRec, grid);

                    var cs = oldRec.get('cs'),
                        cse = oldRec.get('cse');

                    _this.iterateCs(diff['cs'], cs);
                    _this.iterateCs(diff['cse'], cse);

                    if (UtilMarkets.is_ended(diff))
                        oldRec.set('finished', 1);
                } else { // * добавляем событие
                    if (diff['finished'] != 1) {
                        diff = this.applyServiceCoeffs(diff, null, grid);
                        storeEvent.add(diff);
                    }
                }
            }
        }, this);
    },

    calcEventNameParts: function (diff, oldRec) {
        var sport_slug = diff['sport_slug'],
            volleyball = sport_slug == 'volleyball' ? true : false,
            partNum_ = UtilMarkets.partNum(diff),
            partName_ = UtilMarkets.partName(diff),
            partOver_ = UtilMarkets.partOver(diff),
            status_ = UtilMarkets.status(diff),
            partNum = oldRec['_event_name_parts']['part']['partNum'],
            partName = oldRec['_event_name_parts']['part']['partName'],
            partOver = oldRec['_event_name_parts']['part']['partOver'],
            status = oldRec['_event_name_parts']['part']['status'],

            compensatedTime = UtilMarkets.compensatedTime(diff) || oldRec['_event_name_parts']['compensatedTime'],

            score_home = UtilMarkets._getScoreHome(diff) || oldRec['_event_name_parts']['score']['score_home'],
            score_away = UtilMarkets._getScoreAway(diff) || oldRec['_event_name_parts']['score']['score_away'],

        //parts = UtilMarkets.parts(diff) || oldRec['_event_name_parts']['parts'],
            partsH_ = UtilMarkets._getPartsH(diff),
            partsH = oldRec['_event_name_parts']['parts']['partsH'],
            partsA_ = UtilMarkets._getPartsA(diff),
            partsA = oldRec['_event_name_parts']['parts']['partsA'],

            service = UtilMarkets._getScoreService(diff) || oldRec['_event_name_parts']['game']['service'],
            tiebreak = UtilMarkets._getScoreTiebreak(diff) || oldRec['_event_name_parts']['game']['tiebreak'],
            gameH = UtilMarkets._gameBaseH(diff, volleyball) || oldRec['_event_name_parts']['game']['gameH'] || '0',
            gameA = UtilMarkets._gameBaseA(diff, volleyball) || oldRec['_event_name_parts']['game']['gameA'] || '0',

            inning = UtilMarkets.inning(diff) || oldRec['_event_name_parts']['inning'],
            penalty = UtilMarkets.penalty(diff) || oldRec['_event_name_parts']['penalty'],
            removalsFull = UtilMarkets.removalsFull(diff) || oldRec['_event_name_parts']['removalsFull'];

        if (Ext.Object.getSize(partsH_)) {
            Ext.Object.merge(partsH, partsH_);
            // console.info(diff['home'], partsH_, partsH);
        }
        if (Ext.Object.getSize(partsA_)) {
            Ext.Object.merge(partsA, partsA_);
            // console.info(diff['home'], partsA_, partsA);
        }

        if (partName_) {
            partName = partName_;
            partOver = null;
            status = null;
            if (partNum_) {
                partNum = partNum_;
            }
        }
        if (partOver_) {
            partOver = partOver_;
            status = null;
        }
        if (status_) {
            status = status_;
            partOver = null;
            compensatedTime = null;
        }
        //if (status_ || partOver_)
        //console.info('status: ', diff['home'], status_, partOver_);

        /*if(service){
         var feed = '<span style="font-weight: 600;color:#ff3300;font-size: 18px;">*</span>';
         if (1 == service) {
         gameH = feed + "" + gameH;
         }
         if (2 == service) {
         gameA = gameA  + "" + feed;
         }
         }
         if(tiebreak){
         tiebreak = UtilMarkets.t('markets.tennis.tiebreak') + " ";
         gameH = tiebreak + gameH;
         }*/


        /*if (compensatedTime_) {
         compensatedTime = compensatedTime_;
         }*/
        /* if (parts_) {
         parts = parts_;
         console.info('parts: ',diff['home'], parts);
         }*/

        return {
            part: {
                partName: partName,
                partNum: partNum,
                partOver: partOver,
                status: status
            },
            compensatedTime: compensatedTime,
            score: {
                score_home: score_home || '0',
                sep: ':',
                score_away: score_away || '0'
            },
            parts: {
                partsH: partsH,
                partsA: partsA
            },
            game: {
                service: service,
                tiebreak: tiebreak,
                gameH: gameH,
                gameA: gameA
            },
            inning: inning,
            penalty: penalty,
            removalsFull: removalsFull
        };
    },

    // * маппинг
    // * извлечение из сырых данных записей по событиям и кэфы
    // * срабатывает каждый раз как приходят кэфы
    getMatchdataTournaments: function (tournaments, firstLoad, grid) {
        var arrEventOut = [],
            itemId = grid.getItemId(),
            currentTime = new Date(),
            strCurrentTime = Ext.Date.format(currentTime, 'timestamp');

        // * перебор турниров
        Ext.Array.each(tournaments, function (recTournamentIn) {
            var arrEventIn = recTournamentIn['events'];
            if (arrEventIn && arrEventIn.length > 0) { // * имеются события
                Ext.Array.each(arrEventIn, function (objEventIn) {
                    var objEventOut = {},
                        time = new Date(objEventIn['time']),
                        strTime = Ext.Date.format(time, 'timestamp'),
                        eventExists = Ext.Array.findBy(arrEventOut, function (item) {
                            return item['event_id'] == objEventIn['id'];
                        });

                    // * суть условия сводится к следующему:
                    // * если матч не закончен и
                    // * для line добавлять только не начавшиеся еще турниры
                    // * для live только уже начавшиеся, но не крыс
                    // * для крыс- только еще не начавшихся крыс

                    if ((!objEventIn['finished'])
                        && ((itemId == 'rats'
                        && (recTournamentIn['sport_id'] == UtilMarkets.getRatsId() && strTime > strCurrentTime))
                        || (itemId != 'rats'
                        && (itemId == 'live' && strTime < strCurrentTime && recTournamentIn['sport_id'] != UtilMarkets.getRatsId()))
                        || (itemId != 'rats'
                        && (itemId == 'line' && strTime > strCurrentTime)))) { // * не показываем закончившиеся матчи

                        //if (itemId == 'rats')
                        //    console.info(recTournamentIn.name);

                        // * события
                        objEventOut['tournament_id'] = recTournamentIn['id'];
                        objEventOut['sport_id'] = recTournamentIn['sport_id'];
                        objEventOut['sport_slug'] = UtilMarkets.getSportSlug(recTournamentIn);
                        objEventOut['tournament_name'] = recTournamentIn['name'];
                        objEventOut['rating'] = recTournamentIn['rating'];
                        objEventOut['type'] = grid.getItemId();
                        objEventOut['dependent_events'] = recTournamentIn['dependent_events'];

                        objEventOut['cs'] = objEventIn['cs'] || {};
                        objEventOut['cse'] = objEventIn['cse'] || {};

                        objEventOut['event_id'] = objEventIn['id'];
                        objEventOut['current_second'] = objEventIn['current_second'];

                        objEventOut['home'] = objEventIn['home'];
                        objEventOut['away'] = objEventIn['away'];

                        objEventOut['betting_closed'] = objEventIn['betting_closed']; // * прием ставок приостановлен
                        objEventOut['comment'] = objEventIn['comment'];
                        objEventOut['finished'] = objEventIn['finished'];
                        objEventOut['short_number'] = objEventIn['short_number'];
                        objEventOut['status'] = objEventIn['status'];
                        objEventOut['time'] = objEventIn['time'];
                        objEventOut['timer_stopped'] = objEventIn['timer_stopped'];

                        objEventOut['_current_second'] = objEventOut['current_second']; // * вспомогательное поле для хранения текущего таймера

                        // * при первой загрузке формируем и сохраняем те значения, которые не будут меняться
                        if (firstLoad || objEventOut['sport_slug'] == "sport_rats") {// * длч крыс нужно каждый раз обновлять эти данные
                            // * дата матча и время
                            objEventOut['_date_base'] = this.dateBase(objEventIn);
                            // * инициализация объекта
                            objEventOut['_event_name_parts'] = this.eventNamePartsInit();
                            objEventOut['_event_name_base'] = this.eventNameBase(objEventIn);
                            objEventOut['_event_name_parts'] = this.calcEventNameParts(objEventOut, objEventOut);
                            objEventOut['_event_name'] = this.eventName(objEventOut, objEventOut['_event_name_parts'], grid);
                        }

                        // * иногда бывает так, что данные по одному событию приходят в одном пакете разными строчками
                        if (!eventExists) {
                            arrEventOut.push(objEventOut);
                        } else {  // * такое событие уже есть, добавим в него данные
                            Ext.Array.merge(eventExists['cs'], objEventOut['cs']);
                            Ext.Array.merge(eventExists['cse'], objEventOut['cse']);
                        }

                        // * обновим купон, если требуется
                        //this.updateBasket(objEventOut);
                    }
                }, this);
            }
        }, this);
        return arrEventOut;
    },

    // * маппинг Экспресса дня
    getDayExpressTournaments: function (dayExpress, grid) {
        var arrEventOut = [],
            tournaments = dayExpress.events,
            itemId = grid.getItemId(),
            currentTime = new Date(),
            strCurrentTime = Ext.Date.format(currentTime, 'timestamp');

        // * увеличение кэфов ДШ на 5%
        var multipleDC5 = function (cs) {
            Ext.Object.each(cs, function (key, val) {
                if (key.indexOf('_SCORE_') == -1) { // * не служебный кэф
                    if (val) {
                        val[2] = (val[2] * 1.05).toFixed(2);
                    }
                }
            });
            return cs;
        };

        if (tournaments && tournaments.length > 0) { // * имеются события
            Ext.Array.each(tournaments, function (objEventIn) {
                var objEventOut = {},
                    time = new Date(objEventIn['time']),
                    strTime = Ext.Date.format(time, 'timestamp'),
                    eventExists = Ext.Array.findBy(arrEventOut, function (item) {
                        return item['event_id'] == objEventIn['id'];
                    });

                if (strTime > strCurrentTime) {
                    objEventOut['de_id'] = dayExpress['de_id'];
                    objEventOut['tournament_id'] = objEventIn['tournament_id'];
                    objEventOut['de_type'] = dayExpress['de_type'];
                    objEventOut['sport_id'] = objEventIn['sport_id'];
                    objEventOut['sport_slug'] = UtilMarkets.getSportSlug(objEventIn);
                    objEventOut['tournament_name'] = objEventIn['tournament_name'];
                    objEventOut['type'] = grid.getItemId();

                    if (dayExpress['de_type'] == 1)
                        objEventOut['cs'] = multipleDC5(objEventIn['cs']) || {};
                    else
                        objEventOut['cs'] = objEventIn['cs'] || {};

                    objEventOut['event_id'] = objEventIn['id'];
                    objEventOut['current_second'] = objEventIn['current_second'];

                    objEventOut['home'] = objEventIn['home'];
                    objEventOut['away'] = objEventIn['away'];

                    objEventOut['betting_closed'] = objEventIn['betting_closed']; // * прием ставок приостановлен
                    objEventOut['comment'] = objEventIn['comment'];
                    objEventOut['finished'] = objEventIn['finished'];
                    objEventOut['short_number'] = objEventIn['short_number'];
                    objEventOut['status'] = objEventIn['status'];
                    objEventOut['time'] = objEventIn['time'];
                    objEventOut['timer_stopped'] = objEventIn['timer_stopped'];

                    objEventOut['_current_second'] = objEventOut['current_second']; // * вспомогательное поле для хранения текущего таймера

                    if (!eventExists) {
                        arrEventOut.push(objEventOut);
                    } else {  // * такое событие уже есть, добавим в него данные
                        Ext.Array.merge(eventExists['cs'], objEventOut['cs']);
                    }
                }
            }, this);
        }

        if ((itemId == 'dayexpress' && arrEventOut.length == Util.getGlobalConst("NUMBER_EVENTS_IN_DAY_EXPRESS"))
            || (itemId == 'dayexpressDC' && arrEventOut.length >= Util.getGlobalConst("MIN_NUMBER_EVENTS_IN_COUPON_DAY_EXPRESS_DOUBLE_CHANCE")))
            return arrEventOut;
        else
            return [];
    },

    getDayExpressTournamentsEmpty: function (dayExpress, grid) {
        var arrEventOut = [],
            tournaments = dayExpress.events,
            itemId = grid.getItemId(),
            currentTime = new Date(),
            strCurrentTime = Ext.Date.format(currentTime, 'timestamp');

        if (tournaments && tournaments.length > 0) { // * имеются события
            Ext.Array.each(tournaments, function (objEventIn) {
                var objEventOut = {},
                    time = new Date(objEventIn['time']),
                    strTime = Ext.Date.format(time, 'timestamp'),
                    eventExists = Ext.Array.findBy(arrEventOut, function (item) {
                        return item['event_id'] == objEventIn['id'];
                    });

                if (strTime > strCurrentTime) {
                    objEventOut['de_id'] = dayExpress['de_id'];
                    objEventOut['tournament_id'] = objEventIn['tournament_id'];
                    objEventOut['de_type'] = dayExpress['de_type'];
                    objEventOut['sport_id'] = objEventIn['sport_id'];
                    objEventOut['sport_slug'] = UtilMarkets.getSportSlug(objEventIn);
                    objEventOut['tournament_name'] = objEventIn['tournament_name'];
                    objEventOut['type'] = grid.getItemId();

                    if (dayExpress['de_type'] == 1)
                        objEventOut['cs'] = multipleDC5(objEventIn['cs']) || {};
                    else
                        objEventOut['cs'] = objEventIn['cs'] || {};

                    objEventOut['event_id'] = objEventIn['id'];
                    objEventOut['current_second'] = objEventIn['current_second'];

                    objEventOut['home'] = objEventIn['home'];
                    objEventOut['away'] = objEventIn['away'];

                    objEventOut['betting_closed'] = objEventIn['betting_closed']; // * прием ставок приостановлен
                    objEventOut['comment'] = objEventIn['comment'];
                    objEventOut['finished'] = objEventIn['finished'];
                    objEventOut['short_number'] = objEventIn['short_number'];
                    objEventOut['status'] = objEventIn['status'];
                    objEventOut['time'] = objEventIn['time'];
                    objEventOut['timer_stopped'] = objEventIn['timer_stopped'];

                    objEventOut['_current_second'] = objEventOut['current_second']; // * вспомогательное поле для хранения текущего таймера

                    if (!eventExists) {
                        arrEventOut.push(objEventOut);
                    } else {  // * такое событие уже есть, добавим в него данные
                        Ext.Array.merge(eventExists['cs'], objEventOut['cs']);
                    }
                }
            }, this);
        }

        if ((itemId == 'dayexpress' && arrEventOut.length == Util.getGlobalConst("NUMBER_EVENTS_IN_DAY_EXPRESS"))
            || (itemId == 'dayexpressDC' && arrEventOut.length >= Util.getGlobalConst("MIN_NUMBER_EVENTS_IN_COUPON_DAY_EXPRESS_DOUBLE_CHANCE")))
            return arrEventOut;
        else
            return [];
    },

    // * преобразует элементы объекта _event_name_parts в строку
    eventName: function (event, _event_name_parts, grid) {
        var feed = '<span style="font-weight: 600;color:#ff3300;font-size: 18px;">*</span>';

        eventNameGame = function (sep, val) {
            var strOut = '';
            Ext.Object.each(val, function (k, v) {
                if (v != null) {
                    if (k == 'tiebreak') {
                        var tiebreak = UtilMarkets.t('markets.tennis.tiebreak') + " ";
                        strOut += tiebreak + val['gameH'] + sep + val['gameA'];
                    } else if (k == 'service') {
                        if (1 == v) {
                            strOut += feed + val['gameH'] + sep + val['gameA'];
                        }
                        if (2 == v) {
                            strOut += val['gameH'] + sep + val['gameA'] + feed;
                        }
                    }
                }
            }, this);
            return strOut;
        };
        if (grid.getItemId() == 'live' // * только для live
            && event['sport_slug'] != 'sport_rats') { // * не для крыс
            var strOut = '';
            Ext.Object.each(_event_name_parts, function (key, val) {
                if (val != null) {
                    if (key == 'part') {
                        if (Ext.Object.getSize(val)) {
                            strOut += ' ';
                            Ext.Object.each(val, function (k, v) {
                                if (v) {
                                    if ((k == 'partName') && !val['partOver'] && !val['status']) {
                                        strOut += v + ':';
                                    } else if (((k == 'partNum') && !val['partOver'] && !val['status'])
                                        || k == 'partOver' || k == 'status') {
                                        strOut += v;
                                    }
                                }
                            }, this);
                        }
                    } else if (key == 'score') {
                        if (Ext.Object.getSize(val)) {
                            strOut += ' ';
                            Ext.Object.each(val, function (k, v) {
                                if (v != null) {
                                    strOut += v;
                                }
                            }, this);
                        }
                    } else if (key == 'game') {
                        // * отображаем внутри parts
                    } else if (key == 'parts') {
                        strOut += ' (';
                        Ext.Object.each(val['partsH'], function (k, v) {
                            v = v || '0';
                            var partsA = val['partsA'][k] || '0';
                            if (k == 1)
                                strOut += v + ':' + partsA;
                            else
                                strOut += ', ' + v + ':' + partsA;
                        }, this);
                        if (event['sport_slug'] == 'tennis') {
                            var sep = '-';
                            strOut += ')';
                            strOut += '(';
                            strOut += eventNameGame(sep, _event_name_parts['game']);
                        } else if (event['sport_slug'] == 'volleyball') {
                            var sep = ':';
                            if (Ext.Object.getSize(val['partsH']))
                                strOut += ', ';
                            strOut += eventNameGame(sep, _event_name_parts['game']);
                        }
                        strOut += ')';
                    } else strOut += ' ' + val;
                }
            }, this);
            return this.eventNameBase(event) + '<br>' + strOut;
        } else if (event['sport_slug'] == 'sport_rats') { // * для крыс
            return this.eventNameBaseRats(event);
        } else {
            return this.eventNameBase(event);
        }
    },

    // * вторая колонка в таблице событий- название команд и др. статусы
    eventNameBase: function (event) {
        // * строчки 1..2 колонки _event_name Событие
        var eventName1 = Util.colorText('green', '1&nbsp&nbsp') + event['home'],
            eventName2 = Util.colorText('red', '2&nbsp&nbsp') + event['away'],
            eventNumber = '<span style="float: right;color: #8A259B;">' + '№ ' + event['short_number'] + '</span>';
        return eventName1 + eventNumber + '<br>' + eventName2;
    },

    // * текст Стол 1/Стол 2 для 2-й колонки турниров Крыс
    eventNameBaseRats: function (event) {
        // * строчки 1..2 колонки _event_name Событие

        var color = event['tournament_name'] == 'Стол 1'? '#58CD87':'#64BDFC',
            eventName1 = '<span style="color: '+color+';font-size:57px;">' + event['tournament_name'] + '</span>',
            eventNumber = '<span style="float: right;color: #8A259B;">' + '№ ' + event['short_number'] + '</span>';
        //var eventName1 = '<span style="color: #F5F5F5;font-size:58px;">' + event['tournament_name'] + '</span>',
        //    eventNumber = '<span style="float: right;color: #8A259B;">' + '№ ' + event['short_number'] + '</span>';
        return eventNumber + '<br>' + eventName1;
    },

    // * форматирует вывод даты и времени для таблицы событий
    dateBase: function (diff) {
        if (diff['time']) {
            var time = new Date(diff['time']),
                eventIdText1 = Ext.Date.format(time, 'd.m'),
                eventIdText2 = Ext.Date.format(time, 'H:i');
            return eventIdText1 + '<br>' + eventIdText2;
        } else
            return '';
    },

    //get_current_second: function (val, column, rec) {
    //    return UtilMarkets.durationText(rec.getData());
    //}


});