Ext.define('Office.controller.Main', {
    extend: 'Ext.app.Controller',
    stores: [],
    init: function () {
        this.listen({
            controller: {
                '*': {
                    // * для всего проекта
                    //onHeaderFilter : 'onHeaderFilter',
                    //onClearHeaderFilter:'onClearHeaderFilter'
                }
            },
            component: {
                // * очистка полей по нажатию Delete
                'combobox, textfield, datefield, tagfield': {
                    specialkey: function (field, e) {
                        if (e.getKey() == e.DELETE) {
                            field.reset();
                        }
                    }
                }
            },
            store: {}
        })
    },
    onAddFilter: function (field, n, o, e, isEnter, store) {
        // * для времени Совершения и Рассчета функция ведет себя так :
        // * если сначала проставить дату и время Совершения, а потом Рассчета, то
        // * когда меняем дату, то дата передается правильно, а время- нет, старая (Совершения, а не Рассчета)
        // * и наоборот, т.е. время всегда передается не то.
        // * ну и хрен с ним.
         //console.info(arguments);
        var filterValue = '';
        switch (field.getXType(field)) {
            case 'combobox':
                filterValue = field.getValue();
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
        //console.info(field, filterValue);
        var parameter = field.getItemId(),
            newFilter = Office.util.Utilities.count(filterValue) > 1 ? filterValue.join(',') : filterValue;
        Office.util.Filters.setFilters(parameter, newFilter);

        // * обновление стора
        // * стор нужно обновлять в следующих случаях:
        // * 1) поле имеет признак срабатывать по нажатию на Enter (fireEventOnEnter) и он нажат (isEnter)
        // * 2) просто нажат Enter (зачем?)
        // * 3) выбрано значение (n != null) и это значение отличается от
        var fireEventOnEnter = field._fireEventOnEnter;
        if ((fireEventOnEnter && isEnter) // * если установлен признак fireEventOnEnter, то отправлять только по нажатию Enter
                //|| isEnter // * по нажатию Enter отправлять всегда
            || (!fireEventOnEnter
            && ((n != null && o == null)
            || (n == null && o !== null)
            || (n !== null && o !== null)))/* || (!n && newValue !== oldValue)*/) { // * если очищаем поле, то отправлять всегда
            var filters = Office.util.Filters.getFilters(),
                params = {};

            if (field.up('headercontainer')) {
                var cbDateType = '',
                    headerText = field.up('headercontainer').text;
                switch (headerText) {
                    case 'Совершена':
                        cbDateType = 0;
                        break;
                    case 'Рассчитана':
                        cbDateType = 1;
                        break;
                }
                if (cbDateType !== '') {
                    var foundCbDateType = Office.util.Utilities.findById(filters, 'cbDateType');
                    foundCbDateType.value = cbDateType;
                }
            }

            //console.info(filters);

            filters.forEach(function (item) {
                if (typeof item == 'object') {
                    if (item.length > 1) {
                        item.forEach(function (i) {
                            params[i.id] = i.value;
                        });
                    } else {
                        params[item.id] = item.value;
                    }
                } else {
                    params[item.id] = item.value;
                }
            });
            Office.util.Utilities.storeLoad(store, params);
        } else {
            // * ничего не делаем
        }
    },
    onEnter: function (field, e, store) {
        if (e.getKey() == e.ENTER) {
            this.onAddFilter(field, null, null, null, true, store);
        }
    },
    // * очистить фильтры по нажатию на tool close в {panel}, а потом перезагрузить {grid}, если указан
    resetFilters: function (panel, grid) {
        // console.log(panel, grid);
        var filterArr = Office.util.Filters.getArrFilterComp(panel);
        console.info(filterArr);
        if (filterArr.length > 0) {
            // * очистка полей фильтров
            Ext.Array.each(filterArr, function (item) {
                //console.info(item,item.superclass,item.superclass.xtype);
                if (item.superclass.xtype == 'container'
                    || item.superclass.xtype == 'tableview') { // * случай, когда контейнер, внутри которого размещены элементы (как дата со временем)
                    var contArr = item.items.items;
                    Ext.Array.each(contArr, function (item) {
                        this.silentReset(item);
                    }, this);
                } else {
                    this.silentReset(item);
                }
            }, this);
            // * перезагрузка стора
            var filters = Office.util.Filters.getFilters(),
                params = {};
            filters.forEach(function (item) {
                params[item.id] = item.value;
            });
            if (grid) {
                Office.util.Utilities.storeLoad(grid.store, params);
            }
            // * нужно во всех сторах с полем checked проставить 0
            var stores = panel.getViewModel().getData();
            Ext.Object.each(stores, function (storeName, storeValue) {
                storeValue.each(function (item) {
                    if (item.get('checked')) {
                        item.set('checked', 0);
                    }
                });
            });
        }
    },
    silentReset: function (item) {
        // * погасим ивент на изменение, чтобы не обновлял стор каждый раз при удалении
        item.suspendEvent('change');

        item.reset();
        var filterId = item.getItemId(),
            filterValue = item.getRawValue();
        Office.util.Filters.setFilters(filterId, filterValue);
        item.resumeEvent('change');
    },
    // * удаление фильтра в заголовках ячеек (кнопка DELETE)
    onClearHeaderFilter: function (field, e, store) {
        console.log(arguments);
        if (e.getKey() == e.ENTER) {
            this.onHeaderFilter(field, null, null, null, true, store);
        }
    },
    // * добавляет элемент в массив фильтров, отправляет данные на сервер, ждет ответа и обновляет грид новыми данными
    onHeaderFilter: function (field, n, o, e, isEnter, store) {
        // console.log(arguments);
        var fireEventOnEnter = field._fireEventOnEnter,
            filterType = Office.util.Utilities.getXtypeById(field.getItemId()),
            filterValue,
            oldValue = Office.util.Utilities.nvl(o, 0),
            newValue = Office.util.Utilities.nvl(n, 0);
        filterValue = filterType == 'combobox' ? field.getValue() : field.getRawValue();
        Office.util.Filters.setFilters(field.getItemId(), filterValue);

        // * грид нужно обновлять в следующих случаях:
        // * 1) поле имеет признак срабатывать по нажатию на Enter (fireEventOnEnter) и он нажат (isEnter)
        // * 2) просто нажат Enter (зачем?)
        // * 3) выбрано значение (n != null) и это значение отличается от

        if ((fireEventOnEnter && isEnter) // * если установлен признак fireEventOnEnter, то отправлять только по нажатию Enter
                //|| isEnter // * по нажатию Enter отправлять всегда
            || (!fireEventOnEnter
            && ((n != null && o == null)
            || (n == null && o !== null)
            || (n !== null && o !== null)))/* || (!n && newValue !== oldValue)*/) { // * если очищаем поле, то отправлять всегда
            var filterArr = Office.util.Filters.getFilters();
            if (filterArr.length != 0) {
                var params = {
                    filters: Ext.encode(filterArr)
                };
                console.info(store);
                Office.util.Utilities.storeLoad(store, params);
            }
        } else {
            // * ничего не делаем
        }
    }

});
