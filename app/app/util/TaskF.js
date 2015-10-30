// * задания, TaskRunner
Ext.define('Office.util.TaskF', {
    singleton: true,
    alternateClassName: ['TaskF'],

    taskSessionStart: function () {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            runner = vm.get('taskRunner'),
            taskSession = this.getTaskById(runner, 'taskSession');

        if (!taskSession) {
            var taskSession = runner.newTask({
                run: function () {
                    menumain.getController().loadSessionData();
                },
                interval: 1000 * Util.sessionAskInterval, // в секундах
                _taskId: 'taskSession'
            });
        } else
            taskSession.stop();

        menumain.on('close', function () {
            taskSession.stop();
        });

        taskSession.start();
    },

    taskSecondsStart: function (grid) {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vmFill = fill.getViewModel(),
            runner = vmFill.get('taskRunner'),
            taskSeconds = this.getTaskById(runner, 'taskSeconds_' + grid.getItemId()),
            vm = grid.getViewModel();

        Ext.defer(function () {// * из-за того, что в VM определил сторы в конструкторе, они перестали успевать сформироваться
            var store = vm.getStore('eventstore_chained');

            if (!taskSeconds && store) {
                taskSeconds = runner.newTask({
                    run: function () {
                        var isInDom = document.getElementById(grid.getId()); // * объект показан
                        if (isInDom) {
                            var recordsInStore = store.getRange();

                            // * проходим каждый раз по всем записям стора и обновляем таймер
                            Ext.Array.each(recordsInStore, function (rec) {
                                if (rec && !rec.get('timer_stopped')) {
                                    var recCurrent = store.findRecord('id', rec.get('id'), 0, false, true, true);
                                    if (recCurrent) {
                                        var _current_second = recCurrent.get('_current_second');
                                        if(_current_second>=0){
                                            recCurrent.set('_current_second', _current_second + 1);
                                            recCurrent.commit();
                                        }
                                    }
                                }
                            });
                        }
                    },
                    interval: 1000 * 1, // в секундах
                    _taskId: 'taskSeconds_' + grid.getItemId()
                });
            } else
                taskSeconds.stop();

            // * регистрация события на остановку таймера после закрытия раздела
            grid.on('destroy', function () {
                taskSeconds.stop();
            });

            //if (grideventlive.getItemId() == 'live')
            taskSeconds.start();
        }, 10, this);
    },

    // * найти таск по его _taskId в массиве vm.data.taskrunner
    getTaskById: function (runner, taskId) {
        return Ext.Array.findBy(runner.tasks, function (item) {
            if (item._taskId == taskId)
                return true;
        });
    },

    // * периодически подчищает eventstore, удаляя просроченные события (только из line и rats)
    startTaskClearEventStore: function (grid) {
        var fill = Ext.ComponentQuery.query('#main')[0],
            vmFill = fill.getViewModel(),
            runner = vmFill.get('taskRunner'),
            taskFilter = this.getTaskById(runner, 'taskFilter_' + grid.getItemId()),
            vm = grid.getViewModel(),
            rawdata = vm.getStore('rawdata'),
            _this = this;

        if (!taskFilter) {
            taskFilter = runner.newTask({
                run: function () {
                    var isInDom = document.getElementById(grid.getId()); // * объект показан
                    if (isInDom) {

                        var store = grid.getViewModel().getStore('eventstore'),
                        // var store = grid.getViewModel().getStore('eventstore_chained'),
                            currentTime = new Date(),
                            strCurrentTime = Ext.Date.format(currentTime, 'timestamp'),
                            arrBasketToDelete = [],
                            arrEventToDelete = [],
                            arrEventSetToDefault = [];

                        store.each(function (item) {
                            var time = new Date(item.get('time')),
                                strTime = Ext.Date.format(time, 'timestamp');
                            //if(item.get('type') == 'line' && item.get('short_number') == 4892)
                            //    console.info(strTime < strCurrentTime,strTime,strCurrentTime,item);
                            if (item
                                && ((item.get('type') == 'line' && strTime < strCurrentTime)
                                /*|| (item.get('sport_slug') == 'sport_rats'
                                && strTime < strCurrentTime
                                && !item.get('_fantom'))*/ // * чтобы не удалялись фантомные строки в крысах
                                || (item.get('finished') == 1))) {

                                // * перед удалением события проверим, может оно сейчас выделено,
                                // * тогда очистим центральную область, очистим заголовок, поле быстрого ввода
                                var selection = grid.selection;
                                if (item == selection) {
                                    FillF.clearCenterArea();

                                    var fastInput = fill.down('#fastInput');
                                    fastInput.reset();

                                    vmFill.set('title', null);
                                }

                                //// * для раздела Крысы-ставки, будем при этом обновлять грид Крысы: история ставок
                                //var gridrat = fill.down('gridrat'),
                                //    str = 'Событие закончилось: ' + '№ ' + item.get('short_number');
                                //
                                //if (gridrat && grid.getItemId() == 'rats') {
                                //    gridrat.store.reload();
                                //} else
                                //    str += '<br>' + item.get('home') + ' - ' + item.get('away');
                                //Util.warnMes(str); // * очень назойливое уведомление

                                arrEventToDelete.push(item);
                            } else if (item  // * фантомные строки Крыс
                                && ((item.get('sport_slug') == 'sport_rats'
                                && strTime < strCurrentTime
                                && item.get('_fantom')))) {

                                arrEventSetToDefault.push(item);

                                FillF.clearCenterArea();
                                fill.getViewModel().set('title', null);

                                // * для раздела Крысы-ставки, будем при этом обновлять грид Крысы: история ставок
                                var gridrat = fill.down('gridrat'),
                                    str = 'Событие закончилось: ' + '№ ' + item.get('short_number');

                                if (gridrat && grid.getItemId() == 'rats') {
                                    gridrat.store.reload();
                                } else
                                    str += '<br>' + item.get('home') + ' - ' + item.get('away');
                            }
                        }, this);

                        if (arrEventToDelete.length) {
                           // store.clearFilter(); // * иначе группировка и скрол сбиваются- появляются пропуски
                            store.remove(arrEventToDelete);
                            grid.getView().refresh();
                        }

                        if (arrEventSetToDefault.length) {
                            _this.setFantomToDefault(arrEventSetToDefault, grid);
                        }

                        // * удалим из купона исходы удаленных событий (проверяется только существует ли событие)
                        if (grid.getItemId() == BasketF.getActiveTabEventId()) {// * делаем это только если относится к выделенной вкладке, т.к. в купон исходы добавляются из localstorage
                            var storeBasket = vmFill.getStore('basket');

                            storeBasket.each(function (itm) {
                                var event_id = itm.get('event_id'),
                                    event = store.findRecord('event_id', event_id, 0, false, true, true);

                                if (!event) {
                                    arrBasketToDelete.push(itm);
                                }
                            });

                            if (arrBasketToDelete.length)
                                storeBasket.remove(arrBasketToDelete);
                        }
                    }
                },
                interval: 1000 * 1, // в милисекундах
                _taskId: 'taskFilter_' + grid.getItemId()
            });
        } else
            taskFilter.stop();

        grid.on('destroy', function () {
            taskFilter.stop();
        });
        taskFilter.start();
    },

    // * сбросить данные в фантомной ячейке Крыс на дефолтное
    setFantomToDefault: function (arrEvent, grid) {
        var storeEvent = grid.getViewModel().getStore('eventstore'),
            arrDefaults = storeEvent._defaults;

        Ext.Array.each(arrEvent, function (item) {
            var el = Ext.Array.findBy(arrDefaults, function (itm) {
                return itm.tournament_name == item.get('tournament_name');
            });

            if (el){
                item.data={};
                item.set(el);
            }
        });
    },

    // * периодически обновляет virtual (Виртуальные заявки)
    startTaskVirtualRefresh: function (grid) {
        var vm = grid.getViewModel(),
            runner = vm.get('taskRunner'),
            taskName = this.getTaskById(runner, 'taskRefresh'),
            storeVirtual = vm.getStore('virtual');

        if (!taskName) {
            taskName = runner.newTask({
                run: function () {
                    var isInDom = document.getElementById(grid.getId()); // * объект показан
                    if (isInDom) {
                        if (storeVirtual)
                            storeVirtual.reload();
                    }
                },
                interval: 1000 * 5, // в миллисекундах
                _taskId: 'taskRefresh'
            });
        } else
            taskName.stop();

        grid.on('destroy', function () {
            taskName.stop();
        });

        taskName.start();
    },

    // * периодически обновляет данные по Экспрессу дня
    startTaskDayExpressLoad: function (grid, func) {
        var vm = grid.getViewModel(),
            runner = vm.get('taskRunner'),
            taskName = this.getTaskById(runner, 'taskDayExpressLoad');

        if (!taskName) {
            taskName = runner.newTask({
                run: function () {
                    var isInDom = document.getElementById(grid.getId()); // * объект показан
                    if (isInDom) {
                        func();
                    }
                },
                interval: 1000 * 5,
                _taskId: 'taskDayExpressLoad'
            });
        } else
            taskName.stop();

        grid.on('destroy', function () {
            taskName.stop();
        });

        taskName.start();
    },

    //startTaskWs: function (grid) {
    //    var fill = Ext.ComponentQuery.query('#main')[0],
    //        vmFill = fill.getViewModel(),
    //        runner = vmFill.get('taskRunner'),
    //        taskGetCoef = this.getTaskById(runner, 'taskGetCoef');
    //
    //    var vm = grid.getViewModel();
    //    vm.runnerTaskWs = new Ext.util.TaskRunner();
    //    var rawdata = vm.getStore('rawdata'),
    //        task = vm.runnerTaskWs.newTask({
    //            run: function () {
    //                rawdata.load();
    //            },
    //            interval: 1000 * Util.COEFF_ASK_INTERVAL // в секундах
    //        });
    //
    //    task.stop();
    //    grid.on('destroy', function () {
    //        task.stop();
    //    });
    //
    //    task.start();
    //},
    //
    //startTaskWs1: function () {
    //    var runnerTaskWs = new Ext.util.TaskRunner();
    //    var task = runnerTaskWs.newTask({
    //        run: function () {
    //            window.WS.relaunch();
    //            WS.init(
    //                function (ws) {
    //                    ws.onMessage = function (objData, channel, lang) {
    //                        var type = channel == 'inplay' ? 1 : 0,
    //                            gridLive = Ext.ComponentQuery.query('grideventlive')[type];
    //                        if (gridLive) {// * может не быть, если уже закрыли раздел, а данные еще приходят
    //                            var vmLive = gridLive.getViewModel(),
    //                                storeRawLive = vmLive.getStore('rawdata');
    //                            var result = storeRawLive.loadRawData(objData);
    //                            if (!result) {
    //                                ws.unsubscribe(channel, lang);
    //                            } else {
    //                                vmLive.runnerTaskWs = null;
    //                            }
    //                        }
    //                        //TaskF.startTaskWs(gridLive);
    //                    };
    //                    ws.onClose = function () {
    //                        //ваш код обработчик
    //                    };
    //                    ws.onReopen = function (m) {
    //                        //ваш код обработчик
    //                        ws.subscribe('inplay', 'ru', null);
    //                        ws.subscribe('prematch', 'ru', null);
    //                    };
    //
    //                    ws.subscribe('inplay', 'ru', null);
    //                    ws.subscribe('prematch', 'ru', null);
    //
    //                    var gridLive = Ext.ComponentQuery.query('grideventlive')[1];
    //                    //TaskF.startTaskWs(gridLive);
    //                },
    //                function () {
    //                    console.log('Браузер не поддерживает web sockets');
    //                }
    //            );
    //        },
    //        interval: 1000 * 5 // в секундах
    //    });
    //
    //    task.stop();
    //
    //    task.start();
    //},

    // * остановить задание по имени
    stopTask: function (taskName) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            runner = vm.get('taskRunner'),
            task = this.getTaskById(runner, taskName);
        task.stop();
    },

    startQueueDelay: function (window) {
        var vmwin = window.getViewModel(),
            delay = vmwin.get('delay'),
            key = vmwin.get('key');

        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            runner = vm.get('taskRunner'),
            taskName = 'taskQueueDelay_',
            task = this.getTaskById(runner, taskName + window.getId());

        if (!task) {
            task = runner.newTask({
                run: function () {
                    delay--;

                    if (vmwin)
                        vmwin.set('delay', delay);

                    if (delay <= 0) {
                        task.stop();
                        BasketF.basketQueue('check', key);
                    }
                },
                interval: 1000, // 1 сек
                duration: 1000 * (delay + 1), // в секундах
                _taskId: taskName + window.getId()
            });
        } else
            task.stop();

        window.on('close', function () {
            task.stop();
        });

        task.start();
    }
});