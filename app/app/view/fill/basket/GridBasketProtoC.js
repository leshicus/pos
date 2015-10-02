Ext.define('Office.view.fill.basket.GridBasketProtoC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridbasketproto',

    // * Удалить:кнопка-крестик в ячейке Купона
    onClickCancelCell: function (view, td, cellIndex, rec, tr, rowIndex) {
        var columnHeader = view.ownerCt.columns[cellIndex].text;

        if (columnHeader == 'Cancel') {
            var fill = Ext.ComponentQuery.query('#main')[0],
                vm = fill.getViewModel(),
                gridbasketexpress = fill.down('gridbasketexpress'),
                tabpanel = gridbasketexpress.up('tabpanel'),
                store = vm.getStore('basket');

            store.removeAt(rowIndex);

            gridbasketexpress.getViewModel().set('system_count', null);

            // * снимем чекер Серия ставок
            var gridbasketsingle = fill.down('gridbasketsingle'),
                checkBetSeries = gridbasketsingle.down('#checkBetSeries');
            checkBetSeries.setValue(false);

            // * получить данные по min max
            BasketF.getMaxMin();
        }
    }

});
