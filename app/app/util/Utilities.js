Ext.define('Office.util.Utilities', {
    singleton: true,

    role: 0,
    dateFormat: 'd.m.Y',
    pageSize: 25,
    //dateFormat:'d.m.Y H:i:s',
    comboRender: function (combo) {
        return function (value) {
            var record = combo.findRecord(combo.valueField || combo.displayField, value);
            return record ? record.get(combo.displayField) : combo.valueNotFoundText;
        }
    },
    // * цвет поля 1 места в гриде крыс
    renderRat: function (value, metaData, record, rowIndex, colIndex, store, view) {
        metaData.tdCls = record.get("firstcolor");
        return value;
    },
    // * цвет ячеек таблицы Принятые
    renderResult: function (value,metadata) {
        if (value) {
            if (value == "проигравшая") metadata.tdCls = 'bg-red';
            if (value == "возвращенная") metadata.tdCls = 'bg-purple';
            if (value == "фикс.возврат") metadata.tdCls = 'bg-purple-lt';
            if (value == "выигравшая") metadata.tdCls = 'bg-green';
            if (value == "в игре") metadata.tdCls = 'bg-gray';
            if (value == "полупроигрыш") metadata.tdCls = 'bg-red-lt';
            if (value == "полувыигрыш") metadata.tdCls = 'bg-green-lt';
            if (value == "ожидает подтверждения") metadata.tdCls = 'bg-';
            if (value == "отклонена") metadata.tdCls = 'bg-';
            if (value == "удалена в кассе") metadata.tdCls = 'bg-';
            if (value == "просрочен срок выплаты") metadata.tdCls = 'bg-';
            if (value == "выкуплена") metadata.tdCls = 'bg-violet';
            //TODO посмотреть остальные цвета
        }
        return value || "";
    },
    // * преобразование строки формата dd.mm.yyyy H:i:s в дату
    stringToDate: function (stringDate) {
        var datePart = stringDate.split(" ")[0],
            timePart = stringDate.split(" ")[1];
        if (datePart && timePart) {
            var day = datePart.split(".")[0],
                month = datePart.split(".")[1],
                year = datePart.split(".")[2],
                hour = timePart.split(":")[0],
                minute = timePart.split(":")[1],
                second = timePart.split(":")[2];
            return new Date(year, month, day, hour, minute, second);
        } else {
            return 0;
        }
    },
    ajaxRequest: function (url, params, maskText, successFn, failureFn) {
        if (!successFn)
            successFn = function () {
            }
        if (!failureFn)
            failureFn = function () {
            }
        if (!maskText)
            maskText = 'Загрузка...';
        Ext.getBody().mask(maskText);
        // * отложенный вызов функции, чтобы маска успевала поставиться
        Ext.defer(function () {
            Ext.Ajax.request({
                url: url,
                params: params,
                success: function (response) {
                    var response = Ext.decode(response.responseText),
                        message = response.message;
                    successFn(message);
                    Ext.getBody().unmask();
                },
                failure: function (response) {
                    var response = Ext.decode(response.responseText),
                        message = response.message;
                    failureFn(message);
                    Ext.getBody().unmask();
                }
            });
        }, 10, this);
    },
    storeLoad: function (store, params, maskText, successFn, failureFn) {
        if (!successFn)
            successFn = function () {
            }
        if (!failureFn)
            failureFn = function () {
            }
        if (!maskText)
            maskText = 'Загрузка...';
        Ext.getBody().mask(maskText);
        // * отложенный вызов функции, чтобы маска успевала поставиться
        Ext.defer(function () {
            store.load({
                params: params,
                callback: function (records, operation, success) {
                    if (success == true) {
                        successFn(success, records);
                    } else {
                        failureFn(success);
                    }
                    Ext.getBody().unmask();
                },
                scope: this
            });
        }, 10, this);
    },
    // * получить тип компoнента из его id
    getXtypeById: function (id) {
        // * принадлежность фильтра к типу combo, datafield... определяю через id.indexOf, т.к. через xtype не получается- фильтр не имеет xtype, его имеет только компонент
        if (id.indexOf('combo') != "-1") {
            return 'combobox';
        } else if (id.indexOf('date') != "-1") {
            return 'datefield';
        } else if (id.indexOf('text') != "-1") {
            return 'textfield';
        } else if (id.indexOf('grid') != "-1") {
            return 'grid';
        } else if (id.indexOf('panel') != "-1") {
            return 'panel';
        } else
            return 'hz';
    },
    // * аналог nvl из sql
    nvl: function (value1, value2) {
        if (value1 == null || value1 == [])
            return value2;
        return value1;
    },
    // * подсчет элементов в массиве
    count: function (array) {
        var cnt = 0;
        if (typeof array == 'object' && array && 'forEach' in array) {
            array.forEach(function (val) {
                if (val !== undefined) {
                    ++cnt;
                }
            });
        }
        return cnt;
    },

    // * поиск значения объекта в массиве объектов по ключу
    findById: function (source, id) {
        for (var i = 0; i < source.length; i++) {
            if (source[i].id === id) {
                return source[i];
            }
        }
        throw "Couldn't find object with id: " + id;
    }


})
;