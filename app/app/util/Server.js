Ext.define('Office.util.Server', {
    singleton: true,
    alternateClassName: ['Server'],

    constructor: function (config) {
        this.initConfig(config);
        this.setHostType();
    },

    config: {
        _token: '',
        _localhost: 'office'
    },
    LOGIN_FROM_COOKIE: true, // * логиниться на основании данных из кук, если они есть
    //WS_ADDRESS_API: window.location.origin+'api/',

    //WS_ADDRESS_API:'http://vocxod.comapi/',
    //WS_ADDRESS:'http://195.122.28.80:11150/',

    setToken: function (token) {
        Server.config['_token'] = token;
    },
    getToken: function () {
        var betzet_token = Ext.util.Cookies.get('betzet_token');
        if (this.LOGIN_FROM_COOKIE && betzet_token)
            return betzet_token;
        else
            return Server.config['_token'];
    },

    setHostType: function () {
        /*    hostType - параметр, определяющий сервер размещения приложения
         *  1- office (локальный сервер, для разработки)
         *  2- newpos.dev.badbin.ru*/

        switch (window.location.host) {
            case this.config['_localhost']:
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
                return SITE_ROOT_URL;
                //return 'http://' + window.location.host;
                break;
        }
    },

    /* формируем url для api */
    getUrl: function (objUrl) {
        var objUrl = objUrl || {},
            className = objUrl['class'],
            params = Ext.encode(objUrl['params'] || {}) || {},
            strOut = '',

            token = objUrl['token'] || this.getToken();

        strOut = this.getPrefix() + 'posapi/?request={' +
        '"auth":{"class":"Auth_Login","params":{"auth":{"token":"' + token + '","login":"","hash":""}}}' +
        ',"command":{"class":"' + className + '","params":' + params + '}}';
        return strOut;
    },

    getLogin: function (params) {
        var params = params || {},
            login = params.username,
            hashStr = params.password == undefined ? '' : Util.sha1(params.password);
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + 'checkLogin.php';
                break;
            case 2:
                return this.getPrefix() + 'posapi/?request={"command_1":{"class":"Auth_Login","params":{"auth":{"login":"' + login + '","hash":"' + hashStr + '"}}}}';
                break;
        }
    },

    getPageprinter: function () {
        switch (this.hostType) {
            case 1:
                return null;
                break;
            case 2:
                return this.getPrefix() + 'office/store/pageprinter.php';
                break;
        }
    },
    getLocalization: function () {
        return 'resources/data/localization/locales/{locale}.json';
    },

    getKladrApi: function () {
        return 'http://kladr-api.ru/api.php';
    },

    getBasketLimitsNoClientId: function () {
        return this.getPrefix() + 'api/?command=basket_limits' +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}"}';
    },
    getBasketLimitsSingle: function () {
        return this.getPrefix() + 'api/?command=basket_limits' +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}"}';
    },
    getBasketLimitsMulti: function () {
        return this.getPrefix() + 'api/?command=basket_limits' +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}"}';
    },
    getBasketLimitsSystem: function () {
        return this.getPrefix() + 'api/?command=basket_limits' +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "system_value":{3}}';
    },

// * PrerequestSingle
    getBasketPrerequestSingle: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "bet_source_id":{3}}';
    },
    getBasketPrerequestSingleClientId: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "client_id":{3},' +
            '   "bet_source_id":{4}}';
    },
    getBasketPrerequestSingleTimeline: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "timeline":{3},' +
            '   "bet_source_id":{4}}';
    },

// * PrerequestMulti
    getBasketPrerequestMulti: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "bet_source_id":{3},' +
            '   "sum":{4}}';
    },
    getBasketPrerequestMultiClientId: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "client_id":{3},' +
            '   "bet_source_id":{4},' +
            '   "sum":{5}}';
    },
    getBasketPrerequestMultiTimeline: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "timeline":{3},' +
            '   "bet_source_id":{4},' +
            '   "sum":{5}}';
    },

// * PrerequestSystem
    getBasketPrerequestSystem: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "bet_source_id":{3},' +
            '   "sum":{4},' +
            '   "system_value":{5}}';
    },
    getBasketPrerequestSystemClientId: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "client_id":{3},' +
            '   "bet_source_id":{4},' +
            '   "sum":{5},' +
            '   "system_value":{6}}';
    },
    getBasketPrerequestSystemTimeline: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "timeline":{3},' +
            '   "bet_source_id":{4},' +
            '   "sum":{5},' +
            '   "system_value":{6}}';
    },

