Ext.define('Office.view.fill.coeff.TemplatesWeb', {
    singleton: true,
    alternateClassName: ['TemplatesWeb'],
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

    // * добавление коэф главной линии в тулбар (главная линия)
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
                        itemcontextmenu: this.onItemCM
                    }
                });
            storeMainLine.loadData(data);
            if (data.length)
                panel.add(gridMainLine);
        }
    },

    // * раскраска кэфа если он изменился
    //colorizeDiffCoeff: function (arrBasis, arrCoef) {
    //    if (arrBasis) { // * есть надпись для кэфа (типа 0-1, гости (победа), базис)
    //        var basis = typeof arrBasis == 'object' ? arrBasis[4] : arrBasis; // * если массив, то берем 4-й элемент, если строка, то ее и показываем
    //        if (arrCoef[2] < arrCoef[3]) {
    //            return '<span role="button" style="max-width: 90%;text-align: left;">' + basis + '</span><span role="button" style="float: right;font-weight: 600;color: red;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '">' + arrCoef[2] + '</span>';
    //        }
    //        if (arrCoef[2] > arrCoef[3]) {
    //            return '<span role="button" style="max-width: 90%;text-align: left;">' + basis + '</span><span role="button" style="float: right;font-weight: 600;color: green;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '">' + arrCoef[2] + '</span>';
    //        }
    //        if (arrCoef[2] == arrCoef[3]) {
    //            return '<span role="button" style="max-width: 90%;text-align: left;">' + basis + '</span><span role="button" style="float: right;font-weight: 600;color: #000000;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '">' + arrCoef[2] + '</span>';
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
    //        return '<span role="button" style="max-width: 90%;text-align: left;">' + basis + '</span><span role="button" style="float: right; font-weight: 600;" data-coefid="' + arrCoef[0] + '">' + arrCoef[2] + '</span>';
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

    // * в массиве объектов menumain::markets проставим признак active:1 если есть не нулевые кф, которые к нему относятся
    setActiveSign: function (obj, markets, marketsGroups, record) {
        var sportSlug = this.getSportSlug(record);
        Ext.Object.each(obj, function (key, val) {
            //console.info(key, val);
            //if (val[2] != 0) {
                Ext.Array.each(markets, function (item, idx) {
                    if ((Util.in_array_like(key, item.dependencies, false)
                        && (Util.in_array(sportSlug, item.sports, false) || !item.sports))
                        || Util.in_array_like(key, item.odd, false)) { // * не только в dependencies смотрим, но и в блоке odd
                        item['active'] = 1;
                        if (!Util.in_array(item.group_id, marketsGroups, false))
                            marketsGroups.push(item.group_id);
                    }
                }, this);
            //}

        }, this);
        return marketsGroups;
    },

    getSportSlug: function (record) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel(),
            storeSportsSlug = vmMenumain.getStore('sportsslug'),
            recSlug = storeSportsSlug.findRecord('id', record.get('sport_id'), 0, false, true, true),
            sportSlug = recSlug.get('slug');
        return sportSlug;
    },

    templateMainLine: function (obj, item, record, panel) {
        var data = [{}],
            arrTitle = [],
            arrTitleGrid = [];
        // * перебираем columns в шаблоне
        //console.info(item,item.columns);
        Ext.Array.each(item.columns, function (column) {
            var arrCoef = Util.findByKeyLike(obj, column.name);
            if (arrCoef && arrCoef[2]) {
                var header = column.title,
                    basisFormatted = 0,
                    objColumn = {
                        text: header,
                        dataIndex: header
                    };
                // * добавим заголовки таблиц
                arrTitle.push(header);
                // * если есть базис, то нужно его написать (для фор и тоталов)
                if (column.base) {
                    var arrBasis = Util.findByKeyLike(obj, column.base),
                        basis = arrBasis[2] || 0;
                    if (arrBasis) {
                        if (column.name == "coeff_ODDS_FT_0ODDS_H") {
                            basisFormatted = basis.toString().indexOf("-") == -1 ? ("+" + basis) : (basis);
                            basisFormatted = '(' + basisFormatted + ')';
                        }
                        if (column.name == "coeff_ODDS_FT_0ODDS_A") {
                            basisFormatted = basis.toString().indexOf("-") == -1 ? ("-" + basis) : ((basis.toString()).replace("-", "+"));
                            //console.info(arrBasis[2],arrBasis[2].toString().indexOf("-"));
                            basisFormatted = '(' + basisFormatted + ')';
                        }
                        if (column.base == "coeff_FT_T") {
                            basisFormatted = '(' + basis + ')';
                        }
                    } else {

                        basisFormatted = '(' + basis + ')';
                    }

                    arrBasis[4] = basisFormatted.toString();
                    //data[0][header] = this.spanCoeff('', arrCoef, column.name);
                    data[0][header] = this.spanCoeff(arrBasis, arrCoef);
                    //objColumn['width'] = 80;
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


    templateColumnList: function (obj, item, record, panel) {
        //console.time('panel');
        var sportSlug = this.getSportSlug(record);
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
                        //arrAllCoeffs[row.name] = arrCoef;
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
        var sportSlug = this.getSportSlug(record);
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
        Ext.Array.each(item.bases, function (basis, indexBasis) {
            var coeffH = basis + '_H',
                coeffA = basis + '_A';
            var o = {},
                arrCoeffH = Util.findByKeyLike(obj, coeffH),
                arrBasis = Util.findByKeyLike(obj, basis),
                arrCoeffA = Util.findByKeyLike(obj, coeffA);
            if (/*arrCoeffH[2] && arrCoeffA[2] && */arrBasis[2]) {
                if (arrCoeffH[2]) {
                    var basisFormattedH = arrBasis[2].toString().indexOf("-") == -1 ? ("+" + arrBasis[2]) : (arrBasis[2]);
                    basisFormattedH = basisFormattedH || arrBasis[2].toString();
                    basisFormattedH = '(' + basisFormattedH + ')';
                    arrBasis[4] = basisFormattedH.toString();
                    o[home] = this.spanCoeff(arrBasis, arrCoeffH);
                    arrAllCoeffs.push(coeffH);
                }
                if (arrCoeffA[2]) {
                    var basisFormattedA = arrBasis[2].toString().indexOf("-") == -1 ? ("-" + arrBasis[2]) : ((arrBasis[2].toString()).replace("-", "+"));
                    basisFormattedA = basisFormattedA || arrBasis[2].toString();
                    basisFormattedA = '(' + basisFormattedA + ')';
                    arrBasis[4] = basisFormattedA.toString();
                    o[away] = this.spanCoeff(arrBasis, arrCoeffA);
                    arrAllCoeffs.push(coeffA);
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
        this.addGridOnPanel(panel, arrTitle, arrTitleGrid, data, title);
    },
    templateGrouppedList: function (obj, item, record, panel) {
        var sportSlug = this.getSportSlug(record);
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
        var sportSlug = this.getSportSlug(record),
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
        var sportSlug = this.getSportSlug(record);
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
        var sportSlug = this.getSportSlug(record);
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
        var sportSlug = this.getSportSlug(record),
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