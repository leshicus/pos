Ext.define('Office.util.Server', {
    singleton: true,
    alternateClassName: ['Server'],

    localhost: 'office',
    constructor: function (config) {
        this.setHostType();
    },
    setHostType: function () {
        /* hostType - параметр, определяющий сервер размещения приложения
         *  1- office (локальный сервер, для разработки)
         *  2- newpos.dev.badbin.ru
         */
        switch (window.location.host) {
            case this.localhost:
                this.hostType = 1;
                break;
            default :
                this.hostType = 2;
                break;
        }
    },
    getPrefix: function () {
        switch (this.hostType) {
            case 1:
                return 'resources/php';
                break;
            default :
                return 'http://' + window.location.host;
                break;
        }
    },
    getPrefixData: function () {
        return 'resources/data';
    },
    getSessions: function () {
        var token = Ext.util.Cookies.get('betzet_token');
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/accept/sessions.php';
                break;
            case 2:
//return this.getPrefix() + '/office/store/sessions.php';
                return this.getPrefix() + '/posapi/?request={"command_1":{"class":"Pos_Sessions_Lastsessioninfo","params":{"token":"'+ token +'"}}}';
                break;
        }
    },
    getCommandLogin: function (login, hashStr) {
        var token = Ext.util.Cookies.get('betzet_token') || '',
            login = login || '',
            hashStr = hashStr || '';
        return '"commandLogin":{"class":"Auth_Login","params":{"auth":{"login":"' + login + '","hash":"' + hashStr + '"}}}';
    },
// * api
    getLogin: function (params) {
        var params = params || {},
            login = params.username,
            hashStr = Utilities.sha1(params.password);
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/checkLogin.php';
                break;
            case 2:
//return this.getPrefix() + '/api/?command=login&auth={"login":"' + login + '","hash":"' + hashStr + '"}';
                return this.getPrefix() + '/posapi/?request={'+ this.getCommandLogin(login, hashStr) +'}';
                break;
        }
    },
    getCheckLogin: function () {
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/checkLogin.php';
                break;
            case 2:
                return this.getPrefix() + '/office/store/checkLogin.php';
                break;
        }
    },
    getFilters: function () {
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/accept/filters.php';
                break;
            case 2:
                return this.getPrefix() + '/store/filters.php';
                break;
        }
    },
    getFilterSlipState: function () {
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/accept/filters.php';
                break;
            case 2:
//return 'resources/data/accept/getResult.json';
                return this.getPrefix() + '/posapi/?request={'+ this.getCommandLogin() +',' +
                '"command_1":{"class":"Pos_Filters_Slipstate","params":{"mode":"office"}}}';
                break;
        }
    },
    getFilterSport: function () {
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/accept/filters.php';
                break;
            case 2:
//return 'resources/data/accept/getResult.json';
                return this.getPrefix() + '/posapi/?request={'+ this.getCommandLogin() +',' +
                '"command_1":{"class":"Pos_Filters_Sport","params":{"mode":"office"}}}';
                break;
        }
    },
    getBets: function () {
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/accept/bets.php';
                break;
            case 2:
                return this.getPrefix() + '/office/store/bets.php';
                break;
        }
    },
    getPageprinter: function () {
        switch (this.hostType) {
            case 1:
                return null;
                break;
            case 2:
                return this.getPrefix() + '/office/store/pageprinter.php';
                break;
        }
    },
    getLocalization: function () {
        return this.getPrefixData() + '/localization/locales/{locale}.json';
    },
    getCheckSlip: function () {
        switch (this.hostType) {
            case 1:
                return null;
                break;
            case 2:
                return this.getPrefix() + '/office/store/checkSlip.php';
                break;
        }
    },
    getCashTransactions: function () {
        switch (this.hostType) {
            case 1:
                return null;
                break;
            case 2:
                return this.getPrefix() + '/office/store/cashTransactions.php';
                break;
        }
    },
    getRats: function () {
        switch (this.hostType) {
            case 1:
                return null;
                break;
            case 2:
                return this.getPrefix() + '/office/store/rats.php';
                break;
        }
    },
    getBarCode: function () {
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/card/getGridCard.json';
                break;
            case 2:
                return this.getPrefix() + '/office/store/barCode.php';
                break;
        }
    },
    updatePlayers: function () {
        switch (this.hostType) {
            case 1:
                return null;
                break;
            case 2:
                return this.getPrefix() + '/office/store/players.php';
                break;
        }
    },
    getKladrApi: function () {
        return 'http://kladr-api.ru/api.php';
    },
    getTimeline: function () {
        switch (this.hostType) {
            case 1:
                return null;
                break;
            case 2:
                return this.getPrefix() + '/office/store/timeline.php';
                break;
        }
    },
    getSlip: function () {
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/timeline/getGridSlip.json';
                break;
            case 2:
                return this.getPrefix() + '/office/store/timeline.php';
//return 'resources/data/timeline/getGridSlip.json';
                break;
        }
    }
});