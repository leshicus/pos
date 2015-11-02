// * вспомогательные ф-ии для markets.js
Ext.define('Office.view.fill.UtilMarkets', {
    singleton: true,
    alternateClassName: ['UtilMarkets'],

    // * виды спорта без ничьей (coeff_CW_P1 вместо coeff_FT_1)
    SPORTS_WITHOUT_DRAW: [
        'tennis',
        'volleyball',
        'football',
        'baseball',
        'basketball',
        'table_tennis',
        'badminton',
        'biathlon',
        'cross_country_skiing',
        'ski_jumping',
        'circle_racing',
        'auto_motosport',
        'snooker',
        'formula1',
        'bobsled',
        'alpine_skiing',
        'skating',
        'curling',
        'nordic_combined',
        'skeleton',
        'snowboard',
        'figure_skating',
        'freestyle',
        'short_track',
        'luge',
        'paralimpic_alpine_skiing',
        'paralimpic_biathlon',
        'paralimpic_cross_country_skiing',
        'paralimpic_wheelchair_curling',
        'aussie_rules',
        'beach_volleyball',
        'golf',
        'billiards',
        'darts',
        'electronic_sport',
        'culture'
    ],
    SPORTS_WITHOUT_DURATION: ['baseball', 'volleyball', 'tennis', 'table_tennis'],
    SPORTS_WITHOUT_STATUS: ['baseball', 'volleyball', 'tennis'],


    t: function (name, param) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            objLocaleYaml = vm.get('localeYaml'),
            locale = vm.get('locale');
        if (objLocaleYaml && locale) {
            var yaml = objLocaleYaml[locale];
            if (yaml) {
                var rawStr = this.getDescendantProp(yaml, name);
                if (!Ext.Object.isEmpty(rawStr)) {
                    if (param) {
                        Ext.Object.each(param, function (key, val) {
                            var reg = new RegExp('{{' + key + '}}', 'g');
                            rawStr = rawStr.replace(reg, val);
                        });
                    }
                    return rawStr;
                } else { // * если локализация не найдена, то показываем грязное значение
                    return name;
                }
            }
        } else {
            return name;
        }
    },
    // * получить значение свойства объекта со сложной структурой по строке вида "a.b.c"
    getDescendantProp: function (obj, desc) {
        // * from http://stackoverflow.com/questions/8051975/access-object-child-properties-using-a-dot-notation-string
        var arr = desc.split(".");
        while (arr.length && (obj = obj[arr.shift()]));
        return obj;
    },
    getAllSportSlugs: function () {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            storeSport = vm.getStore('sportsslug');
        if (storeSport.isLoaded()) {
            var sports = storeSport.getRange(),
                sportData = Ext.Array.pluck(sports, 'data'),
                sportNames = Ext.Array.pluck(sportData, 'slug');
            //console.info(storeSport,sports,sportNames);
            return sportNames;
        } else {
            Ext.defer(function () {
                var sports = storeSport.getRange(),
                    sportData = Ext.Array.pluck(sports, 'data'),
                    sportNames = Ext.Array.pluck(sportData, 'slug');
                //console.info(storeSport,sports,sportNames);
                return sportNames;
            }, 3000);
        }
    },
    getSportWithDraw: function () {
        if (this.getAllSportSlugs()) {
            return Ext.Array.difference(this.getAllSportSlugs(), this.SPORTS_WITHOUT_DRAW);
        } else {
            Ext.defer(function () {
                return Ext.Array.difference(this.getAllSportSlugs(), this.SPORTS_WITHOUT_DRAW);
            }, 3000, this);
        }
    },

//todo 11.07 параметры не все правильно показываются (баскетбол)
    // * ф-ии для отображения счета, и пр. информации, приходящей с кэфами
    cf: function (event, mnemonicName) {
        var cs = Util.cloneObject(event['cs']),
            cse = Util.cloneObject(event['cse']);
        Ext.Object.merge(cs, cse);
        if (cs && cs[mnemonicName])
            return cs[mnemonicName];
        return false;
    },

    getCoefByCoefId: function (grid, event_id, coefId) {
        var vmGrid = grid.getViewModel(),
            eventstore = vmGrid.getStore('eventstore'),
            event = eventstore.findRecord('event_id', event_id, 0, false, true, true),
            out = null;

        if (event) {
            var cs = Util.cloneObject(event.get('cs')),
                cse = Util.cloneObject(event.get('cse'));
            // console.info(cs,cse);
            //var cs = event.get('cs'),
            //     cse = event.get('cse');
            Ext.Object.merge(cs, cse);
            Ext.Object.each(cs, function (key, val) {
                if (val[0].toString() == coefId) {
                    out = val;
                }
            }, this);
        }
        return out;
    },
    getMnemonicByCoefId: function (grid, event_id, coefId) {
        var vmGrid = grid.getViewModel(),
            eventstore = vmGrid.getStore('eventstore'),
            event = eventstore.findRecord('event_id', event_id, 0, false, true, true),
            out = null;

        if (event) {
            var cs = Util.cloneObject(event.get('cs')),
                cse = Util.cloneObject(event.get('cse'));
            Ext.Object.merge(cs, cse);
            Ext.Object.each(cs, function (key, val) {
                if (val[0].toString() == coefId) {
                    out = key;
                }
            }, this);
        }
        return out;
    },

    getBasisByCoefId: function (grid, event_id, coefId) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmmenumain = menumain.getViewModel(),
            storeOutcomes = vmmenumain.getStore('outcomes'),
            recOutcomes = storeOutcomes.getAt(0), // * модель, в которой поля объекты: groupNames, mnemonics и др. outcomes
            oddsOutcomeIdsByOutcomeId = recOutcomes.get('oddsOutcomeIdsByOutcomeId'),// * соответствие coefId : basisId
            coef = this.getCoefByCoefId(grid, event_id, coefId);
        if (coef) {
            var coefTypeId = coef[1],
                basisTypeId = oddsOutcomeIdsByOutcomeId[coefTypeId],
                basis = this.getCoefByCoefTypeId(basisTypeId, grid, event_id);
        } else
            return;

        return basis;
    },

    getCoefByCoefTypeId: function (coefTypeId, grid, event_id) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmmenumain = menumain.getViewModel(),
            storeOutcomes = vmmenumain.getStore('outcomes'),
            recOutcomes = storeOutcomes.getAt(0), // * модель, в которой поля объекты: groupNames, mnemonics и др. outcomes
            mnemonics = recOutcomes.get('mnemonics'),
            coeffName = mnemonics[coefTypeId],// * например coeff_INTERVAL_30_IYC_YES
            vmGrid = grid.getViewModel(),
            eventstore = vmGrid.getStore('eventstore');

        while (eventstore.isLoading()) {
        }// * подождем пока не загрузится eventstore, и идем дальше

        var event = eventstore.findRecord('event_id', event_id, 0, false, true, true);
        if (event)
            return UtilMarkets.cf(event.getData(), coeffName);
        else
            return null;
    },

    getCF: function (event, mnemonicName, isFora) {
        /*       if(event['cse']&&mnemonicName=='coeff_SCORE_CURRENT_SERVICE')
         console.info(event['cse'][mnemonicName]);*/
        var coef = this.cf(event, mnemonicName);
        if (!coef || isFora)
            return null;
        return coef[2];
    },

    // * Возвращает текущую часть матча, если не овертайм. Пример:  Тайм: 2. Во время перерыва или окончания матча пишет статус соответственно
    part: function (event) {
        var overtime = this.partOver(event),
            status = this.status(event),
            name = this.partName(event),
            num = this.partNum(event);
        if (overtime) {
            return overtime;
        }
        if (status) {
            return status;
        } else if (name) {
            return name + ':' + num;
        } else
            return null;
    },

    // * Возвращает счет по периодам/таймам в формате H1:A1, H2:A2
    parts: function (event) {
        var p = this.getParts(event);
        if (p.length) {
            p = p.map(function (el) {
                return el.join(':');
            });
            return '(' + p.join(', ') + ')';
        }
        return null;
    },
    is_ended: function (event) {
        return this.getCF(event, 'coeff_SCORE_ENDED') == 1 ? true : false;
    },
    is_paused: function (event) {
        return this.getCF(event, 'coeff_SCORE_PAUSE') >= 1 ? true : false;
    },
    is_stopped: function (event) {
        return this.getCF(event, 'coeff_SCORE_TIMER_STOPPED') == 1 ? true : false;
    },
    getPart: function (event) {
        var part = this.getCF(event, 'coeff_SCORE_HALF');
        if (part > 1 && (this.is_paused(event) || this.is_stopped(event))) {
            part--;
        }
        return part;
    },
    // * Номер тайма, периода...
    partNum: function (event) {
        var part = this.getPart(event);
        if (!part)
            return null;
        else
            return part;
    },
    // * Возвращает тайм,период,сет,четверть
    partName: function (event) {
        var message,
            sport_slug = event['sport_slug'];
        switch (sport_slug) {
            case 'hockey':
                message = this.t('parts.period');
                break;
            case 'tennis':
                message = this.t('parts.set');
                break;
            case 'volleyball':
                message = this.t('parts.part');
                break;
            case 'basketball':
                message = this.t('parts.quarter');
                break;
            case 'soccer':
            case 'handball':
                message = this.t('parts.time');
                break;
        }
        return message;
    },

    // * Если сейчас доп время
    partOver: function (event) {
        if (this.getCF(event, 'coeff_SCORE_TIMER_STOPPED'))
            return this.t('parts.overtime');
    },

    //getSportSlug: function (event) {
    //    var menumain = Ext.ComponentQuery.query('menumain')[0],
    //        vmFill = menumain.getViewModel(),
    //        storeSportsslug = vmFill.getStore('sportsslug');
    //    if (event['sport_id']) {
    //        var recSportsslug = storeSportsslug.findRecord('id', event['sport_id'], 0, false, true, true);
    //        if (recSportsslug) {
    //            var sport_slug = recSportsslug.get('slug');
    //        } else {
    //            // * таким вот извращенным способом я борюсь с тем, что стор storeSportsslug еще не загрузился, а мы к нему уже обращаемся
    //            // * todo надо бы как-то по-другому решать этот вопрос?
    //            //Ext.defer(function(){
    //            recSportsslug = storeSportsslug.findRecord('id', event['sport_id'], 0, false, true, true);
    //            if (recSportsslug) {
    //                var sport_slug = recSportsslug.get('slug');
    //            } else {
    //                Util.toast('Ошибка', 'Не загружены виды спорта. Перезагрузите раздел.');
    //                return null;
    //            }
    //            //},200,this);
    //        }
    //        return sport_slug;
    //    }
    //    return null;
    //},

    secondsToString: function (seconds) {
        var min = Math.floor(seconds / 60),
            sec = seconds % 60;
        // * добавление ведущего 0
        min = Util.leadZero(min);
        sec = Util.leadZero(sec);

        var strTime = min + ':' + sec;
        return strTime;
    },

    _get_seconds: function (event) {
        var sportSlug = event['sport_slug'];

        if (sportSlug == 'sport_rats') { // * для крыс- обратный отсчет
            var time = Ext.Date.parse(event['time'], "Y-m-d H:i:s"),
                timestamp = Ext.Date.format(time, 'timestamp'),
                curDate = Ext.Date.format(new Date(), 'timestamp'),
                difDate = timestamp - curDate;

            if (difDate > 0) {
                    return this.secondsToString(difDate);
            } else
                return 0;
        } else {
            if (this.is_ended(event) || this.is_paused(event) || this.is_stopped(event))
                return this.secondsToString(event['current_second']);
            else
                return this.secondsToString(event['_current_second']);
        }
    },

    // * Возвращает длительность матча в формате [HH,MM]
    duration: function (event) {
        var sportSlug = event['sport_slug'];

        if (Ext.Array.indexOf(this.SPORTS_WITHOUT_DURATION, sportSlug) == -1) {
            return this._get_seconds(event);
        } else
            return null;
    },

    // * Возвращает текущее время матча, если перерыв или окончание матча, то ничего не выводит
    durationText: function (event) {
        if (this.status(event))
            return '';
        var time = this.duration(event);
        if (time)
            return time;
        else
            return '';
    },

    status: function (event) {
        var sportSlug = event['sport_slug'],
            label;
        if (Ext.Array.indexOf(this.SPORTS_WITHOUT_STATUS, sportSlug) == -1) {
            if (event['current_second'] && event['current_second'] < 0) {
                label = this.t('templates.match_not_started');
            } else if (this.is_ended(event)) {
                //console.warn('ended: ', event['home'], event);
                event['finished'] = 1;
                label = this.t('templates.match_over');
            } else if (this.is_paused(event)) {
                label = this.t('templates.break');
            } else if (this.is_stopped(event)) {
                label = this.t('templates.stopped');
            }
        }
        return label;
    },
    compensatedTime: function (event) {
        var time = this.getCF(event, 'coeff_SCORE_COMPENSATED_TIME');
        if (time)
            return '+' + time + this.t('templates.minutes');
        else return null;
    },
    // * Возвращает общий счет в матче
    score: function (event) {
        var scoreHome = this.getCF(event, 'coeff_SCORE_HOME') || 0,
            scoreAway = this.getCF(event, 'coeff_SCORE_AWAY') || 0;
        return scoreHome + ':' + scoreAway;
    },

    _getScoreHome: function (event) {
        return this.getCF(event, 'coeff_SCORE_HOME');
    },
    _getScoreAway: function (event) {
        return this.getCF(event, 'coeff_SCORE_AWAY');
    },

    // *  Получить текущий период
    getHalf: function (event) {
        return this.getCF(event, 'coeff_SCORE_HALF');
    },

    getParts: function (event) {
        var parts = [],
            part = this.partNum(event),
            sport_slug = event['sport_slug'],
            index = 1;
        if (index <= part) {
            while (index <= part) {
                var currentIndex = '';
                if (index > 1)
                    currentIndex = index;
                var home_score = this.getCF(event, "coeff_SCORE_HOME_HT" + currentIndex),
                    away_score = this.getCF(event, "coeff_SCORE_AWAY_HT" + currentIndex);
                if (home_score != null || away_score != null) {
                    parts.push([home_score || 0, away_score || 0]);
                }

                index++;
            }
        }

        if (this.getCF(event, 'coeff_SCORE_OVERTIME'))
            parts.push([this.getCF(event, 'coeff_SCORE_OVERTIME_HOME') || 0, this.getCF(event, 'coeff_SCORE_OVERTIME_AWAY') || 0]);

        /*if (parts.length && sport_slug == 'volleyball')
         parts[parts.length - 1] = this.gameBase(event, true);*/

        return parts;
    },
    _getPartsH: function (event) {
        var parts = {},
            part = this.partNum(event),
            sport_slug = event['sport_slug'],
            index = 1;
        if (index <= part) {
            while (index <= part) {
                var currentIndex = '';
                if (index > 1)
                    currentIndex = index;
                var home_score = this.getCF(event, "coeff_SCORE_HOME_HT" + currentIndex);
                if (sport_slug == 'volleyball' && index == part) {
                    break;
                }
                if (home_score != null) {
                    parts[index] = home_score || '0';
                }
                index++;
            }
        }

        if (this.getCF(event, 'coeff_SCORE_OVERTIME'))
            parts[part] = this.getCF(event, 'coeff_SCORE_OVERTIME_HOME');

        /*if (parts.length && sport_slug == 'volleyball')
         parts[parts.length - 1] = this.gameBase(event, true);*/

        return parts;
    },
    _getPartsA: function (event) {
        var parts = {},
            part = this.partNum(event),
            sport_slug = event['sport_slug'],
            index = 1;
        if (index <= part) {
            while (index <= part) {
                var currentIndex = '';
                if (index > 1)
                    currentIndex = index;
                var away_score = this.getCF(event, "coeff_SCORE_AWAY_HT" + currentIndex);
                if (sport_slug == 'volleyball' && index == part) {
                    break;
                }
                if (away_score != null) {
                    parts[index] = away_score || '0';
                }
                index++;
            }
        }

        if (this.getCF(event, 'coeff_SCORE_OVERTIME'))
            parts[part] = this.getCF(event, 'coeff_SCORE_OVERTIME_AWAY');

        /*if (parts.length && sport_slug == 'volleyball')
         parts[parts.length - 1] = this.gameBase(event, true);*/

        return parts;
    },

    _getScoreHomeGame: function (event) {
        return this.getCF(event, 'coeff_SCORE_HOME_GAME');
    },
    _getScoreAwayGame: function (event) {
        return this.getCF(event, 'coeff_SCORE_AWAY_GAME');
    },
    _getScoreTiebreak: function (event) {
        return this.getCF(event, 'coeff_SCORE_TIEBREAK');
    },
    _getScoreTiebreakHome: function (event) {
        return this.getCF(event, 'coeff_SCORE_HOME_TIEBREAK');
    },
    _getScoreTiebreakAway: function (event) {
        return this.getCF(event, 'coeff_SCORE_AWAY_TIEBREAK');
    },

    // * Получает результаты сета тенниса
    /*_get_scores_tennis: function (event) {
     var scoreHome = this._getScoreHomeGame(event),
     scoreAway = this._getScoreAwayGame(event),
     tiebreak = this._getScoreTiebreak(event),
     tiebreakAway = this._getScoreTiebreakAway(event),
     tiebreakHome = this._getScoreTiebreakHome(event);
     if (tiebreak) {
     return {
     score_h: +tiebreakHome === 50 ? 'A' : tiebreakHome,
     score_a: +tiebreakAway === 50 ? 'A' : tiebreakAway
     };
     } else {
     if(scoreHome||scoreAway){
     return {
     score_h: +scoreHome === 50 ? 'A' : scoreHome,
     score_a: +scoreAway === 50 ? 'A' : scoreAway
     };
     }
     }
     return null;
     },*/
    _get_scores_tennisH: function (event) {
        var scoreHome = this._getScoreHomeGame(event),
            tiebreak = this._getScoreTiebreak(event),
            tiebreakHome = this._getScoreTiebreakHome(event);
        if (tiebreak) {
            return {
                score_h: +tiebreakHome === 50 ? 'A' : tiebreakHome
            };
        } else {
            if (scoreHome || scoreHome == 0) {
                return {
                    score_h: +scoreHome === 50 ? 'A' : scoreHome
                };
            }
        }
        return null;
    },
    _get_scores_tennisA: function (event) {
        var scoreAway = this._getScoreAwayGame(event),
            tiebreak = this._getScoreTiebreak(event),
            tiebreakAway = this._getScoreTiebreakAway(event);
        if (tiebreak) {
            return {
                score_a: +tiebreakAway === 50 ? 'A' : tiebreakAway
            };
        } else {
            if (scoreAway || scoreAway == 0) {
                return {
                    score_a: +scoreAway === 50 ? 'A' : scoreAway
                };
            }
        }
        return null;
    },
    // * Получает результаты гейма волейбола
    /*_get_scores_volleyball: function (event) {
     var score_a, score_h, _set;
     _set = 5;
     while (this.getCF(event, "coeff_SCORE_HOME_HT" + _set) === "") {
     if (_set === '') {
     break;
     }
     _set--;
     if (_set === 1) {
     _set = '';
     }
     }
     score_h = this.getCF(event, "coeff_SCORE_HOME_HT" + _set) || '0';
     score_a = this.getCF(event, "coeff_SCORE_AWAY_HT" + _set) || '0';
     return {
     score_h: score_h,
     score_a: score_a
     };
     },*/
    _get_scores_volleyballH: function (event) {
        var score_h, _set;
        _set = 5;
        while (this.getCF(event, "coeff_SCORE_HOME_HT" + _set) == null) {
            if (_set === '') {
                break;
            }
            _set--;
            if (_set === 1) {
                _set = '';
            }
        }
        score_h = this.getCF(event, "coeff_SCORE_HOME_HT" + _set);
        return {
            score_h: score_h
        };
    },
    _get_scores_volleyballA: function (event) {
        var score_a, _set;
        _set = 5;
        while (this.getCF(event, "coeff_SCORE_AWAY_HT" + _set) == null) {
            if (_set === '') {
                break;
            }
            _set--;
            if (_set === 1) {
                _set = '';
            }
        }
        score_a = this.getCF(event, "coeff_SCORE_AWAY_HT" + _set);
        return {
            score_a: score_a
        };
    },
    // * Подачи для тениса и воллейбола
    /*gameBase: function (event, volleyball) {
     var feed, scores, service, sport_slug, tiebreak;
     sport_slug = event['sport_slug'];
     switch (sport_slug) {
     case 'volleyball':
     if (volleyball)
     scores = this._get_scores_volleyball(event);
     else
     return null;
     break;
     case 'tennis':
     scores = this._get_scores_tennis(event);
     break;
     default:
     return null;
     }

     service = this.getCF(event, 'coeff_SCORE_CURRENT_SERVICE');
     feed = '<span style="font-weight: 600;color:#ff3300;font-size: 18px;">*</span>';
     //feed = '*';
     if (1 == service) {
     scores.score_h = feed + "" + scores.score_h;
     } else if (2 == service) {
     scores.score_a = scores.score_a + "" + feed;
     }

     if (this.getCF(event, 'coeff_SCORE_TIEBREAK')) {
     tiebreak = this.t('markets.tennis.tiebreak') + " ";
     scores.score_h = tiebreak + scores.score_h;
     }

     return [scores.score_h, scores.score_a];


     },*/

    _getScoreService: function (event) {
        return this.getCF(event, 'coeff_SCORE_CURRENT_SERVICE');
    },
    _gameBaseH: function (event, volleyball) {
        var feed, scores, service, sport_slug, tiebreak;
        sport_slug = event['sport_slug'];
        switch (sport_slug) {
            case 'volleyball':
                if (volleyball) {
                    scores = this._get_scores_volleyballH(event);
                }
                else
                    return null;
                break;
            case 'tennis':
                scores = this._get_scores_tennisH(event);
                break;
            default:
                return null;
        }
        /*service = this._getScoreService(event);
         if(service){
         feed = '<span style="font-weight: 600;color:#ff3300;font-size: 18px;">*</span>';
         if (1 == service) {
         scores.score_h = feed + "" + scores.score_h;
         }
         }
         tiebreak = this._getScoreTiebreak(event);
         if(tiebreak){
         tiebreak = this.t('markets.tennis.tiebreak') + " ";
         scores.score_h = tiebreak + scores.score_h;
         }*/
        if (scores && scores.score_h)
            return scores.score_h.toString();
        else return null;
    },
    _gameBaseA: function (event, volleyball) {
        var feed, scores, service, sport_slug, tiebreak;
        sport_slug = event['sport_slug'];
        switch (sport_slug) {
            case 'volleyball':
                if (volleyball) {
                    scores = this._get_scores_volleyballA(event);
                }
                else
                    return null;
                break;
            case 'tennis':
                scores = this._get_scores_tennisA(event);
                break;
            default:
                return null;
        }

        /*service = this._getScoreService(event);
         if(service){
         feed = '<span style="font-weight: 600;color:#ff3300;font-size: 18px;">*</span>';
         if (1 == service) {
         scores.score_a = feed + "" + scores.score_a;
         }
         }
         tiebreak = this._getScoreTiebreak(event);
         if(tiebreak){
         tiebreak = this.t('markets.tennis.tiebreak') + " ";
         scores.score_a = tiebreak + scores.score_a;
         }*/

        if (scores && scores.score_a)
            return scores.score_a.toString();
        else return null;
    },
    // * Подачи для тениса и воллейбола, форматирование
    /*game: function (event) {
     var score;

     score = this.gameBase(event);

     return score && ("(" + (score.join('-')) + ")") || '';
     },*/
    // * Иннинги для бейсбола
    inning: function (event) {
        var score, sport_slug;
        sport_slug = event['sport_slug'];
        if (sport_slug === 'baseball') {
            score = '';
            if (this.getCF(event, 'coeff_SCORE_CURRENT_SERVICE') && this.partNum(event)) {
                score = this.t('markets.baseball.inning', {
                    half: this.partNum(event),
                    service: this.t('markets.baseball.service_' + this.getCF(event, 'coeff_SCORE_CURRENT_SERVICE'))
                });
            }
            return "" + score;
        } else {
            return '';
        }
    },
    // * Возвращает счет по пенальти
    penalty: function (event) {
        var away, hitter, home;

        if (!this.getCF(event, 'coeff_SCORE_PENALTY')) {
            return '';
        }

        hitter = this.getCF(event, 'coeff_SCORE_PENALTY_HITTER');

        home = this.getCF(event, 'coeff_SCORE_HOME_PENALTY') || 0;

        away = this.getCF(event, 'coeff_SCORE_AWAY_PENALTY') || 0;

        if (1 === hitter) {
            home = "*" + home;
        } else if (2 === hitter) {
            away = away + "*";
        }

        return "" + (this.t('templates.penalty', {
            penalty: [home, away].join(':')
        }));
    },
    // * Возвращает текущий счет удалений. Если удалений нет. Возвращает false
    removals: function (event) {
        var away, home;
        home = this.getCF(event, 'coeff_SCORE_HOME_REMOVALS') || this.getCF(event, 'coeff_SCORE_HOME_RED_CARDS') || 0;
        away = this.getCF(event, 'coeff_SCORE_AWAY_REMOVALS') || this.getCF(event, 'coeff_SCORE_AWAY_RED_CARDS') || 0;
        if (!home && !away) {
            return false;
        }
        return [home, away];
    },
    removalsFull: function (event) {
        var removals;
        removals = this.removals(event);
        if (removals) {
            return "" + (this.t('templates.removals', {
                removals: [removals[0], removals[1]].join(':')
            }));
        }
        return "";
    },

    mergeCoefs: function (record) {
        if (typeof record.get == 'function') {
            var cs = Util.cloneObject(record.get('cs')),
                cse = Util.cloneObject(record.get('cse'));
        } else {
            var cs = Util.cloneObject(record['cs']),
                cse = Util.cloneObject(record['cse']);
        }
        var obj = {};

        if (cs && cse) {
            Ext.Object.merge(cs, cse);
            obj = cs;
        } else if (cs && !cse) {
            obj = cs;
        } else if (!cs && cse) {
            obj = cse;
        }
        return obj;
    },

    getSportSlug: function (record) {
        if (typeof record.get == 'function')
            var sport_id = record.get('sport_id');
        else
            var sport_id = record['sport_id'];

        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel(),
            storeSportsSlug = vmMenumain.getStore('sportsslug'),
            recSlug = storeSportsSlug.findRecord('id', sport_id, 0, false, true, true),
            sportSlug = recSlug.get('slug');
        return sportSlug;
    },

    getSportName: function (record) {
        if (typeof record.get == 'function')
            var sport_id = record.get('sport_id');
        else
            var sport_id = record['sport_id'];

        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel(),
            storeSportsSlug = vmMenumain.getStore('sportsslug'),
            recSlug = storeSportsSlug.findRecord('id', sport_id, 0, false, true, true),
            sportSlug = recSlug.get('name');
        return sportSlug;
    },

    // * получить sport_id для крысиных бегов
    getRatsId: function () {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            storeSportslug = menumain.getViewModel().getStore('sportsslug');
        if (storeSportslug) {
            var rec = storeSportslug.findRecord('slug', "sport_rats", 0, false, true, true);
            return rec.get('id');
        }
        return null;
    },
});