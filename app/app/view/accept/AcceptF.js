// * ф-ии для fill
Ext.define('Office.view.accept.AcceptF', {
    singleton: true,
    alternateClassName: ['AcceptF'],

// * кнопка Сохранить в форме редактирования данных Игрока
    onClickSave: function (btn) {
        var grid = Ext.ComponentQuery.query('gridaccept')[0];

        var window = btn.up('window'),
            form = window.down('form'),
            vmForm = form.getViewModel(),
            printCheck = vmForm.get('printCheck'),
            is_resident = vmForm.get('is_resident'),
            callbackFn = vmForm.get('callbackFn'),// * makeOutputTransaction или checkPlayerAndReturnSlip- последний параметр PayF.editUserDataIfNeedAndMakeAction
            _this = grid.getController(); // * иначе this считается FormCardC, а мне нужно GridPayC
        var slipId = vmForm.get('slipId');

        if (form.getForm().isValid()) {
            var player = form.getRecord().getData();
           // player['passport_number'] = player['passer'] + player['pasnom'];

            // * сохранение данных клиента
            var objUrl = {
                class: 'Pos_Slips_Saveplayerforpayout', // * savePlayerForPayout
                params: {
                    slip_id: slipId,
                    player: player
                }
            };

            Ext.Ajax.request({
                url: Server.getUrl(objUrl),
                //url: 'store/players.php',
                success: function (resp) {
                    var res = Gui.JSONDecodeSafe(resp.responseText);
                    var newPlayer = res.player;
                    if (res.success) {
                        var mes = (res.mes) ? '<br/>' + res.mes : '';

                        // * при изменении статуса резидента, нужно выполнить декомпенсацию
                        if (is_resident != Number(player.is_resident)) {
                            // * компенсация ставки на конец света
                            var objUrlDec = {
                                class: 'Pos_Slips_Decompensateslip',
                                params: {
                                    slip_id: slipId
                                }
                            };

                            Ext.Ajax.request({
                                url: Server.getUrl(objUrlDec),
                                //url: 'store/decompensateSlip.php',
                                success: function (resp, opt) {
                                    var res = Gui.JSONDecodeSafe(resp.responseText);
                                    if (res.success) {
                                        Util.infoMes('Отмена компенсации конца света выполнена ' + mes);
                                    } else {
                                        Util.erMes(res.message);
                                    }
                                    callbackFn(slipId, printCheck, newPlayer);
                                },
                                failure: function (resp, opt) {
                                    Util.erMes('Ошибка декомпенсации ' + mes);
                                }
                            });
                        } else {
                            if (mes != '') {
                                Util.infoMes('Отмена компенсации конца света выполнена ', mes);
                            }
                            //console.log('колбек');
                            callbackFn(slipId, printCheck, newPlayer);
                        }
                    } else {
                        Util.erMes(res.message);
                    }
                },
                failure: _this.failureFn,
                method: 'GET',
                scope: this
            });

            window.close();
        } else {
            Util.erMes(Config.STR_FORM_ERROR);
        }
    },

    onClickCancel: function (btn) {
        var window = btn.up('window'),
            grid = Ext.ComponentQuery.query('gridaccept')[0];
        grid.store.rejectChanges();
        window.close();
    },

    failureFn: function (response) {
        try {
            var mes = Ext.decode(response.responseText);
            Util.erMes(mes);
        } catch (e) {
            return;
        }
    }


});