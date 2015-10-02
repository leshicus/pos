/**
 * функции взятые из office/js/gui.js.php, office/js/gui.player.js.php
 *
 */

Ext.define('Office.util.Gui', {
    singleton: true,
    alternateClassName: ['Gui'],

    getPassportSerie: function (passportSerieAndNumber, isResident) {
        if (!passportSerieAndNumber) return '';
        isResident = isResident || false;
        if (!isResident) return '';
        passportSerieAndNumber = this.removeRepeatedSpaces(passportSerieAndNumber);
        passportSerieAndNumber = passportSerieAndNumber.toString();
        var parts = passportSerieAndNumber.split(' ');
        if (parts.length >= 3) {
            return parts[0] + ' ' + parts[1];
        }
        if (parts.length == 2) {
            return parts[0];
        }
        return passportSerieAndNumber.substr(0, 4);
    },

    getPassportNumber: function (passportSerieAndNumber, isResident) {
        if (!passportSerieAndNumber) return '';
        isResident = isResident || false;
        passportSerieAndNumber = this.removeRepeatedSpaces(passportSerieAndNumber);
        passportSerieAndNumber = passportSerieAndNumber.toString();
        if (!isResident) return passportSerieAndNumber;
        var parts = passportSerieAndNumber.split(' ');
        if (parts.length >= 3) {
            return parts[2];
        }
        if (parts.length == 2) {
            return parts[1];
        }
        return passportSerieAndNumber.substr(4);
    },

    formatPassportIssueDate: function (datetimeStr) {
        var IsoDateRe = new RegExp("^([1-9][0-9]{3})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})$");
        var matches = IsoDateRe.exec(datetimeStr);
        if (!matches) return '';
        var date = new Date(new String(datetimeStr).replace(/-/g, "/"));
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var result = dd + '-' + mm + '-' + yyyy;
        return result;
    },

    removeRepeatedSpaces: function (str) {
        if (typeof(str) == 'string') str = str.replace(/ +(?= )/g, '');
        return str;
    },

    isValidPassportIssueDate: function (datetimeStr) {
        var IsoDateRe = new RegExp("^([0-9]{2})-([0-9]{2})-([1-9][0-9]{3})$");
        var matches = IsoDateRe.exec(datetimeStr);
        if (!matches) return false;
        var now = new Date();
        var parts = datetimeStr.match(/(\d+)/g);
        var date = new Date(parts[2], parts[1] - 1, parts[0]); // note parts[1]-1
        var dd = date.getDate();
        var mm = date.getMonth() + 1; //January is 0!
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return ((dd != '00') && (mm != '00') && (yyyy > 1900) && (yyyy <= now.getFullYear()));
    },

    JSONDecodeSafe: function (json) {
        try {
            res = Ext.decode(json);
        } catch (e) {
            res = false;

        }

        return res;
    }

});