Ext.define('Office.view.session.GridDetalizationC', {
    extend: 'Ext.app.ViewController',
    requires: [
    ],
    alias: 'controller.griddetalization',
    listen: {
        component: {
            'tool[type=refresh]': {
                click: function (tool) {
                    var grid = tool.up('panel'),
                        vm=grid.getViewModel();
                    grid.store.reload();
                    vm.getStore('totals').reload();
                }
            }
        }
    }
});
