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

    setToken: function (token) {
        Server.config['_token'] = token;
    },
    getToken: function () {
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
                return 'http://' + window.location.host;
                break;
        }
    },
    /*    getPrefixData: function () {
     return 'resources/data';
     },*/
    /* формируем url для api */
    getUrl: function (objUrl) {
        var objUrl = objUrl || {},
            className = objUrl['class'],
            token = objUrl['token'] || this.getToken(),
            params = Ext.encode(objUrl['params'] || {}) || {},
            strOut = '';
        strOut = this.getPrefix() + '/posapi/?request={' +
        '"auth":{"class":"Auth_Login","params":{"auth":{"token":"' + token + '","login":"","hash":""}}}' +
        ',"command":{"class":"' + className + '","params":' + params + '}}';
        return strOut;
    },

    /*getSessions: function () {
        //var token = Ext.util.Cookies.get('betzet_token');
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/accept/sessions.php';
                break;
            case 2:
                //return this.getPrefix() + '/office/store/sessions.php';
                return this.getPrefix() + '/posapi/?request={' +
                '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
                ',"command":{"class":"Pos_Sessions_Lastsessioninfo","params":{"token":"{0}"}}}';
                break;
        }
    },*/
    /*getLastSession: function () {
        return this.getPrefix() + '/office/store/sessions.php?xaction=getLastSessionsInfo';
        *//* return this.getPrefix() + '/posapi/?request={' +
         '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
         ',"command":{"class":"Pos_Sessions_Lastsessioninfo","params":{"token":"{0}"}}}';*//*
    },*/
    /*getCloseSession: function () {
        return this.getPrefix() + '/office/store/sessions.php?xaction=endLastSession';
        *//* return this.getPrefix() + '/posapi/?request={' +
         '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
         ',"command":{"class":"Pos_Sessions_Lastsessioninfo","params":{"token":"{0}"}}}';*//*
    },*/
    /*getStartSession: function () {
        //return this.getPrefix() + '/office/store/sessions.php?xaction=newSession';
        return this.getPrefix() + '/posapi/?request={' +
        '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
        ',"command":{"class":"Pos_Sessions_Newsession","params":{"open_time":"{1}"}}}';
    },*/
    getInputCash: function () {
        return this.getPrefix() + '/office/store/cashMovements.php';
        /* return this.getPrefix() + '/posapi/?request={' +
         '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
         ',"command":{"class":"Pos_Sessions_Lastsessioninfo","params":{"token":"{0}"}}}';*/
    },
    getCashReport: function () {
        return this.getPrefix() + '/office/store/fillCashReport.php?user_id=' +
        Ext.util.Cookies.get('userId') +
        '&username=' + Ext.util.Cookies.get('betzet_login') +
        '&token={0}';
    },
    getDetailTL: function () {
        return this.getPrefix() + '/office/store/sessions.php?xaction=getAvgDataOfCurrentSession';
    },
    getPrintSession: function () {
        return this.getPrefix() + '/office/store/printSession.php';
    },
    getLogin: function (params) {
        var params = params || {},
            login = params.username,
            hashStr = params.password == undefined ? '' : Utilities.sha1(params.password);
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/checkLogin.php';
                break;
            case 2:
                //return this.getPrefix() + '/api/?command=login&auth={"login":"' + login + '","hash":"' + hashStr + '"}';
                //return this.getPrefix() + '/posapi/?request={' + this.getCommandLogin( login, hashStr) + '}';
                return this.getPrefix() + '/posapi/?request={"command_1":{"class":"Auth_Login","params":{"auth":{"login":"' + login + '","hash":"' + hashStr + '"}}}}';
                break;
        }
    },
    /*getFilterSlipState: function () {
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/accept/filters.php';
                break;
            case 2:
                //return 'resources/data/accept/getResult.json';
                return this.getPrefix() + '/posapi/?request={' +
                '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
                ',"command":{"class":"Pos_Filters_Slipstate","params":{"mode":"office"}}}';
                break;
        }
    },*/
  /*  getFilterSport: function () {
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/accept/filters.php';
                break;
            case 2:
                //return 'resources/data/accept/getResult.json';
                return this.getPrefix() + '/posapi/?request={' +
                '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
                ',"command":{"class":"Pos_Filters_Sport","params":{"mode":"office"}}}';
                break;
        }
    },*/
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

    /*getBets: function () {
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/accept/bets.php';
                break;
            case 2:
                return this.getPrefix() + '/posapi/?request={' +
                '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
                ',"command":{"class":"Pos_Bets_Office","params":{' +
                '"cbDateType":"{1}",' +
                '"cbDateFrom":"{2}",' +
                '"cbTimeFrom":"{3}",' +
                '"cbDateTo":"{4}",' +
                '"cbTimeTo":"{5}",' +
                '"cbStateSlip":"{6}",' +
                '"cbPaid":"{7}",' +
                '"cbIsLive":"{8}",' +
                '"cbByBets":"{9}",' +
                '"cbSport":"{10}",' +
                '"cbSlipId":"{11}",' +
                '"placeName":"office",' +
                '"page":"1"' +
                '}}}';
                break;
        }
    },*/
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
        return 'resources/data/localization/locales/{locale}.json';
    },
    /*getCheckSlip: function () {
        switch (this.hostType) {
            case 1:
                return null;
                break;
            case 2:
                //return this.getPrefix() + '/office/store/checkSlip.php';
                return this.getPrefix() + '/posapi/?request={' +
                '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
                ',"command":{"class":"Pos_Slips_Info","params":{"slipId":"{1}","code":"{2}"}}}';
                break;
        }
    },*/
    /*checkSlip: function () {
        //return this.getPrefix() + '/office/store/checkSlip.php';
        return this.getPrefix() + '/posapi/?request={' +
        '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
        ',"command":{"class":"Pos_Slips_Transaction","params":{"slipId":"{1}","code":"{2}"}}}';
    },*/
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
    /*getRats: function () {
        switch (this.hostType) {
            case 1:
                return null;
                break;
            case 2:
                return this.getPrefix() + '/office/store/rats.php';
                break;
        }
    },*/
    /*getBarCode: function () {
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/card/getGridCard.json';
                break;
            case 2:
                //return this.getPrefix() + '/office/store/barCode.php';
                return this.getPrefix() + '/posapi/?request={' +
                '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
                ',"command":{"class":"Pos_Barcode_Read","params":{"user":"{1}"}}}';
                break;
        }
    },*/
    /*getBarCodeUpdate: function () {
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/card/getGridCard.json';
                break;
            case 2:
                //return this.getPrefix() + '/office/store/barCode.php';
                return this.getPrefix() + '/posapi/?request={' +
                '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
                ',"command":{"class":"Pos_Barcode_Update","params":{"player":{1},"barcode":"{2}","edit_player":"1"}}}';
                ;
                break;
        }
    },*/
    /*getBarCodeInfo: function () {
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/card/getGridCard.json';
                break;
            case 2:
                //return this.getPrefix() + '/office/store/barCode.php';
                return this.getPrefix() + '/posapi/?request={' +
                '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
                ',"command":{"class":"Pos_Barcode_Info","params":{"barcode":"{1}"}}}';
                break;
        }
    },*/
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
  /*  playersSavebypassport: function () {
        return this.getPrefix() + '/posapi/?request={' +
        '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
        ',"command":{"class":"Pos_Players_Savebypassport","params":{"player":{1}}}}';

    },*/
    getKladrApi: function () {
        return 'http://kladr-api.ru/api.php';
    },
   /* getTimeline: function () {
        switch (this.hostType) {
            case 1:
                return null;
                break;
            case 2:
                //return this.getPrefix() + '/office/store/timeline.php';
                return this.getPrefix() + '/posapi/?request={' +
                '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
                ',"command":{"class":"Pos_Timeline_Search","params":{"term":"{1}","includeArchieved":"{2}"}}}';
                break;
        }
    },*/
    createTimeline: function () {
        return this.getPrefix() + '/office/store/timeline.php';
    },
    checkSlipCode: function () {
        return this.getPrefix() + '/office/store/timeline.php';
    },
