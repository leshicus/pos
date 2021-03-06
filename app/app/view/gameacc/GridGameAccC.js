Ext.define('Office.view.gameacc.GridGameAccC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.gameacc.FormInputCashGameaccV'
    ],
    alias: 'controller.gridgameacc',
    listen: {
        component: {
            '#': {},
            'tool[type=refresh]': {
                click: function (tool) {
                    var grid = tool.up('panel');
                    grid.store.reload();
                }
            }
        },
        store: {
            '#gameacc': {
                /*load: function (store, arr, success, resp) {
                 var o = Ext.decode(resp._response.responseText);
                 if (!success) {
                 Util.erMes('Ошибка', o.message);
                 }
                 }*/
            }
        }
    },

    onLoad: function (store, arrRecs) {
        var grid = this.getView(),
            vm = grid.getViewModel(),
            filters = vm.get('filters'),
            flag = false; // * признак, что имеются фильтры

        // * будем сообщать, только если установлены фильтры
        Ext.Object.each(filters, function (key, val) {
            if (val)
                flag = true;
        });

        if (!arrRecs.length && flag)
            Util.warnMes('Игровой счет не найден');
    },

    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var mainController = Office.app.getController('Main'),
                grid = this.getView(),
                store = grid.getViewModel().getStore('gameacc');
            //mainController.onAddFilterVm(field, null, null, null, true, store, grid);
            mainController.storeLoadVm(grid);
        }
    },
    onCellclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        var mainController = Office.app.getController('Main'),
            gridGameAcc = this.getView(),
            gridGameAction = gridGameAcc.up('menumain').down('gridgameaction'),
            storeGameAction = gridGameAction.getViewModel().getStore('gameaction'),
            section = storeGameAction.getStoreId(),
            selected = gridGameAcc.getSelectionModel().getSelection()[0],
            player_id = selected.get('id'),
            enabled = selected.get('enabled'),
            inputCash = gridGameAcc.down('#inputCash'),
            outputCash = gridGameAcc.down('#outputCash');
        //Filters.setFilters(section, 'player_id', player_id);
        gridGameAction.getViewModel().set('filters.player_id', player_id);
        //mainController.storeLoad(section, storeGameAction, gridGameAction);
        mainController.storeLoadVm(gridGameAction);
        // * сделаем доступными кнопки внесения и изъятия
        //if (enabled) {
        //    inputCash.enable();
        //    outputCash.enable();
        //}
    },
    // * внести
    onInputCash: function (btn) {
        var gridGameAcc = this.getView(),
            selected = gridGameAcc.getSelectionModel().getSelection()[0],
            mobile_phone = gridGameAcc.getViewModel().get('filters.mobile_phone');

        if (selected) {
            mobile_phone = selected.get('mobile_phone');

            if (selected.get('enabled') != 1 || selected.get('is_blacklisted') == 1)
                mobile_phone = '';
        }

        Ext.defer(function () {
            var forminputcash = Ext.create('Office.view.gameacc.FormInputCashGameaccV', {
                    _type: 'input', // * чтобы различать в контроллере внесение и изъятие
                    viewModel: {
                        data: {
                            theClient: selected,
                            mobile_phone: mobile_phone
                        }
                    }
                }),
                win = new Ext.window.Window({
                    title: 'Внесение средств на игровой счет',
                    modal: true,
                    constrain: true,
                    width: 360,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        forminputcash
                    ],
                    buttons: Util.getButtonsSaveCancel({
                        scope: forminputcash.getController(),
                        textSave: 'Внести сумму'
                    })
                });
            win.show();
        }, 10);
    },
    // * изъять
    onOutputCash: function (btn) {
        var gridGameAcc = this.getView(),
            selected = gridGameAcc.getSelectionModel().getSelection()[0],
            mobile_phone = gridGameAcc.getViewModel().get('filters.mobile_phone');

        if (selected) {
            mobile_phone = selected.get('mobile_phone');

            if (selected.get('enabled') != 1 || selected.get('is_blacklisted') == 1)
                mobile_phone = '';
        }
        Ext.defer(function () {
            var forminputcash = Ext.create('Office.view.gameacc.FormInputCashGameaccV', {
                    _type: 'output',
                    viewModel: {
                        data: {
                            theClient: selected,
                            mobile_phone: mobile_phone
                        }
                    }
                }),
                win = new Ext.window.Window({
                    title: 'Изъять',
                    modal: true,
                    itemId: 'windowOutput',
                    width: 360,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        forminputcash
                    ],
                    buttons: Util.getButtonsSaveCancel({
                        scope: forminputcash.getController(),
                        textSave: 'Изъять сумму'
                    })
                });
            win.show();
        }, 10);
    }

});
