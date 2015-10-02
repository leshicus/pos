Ext.define('Office.view.accept.contextmenu.MenuAcceptC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.util.Server'
    ],
    alias: 'controller.menuaccept',
    alternateClassName: ['MenuAcceptC'],
    control: {
        '#menuPrint': {
            click: function (button) {
                var grid = Ext.ComponentQuery.query('gridaccept')[0],
                    selection = grid.getSelectionModel().getSelection()[0],
                    slipId = selection.get('slip_id'),
                    user_id = Ext.util.Cookies.get('userId'),
                    userLogin = Ext.util.Cookies.get('betzet_login'),
                    userToken = Ext.util.Cookies.get('betzet_token'),
                //url = Office.util.Server.getPageprinter() + '?slipId=' + slipId + '&user_id=' + user_id + '&username=' + userLogin + '&token=' + userToken + '&secondTime=true',
                    objUrl = {
                        class: 'Pos_Pageprinter_Print',
                        params: {
                            slipId: slipId,
                            user_id: user_id,
                            username: userLogin,
                            token: userToken,
                            secondTime: true
                        }
                    };
                window.open(Server.getUrl(objUrl));
            }
        },
        '#menuCopy': {
            click: function (button) {
                var grid = Ext.ComponentQuery.query('gridaccept')[0],
                    selection = grid.getSelectionModel().getSelection()[0],
                    slipId = selection.get('slip_id'),
                    objUrl = {
                        class: 'Pos_Slips_Eventsinfofromslip',
                        params: {
                            slipId: slipId
                        }
                    };

                Ext.Msg.confirm('Предупреждение', 'Cкопировать ставку №' + +slipId + '?<br/>Купон будет очищен!', function (btn) {
                    if (btn == 'yes') {
                        // * очистим купон, если он не чист
                        var fill = Ext.ComponentQuery.query('#main')[0];
                        if (fill) {
                            fill.getController().clickClearBet();
                        }

                        Ext.Ajax.request({
                            url: Server.getUrl(objUrl),
                            success: function (response) {
                                var betsInfo = Gui.JSONDecodeSafe(response.responseText),
                                    arrBets = betsInfo.respond;

                                if (betsInfo.success) {
                                    Util.warnMes('Заявка отправлена в купон');

                                    // * реально отпраляем заявку в localStorage
                                    var menumain = Ext.ComponentQuery.query('menumain')[0],
                                        vmMenumain = menumain.getViewModel(),
                                        storeBasketLocal = vmMenumain.getStore('basket_localstorage'),
                                        multi_value = 0,
                                        system_value = 0,
                                        localStorage = Ext.util.LocalStorage.get('newpos'),
                                        isLive = 0;

                                    storeBasketLocal.removeAll();

                                    // * перебираем ставки и добавляем в локальное хранилище
                                    Ext.Array.each(arrBets, function (item) {
                                        var type = item.isLive == '0' ? 'line' : 'live';

                                        isLive = item.isLive;

                                        // * type=0 одинар, 1 экспресс, 2 система "2 из ...", 3 система "3 из ...", 4 группа одинаров
                                        // * поэтому для определения системы используем поле countBetInSystem
                                        // * а группу одинаров ввели для крыс, чтобы одним чеком печатать
                                        if (parseInt(item.type) > 0) {
                                            multi_value = item.sum;
                                        }

                                        if (item.countBetInSystem)
                                            system_value = item.countBetInSystem;

                                        storeBasketLocal.add({
                                            query: {
                                                coefId: item.cid,
                                                coefTypeId: item.outcomeId,
                                                coefName: item.shortName,
                                                event_id: item.eventId,
                                                arrCoef: [item.cid, item.outcomeId, parseFloat(item.value)],
                                                amount: parseInt(item.sum),
                                                arrBasis: [item.oid],
                                                min: parseInt(item.sum),
                                                max: parseInt(item.sum),
                                                type: type, // * line/live/
                                                multi_value: multi_value,
                                                system_value: system_value
                                            }
                                        });
                                    }, this);

                                    // * переключим вкладку в Ставки::События
                                    localStorage.setItem('activeEventTab', isLive);
                                } else {
                                    if (betsInfo.message)
                                        Util.erMes(betsInfo.message);
                                    else
                                        Util.erMes('Заявка не отправлена в купон.');
                                }
                            },
                            failure: function (response) {
                                var mes = Gui.JSONDecodeSafe(response.responseText);
                                Util.erMes(mes);
                                console.info(mes);
                            },
                            method: 'POST'
                        });
                    }
                });
            }
        },
        '#menuConfirm': {
            click: function (button) {
                var grid = Ext.ComponentQuery.query('gridaccept')[0],
                    selection = grid.getSelectionModel().getSelection()[0],
                    slipId = selection.get('slip_id');

                Ext.Msg.prompt('Подтверждение ставки', 'Пароль:', function (btn, text) {
                    if (btn == 'ok') {
                        objUrl = {
                            class: 'Pos_Slips_Acceptslip',
                            params: {
                                slipId: slipId,
                                accept_password: text
                            }
                        };

                        Ext.Ajax.request({
                            url: Server.getUrl(objUrl),
                            success: function (response) {
                                try {
                                    var response = Ext.decode(response.responseText);
                                    if (response.success) {
                                        Util.okMes('Ставка подтверждена успешно');
                                        //showBalance();
                                    }
                                    else {
                                        if (response.errorText)
                                            Util.erMes(response.errorText);
                                        else
                                            Util.erMes('Выкуп не возможен');
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
                    }
                });
            }
        },
        '#menuBuyout': {
            click: function (button) {
                me = this;
                var grid = Ext.ComponentQuery.query('gridaccept')[0],
                    selection = grid.getSelectionModel().getSelection()[0],
                    slipId = selection.get('slip_id'),
                    objUrl = {
                        class: 'Pos_Slips_Buyback',
                        params: {
                            slipId: slipId,
                            action: 'getPenalty'
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
                                        if (response.player_id > 0) {

                                            var pidDate = response.player.passport_issue_datetime;
                                            pidDateStr = Gui.formatPassportIssueDate(pidDate);
                                            if (response.player.firstname != '' && response.player.lastname != '' && response.player.passport_number != '' && response.player.passport_issuer != ''
                                                && response.player.passport_issue_datetime != '' && Gui.isValidPassportIssueDate(pidDateStr)) {
                                                Ext.Msg.confirm('Подтверждение', 'Вы действительно хотите осуществить выкуп ставки №' + slipId + '? Размер ' + ((response.penalty >= 0) ? 'комиссии' : 'бонуса') + ' при отказе от ставки: ' + ((response.penalty >= 0) ? response.penalty : (-response.penalty)) + ' (' + response.penaltyText + ')', function (btn) {
                                                    if (btn == 'yes') {
                                                        PayF.madeBuyback(slipId);
                                                    }
                                                });
                                            }
                                            else {
                                                //PayF.editUserDataIfNeedAndDoBuyback(response, slipId);
                                                PayF.editUserDataIfNeedAndMakeAction(response, true, PayF.buyback, AcceptF);
                                            }
                                        }
                                        else {
                                            //PayF.editUserDataIfNeedAndDoBuyback(response, slipId);

                                            PayF.editUserDataIfNeedAndMakeAction(response, true, PayF.buyback, AcceptF);
                                        }
                                    }
                                    else {
                                        Ext.Msg.confirm('Подтверждение', 'Вы действительно хотите осуществить выкуп ставки №' + slipId + '? Размер ' + ((response.penalty >= 0) ? 'комиссии' : 'бонуса') + ' при отказе от ставки: ' + ((response.penalty >= 0) ? response.penalty : (-response.penalty)) + ' (' + response.penaltyText + ')', function (btn) {
                                            if (btn == 'yes') {
                                                PayF.madeBuyback(slipId);
                                            }
                                        });
                                    }
                                }
                                else {
                                    if (response.errorText)
                                        Util.erMes(response.errorText);
                                    else
                                        Util.erMes('Выкуп не возможен');
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
            }
        },
        '#menuReturn': {//todo сделать
            click: function (button) {
                var grid = Ext.ComponentQuery.query('gridaccept')[0],
                    selection = grid.getSelectionModel().getSelection()[0],
                    slipId = selection.get('slip_id'),
                    objUrl = {
                        class: 'Pos_Slips_Playerinfo',
                        params: {
                            slipId: slipId
                        }
                    };

                Ext.Msg.confirm('Подтверждение', 'Вы действительно хотите сделать фиксированный возврат по ставке №' + slipId, function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: Server.getUrl(objUrl),
                            success: function (response) {
                                var slipInfo = Gui.JSONDecodeSafe(response.responseText),
                                    player = slipInfo.player;
                                slipInfo.slipId = slipId;
                                if (slipInfo.success) {
                                    if (slipInfo.use_ndfl) {
                                        if (player && player.id > 0) {
                                            var pidDate = player.passport_issue_datetime,
                                                pidDateStr = Gui.formatPassportIssueDate(pidDate);
                                            if (player.firstname != '' && player.address != '' && player.lastname != '' && player.passport_number != '' && player.passport_issuer != ''
                                                && player.passport_issue_datetime != '' && Gui.isValidPassportIssueDate(pidDateStr)) {
                                                PayF.returnSlip(slipId);
                                            } else {
                                                PayF.editUserDataIfNeedAndMakeAction(slipInfo, true, PayF.checkPlayerAndReturnSlip, AcceptF);
                                            }
                                        } else {
                                            PayF.editUserDataIfNeedAndMakeAction(slipInfo, true, PayF.checkPlayerAndReturnSlip, AcceptF);
                                        }
                                    } else {
                                        PayF.returnSlip(slipId);
                                    }

                                    grid.store.reload();
                                } else {
                                    if (player && player.id > 0) {
                                        var pidDate = player.passport_issue_datetime,
                                            pidDateStr = Gui.formatPassportIssueDate(pidDate);
                                        if (player.firstname != '' && player.address != '' && player.lastname != '' && player.passport_number != '' && player.passport_issuer != ''
                                            && player.passport_issue_datetime != '' && Gui.isValidPassportIssueDate(pidDateStr)) {
                                            PayF.returnSlip(slipId);
                                        } else {
                                            PayF.editUserDataIfNeedAndMakeAction(slipInfo, true, PayF.checkPlayerAndReturnSlip, AcceptF);
                                        }
                                    } else {
                                        PayF.editUserDataIfNeedAndMakeAction(slipInfo, true, PayF.checkPlayerAndReturnSlip, AcceptF);
                                    }
                                    // Util.erMes(slipInfo.message);
                                }
                            },
                            failure: function (response) {
                                var mes = Gui.JSONDecodeSafe(response.responseText);
                                Util.erMes(mes);
                                console.info(mes);
                            },
                            method: 'POST'
                        });
                    }

                });
            }
        },

        '#menuBlock': {
            click: function (button) {
                var grid = Ext.ComponentQuery.query('gridUser')[0],
                    selection = grid.getSelected();
                Ext.Msg.confirm('Блокировка пользователя', 'Заблокировать учетную запись пользователя?', function (button) {
                    if (button == 'yes') {
                        var now = new Date(),
                            date = [App.util.Util.reverseDate(now.getDate()), App.util.Util.reverseDate(now.getMonth() + 1), now.getFullYear()].join('.')
                                + ' ' + now.getHours() + ':' + now.getMinutes();
                        Ext.each(selection, function (item) {
                            item.set('enddate', date);
                        });
                        //grid.store.sync();
                    }
                }, this);
            }
        },
        '#menuUnblock': {
            click: function (button) {
                var grid = Ext.ComponentQuery.query('gridUser')[0],
                    selection = grid.getSelected();
                Ext.Msg.confirm('Разблокировка пользователя', 'Разблокировать учетную запись пользователя?', function (button) {
                    if (button == 'yes') {
                        Ext.each(selection, function (item) {
                            item.set('enddate', App.util.Util.nullDate);
                        });
                        //grid.store.sync();
                    }
                }, this);

            }
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
            player['passport_number'] = player['passer'] + player['pasnom'];

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
        }
    },

    onClickCancel: function (btn) {
        var window = btn.up('window'),
            grid = Ext.ComponentQuery.query('gridpay')[0];
        grid.store.rejectChanges();
        grid.getViewModel().set('slipInfo', null);
        window.close();
    },
    //formatPassportIssueDate(datetimeStr) {
    //    var IsoDateRe = new RegExp("^([1-9][0-9]{3})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$");
    //    var matches = IsoDateRe.exec(datetimeStr);
    //    if (!matches) return '';
    //    var date = new Date(new String(datetimeStr).replace(/-/g,"/"));
    //    var dd = date.getDate();
    //    var mm = date.getMonth()+1; //January is 0!
    //    var yyyy = date.getFullYear();
    //    if(dd<10){dd='0'+dd}
    //    if(mm<10){mm='0'+mm}
    //    var result = dd+'-'+mm+'-'+yyyy;
    //    return result;
    //},
    //isValidPassportIssueDate(datetimeStr) {
    //    var IsoDateRe = new RegExp("^([0-9]{2})-([0-9]{2})-([1-9][0-9]{3})$");
    //    var matches = IsoDateRe.exec(datetimeStr);
    //    if (!matches) return false;
    //    var now = new Date();
    //    var parts = datetimeStr.match(/(\d+)/g);
    //    var date = new Date(parts[2], parts[1]-1, parts[0]); // note parts[1]-1
    //    var dd = date.getDate();
    //    var mm = date.getMonth()+1; //January is 0!
    //    var yyyy = date.getFullYear();
    //    if(dd<10){dd='0'+dd}
    //    if(mm<10){mm='0'+mm}
    //    return ((dd != '00') && (mm != '00') && (yyyy > 1900) && (yyyy <= now.getFullYear()));
    //},
    //madeBuyback(slipId)
    //{
    //    var grid = Ext.ComponentQuery.query('gridaccept')[0],
    //        objUrl = {
    //                    class: 'Pos_Slips_Buyback',
    //                    params: {
    //                        slipId: slipId,
    //                        action: 'buyBack'
    //                    }
    //                };
    //    if (slipId) {
    //        Ext.Ajax.request({
    //            url: Server.getUrl(objUrl),
    //            success: function (response) {
    //                try {
    //                    var response = Ext.decode(response.responseText);
    //                    if (response.success)
    //                    {
    //                        if (response.use_ndfl) {
    //                            var user_id = Ext.util.Cookies.get('userId'),
    //                                userLogin = Ext.util.Cookies.get('betzet_login'),
    //                                userToken = Ext.util.Cookies.get('betzet_token'),
    //                                url = Office.util.Server.getPageprinter() + '?slipId=' + response.slipId + '&penaltySlipId=' + response.penaltySlipId + '&user_id=' + user_id + '&username=' + userLogin + '&token=' + userToken + '&secondTime=true',
    //                                objUrl = {
    //                                    class: 'Pos_Pageprinter_Print',
    //                                    params: {
    //                                        slipId: response.slipId,
    //                                        penaltySlipId: response.penaltySlipId,
    //
    //                                        user_id: user_id,
    //                                        username: userLogin,
    //                                        token: userToken,
    //                                        secondTime: true
    //                                    }
    //                                };
    //                            window.open(Server.getUrl(objUrl));
    //                        }
    //                        Util.okMes('Выкуп ставки произведен успешно');
    //                    }
    //                    else {
    //                        if (response.errorText)
    //                            Util.erMes('Ошибка', response.errorText);
    //                        else
    //                            Util.erMes('Не известная ошибка', 'Выкуп не возможен.');
    //                    }
    //                } catch (e) {
    //                    return;
    //                }
    //                grid.store.reload();
    //            },
    //            failure: function (response) {
    //                try {
    //                    var mes = Ext.decode(response.responseText);
    //                    Util.erMes('Ошибка', mes);
    //                } catch (e) {
    //                    return;
    //                }
    //                grid.store.reload();
    //            },
    //            method: 'POST'
    //        });
    //    } else {
    //        console.info('Внимание: slipId не определен');
    //    }
    //},
    //editUserDataIfNeedAndDoBuyback(response, slipId)
    //{
    //    Util.erMes('Ошибка', 'Игрока нет или не все его данные заполнены');
    //},
    //returnSlip(slipId, callback){
    //    var grid = Ext.ComponentQuery.query('gridaccept')[0],
    //        objUrl = {
    //                    class: 'Pos_Slips_Fixreturn',
    //                    params: {
    //                        slipId: slipId
    //                    }
    //                };
    //    Ext.Ajax.request({
    //        url: Server.getUrl(objUrl),
    //        success: function (response) {
    //            try {
    //                var response = Ext.decode(response.responseText);
    //                if (response.success)
    //                {
    //
    //                    if(typeof(response.noPrint) == 'undefined')
    //                    {
    //                        if (response.use_ndfl)
    //                        {
    //                            /*var url = '/office/store/pageprinter.php?slipId=' + slipId + '&login=' + $.cookie('betzet_login') + '&token=' + $.cookie('betzet_token');
    //                            window.open(url);*/
    //
    //                            var user_id = Ext.util.Cookies.get('userId'),
    //                            userLogin = Ext.util.Cookies.get('betzet_login'),
    //                            userToken = Ext.util.Cookies.get('betzet_token'),
    //                            url = Office.util.Server.getPageprinter() + '?slipId=' + slipId + '&username=' + userLogin + '&token=' + userToken,
    //                            objUrl = {
    //                                class: 'Pos_Pageprinter_Print',
    //                                params: {
    //                                    slipId: slipId,
    //                                    login: userLogin,
    //                                    token: userToken,
    //                                }
    //                            };
    //                        window.open(Server.getUrl(objUrl));
    //                        }
    //                    }
    //                    Util.okMes('Возврат ставки произведен успешно');
    //                }
    //                else {
    //                    if (response.errorText)
    //                        Util.erMes('Ошибка', response.errorText);
    //                    else
    //                        Util.erMes('Не известная ошибка', 'Выкуп не возможен.');
    //                }
    //            } catch (e) {
    //                return;
    //            }
    //            grid.store.reload();
    //        },
    //        failure: function (response) {
    //            try {
    //                var mes = Ext.decode(response.responseText);
    //                Util.erMes('Ошибка', mes);
    //            } catch (e) {
    //                return;
    //            }
    //            grid.store.reload();
    //        },
    //        method: 'POST'
    //    });
    //},
    //editUserDataIfNeedAndReturnSlip(player, slipId) {
    //    Util.erMes('Ошибка', 'Игрока нет или не все его данные заполнены');
    //}
});
