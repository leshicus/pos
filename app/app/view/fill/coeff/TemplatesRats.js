Ext.define('Office.view.fill.coeff.TemplatesRats', {
    singleton: true,
    alternateClassName: ['TemplatesRats'],
    extend: 'Office.view.fill.coeff.TemplateProtoClass',

    onItemSelect: function (view, record, item, index, e, eOpts) {
        var dataIndex = view.getSelectionModel().getCurrentPosition().columnHeader.dataIndex,
            span = record.getData()[dataIndex],
            objSpan = Util.getDataset(span, 'span'),
            coefId = objSpan.coefid,
            activeTabIndexEvent = BasketF.getActiveTabIndexEvent(),
            gridEvent = Ext.ComponentQuery.query('grideventlive')[activeTabIndexEvent] /*|| Ext.ComponentQuery.query('grideventrats')[0]*/,
            selected = gridEvent.selection;
        MarketsHtml.addToBasket(coefId,'',selected);
    },

    renderRatsCoef: function (value, metadata, rec, rowIndex, colIndex) {
        if (value) {
            if (colIndex == 0) metadata.tdCls = 'bg-red-ratcoef';
            if (colIndex == 1) metadata.tdCls = 'bg-black-ratcoef';
        }
        return value || "";
    },
    //rendererBetInBasketRatsMain: function (val, metadata, rec, rI, cI) {
    //    //if (val) {
    //    //    var storeBasket = Ext.data.StoreManager.lookup('basket'),
    //    //        arrCoef = Util.textFromHTMLString(val, 'span', 'data-arr-coef');
    //    //    if (arrCoef.length) {
    //    //        storeBasket.each(function (item) {
    //    //            if (item.get('arrCoef')[0] == arrCoef[0])
    //    //                metadata.tdCls = 'bg-red';
    //    //        });
    //    //    }
    //    //}
    //    if (val) {
    //        var storeBasket = Ext.data.StoreManager.lookup('basket'),
    //            span = Util.getObjectItemByNum(rec.data, cI),
    //        // arrBasis = [],
    //            objSpan = Util.getDataset(span, 'span');
    //        //out = val;
    //        console.info(span,objSpan);
    //        if (objSpan && Ext.Object.getSize(objSpan)) {
    //            // console.info(objSpan);
    //            if (objSpan.arrCoef)
    //                var arrCoef = JSON.parse("[" + objSpan.arrCoef.split(',').map(function (item) {
    //                    return JSON.stringify(item);
    //                }) + "]");
    //            /*if (objSpan.arrBasis) {
    //             arrBasis = JSON.parse("[" + objSpan.arrBasis.split(',').map(function (item) {
    //             return JSON.stringify(item);
    //             }) + "]");
    //             } else {
    //             arrBasis.push('');
    //             }*/
    //            console.info(arrCoef);
    //            if(storeBasket)
    //                storeBasket.each(function (item) {
    //                    if (item.get('arrCoef')[0] == arrCoef[0])
    //                        metadata.tdCls = 'bg-red';
    //                });
    //        }
    //    }
    //    return val;
    //},
    // * грид с двумя header
    addGrid2Titles: function (panel, arrTitle, arrTitleGrid, data, topTitle, leftTitle, label) {
        if (arrTitle.length && data.length && arrTitleGrid.length) {
            var store = new Ext.data.Store({
                    fields: arrTitle
                }),
                grid = new Ext.grid.Panel({
                    title: topTitle,
                    columnLines: true,
                    store: store,
                    flex: 1,
                    selModel: {
                        allowDeselect: true,
                        type: 'cellmodel'
                    },
                    //cls: 'market-header',
                    cls: 'topHeaderPanel',
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            renderer: this.rendererBetInBasket
                        },
                        items: arrTitleGrid
                    },
                    listeners: {
                        beforeitemcontextmenu: this.onBeforeCM, // * не показывать контекстное меню, если пустая ячейка
                        itemcontextmenu: this.onItemCM,
                        itemclick: this.onItemSelect
                    }
                }),
                panelLeftTitle = new Ext.panel.Panel({
                    title: leftTitle,
                    headerPosition: 'left',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    flex: 1,
                    cls: 'leftHeaderPanel',
                    items: [
                        label,
                        grid
                    ]
                });

            store.loadData(data);

            if (data.length)
                panel.add(panelLeftTitle);
        }
    },

    // * добавление коэф по крысам (основные)
    addGridRatsMain: function (panel, arrTitle, arrTitleGrid, data, title, hideHeaders) {
        if (arrTitle.length && data.length && arrTitleGrid.length) {
            var store = new Ext.data.Store({
                    fields: arrTitle
                }),
                grid = new Ext.grid.Panel({
                    title: title,
                    hideHeaders: hideHeaders || false,
                    columnLines: true,
                    store: store,
                    width: 270,
                    selModel: {
                        allowDeselect: true,
                        type: 'cellmodel'
                    },
                    cls: 'market-header',
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            renderer: this.rendererBetInBasket
                        },
                        items: arrTitleGrid
                    },
                    listeners: {
                        beforeitemcontextmenu: this.onBeforeCM, // * не показывать контекстное меню, если пустая ячейка
                        itemcontextmenu: this.onItemCM,
                        itemclick: this.onItemSelect
                    }
                });
            store.loadData(data);
            if (data.length)
                panel.add(grid);
        }
    },

    // * кэф справа, а базис слева
    //spanCoeff: function (basis, arrCoef) {
    //    if (arrCoef[3]) { // * изменившееся значение кэфа
    //        return this.colorizeDiffCoeff(basis, arrCoef);
    //    } else { // * кэф не изменился
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

    templateRatsMain: function (obj, record, panel) {
        var data = [],
            arrTitle = [],
            arrTitleGrid = [];

        for (var i = 0; i <= 3; i++) {
            if (i == 0) {
                var columnTitle = '№',
                    width = 30;
            } else {
                var columnTitle = i + ' МЕСТО',
                    width = 80;
            }
            arrTitle.push(columnTitle);
            arrTitleGrid.push(
                {
                    text: columnTitle,
                    dataIndex: columnTitle,
                    width: width
                }
            );

            for (var j = 1; j <= 12; j++) {
                var o = {};
                if (i == 0) {
                    var txt = j;
                } else {
                    switch (i) {
                        case 1:
                            var coefName = 'coeff_WINNER_OF_THE_RUN_R' + j;
                            break;
                        case 2:
                            var coefName = 'coeff_2ND_OF_THE_RUN_R' + j;
                            break;
                        case 3:
                            var coefName = 'coeff_3RD_OF_THE_RUN_R' + j;
                            break;
                    }
                    var arrCoef = Util.findByKeyLike(obj, coefName);
                    if (arrCoef && arrCoef[2]) {
                        var txt = this.spanCoeffRight(arrCoef);
                    } else {
                        var txt = '';
                    }
                }
                o[columnTitle] = txt;
                if (data[j - 1]) {
                    data[j - 1][columnTitle] = txt;
                } else {
                    data.push(o);
                }
            }
        }

        //var title = 'Крысиные бега, забег № (дата)';
        this.addGridRatsMain(panel, arrTitle, arrTitleGrid, data, '');
    },
    // * дополнительные исходы
    templateRatsExtra: function (obj, record, panel) {
        // * Номер дорожки победителя
        this.templateRatsExtraGeneral(obj, record, panel,
            [
                {
                    title: 'Чет',
                    coef: 'coeff_EVEN_ODD_OF_THE_RUN_R_EVEN'
                },
                {
                    title: 'Нечет',
                    coef: 'coeff_EVEN_ODD_OF_THE_RUN_R_ODD'
                }
            ],
            'Номер дорожки победителя');

        // * Цвет дорожки победителя
        this.templateRatsExtraGeneral(obj, record, panel,
            [
                {
                    title: 'красный',
                    coef: 'coeff_RED_BLACK_OF_THE_RUN_R_RED'
                },
                {
                    title: 'чёрный',
                    coef: 'coeff_RED_BLACK_OF_THE_RUN_R_BLACK'
                }
            ],
            'Цвет дорожки победителя', this.renderRatsCoef);

        // * Дорожка победителя (группы по 4)
        this.templateRatsExtraGeneral(obj, record, panel,
            [
                {
                    title: '1-4',
                    coef: 'coeff_QUAD_OF_THE_RUN_R_Q1'
                },
                {
                    title: '5-8',
                    coef: 'coeff_QUAD_OF_THE_RUN_R_Q2'
                },
                {
                    title: '9-12',
                    coef: 'coeff_QUAD_OF_THE_RUN_R_Q3'
                }
            ],
            'Дорожка победителя (группы по 4)');

        // * Дорожка победителя (группы по 6)
        this.templateRatsExtraGeneral(obj, record, panel,
            [
                {
                    title: '1-6',
                    coef: 'coeff_HALF_OF_THE_RUN_R_H1'
                },
                {
                    title: '7-12',
                    coef: 'coeff_HALF_OF_THE_RUN_R_H2'
                }
            ],
            'Дорожка победителя (группы по 6)');
    },
    templateRatsExtraGeneral: function (obj, record, panel, arrParam, title, fuRenderer) { // * numCol- количество колонок
        var data = [],
            arrTitle = [],
            arrTitleGrid = [];
        for (var i = 0; i < arrParam.length; i++) {
            arrTitle.push('param_' + i);
            if(fuRenderer){
                arrTitleGrid.push(
                    {
                        dataIndex: 'param_' + i,
                        flex: 1,
                        renderer: fuRenderer
                    }
                );
            }else{
                arrTitleGrid.push(
                    {
                        dataIndex: 'param_' + i,
                        flex: 1
                    }
                );
            }

            var coefName = arrParam[i].coef,
                txt = '',
                arrCoef = Util.findByKeyLike(obj, coefName);

            if (arrCoef && arrCoef[2]) {
                txt = this.spanCoeff(arrParam[i].title, arrCoef);
            }

            var o = {};
            o['param_' + i] = txt;

            if (data[0]) {
                Ext.Object.merge(data[0], o);
            } else {
                data.push(o);
            }
        }

        this.addGridOnPanel(panel, arrTitle, arrTitleGrid, data, title, true);
    },

    // * табы с доп исходами
    templateRatsTabs: function (obj, record, panel) {
        var tabpanel = Ext.create('Ext.tab.Panel', {
            //height: 350,
            flex: 1,
            //width: 520,
            activeTab: 0,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: '0 0 0 5',
            defaults: {
                flex: 1
            },
            items: [
                {
                    title: 'Квинелла',
                    itemId: 'quinella'
                },
                {
                    title: 'Перфекта',
                    itemId: 'perfecta',
                    disabled: true
                },
                {
                    title: 'Экзакта',
                    itemId: 'exacta'
                },
                {
                    title: 'Дуэль',
                    itemId: 'duel'
                },
                {
                    title: 'Двойной шанс',
                    itemId: 'doublechance'
                },
            ]
        });

        panel.add(tabpanel);

        var panelQuinella = tabpanel.query('#quinella')[0],
            panelPerfecta = tabpanel.query('#perfecta')[0],
            panelExacta = tabpanel.query('#exacta')[0],
            panelDuel = tabpanel.query('#duel')[0],
            panelDoublechance = tabpanel.query('#doublechance')[0];

        this.templateTabsRatsGeneral(obj, record, panelQuinella, 'coeff_BETRAT_QUINELLA_{0}_{1}_YES', 'КВИНЕЛЛА- 1 и 2 место в любом порядке', '1 или 2 место', '1 или 2 место');
        this.templateTabsRatsGeneral(obj, record, panelPerfecta, 'coeff_BETRAT_PERFECTA_{0}_{1}_YES', 'ПЕРФЕКТА- 1, 2 и 3 место по порядку', '1 место', '2 место');
        this.templateTabsRatsGeneral(obj, record, panelExacta, 'coeff_BETRAT_EXACTA_{0}{1}_YES', 'ЭКЗАКТА- 1 и 2 место по порядку', '1 место', '2 место');
        this.templateTabsRatsGeneral(obj, record, panelDuel, 'coeff_BETRAT_DUEL_{0}_{1}_YES', 'ДУЭЛЬ- угадать, какая из двух крыс финиширует раньше', 'Пришла раньше', 'Пришла позже');
        this.templateTabsRatsGeneral(obj, record, panelDoublechance, 'coeff_BETRAT_FIRST_{0}_{1}_YES', 'ДВОЙНОЙ ШАНС на первое место', '1 место', '1 место');
    },

    templateTabsRatsGeneral: function (obj, record, panel, tplCoef, labelTxt, labelTop, labelLeft) {
        var data = [],
            arrTitle = [],
            gridHeader = '',
            arrTitleGrid = [];
        for (var i = 0; i <= 12; i++) {
            if (i == 0)
                gridHeader = '№';
            else
                gridHeader = i.toString();

            arrTitle.push(i);

            arrTitleGrid.push(
                {
                    text: gridHeader,
                    dataIndex: i,
                    flex: 1
                }
            );
        }
        // * строки
        for (var i = 1; i <= 12; i++) {
            var o = {};
            // * колонки
            for (var j = 0; j <= 12; j++) {
                if (j == 0) {
                    var txt = Util.colorText('#157fcc', i);
                } else {
                    var ii = Util.leadZero(i),
                        jj = Util.leadZero(j),
                        coefName = Ext.util.Format.format(tplCoef, ii, jj),
                        txt = '',
                        arrCoef = Util.findByKeyLike(obj, coefName);
                    if (arrCoef) {
                        txt = this.spanOnlyCoeff('', arrCoef);
                    }
                }
                o[j] = txt;
            }
            data.push(o);
        }

        var label = new Ext.form.Label({
            text: labelTxt
        });
        this.addGrid2Titles(panel, arrTitle, arrTitleGrid, data, labelTop, labelLeft, label);
    }


});