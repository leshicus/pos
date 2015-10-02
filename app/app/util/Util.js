Ext.define('Office.util.Util', {
    singleton: true,
    alternateClassName: ['Util'],
    role: 0,
    dateFormatDot: 'd.m.Y H:i',
    dateFormatText: 'd F Y H:i:s',
    dateFormatHyphen: 'Y-m-d H:i:s',
    dateFormatHyphenShort: 'Y-m-d',
    pageSize: 25,
    pageSizeCombo: 10,
    extModel: 'extModel',
    ALL: "Все", // * потом перевести
    maskText: 'Загрузка...',
    arrAuthFail: Array('authorization failed', 'Access denied'),
    chatAskInterval: 20, // * секунд
    COEFF_ASK_INTERVAL: 5, // * секунд
    sessionAskInterval: 60, // * секунд
    //widthResponsive: 1560, // * ширина экрана для срабатывания responsive (разные типы меню)
    widthResponsive: 1400, // * ширина экрана для срабатывания responsive (разные типы меню)
    //dateFormat:'d.m.Y H:i:s',
    //pathJsonResult: '1' || '.result.slipstatefilter.types',
    // pathJsonResult: 'command_1.result.slipstatefilter.types',
    BET_SOURCE_ID: 3, // * источник данных: касса
    ITEMS_PER_PAGE: 50,// * число записей на странице
    AUTO_DESTROY_ON_REMOVE: false,
    BETTING_CLOSED: 'BETTING_CLOSED',
    CLOSED_OR_CHANGED_COEFFICIENTS: 'CLOSED_OR_CHANGED_COEFFICIENTS',
    COEFFICIENT_CHANGED: 'COEFFICIENT_CHANGED',
    WRONG_CASH_OR_CLUB: 'WRONG_CASH_OR_CLUB',
    ERROR_500: 'Ошибка 500',

    // * инициализация параметров класса (фильтров), которые будут в дальнейшем передаваться в запросе
    initClassParams: function (obj) {
        var scope = obj.scope,
            params = obj.params,
            vm = scope.getViewModel();

        vm.set('token', Server.getToken());

        if (params) {
            Ext.Array.each(params, function (item) {
                if (item.indexOf('.') != -1) {  // * распарсим значение вида filter.data
                    var arr = item.split('.'),
                        str;

                    Ext.Array.each(arr, function (itm, index) {
                        if (index == 0) {
                            str = itm;
                            vm.set(str, null);
                        } else {
                            str += '.' + itm;
                            vm.set(str, null);
                        }
                    });
                } else
                    vm.set(item, null);
            });
        }
    },

    getGlobalConst: function (descr) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            arrConst = vm.get('constants');

        var obj = Ext.Array.findBy(arrConst, function (item) {
            if (item['descr'] == descr)
                return true;
        });

        if (obj)
            return obj.value;
        else
            return null;
    },

    getGlobalProp: function (descr) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vm = menumain.getViewModel(),
            objConst = vm.get('globals');

        return objConst[descr];
    },

    // * создаю taskRunner- менеджер заданий для данного раздела
    createTaskRunner: function (view) {
        var vm = view.getViewModel(),
            runner = new Ext.util.TaskRunner();
        vm.set('taskRunner', runner);
    },

    // * клонировать объект  (да, объект так просто не скопировать используя '=')
    cloneObject: function (obj) {
        if (obj)
            return JSON.parse(JSON.stringify(obj));
        else
            return null;
    },

    // * проверка, есть ли в массиве дубли
    hasDuplicates: function (a) {
        var counts = [];
        for (var i = 0; i <= a.length; i++) {
            if (counts[a[i]] === undefined) {
                counts[a[i]] = 1;
            } else {
                return true;
            }
        }
        return false;
    },
    fatalError: function () {
        Util.erMes(this.ERROR_500);
    },
    blockChromeContextMenu: function (view, record, item, index, e) {
        if (view.getSelectionModel().getCurrentPosition()) { // * бывает и не определено иногда
            e.stopEvent(); // * чтобы не показывалось стандартное меню Хрома
        }
    },

    // * объект в строку, разделенную separator
    /*objToString: function (obj, separator, ndeep) {
     console.info(this.objToString);
     // * http://stackoverflow.com/questions/5612787/converting-an-object-to-a-string
     separator = separator || ' ';
     if (obj == null) {
     return String(obj);
     }
     switch (typeof obj) {
     case "string":
     return obj;
     case "function":
     return obj.name || obj.toString();
     case "object":
     return Object.keys(obj).map(function (key) {
     return this.objToString(obj[key], (ndeep || 1) + 1);
     }).join(separator);
     default:
     return obj.toString();
     }
     },*/

    // * поиск свойства объекта по номеру
    getObjectItemByNum: function (object, num) {
        var cnt = 0;
        for (prop in object) {
            if (!object.hasOwnProperty(prop)) continue;
            if (cnt == num)
                return object[prop];
            cnt++;
        }
        return null;
    },

    // * добавляет ведущий 0, до десятых, если нужно
    leadZero: function (val) {
        val = (val < 10) ? '0' + val : val;
        return val;
    },

    // * экстракция из строки html значение и атрибут coefName заданного тэга target
    textFromHTMLString: function (html, target, coefName) {
        if (!html || !target) {
            return false;
        }
        else {
            var fragment = document.createDocumentFragment(),
                container = document.createElement('div');
            container.innerHTML = html;
            fragment.appendChild(container);
            var targets = fragment.firstChild.getElementsByTagName(target),
                result = [];
            // * тэгов может быть несколько, поэтому targets- массив
            for (var i = 0, len = targets.length; i < len; i++) {
                var name = targets[i].getAttribute(coefName),
                    o = {
                        coefName: name,
                        coefVal: targets[i].textContent || targets[i].innerText
                    };
                result.push(o);
            }
            return result;
        }
    },
