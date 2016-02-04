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

    // * ф-ии для отображения счета, и пр. информации, приходящей с кэфами
    cf: function (event, mnemonicName) {
        if (event['cs'] && event['cs'][mnemonicName])
            return event['cs'][mnemonicName];
        if (event['cse'] && event['cse'][mnemonicName])
            return event['cse'][mnemonicName];

        return null;
    },

    getCoefByCoefId: function (grid, event_id, coefId) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            eventstore = vm.getStore(grid.getItemId()),
            event = eventstore.findRecord('event_id', event_id, 0, false, true, true),
            out = null;

        if (event) {
            Ext.Object.each(event.get('cs'), function (key, val) {
                if (val[0].toString() == coefId) {
                    out = val;
                }
            }, this);

            Ext.Object.each(event.get('cse'), function (key, val) {
                if (val[0].toString() == coefId) {
                    out = val;
                }
            }, this);
        }
        return out;
    },
    getMnemonicByCoefId: function (grid, event_id, coefId) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            eventstore = vm.getStore(grid.getItemId()),
            event = eventstore.findRecord('event_id', event_id, 0, false, true, true),
            out = null;

        if (event) {
            Ext.Object.each(event.get('cs'), function (key, val) {
                if (val[0].toString() == coefId) {
                    out = key;
                }
            }, this);

            Ext.Object.each(event.get('cse'), function (key, val) {
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
            eventstore = vmmenumain.getStore(grid.getItemId());

        while (eventstore.isLoading()) {}// * подождем пока не загрузится eventstore, и идем дальше

        var event = eventstore.findRecord('event_id', event_id, 0, false, true, true);
        if (event)
            return UtilMarkets.cf(event.getData(), coeffName);
        else
            return null;
    },

    getCF: function (event, mnemonicName, isFora) {
        var coef = this.cf(event, mnemonicName);
        if (coef == null || isFora)
            return null;
        return coef[2].toString();
    },

    // * проверка, является ли кэф служебным
    isNotServiceCoef: function (key) {
        return key.indexOf('coeff_SCORE_') == -1;
    },

    is_ended: function (event) {
        return this.getCF(event, 'coeff_SCORE_ENDED') == 1 ? true : false;
    },
    is_paused: function (event) {
        return this.getCF(event, 'coeff_SCORE_PAUSE') >= 1  && this.getCF(event, 'coeff_SCORE_IS_BREAKNOW')==1 ? true : false;
    },
    is_stopped: function (event) {
        return this.getCF(event, 'coeff_SCORE_TIMER_STOPPED') || event['timer_stopped'] == 1 /*&& this.getCF(event, 'coeff_SCORE_PAUSE') == 0  && this.getCF(event, 'coeff_SCORE_IS_BREAKNOW')==1*/ ? true : false;
    },
    getMinute: function (event) {
        return this.getCF(event, 'coeff_SCORE_MINUT') ? this.secondsToString(this.getCF(event, 'coeff_SCORE_MINUT') * 60) : '';
    },
    getPart: function (event) {
        var part = this.getCF(event, 'coeff_SCORE_HALF');
        return part;
    },
    // * Номер тайма, периода...
    partNum: function (event) {
        var part = this.getPart(event);
        if (!part)
            return 0;
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
            case 'futsal':
            case 'handball':
                message = this.t('parts.time');
                break;
        }
        return message;
    },

    // * Если сейчас доп время
    partOver: function (event) {
        if (this.getCF(event, 'coeff_SCORE_OVERTIME'))
            return this.t('parts.overtime');
    },

    secondsToString: function (seconds) {
        if (seconds >= 0) {
            var min = Math.floor(seconds / 60),
                sec = seconds % 60;
            // * добавление ведущего 0
            min = Util.leadZero(min);
            sec = Util.leadZero(sec);

            var strTime = min + ':' + sec;

            return strTime;
        } else
            return null;
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

    // * Возвращает текущее время матча. Если перерыв или окончание матча, то ничего не выводит
    durationText: function (event) {
        var time = this.duration(event);
        if (time) {
            if (this.status(event))
                return Util.colorText('gray', time, 1);
            else
                return time;
        } else
            return '';
    },

    status: function (event) {
        var sportSlug = event['sport_slug'],
            label;
        if (Ext.Array.indexOf(this.SPORTS_WITHOUT_STATUS, sportSlug) == -1) {
            if (event['current_second'] && event['current_second'] < 0) {
                label = this.t('templates.match_not_started');
            } else if (this.is_ended(event)) {
                event['finished'] = 1;
                label = this.t('templates.match_over');
            } else if (this.is_paused(event)) {
                label = this.t('templates.break');
            } else if (this.is_stopped(event) && !this.is_paused(event)) {
                label = this.t('templates.stopped');
            }
        }
        return label;
    },
    compensatedTime: function (event) {
        var time = this.getCF(event, 'coeff_SCORE_COMPENSATED_TIME');
        if (time == null)
            return false;
        else if (time == 0)
            return null;
        else if (time)
            return '+' + time + this.t('templates.minutes');
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

    _getPartsH: function (event, oldRecData) {
        var parts = {},
            part = this.partNum(oldRecData),
            part_ = this.partNum(event),
            sport_slug = event['sport_slug'],
            index = 1;

        if (part_ && part && part_ > part)
            part = part_;

        if (index <= part) {
            while (index <= part) {
                var currentIndex = '';
                if (index > 1)
                    currentIndex = index;
                var home_score = this.getCF(event, "coeff_SCORE_HOME_HT" + currentIndex);

                parts[index] = home_score || '0';

                index++;
            }
        }

        if (this.getCF(event, 'coeff_SCORE_OVERTIME'))
            parts[part] = this.getCF(event, 'coeff_SCORE_OVERTIME_HOME');

        return parts;
    },
    _getPartsA: function (event, oldRecData) {
        var parts = {},
            part = this.partNum(oldRecData),
            sport_slug = event['sport_slug'],
            index = 1;
        if (index <= part) {
            while (index <= part) {
                var currentIndex = '';
                if (index > 1)
                    currentIndex = index;
                var away_score = this.getCF(event, "coeff_SCORE_AWAY_HT" + currentIndex);
                parts[index] = away_score || '0';
                index++;
            }
        }

        if (this.getCF(event, 'coeff_SCORE_OVERTIME'))
            parts[part] = this.getCF(event, 'coeff_SCORE_OVERTIME_AWAY');

        return parts;
    },

    _getScoreHomeGame: function (event) {
        return this.getCF(event, 'coeff_SCORE_HOME_GAME');
    },
    _getScoreAwayGame: function (event) {
        return this.getCF(event, 'coeff_SCORE_AWAY_GAME');
    },
    _getScoreTiebreak: function (event, oldRec) {
        if (oldRec) {
            var tiebreak_ = this.getCF(event, 'coeff_SCORE_TIEBREAK'),
                tiebreak = this.getCF(oldRec, 'coeff_SCORE_TIEBREAK');
            if (tiebreak_ == null)
                return tiebreak;
            else return tiebreak_;
        } else {
            var tiebreak_ = this.getCF(event, 'coeff_SCORE_TIEBREAK');
            return tiebreak_;
        }
    },
    _getScoreTiebreakHome: function (event) {
        return this.getCF(event, 'coeff_SCORE_HOME_TIEBREAK');
    },
    _getScoreTiebreakAway: function (event) {
        return this.getCF(event, 'coeff_SCORE_AWAY_TIEBREAK');
    },

    _get_scores_tennisH: function (event, oldRec) {
        var scoreHome = this._getScoreHomeGame(event),
            tiebreak = this._getScoreTiebreak(event, oldRec),
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
    _get_scores_tennisA: function (event, oldRec) {
        var scoreAway = this._getScoreAwayGame(event),
            tiebreak = this._getScoreTiebreak(event, oldRec),
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

    _getScoreService: function (event) {
        return this.getCF(event, 'coeff_SCORE_CURRENT_SERVICE');
    },

    _gameBaseH: function (event, volleyball, oldRec) {
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
                scores = this._get_scores_tennisH(event, oldRec);
                break;
            default:
                return null;
        }

        if (scores && scores.score_h != null)
            return scores.score_h.toString();
        else return null;
    },

    _gameBaseA: function (event, volleyball, oldRec) {
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
                scores = this._get_scores_tennisA(event, oldRec);
                break;
            default:
                return null;
        }

        if (scores && scores.score_a != null)
            return scores.score_a.toString();
        else return null;
    },

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

    removalsH: function (event) {
        return this.getCF(event, 'coeff_SCORE_HOME_REMOVALS') || this.getCF(event, 'coeff_SCORE_HOME_RED_CARDS');
    },

    removalsA: function (event) {
        return this.getCF(event, 'coeff_SCORE_AWAY_REMOVALS') || this.getCF(event, 'coeff_SCORE_AWAY_RED_CARDS');
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
            recSlug = storeSportsSlug.findRecord('id', sport_id, 0, false, true, true);
        if(recSlug)
            return recSlug.get('slug');
        else
            return null;
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
            if (rec)
                return rec.get('id');
        }
        return null;
    },
});