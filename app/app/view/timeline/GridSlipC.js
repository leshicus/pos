Ext.define('Office.view.timeline.GridSlipC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridslip',

    listen: {
        component: {
            'tool[type=refresh]': {
                click: function (button) {
                    var mainController = Office.app.getController('Main'),
                        grid = Ext.ComponentQuery.query('gridslip')[0];
                    mainController.storeLoadVm(grid);
                }
            },
            'tool[type=close]': {
                click: function (button) {
                    var grid = button.up('panel'),
                        mainController = Office.app.getController('Main');
                    mainController.resetFilters(grid);
                }
            }
        }
    },

    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var mainController = Office.app.getController('Main'),
                grid = Ext.ComponentQuery.query('gridslip')[0];
            mainController.storeLoadVm(grid);
        }
    },

    onAddFilter: function (field, n, o, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView();
        grid.getEl().mask('Загрузка...');
        mainController.storeLoadVm(grid);
    },

    onClearFilterVm: function (field, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView();
        mainController.onClearFilterVm(field, e, grid.store, grid);
    },

    onAfterRender: function (grid) {
        var limit=grid.down('#limit');
        limit.select(1);
    }

});
