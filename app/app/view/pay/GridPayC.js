Ext.define('Office.view.pay.GridPayC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridpay',

    listen: {
        component: {
            'tool[type=close]': {
                click: function (button) {
                    console.log('tool[type=close]');
                    var grid = button.up('panel'),
                        store = grid.getViewModel().getStore('pay');
                    store.removeAll();
                }
            }
        },
        store: {
            '#pay': {
                // * заполняем стор данными, таким образом, что строками его становятся поля объекта
                // * который возвращает сервер (json)
                // * при этом берутся только те поля, которые описаны в data viewmodel.gridpay
                // * и показывается тот текст, который там описан, вместо имен полей
                load: function (store, arr) {
                    var mainController = Office.app.getController('Main');
                    if(mainController.askLogoutIfAccessDenied(store)){
                        var grid = this.getView(),
                            buttonsMake = grid.down('#buttonsMake'),
                            resultArr = Array(),
                            vm = this.getViewModel(),
                            pattern = vm.getData()['pattern'],
                            arrPattern = Ext.Object.getKeys(pattern); // * массив объектов из vm.data, показывающий какие поля нужно отображать
                        if (arr) {
                            if (arr.length > 0) {
                                var objData = arr[0].data; // * объект с вернувшимися параметрами
                                if (objData) {
                                    var objRows = objData.rows; // * параметры ставки
                                    if (objRows) {
                                        // Ext.util.Cookies.set('userId', objRows.user_id); //todo убрать это когда перейдем на api
                                        var objPlayer = objRows.player, // * параметры игрока
                                            arrEvent = objRows.children; // * массив объектов событий
                                        if (objPlayer) {
                                            var objIn = Ext.Object.merge(objData, objRows, objPlayer);
                                            Ext.Array.each(arrPattern, function (key) { // * в массиве элементы расположены в требуемом порядке отображения
                                                if (typeof pattern[key] == 'string') { // * не нужно брать стор pay, который сюда зачем-то попадает
                                                    var param = pattern[key],
                                                        value = objIn[key],
                                                        objParams = {},
                                                        result,
                                                        score;
                                                    // * сформируем значения произвольных полей (типа _fio, _gambler)
                                                    switch (key) {
                                                        /*case '_slip':
                                                         if (arrEvent && arrEvent.length > 0) {
                                                         value = objIn['slip_id'] || arrEvent[0]['slip_id'];
                                                         } else {
                                                         value = objIn['slip_id'];
                                                         }
                                                         break;*/
                                                        case '_status':
                                                            var status = objIn['status'],
                                                                storeStatusbets = vm.getStore('statusbets'),
                                                                rec = storeStatusbets.findRecord('id', status, 0, false, true, true);
                                                            // * нужно написать статус и скрыть кнопку Выплатить, т.к. все статусы негативные
                                                            if (rec) {
                                                                value = rec.get('value');
                                                                // * покажем кнопку Выплатить
                                                                if (status == 1) {
                                                                    buttonsMake.show();
                                                                    buttonsMake.enable();
                                                                } else
                                                                    buttonsMake.hide();
                                                            } else {
                                                                value = '???';
                                                                buttonsMake.hide();
                                                            }
                                                            break;
                                                        case '_ndfl':
                                                            var tax_sum = objIn['tax_sum'] || '',
                                                                tax_percent = objIn['tax_percent'] || '';
                                                            if (tax_sum)
                                                                value = tax_sum + ' (' + tax_percent + '%)';
                                                            break;
                                                        case '_fio':
                                                            var lastname = objIn['lastname'] || '',
                                                                firstname = objIn['firstname'] || '',
                                                                patronymic_name = objIn['patronymic_name'] || '';
                                                            if (lastname)
                                                                value = lastname + ' ' + firstname + ' ' + patronymic_name;
                                                            break;
                                                        case '_to_pay_all':
                                                            var to_pay = objIn['to_pay'] || '';
                                                            if (to_pay)
                                                                value = '<span style="font-weight: bold;">' + to_pay + '</span>';
                                                            break;
                                                        case '_resident':
                                                            value = objIn['is_resident'] == 1 ? 'РФ' : 'иностранец';//todo уточнить насчет 'иностранец';
                                                            break;
                                                    }

                                                    if (key == '_event') { // * добрались до списка событий
                                                        if (arrEvent) { // * экспресс, есть children
                                                            // * цикл по добавлению элементов событий в результрующий массив
                                                            Ext.Array.each(arrEvent, function (obj) {
                                                                objParams = {
                                                                    event: obj['operation'],
                                                                    coeff: obj['coefficient'],
                                                                    result: obj['result_text'],
                                                                    score: obj['score']
                                                                };
                                                                resultArr.push(objParams);
                                                            });
                                                        } else { // * одинар (children: null)
                                                            objParams = {
                                                                event: objIn['operation'],
                                                                coeff: objIn['coefficient'],
                                                                result: objIn['result_text'],
                                                                score: objIn['score']
                                                            };
                                                            resultArr.push(objParams);
                                                        }
                                                    } else { // * все кроме списка событий
                                                        objParams = {
                                                            param: param,
                                                            value: value,
                                                            result: result,
                                                            score: score
                                                        };
                                                        resultArr.push(objParams);
                                                    }
                                                }
                                            });
                                            if (resultArr.length > 0) {
                                                store.loadData(resultArr);
                                            }
                                        } else {
                                            Ext.Msg.alert('Ошибка', objData.message || ' Нет данных о клиенте');
                                        }
                                    } else {
                                        Ext.Msg.alert('Ошибка', objData.message || ' Нет данных по ставке');
                                    }
                                } else {
                                    Ext.Msg.alert('Ошибка', objData.message || arr[0] || ' Нет данных');
                                }
                            } // * пришли пустые значения
                        }// * вообще ничего не пришло
                    }

                }
            }
        }
    },
    // * раскрывает содержимое ячейки (нужно когда длинный текст не помещается в ячейке)
    onCelldblclick: function (cell, td, cellIndex, record, tr, rowIndex, e) {
        var mainController = Office.app.getController('Main');
        mainController.onCelldblclick(cell, td, cellIndex, record, tr, rowIndex, e);
    },
    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            this.getSlipList(field);
        }
    },
    getSlipList: function (field) {
        var mainController = Office.app.getController('Main'),
            grid = this.getView(),
            store = grid.getViewModel().getStore('pay'),
            buttonPrintBill = grid.down('#buttonPrintBill'),
            buttonsMake = grid.down('#buttonsMake');
        buttonsMake.hide();
        buttonPrintBill.disable();
        store.removeAll(true); // * silent = true
        grid.getView().refresh();
        //Ext.util.Cookies.clear('userId');
        var value = field.getValue(),
            slipId,
            code = '',
            params;
        if (value.indexOf('x') > 0) { // * номер_х_код
            slipId = value.split('x')[0];
            code = value.split('x')[1];
        } else {
            slipId = value;
        }
        // * проверим, не была ли уже выплачена данная ставка
        var objUrl = {
            class: 'Pos_Slips_Transaction',
            params: {
                slipId: slipId,
                code: code
            }
        };
        Ext.Ajax.request({
            //url: Ext.util.Format.format(Server.checkSlip(), Server.getToken(), slipId, code),
            url: Server.getUrl(objUrl),
            success: function (response) {
                try {
                    var mes = Ext.decode(response.responseText);
                    if (mes.existsTransaction) {
                        Utilities.toast('Внимание', 'Для данной ставки уже осуществлена выплата');
                        buttonPrintBill.enable();
                        return false;
                    } else if (!mes.slipId) {
                        Utilities.toast('Ошибка', mes.message || 'Ставка не найдена');
                    } else {
                        //mainController.onAddFilterVm(field, null, null, null, true, store, grid);
                        mainController.storeLoadVm(grid);
                    }
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
        return true;
    },
    // * кнопка Выплатить с чеком
    onButtonMakeBill: function () {
        var grid = this.getView(),
            value = grid.down('#slipId').getValue(),
            slipId,
            code;

        if (value.indexOf('x') > 0) { // * номер_х_код
            slipId = value.split('x')[0];
            code = value.split('x')[1];
        } else {
            slipId = value;
        }

        var objUrl = {
            class: 'Pos_Cash_Transactions_Create',
            params: {
                cashId: Ext.util.Cookies.get('userId'),
                addStakeSum: true,
                rows: {
                    id: null,
                    source_or_dest_user_id: Ext.util.Cookies.get('userId'),
                    type_id: 2,
                    sum: 1,
                    slip_id: slipId,
                    code: code
                },
                code: code
            }
        };
        Ext.Ajax.request({
            url: Server.getUrl(objUrl),
            success: function (response) {
                try {
                    var mes = Ext.decode(response.responseText);
                    if (mes.success) {
                        /*   var url = Server.getPageprinter() + '?slipId=' + slipId + '&login=' + Ext.util.Cookies.get('betzet_login') + '&token=' + Ext.util.Cookies.get('betzet_token');
                         window.open(url);*/
                        var objUrlPrint = {
                            class: 'Pos_Pageprinter_Print',
                            params: {
                                slipId: slipId,
                                login: Ext.util.Cookies.get('betzet_login'),
                                token: Ext.util.Cookies.get('betzet_token')
                            }
                        };
                        window.open(Server.getUrl(objUrlPrint), '_blank');
                        Utilities.toast('Успех', 'Выплата проведена успешно');
                        //this.getSlipList(grid.down('#slipId'));
                        grid.getViewModel().getStore('pay').reset();
                    } else {
                        Ext.Msg.alert('Ошибка', mes.message);
                    }
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
            method: 'GET',
            scope: this
        });
    },
    // * кнопка Выплатить без чека (без code)
    onButtonMake: function () {
        var grid = this.getView(),
            value = grid.down('#slipId').getValue(),
            slipId,
            code;

        if (value.indexOf('x') > 0) { // * номер_х_код
            slipId = value.split('x')[0];
            code = value.split('x')[1];
        } else {
            slipId = value;
        }
        var objUrl = {
            class: 'Pos_Cash_Transactions_Create',
            params: {
                cashId: Ext.util.Cookies.get('userId'),
                addStakeSum: true,
                rows: {
                    id: null,
                    source_or_dest_user_id: Ext.util.Cookies.get('userId'),
                    type_id: 2,
                    sum: 1,
                    slip_id: slipId
                }
            }
        };
        Ext.Ajax.request({
            url: Server.getUrl(objUrl),
            success: function (response) {
                try {
                    var mes = Ext.decode(response.responseText);
                    if (mes.success) {
                        Utilities.toast('Успех', 'Выплата проведена успешно');
                        //this.getSlipList(grid.down('#slipId'));
                        grid.getViewModel().getStore('pay').reset();
                    } else {
                        Ext.Msg.alert('Ошибка', mes.message);
                    }
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
            method: 'GET',
            scope: this
        });
    },
    // * кнопка Печать чека
    onButtonPrintBill: function () {
        var grid = this.getView(),
            field = grid.down('#slipId'),
            value = field.getValue(),
            slipId,
            code,
            print = this.getSlipList(field);
//console.info(this.getSlipList(field));
        //todo печать не работает
        console.info(print);
        if (print) {
            if (value.indexOf('x') > 0) { // * номер_х_код
                slipId = value.split('x')[0];
                code = value.split('x')[1];
            } else {
                slipId = value;
            }
            var objUrlPrint = {
                class: 'Pos_Pageprinter_Print',
                params: {
                    slipId: slipId,
                    login: Ext.util.Cookies.get('betzet_login'),
                    token: Ext.util.Cookies.get('betzet_token'),
                    code: code
                }
            };
            window.open(Server.getUrl(objUrlPrint), '_blank');
        }

    }

});
