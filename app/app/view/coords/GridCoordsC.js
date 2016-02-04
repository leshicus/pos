Ext.define('Office.view.coords.GridCoordsC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridcoords',
    listen: {
        component: {
            '#': {},
            'tool[type=refresh]': {
                click: function (tool) {
                    var grid = tool.up('panel');
                    grid.store.reload();
                }
            }
        }
    },
    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            this.onChange();
        }
    },
    onChange: function () {
        var mainController = Office.app.getController('Main'),
            grid = Ext.ComponentQuery.query('gridcoords')[0];
        mainController.storeLoadVm(grid);
    },

    onAfterRenderDate: function (field) {
        var grid = Ext.ComponentQuery.query('gridcoords')[0],
            viewModel = grid.getViewModel();
        Ext.defer(function(){
            viewModel.set('filters.date', new Date());
        },10,this);
    }
    
});
