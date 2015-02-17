Ext.define('Office.view.fill.GridLiveC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridlive',

    listen: {
        component: {
            '#': {
                /*render: function (grid) {

                 }*/
            }
        },
        store: {
            '#rawdata': {
                load: function (store, recs, result) {
                    /*var grid = this.getView(),
                        fill = grid.up('fill');
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
    /* загрузка данных из апи в модель, и приведение их к понятному для дерева виду */
    loadRawData: function (store, recs, result) {
        console.info('loadRawData');
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
