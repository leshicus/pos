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
            taskSession = runner.newTask({
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

    taskSecondsStart: function (storeName) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            runner = vm.get('taskRunner'),
            taskSeconds = this.getTaskById(runner, 'taskSeconds_' + storeName),
            store = vm.getStore(storeName); // * объект показан

        if (!taskSeconds) {
            taskSeconds = runner.newTask({
                run: function () {
                    store.suspendEvents();
                    store.each(function (rec) {
                        if (rec) {
                            var _current_second = rec.get('_current_second');
                            if (!rec.get('timer_stopped') && _current_second >= 0) {
                                rec.set('_current_second', _current_second + 1);
                            }
                        }
                    });
                    store.resumeEvents();

                    if (store && typeof store.commitChanges == 'function') {
                        store.commitChanges();
                    }
                },
                interval: 1000 * 1, // в секундах
                _taskId: 'taskSeconds_' + storeName
            });

            taskSeconds.start();

            // * регистрация события на остановку таймера после закрытия раздела
            menumain.on('destroy', function () {
                taskSeconds.stop();
            });
        }
    },

    // * периодически обновляет список событий
    taskEventReload: function () {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            runner = vm.get('taskRunner'),
            task = this.getTaskById(runner, 'taskEventReload');

        if (!task) {
            task = runner.newTask({
                run: function () {
                    //store.suspendEvents();
                    // * сохраним выделенную запись события
                    var activeTabEvent = BasketF.getActiveTabIndexEvent(),
                        fill = Ext.ComponentQuery.query('fill')[0];
                    if (activeTabEvent && activeTabEvent <= 2 && fill) {
                        var gridEvent = fill.query('grideventlive')[activeTabEvent],
                            selection = gridEvent.selection;
                    }


                    MatchdataTransport.reconnect('inplay');
                    MatchdataTransport.reconnect('prematch');
                    FillF.getDayExpressData();

                    // * восстановим выделение
                    if (selection && gridEvent) {
                        // * выделим событие
                        Ext.defer(function () {
                            gridEvent.ensureVisible(selection, {
                                animate: false,
                                highlight: true,
                                select: true,
                                focus: false
                            });
                            //gridEvent.fireEvent('itemclick', gridEvent);
                            //gridEvent.setSelection(selection);
                            //gridEvent.getController().showCoefs(selection);
                        }, 2000, this);
                    }
                    //store.resumeEvents();
                },
                interval: 1000 * 10 * 1, // в минутах
                _taskId: 'taskEventReload'
            });

            task.start();

            // * регистрация события на остановку таймера после закрытия раздела
            menumain.on('destroy', function () {
                task.stop();
            });
        }
    },

    // * найти таск по его _taskId в массиве vm.data.taskrunner
    getTaskById: function (runner, taskId) {
        return Ext.Array.findBy(runner.tasks, function (item) {
            if (item._taskId == taskId)
                return true;
        });
    },

    // * периодически подчищает eventstore, удаляя просроченные события (только из line и rats)
    startTaskClearEventStore: function (grid, interval) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            runner = vm.get('taskRunner'),
            storeName = grid.getItemId(),
            taskFilter = this.getTaskById(runner, 'taskFilter_' + storeName);

        if (!taskFilter) {
            var _this = this,
                store = vm.getStore(storeName),
                delayToDelete = parseInt(Util.getGlobalConst("COUNT_MINUTS_FOR_HIDE_BEFORE_LIVE")) * 60; // * За сколько минут до начала события убирать его из линии. В минутах.

            taskFilter = runner.newTask({
                run: function () {
                    var currentTime = new Date(),
                        strCurrentTime = Ext.Date.format(currentTime, 'timestamp'),
                        arrBasketToDelete = [],// * список ставок в купоне к удалению
                        arrEventToDelete = [],// * список событий к удалению
                        arrEventSetToDefault = [],// * список событий, которые нужно не удалить, а сбросить на дефолтные
                        arrEventToDeleteBasket = [], // * список событий, по которым нужно удалить ставки из купрна
                        fill = Ext.ComponentQuery.query('fill')[0];

                    if (store) {
                        store.each(function (item) {
                            var time = new Date(item.get('time')),
                                strTime = Ext.Date.format(time, 'timestamp');

                            if (item
                                && ((item.get('type') == 'line' && (strTime - delayToDelete < strCurrentTime) )
                                || (item.get('finished') == 1))) {

                                arrEventToDelete.push(item);
                                arrEventToDeleteBasket.push(item);
                            } else if (item  // * фантомные строки Крыс
                                && ((item.get('sport_slug') == 'sport_rats'
                                && strTime < strCurrentTime
                                && item.get('_fantom')))) {

                                arrEventSetToDefault.push(item);
                                arrEventToDeleteBasket.push(item);

                                // * для раздела Крысы-ставки, будем при этом обновлять грид Крысы: история ставок
                                if (fill) {
                                    var gridrat = fill.down('gridrat');
                                    if (gridrat && storeName == 'rats') {
                                        gridrat.store.reload();
                                    }
                                }
                            }
                        }, this);

                        if (arrEventToDelete.length) {
                            if (grid && grid.getViewModel()) {
                                // * перед удалением события проверим, может оно сейчас выделено,
                                // * тогда очистим центральную область, очистим заголовок, поле быстрого ввода
                                var selection = grid.selection;
                                if (Ext.Array.contains(arrEventToDelete, selection) && BasketF.isActiveEventTab(grid)) {
                                    FillF.clearCenterArea();
                                }

                                // * подавляем выполнение всех ивентов и вызываем только конкретное действие- для увеличения производительности
                                store.suspendEvents();
                                store.remove(arrEventToDelete);
                                menumain.getController().setLiveCountProperty(store);
                                store.resumeEvents();

                                // * чтобы удалялось и из отфильтрованного стора (если были применены фильтры)
                                //var store_chained = grid.getViewModel().getStore('eventstore_chained');
                                //if (store_chained.getFilters().length) {
                                //    if (store_chained.data)
                                //        store_chained.data.clear();
                                //}

                                // * !!!костыль, борющийся с пустыми пространствами в обновившемся гриде!!!
                                _this.doBufferRenderUpdate(grid, store);
                            }
                        }
                    }

                    if (arrEventToDeleteBasket.length) {
                        // * удалим из купона исходы удаленных событий (проверяется только существует ли событие)
                        if (fill) {
                            var vmFill = fill.getViewModel(),
                                storeBasket = vmFill.getStore('basket');
                            Ext.Array.each(arrEventToDeleteBasket, function (itm) {
                                var event_id = itm.get('event_id'),
                                    bet = storeBasket.findRecord('event_id', event_id, 0, false, true, true);

                                if (bet) {
                                    arrBasketToDelete.push(itm);
                                }
                            });
                            if (arrBasketToDelete.length) {
                                storeBasket.remove(arrBasketToDelete);
                            }
                        }
                    }

                    if (arrEventSetToDefault.length) {
                        var selection = grid.selection;
                        if (Ext.Array.contains(arrEventSetToDefault, selection) && BasketF.isActiveEventTab(grid)) {
                            FillF.clearCenterArea();
                        }

                        _this.setFantomToDefault(arrEventSetToDefault);
                    }
                },
                interval: 1000 * interval, // в миллисекундах
                _taskId: 'taskFilter_' + storeName
            });

            taskFilter.start();

            menumain.on('destroy', function () {
                taskFilter.stop();
            });
        }
    },

    // * исправление бага, когда в гриде с BufferedRenderer при добавлении/удалении строк появляются пустые места
    // * фильтрация, удаление фильтров, восстановление позиции скролбара и выделения
    doBufferRenderUpdate: function (grid, store) {
        if (grid.getEl() && grid.getPlugins()) {
            var selection = grid.getSelectionModel().getSelection()[0],
                scrollPosition = grid.getEl().down('.x-grid-view').getScroll();

            store.suspendEvents();
            store.filterBy(function () {
                return false;
            });
            store.clearFilter();
            store.resumeEvents();

            if (scrollPosition)
                grid.getView().scrollBy(0, scrollPosition.top, false);
            if (selection && BasketF.isActiveEventTab(grid)) {
                grid.setSelection(selection);
                grid.getController().showCoefs(selection);
            }
        }
    },

    // * сбросить данные в фантомной ячейке Крыс на дефолтное
    setFantomToDefault: function (arrEvent) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            storeEvent = vm.getStore('rats'),
            arrDefaults = storeEvent._defaults;

        Ext.Array.each(arrEvent, function (item) {
            var el = Ext.Array.findBy(arrDefaults, function (itm) {
                return itm.tournament_name == item.get('tournament_name');
            });

            if (el) {
                item.data = {};
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
                        if (storeVirtual) {
                            storeVirtual.suspendEvents();
                            storeVirtual.reload();
                            storeVirtual.resumeEvents();
                        }
                    }
                },
                interval: 1000 * 5, // в миллисекундах
                _taskId: 'taskRefresh'
            });

            grid.on('destroy', function () {
                taskName.stop();
            });

            taskName.start();
        }
    },

    // * периодически обновляет данные по Экспрессу дня
    startTaskDayExpressLoad: function (func) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            runner = vm.get('taskRunner'),
            taskName = this.getTaskById(runner, 'taskDayExpressLoad');

        if (!taskName) {
            taskName = runner.newTask({
                run: function () {
                    //var isInDom = document.getElementById(grid.getId()); // * объект показан
                    //if (isInDom) {
                    func();
                    //}
                },
                interval: 1000 * 10,
                _taskId: 'taskDayExpressLoad'
            });

            menumain.on('destroy', function () {
                taskName.stop();
            });

            taskName.start();
        }
    },

    // * остановить задание по имени
    stopTask: function (taskName) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            runner = vm.get('taskRunner'),
            task = this.getTaskById(runner, taskName);
        if (task)
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

                    if (vmwin) {
                        vmwin.set('delay', delay);
                    }

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