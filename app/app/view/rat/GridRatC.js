Ext.define('Office.view.rat.GridRatC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridrat',

    listen: {
        component: {
            'tool[type=refresh]': {
                click: function (tool) {
                    var grid = tool.up('panel');
                    grid.store.reload();
                }
            },

            // * очистка фильтров в grid column header
            'tool[type=close]': {
                click: function (button) {
                    var grid = button.up('panel'),
                        mainController = Office.app.getController('Main');
                    mainController.resetFilters(grid, grid);
                }
            }
        }
    },
    onRatRender: function (grid) {
        // * устанавливает начальное значение поля "с" на 20 минут раньше текущего времени
        var dateFrom = Ext.Date.subtract(new Date(), Ext.Date.MINUTE, 20);
        Ext.defer(function(){
            grid.getViewModel().set('filters.min_date', dateFrom);
        },100,this);
    },
    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var mainController = Office.app.getController('Main'),
                grid = this.getView();
            //mainController.onAddFilterVm(field, null, null, null, true, grid.store, grid);
            mainController.storeLoadVm(grid);
        }
    },
    /*onAddFilter: function (field, n, o, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView();
       // mainController.onAddFilterVm(field, n, o, e, false, grid.store, grid);
        mainController.storeLoadVm(grid);
    },*/

    /*onClearFilter: function (field, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView();
        mainController.onClearFilterVm(field, e, grid.store, grid);
    },*/
    // * tooltip для поля Номер забега
    tooltipRace_number: function (field) {
        Ext.tip.QuickTipManager.register({
            target: field.getId(), // Target button's ID
            //anchor: 'bottom',
            anchor: 'top',
            dismissDelay: 3000,
            anchorOffset: 85,
            //title : 'My Tooltip',  // QuickTip Header
            text  : 'Введите значение и нажмите ENTER' // Tip content
        });
    }
});
