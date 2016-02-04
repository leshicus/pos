// *
Ext.define('Office.util.MatchdataTransport', {
    singleton: true,
    alternateClassName: ['MatchdataTransport'],

    init: function () {
        var options,
            _this = this;
        this.options = options = {
            language: "ru",

            //language: I18n.currentLocale(),
            socket: {
                url: WS_ADDRESS
            },
            http: {
                url: Server.getPrefix()+'api/index.php',
                timeouts: {
                    prematch: 120 * 1000,
                    //prematch: App.settings.update_line * 1000,
                    inplay: 2 * 1000
                    //inplay: App.settings.update_live * 1000
                }
            },
            logEnabled: true
        };
        this.websocketClient = new LineTransport(options);
        this.websocketClient.on('subscribed', function (data) {
            console.log('ws subscribed', data);
        });
        this.websocketClient.on('unsubscribed', function (message) {
            console.log('ws unsubscribed', message);
        });
        this.websocketClient.on('data', function (data) {
            var defer;

            //function loadData(grid, rec) {
            //    if (grid) {// * может не быть, если уже закрыли раздел, а данные еще приходят
            //        grid.getController().loadRawDataStright(rec);
            //    }
            //}

            //if (data.channel == 'inplay') {
            //    var gridLive = Ext.ComponentQuery.query('grideventlive')[1],
            //        gridRats = Ext.ComponentQuery.query('grideventlive')[2];
            //    loadData(gridLive, data);
            //    loadData(gridRats, data);
            //} else {
            //    var gridLine = Ext.ComponentQuery.query('grideventlive')[0];
            //    loadData(gridLine, data);
            //}


            if (data.channel == 'inplay') {
                ApplyChangedData.saveDataToStore(data,'live');
                ApplyChangedData.saveDataToStore(data,'rats');
            } else {
                ApplyChangedData.saveDataToStore(data,'line');
            }

            defer = _this[data.channel + 'Defer'];
            defer && defer.resolve();
            delete _this[data.channel + 'Defer'];
            return delete _this[data.channel + 'Defer'];
        });
        this.websocketClient.on('log', function (message) {
            console.log('ws log', message);
        });
        this.websocketClient.on('error', function (message) {
            console.log('ws error', message);
        });
        this.websocketClient.on('connect', function () {
            console.log('ws connect');
            _this.start();
        });
        this.websocketClient.on('disconnect', function () {
            console.log('ws disconnected');
        });
        return this.websocketClient.on('connection_error', function (message) {
            console.log('ws CONNECTION_ERROR', message);
        });
    },
    start: function () {
        console.log('ws start');
        this.websocketClient.connect('inplay');
        this.websocketClient.connect('prematch');

        // * disconnect for test purpose
        //Ext.defer(function(){
        //    this.websocketClient.disconnect('inplay');
        //    this.websocketClient.disconnect('prematch');
        //},3000,this);

        this.inplayDefer = $.Deferred();
        this.prematchDefer = $.Deferred();
        return $.when(this.prematchDefer, this.inplayDefer);
    },

    reconnect: function (channel) {
        console.log('ws reconnect');
        this.websocketClient.disconnect(channel);
        Ext.defer(function(){
            this.websocketClient.connect(channel);

            var str = channel+'Defer';
            this[str] = $.Deferred();
            return $.when(this[str]);
        },100,this);
    }

});