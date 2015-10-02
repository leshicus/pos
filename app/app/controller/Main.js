Ext.define('Office.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: [

    ],
    stores: [],
    init: function () {
        this.listen({
            controller: {
                '*': {
                    // * для всего проекта
                    /*onHeaderFilter : 'onAddFilter',
                     onClearHeaderFilter:'onClearFilter'*/

                },

            },
            component: {
                // * очистка полей по нажатию Delete
                'combobox, textfield, datefield, timefield, tagfield': {
                    specialkey: function (field, e) {
                        if (e.getKey() == e.DELETE) {
                            field.reset();
                        }
                    }
                },

                // * при изменении значения в поле формы, меняется соответствующее значение в record формы
                // * from: https://www.sencha.com/forum/showthread.php?181203-Automatically-update-record-when-form-values-change
                'form field': {
                    change: function(field, newValue, oldValue) {
                        // Update record when form field values change
                        var form = field.up('form');
                        var record = form.getRecord();
                        var name = field.getName();
                        var value;

                        if(record && record.get(name) !== 'undefined') {
                            if(field.getXType() == 'radiofield' && field.up('radiogroup')) {
                                // This is a radiofield inside of a radiogroup
                                value = field.up('radiogroup').getValue();
                                if(typeof value[name] != 'object') value = value[name];
                                else return;
                            } else {
                                // Ordinary field
                                value = newValue;
                            }
                            // Update record with new value
                            record.set(name, value);
                        }
                    }
                }
            },
            store: {
                '*': {
                    load: function (store, recs, result) {
                        // * если сбой авторизации, то предложить перезайти в систему
                        /*if (!result){
                         console.info(arguments);
                         var responseText = store.proxy.reader.rawData,
                         str = 'Раздел не загружен.<br>Вероятно кто-то еще зашел в систему под вашим пользователем.<br>Авторизоваться заново?';
                         if(responseText.message.indexOf('Access denied') != -1){
                         Ext.Msg.confirm('Ошибка авторизации', str, function (button) {
                         if (button == 'yes') {
                         Office.util.Setup.logout();
                         }
                         }, this);
                         }else{
                         Util.toast('Неизвестная ошибка','Раздел не загружен.');
                         }
                         }*/
                        this.askLogoutIfAccessDenied(store);
                    }
                }
            }
        });

    },
    askLogoutIfAccessDenied: function (store, recs, result) {
        if (store.proxy) {
            var responseText = store.proxy.reader.rawData;
            return this.confirmLogoutMessage(responseText);
        }
        return true;
    },
    confirmLogoutMessage: function (responseText) {
        if (responseText) {
            if (responseText.success == false || responseText.status == false) {
                var str = 'Раздел не загружен.<br>Вероятно кто-то еще зашел в систему под вашим пользователем.<br>Авторизоваться заново?',
                    mes = responseText.message,
                    errors = responseText.errors;
                if (mes) {
                    if (responseText.message.indexOf(Util.arrAuthFail[0]) != -1
                        || responseText.message.indexOf(Util.arrAuthFail[1]) != -1) {
                        Ext.Msg.confirm('Ошибка авторизации', str, function (button) {
                            if (button == 'yes') {
                                Office.util.Setup.logout();
                            }
                        }, this);
                    } else {
                        Util.toast('Неизвестная ошибка', 'Раздел не загружен.');
                    }
                }
                if (errors) {
                    Util.erMes(errors[0]);
                    //Util.erMes(JSON.stringify(errors));
                }
                return false;
            }else{
                return true;
            }
        }else{
            return false;
        }
    },

    onClearFilterVm: function (field, e, store, grid) {
        if (e.getKey() == e.ENTER) {
            this.onAddFilterVm(field, null, null, null, true, store, grid);
        }
    },

    onAddFilterVm: function (field, n, o, e, isEnter, store, grid) {
        // * для времени Совершения и Рассчета функция ведет себя так :
        // * если сначала проставить дату и время Совершения, а потом Рассчета, то
        // * когда меняем дату, то дата передается правильно, а время- нет, старая (Совершения, а не Рассчета)
        // * и наоборот, т.е. время всегда передается не то.
        // * ну и хрен с ним. пока.

        // * ФУНКЦИЯ срабатывает и на DELETE, тогд нужно, чтобы обновился грид
        var filterValue = '';
        switch (field.getXType(field)) {
            case 'combobox':
                filterValue = n || field.getValue();
                break;
            case 'tagfield':
                filterValue = field.getValue();
                break;
            case 'timefield':
                filterValue = field.getRawValue();
                break;
            case 'datefield':
                filterValue = field.getRawValue();
                break;
            case 'textfield':
                filterValue = field.getValue();
                break;
            case 'checkboxfield':
                // * такой изврат, т.к. нельзя вернуть inputValue как getValue
                if (field.getValue())
                    filterValue = field.inputValue;
                else
                    filterValue = '';
                break;
        }
        var parameter = field.getItemId();
        //console.info(arguments, parameter);
        // * случай номера квитанции (gridpay), она имеет вид номер_х_код, ее нужно распарсить и сделать 2 отдельных фильтра, номер и код
        if (parameter == 'slipId' && filterValue.indexOf('x') > 0) {
            var arrValue = filterValue.split('x');
            Ext.Array.each(arrValue, function (paramValue, index) {
                var paramName = index == 0 ? 'slipId' : 'code',
                    newFilter = Util.count(paramValue) > 1 ? paramValue.join(',') : paramValue; // * преобр. массива в строку через запятую
                Filters.setFiltersVm(null, paramName, newFilter, grid);
            }, this);
        } else {
            var newFilter = Util.count(filterValue) > 1 ? filterValue.join(',') : filterValue; // * преобр. массива в строку через запятую
            Filters.setFiltersVm(null, parameter, newFilter, grid);
        }

        // * обновление стора
        // * стор нужно обновлять в следующих случаях:
        // * 1) поле имеет признак срабатывать по нажатию на Enter (_fireEventOnEnter) и он нажат (isEnter)
        // * 2) просто нажат Enter (зачем?)
        // * 3) выбрано значение (n != null) и это значение отличается от
        var fireEventOnEnter = field._fireEventOnEnter;
        if ((fireEventOnEnter && isEnter) // * если установлен признак fireEventOnEnter, то отправлять только по нажатию Enter
                //|| isEnter // * по нажатию Enter отправлять всегда
            || (!fireEventOnEnter
            && ((n != null && o == null)
            || (n == null && o !== null)
            || (n !== null && o !== null)))/* || (!n && newValue !== oldValue)*/) { // * если очищаем поле, то отправлять всегда

            // * если фильтр по датам Совершения/рассчета, то нужно менять cbDateType соответственно на 0/1
            /*if (field.up('headercontainer')) {
             if (field._cbDateType) {
             Filters.setFiltersVm(null, 'filters.cbDateType', field._cbDateType, grid);
             }
             }*/
            this.storeLoad(null, store, grid);
        } else {
            // * ничего не делаем
        }
    },
    storeLoad: function (section, store, grid) {
        var filters = Ext.encode(grid.getViewModel().getData().filters);
        //filters = Filters.getFilters(section),
        //objFilters = this.convertArrayToObject(filters);
        Util.storeLoad(store, filters, null, null, null, grid);
    },

    // * фильтры берутся из VM
    storeLoadVm: function (grid, successFn,failureFn) {
        var filters = Ext.encode(grid.getViewModel().getData().filters),
            store = grid.store;
        setTimeout(Util.storeLoad(store, filters, null, successFn, failureFn, grid),500);

    },
    /*
     // * преобразование массива в объект
     convertArrayToObject: function (arr) {
     var obj = {};
     arr.forEach(function (item) {
     //console.info(item);
     if (typeof item == 'object') {
     if (item.length > 1) {
     item.forEach(function (i) {
     obj[i.id] = i.value;
     });
     } else {
     obj[item.id] = item.value;
     }
     } else {
     obj[item.id] = item.value;
     }
     });
     return obj;
     },*/


    onEnterVm: function (field, e, store, grid) {
        if (e.getKey() == e.ENTER) {
            this.onAddFilterVm(field, null, null, null, true, store, grid);
        }
    },
    // * очистить фильтры по нажатию на tool close в {panel}, а потом перезагрузить {grid}, если указан
    // * если метод вызывается на панели фильтров, то перезагружать нужно все равно грид
    resetFilters: function (grid) {
        var vm = grid.getViewModel(),
            filters = vm.getData().filters,
            dateToday = Ext.Date.format(new Date(), 'Y-m-d');

        if (filters) {
            Ext.Object.each(filters, function (item) {
                // * в случае с полем cbDateFrom (Совершена - Дата с) не очищаем его, а устанавливаем на текущую дату. Для удобства.
                if (grid.getXType() == 'gridaccept' && item == 'cbDateFromMade') {
                    vm.set('filters.' + item, dateToday);
                } else {
                    vm.set('filters.' + item, null);
                }
            });
        }

        if (grid) {
            Util.storeLoad(grid.store, filters);
        }
        // * нужно во всех сторах с полем checked проставить 0
        var stores = vm.getData();

        Ext.Object.each(stores, function (storeName, storeValue) {
            // * проверка, что у данного объекта есть такая функция
            if (storeValue && typeof storeValue.each == 'function') {
                storeValue.each(function (item) {
                    if (item.get('checked')) {
                        item.set('checked', 0);
                    }
                });
            }
        });
    },

    silentReset: function (section, item) {
        // * погасим ивент на изменение, чтобы не обновлял стор каждый раз при удалении
        item.suspendEvent('change');
        item.reset();
        var filterId = item.getItemId(),
            filterValue = item.getRawValue();
        Filters.setFilters(section, filterId, filterValue);
        item.resumeEvent('change');
    },
    silentResetVm: function (section, item, grid) {
        // * погасим ивент на изменение, чтобы не обновлял стор каждый раз при удалении
        item.suspendEvent('change');
        item.reset();
        var filterId = item.getItemId(),
            filterValue = item.getRawValue();
        Filters.setFiltersVm(section, filterId, filterValue, grid);
        item.resumeEvent('change');
    },
    // * тихое присваивание значения value
    silentSet: function (section, item, value) {
        // * погасим ивент на изменение, чтобы не обновлял стор каждый раз при изменении
        item.suspendEvent('change');
        item.setValue(value);
        var filterId = item.getItemId(),
            filterValue = item.getRawValue();
        Filters.setFilters(section, filterId, value);
        item.resumeEvent('change');
    },
    silentSetVm: function (section, item, value, grid) {
        // * погасим ивент на изменение, чтобы не обновлял стор каждый раз при изменении
        item.suspendEvent('change');
        item.setValue(value);
        var filterId = item.getItemId(),
            filterValue = item.getRawValue();
        Filters.setFiltersVm(section, filterId, value, grid);
        item.resumeEvent('change');
    },
    // * раскрывает содержимое ячейки (нужно когда длинный текст не помещается в ячейке)
    onCelldblclick: function (cell, td, cellIndex, record, tr, rowIndex, e) {
        Util.cellWrap(td);
    }

});
