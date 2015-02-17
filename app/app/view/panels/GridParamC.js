Ext.define('Office.view.panels.GridParamC', {
    extend: 'Ext.app.ViewController',
    requires: [
    ],
    alias: 'controller.gridparam',

    onCellclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        var gridParam = this.getView(),
            selected = gridParam.getSelectionModel().getSelection()[0],
            id = selected.get('id'),
            value = selected.get('value');
        gridParam.getViewModel().set('filters.id',id);
        gridParam.getViewModel().set('filters.value',value);
    },

    //todo добавить панель
    // * добавить панель
    onAddPanel: function (btn) {
        var gridPanels = this.getView(),
            selected = gridPanels.getSelectionModel().getSelection()[0];
        Ext.defer(function () {
            var forminputcash = Ext.create('Office.view.panels.FormInputCashPanelsV', {
                    _type: 'input', // * чтобы различать в контроллере внесение и изъятие
                    viewModel: {
                        data: {
                            theClient: selected
                        }
                    }
                }),
                win = new Ext.window.Window({
                    title: 'Внесение средств на игровой счет',
                    modal: true,
                    closable: false,
                    constrain: true,
                    width: 360,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        forminputcash
                    ],
                    buttons: Utilities.getButtonsSaveCancel({
                        scope: forminputcash.getController(),
                        textSave: 'Внести сумму'
                    })
                });
            win.show();
        }, 10);
    }


});
