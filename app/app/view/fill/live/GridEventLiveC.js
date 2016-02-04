Ext.define('Office.view.fill.live.GridEventLiveC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.fill.contextmenu.MenuGridCoeffV'
    ],
    alias: 'controller.grideventlive',

    onRender: function (grid) {
        var fill = grid.up('fill');

        fill.getController().onGridEventRender(grid);
    },

    onAdded: function (grid) {
        if (grid.getItemId() == 'rats') {
            this.loadInitDataToRats(grid);
        }
    },

    loadInitDataToRats: function (grid) {
        // * для grideventlive у Крыс должно быть столько строк, сколько столов, пусть даже пустые
        Ext.defer(function () {
            var menumain = Ext.ComponentQuery.query('menumain')[0],
                vm = menumain.getViewModel(),
                storeEvent = vm.getStore(grid.getItemId()),
                _defaults = [],
                numTables = Util.getGlobalConst('COUNT_RAT_TABLES');

            for (var i = 1; i <= numTables; i++) {
                var table = Util.getObjectItemByNum(Config.arrRatTableColors, i - 1);
                if (table)
                    var color = table['color'];
                else
                    var color = 'gray';

                var obj = {
                    tournament_name: 'Стол ' + i,
                    id: i,
                    _fantom: true,
                    _event_name: '<br><span style="color:' + color + ';font-size: 57px;">Стол ' + i + '</span>'
                };
                _defaults.push(obj);
            }

            storeEvent._defaults = _defaults;
            storeEvent.loadData(Util.cloneObject(storeEvent._defaults));
        }, 10, this);
    },



    //onAdd: function (store, rec) {
    //    this.setLiveCountProperty(store);
    //},
    //
    //onEventStoreChange: function (store) {
    //    var grid = this.getView();
    //
    //    // * отфильтруем виды спорта в фильтре по видам спорта
    //    if (grid.getItemId() != 'rats'
    //        && grid.getItemId() != 'dayexpress'
    //        && grid.getItemId() != 'dayexpressDC') {
    //
    //        this.filterSports();
    //
    //        this.setLiveCountProperty(store);
    //    }
    //},

    //loadRawData: function (store, data) {
    //    var grid = this.getView(),
    //        vmLive = grid.getViewModel(),
    //        eventstore = vmLive.getStore('eventstore');
    //
    //    if (store.getRange()[0].get('line_version') != vmLive.get('line_version')
    //        || store.getRange()[0].get('dayExpress')) {
    //
    //        vmLive.set('line_version', store.getRange()[0].get('line_version'));
    //
    //        if (!data || !data.length) {
    //            data = store.getRange();
    //        }
    //
    //        if (data && data.length) {
    //            var rec_0 = data[0],
    //                type = rec_0.get('type'),
    //                arrTournaments = rec_0.get('tournaments'),
    //                dayExpress = rec_0.get('dayExpress'),
    //                curLineVers = rec_0.get('line_version'); // * номер текущей линии
    //
    //            if (type == 'full') { // * full
    //                ApplyChangedData.loadMatchdataData(arrTournaments, curLineVers, grid);
    //            } else if (type == 'diffs') { // * diffs
    //                ApplyChangedData.loadDiffs(arrTournaments, curLineVers, grid);
    //            } else if (dayExpress) { // * dayexpress
    //                ApplyChangedData.loadDayExpress(dayExpress, grid);
    //            }
    //
    //            if (vmLive.get('firstFillFromLocal')) {
    //                BasketF.fillBasketFromLocal(grid, 100);
    //                vmLive.set('firstFillFromLocal', 0);
    //            }
    //        }
    //    }
    //},

    // * загрузка данных напрямую, без rawdata store
    //loadRawDataStright: function (data) {
    //    var grid = this.getView(),
    //        vmLive = grid.getViewModel(),
    //        eventstore = vmLive.getStore('eventstore');
    //
    //    if (data) {
    //        var type = data.type,
    //            arrTournaments = data.tournaments,
    //            dayExpress = data.dayExpress,
    //            curLineVers = data.line_version; // * номер текущей линии
    //
    //        vmLive.set('line_version', data.line_version || '');
    //
    //        if (type == 'full') { // * full
    //            ApplyChangedData.loadMatchdataData(arrTournaments, curLineVers, grid);
    //        } else if (type == 'diffs') { // * diffs
    //            ApplyChangedData.loadDiffs(arrTournaments, curLineVers, grid);
    //        } else if (dayExpress) { // * dayexpress
    //            ApplyChangedData.loadDayExpress(dayExpress, grid);
    //        }
    //
    //        if (vmLive.get('firstFillFromLocal')) {
    //            BasketF.fillBasketFromLocal(grid, 100);
    //            vmLive.set('firstFillFromLocal', 0);
    //        }
    //    }
    //},

    filterSports: function () {
        var grid = this.getView(),
            menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            storeEvent = vm.getStore(grid.getItemId()),
            sportsslug = grid.getViewModel().getStore('sportsslug'),
            arrSports = Ext.Array.pluck(Ext.Array.pluck(storeEvent.getRange(), 'data'), 'sport_id'),
            arrSportUniq = Ext.Array.unique(arrSports);
        if (sportsslug) {
            sportsslug.clearFilter();
            sportsslug.addFilter({
                filterFn: function (item) {
                    if (Ext.Array.contains(arrSportUniq, Number(item.get('id'))))
                        return true;
                }
            });
            grid.getView().refresh();
        }
    },

    // * выбрали событие
    onSelect: function (row, record, idx) {
        Ext.suspendLayouts();
        this.showCoefs(record);
        Ext.resumeLayouts(true);
    },

    showCoefs: function (record) {
        var gridLive = this.getView(),
            fill = Ext.ComponentQuery.query('fill')[0],
            modeCoeff = fill.down('#modeCoeff'),
            tabEvent = fill.down('#eventstab'),
            activeTabId = BasketF.getActiveTabEventId(),
            vmEvent = gridLive.getViewModel(),
            west = fill.down('container[region=west]'),
            center = fill.down('container[region=center]');

        var isInDom = document.getElementById(center.getId()); // * объект показан

        if (isInDom && record && record.get('sport_slug')) {
            if (activeTabId == 'rats') {// * крысы
                var date = new Date(record.get('time')),
                    dateStr = Ext.Date.format(date, 'd F G:i');
                title = record.get('tournament_name') + ', забег № ' + record.get('short_number') + ' (' + dateStr + ')';
                MarketsHtml.ratsClick(gridLive, record);
            } else {
                var activeTab = tabEvent.getActiveTab(),
                    expanded = vmEvent.get('expanded');

                if (activeTab && activeTab.getItemId() == gridLive.getItemId()) {
                    var title = record.get('home') + ' - ' + record.get('away');

                    MarketsHtml.eventTypeFirstClick(gridLive, record);
                }
            }
            if (title)
                fill.getViewModel().set('title', title);
        } else if (record && !record.get('sport_slug')) { // * крысные фантомные строки
            if (BasketF.isActiveEventTab(gridLive)) {
                FillF.clearCenterArea();
            }
        }

    },

    // * поменяли выделение в гриде событий
    onSelectionChange: function (view, selected) {
        var grid = this.getView(),
            selection = grid.getSelectionModel().getSelection()[0];

        if (selection && BasketF.isActiveEventTab(this.getView())) {
            FillF.resetCenterArea();
        }
    },

    // * дата и время матча
    dateText: function (val, column, rec) {
        var eventIdText3 = UtilMarkets.durationText(rec.getData());

        if (!val)
            return '';

        // * красным будем выделять время, если прием ставок приостановлен
        if (rec.get('_fantom')) {// * крысы
            var dateEvent = Ext.Date.parse(eventIdText3, "i:s");

            if (dateEvent) {
                var minutes = dateEvent.getMinutes(),
                    seconds = dateEvent.getSeconds(),
                    secondsAll = minutes * 60 + seconds,
                    minTimeToEndBet = Util.getGlobalConst('COUNT_SECONDS_TO_BAN_BETS_ON_RATS');

                if (secondsAll <= minTimeToEndBet) {
                    // * удалим ставки из купона
                    if (secondsAll == minTimeToEndBet) {
                        // * прекращение приема ставок
                        rec.set('betting_closed', true);
                    }

                    return '<span style="color: red;font-weight:bold">' + val + '<br>' + eventIdText3 + '</span>';
                } else if (secondsAll > minTimeToEndBet && eventIdText3 != "00:00") {
                    return val + '<br>' + eventIdText3;
                } else {
                    return val;
                }
            } else {
                return val;
            }
        } else {
            if (eventIdText3 == "00:00") {
                return val;
            } else {
                if (rec.get('betting_closed')) {
                    return '<span style="color: red;font-weight:bold">' + val + '<br>' + eventIdText3 + '</span>';
                } else {
                    return val + '<br>' + eventIdText3;
                }
            }
        }
    },

    onKeydown: function (field, n, o, e) {
        this.onAddFilter(field, n, o, e);
    },

    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var fill = Ext.ComponentQuery.query('fill')[0],
                vm = fill.getViewModel(),
                n = vm.get('filters.filterEvent');
            this.onAddFilter(field, n);
        }
    },

    onAddFilter: function (field, n, o, e) {
        var grid = this.getView(),
            storeLive = grid.getViewModel().getStore('eventstore_chained'),
            all = 0;

        storeLive.clearFilter();

        Ext.defer(function () {
            var vm = grid.getViewModel(),
                arrChecked = vm.get('filters.cbSport'),
                filterEvent = vm.get('filters.filterEvent'),
                filterDate = vm.get('filters.filterDate'),
                filterTime = vm.get('filters.filterTime');

            if (n == null && field.getItemId() == 'filterDate')
                filterDate = n;

            if (n == null && field.getItemId() == 'filterTime')
                filterTime = n;

            function fooFilterSport(item) {
                if (arrChecked && arrChecked.length) {
                    var sport_id = item.get('sport_id');
                    return (Util.in_array(sport_id, arrChecked, false)
                    || Util.in_array(all, arrChecked, false)
                    || arrChecked.length == 0);
                } else
                    return true;
            }

            function fooFilterEvent(item) {
                if (filterEvent) {
                    var home = item.get('home'),
                        away = item.get('away'),
                        short_number = item.get('short_number');
                    return ((home && home.toString().toLowerCase().indexOf(filterEvent.toLowerCase()) > -1)
                    || (away && away.toString().toLowerCase().indexOf(filterEvent.toLowerCase()) > -1)
                    || (short_number && short_number == filterEvent.toLowerCase()));
                } else
                    return true;
            }

            function fooFilterDate(item) {
                if (filterDate) {
                    var date = Ext.Date.parse(item.get('time'), 'Y-m-d H:i:s'),
                        filterDateEnd = Ext.Date.add(filterDate, Ext.Date.SECOND, 86399);
                    return (date <= filterDateEnd);
                } else
                    return true;
            }

            function fooFilterTime(item) {
                if (filterTime) {
                    var date = Ext.Date.parse(item.get('time'), 'Y-m-d H:i:s'),
                        dateHour = date.getHours(),
                        dateMinutes = date.getMinutes(),
                        dateValue = dateHour * 60 + dateMinutes,
                        filterTimeHour = filterTime.getHours(),
                        filterTimeMinutes = filterTime.getMinutes(),
                        filterTimeValue = filterTimeHour * 60 + filterTimeMinutes;
                    return (dateValue <= filterTimeValue);
                } else
                    return true;
            }

            storeLive.filterBy(function (item) {
                return fooFilterSport(item) * fooFilterEvent(item) * fooFilterDate(item) * fooFilterTime(item);
            });

            var cnt = storeLive.count();
            if (cnt == 0) {
                Util.warnMes('События не найдены');
            } else if (cnt == 1) { // * если найдено одно событие, то его выбираем
                grid.setSelection(storeLive.getAt(0));
                grid.fireEventArgs('itemclick', [{}, storeLive.getAt(0)]);
            } else { // * очищаем центральную область
                FillF.clearCenterArea();
            }
        }, 100, this);
    },

    // * всплывающая подсказка для поля Дата
    onFilterDateTip: function (component) {
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: component.id,
            html: 'Дата по'
        });
    },

    // * всплывающая подсказка для поля Время
    onFilterTimeTip: function (component) {
        var tip = Ext.create('Ext.tip.ToolTip', {
            target: component.id,
            html: 'Время по'
        });
    }
});
