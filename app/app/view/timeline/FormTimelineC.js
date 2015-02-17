Ext.define('Office.view.timeline.FormTimelineC', {
    //extend: 'Ext.app.ViewController',
    extend: 'Office.view.card.FormCardC',
    requires: [
        'Office.view.card.FormKladrV',
        'Office.view.card.FormCardC',
        'Office.view.timeline.FormSmsCodeV',
        'Ext.window.Toast'
    ],
    alias: 'controller.formtimeline',

    listen: {
        component: {}
    },
    onClickBack: function () {
        var formTimeline = this.getView(),
            layout = formTimeline.getLayout();
        layout.setActiveItem('card-1');
    },

    createSmsForm: function (timeline) {
        var formsmscode = Ext.create('Office.view.timeline.FormSmsCodeV', {
                viewModel: {
                    data: {
                        theTimeline: timeline
                    }
                }
            }),
            win = new Ext.window.Window({
                title: 'Введите код',
                modal: true,
                closable: false,
                constrain: true,
                width: 360,
                itemId: 'windowSms',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    formsmscode
                ],
                buttons: Utilities.getButtonsSaveCancel({
                    scope: formsmscode.getController()
                })
            });
        win.show();
    },

    createTimelineRequest: function (objUrlCreate) {
        var window = Ext.ComponentQuery.query('#windowTimeline')[0],
            grid = Ext.ComponentQuery.query('gridtimeline')[0],
            me = this;
        window.getEl().mask(Utilities.maskText);
        Ext.Ajax.request({
            url: Server.getUrl(objUrlCreate),
            method: 'POST',
            callback: function (opt, success, response) {
                window.getEl().unmask();
                var timelineResp = Ext.decode(response.responseText),
                    result = timelineResp.result,
                    timeline = result.timeline;
                if (timelineResp.success) {
                    if(result.smsCodeSentTo){
                        grid.getViewModel().set('thePhone', result);
                        // * ввод смс кода
                        me.createSmsForm(timeline);
                    }else{
                        Ext.Msg.alert('Ошибка', 'Не заполнен номер телефона');
                    }
                } else {
                    Ext.Msg.alert('Ошибка', timelineResp.errors[0]);
                }
            }
        });
    },

    // * создание таймлайн
    createTimeline: function (values) {
        var window = Ext.ComponentQuery.query('#windowTimeline')[0],
            formtimeline = window.down('formtimeline'),
            type = formtimeline.down('#type').getValue(),
            sum = formtimeline.down('#sum').getValue(),
            ttl = formtimeline.down('#ttl').getValue();
        var objUrlCreate = {
            class: 'Pos_Timeline_Create',
            params: {
                player: values,
                type: type,
                sum: sum,
                ttl: ttl
            }
        };
        this.createTimelineRequest(objUrlCreate);
    },

    // * сохраним изменения персональных данных клиента
    saveClientData: function (values) {
        var window = Ext.ComponentQuery.query('#windowTimeline')[0],
            grid = Ext.ComponentQuery.query('gridtimeline')[0],
            me = this,
            objUrlPlayer = {
            class: 'Pos_Players_Save',
            params: {
                player: values
            }
        };
        window.getEl().mask(Utilities.maskText);
        Ext.Ajax.request({
            url: Server.getUrl(objUrlPlayer),
            method: 'POST',
            callback: function (opt, success, response) {
                window.getEl().unmask();
                var playerResp = Ext.decode(response.responseText);
                if (playerResp.success) {
                    Utilities.toast('Успех','Персональные данные клиента сохранены');
                    me.createTimeline(values);
                } else {
                    grid.store.rejectChanges();
                    Ext.Msg.alert('Ошибка', playerResp.mes);
                }
            }
        });
    },

    onClickSave: function (button) {
        var window = button.up('window'),
            formtimeline = window.down('formtimeline'),
            formcard = formtimeline.down('formcard').getForm(),
            values = formcard.getValues();
        if (formcard.isValid()) {
            values['passport_number'] = values['passer'] + values['pasnom'];
            // * сохраним изменения персональных данных клиента
            this.saveClientData(values);
        }
    },
    onClickCancel: function (button) {
        var window = button.up('window'),
            grid = Ext.ComponentQuery.query('gridtimeline')[0],
            store = grid.getViewModel().getStore('timeline');
        store.rejectChanges();
        window.close();
    },
    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var mainController = Office.app.getController('Main'),
                form = this.getView(),
                gridSearch = form.down('gridsearch'),
                store = gridSearch.getViewModel().getStore('searchtimelinegambler');
            mainController.onAddFilterVm(field, null, null, null, true, store, gridSearch);
        }
    },
    // * выбрали клиента в списке поиска
    onCellDblclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        if (record.get('enabled') == 1 && record.get('is_blacklisted') == 0 && record.get('is_demo') == 0) {
            var mainController = Office.app.getController('Main'),
                gridSearch = this.getView(),
                store = gridSearch.getViewModel().getStore('searchtimelinegambler'),
                section = store.getStoreId(),
                selected = gridSearch.getSelectionModel().getSelection()[0],
                searchId = selected.get('id'),
                window = gridSearch.up('window'),
                formCard = window.down('#card-2').down('formcard'),
                passport_number = selected.get('passport_number').toString(),
                formTimeline = window.down('formtimeline'),
                layout = formTimeline.getLayout();
            formCard.reset();
            if (passport_number) {
                selected.set('passer', passport_number.substr(0, 4));
                selected.set('pasnom', passport_number.substr(-6, 6));
            }
            selected.set('passport_issue_datetime', selected.get('passport_issue_datetime').toString().substr(0, 10));
            formCard.loadRecord(selected);
            layout.setActiveItem('card-2');
            window.setTitle('Параметры таймлайн');
            // * сделать не пустые поля не редактируемыми
            Utilities.setNotEditable(formCard);
        } else {
            var str = record.get('enabled') != 1 ? 'не активен; ' : '';
            str += record.get('is_blacklisted') == 1 ? 'в черном списке; ' : '';
            str += record.get('is_demo') == 1 ? 'демо; ' : '';

            Utilities.toast('Внимание', 'Нельзя создать таймлайн: ' + str);
        }

    },

    onTypeSelect: function (field, recs) {
        var form = this.getView(),
            comboLifetime = form.down('#ttl');
        if (field.getValue()) {
            comboLifetime.select(comboLifetime.getStore().getAt(0));
        } else {
            comboLifetime.reset();
        }
    },
    onClickEditAdress: function (field, val) {
        var formCard = field.up('formcard'),
            address = formCard.down('#address'),
            grid = Ext.ComponentQuery.query('gridtimeline')[0];
        if (grid) {
            var selected = grid.getSelectionModel().getSelection()[0];
            var formKladr = Ext.create('Office.view.card.FormKladrV', {
                viewModel: {
                    data: {
                        theClient: selected.get('player')
                    }
                }
            });
            var window = Ext.create('Ext.Window', {
                width: 400,
                title: 'Заполнение адреса',
                constrain: true,
                closable: false,
                modal: true,
                layout: 'fit'
            });
            window.add(formKladr);
            window.show();
        }
    }

});
