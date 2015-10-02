Ext.define('Office.view.fill.coeff.TemplatesHtml', {
    singleton: true,
    alternateClassName: ['TemplatesHtml'],
    extend: 'Office.view.fill.coeff.TemplateProtoClass',

    mainLineCoef: [
        'coeff_FT_1',
        'coeff_FT_X',
        'coeff_FT_2',
        'coeff_CW_P1', // * для тенниса 1
        'coeff_CW_P2',
        'coeff_DCFT_1X',
        'coeff_DCFT_12',
        'coeff_DCFT_X2',
        'coeff_ODDS_FT_0ODDS_H',
        'coeff_ODDS_FT_0ODDS_A',
        'coeff_ODDS_FT_0ODDS',
        'coeff_FT_TL',
        'coeff_FT_TG',
        'coeff_FT_T'
    ],

    getMainLine: function () {
        return this.mainLineCoef;
    },

    // * высчитывает ширину колонки в зависимости от передаваемого текста
    getColW: function (txt) {
        if (txt)
            return txt.length * 7;
        else
            return 50;
    },

    rendererBetInBasketToolbar: function (val, metadata, rec, rI, cI) {
        if (val) {
            var fill = Ext.ComponentQuery.query('#main')[0],
                vmFill = fill.getViewModel(),
                storeBasket = vmFill.getStore('basket'),
                arrSpan = Util.textFromHTMLString(val, 'span', 'data-coefid'),
                objSpan = {};
            if (arrSpan.length == 1) {
                objSpan.arrCoef = arrSpan[0].coefName;
                objSpan.arrBasis = "";
            } else if (arrSpan.length == 2) {
                objSpan.arrCoef = arrSpan[1].coefName;
                objSpan.arrBasis = arrSpan[0].coefVal;
            }
            if (Ext.Object.getSize(objSpan)) {
                if (objSpan.arrCoef)
                    var arrCoef = JSON.parse("[" + objSpan.arrCoef.split(',').map(function (item) {
                        return JSON.stringify(item);
                    }) + "]");
                if (objSpan.arrBasis) {
                    arrBasis = JSON.parse("[" + objSpan.arrBasis.split(',').map(function (item) {
                        return JSON.stringify(item);
                    }) + "]");
                }
                /*else {
                 arrBasis.push('');
                 }*/
                storeBasket.each(function (item) {
                    if (item.get('arrCoef')[0] == arrCoef[0])
                        metadata.tdCls = 'bg-in-basket';
                });
            }
        }
        return val;
    },

    onItemSelect: function (view, record, item, index, e, eOpts) {
        if (view) {
            var dataIndex = view.getSelectionModel().getCurrentPosition().columnHeader.dataIndex,
                span = record.getData()[dataIndex],
                objSpan = Util.getDataset(span, 'span'),
                coefId = objSpan.coefid,
                activeTabIndexEvent = BasketF.getActiveTabIndexEvent(),
                gridEvent = Ext.ComponentQuery.query('grideventlive')[activeTabIndexEvent] /*|| Ext.ComponentQuery.query('grideventrats')[0]*/,
                selected = gridEvent.selection;
            MarketsHtml.addToBasket(coefId, '', selected);
        }
    },

    // * itemcontextmenu
    onContextMenuClick: function (span, evt) {
        // Блокируем всплывание события contextmenu
        evt = evt || window.event;
        evt.cancelBubble = true;

        // * определяем положение курсора мыши в момент нажатия правой кнопки
        function defPosition(event) {
            var x = y = 0;
            if (document.attachEvent != null) { // Internet Explorer & Opera
                x = window.event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
                y = window.event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
            } else if (!document.attachEvent && document.addEventListener) { // Gecko
                x = event.clientX + window.scrollX;
                y = event.clientY + window.scrollY;
            } else {
                // Do nothing
            }
            return {x: x, y: y};
        }

        var menu = Ext.create('Office.view.fill.contextmenu.MenuGridCoeffV', {
            viewModel: {
                data: {
                    span: span
                }
            }
        });

        var y = defPosition(evt).y,
            x = defPosition(evt).x;
        menu.showAt([x, y]);

        return false;
    },

    // * добавление коэф главной линии в тулбар
    addGridOnToolbar: function (panel, arrTitle, arrTitleGrid, data) {
        if (arrTitle.length && data.length && arrTitleGrid.length) {
            var storeMainLine = new Ext.data.Store({
                    fields: arrTitle
                }),
                gridMainLine = new Ext.grid.Panel({
                    columnLines: true,
                    store: storeMainLine,
                    selModel: {
                        allowDeselect: true,
                        type: 'cellmodel'
                    },
                    flex: 1,
                    cls: 'grid-main-line',
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            //flex: 1
                            width: 45,
                            renderer: this.rendererBetInBasketToolbar // * если здесь ошибка, то пишет Xtemplate each of null
                        },
                        items: arrTitleGrid
                    },
                    listeners: {
                        itemcontextmenu: this.onItemCM,
                        //itemcontextmenu: this.onItemCM,
                        itemclick: this.onItemSelect
                    }
                });
            storeMainLine.loadData(data);
            if (data.length)
                panel.add(gridMainLine);
        }
    },

    addGridOnPanel: function (panel, arrTitle, arrTitleGrid, data, title, hideHeaders) {
        //console.info(arguments);
        if (arrTitle.length && data.length && arrTitleGrid.length) {
            var grid = new Ext.Component({
                data: {
                    data: data,
                    title: title,
                    arrTitleGrid: arrTitleGrid,
                    hideHeaders: hideHeaders
                },
                tpl: new Ext.XTemplate(
                    '<table width="100%" class="market-table" >',

                    '<tr class="market-table-title">',// * заголовок: Проход, Хозяева...
                    '<td align="left" colspan="' + '{arrTitleGrid.length}' + '"><span class="market-table-title-span">' + '{title}' + '</span></td>',
                    '</tr>',

                    '<tpl if="hideHeaders == undefined">',// * название колонки: Да, Нет...
                    //'{[this.getDataIndex(xkey,parent,values,values.hideHeaders)]}',
                    '<tr class="market-table-columnname">',
                    '<tpl for="arrTitleGrid">',
                    '<td align="center" class="market-table-td">' + '{[values.text]}' + '</td>',
                    '</tpl>',
                    '</tr>',
                    '</tpl>',

                    '<tpl for="data">',// * перебор строк внутри блока
                    '<tr class="market-table-tr">',
                    '<tpl exec="values.parent = parent;"></tpl>',// * чтобы можно было обращаться в родительский scope
                    '<tpl foreach=".">',// * перебор свойств: YES, NO...
                    '<tpl if="xkey != \'parent\'">',// * не печатать служебное поле parent (scope вышестоящего tpl)
                    '<td align="left" class="' + '{[this.getClass(values)]}' + '"  onmouseover="bgColor=\'#e2eff8\'" onmouseout="bgColor=\'white\'" oncontextmenu="return OfficeGlobalNS.config.coefContextMenuClick(this,event);" onClick="OfficeGlobalNS.config.addToBasket(this);">' + '{[parent[xkey]]}' + '</td>',// * data[i][YES], data[i][NO]
                    '</tpl>',
                    '</tpl>',
                    '</tr>',
                    '</tpl>',

                    '</table>',
                    {
                        // * если ставка уже в купоне, то пометить ее желтым
                        getClass: function (span) {
                            var objSpan = Util.getDataset(span, 'span'),
                                coefId = objSpan.coefid,
                                className = 'market-table-td';
                            if (coefId) {
                                var fill = Ext.ComponentQuery.query('#main')[0],
                                    vmFill = fill.getViewModel(),
                                    storeBasket = vmFill.getStore('basket');
                                if (objSpan && Ext.Object.getSize(objSpan)) {
                                    if (storeBasket)
                                        storeBasket.each(function (item) {
                                            if (item.get('arrCoef')[0] == objSpan.coefid)
                                                className = 'market-table-td-in-basket';
                                        });
                                }
                            }
                            return className;
                        }
                    }
                )
            });

            if (data.length)
                panel.add(grid);
        }
    },

    // * Экспресс дня
    addGridDayExpress: function (panel, arrTitle, arrTitleGrid, data, title, hideHeaders, width) {
        // * не будем показывать заголовки ячеек для 2-ого и последующих гридов
        if (arrTitle.length && data.length && arrTitleGrid.length) {
            var arrGrids = panel.query('gridpanel'); // * уже добавленные линии
            if (arrGrids && arrTitle.length) {
                var fill = Ext.ComponentQuery.query('#main')[0],
                    vmFill = fill.getViewModel(),
                    storeBasket = vmFill.getStore('basket');

                // * укажем заголовок центральной области кэфов (20 авг, Пятерочка)
                if (!hideHeaders) {
                    vmFill.set('title', title);
                }

                var grid = new Ext.Component({
                    data: {
                        data: data,
                        title: title,
                        arrTitleGrid: arrTitleGrid,
                        hideHeaders: hideHeaders,
                        width: width
                    },
                    tpl: new Ext.XTemplate(
                        '<table width="100%" class="market-table-dc" >',

                        '<tpl if="hideHeaders == 0">',// * название колонки: Да, Нет...
                        '<tr class="market-table-columnname">',
                        '<tpl for="arrTitleGrid">',
                        '<td align="center" class="market-table-td">' + '{[values.text]}' + '</td>',
                        '</tpl>',
                        '</tr>',
                        '</tpl>',

                        '<tpl for="data">',// * перебор строк внутри блока
                        '<tr class="market-table-tr">',
                        '<tpl exec="values.parent = parent;"></tpl>',// * чтобы можно было обращаться в родительский scope
                        '<tpl foreach=".">',// * перебор свойств: YES, NO...
                        '<tpl if="xkey != \'parent\'">',// * не печатать служебное поле parent (scope вышестоящего tpl)
                        '<td align="left" width=' + '{[this.getWidth(xkey,parent)]}' + ' class="' + '{[this.getClass(values)]}' + '" onmouseover="bgColor=\'#e2eff8\'" onmouseout="bgColor=\'white\'" oncontextmenu="return OfficeGlobalNS.config.coefContextMenuClick(this,event);" onClick="OfficeGlobalNS.config.addToBasket(this);">' + '{[parent[xkey]]}' + '</td>',// * data[i][YES], data[i][NO]
                        '</tpl>',
                        '</tpl>',
                        '</tr>',
                        '</tpl>',

                        '</table>',
                        {
                            // * если ставка уже в купоне, то пометить ее желтым
                            getClass: function (span) {
                                var objSpan = Util.getDataset(span, 'span'),
                                    coefId = objSpan.coefid,
                                    className = 'market-table-td';
                                if (coefId) {
                                    if (objSpan && Ext.Object.getSize(objSpan)) {
                                        if (storeBasket)
                                            storeBasket.each(function (item) {
                                                if (item.get('arrCoef')[0] == objSpan.coefid)
                                                    className = 'market-table-td-in-basket';
                                            });
                                    }
                                }
                                return className;
                            },
                            // * ширина td
                            getWidth: function (xkey, parent) {
                                var arrWidth = parent.parent.width;
                                return arrWidth[xkey];
                            }
                        }
                    )
                });
            }
            if (data.length)
                panel.add(grid);
        }
    },

    // * раскраска кэфа если он изменился
    //colorizeDiffCoeff: function (arrBasis, arrCoef) {
    //    if (arrBasis) { // * есть надпись для кэфа (типа 0-1, гости (победа), базис)
    //        var basis = typeof arrBasis == 'object' ? arrBasis[4] : arrBasis; // * если массив, то берем 4-й элемент, если строка, то ее и показываем
    //        if (arrCoef[2] < arrCoef[3]) {
    //            return '<span role="button" style="max-width: 90%;text-align: left;font-weight: 100;">' + basis + '</span><span role="button" style="float: right;font-weight: 600;color: red;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '">' + arrCoef[2] + '</span>';
    //        }
    //        if (arrCoef[2] > arrCoef[3]) {
    //            return '<span role="button" style="max-width: 90%;text-align: left;font-weight: 100;">' + basis + '</span><span role="button" style="float: right;font-weight: 600;color: green;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '">' + arrCoef[2] + '</span>';
    //        }
    //        if (arrCoef[2] == arrCoef[3]) {
    //            return '<span role="button" style="max-width: 90%;text-align: left;font-weight: 100;">' + basis + '</span><span role="button" style="float: right;font-weight: 600;color: #000000;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '">' + arrCoef[2] + '</span>';
    //        }
    //    } else { // * просто кэф
    //        if (arrCoef[2] < arrCoef[3]) {
    //            return '<span role="button" style="font-weight: 600;color: red;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '">' + arrCoef[2] + '</span>';
    //        }
    //        if (arrCoef[2] > arrCoef[3]) {
    //            return '<span role="button" style="font-weight: 600;color: green;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '">' + arrCoef[2] + '</span>';
    //        }
    //        if (arrCoef[2] == arrCoef[3]) {
    //            return '<span role="button" style="font-weight: 600;color: blue;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '">' + arrCoef[2] + '</span>';
    //        }
    //    }
    //},
    // * кэф справа, а базис слева
    //spanCoeff: function (arrBasis, arrCoef) {
    //    if (arrCoef[3]) { // * изменившееся значение кэфа
    //        return this.colorizeDiffCoeff(arrBasis, arrCoef);
    //    } else { // * кэф не изменился
    //        var basis = typeof arrBasis == 'object' ? arrBasis[4].toString() : arrBasis; // * если массив, то берем 4-й элемент, если строка, то ее и показываем
    //        return '<span role="button" style="max-width: 90%;text-align: left;font-weight: 100;">' + basis + '</span><span role="button" style="float: right; font-weight: 600;" data-coefid="' + arrCoef[0] + '">' + arrCoef[2] + '</span>';
    //    }
    //},
    //spanCoeffRight: function (arrCoef) {
    //    return '<span role="button" style="font-weight: 600;display: flex; justify-content: flex-end;" data-coefid="' + arrCoef[0] + '">' + arrCoef[2] + '</span>';
    //},
    //// * кэф по-центру
    //spanOnlyCoeff: function (basis, arrCoef) {
    //    if (arrCoef[3]) { // * изменившееся значение кэфа
    //        return this.colorizeDiffCoeff(basis, arrCoef);
    //    } else { // * кэф не изменился
    //        return '<span role="button" style="font-weight: 600;display: flex; justify-content: center;" data-coefid="' + arrCoef[0] + '">' + arrCoef[2] + '</span>';
    //    }
    //},
    // * замена {H},{A} на названия команд
    replaceHA: function (txt, record) {
        if (txt.indexOf('{H}') > -1) {
            var reg = new RegExp('{H}', 'gm');
            txt = txt.replace(reg, record.get('home'));
        }
        if (txt.indexOf('{A}') > -1) {
            var reg = new RegExp('{A}', 'gm');
            txt = txt.replace(reg, record.get('away'));
        }
        return txt;
    },
    // * замена {H},{A} на Хозяева/Гости
    replaceHAImp: function (txt, record) {
        if (txt.indexOf('{H}') > -1) {
            var reg = new RegExp('{H}', 'gm');
            txt = txt.replace(reg, 'Хозяева');
        }
        if (txt.indexOf('{A}') > -1) {
            var reg = new RegExp('{A}', 'gm');
            txt = txt.replace(reg, 'Гости');
        }
        return txt;
    },
    //setActiveSign: function (obj, markets, marketsGroups, record) {
    //    var sportSlug = UtilMarkets.getSportSlug(record);
    //    Ext.Object.each(obj, function (key, val) {
    //        //console.info(key, val);
    //        if (val[2] != 0) {
    //            Ext.Array.each(markets, function (item, idx) {
    //                if ((Util.in_array_like(key, item.dependencies, false)
    //                    && (Util.in_array(sportSlug, item.sports, false) || !item.sports))
    //                    || Util.in_array_like(key, item.odd, false)) { // * не только в dependencies смотрим, но и в блоке odd
    //                    item['active'] = 1;
    //                    if (!Util.in_array(item.group_id, marketsGroups, false))
    //                        marketsGroups.push(item.group_id);
    //                }
    //            }, this);
    //        }
    //
    //    }, this);
    //    return marketsGroups;
    //},

    // * в массиве объектов menumain::markets проставим признак active:1 если есть не нулевые кф, которые к нему относятся
    setActiveSign: function (obj, markets, marketsGroups, record) {// * obj -это cs+cse
        var sportSlug = UtilMarkets.getSportSlug(record),
            arrCoef = Ext.Object.getKeys(obj);

        Ext.Array.each(markets, function (item, idx) {
            var arrDepend = item.dependencies || [],
                arrOdd = item.odd || [],
                arrInterDep = Ext.Array.intersect(arrDepend, arrCoef),
                arrInterOdd = Ext.Array.intersect(arrOdd, arrCoef);
            if ((arrInterDep.length || arrInterOdd.length)
                && (Util.in_array(sportSlug, item.sports, false) || !item.sports)) { // * не только в dependencies смотрим, но и в блоке odd

                item['active'] = 1;

                // * сформируем группы для меню (Основные, Форы...)
                if (!Util.in_array(item.group_id, marketsGroups, false))
                    marketsGroups.push(item.group_id);
            }
        }, this);
        return marketsGroups;
    },


    templateMainLine: function (obj, item, record, panel) {
        var data = [{}],
            arrTitle = [],
            arrTitleGrid = [];

        // * перебираем columns в шаблоне
        Ext.Array.each(item.columns, function (column) {
            var arrCoef = Util.findByKeyLike(obj, column.name);

            if (arrCoef && arrCoef[2]) {
                var header = column.title,
                    basisFormatted = 0,
                    objColumn = {
                        text: header,
                        dataIndex: header,
                        minWidth: 55
                    };

                // * добавим заголовки таблиц
                arrTitle.push(header);

                // * если есть базис, то нужно его написать (для фор и тоталов)
                if (column.base) {
                    var arrBasis = Util.findByKeyLike(obj, column.base),
                        basis = arrBasis[2];

                    if (arrBasis) {
                        if (column.name == "coeff_ODDS_FT_0ODDS_H") {
                            if (basis) {
                                basisFormatted = basis.toString().indexOf("-") == -1 ? ("+" + basis) : (basis);
                            } else {
                                basisFormatted = basis;
                            }
                            basisFormatted = '(' + basisFormatted + ')';
                        }

                        if (column.name == "coeff_ODDS_FT_0ODDS_A") {
                            if (basis) {
                                basisFormatted = basis.toString().indexOf("-") == -1 ? ("-" + basis) : ((basis.toString()).replace("-", "+"));
                            } else {
                                basisFormatted = basis;
                            }
                            basisFormatted = '(' + basisFormatted + ')';
                        }

                        if (column.base == "coeff_FT_T") {
                            basisFormatted = '(' + basis + ')';
                        }
                    } else { // * базис не изменился, ищем среди имеющихся в eventstore
                        var activeTabIndex = BasketF.getActiveTabIndexEvent(),
                            grid = Ext.ComponentQuery.query('grideventlive')[activeTabIndex],
                            vm = grid.getViewModel(),
                            storeEvent = vm.getStore('eventstore'),
                            rec = storeEvent.findRecord('event_id', record.get('event_id'), 0, false, true, true);

                        if (rec) {
                            basis = UtilMarkets.cf(rec.getData(), column.base);
                            if (basis && basis[2])
                                basisFormatted = '(' + basis[2] + ')';
                        }
                    }
                    arrBasis[4] = basisFormatted.toString();
                    data[0][header] = this.spanCoeff(arrBasis, arrCoef);
                    objColumn['width'] = this.getColW(basisFormatted + ' ' + arrCoef[2]);
                } else { // * обычный кэф рисуем по-центру
                    objColumn['align'] = 'center';
                    data[0][header] = this.spanOnlyCoeff(arrBasis, arrCoef);
                }

                arrTitleGrid.push(objColumn);
            }
        }, this);
        this.addGridOnToolbar(panel, arrTitle, arrTitleGrid, data);
    },

