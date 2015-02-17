// * класс для отладочной инициализации некоторых полей
Ext.define('Office.util.Debug', {
    singleton: true,
    alternateClassName: ['Debug'],
    /* requires: [
     'Office.util.Utilities'
     ],*/

    // * заполнение полей формы Авторизация
    debug: 0, // * 1- отладочный режим

    username: 'kassa103',
    password: '1',
    cbDateFrom:'2014-10-06',
    slipId: 12,
    lastname: 'Ккк',
    barcode: '27472453',
    phone_number: '12345612345',
    term: 'Ккк',

    setLoginFields: function (win) {
        if (this.debug) {
            win.down('#username').setValue(this.username);
            win.down('#password').setValue(this.password);
        }
    },
    setGridAcceptMadeFrom: function (vm, bindName) {
        /*if (this.debug) {
            Ext.defer(function () {
                var date = Utilities.stringToDateHyphen('2014-10-06');
                madeFrom.setValue(date);
            }, 100);
        } else {
            madeFrom.setValue(new Date());
        }*/
        if (this.debug) {
            vm.set(bindName, this.cbDateFrom);
        }
    },
    setBarcode: function (vm, bindName) {
        if (this.debug) {
            vm.set(bindName, this.barcode);
        }
    },
    setPhone: function (vm, bindName) {
        if (this.debug) {
            vm.set(bindName, this.phone_number);
        }
    },
    setCardFio: function (vm, bindName) {
        if (this.debug) {
            vm.set(bindName, this.term);
        }
    },

});