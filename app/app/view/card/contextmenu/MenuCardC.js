Ext.define('Office.view.card.contextmenu.MenuCardC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.util.Server'
    ],
    alias: 'controller.menucard',

    control: {
        '#menuBlock': {
            click: function (button) {
                console.log('click menuBlock');
                var grid = Ext.ComponentQuery.query('gridcard')[0],
                    selection = grid.getSelectionModel().getSelection()[0],
                    id = selection.get('id'),
                    fio = selection.get('lastname') + ' ' + selection.get('firstname') + ' ' + selection.get('patronymic_name'),
                    cardNumber = selection.get('barcode') || '',
                    text = 'ФИО: ' + fio + '<br>№ карты: ' + cardNumber + '<br><br>Заблокировать карту?',
                    textNew = 'ФИО: ' + fio + '<br><br>Привязать новую карту?';
                Ext.Msg.confirm('Блокировка карты', text, function (button) {
                    if (button == 'yes') {
                        var objUrl = {
                            class: 'Pos_Barcode_Lockusercard',
                            params: {
                                player_id: id,
                                barcode: cardNumber
                            }
                        };
                        Ext.Ajax.request({
                            url: Server.getUrl(objUrl),
                            success: function (response) {
                                try {
                                    var mes = Ext.decode(response.responseText);
                                    if (mes.success) {
                                        Utilities.toast('Успех', 'Карта заблокирована');
                                        Ext.Msg.confirm('Новая карта', textNew, function (button) {
                                            if (button == 'yes') {
                                                selection.set('card_status',0);
                                                /*grid.store.reload({
                                                    callback: function (opt, success, response) {
                                                        console.info(grid);
                                                        grid.setSelection(selection);
                                                        grid.fireEvent('celldblclick', grid);
                                                    }
                                                });*/
                                                grid.fireEvent('celldblclick', grid);
                                            }else{
                                                grid.store.reload();
                                            }
                                        }, this);
                                    } else
                                        Ext.Msg.alert('Ошибка', mes || ' Карта не заблокирована');

                                } catch (e) {
                                    return;
                                }
                            },
                            failure: function (response) {
                                try {
                                    var mes = Ext.decode(response.responseText);
                                    Ext.Msg.alert('Ошибка', mes || 'Ошибка данных');
                                } catch (e) {
                                    return;
                                }
                            },
                            method: 'POST'
                        });
                    }
                }, this);
            }
        }
    }
});
