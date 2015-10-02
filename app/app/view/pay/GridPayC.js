Ext.define('Office.view.pay.GridPayC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.pay.PayF'
    ],
    alias: 'controller.gridpay',

    listen: {
        component: {
            'tool[type=close]': {
                click: function (button) {
                    PayF.resetData();
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
                    if (mainController.askLogoutIfAccessDenied(store)) {
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
                                        var objPlayer = objRows.player, // * параметры игрока
                                            arrEvent = objRows.children; // * массив объектов событий

                                        var objIn = Ext.Object.merge(objData, objRows);
                                        if (objPlayer) {
                                            objIn = Ext.Object.merge(objData, objPlayer);
                                        }

                                        var menumain = Ext.ComponentQuery.query('menumain')[0],
                                            globals = menumain.getViewModel().get('globals'),
                                            use_ndfl = globals.use_ndfl;

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
                                                        } else {
                                                            value = '???';
                                                        }
                                                        break;
                                                    case '_ndfl':
                                                        if (use_ndfl) {
                                                            var tax_sum = objIn['tax_sum'] || '',
                                                                tax_percent = objIn['tax_percent'] || '';
                                                            if (tax_sum)
                                                                value = tax_sum + ' (' + tax_percent + '%)';
                                                        }

                                                        break;
                                                    case '_fio':
                                                        if (objPlayer) {
                                                            var lastname = objIn['lastname'] || '',
                                                                firstname = objIn['firstname'] || '',
                                                                patronymic_name = objIn['patronymic_name'] || '';
                                                            if (lastname)
                                                                value = lastname + ' ' + firstname + ' ' + patronymic_name;
                                                        }
                                                        break;
                                                    case '_to_pay_all':
                                                        var to_pay = objIn['to_pay'] || '';
                                                        if (to_pay)
                                                            value = '<span style="font-weight: bold;">' + to_pay + '</span>';
                                                        break;
                                                    case '_resident':
                                                        if (use_ndfl) {
                                                            value = objIn['is_resident'] == 1 ? 'РФ' : 'Не резидент';
                                                        }
                                                        break;
                                                }

                                                if (key == '_event') { // * добрались до списка событий
                                                    if (arrEvent) { // * экспресс, есть children
                                                        // * цикл по добавлению элементов событий в результирующий массив
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
                                        //} else {    // * выплата на предъявителя (use_ndfl = false)
                                        //Util.erMes(objData.message || ' Нет данных о клиенте');

                                        // }
                                    } else {
                                        Util.erMes(objData.message || ' Нет данных по ставке');
                                    }
                                } else {
                                    Util.erMes(objData.message || arr[0] || ' Нет данных');
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
        if (e.getKey() == e.ENTER && field.getValue()) {
            PayF.getSlipList(field);
        }

        if (e.getKey() == e.DELETE) {
            PayF.resetData();
        }
    },

    // * нажали значек лупы
    onPressLoupe: function (field) {
        if (field.getValue()) {
            PayF.getSlipList();
        }
    },

    onPayLoad: function (store, records) {
      var gridpay=Ext.ComponentQuery.query('gridpay')[0],
          vm = gridpay.getViewModel();
        vm.set('is_win',records[0].get('is_win'));
        vm.set('slipInfo', records[0].get('rows'));
        PayF.sendPaysToMonitor();
    },

    // * кнопка Выплатить без чека (без code)
    onButtonMake: function () {
        var grid = this.getView(),
            vm = grid.getViewModel(),
            slipId = vm.get('get_slipId'),
            code = vm.get('get_code');
        PayF.checkSlip(slipId, code, false);
    },

    // * кнопка Выплатить с чеком
    onButtonMakeBill: function () {
        var grid = this.getView(),
            vm = grid.getViewModel(),
            slipId = vm.get('get_slipId'),
            code = vm.get('get_code');
        PayF.checkSlip(slipId, code, true);
    },

    // * кнопка Печать чека
    onButtonPrintBill: function () {
        var grid = this.getView(),
            vm = grid.getViewModel(),
            slipId = vm.get('get_slipId'),
            code = vm.get('get_code');
        if (slipId) {
            //var print = this.getSlipList();
            var slipInfo = vm.get('slipInfo');
            if (slipInfo) {
                var objUrlPrint = {
                    class: 'Pos_Pageprinter_Print',
                    params: {
                        slipId: slipId,
                        login: Ext.util.Cookies.get('betzet_login'),
                        token: Ext.util.Cookies.get('betzet_token'),
                        code: code
                    }
                };
                window.open(Server.getUrl(objUrlPrint));
            }
        }
    },

    focusSlipId: function (field) {
        field.focus();
    }

});
