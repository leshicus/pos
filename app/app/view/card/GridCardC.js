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
                        card_status = selected.get('card_status'),
                        _this = this;

                    if (card_status !== '1') {
                        var form = Ext.create('Office.view.card.FormCardV'),
                            barcode=form.down('#barcode');
                        form.getViewModel().set('theClient',selected || '');
                        form.loadRecord(selected);

                        barcode.allowBlank = selected.get('edit');

                        var window = Ext.create('Ext.Window', {
                            title: 'Редактирование',
                            constrain: true,
                            frame: true,
                            modal: true,
                            layout: 'fit'
                        });
                        window.add(form);
                        window.show();

                        // * сделать не пустые поля не редактируемыми
                        Ext.defer(function () { // * без задержки не успевают проставиться признаки
                            form.getController().setNotEditable();
                        }, 300);
                    } else {
                        Util.warnMes('Нельзя редактировать активные карты');
                    }
                },
                // * контекстное меню в гриде
                itemcontextmenu: function (view, rec, node, index, e) {
                    if (view.panel.getSelectionModel().hasSelection()) {
                        e.stopEvent(); // * чтобы не показывалось

                        var menu = Ext.ComponentQuery.query('menucard')[0];
                        if (!menu)
                            menu = Ext.create('Office.view.card.contextmenu.MenuCardV');

                        menu.showAt(e.getXY());
                        if (rec.get('card_status') != 1) {
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
                            is_resident: '1',
                            id: 0,
                            lastname: '',
                            firstname: '',
                            patronymic_name: '',
                            country: '',
                            birthday: '',
                            document_type: '',
                            passport_number: '',
                            passport_issuer: '',
                            passport_issue_datetime: '',

                            passport_code: '',
                            address: '',
                            mobile_phone: '',
                            is_vip: '0',
                            is_blacklisted: '0',
                            barcode: '',

                            card_status: '0',
                            login: '',
                            edit:1
                            //passer: '',
                            //pasnom: ''
                        })[0],
                        form = Ext.create('Office.view.card.FormCardV');

                    form.getViewModel().set('theClient',newRec);
                    form.loadRecord(newRec);

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
        }
    },

    onLoadCard: function (store, arrRecs) {
        if (!arrRecs.length)
            Util.warnMes('Клубные карты не найдены');
    },

    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var mainController = Office.app.getController('Main'),
                grid = this.getView(),
                store = grid.getViewModel().getStore('card');
            mainController.storeLoadVm(grid);
        }
    },

    // * проверка штрих-кода
    onEnterBarcodeInfo: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var success = function (response) {
                    try {
                        var mes = Ext.decode(response.responseText);
                        Util.warnMes(mes.mes);
                    } catch (e) {
                        return;
                    }
                },
                failure = function (response) {
                    try {
                        var mes = Ext.decode(response.responseText);
                        Util.erMes(mes);
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
                url: Server.getUrl(objUrl),
                success: success,
                failure: failure,
                method: 'POST'
            });
        }
    },

});
