// * применение изменений по состояниям и кэфам
Ext.define('Office.view.fill.coeff.ApplyChangedData', {
    singleton: true,
    alternateClassName: ['ApplyChangedData'],

    // * загрузка изменений по кэфам и событиям (diffs)
    loadDiffs: function (arrDiffs, curLineVers, storeName) {
        var idxGrid = this.getGridIdx(storeName),
            grid = Ext.ComponentQuery.query('grideventlive')[idxGrid],
            vmLive = grid.getViewModel(),
            menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            eventstore = vm.getStore(storeName),
            selection = grid.getSelectionModel().getSelection()[0];

        if (arrDiffs && arrDiffs.length) {
            var arrEventOut = this.getMatchdataTournaments(arrDiffs, false, storeName);
            if (arrEventOut.length) {
                Ext.suspendLayouts();
                if (storeName == 'rats') {
                    ApplyChangedData.loadDataToFantomRecords(arrEventOut, storeName);
                } else {
                    this.applyDiffs(storeName, arrEventOut);
                }

                // * обновим купон, если требуется
                this.updateBasket(arrEventOut);

                // * если уже были показаны кэфы (выделено событие), то нужно перепоказать их
                if (selection && BasketF.isActiveEventTab(grid)) {// * данная вкладка выделена
                    Ext.Array.each(arrEventOut, function (objTournament) {
                        if (objTournament['short_number'] == selection.get('short_number')) {
                            grid.getController().showCoefs(selection);
                        }
                    }, this);
                }

                //vmLive.set('line_version', curLineVers);

                Ext.resumeLayouts(true);
            }
        } else {
            //console.warn('matchdata.diffs: is null');
        }
    },


    // * первоначальная загрузка данных по кэфам и событиям (matchdata) - загрузка из rawstore в eventsrore
    loadMatchdataData: function (arrTournaments, curLineVers, storeName) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            idxGrid = this.getGridIdx(storeName),
            grid = Ext.ComponentQuery.query('grideventlive')[idxGrid],
            vmLive = grid.getViewModel(),
            arrResp = [];

        Ext.suspendLayouts();
        if (arrTournaments) {
            if (arrTournaments && arrTournaments.length) { // * имеются турниры
                var arrEventOut = this.getMatchdataTournaments(arrTournaments, true, storeName);
                if (arrEventOut.length) {
                    if (storeName == 'rats') {
                        this.loadDataToFantomRecords(arrEventOut, storeName);
                    } else {
                        vm.getStore(storeName).loadData(arrEventOut);
                    }

                    // * обновим купон, если требуется
                    this.updateBasket(arrEventOut);
                }
            }
            //vmLive.set('line_version', curLineVers);
        } else {
            console.warn('matchdata.data: is null');
        }
        Ext.resumeLayouts(true);
    },

    // * Экспресс дня: загрузка из rawstore в eventstore
    loadDayExpress: function (objData, storeName) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            idxGrid = this.getGridIdx(storeName),
            grid = Ext.ComponentQuery.query('grideventlive')[idxGrid],
            vmLive = grid.getViewModel(),
            eventstore = vm.getStore(storeName),
            eventstore_chained = vmLive.getStore('eventstore_chained'),
            fill = Ext.ComponentQuery.query('fill')[0],
            vmFill = fill.getViewModel();

        // * чтобы в гриде не показывались записи с событиями
        //eventstore_chained.filterBy(function () {
        //    return null;
        //});

        var arrEventOut = this.getDayExpressTournaments(objData, storeName),
            dataName = grid.getItemId() + '_Loaded';

        if (arrEventOut && arrEventOut.length) {
            eventstore.loadData(arrEventOut);
        }

        // * покажем/скроем вкладку Пятерочка (сформируем название параметра из FillM, означающего, что стор Экспресса дня загружен и нужно показать вкладки Пятерочка и ДШ)
        vmFill.set(dataName, arrEventOut.length);

        var eventstab = fill.down('#eventstab'),
            activeTabEvent = eventstab.getActiveTab();

        if (BasketF.isDayExpress())
            MarketsHtml.dayExpressClick(activeTabEvent);
    },

    // * обновить купон
    updateBasket: function (arrEventOut) {
        var fill = Ext.ComponentQuery.query('fill')[0];

        if (fill) {
            var vm = fill.getViewModel(),
                storeBasket = vm.getStore('basket'),
                arrToDelete = [],
                arrResp = [],
                coefChanged = false;

            function iterateStore(obj, cs) {
                storeBasket.each(function (item) {
                    if (item && (item.get('event_id') == obj['event_id']
                        || item.get('event_id') == obj['id'])) {
                        Ext.Object.each(cs, function (key, val) {
                            var arrCoef = item.get('arrCoef'),
                                basketCoefTypeId = arrCoef[1],
                                arrBasis = item.get('arrBasis'),
                                basketBasisTypeId = arrBasis[1],
                                changedCoefTypeId = val[1].toString(),
                                objChanged = {};

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
                                    item.set('coefId', val[0]);
                                }
                                coefChanged = true;
                            }

                            if (basketBasisTypeId && changedCoefTypeId == basketBasisTypeId.toString()) {
                                // * нужно ли тут это?
                                arrBasis[0] = val[0];
                                arrBasis[3] = arrBasis[2];
                                arrBasis[2] = val[2];

                                item.set('coefName', BasketF.getCoefShortName(arrCoef[1], arrBasis[2]));
                                coefChanged = true;
                            }
                        }, this);
                    }
                }, this);
            }

            // * перебор пришедших событий
            Ext.Array.each(arrEventOut, function (obj) {
                if (obj['cs']) {
                    iterateStore(obj, obj['cs']);
                }
                if (obj['cse']) {
                    iterateStore(obj, obj['cse']);
                }
            }, this);

            // * отправим на монитор изменившиеся значения по ставкам
            if (arrResp.length) {
                MonitorF.sendChangedBetsToMonitor(arrResp, 1);
            }

            Ext.defer(function () {
                if (arrToDelete.length) {
                    storeBasket.remove(arrToDelete);
                }

                if (coefChanged) {
                    // * обновим грид итогов в Экспрессе
                    var gridExpress = Ext.ComponentQuery.query('gridbasketexpress')[0];
                    gridExpress.getController().updateBasketSum();
                }
            }, 200, this);
        }
    },

    loadDataToFantomRecords: function (arrEventOut, storeName) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            storeEvent = vm.getStore(storeName);

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
            removals: {
                removalsH: null,
                removalsA: null
            }
        };
    },

    applyServiceCoeffs: function (diff, oldRec, storeName) {
        if (oldRec) {
            diff['_event_name_parts'] = this.calcEventNameParts(diff, oldRec.getData());
            oldRec.set('_event_name_parts', diff['_event_name_parts']);
            oldRec.set('_event_name', this.eventName(oldRec.getData(), diff['_event_name_parts'], storeName));
            return oldRec;
        } else {
            diff['_event_name_parts'] = this.eventNamePartsInit();
            diff['_date_base'] = this.dateBase(diff);
            diff['_event_name_base'] = this.eventNameBase(diff);
            diff['_event_name_parts'] = this.calcEventNameParts(diff, diff);
            diff['_event_name'] = this.eventName(diff, diff['_event_name_parts'], storeName);
            return diff;
        }
    },

    iterateCs: function (diffCs, cs) {
        Ext.Object.each(diffCs, function (key, val) {
            if (cs) {
                if (UtilMarkets.isNotServiceCoef(key)) { // * не служебный кэф
                    if (cs[key]) { // * изменение кэфа
                        cs[key][0] = val[0];
                        cs[key][3] = cs[key][2]; // * сохраним прежнее значение кэфа, чтобы потом выделить красным или зеленым
                        cs[key][2] = val[2];
                    } else { // * добавление кэфа
                        cs[key] = val;
                    }
                } else {// * служебный кэф
                    cs[key] = val;
                }
            } else {
                console.warn(oldRec);
            }
        }, this);
    },

    // * применение изменившихся значений кэфов
    // * означает переход к новому элементу внутри diffs.diffdata[]
    // * arrDiffs - массив событий всех events внутри всех tournaments внути данного diffdata
    applyDiffs: function (storeName, arrDiffs) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            storeEvent = vm.getStore(storeName),
            _this = this,
            currentTime = new Date(),
            strCurrentTime = Ext.Date.format(currentTime, 'timestamp');

        // * идем по изменениям
        Ext.Array.each(arrDiffs, function (diff) {
            var time = new Date(diff['time']),
                strTime = Ext.Date.format(time, 'timestamp');
            if (((storeName == 'live' || storeName == 'rats') && strTime <= strCurrentTime)
                || (storeName == 'line' && strTime > strCurrentTime)) {

                var oldRec = storeEvent.findRecord('event_id', diff['event_id'], 0, false, true, true);
                if (oldRec) { // * изменяем событие
                    oldRec.set('current_second', diff['current_second']);
                    oldRec.set('_current_second', diff['current_second']);
                    oldRec.set('betting_closed', diff['betting_closed']);
                    oldRec.set('status', diff['status']);
                    oldRec.set('timer_stopped', diff['timer_stopped']);

                    // * применим служебные кэфы
                    oldRec = this.applyServiceCoeffs(diff, oldRec, storeName);

                    var cs = oldRec.get('cs'),
                        cse = oldRec.get('cse');

                    _this.iterateCs(diff['cs'], cs);
                    _this.iterateCs(diff['cse'], cse);

                    if (UtilMarkets.is_ended(diff)) {
                        oldRec.set('finished', 1);
                    }
                } else { // * добавляем событие
                    // * не нужно добавлять матч, если нет данных по кэфам (такое бывает)
                    if (diff['finished'] != 1 && this.haveCoefs(diff) && !UtilMarkets.is_ended(diff)) {
                        diff = this.applyServiceCoeffs(diff, null, storeName);

                        storeEvent.add(diff);

                        var idxGrid = this.getGridIdx(storeName),
                            grid = Ext.ComponentQuery.query('grideventlive')[idxGrid];
                        TaskF.doBufferRenderUpdate(grid, storeEvent);
                    }
                }
            }
        }, this);
    },

    // * проверка, что есть кэфы в пришедших данных, а не только служебная информация
    haveCoefs: function (diff) {
        var flag = false;

        if (diff['cs'] || diff['cse']) {
            Ext.Object.each(diff['cs'], function (key, val) {
                if (UtilMarkets.isNotServiceCoef(key) && key.indexOf('EMPTY') == -1) { // * не служебный кэф
                    flag = true;
                }
            }, this);

            Ext.Object.each(diff['cse'], function (key, val) {
                if (UtilMarkets.isNotServiceCoef(key) && key.indexOf('EMPTY') == -1) { // * не служебный кэф
                    flag = true;
                }
            }, this);
        }

        return flag;
    },

    calcEventNameParts: function (diff, oldRec) {
        var sport_slug = diff['sport_slug'],
            volleyball = sport_slug == 'volleyball' ? true : false,
            partNum_ = UtilMarkets.partNum(diff),
            partName_ = UtilMarkets.partName(diff),
            partOver_ = UtilMarkets.partOver(diff),
            status_ = UtilMarkets.status(oldRec),
            removalsH_ = UtilMarkets.removalsH(diff),
            removalsA_ = UtilMarkets.removalsA(diff),
            compensatedTime_ = UtilMarkets.compensatedTime(diff),
            service_ = UtilMarkets._getScoreService(diff),
            tiebreak_ = UtilMarkets._getScoreTiebreak(diff, oldRec),
            inning_ = UtilMarkets.inning(diff),
            penalty_ = UtilMarkets.penalty(diff),
            gameH_ = UtilMarkets._gameBaseH(diff, volleyball, oldRec),
            gameA_ = UtilMarkets._gameBaseA(diff, volleyball, oldRec),
            score_home_ = UtilMarkets._getScoreHome(diff),
            score_away_ = UtilMarkets._getScoreAway(diff),

        // * старые значения
            partNum = oldRec['_event_name_parts']['part']['partNum'],
            partName = oldRec['_event_name_parts']['part']['partName'],
            partOver = oldRec['_event_name_parts']['part']['partOver'],
            status = oldRec['_event_name_parts']['part']['status'],
            removalsH = oldRec['_event_name_parts']['removals']['removalsH'],
            removalsA = oldRec['_event_name_parts']['removals']['removalsA'],
            compensatedTime = oldRec['_event_name_parts']['compensatedTime'],
            service = oldRec['_event_name_parts']['game']['service'],
            tiebreak = oldRec['_event_name_parts']['game']['tiebreak'],
            inning = oldRec['_event_name_parts']['inning'],
            penalty = oldRec['_event_name_parts']['penalty'],

            score_home = oldRec['_event_name_parts']['score']['score_home'],
            score_away = oldRec['_event_name_parts']['score']['score_away'],

            partsH_ = UtilMarkets._getPartsH(diff, oldRec),
            partsH = oldRec['_event_name_parts']['parts']['partsH'],
            partsA_ = UtilMarkets._getPartsA(diff, oldRec),
            partsA = oldRec['_event_name_parts']['parts']['partsA'],

            gameH = oldRec['_event_name_parts']['game']['gameH'],
            gameA = oldRec['_event_name_parts']['game']['gameA'];

        // * при смене счета для тенниса обнулим подачи
        if (Ext.Object.getSize(partsH_)) {
            this.mergeParts(partsH, partsH_);
        }

        if (Ext.Object.getSize(partsA_)) {
            this.mergeParts(partsA, partsA_);
        }

        if (partName_) {
            partOver = null;
            status = null;
            if (partNum_) {
                partNum = partNum_;
            }
            // * если номер тайма не указан, то пусть будет 1
            if (!partNum) {
                partNum = 1;
            }
            if (partNum == 0) {
                partName = null;
                partNum = null;
            } else {
                partName = partName_;
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

        if (removalsH_ != null) {
            removalsH = removalsH_;
        }

        if (removalsA_ != null) {
            removalsA = removalsA_;
        }

        if (compensatedTime_ != false) {
            compensatedTime = compensatedTime_;
        }

        if (service_) {
            service = service_;
        }

        if (tiebreak_) {
            tiebreak = tiebreak_;
        }

        if (inning_) {
            inning = inning_;
        }

        if (penalty_) {
            penalty = penalty_;
        }

        if (gameH_ != null) {
            gameH = gameH_;
        }

        if (gameA_ != null) {
            gameA = gameA_;
        }

        if (gameA == null || gameH == null) {
            gameH = '0';
            gameA = '0';
        }

        if (score_home_ != null) {
            score_home = score_home_;
        }

        if (score_away_ != null) {
            score_away = score_away_;
        }

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
            removals: {
                removalsH: removalsH,
                removalsA: removalsA
            }
        };
    },

    mergeParts: function (objOld, objNew) {
        Ext.Object.each(objNew, function (key, val) {
            if (objOld) {
                if (val != "0" || (val == "0" && !objOld[key])) {
                    objOld[key] = val;
                }
            }
        });
    },

    // * маппинг Экспресса дня
    getDayExpressTournaments: function (dayExpress, storeName) {
        var arrEventOut = [],
            tournaments = dayExpress.events,
            currentTime = new Date(),
            strCurrentTime = Ext.Date.format(currentTime, 'timestamp');

        // * увеличение кэфов ДШ на 5%
        var multipleDC5 = function (cs) {
            Ext.Object.each(cs, function (key, val) {
                if (UtilMarkets.isNotServiceCoef(key)) { // * не служебный кэф
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
                    objEventOut['type'] = storeName;

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

        var numberDE = parseInt(Util.getGlobalConst("NUMBER_EVENTS_IN_DAY_EXPRESS")),
            minNumberDE = parseInt(Util.getGlobalConst("MIN_NUMBER_EVENTS_IN_COUPON_DAY_EXPRESS_DOUBLE_CHANCE"));

        if ((storeName == 'dayexpress' && arrEventOut.length == numberDE)
            || (storeName == 'dayexpressDC' && arrEventOut.length >= minNumberDE))
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

        var numberDE = parseInt(Util.getGlobalConst("NUMBER_EVENTS_IN_DAY_EXPRESS")),
            minNumberDE = parseInt(Util.getGlobalConst("MIN_NUMBER_EVENTS_IN_COUPON_DAY_EXPRESS_DOUBLE_CHANCE"));
        if ((itemId == 'dayexpress' && arrEventOut.length == numberDE)
            || (itemId == 'dayexpressDC' && arrEventOut.length >= minNumberDE))
            return arrEventOut;
        else
            return [];
    },

    // * преобразует элементы объекта _event_name_parts в строку
    eventName: function (event, _event_name_parts, grid) {
        var feed = '<span style="font-weight: 600;color:#ff3300;font-size: 18px;">*</span>';

        function eventNameGame(sep, val) {
            var strOut = '';
            Ext.Object.each(val, function (k, v) {
                if (k == 'service') {
                    if (v == "0" || v == null) {
                        strOut = val['gameH'] + sep + val['gameA'];
                    }
                    if (v == 1) {
                        strOut = feed + val['gameH'] + sep + val['gameA'];
                    }
                    if (v == 2) {
                        strOut = val['gameH'] + sep + val['gameA'] + feed;
                    }
                }

                if (k == 'tiebreak') {
                    if (v == 1) {
                        var tiebreak = UtilMarkets.t('markets.tennis.tiebreak') + " ";
                        strOut = tiebreak + strOut;
                    }
                }
            }, this);
            return strOut;
        };

        if (grid.getItemId() == 'live' // * только для live
            && event['sport_slug'] != 'sport_rats') { // * не для крыс
            var strOut = '';

            // * перебираем св-ва в "_event_name_parts"
            Ext.Object.each(_event_name_parts, function (key, val) {
                if (val != null) {
                    if (key == 'removals') {

                        if ((val['removalsH'] != null && val['removalsA'] != null )
                            && (val['removalsH'] != "0" || val['removalsA'] != "0")) {

                            var removalsH = val['removalsH'] || "0",
                                removalsA = val['removalsA'] || "0",
                                strColored = Util.colorText('crimson', UtilMarkets.t('templates.removals', {removals: [removalsH, removalsA].join(':')}));
                            strOut += ' ' + strColored;
                        }
                    } else if (key == 'part') {
                        if (Ext.Object.getSize(val)) {
                            Ext.Object.each(val, function (k, v) {
                                if (v) {
                                    if ((k == 'partName') && !val['partOver'] /*&& !val['status']*/ && val['partNum']) {
                                        strOut += Util.colorText('blue', v + ':');
                                    } else if (((k == 'partNum') && !val['partOver'] /*&& !val['status']*/)) {
                                        strOut += Util.colorText('blue', v);
                                    } else if (k == 'status' || k == 'partOver') {
                                        strOut += ' ' + Util.colorText('gray', '(' + v + ')');
                                    }
                                }
                            }, this);
                        }
                    } else if (key == 'score') {
                        if (Ext.Object.getSize(val)) {
                            if (strOut) {
                                strOut += ' ';
                            }

                            Ext.Object.each(val, function (k, v) {
                                if (v != null) {
                                    strOut += v;
                                }
                            }, this);
                        }
                    } else if (key == 'game') {
                        // * отображаем внутри parts
                    } else if (key == 'parts') {
                        if (strOut)
                            strOut += ' (';

                        if (Ext.Object.getSize(val['partsH'])) {
                            Ext.Object.each(val['partsH'], function (k, v) {
                                v = v || '0';
                                var partsA = val['partsA'][k] || '0';
                                if (k == 1)
                                    strOut += v + ':' + partsA;
                                else
                                    strOut += ', ' + v + ':' + partsA;
                            }, this);
                        } else {
                            strOut += '0:0';
                        }

                        if (event['sport_slug'] == 'tennis' || event['sport_slug'] == 'volleyball') {
                            var sep = '-';
                            strOut += ')';
                            strOut += ' [';
                            strOut += eventNameGame(sep, _event_name_parts['game']);
                            strOut += ']';
                        } else
                            strOut += ')';
                    } else
                        strOut += ' ' + Util.colorText('crimson', val); // * removalsFull, penalty, inning, compensatedTime
                }
            }, this);
            return this.eventNameBase(event) + '<br>' + strOut;
        } else if (event['sport_slug'] == 'sport_rats') { // * для крыс
            return this.eventNameBaseRats(event);
        } else {// * для линии
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
        var table = Util.findByKey(Config.arrRatTableColors, 'name', event['tournament_name']);
        if (table)
            var color = table['color'];
        else
            var color = 'gray';

        var eventName1 = '<span style="color: ' + color + ';font-size:57px;">' + event['tournament_name'] + '</span>',
            eventNumber = '<span style="float: right;color: #8A259B;">' + '№ ' + event['short_number'] + '</span>';
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

    saveDataToStore: function (data, storeName) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            idxGrid = this.getGridIdx(storeName),
            grid = Ext.ComponentQuery.query('grideventlive')[idxGrid];


        if (grid) {
            var vmLive = grid.getViewModel();

            if (data) {
                var type = data.type,
                    arrTournaments = data.tournaments,
                    dayExpress = data.dayExpress,
                    curLineVers = data.line_version; // * номер текущей линии

                vm.set('line_version.' + storeName, data.line_version || '');
                if (curLineVers)
                    vmLive.set('line_version', curLineVers);

                if (type == 'full') { // * full
                    ApplyChangedData.loadMatchdataData(arrTournaments, curLineVers, storeName);
                } else if (type == 'diffs') { // * diffs
                    ApplyChangedData.loadDiffs(arrTournaments, curLineVers, storeName);
                } else if (dayExpress) { // * dayexpress
                    ApplyChangedData.loadDayExpress(dayExpress, storeName);
                }

                if (vmLive.get('firstFillFromLocal')) {
                    BasketF.fillBasketFromLocal(grid, 100);
                    vmLive.set('firstFillFromLocal', 0);
                }
            }
        }
    },

    getMatchdataTournaments: function (arrTournaments, firstLoad, storeName) {
        var arrEventOut = [],
            itemId = storeName,
            currentTime = new Date(),
            strCurrentTime = Ext.Date.format(currentTime, 'timestamp');

        // * перебор турниров
        Ext.Array.each(arrTournaments, function (recTournamentIn) {
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

                        // * события
                        objEventOut['tournament_id'] = recTournamentIn['id'];
                        objEventOut['sport_id'] = recTournamentIn['sport_id'];
                        objEventOut['sport_slug'] = UtilMarkets.getSportSlug(recTournamentIn);
                        objEventOut['tournament_name'] = recTournamentIn['name'];
                        objEventOut['rating'] = recTournamentIn['rating'];
                        objEventOut['type'] = storeName;
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
                            objEventOut['_event_name'] = this.eventName(objEventOut, objEventOut['_event_name_parts'], storeName);
                        }

                        if (UtilMarkets.is_ended(objEventIn)) {
                            objEventOut['finished'] = 1;
                        }

                        // * иногда бывает так, что данные по одному событию приходят в одном пакете разными строчками
                        if (!eventExists) {
                            arrEventOut.push(objEventOut);
                        } else {  // * такое событие уже есть, добавим в него данные
                            Ext.Array.merge(eventExists['cs'], objEventOut['cs']);
                            Ext.Array.merge(eventExists['cse'], objEventOut['cse']);
                        }
                    }
                }, this);
            }
        }, this);
        return arrEventOut;
    },

    eventName: function (event, _event_name_parts, storeName) {
        var feed = '<span style="font-weight: 600;color:#ff3300;font-size: 18px;">*</span>';

        function eventNameGame(sep, val) {
            var strOut = '';
            Ext.Object.each(val, function (k, v) {
                if (k == 'service') {
                    if (v == "0" || v == null) {
                        strOut = val['gameH'] + sep + val['gameA'];
                    }
                    if (v == 1) {
                        strOut = feed + val['gameH'] + sep + val['gameA'];
                    }
                    if (v == 2) {
                        strOut = val['gameH'] + sep + val['gameA'] + feed;
                    }
                }

                if (k == 'tiebreak') {
                    if (v == 1) {
                        var tiebreak = UtilMarkets.t('markets.tennis.tiebreak') + " ";
                        strOut = tiebreak + strOut;
                    }
                }
            }, this);
            return strOut;
        }

        if (storeName == 'live' // * только для live
            && event['sport_slug'] != 'sport_rats') { // * не для крыс
            var strOut = '';

            // * перебираем св-ва в "_event_name_parts"
            Ext.Object.each(_event_name_parts, function (key, val) {
                if (val != null) {
                    if (key == 'removals') {

                        if ((val['removalsH'] != null && val['removalsA'] != null )
                            && (val['removalsH'] != "0" || val['removalsA'] != "0")) {

                            var removalsH = val['removalsH'] || "0",
                                removalsA = val['removalsA'] || "0",
                                strColored = Util.colorText('crimson', UtilMarkets.t('templates.removals', {removals: [removalsH, removalsA].join(':')}));
                            strOut += ' ' + strColored;
                        }
                    } else if (key == 'part') {
                        if (Ext.Object.getSize(val)) {
                            Ext.Object.each(val, function (k, v) {
                                if (v) {
                                    if ((k == 'partName') && !val['partOver'] /*&& !val['status']*/ && val['partNum']) {
                                        strOut += Util.colorText('blue', v + ':');
                                    } else if (((k == 'partNum') && !val['partOver'] /*&& !val['status']*/)) {
                                        strOut += Util.colorText('blue', v);
                                    } else if (k == 'status' || k == 'partOver') {
                                        strOut += ' ' + Util.colorText('gray', '(' + v + ')');
                                    }
                                }
                            }, this);
                        }
                    } else if (key == 'score') {
                        if (Ext.Object.getSize(val)) {
                            if (strOut) {
                                strOut += ' ';
                            }

                            Ext.Object.each(val, function (k, v) {
                                if (v != null) {
                                    strOut += v;
                                }
                            }, this);
                        }
                    } else if (key == 'game') {
                        // * отображаем внутри parts
                    } else if (key == 'parts') {
                        if (strOut)
                            strOut += ' (';

                        if (Ext.Object.getSize(val['partsH'])) {
                            Ext.Object.each(val['partsH'], function (k, v) {
                                v = v || '0';
                                var partsA = val['partsA'][k] || '0';
                                if (k == 1)
                                    strOut += v + ':' + partsA;
                                else
                                    strOut += ', ' + v + ':' + partsA;
                            }, this);
                        } else {
                            strOut += '0:0';
                        }

                        if (event['sport_slug'] == 'tennis' || event['sport_slug'] == 'volleyball') {
                            var sep = '-';
                            strOut += ')';
                            strOut += ' [';
                            strOut += eventNameGame(sep, _event_name_parts['game']);
                            strOut += ']';
                        } else
                            strOut += ')';
                    } else
                        strOut += ' ' + Util.colorText('crimson', val); // * removalsFull, penalty, inning, compensatedTime
                }
            }, this);
            return this.eventNameBase(event) + '<br>' + strOut;
        } else if (event['sport_slug'] == 'sport_rats') { // * для крыс
            return this.eventNameBaseRats(event);
        } else {// * для линии
            return this.eventNameBase(event);
        }
    },

    getGridIdx: function (storeName) {
        switch (storeName) {
            case 'line':
                return 0;
                break;
            case 'live':
                return 1;
                break;
            case 'rats':
                return 2;
                break;
            case 'dayexpress':
                return 3;
                break;
            case 'dayexpressDC':
                return 4;
                break;
            default:
                return null;
        }
    },


});