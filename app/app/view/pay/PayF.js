// * ф-ии для fill
Ext.define('Office.view.pay.PayF', {
    singleton: true,
    alternateClassName: ['PayF'],

    // * получим параметры ставки
    getSlipList: function (field) {
        var grid = Ext.ComponentQuery.query('gridpay')[0],
            vm = grid.getViewModel(),
            store = vm.getStore('pay'),
            buttonPrintBill = grid.down('#buttonPrintBill');

        buttonPrintBill.disable();
        store.removeAll(true); // * silent = true

        var slipId = vm.get('get_slipId'),
            code = vm.get('get_code');

        var objUrl = {
            class: 'Pos_Slips_Transaction', // * getTransactionSlipInfo
            params: {
                slipId: slipId,
                code: code
            }
        };
//todo разобраться с выплаты::без ндфл
        Ext.Ajax.request({
            //url: Ext.util.Format.format(Server.checkSlip(), Server.getToken(), slipId, code),
            url: Server.getUrl(objUrl),
            success: function (response) {
                if (response) {
                    var mes = Ext.decode(response.responseText);
//todo почему Pos_Slips_Transaction и Pos_Slips_Info возвращают разный status?
                    //vm.set('slipInfo', mes);
                    var use_ndfl = Util.getGlobalProp('use_ndfl');
                    if (mes.existsTransaction) {
                        Util.warnMes('Для данной ставки уже осуществлена выплата');
                        if (use_ndfl)
                            buttonPrintBill.enable();
                        return false;
                    } else if (!mes.slipId) {
                        if (mes.message && mes.message.indexOf('Access denied') != -1) {
                            Ext.Msg.confirm('Ошибка авторизации', str, function (button) {
                                if (button == 'yes') {
                                    Office.util.Setup.logout();
                                }
                            }, this);
                        } else
                            Util.warnMes(mes.message || 'Ставка не найдена', grid.down('#slipId'));
                    } else {
                        if (mes.externalSlipCash) {// * ставка сделана в другой кассе, и только там ее можно выплатить
                            Util.erMes('Данная ставка принята другой кассой. <br>Игрок может получить выплату только в кассе «<b>' + mes.externalSlipCash + '</b>»');
                        } else {
                            var mainController = Office.app.getController('Main');
                            mainController.storeLoadVm(grid);

                            vm.set('slipInfoTransaction', mes);
                        }
                    }
                } else {
                    Util.erMes('Нет ответа от сервера');
                }
            },
            failure: function (response) {
                try {
                    var mes = Ext.decode(response.responseText);
                    Util.erMes(mes || 'Ошибка данных');
                } catch (e) {
                    return;
                }
            },
            method: 'POST'
        });
        return true;
    },

// * форма редактирования личных данных, объединяет editUserDataIfNeedAndMakeOutputTransaction и editUserDataIfNeedAndReturnSlip
    editUserDataIfNeedAndMakeAction: function (slipInfo, printCheck, callbackFn, classForm) {
        var player = slipInfo.player || slipInfo;
        var slipId = slipInfo.slipId;

        if (player) {
            // * показать окно ввода данных игрока
            var form = Ext.create('Office.view.card.FormCardV');
            form.getViewModel().set('printCheck', printCheck);
            form.getViewModel().set('is_resident', player.is_resident);
            form.getViewModel().set('callbackFn', callbackFn);
            form.getViewModel().set('slipId', slipId);
            form.getViewModel().set('theClient', Ext.data.Model.create(player));

            // * не надо показывать поле штрихкод
            var fieldBarcode = form.down('#barcode');
            fieldBarcode.setDisabled(true);

            //if (parseInt(player.is_resident)) {
            //    // * для резидентов серия паспорта обязательна
            //    var fieldPasser = form.down('#passer');
            //    fieldPasser.allowBlank = false;
            //
            //    // * приведем формат полей к тому, как они хранятся в форме
            //    player.passer = Gui.getPassportSerie(player.passport_number, player.is_resident);
            //    player.pasnom = Gui.getPassportNumber(player.passport_number, player.is_resident);
            //} else {
            //    player.pasnom = player.passport_number;
            //}
            player.passport_issue_datetime = Gui.formatPassportIssueDate(player.passport_issue_datetime);
            player.birthday = Gui.formatPassportIssueDate(player.birthday);

            // * переопределим методы из FormCardC
            form.getController().onClickSave = classForm.onClickSave;
            form.getController().onClickCancel = classForm.onClickCancel;

            // console.info(Ext.data.Model.create(player));
            form.loadRecord(Ext.data.Model.create(player));

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
            Ext.defer(function () {
                form.getController().setNotEditable();
                //form.down('#is_resident').setReadOnly(true);
            }, 100);
        } else {
            Util.erMes('Стоит настройка "Налоговый учет", но не указан клиент.');
            //todo привязать клиента?
        }
    },


// * кнопка Сохранить в форме редактирования данных Игрока
    onClickSave: function (btn) {
        var grid = Ext.ComponentQuery.query('gridpay')[0],
            vm = grid.getViewModel(),
            slipId = vm.get('get_slipId'),
            code = vm.get('get_code');

        var window = btn.up('window'),
            form = window.down('form'),
            vmForm = form.getViewModel(),
            printCheck = vmForm.get('printCheck'),
            is_resident = vmForm.get('is_resident'),
            callbackFn = vmForm.get('callbackFn'),// * makeOutputTransaction или checkPlayerAndReturnSlip- последний параметр PayF.editUserDataIfNeedAndMakeAction
            _this = grid.getController(); // * иначе this считается FormCardC, а мне нужно GridPayC

        if (form.getForm().isValid()) {
            var player = form.getRecord().getData();
            //player['passport_number'] = player['passer'] + player['pasnom'];

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
                                    callbackFn(slipId, code, printCheck, player);
                                },
                                failure: function (resp, opt) {
                                    Util.erMes('Ошибка декомпенсации ' + mes);
                                }
                            });
                        } else {
                            if (mes != '') {
                                Util.infoMes('Отмена компенсации конца света выполнена ', mes);
                            }
                            callbackFn(slipId, code, printCheck, player);
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
            grid = Ext.ComponentQuery.query('gridpay')[0];
        grid.store.rejectChanges();
        grid.getViewModel().set('slipInfo', null);
        window.close();
    },

    // * проверка полноты данных клиента
    checkSlip: function (slipId, code, printCheck) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel(),
            globals = vmMenumain.getData().globals,
            use_ndfl = globals.use_ndfl,
            grid = Ext.ComponentQuery.query('gridpay')[0],
            vm = grid.getViewModel(),
            slipInfo = vm.get('slipInfo'),
            player = slipInfo.player;

        if (use_ndfl) {
            if (slipInfo && slipInfo.player_id > 0) {
                var pidDateStr = Gui.formatPassportIssueDate(player.passport_issue_datetime),
                    birthdayDateStr = Gui.formatPassportIssueDate(player.birthday);

                if (player.firstname != '' && player.address != '' && player.lastname != '' && player.passport_number != '' && player.passport_issuer != ''
                    && player.passport_issue_datetime != '' && Gui.isValidPassportIssueDate(pidDateStr) && player.birthday != '' && Gui.isValidPassportIssueDate(birthdayDateStr)) { // * выплачиваем
                    PayF.makeOutputTransaction(slipId, code, printCheck);
                } else // * форма редактирования личных данных
                    PayF.editUserDataIfNeedAndMakeAction(slipInfo, printCheck, PayF.makeOutputTransaction, PayF);
            } else // * форма редактирования личных данных
                PayF.editUserDataIfNeedAndMakeAction(slipInfo, printCheck, PayF.makeOutputTransaction, PayF);
        } else // * выплачиваем
            PayF.makeOutputTransaction(slipId, code, printCheck);
    },

    // * возврат ставки
    returnSlip: function (slipId) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel(),
            globals = vmMenumain.getData().globals,
            use_ndfl = globals.use_ndfl;

        var objUrl = {
            class: 'Pos_Slips_Fixreturn', // * store/returnSlip.php - return
            params: {
                slipId: slipId
            }
        };

        Ext.Ajax.request({
            url: Server.getUrl(objUrl),
            method: 'POST',
            success: function (resp, o) {
                var response = Ext.util.JSON.decode(resp.responseText);

                if (typeof(response.success) != 'undefined' && response.success) {
                    if (typeof(response.noPrint) == 'undefined') {
                        if (use_ndfl) {
                            Ext.defer(function () {
                                var user_id = Ext.util.Cookies.get('userId'),
                                    userLogin = Ext.util.Cookies.get('betzet_login'),
                                    userToken = Ext.util.Cookies.get('betzet_token'),
                                    objUrl = {
                                        class: 'Pos_Pageprinter_Print',
                                        params: {
                                            slipId: slipId
                                        }
                                    };
                                window.open(Server.getUrl(objUrl));
                            }, 10, this);
                        }
                    }
                    Util.infoMes('Возврат ставки произведен успешно');
                } else
                    Util.erMes('Ошибка возврата ставки ' + (response.errorText || ''));
            }
        });
    },

    madeBuyback: function (slipId) {
        var grid = Ext.ComponentQuery.query('gridaccept')[0],
            objUrl = {
                class: 'Pos_Slips_Buyback',
                params: {
                    slipId: slipId,
                    action: 'buyBack'
                }
            };
        if (slipId) {
            Ext.Ajax.request({
                url: Server.getUrl(objUrl),
                success: function (response) {
                    try {
                        var response = Ext.decode(response.responseText);
                        if (response.success) {
                            if (response.use_ndfl) {
                                var user_id = Ext.util.Cookies.get('userId'),
                                    userLogin = Ext.util.Cookies.get('betzet_login'),
                                    userToken = Ext.util.Cookies.get('betzet_token'),
                                    objUrl = {
                                        class: 'Pos_Pageprinter_Print',
                                        params: {
                                            slipId: response.slipId
                                        }
                                    };
                                window.open(Server.getUrl(objUrl));
                            }
                            Util.okMes('Выкуп ставки произведен успешно');
                        }
                        else {
                            if (response.errorText)
                                Util.erMes(response.errorText);
                            else
                                Util.erMes(response.mesage || 'Не известная ошибка. Выкуп не возможен.');
                        }
                    } catch (e) {
                        return;
                    }
                    grid.store.reload();
                },
                failure: function (response) {
                    try {
                        var mes = Ext.decode(response.responseText);
                        Util.erMes(mes);
                    } catch (e) {
                        return;
                    }
                    grid.store.reload();
                },
                method: 'POST'
            });
        } else {
            console.info('Внимание: slipId не определен');
        }
    },

    checkPlayerAndReturnSlip: function (slipId, printCheck, player) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel(),
            globals = vmMenumain.getData().globals,
            use_ndfl = globals.use_ndfl;

        if (use_ndfl) {
            if (player.id > 0) {
                var pidDateStr = Gui.formatPassportIssueDate(player.passport_issue_datetime),
                    birthdayDateStr = Gui.formatPassportIssueDate(player.birthday);
                if (player.firstname != '' && player.address != '' && player.lastname != '' && player.passport_number != '' && player.passport_issuer != ''
                    && player.passport_issue_datetime != '' && Gui.isValidPassportIssueDate(pidDateStr) && player.birthday != '' && Gui.isValidPassportIssueDate(birthdayDateStr)) {
                    PayF.returnSlip(slipId);
                } else // * форма редактирования данных клиента
                    PayF.editUserDataIfNeedAndMakeAction(player, printCheck, PayF.checkPlayerAndReturnSlip, PayF);
            } else// * форма редактирования данных клиента
                PayF.editUserDataIfNeedAndMakeAction(player, printCheck, PayF.checkPlayerAndReturnSlip, PayF);
        } else // * возврат ставки
            PayF.returnSlip(slipId);
    },

    buyback: function (slipId, printCheck, player) {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel(),
            globals = vmMenumain.getData().globals,
            use_ndfl = globals.use_ndfl;

        if (use_ndfl) {
            if (player.id > 0) {
                var pidDateStr = Gui.formatPassportIssueDate(player.passport_issue_datetime),
                    birthdayDateStr = Gui.formatPassportIssueDate(player.birthday);
                if (player.firstname != '' && player.address != '' && player.lastname != '' && player.passport_number != '' && player.passport_issuer != ''
                    && player.passport_issue_datetime != '' && Gui.isValidPassportIssueDate(pidDateStr) && player.birthday != '' && Gui.isValidPassportIssueDate(birthdayDateStr)) {
                    PayF.madeBuyback(slipId);
                } else // * форма редактирования данных клиента
                    PayF.editUserDataIfNeedAndMakeAction(player, printCheck, PayF.buyback, PayF);
            } else// * форма редактирования данных клиента
                PayF.editUserDataIfNeedAndMakeAction(player, printCheck, PayF.buyback, PayF);
        } else // * выкуп ставки
            PayF.madeBuyback(slipId);
    },

    editUserDataIfNeedAndDoBuyback: function (response, slipId) {
        Util.erMes('Игрока нет или не все его данные заполнены');
    },

    // * произвести выплату
    makeOutputTransaction: function (slipId, code, printCheck) {
        var _this = this,
            objUrl = {
                class: 'Pos_Slips_Transactions_Payout',
                params: {
                    cashId: Ext.util.Cookies.get('userId'),
                    addStakeSum: true,
                    rows: {
                        id: null,
                        source_or_dest_user_id: Ext.util.Cookies.get('userId'),
                        slip_id: slipId,
                        code: code
                    }
                }
            };

        Ext.Ajax.request({
            url: Server.getUrl(objUrl),
            success: function (response) {
                if (response) {
                    var mes = Ext.decode(response.responseText);
                    if (mes.success) {
                        Util.infoMes('Выплата проведена успешно');

                        var grid = Ext.ComponentQuery.query('gridpay')[0];

                        // * печать чека, если нужно
                        var menumain = Ext.ComponentQuery.query('menumain')[0],
                            vmMenumain = menumain.getViewModel(),
                            globals = vmMenumain.getData().globals,
                            use_ndfl = globals.use_ndfl;
                        if (use_ndfl && printCheck) {
                            grid.getController().onButtonPrintBill();
                        }

                        _this.resetData();
                    } else
                        Util.erMes(mes.message);
                } else
                    PayF.failureFn(response);
            },
            failure: PayF.failureFn,
            method: 'GET',
            scope: this
        });
    },

    // * очистка раздела от данных предыдущей выплаты
    resetData: function () {
        var grid = Ext.ComponentQuery.query('gridpay')[0],
            vm = grid.getViewModel();

        vm.getStore('pay').removeAll(true);
        vm.set('slipInfo', null);
        vm.set('is_win', null);
        grid.down('#slipId').setValue('');
        grid.getView().refresh();
    },

    failureFn: function (response) {
        try {
            var mes = Ext.decode(response.responseText);
            Util.erMes(mes);
        } catch (e) {
            return;
        }
    },

    // * отправка данных по ставке на монитор игрока
    sendPaysToMonitor: function () {
        var gridpay = Ext.ComponentQuery.query('gridpay')[0],
            vm = gridpay.getViewModel(),
            slipInfo = vm.get('slipInfo'),
            storeStatus = vm.getStore('statusbets'),
            recStatus = storeStatus.findRecord('id', slipInfo.status, 0, false, true, true),
            slipStatusName = recStatus.get('value'),
            arrBets = [];

        var data = {
            "slipStatus": slipInfo.status,
            "slipStatusName": slipStatusName,
            "coupon_number": vm.get('slipRawValue'),
            "is_settled": slipInfo.status != 2,// * ?
            "is_win": vm.get('is_win'),
            "stake_size": slipInfo.stake,
            "coef": slipInfo.fin_coeff,
            "to_pay": slipInfo.to_pay
        };

        if (vm.get('is_win')) {
            data['tax_sum'] = slipInfo.tax_sum;
            data['tax_percent'] = slipInfo.tax_percent;
        }

        if (slipInfo.children) {
            data['slipType'] = slipInfo.type;
            data['bets_in_system'] = slipInfo.count_bet_in_system || 0;
            data['slipTypeName'] = slipInfo.operationText;

            Ext.Array.each(slipInfo.children, function (item, idx) {
                var rec = new Object(),
                    is_settled = slipInfo.is_calculated == 1 ? true : false;

                rec['home'] = item['homeName'];
                rec['away'] = item['awayName'];
                rec['bet_type'] = item['outcomeName'];
                rec['coef'] = item['coefficient'];
                rec['outcome'] = item['bet_result'] == -1 ? "Нет" : "Да"; // * ?
                rec['outcome_text'] = item['result_text'];
                rec['scores'] = item['score'];
                rec['is_settled'] = is_settled;// * 2 - не рассчитана
                rec['is_win'] = item['bet_result'] == 1;

                arrBets.push(rec);
            });


        } else {
            data['slipType'] = 0;
            data['slipTypeName'] = "Одинар";

            var is_settled = slipInfo.bet_result != 2 ? true : false;

            var rec = new Object();

            rec['home'] = slipInfo.homeName;
            rec['away'] = slipInfo.awayName;
            rec['bet_type'] = slipInfo.outcomeName;
            rec['coef'] = slipInfo.coefficient;
            rec['outcome'] = "Нет"; // * ?
            rec['outcome_text'] = slipInfo.result_text;
            rec['scores'] = slipInfo.score;
            rec['is_settled'] = is_settled;
            rec['is_win'] = vm.get('is_win');

            arrBets.push(rec);
        }

        data['bets'] = arrBets;

        FayeClient.sendCommand({command: 'payout', data: data});
    }
});