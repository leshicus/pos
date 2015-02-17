Ext.define('Office.view.fill.GridLineC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridline',

    listen: {
        component: {
            '#': {
                /*afterrender: function (grid) {
                 console.info(arguments);
                 var vm = grid.lookupViewModel(),
                 storeRawdata = vm.getStore('rawdata');
                 //storeRawdata = grid.store;

                 console.info(storeRawdata, vm);
                 if(storeRawdata){
                 grid.getEl().mask('Загрузка...');
                 storeRawdata.load({
                 callback: function (records, operation, success) {
                 grid.getEl().unmask();
                 }
                 });
                 }
                 }*/
            }
        },
        store: {
            '#rawdata': {
                load: function (store, recs, result) {
                    /*var grid = this.getView(),
                        fill = grid.up('fill'),
                        storeLine = grid.getViewModel().getStore('line');
                    storeLine.load();
                    fill.getController().loadSportStore(store, recs, grid);*/

                }
            }
        }
    },

    // * раскрывает содержимое ячейки (нужно когда длинный текст не помещается в ячейке)
    onCelldblclick: function (cell, td, cellIndex, record, tr, rowIndex, e) {
        var mainController = Office.app.getController('Main');
        mainController.onCelldblclick(cell, td, cellIndex, record, tr, rowIndex, e);
    },
    /* загрузка данных из апи в модель, и приведение их понятному для дерева виду */
    loadRawData: function (store, recs, result) {
        var grid = this.getView(),
            fill = grid.up('fill');
            fill.getController().loadRawData(store, recs, grid);
    },
    onRender: function (grid) {
        var grid = this.getView(),
            fill = grid.up('fill');
        fill.getController().onRender(grid);
    }


});
