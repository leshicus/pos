Ext.define('Office.view.accept.PanelFilterAcceptC', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.panelfilteraccept',
    init: function () {
        this.listen({
            component: {
                // * очистка фильтров
                'tool[type=close]': {
                    click: function (button) {
                        console.log('tool[type=close]');
                        var panel = button.up('panel'),
                            grid = panel.up('container').down('gridaccept'),
                            mainController = Office.app.getController('Main');
                        mainController.resetFilters(panel, grid);
                    }
                }
            },
            store: {

            }
        })
    },
    onAddFilter: function (field, n, o, e) {
       // console.info(this.getView());
        var mainController = Office.app.getController('Main'),
            grid = this.getView().up('container').down('gridaccept');
        mainController.onAddFilter(field, n, o, e, false, grid.store);
    },
    onEnter: function (field, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView().up('container').down('gridaccept');
        mainController.onEnter(field, e, grid.store);
    }


});