// * QueueSingle
    getBasketQueueSingle: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "bet_source_id":{3},' +
            '   "client_enable":{4}}' +
            '&action={5}';
    },
    getBasketQueueSingleClientId: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "client_id":{3},' +
            '   "bet_source_id":{4},' +
            '   "client_enable":{5}}' +
            '&action={6}';
    },
    getBasketQueueSingleTimeline: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "timeline":{3},' +
            '   "bet_source_id":{4},' +
            '   "client_enable":{5}}' +
            '&action={6}';
    },

// * QueueMulti
    getBasketQueueMulti: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "bet_source_id":{3},' +
            '   "sum":{4},' +
            '   "client_enable":{5}}' +
            '&action={6}';
    },
    getBasketQueueMultiClientId: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "client_id":{3},' +
            '   "bet_source_id":{4},' +
            '   "sum":{5},' +
            '   "client_enable":{6}}' +
            '&action={7}';
    },
    getBasketQueueMultiTimeline: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "timeline":{3},' +
            '   "bet_source_id":{4},' +
            '   "sum":{5},' +
            '   "client_enable":{6}}' +
            '&action={7}';
    },

// * QueueSystem
    getBasketQueueSystem: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "bet_source_id":{3},' +
            '   "sum":{4},' +
            '   "system_value":{5},' +
            '   "client_enable":{6}}' +
            '&action={7}';
    },
    getBasketQueueSystemClientId: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "client_id":{3},' +
            '   "bet_source_id":{4},' +
            '   "sum":{5},' +
            '   "system_value":{6},' +
            '   "client_enable":{7}}' +
            '&action={8}';
    },
    getBasketQueueSystemTimeline: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "timeline":{3},' +
            '   "bet_source_id":{4},' +
            '   "sum":{5},' +
            '   "system_value":{6},' +
            '   "client_enable":{7}}' +
            '&action={8}';
    },

    getBasketQueueMultiClientIdDay: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&params={' +
            '   "bets":{1},' +
            '   "type":"{2}",' +
            '   "client_id":{3},' +
            '   "bet_source_id":{4},' +
            '   "sum":{5},' +
            '   "client_enable":{6},' +
            '   "de_id":{7},' +
            '   "flags":{8}}' +
            '&action={9}';
    },

    getBasketQueueAction: function (command) {
        return this.getPrefix() + 'api/?command=' + command +
            '&auth={"token":"{0}"}' +
            '&key={1}' +
            '&action={2}';
    },

    getSearch: function () {
        switch (this.hostType) {
            case 1:
                //return this.getPrefix() + '/accept/bets.php';
                break;
            case 2:
                //return this.getPrefix() + '/office/store/bets.php';
                //return this.getPrefixData() + '/timeline/getSearch.json';
                return this.getPrefix() + 'api/?command=search_players&caller=office&auth={"token":"{0}"}&term={1}';
                break;
        }
    },

    getDayExpress: function () {
        return this.getPrefix() + 'api/?command=get_day_express&login={0}';
    },

    getCheckUserCard: function () {
        return this.getPrefix() + 'api/?command=check_user_card' +
            '&auth={"token":"{0}"}' +
            '&client_id={1}' +
            '&card_number={2}';
    },

    getTimelinePlayer: function () {
        return this.getPrefix() + 'api/?command=get_timeline_player' +
            '&auth={"token":"{0}"}' +
            '&timeline_id={1}';
    },

    getFillEvent: function () {
        switch (this.hostType) {
            case 1:
                break;
            case 2:
                return this.getPrefix() + 'api/?command={0}&language={1}&line_version={2}';
                break;
        }
    },

    pos_printline: function () {
        return this.getPrefix() + 'api/?command=pos_printline&format=html&params={"timezone":"Europe/Moscow",' +
            '"mode":"{0}","from_date":"{1}","to_date":"{2}","sport":"{3}", "tournament": "{4}"}';
    },
    pos_printline_day_express: function () {
        return this.getPrefix() + 'api/?command=pos_printline&format=html&params={"timezone":"Europe/Moscow",' +
            '"mode":"day_express","type":"{0}"}';
    },

    getStatusBets: function () {
        return 'resources/data/pay/getStatusBets.json';
    }

});