// * Экспресс дня - шаблон
    templateDayExpress: function (obj, item, record, panel) {
        var data = [{}],
            arrTitle = [],
            arrTitleGrid = [],
            hideHeaders = panel._index;

        if (typeof record.get == 'function') {
            var tournament_name = record.get('tournament_name'),
                home = record.get('home'),
                away = record.get('away'),
                eventId = record.get('event_id'),
                de_type = record.get('de_type'),
                time = record.get('time');
        } else {
            var tournament_name = record['tournament_name'],
                home = record['home'],
                away = record['away'],
                eventId = record['event_id'],
                de_type = record['de_type'],
                time = record['time'];
        }

        if (de_type == 0) // * пятерочка
            var width = [305, 70, 150, 45, 45, 45];
        else // * Двойной шанс
            var width = [170, 70, 150, 45, 45, 45, 45, 45, 45];


        // * первая колонка: вид спорта и название турнира
        var sportSlug = UtilMarkets.getSportSlug(record),
            tournName =
                '<span style="justify-content: space-between;display: flex;flex-direction: row;">' +
                '<div>' + tournament_name + '</div>' +
                '<div><img src="resources/image/sports/' + sportSlug + '.png"></div>' +
                '</span>';

        var time = new Date(time),
            timeText1 = Ext.Date.format(time, 'd M'),
            timeTextFull = Ext.Date.format(time, 'd F'),
            title = timeTextFull + ', ' + panel._title,
            timeText2 = Ext.Date.format(time, 'H:i'),
            timeText = timeText1 + '  ' + timeText2;

        var header_1 = 'header_1',
            objColumn_1 = {
                text: 'Турнир',// * 18 авг Пятерочка
                flex: 1,
                dataIndex: header_1
            };
        arrTitle.push(header_1);
        arrTitleGrid.push(objColumn_1);
        data[0][0] = tournName;

        // * вторая колонка: дата и время
        var header_2 = 'header_2',
            objColumn_2 = {
                text: 'Дата',
                dataIndex: header_2,
                align: 'center',
                width: width[1]
            };
        arrTitle.push(header_2);
        arrTitleGrid.push(objColumn_2);
        data[0][1] = timeText;

        // * третья колонка: название команд
        var eventName1 = Util.colorText('green', '1&nbsp&nbsp') + home,
            eventName2 = Util.colorText('red', '2&nbsp&nbsp') + away,
            eventName = eventName1 + '<br>' + eventName2;

        var header_3 = 'header_3',
            objColumn_3 = {
                text: 'Команды',
                dataIndex: header_3,
                width: width[2]
            };
        arrTitle.push(header_3);
        arrTitleGrid.push(objColumn_3);
        data[0][2] = eventName;

        // * перебираем columns в шаблоне
        Ext.Array.each(item.columns, function (column, idx) {
            var arrCoef = Util.findByKeyLike(obj, column.name);

            if (!arrCoef)
                arrCoef = [null, null, ''];

            var header = column.title,
                objColumn = {
                    text: header,
                    dataIndex: header
                };

            // * заголовки ячеек таблицы
            arrTitle.push(header);

            objColumn['align'] = 'center';
            data[0][idx + 3] = this.spanOnlyCoeff('', arrCoef, eventId);

            // * описание колонок грида
            arrTitleGrid.push(objColumn);
        }, this);

        this.addGridDayExpress(panel, arrTitle, arrTitleGrid, data, title, hideHeaders, width);
    },

    templateColumnList: function (obj, item, record, panel) {
        //console.time('panel');
        var sportSlug = UtilMarkets.getSportSlug(record);
        var data = [],
            arrTitle = [],
            arrTitleGrid = [],
            arrAllCoeffs = [];

        // * есть деление на колонки
        Ext.Array.each(item.columns, function (column) {
            var hostaway = column.title;
            hostaway = this.replaceHAImp(hostaway, record);
            arrTitle.push(hostaway);
            arrTitleGrid.push(
                {
                    text: hostaway,
                    dataIndex: hostaway,
                    flex: 1
                }
            );

            if (column.rows && column.rows.length) {
                var cnt = 0;

                Ext.Array.each(column.rows, function (row) {
                    var o = {},
                        arrCoef = Util.findByKeyLike(obj, row.name);

                    if (arrCoef && arrCoef[2]) {
                        var txt = this.spanCoeff(row.title, arrCoef);

                        o[hostaway] = txt;
                        arrAllCoeffs.push(row.name);

                        if (data[cnt]) {
                            data[cnt][hostaway] = txt;
                        } else {
                            data.push(o);
                        }
                        cnt++;
                    }
                }, this);
            }
        }, this);
        // * добавление грида на панель
        if (typeof item.name == "object") {
            var title = item.name[sportSlug] || item.name["default"];
        } else {
            var title = item.name;
        }
        this.addGridOnPanel(panel, arrTitle, arrTitleGrid, data, title);
        // console.timeEnd('panel');
    },
    templateFora: function (obj, item, record, panel) {
        var sportSlug = UtilMarkets.getSportSlug(record);
        var data = [],
            arrTitle = [],
            arrTitleGrid = [],
            arrAllCoeffs = [];
        var home = record.get('home'),
            away = record.get('away');
        var cnt = 0;
        arrTitle = [home, away];
        arrTitleGrid = [
            {
                //text: home,
                text: 'Хозяева',
                dataIndex: home,
                flex: 1
            },
            {
                //text: away,
                text: 'Гости',
                dataIndex: away,
                flex: 1
            }
        ];
        // * перебираем базисы
        Ext.Array.each(item.bases, function (basisMnemo, indexBasis) {
            var coeffH = basisMnemo + '_H',
                coeffA = basisMnemo + '_A';
            var o = {},
                arrCoeffH = Util.findByKeyLike(obj, coeffH),
                arrBasis = Util.findByKeyLike(obj, basisMnemo),
                arrCoeffA = Util.findByKeyLike(obj, coeffA),
                basis = null;
            if (arrBasis) {
                basis = arrBasis[2];
            } else {
                var activeTabIndex = BasketF.getActiveTabIndexEvent(),
                    grid = Ext.ComponentQuery.query('grideventlive')[activeTabIndex],
                    vm = grid.getViewModel(),
                    storeEvent = vm.getStore('eventstore'),
                    rec = storeEvent.findRecord('event_id', record.get('event_id'), 0, false, true, true);
                if (rec)
                    basis = UtilMarkets.cf(rec.getData(), basisMnemo);
            }
            if (arrCoeffH[2]) {
                if (basis) {
                    var sign = basis.toString().indexOf("-") == -1 ? ('+') : ('-');
                } else {
                    var sign = '';
                }
                var basisFormattedH = sign + basis.toString().replace("-", "");

                basisFormattedH = basisFormattedH || arrBasis[2].toString();
                basisFormattedH = '(' + basisFormattedH + ')';
                if (arrBasis)
                    arrBasis[4] = basisFormattedH.toString();
                o[home] = this.spanCoeff(arrBasis, arrCoeffH);
                o['basis'] = sign + basis.toString().replace("-", "");
                arrAllCoeffs.push(coeffH);
            }
            if (arrCoeffA[2]) {
                if (basis) {
                    var sign = basis.toString().indexOf("-") == -1 ? ('-') : ('+');
                } else {
                    var sign = '';
                }
                var basisFormattedA = sign + basis.toString().replace("-", "");

                basisFormattedA = basisFormattedA || basis.toString();
                basisFormattedA = '(' + basisFormattedA + ')';
                if (arrBasis)
                    arrBasis[4] = basisFormattedA.toString();
                o[away] = this.spanCoeff(arrBasis, arrCoeffA);
                arrAllCoeffs.push(coeffA);
            }
            if (!Ext.Object.isEmpty(o)) {
                data.push(o);
                cnt++;
            }
        }, this);
        // * добавление грида на панель
        if (typeof item.name == "object") {
            var title = item.name[sportSlug] || item.name["default"];
        } else {
            var title = item.name;
        }

        // * отсортируем строчки по базисам
        data = this.sortCoefByBasis(data);

        this.addGridOnPanel(panel, arrTitle, arrTitleGrid, data, title);
    },
    templateGrouppedList: function (obj, item, record, panel) {
        var sportSlug = UtilMarkets.getSportSlug(record);
        var groupTitle = item.name[sportSlug] || item.name["default"] || item.name["statistics"] || item.name;
        // * перебираем группы и создаем гриды на каждую группу
        Ext.Array.each(item.groups, function (group) {
            var data = [],
                arrTitle = [],
                arrTitleGrid = [],
                arrAllCoeffs = [];
            var title = group.title;
            arrTitle.push(title);
            arrTitleGrid.push(
                {
                    text: title,
                    dataIndex: title,
                    flex: 1
                }
            );
            // * перебираем строки внутри грида
            if (group.mnemonics && group.mnemonics.length) {
                var cnt = 0;
                Ext.Array.each(group.mnemonics, function (row) {
                    var o = {},
                        arrCoef = Util.findByKeyLike(obj, row.name);
                    if (arrCoef && arrCoef[2]) {
                        var hostaway = row.title;
                        hostaway = this.replaceHAImp(hostaway, record);
                        var txt = this.spanCoeff(hostaway, arrCoef);
                        o[title] = txt;
                        arrAllCoeffs.push(row.name);
                        data.push(o);
                        cnt++;
                    }
                }, this);
            }
            // * добавление грида на панель
            this.addGridOnPanel(panel, arrTitle, arrTitleGrid, data, groupTitle);
        }, this);
    },
    templateGrouppedYesNoList: function (obj, item, record, panel) {
        var sportSlug = UtilMarkets.getSportSlug(record),
            yes = UtilMarkets.t('templates.yes_'),
            no = UtilMarkets.t('templates.no_');

        // * перебираем группы и создаем гриды на каждую группу
        Ext.Array.each(item.groups, function (group) {
            var data = [],
                arrTitle = [],
                arrTitleGrid = [],
                arrAllCoeffs = [];
            var title = group.name;
            title = this.replaceHAImp(title, record);
            arrTitle.push(title);
            arrTitleGrid.push(
                {
                    dataIndex: 'rowTitle',
                    flex: 1
                },
                {
                    dataIndex: 'YES',
                    text: yes,
                    width: 40
                },
                {
                    dataIndex: 'NO',
                    text: no,
                    width: 40
                }
            );
            // * перебираем строки внутри грида
            if (group.mnemonics && group.mnemonics.length) {
                var cnt = 0;
                Ext.Array.each(group.mnemonics, function (row) {
                    if (row.name_yes) { // * особый случай, когда коэффициенты образуются не добавлением _YES, а указаны в теге name_yes
                        var coeffYes = row.name_yes,
                            coeffNo = row.name_no;
                    } else {
                        var coeffYes = row.name + 'YES',
                            coeffNo = row.name + 'NO';
                    }
                    var o = {},
                        arrCoefYes = Util.findByKeyLike(obj, coeffYes),
                        arrCoefNo = Util.findByKeyLike(obj, coeffNo);
                    if (arrCoefYes[2] || arrCoefNo[2]) {
                        var rowTitle = row.title[sportSlug] || row.title["default"] || row.title;
                        o['rowTitle'] = rowTitle;
                        if (arrCoefYes[2]) {
                            //o['YES'] = this.spanCoeff('', arrCoefYes, coeffYes);
                            o['YES'] = this.spanOnlyCoeff('', arrCoefYes);
                            arrAllCoeffs.push(coeffYes);
                        }
                        if (arrCoefNo[2]) {
                            //o['NO'] = this.spanCoeff('', arrCoefNo, coeffNo);
                            o['NO'] = this.spanOnlyCoeff('', arrCoefNo);
                            arrAllCoeffs.push(coeffNo);
                        }

                        /*o['YES'] = this.spanCoeff(yes, arrCoefYes, coeffYes);
                         o['NO'] = this.spanCoeff(no, arrCoefNo, coeffNo);*/

                        data.push(o);
                        cnt++;
                    }

                }, this);
            }
            // * добавление грида на панель
            this.addGridOnPanel(panel, arrTitle, arrTitleGrid, data, title);
        }, this);
    },
    templateSimpleList: function (obj, item, record, panel) {
        var sportSlug = UtilMarkets.getSportSlug(record);
        var data = [],
            arrTitle = [],
            arrTitleGrid = [],
            arrAllCoeffs = [];
        var home = record.get('home'),
            away = record.get('away');
        var cnt = 0;
        arrTitle.push('rowTitle');
        arrTitleGrid = [
            {
                dataIndex: 'rowTitle',
                flex: 1
            }
        ];
        // * перебираем строки
        Ext.Array.each(item.rows, function (row) {
            var o = {},
                arrCoeff = Util.findByKeyLike(obj, row.name);
            if (arrCoeff[2]) {
                var rowTitle = row.title[sportSlug] || row.title["default"] || row.title["statistics"] || row.title;
                rowTitle = this.replaceHAImp(rowTitle, record);
                o['rowTitle'] = this.spanCoeff(rowTitle, arrCoeff);
                arrAllCoeffs.push(row.name);
                data.push(o);
                cnt++;
            }
        }, this);
        // * добавление грида на панель
        if (typeof item.name == "object") {
            var title = item.name[sportSlug] || item.name["default"];
        } else {
            var title = item.name;
        }
        this.addGridOnPanel(panel, arrTitle, arrTitleGrid, data, title, true);

        // * если имеется блок odd - чет/нечет
        if (item.odd && item.odd.length) {
            var data = [],
                arrTitle = [],
                arrTitleGrid = [],
                arrAllCoeffs = [];
            var home = UtilMarkets.t('templates.even'),
                away = UtilMarkets.t('templates.odd');
            var cnt = 0;
            arrTitle = [home, away];
            arrTitleGrid = [
                {
                    //text: home,
                    text: 'Хозяева',
                    dataIndex: home,
                    flex: 1
                },
                {
                    text: 'Гости',
                    //text: away,
                    dataIndex: away,
                    flex: 1
                }
            ];
            // * перебираем odd
            Ext.Array.each(item.odd, function (odd) {
                var coeffOdd = odd + 'Odd',
                    coeffEven = odd + 'Even';
                var o = {},
                    arrCoeffOdd = Util.findByKeyLike(obj, coeffOdd),
                    arrCoeffEven = Util.findByKeyLike(obj, coeffEven);
                if (arrCoeffOdd[2] || arrCoeffEven[2]) {
                    if (arrCoeffEven[2]) {
                        o[home] = this.spanCoeff(home, arrCoeffEven);
                        arrAllCoeffs.push(coeffEven);
                    }
                    if (arrCoeffOdd[2]) {
                        o[away] = this.spanCoeff(away, arrCoeffOdd);
                        arrAllCoeffs.push(coeffOdd);
                    }
                    data.push(o);
                    cnt++;
                }
            }, this);

            this.addGridOnPanel(panel, arrTitle, arrTitleGrid, data, title, true);
        }
    },
    templateTotal: function (obj, item, record, panel) {
        var sportSlug = UtilMarkets.getSportSlug(record);
        var data = [],
            arrTitle = [],
            arrTitleGrid = [],
            arrAllCoeffs = [];
        var home = UtilMarkets.t('templates.less'),
            away = UtilMarkets.t('templates.more');
        var cnt = 0;
        arrTitle = [home, away];
        arrTitleGrid = [
            {
                text: home,
                dataIndex: home,
                flex: 1
            },
            {
                text: away,
                dataIndex: away,
                flex: 1
            }
        ];

        // * перебираем базисы
        Ext.Array.each(item.bases, function (basis) {
            var coeffL = basis + 'L',
                coeffG = basis + 'G';
            var o = {},
                arrCoeffL = Util.findByKeyLike(obj, coeffL),
                arrBasis = Util.findByKeyLike(obj, basis),
                arrCoeffG = Util.findByKeyLike(obj, coeffG);
            arrBasis[4] = ('(' + arrBasis[2] + ')').toString();
            if (/*arrCoeffL[2] && arrCoeffG[2] && */arrBasis[2]) {
                if (arrCoeffL[2]) {
                    o[home] = this.spanCoeff(arrBasis, arrCoeffL);
                    o['basis'] = arrBasis[2];
                    arrAllCoeffs.push(coeffL);
                }
                if (arrCoeffG[2]) {
                    o[away] = this.spanCoeff(arrBasis, arrCoeffG);
                    arrAllCoeffs.push(coeffG);
                }
                if (!Ext.Object.isEmpty(o)) {
                    data.push(o);
                    cnt++;
                }
            }
        }, this);
        // * добавление грида на панель
        if (typeof item.name == "object") {
            var title = item.name[sportSlug] || item.name["default"];
        } else {
            var title = item.name;
        }

        // * отсортируем строки по возрастанию базисов
        data = this.sortCoefByBasis(data);

        title = this.replaceHAImp(title, record);
        this.addGridOnPanel(panel, arrTitle, arrTitleGrid, data, title);

        // * если имеется блок odd - чет/нечет
        if (item.odd && item.odd.length) {
            var data = [],
                arrTitle = [],
                arrTitleGrid = [],
                arrAllCoeffs = [];
            var home = UtilMarkets.t('templates.even'),
                away = UtilMarkets.t('templates.odd');
            var cnt = 0;
            arrTitle = [home, away];
            arrTitleGrid = [
                {
                    //text: home,
                    text: 'Хозяева',
                    dataIndex: home,
                    flex: 1
                },
                {
                    //text: away,
                    text: 'Гости',
                    dataIndex: away,
                    flex: 1
                }
            ];
            // * перебираем odd
            Ext.Array.each(item.odd, function (odd) {
                var coeffOdd = odd + 'Odd',
                    coeffEven = odd + 'Even';
                var o = {},
                    arrCoeffOdd = Util.findByKeyLike(obj, coeffOdd),
                    arrCoeffEven = Util.findByKeyLike(obj, coeffEven);
                if (arrCoeffOdd[2] || arrCoeffEven[2]) {
                    if (arrCoeffEven[2]) {
                        o[home] = this.spanCoeff(home, arrCoeffEven);
                        arrAllCoeffs.push(coeffEven);
                    }
                    if (arrCoeffOdd[2]) {
                        o[away] = this.spanCoeff(away, arrCoeffOdd);
                        arrAllCoeffs.push(coeffOdd);
                    }
                    data.push(o);
                    cnt++;
                }
            }, this);
            this.addGridOnPanel(panel, arrTitle, arrTitleGrid, data, title, true);
        }
    },
    templateYesNoList: function (obj, item, record, panel) {
        var sportSlug = UtilMarkets.getSportSlug(record),
            yes = UtilMarkets.t('templates.yes_'),
            no = UtilMarkets.t('templates.no_');
        var data = [],
            arrTitle = [],
            arrTitleGrid = [],
            arrAllCoeffs = [];
        var title = item.name;
        arrTitle.push(title);
        arrTitleGrid.push(
            {
                dataIndex: 'rowTitle',
                flex: 1
            },
            {
                dataIndex: 'YES',
                text: yes,
                width: 40
            },
            {
                dataIndex: 'NO',
                text: no,
                width: 40
            }
        );
        // * перебираем строки внутри грида
        if (item.rows && item.rows.length) {
            var cnt = 0;
            Ext.Array.each(item.rows, function (row) {
                var o = {},
                    coeffYes = row.name + 'YES',
                    coeffNo = row.name + 'NO',
                    arrCoefYes = Util.findByKeyLike(obj, coeffYes),
                    arrCoefNo = Util.findByKeyLike(obj, coeffNo);
                if (arrCoefYes[2] || arrCoefNo[2]) {
                    var rowTitle = row.title[sportSlug] || row.title["default"] || row.title;
                    rowTitle = this.replaceHAImp(rowTitle, record);
                    o['rowTitle'] = rowTitle;
                    /*o['YES'] = this.spanCoeff(yes, arrCoefYes, coeffYes);
                     o['NO'] = this.spanCoeff(no, arrCoefNo, coeffNo);*/

                    if (arrCoefYes[2]) {
                        //o['YES'] = this.spanCoeff('', arrCoefYes, coeffYes);
                        o['YES'] = this.spanOnlyCoeff('', arrCoefYes);
                        arrAllCoeffs.push(coeffYes);
                    }
                    if (arrCoefNo[2]) {
                        o['NO'] = this.spanOnlyCoeff('', arrCoefNo);
                        //o['NO'] = this.spanCoeff('', arrCoefNo, coeffNo);
                        arrAllCoeffs.push(coeffNo);
                    }
                    data.push(o);
                    cnt++;
                }
            }, this);
        }
        // * добавление грида на панель
        this.addGridOnPanel(panel, arrTitle, arrTitleGrid, data, title);
    }

});