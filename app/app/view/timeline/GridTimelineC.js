Ext.define('Office.view.timeline.GridTimelineC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.timeline.FormTimelineV',
        'Office.view.timeline.contextmenu.MenuTimelineV'
    ],
    alias: 'controller.gridtimeline',
    listen: {
        component: {
            '#': {
                // * показ контекстного меню
                itemcontextmenu: function (view, rec, node, index, e) {
                    if (view.panel.getSelectionModel().hasSelection()) {
                        e.stopEvent(); // * чтобы не показывалось
                        var menu = Ext.create('Office.view.timeline.contextmenu.MenuTimelineV');
                        menu.showAt(e.getXY());
                    }
                    return false;
                }
            },
            'tool[type=refresh]': {
                click: function (tool) {
                    console.log('refresh');
                    var grid = tool.up('panel');
                    grid.store.reload();
                }
            }
        },
        store: {
            '#timeline': {
                load: function (store, arr, success, resp) {
                    var mainController = Office.app.getController('Main');
                    if(mainController.askLogoutIfAccessDenied(store)){
                        if (resp._response) {
                            var o = Ext.decode(resp._response.responseText);
                            if (!success) {
                                Ext.MessageBox.alert('Ошибка', o.errors || o.message);
                            }
                            // * посмотрим, а вообще пользователь-то есть
                            if (!o.results) { // * пустой результат
                                var term = this.getView().getViewModel().getData().filters.term,
                                    objUrl = {
                                        class: 'Pos_Timeline_Checkuserbyphone',
                                        params: {
                                            term: term
                                        }
                                    };
                                Ext.Ajax.request({
                                    url: Server.getUrl(objUrl),
                                    success: function (response) {
                                        try {
                                            var resp = Ext.decode(response.responseText),
                                                id = resp.children.id;
                                            if (id) {
                                                var text = 'Пользователь ' + term + ' найден в системе, id = ' + resp.children.id + '. Таймлайнов нет.';
                                            } else {
                                                var text = 'Пользователь не найден в системе.';
                                            }
                                            Ext.Msg.alert('Сообщение', text);
                                        } catch (e) {
                                            return;
                                        }
                                    },
                                    failure: function (response) {
                                        try {
                                            var mes = Ext.decode(response.responseText);
                                            Ext.Msg.alert('Ошибка', mes);
                                        } catch (e) {
                                            return;
                                        }
                                    },
                                    method: 'POST'
                                });
                            }
                        }
                    }

                }
            }
        }
    },

    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            this.searchTimeline();
        }
    },

    searchTimeline: function () {
        var mainController = Office.app.getController('Main'),
            grid = this.getView(),
            successFn = function (store, records, operation, success) {
                if (records[0]) {
                    var player = records[0].get('player'),
                        lastname = player.lastname,
                        firstname = player.firstname,
                        patronymic_name = player.patronymic_name,
                        mobile_phone = player.mobile_phone,
                        passport_number = player.passport_number,
                        fio = lastname + ' ' + firstname + ' ' + patronymic_name,
                        isResident = player.is_resident,
                        passportSer = Gui.getPassportSerie(passport_number, isResident),
                        passportNom = Gui.getPassportNumber(passport_number, isResident),
                        passport = isResident ? (passportSer + ' №' + passportNom) : passport_number;
                    grid.getViewModel().set('fio', fio);
                    grid.getViewModel().set('passport', passport);
                    grid.getViewModel().set('phone', mobile_phone);
                }
            };
        mainController.storeLoadVm(grid, successFn);
    },

    /* onIncludeArchieved: function (field, n, o, e) {
     var mainController = Office.app.getController('Main'),
     grid = this.getView();
     grid.getViewModel().set('filters.includeArchieved', field.getValue());
     Ext.defer(function () {
     mainController.onAddFilterVm(field, null, null, null, true, grid.store, grid);
     }, 10);
     },*/

    /*onClearFilter: function (field, e) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView();
        mainController.onClearFilterVm(field, e, grid.store, grid);
    },*/
    onCellclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        var mainController = Office.app.getController('Main'),
            gridTimeline = this.getView(),
            gridSlip = gridTimeline.up('menumain').down('gridslip'),
            selected = gridTimeline.getSelectionModel().getSelection()[0],
            timelineId = selected.get('id');
        gridSlip.getViewModel().set('filters.timelineId', timelineId);
        Ext.defer(function(){
            mainController.storeLoadVm(gridSlip);
        },10);
   },
    onAddTimeline: function () {
        // console.info(this.getView(),this.getView().getViewModel(),this.getView().getViewModel().getStore('timeline'));
        var grid = this.getView(),
            storeTimeline = grid.getViewModel().getStore('timeline'),
            newRec = storeTimeline.add({})[0],
            formCard = Ext.create('Office.view.timeline.FormTimelineV', {
                viewModel: {
                    data: {
                        theStake: newRec,
                        theClient: newRec.get('player')
                    }
                }
            }),
            window = Ext.create('Ext.Window', {
                width: 900,
                height: 550,
                autoScroll: true,
                title: 'Список игроков',
                defaultFocus: "term",
                constrain: true,
                itemId:'windowTimeline',
                closable: false,
                modal: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                }
            });
        grid.setSelection(newRec);
        window.add(formCard);
        window.show();
    }
});
