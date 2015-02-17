Ext.define('Office.view.card.GridCardC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.card.FormCardV',
        'Office.view.card.GridCardM',
        'Office.view.card.contextmenu.MenuCardV'
    ],
    alias: 'controller.gridcard',
    listen: {
        component: {
            '#': {
                celldblclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
                    var selected = grid.getSelectionModel().getSelection()[0],
                        card_status = selected.get('card_status');
                    if (card_status !== '1') {
                        var form = Ext.create('Office.view.card.FormCardV', {
                            viewModel: {
                                data: {
                                    theClient: selected || ''
                                }
                            }
                        });
                        var window = Ext.create('Ext.Window', {
                            title: 'Редактирование',
                            constrain: true,
                            closable: false,
                            frame: true,
                            modal: true,
                            layout: 'fit'
                        });
                        window.add(form);
                        window.show();
                        // * сделать не пустые поля не редактируемыми
                        Ext.defer(function(){
                            Utilities.setNotEditable(form);
                        },100);
                    }else{
                        Utilities.toast('Ошибка','Нельзя редактировать активные карты');
                    }
                },
                // * контекстное меню в гриде
                itemcontextmenu: function (view, rec, node, index, e) {
                    if (view.panel.getSelectionModel().hasSelection()) {
                        e.stopEvent(); // * чтобы не показывалось
                        var menu = Ext.create('Office.view.card.contextmenu.MenuCardV');
                        menu.showAt(e.getXY());
                        if (!rec.get('card_status')) {
                            menu.down('#menuBlock').disable();
                        }
                    }
                    return false;
                }
            },
            'button[action=addClient]': {
                click: function (button) {
                    var grid = this.getView(),
                        newRec = grid.store.add({
                            is_resident: '1'
                        })[0],
                        form = Ext.create('Office.view.card.FormCardV', {
                            viewModel: {
                                data: {
                                    theClient: newRec
                                }
                            }
                        });
                    var window = Ext.create('Ext.Window', {
                        width: 700,
                        title: 'Добавление',
                        constrain: true,
                        closable: false,
                        modal: true,
                        layout: 'fit'
                    });
                    window.add(form);
                    window.show();
                }
            }
        },
        store: {
            '#card': {
                load: function (store, arr) {
                    //console.info(arguments);
                }
            }
        }
    },
    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var mainController = Office.app.getController('Main'),
                grid = this.getView(),
                store = grid.getViewModel().getStore('card');
            //mainController.onAddFilterVm(field, null, null, null, true, store, grid);
            mainController.storeLoadVm(grid);
        }
    },
    // * проверка штрих-кода
    onEnterBarcodeInfo: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var success = function (response) {
                    try {
                        var mes = Ext.decode(response.responseText);
                        Ext.Msg.alert('Сообщение', mes.mes);
                    } catch (e) {
                        return;
                    }
                },
                failure = function (response) {
                    try {
                        var mes = Ext.decode(response.responseText);
                        Ext.Msg.alert('Ошибка', mes);
                    } catch (e) {
                        return;
                    }
                },
                objUrl = {
                    class: 'Pos_Barcode_Info',
                    params: {
                        barcode: field.getValue()
                    }
                };
            Ext.Ajax.request({
                //url: Ext.util.Format.format(Server.getBarCodeInfo(), Server.getToken(), field.getValue()),
                url: Server.getUrl(objUrl),
                success: success,
                failure: failure,
                method: 'POST'
            });
        }
    },
    /*onAddFilter: function (field, n, o, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView();
        //mainController.onAddFilterVm(field, n, o, e, false, grid.store,grid);
        mainController.storeLoadVm(grid);
    },*/

    /*onClearFilter: function (field, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView();
        mainController.onClearFilterVm(field, e, grid.store,grid);
    }*/
});