/*    getSlip: function () {
        switch (this.hostType) {
            case 1:
                return this.getPrefix() + '/timeline/getGridSlip.json';
                break;
            case 2:
                //return this.getPrefix() + '/office/store/timeline.php';
                // return this.getPrefix() + '/office/store/timeline.php';
                return this.getPrefix() + '/posapi/?request={' +
                '"auth":{"class":"Auth_Login","params":{"auth":{"token":"{0}","login":"","hash":""}}}' +
                ',"command":{"class":"Pos_Timeline_Subslipstree","params":{"timelineId":"{1}"}}}';
                break;
        }
    },*/
    getSearch: function () {
        switch (this.hostType) {
            case 1:
                //return this.getPrefix() + '/accept/bets.php';
                break;
            case 2:
                //return this.getPrefix() + '/office/store/bets.php';
                //return this.getPrefixData() + '/timeline/getSearch.json';
                return this.getPrefix() + '/api/?command=search_players&caller=office&auth={"token":"{0}"}&term={1}';
                break;
        }
    },
    getFillEvent: function () {
        switch (this.hostType) {
            case 1:
                break;
            case 2:
                return this.getPrefix() + '/api/?command={0}&language={1}&version=v1.1';
                break;
        }
    },
    pos_printline: function () {
        return this.getPrefix() + '/api/?command=pos_printline&format=html&params={"timezone":"Europe/Moscow",' +
        '"mode":"{0}","from_date":"{1}","to_date":"{2}","sport":"{3}"}';
    },
    linePrinter: function () {
        return this.getPrefix() + '/office/store/linePrinter.php?from_date={0}&to_date={1}&sport_id={2}&mode=results';
    },
    getStatusBets: function () {
        return this.getPrefix() + '/pos/resources/data/pay/getStatusBets.json';
    },
   /* accountsRead: function () {
        return this.getPrefix() + '/office/store/accounts.php?xaction=read&token={0}&user_id={1}&username={2}&mobile_phone={3}&min_balance={4}&max_balance={5}';
    },*/
   /* accountsCreate: function () {
        return this.getPrefix() + '/office/store/accounts.php?xaction=create&token={0}&user_id={1}&username={2}';
    },
    accountsWithdrawRequest: function () {
        return this.getPrefix() + '/office/store/accounts.php?xaction=withdrawRequest&token={0}&user_id={1}&username={2}';
    },
    accountsWithdraw: function () {
        return this.getPrefix() + '/office/store/accounts.php?xaction=withdraw&token={0}&user_id={1}&username={2}';
    },
    accountsHistory: function () {
        return this.getPrefix() + '/office/store/accounts.php?xaction=getHistory&token={0}&player_id={1}';
    },*/
    /*screenPanel: function () {
        return this.getPrefix() + '/office/store/screenPanel.php';
    },*/
  /*  panelParam: function () {
        return this.getPrefix() + '/office/store/panelParam.php?task_id={0}&panel_id={1}';
    },*/
    /*panelMode: function () {
        return this.getPrefix() + '/office/store/panelMode.php?xaction=read';
    },*/
   /* virtualSlip: function () {
        return this.getPrefix() + '/office/store/virtualSlip.php';
    },*/
  /*  chatgroup: function () {
        return this.getPrefix() + '/office/store/chatgroup.php?xaction=read&login={0}';
    },
    chatgroupuser: function () {
        return this.getPrefix() + '/office/store/chatgroupuser.php?xaction=read&groupid={0}&allusers={1}&login={2}&userlogin={3}';
    },
    chatmes: function () {
        return this.getPrefix() + '/office/store/chatmes.php?userid={0}&groupid={1}&login={2}&userlogin={3}&min_date={4}&max_date={5}';
    },*/
});