// * экстракция из строки определенного тэга всех dataset
    getDataset: function (html, target, coefName) {
        if (!html || !target) {
            return false;
        }
        else {
            var fragment = document.createDocumentFragment(),
                container = document.createElement('div');
            container.innerHTML = html;
            fragment.appendChild(container);
            var targets = fragment.firstChild.getElementsByTagName(target),
                result = {};

            for (var i = 0, len = targets.length; i < len; i++) {
                if (Ext.Object.getSize(targets[i].dataset)) {
                    Ext.Object.merge(result, targets[i].dataset);
                }
            }

            return result;
        }
    },
    // * сортирова массива с преобразованием в int
    sortedIntArray: function (marketsGroups) {
        return Ext.Array.sort(marketsGroups, function (a, b) {
            if (parseInt(a) < parseInt(b))
                return -1;
            if (parseInt(a) > parseInt(b))
                return 1;
            return 0;
        });
    },


    // function to create an XMLHttpClient in a cross-browser manner
    createXMLHTTPRequest: function () {
        var xmlhttp;

        try {
            // Mozilla / Safari / IE7
            xmlhttp = new XMLHttpRequest();
        } catch (e) {
            // IE
            var XMLHTTP_IDS = new Array('MSXML2.XMLHTTP.5.0',
                'MSXML2.XMLHTTP.4.0',
                'MSXML2.XMLHTTP.3.0',
                'MSXML2.XMLHTTP',
                'Microsoft.XMLHTTP');
            var success = false;
            for (var i = 0; i < XMLHTTP_IDS.length && !success; i++) {
                try {
                    xmlhttp = new ActiveXObject(XMLHTTP_IDS[i]);
                    success = true;
                } catch (e) {
                }
            }
            if (!success) {
                throw new Error('Unable to create XMLHttpRequest.');
            }
        }

        return xmlhttp;
    },

    // * загрузка файла и применение к нему функции
    loadFile: function (src, ondone) {
        var client = this.createXMLHTTPRequest();
        client.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var txt = this.responseText;
                ondone(txt);
            }
        };
        client.open('GET', src);
        client.send();
    },

    colorText: function (color, text) {
        //return '<b><font color="'+color+'">' + text + '</font></b>';
        return '<font color="' + color + '">' + text + '</font>';
    },

    sizeText: function (size, text) {
        //return '<b><font color="'+color+'">' + text + '</font></b>';
        return '<font size="' + size + '">' + text + '</font>';
    },

    toast: function (title, msg) {
        Ext.toast({
            html: msg,
            title: title,
            autoCloseDelay: 4000,
            slideInDuration: 500,
            width: 300,
            align: 't'
        });
    },

    warnMes: function (msg) {
        Ext.toast({
            html: msg,
            glyph: Glyphs.get('warning'),
            title: 'Предупреждение',
            titleAlign: 'center',
            autoCloseDelay: 4000,
            slideInDuration: 500,
            width: 300,
            align: 't'
        });
    },

    erMes: function (msg, fn) {
        Ext.Msg.alert({
            title: 'Ошибка',
            msg: msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR,
            fn: fn
        });
    },
    okMes: function (msg) {
        Ext.MessageBox.show({
            title: 'Успех',
            msg: msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO
        });
    },
    infoMes: function (msg) {
        Ext.MessageBox.show({
            title: 'Внимание',
            msg: msg,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.INFO
        });
    },

    //// * сделать заполненные поля не редактируемыми
    //setNotEditable: function (form) {
    //    var objFields = form.getForm().getValues(),
    //        field = '',
    //        editableResidentFlag = false; // * признак, давать ли редактировать признак Резидент
    //    Ext.Object.each(objFields, function (key, val) {
    //        var id = '#' + key;
    //        field = form.down(id);
    //        if (field && val && key != 'barcode') {
    //            field.setReadOnly(true);
    //
    //            if (key == 'address') {
    //                // * скрыть кнопку КЛАДР
    //                var buttonKladr = form.down('#buttonKladr');
    //                buttonKladr.disable();
    //            }
    //        } else {
    //            if (key != 'barcode')
    //                editableResidentFlag = true;
    //            field.setReadOnly(false);
    //        }
    //        // * признак Резидент нужно давать редактировать, если есть хоть одно другое редактируемое поле
    //        if (editableResidentFlag) {
    //            form.down('#is_resident').setReadOnly(false);
    //        }
    //
    //        field.suspendEvent('specialkey');
    //    });
    //},

    // * скрыть/раскрыть дерево
    treeCollapse: function (button, e, tree) {
        if (tree) {
            if (tree._collapsed) {
                tree.getEl().mask('Раскрываем...');
                Ext.defer(function () {
                    tree.expandAll(function () {
                            tree.getEl().unmask();
                            tree._collapsed = false;
                        },
                        this
                    );
                }, 10, this);
            } else {
                tree.getEl().mask('Скрываем...');
                Ext.defer(function () {
                    tree.collapseAll(function () {
                            tree.getEl().unmask();
                            tree._collapsed = true;
                        },
                        this
                    );
                }, 10, this);
            }
        }

    },
    getButtonsSaveCancel: function (param) {
        var param = param || {};
        return [
            {
                text: param.textSave || 'Сохранить',
                action: 'save',
                glyph: Glyphs.get('save'),
                scale: 'medium',
                scope: param.scope || this,
                handler: 'onClickSave' // * эту функцию нужно определять в конкретном контроллере
            },
            '->',
            {
                text: param.textCancel || 'Отмена',
                action: 'cancel',
                glyph: Glyphs.get('cancel'),
                scale: 'medium',
                scope: param.scope || this,
                handler: 'onClickCancel' // * эту функцию нужно определять в конкретном контроллере
            }

        ];
    },
    getButtonCancel: function (param) {
        var param = param || {};
        return [
            {
                text: param.textCancel || 'Отмена',
                action: 'cancel',
                glyph: Glyphs.get('cancel'),
                scale: 'medium',
                scope: param.scope || this,
                handler: 'onClickCancel' // * эту функцию нужно определять в конкретном контроллере
            }

        ];
    },
    // * нажатие Ок кнопки по нажатие ENTER
    pressOkButton: function (field) {
        var window = field.up('window'),
            buttonSave = window.down('button[action=save]');
        if (buttonSave) {
            buttonSave.getEl().dom.click();
        }
    },

    comboRender: function (combo) {
        return function (value) {
            var record = combo.findRecord(combo.valueField || combo.displayField, value);
            return record ? record.get(combo.displayField) : combo.valueNotFoundText;
        }
    },
    // * цвет поля 1 места в гриде крыс
    //renderRat: function (value, metaData, record, rowIndex, colIndex, store, view) {
    //    metaData.tdCls = record.get("firstcolor");
    //    /*      metaData.style += 'border-top-left-radius: 4px;' +
    //     'border-top-right-radius: 4px;' +
    //     'border-bottom-right-radius: 4px;' +
    //     'border-bottom-left-radius: 4px;"};';*/
    //    return value;
    //},
    // * цвет ячеек таблицы Принятые
    renderResult: function (value, metadata) {
        if (value) {
            if (value == "проигрыш") metadata.tdCls = 'bg-red';
            if (value == "возвращенная") metadata.tdCls = 'bg-purple';
            if (value == "фикс.возврат") metadata.tdCls = 'bg-purple-lt';
            if (value == "выигрыш") metadata.tdCls = 'bg-green';
            if (value == "в игре") metadata.tdCls = 'bg-gray';
            if (value == "полупроигрыш") metadata.tdCls = 'bg-red-lt';
            if (value == "полувыигрыш") metadata.tdCls = 'bg-green-lt';
            if (value == "ожидает подтверждения") metadata.tdCls = 'bg-';
            if (value == "отклонена") metadata.tdCls = 'bg-';
            if (value == "удалена в кассе") metadata.tdCls = 'bg-';
            if (value == "просрочен срок выплаты") metadata.tdCls = 'bg-';
            if (value == "выкуплена") metadata.tdCls = 'bg-violet';
            if (value == "возврат") metadata.tdCls = 'bg-violet-dark';
            //TODO посмотреть остальные цвета
        }
        return value || "";
    },

    // * факториал
    factorial: function (num) {
        if (num === 0) {
            return 1;
        }
        else {
            return num * Util.factorial(num - 1);
        }
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

    // * yyyy-mm-dd
    stringToDateHyphen: function (stringDate) {
        var datePart = stringDate;
        if (datePart) {
            var year = datePart.split("-")[0],
                month = datePart.split("-")[1],
                day = datePart.split("-")[2];
            return new Date(year, month - 1, day);
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
        maskText = maskText || this.maskText;
        Ext.getBody().mask(maskText);
        // * отложенный вызов функции, чтобы маска успевала поставиться
        Ext.defer(function () {
            Ext.Ajax.request({
                url: url,
                params: params,
                success: function (response) {
                    Ext.getBody().unmask();
                    var response = Ext.decode(response.responseText),
                        message = response.message;
                    successFn(message);
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var response = Ext.decode(response.responseText),
                        message = response.message;
                    failureFn(message);
                }
            });
        }, 10, this);
    },

    storeLoad: function (store, params, maskText, successFn, failureFn, component, scope) {
        if (!successFn)
            successFn = function () {
            };
        if (!failureFn)
            failureFn = function () {
            };
        //maskText = maskText || 'Загрузка...';
        //if (!component)
        //    component = Ext.getBody();
        //if (component) {
        //    component.mask(maskText);
        //}
        // * отложенный вызов функции, чтобы маска успевала поставиться
        Ext.defer(function () {
            store.load({
                params: params,
                callback: function (records, operation, success) {
                    if (component) {
                        component.unmask();
                    }
                    if (success == true) {
                        successFn(store, records, operation, success);
                    } else {
                        failureFn(store, records, operation, success);
                    }
                },
                scope: scope || this
            });
            /*} catch (e) {
             //component.unmask();
             console.info('Ошибка запроса к серверу');
             Util.toast('Ошибка', 'Ошибка запроса к серверу');
             } finally {
             component.unmask();
             }*/
        }, 10, this);
        //Ext.defer(function () {
        //    console.info(component);
        //    if (component != null && component.isMasked)
        //        component.unmask();
        //}, 30000);
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
// * преобразование даты в удобочитаемый формат
    reverseDate: function (x) {
        return ((x < 10 ? '0' : '') + x)
    },

    // * поиск значения объекта в массиве объектов по ключу
    findById: function (source, id) {
        for (var i = 0; i < source.length; i++) {
            if (source[i].id === id) {
                return source[i];
            }
        }
        throw "Couldn't find object with id: " + id;
    },
    findByKey: function (source, key, id) {
        for (var i = 0; i < source.length; i++) {
            if (source[i][key] === id) {
                return source[i];
            }
        }
        throw "Couldn't find object with id: " + id;
    },
    // * не точный поиск внутри свойств объекта по ключу
    findByKeyLike: function (source, key) {
        var out = 0;
        // * key может быть массивом
        if (this.is_array(key)) {
            Ext.Array.each(key, function (k) {
                Ext.Array.each(Ext.Object.getKeys(source), function (itemKey) {
                    var str1 = "\"" + itemKey + "\"",
                        str2 = "\"" + k + "\"";
                    if (str1.indexOf(str2) > -1) {
                        out = source[itemKey];
                        return false;
                    }
                });
            });
        } else {
            Ext.Array.each(Ext.Object.getKeys(source), function (itemKey) {
                var str1 = "\"" + itemKey + "\"",
                    str2 = "\"" + key + "\"";
                if (str1.indexOf(str2) > -1) {
                    out = source[itemKey];
                    return false;
                }
            });
        }

        return out;
        //throw "Couldn't find object with key: " + key;
    },

    // * раскрывает/скрывает полное содержимое ячейки грида, если оно не помещается. Можно по двойному нажатию на ячейку.
    cellWrap: function (td) {
        var wrapString = 'style="text-align:left; white-space:normal;"',
            noWrapString = 'style="text-align:left;"';
        if (td.innerHTML.indexOf(wrapString) > -1) {
            td.innerHTML = td.innerHTML.replace(wrapString, noWrapString);
        } else {
            td.innerHTML = td.innerHTML.replace(noWrapString, wrapString);
        }
    },
    // * проверка, что элемент присутствует в массиве
    in_array: function (str, arr, strict) {	// Checks if a value exists in an array
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        var found = false, key, strict = !!strict;

        for (key in arr) {
            if ((strict && arr[key] === str) || (!strict && arr[key] == str)) {
                found = true;
                break;
            }
        }
        return found;
    },
    // * не стргий поиск в массиве, сравнение типа sql оператора like (indexOf)
    in_array_like: function (str, arr, strict) {	// Checks if a value exists in an array
        // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        var found = false, key, strict = !!strict;

        for (key in arr) {
            if ((strict && arr[key] === str) || (!strict && arr[key].indexOf(str) > -1)) {
                found = true;
                break;
            }
        }
        return found;
    },
    // * проверка, что элемент является массивом
    is_array: function (someVar) {
        if (Object.prototype.toString.call(someVar) === '[object Array]') {
            return true;
        }
    },

    // * удаление из массива определенного элемента
    //arrayRemove: function () {
    //    var array = [2, 5, 9];
    //    var index = array.indexOf(5);
    //    if (index > -1) {
    //        array.splice(index, 1);
    //    }
    //},
    // * подсчет итога по заданному полю стора
    getSummary: function (store, field) {
        var sum = 0;
        store.each(function (item) {
            if (item.get(field))
                sum += parseInt(item.get(field));
        });
        return sum || 0;
    },

    utf8_encode: function (s) {	// Encodes an ISO-8859-1 string to UTF-8
        return unescape(encodeURIComponent(s));
    },

    decode_utf8: function (s) {
        return decodeURIComponent(escape(s));
    },

    // * расчет хэша строки
    sha1: function (str) {	// Calculate the sha1 hash of a string
        //
        // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
        // + namespaced by: Michael White (http://crestidg.com)

        var rotate_left = function (n, s) {
            var t4 = ( n << s ) | (n >>> (32 - s));
            return t4;
        };

        var lsb_hex = function (val) {
            var str = "";
            var i;
            var vh;
            var vl;

            for (i = 0; i <= 6; i += 2) {
                vh = (val >>> (i * 4 + 4)) & 0x0f;
                vl = (val >>> (i * 4)) & 0x0f;
                str += vh.toString(16) + vl.toString(16);
            }
            return str;
        };

        var cvt_hex = function (val) {
            var str = "";
            var i;
            var v;

            for (i = 7; i >= 0; i--) {
                v = (val >>> (i * 4)) & 0x0f;
                str += v.toString(16);
            }
            return str;
        };

        var blockstart;
        var i, j;
        var W = new Array(80);
        var H0 = 0x67452301;
        var H1 = 0xEFCDAB89;
        var H2 = 0x98BADCFE;
        var H3 = 0x10325476;
        var H4 = 0xC3D2E1F0;
        var A, B, C, D, E;
        var temp;

        str = this.utf8_encode(str);
        var str_len = str.length;

        var word_array = new Array();
        for (i = 0; i < str_len - 3; i += 4) {
            j = str.charCodeAt(i) << 24 | str.charCodeAt(i + 1) << 16 |
            str.charCodeAt(i + 2) << 8 | str.charCodeAt(i + 3);
            word_array.push(j);
        }

        switch (str_len % 4) {
            case 0:
                i = 0x080000000;
                break;
            case 1:
                i = str.charCodeAt(str_len - 1) << 24 | 0x0800000;
                break;
            case 2:
                i = str.charCodeAt(str_len - 2) << 24 | str.charCodeAt(str_len - 1) << 16 | 0x08000;
                break;
            case 3:
                i = str.charCodeAt(str_len - 3) << 24 | str.charCodeAt(str_len - 2) << 16 | str.charCodeAt(str_len - 1) << 8 | 0x80;
                break;
        }

        word_array.push(i);

        while ((word_array.length % 16) != 14) word_array.push(0);

        word_array.push(str_len >>> 29);
        word_array.push((str_len << 3) & 0x0ffffffff);

        for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {
            for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
            for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

            A = H0;
            B = H1;
            C = H2;
            D = H3;
            E = H4;

            for (i = 0; i <= 19; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 20; i <= 39; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 40; i <= 59; i++) {
                temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            for (i = 60; i <= 79; i++) {
                temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotate_left(B, 30);
                B = A;
                A = temp;
            }

            H0 = (H0 + A) & 0x0ffffffff;
            H1 = (H1 + B) & 0x0ffffffff;
            H2 = (H2 + C) & 0x0ffffffff;
            H3 = (H3 + D) & 0x0ffffffff;
            H4 = (H4 + E) & 0x0ffffffff;
        }

        var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);
        return temp.toLowerCase();
    },
    // * прервать выполнение скрипта
    exit: function (status) {
        // http://kevin.vanzonneveld.net
        // +   original by: Brett Zamir (http://brettz9.blogspot.com)
        // +      input by: Paul
        // +   bugfixed by: Hyam Singer (http://www.impact-computing.com/)
        // +   improved by: Philip Peterson
        // +   bugfixed by: Brett Zamir (http://brettz9.blogspot.com)
        // %        note 1: Should be considered expirimental. Please comment on this function.
        // *     example 1: exit();
        // *     returns 1: null

        var i;

        if (typeof status === 'string') {
            alert(status);
        }

        window.addEventListener('error', function (e) {
            e.preventDefault();
            e.stopPropagation();
        }, false);

        var handlers = [
            'copy', 'cut', 'paste',
            'beforeunload', 'blur', 'change', 'click', 'contextmenu', 'dblclick', 'focus', 'keydown', 'keypress', 'keyup', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'resize', 'scroll',
            'DOMNodeInserted', 'DOMNodeRemoved', 'DOMNodeRemovedFromDocument', 'DOMNodeInsertedIntoDocument', 'DOMAttrModified', 'DOMCharacterDataModified', 'DOMElementNameChanged', 'DOMAttributeNameChanged', 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'online', 'offline', 'textInput',
            'abort', 'close', 'dragdrop', 'load', 'paint', 'reset', 'select', 'submit', 'unload'
        ];

        function stopPropagation(e) {
            e.stopPropagation();
            // e.preventDefault(); // Stop for the form controls, etc., too?
        }

        for (i = 0; i < handlers.length; i++) {
            window.addEventListener(handlers[i], function (e) {
                stopPropagation(e);
            }, true);
        }

        if (window.stop) {
            window.stop();
        }

        throw '';
    }


});