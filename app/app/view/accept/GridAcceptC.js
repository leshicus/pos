Ext.define('Office.view.accept.GridAcceptC', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    alias: 'controller.gridaccept',
    init: function () {
        // * по идее это не нужно, и вообще не работает
      /*  var grid = this.getView(),
            pagingtoolbar = grid.getDockedItems('pagingtoolbar')[0];
        pagingtoolbar.setStore(this.getStore('accept'));*/
        //this.lookupReference('pagingtoolbar').setStore(this.getStore('accept'));
    },
    listen: {
        store: {

        }
    },

    control: {
        'tool[type=refresh]': {
            click: function (tool) {
                console.log('refresh');
                var grid = tool.up('panel');
                /* filterArr = BetMill.util.FilterGridBet.getFilters(),
                 params = {
                 filters: Ext.encode(filterArr)
                 };
                 BetMill.util.Utilities.storeLoad(grid.store, params);*/
                grid.store.reload();
            }
        },
        // * Скрыть/Раскрыть Экспрессы
        'tool[type=maximize]': {
            click: function (button) {
                var tree = button.up('panel');

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
        // * очистка фильтров в grid column header
        'tool[type=close]': {
            click: function (button) {
                console.log('tool[type=close]');
                var grid = button.up('panel'),
                    mainController = Office.app.getController('Main');
                mainController.resetFilters(grid, grid);
            }
        },
        'combobox, checkbox, tagfield, textfield': {
            specialkey: function (field, e) {
                this.fireEvent('onClearHeaderFilter', field, e, true, this.getView().store);
            },
            change: function (field, n, o, e) {
                this.fireEvent('onHeaderFilter', field, n, o, e, false, this.getView().store);
            }
        }
    },
    // * сделал централизованную обработку фильтров, т.к. понадобится так же в других разделах
    onAddFilter: function (field, n, o, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView();
        mainController.onAddFilter(field, n, o, e, false, grid.store);
    },

    onClearFilter: function (field, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView();
        mainController.onClearFilter(field, e, grid.store);
    },
    /*onAddFilter: function (field, value) {
        // * для времени Совершения и Рассчета функция ведет себя так :
        // * если сначала проставить дату и время Совершения, а потом Рассчета, то
        // * когда меняем дату, то дата передается правильно, а время- нет, старая (Совершения, а не Рассчета)
        // * и наоборот, т.е. время всегда передается не то.
        // * ну и хрен с ним.
        //console.info(arguments, value.length, field.getValue().length);
        var parameter = field.getItemId(),
            params = {},
            newFilter = field.getValue().length > 0 ? field.getValue().join(',') : field.getRawValue();
        Office.util.Filters.setFilters(parameter,newFilter);
        var filters = Office.util.Filters.getFilters(),
            cbDateType = '',
            headerText = field.up('headercontainer').text;
        switch (headerText){
            case 'Совершена':
                cbDateType = 0;
                break;
            case 'Рассчитана':
                cbDateType = 1;
                break;
        }
        // * если поля cbDateType пока нет среди фильтров, то добавим его. Иначе- исправим
        if(!filters['cbDateType']){
            filters.push({
                id: 'cbDateType',
                value: cbDateType
            });
        }else{
            filters['cbDateType'] = cbDateType;
        }
        filters.forEach(function (item) {
            params[item.id] = item.value;
        });
        Office.util.Utilities.storeLoad(this.getView().store, params);
    },*/
    onChangeComboResult:function (combo, value) {
        console.info(arguments);
            combo.store.each(function (item) {
                item.set(combo._checkField, 0);
            });
            n.forEach(function (item) {
                combo.store.findRecord(combo.valueField, item, 0, false, true, true).set(combo._checkField, 1);
            });

            this.fireEvent('onAddFilter', combo, value);
    },
    onSelectCbDateFrom: function (field, value) {
        var parameter = field.getItemId(),
            params = {};
        //params[parameter] = field.getRawValue();
        Office.util.Filters.setFilters(parameter,field.getRawValue());
        var filters = Office.util.Filters.getFilters();
        filters.forEach(function (item) {
            console.info(item);
            params[item.id] = item.value;
        });
        console.info(params);
        Office.util.Utilities.storeLoad(this.getView().store, params);
    },
    onSelectCbTimeFrom: function (field, value) {
        var parameter = field.getItemId(),
            params = {};
        //params[parameter] = field.getRawValue();
        Office.util.Filters.setFilters(parameter,field.getRawValue());
        var filters = Office.util.Filters.getFilters();
        filters.forEach(function (item) {
            console.info(item);
            params[item.id] = item.value;
        });
        console.info(params);
        Office.util.Utilities.storeLoad(this.getView().store, params);
    }
});
