Ext.define('Office.view.fill.coeff.TemplateProtoClass', {
    config: {},

    rendererBetInBasket: function (val, metadata, rec, rI, cI) {
        if (val) {
            var fill = Ext.ComponentQuery.query('fill')[0],
                vmFill = fill.getViewModel(),
                storeBasket = vmFill.getStore('basket'),
                span = Util.getObjectItemByNum(rec.data, cI),
                objSpan = Util.getDataset(span, 'span');
            if (objSpan && Ext.Object.getSize(objSpan)) {
                if (storeBasket)
                    storeBasket.each(function (item) {
                        if (item.get('arrCoef')[0] == objSpan.coefid)
                            metadata.tdCls = 'bg-in-basket';
                    });
            }
        }
        return val;
    },

    // * beforeitemcontextmenu
    onBeforeCM: function (view, record, item, index, e) {
        if (view.getSelectionModel().getCurrentPosition()) { // * бывает и не определено иногда
            var headerTrue = view.getSelectionModel().getCurrentPosition().columnHeader.dataIndex;
            if (typeof record.get(headerTrue) === 'undefined') {
                e.stopEvent(); // * чтобы не показывалось стандартное меню Хрома
                return false;
            }
        }
    },
    // * itemcontextmenu
    onItemCM: function (view, record, item, index, e) {
        if (view.panel.getSelectionModel().hasSelection()) {
            e.stopEvent(); // * чтобы не показывалось стандартное меню Хрома

            var dataIndex = view.getSelectionModel().getCurrentPosition().columnHeader.dataIndex,
                span = record.getData()[dataIndex];

            var menu = Ext.ComponentQuery.query('menugridcoef')[0];
            if (menu && menu.getViewModel())
                menu.getViewModel().set('span', span);

            if (!menu)
                menu = Ext.create('Office.view.fill.contextmenu.MenuGridCoeffV', {
                    viewModel: {
                        data: {
                            span: span
                        }
                    }
                });
            menu.showAt(e.getXY());
        }
        return false;
    },

    // * добавление коэф в основную область
    addGridOnPanel: function (panel, arrTitle, arrTitleGrid, data, title, hideHeaders) {
        if (arrTitle.length && data.length && arrTitleGrid.length) {
            var store = new Ext.data.Store({
                    fields: arrTitle
                }),
                _this = this,
                grid = new Ext.grid.Panel({
                    title: title,
                    hideHeaders: hideHeaders || false,
                    columnLines: true,
                    store: store,
                    selModel: {
                        allowDeselect: true,
                        type: 'cellmodel'
                    },
                    cls: 'market-header',
                    columns: {
                        defaults: {
                            menuDisabled: true,
                            sortable: false,
                            renderer: _this.rendererBetInBasket
                        },
                        items: arrTitleGrid
                    },
                    listeners: {
                        // * не показывать контекстное меню, если пустая ячейка
                        beforeitemcontextmenu: this.onBeforeCM,
                        itemcontextmenu: this.onItemCM,
                        itemclick: this.onItemSelect
                    }
                });
            store.loadData(data);
            if (data.length)
                panel.add(grid);
        }
    },

    spanCoeff: function (arrBasis, arrCoef, eventId) {
        eventId = eventId || 0;
        if (arrCoef[3]) { // * изменившееся значение кэфа
            return this.colorizeDiffCoeff(arrBasis, arrCoef);
        } else { // * кэф не изменился
            var basis = typeof arrBasis == 'object' ? arrBasis[4].toString() : arrBasis; // * если массив, то берем 4-й элемент, если строка, то ее и показываем
            return '<span role="button" style="max-width: 90%;text-align: left;font-weight: 100;">' + basis + '</span><span role="button" style="float: right; font-weight: 600;" data-coefid="' + arrCoef[0] + '" data-eventid="' + eventId + '">' + arrCoef[2] + '</span>';
        }
    },

    colorizeDiffCoeff: function (arrBasis, arrCoef, eventId) {
        eventId = eventId || 0;
        if (arrBasis) { // * есть надпись для кэфа (типа 0-1, гости (победа), базис)
            var basis = typeof arrBasis == 'object' ? arrBasis[4] : arrBasis; // * если массив, то берем 4-й элемент, если строка, то ее и показываем
            if (arrCoef[2] < arrCoef[3]) {
                return '<span role="button" style="max-width: 90%;text-align: left;font-weight: 100;">' + basis + '</span><span role="button" style="float: right;font-weight: 600;color: red;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '" data-eventid="' + eventId + '">' + arrCoef[2] + '</span>';
            }
            if (arrCoef[2] > arrCoef[3]) {
                return '<span role="button" style="max-width: 90%;text-align: left;font-weight: 100;">' + basis + '</span><span role="button" style="float: right;font-weight: 600;color: green;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '" data-eventid="' + eventId + '">' + arrCoef[2] + '</span>';
            }
            if (arrCoef[2] == arrCoef[3]) {
                return '<span role="button" style="max-width: 90%;text-align: left;font-weight: 100;">' + basis + '</span><span role="button" style="float: right;font-weight: 600;color: #000000;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '" data-eventid="' + eventId + '">' + arrCoef[2] + '</span>';
            }
        } else { // * просто кэф
            if (arrCoef[2] < arrCoef[3]) {
                return '<span role="button" style="font-weight: 600;color: red;display: flex;justify-content: center;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '" data-eventid="' + eventId + '">' + arrCoef[2] + '</span>';
            }
            if (arrCoef[2] > arrCoef[3]) {
                return '<span role="button" style="font-weight: 600;color: green;display: flex;justify-content: center;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '" data-eventid="' + eventId + '">' + arrCoef[2] + '</span>';
            }
            if (arrCoef[2] == arrCoef[3]) {
                return '<span role="button" style="font-weight: 600;color: #000000;display: flex;justify-content: center;" data-coefid="' + arrCoef[0] + '" data-qtip="' + arrCoef[3] + '" data-eventid="' + eventId + '">' + arrCoef[2] + '</span>';
            }
        }
    },
    spanCoeffRow: function (arrBasis, arrCoef, eventId) {
        eventId = eventId || 0;
        if (arrCoef[3]) { // * изменившееся значение кэфа
            return this.colorizeDiffCoeff(arrBasis, arrCoef);
        } else { // * кэф не изменился
            var basis = typeof arrBasis == 'object' ? arrBasis[4].toString() : arrBasis; // * если массив, то берем 4-й элемент, если строка, то ее и показываем
            return '<span role="button" style="max-width: 90%;text-align: left;font-weight: 100;float:left;">' + basis + '</span><span role="button" style="float: right; font-weight: 600;" data-coefid="' + arrCoef[0] + '" data-eventid="' + eventId + '">' + arrCoef[2] + '</span>';
        }
    },
    spanCoeffRight: function (arrCoef, eventId) {
        eventId = eventId || 0;
        return '<span role="button" style="font-weight: 600;display: flex; justify-content: flex-end;" data-coefid="' + arrCoef[0] + '" data-eventid="' + eventId + '">' + arrCoef[2] + '</span>';
    },
    // * кэф по-центру
    spanOnlyCoeff: function (basis, arrCoef, eventId) {
        eventId = eventId || 0;
        if (arrCoef[3]) { // * изменившееся значение кэфа
            return this.colorizeDiffCoeff(basis, arrCoef, eventId);
        } else { // * кэф не изменился
            return '<span role="button" style="font-weight: 600;display: flex; justify-content: center;" data-coefid="' + arrCoef[0] + '" data-eventid="' + eventId + '">' + arrCoef[2] + '</span>';
        }
    },

    // * сортировка кэфов по базисам -0+, +0-
    sortCoefByBasis: function (data) {
        var out;
        out = Ext.Array.sort(data, function (a, b) {
            if (parseInt(a.basis) < parseInt(b.basis))
                return -1;
            if (parseInt(a.basis) > parseInt(b.basis))
                return 1;
            return 0;
        });

        // * удалим вспомогательные поля из data
        Ext.Array.each(out, function (item) {
            delete item['basis'];
        });

        return out;
    },

});