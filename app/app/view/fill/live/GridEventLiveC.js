Ext.define('Office.view.fill.live.GridEventLiveC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.fill.contextmenu.MenuGridCoeffV',
        //'Office.view.fill.coeff.TemplatesWeb'
    ],
    alias: 'controller.grideventlive',

    onRender: function (grid) {
        var grid = this.getView(),
            fill = grid.up('#main');

        if (grid.getItemId() == 'rats') {
            // * для grideventlive у Крыс не должно быть группировки
            var feature = grid.getView().getFeature('groupFeatureId');
            feature.disable();

            // * для grideventlive у Крыс должно быть всегда 2 строки, пусть даже пустые
            Ext.defer(function () {
                var storeEvent = grid.getViewModel().getStore('eventstore');
                storeEvent.loadData(Util.cloneObject(storeEvent._defaults));
            }, 10, this);
        }

        fill.getController().onRender(grid);
    },

    onEventStoreChange: function (store) {
        var activeTabIndex = BasketF.getActiveTabIndexEvent(),
            grid = Ext.ComponentQuery.query('grideventlive')[activeTabIndex];

        // * отфильтруем виды спорта в фильтре по видам спорта
        if (grid.getItemId() != 'rats'
            && grid.getItemId() != 'dayexpress'
            && grid.getItemId() != 'dayexpressDC') {

            this.filterSports();
        }
    },

    /* загрузка данных из апи в модель, и приведение их понятному для ??? виду */
    // * rawdata store load
    loadRawData: function (store, records) {
        var grid = this.getView(),
            vmLive = grid.getViewModel(),
            eventstore = vmLive.getStore('eventstore');

        if (!records || !records.length) {
            records = store.getRange();
        }

        if (records && records.length) {
            var matchdata = records[0].get('matchdata'),
                objDiffs = records[0].get('diffs'),
                dayExpress = records[0].get('dayExpress'); // * Экспресс дня

            if (matchdata) { // * full
                var objData = matchdata['data'], // * полная линия
                    arrDiffs = matchdata['diffs'],// * изменения, их нужно будет смержить в основную коллекцию
                    curLineVers = matchdata['current_line_version']; // * номер текущей линии

                // * блок matchdata.data
                ApplyChangedData.loadMatchdataData(objData, curLineVers, grid);

                // * блок matchdata.diffs
                ApplyChangedData.loadDiffs(arrDiffs, grid);
            } else if (objDiffs) { // * diffs
                ApplyChangedData.loadDiffs(objDiffs, grid);
            } else if (dayExpress) { // * dayexpress
                ApplyChangedData.loadDayExpress(dayExpress, grid);
            }

            if (vmLive.get('firstFillFromLocal')) {
                BasketF.fillBasketFromLocal(grid, 100);
                vmLive.set('firstFillFromLocal', 0);
            }
        }
    },

    filterSports: function () {
        var grid = this.getView(),
            vm = grid.getViewModel(),
            sport_chained = vm.getStore('sport_chained'),
            storeEvent = vm.getStore('eventstore'),
            arrSports = Ext.Array.pluck(Ext.Array.pluck(storeEvent.getRange(), 'data'), 'sport_id'),
            arrSportUniq = Ext.Array.unique(arrSports);

        if (sport_chained) {
            sport_chained.clearFilter();
            sport_chained.addFilter({
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
        var gridLive = this.getView(),
            fill = Ext.ComponentQuery.query('#main')[0],
            modeCoeff = fill.down('#modeCoeff'),
            tabEvent = fill.down('#eventstab'),
            activeTabId = BasketF.getActiveTabEventId();

        if (record && record.get('sport_slug')) {
            if (activeTabId == 'rats') {// * крысы
                var date = new Date(record.get('time')),
                    dateStr = Ext.Date.format(date, 'd F G:i');
                title = record.get('tournament_name') + ', забег № ' + record.get('short_number') + ' (' + dateStr + ')';
                MarketsHtml.ratsClick(gridLive, record);
            } else {
                var activeTab = tabEvent.getActiveTab();
                if (activeTab && activeTab.getItemId() == gridLive.getItemId()) {
                    var title = record.get('home') + ' - ' + record.get('away');
                    setTimeout(function () { // * чтобы эта ф-ия не тормозила выполнения последующего кода
                        MarketsHtml.eventTypeFirstClick(gridLive, record);
                    }, 10);
                }
            }
            if (title)
                fill.getViewModel().set('title', title);

            // * запишем номер события в быстрый ввод и переведем туда курсор
            var fastInput = fill.down('#fastInput');
            fastInput.setValue(record.get('short_number') + ' ');
            //fastInput.focus(); // * иначе при вводе серии ставок курсор переводится на поле быстрого ввода
        } else if (record && !record.get('sport_slug')) { // * крысные фантомные строки
            FillF.clearCenterArea();
            fill.getViewModel().set('title', null);
        }
    },


    // * поменяли выделение в гриде событий
    onSelectionChange: function (view, selected) {
        var selection = this.getView().getSelectionModel().getSelection();
        if (!selection.length) {
            FillF.resetCenterArea();
        }
    },

    //selectView: function (v) {
    //    var grid = Ext.ComponentQuery.query('gridcoeff')[0],
    //        vm = grid.getViewModel();
    //    Ext.defer(function () {
    //        grid.getView().setScrollY(vm.get('scrollPosition'), false);
    //    }, 20);
    //},

    // * дата и время матча
    dateText: function (val, column, rec) {
        var eventIdText3 = UtilMarkets.durationText(rec.getData()),
            activeTabId = BasketF.getActiveTabEventId();

        // * красным будем выделять время, если прием ставок приостановлен
        if (activeTabId == 'rats') {
            var dateEvent = Ext.Date.parse(eventIdText3, "i:s");

            if (dateEvent) {
                var minutes = dateEvent.getMinutes(),
                    seconds = dateEvent.getSeconds(),
                    secondsAll = minutes * 60 + seconds;

                if (secondsAll <= Util.RATS_TIME_TO_STOP_BETTING) {
                    // * удалим ставки из купона
                    if (secondsAll == Util.RATS_TIME_TO_STOP_BETTING) {
                        var fill = Ext.ComponentQuery.query('#main')[0];
                        fill.getController().clickClearBet();

                        // * прекращение приема ставок
                        rec.set('betting_closed', true);
                    }

                    return '<span style="color: red;">' + val + '<br>' + eventIdText3 + '</span>';
                } else if (secondsAll > Util.RATS_TIME_TO_STOP_BETTING) {
                    return val + '<br>' + eventIdText3;
                } else {
                    return val;
                }
            } else {
                return val;
            }
        } else {
            if (eventIdText3 != '00:00') {
                if (rec.get('betting_closed')) {
                    return '<span style="color: red;">' + val + '<br>' + eventIdText3 + '</span>';
                } else {
                    return val + '<br>' + eventIdText3;
                }
            } else
                return val;
        }
    },

    deleteBetsFromCoupon: function () {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vm = fill.getViewModel(),
            storeBasket = vm.getStore('basket');

        // * очищаем стор купона
        storeBasket.removeAll();
    },

    onKeydown: function (field, n, o, e) {
        this.onAddFilter(field, n, o, e);
    },

    onAddFilter: function (field, n, o, e) {
        var gridLive = this.getView(),
            storeLive = gridLive.store,
        //storeLive = gridLive.getViewModel().getStore('eventstore_chained'),//todo в 5.1.2 поменять на eventstore_chained, т.к. пофиксили баг
        //storeLive = gridLive.getViewModel().getStore('eventstore'),//todo в 5.1.2 поменять на eventstore_chained, т.к. пофиксили баг
            all = 0;

        Ext.defer(function () {
            var vm = gridLive.getViewModel(),
                arrChecked = vm.get('filters.cbSport'),
                filterEvent = vm.get('filters.filterEvent'),
                filterDate = vm.get('filters.filterDate'),
                filterTime = vm.get('filters.filterTime');

            storeLive.clearFilter();

            if (arrChecked && arrChecked.length) {
                storeLive.filterBy(function (item) {
                    var sport_id = item.get('sport_id');
                    if (Util.in_array(sport_id, arrChecked, false)
                        || Util.in_array(all, arrChecked, false)
                        || arrChecked.length == 0)
                        return true;
                });
            }
            if (filterEvent) {
                storeLive.filterBy(function (item) {
                    var home = item.get('home'),
                        away = item.get('away');
                    if (home && home.toString().toLowerCase().indexOf(filterEvent.toLowerCase()) > -1)
                        return true;
                    if (away && away.toString().toLowerCase().indexOf(filterEvent.toLowerCase()) > -1)
                        return true;
                });
            }

            if (filterDate && n) { // * я не знаю почему при очистке поля filterDate не null, хотя n == null
                storeLive.filterBy(function (item) {
                    var date = Ext.Date.parse(item.get('time'), 'Y-m-d H:i:s'),
                        filterDateEnd = Ext.Date.add(filterDate, Ext.Date.SECOND, 86399);// * чтобы для сравнения использовалась последняя секунда указанной даты
                    if (date <= filterDateEnd)
                        return true;
                });
            }
//todo тут есть баг: когда очищаешь поле Время сбрасывается фильтр по Дате (это из-за условия && n для filterDate)
            if (filterTime) { // * я не знаю почему при очистке поля filterDate не null, хотя n == null
                storeLive.filterBy(function (item) {
                    var date = Ext.Date.parse(item.get('time'), 'Y-m-d H:i:s'),
                        dateHour = date.getHours(),
                        dateMinutes = date.getMinutes(),
                        dateValue = dateHour * 60 + dateMinutes,
                        filterTimeHour = filterTime.getHours(),
                        filterTimeMinutes = filterTime.getMinutes(),
                        filterTimeValue = filterTimeHour * 60 + filterTimeMinutes;
                    if (dateValue <= filterTimeValue)
                        return true;
                });
            }
        }, 100, this);
    }
});
