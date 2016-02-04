// *
Ext.define('Office.view.fill.WsF', {
    singleton: true,
    alternateClassName: ['WsF'],

    startLoadWS: function () {
        //return ;
        WS.init(
            function (ws) {
                console.log('WS.init');
                ws.currentSubscriptions = {};
                ws.websocketDelay = 20 * 1000;
                ws.websocketErrorDelay = 10 * 1000;
                ws.timers = {};
               // ws.fetchFullTimeout = 10000;


                ws.onMessage = function (objData, channel, lang) {
                    //var itemId = channel == 'inplay' ? 'live' : 'line',
                       // gridLive = Ext.ComponentQuery.query('#' + itemId)[0];

                    if (channel == 'inplay') {
                   // if (itemId == 'live' && !gridLive) { // * типа, если не нашел грид live, то попробовать rats- случай крысы-ставки
                        //itemId = 'rats';
                        var gridLive = Ext.ComponentQuery.query('grideventlive')[1],
                        gridRats = Ext.ComponentQuery.query('grideventlive')[2];
                    }else{
                        var gridLine = Ext.ComponentQuery.query('grideventlive')[0];
                    }
                    //console.info(channel,itemId,gridLive);
                    if (gridLive) {// * может не быть, если уже закрыли раздел, а данные еще приходят
                        var vmLive = gridLive.getViewModel(),
                            storeRawLive = vmLive.getStore('rawdata');
                        if (storeRawLive) {
                            var result = storeRawLive.loadRawData(objData);
                            if (!result) {
                                // this.Unsubscribe(channel, lang);
                                //todo что делать?
                            } else {
                                vmLive.runnerTaskWs = null;
                            }
                        }
                    }

                    if (gridRats) {// * может не быть, если уже закрыли раздел, а данные еще приходят
                        var vmRats = gridRats.getViewModel(),
                            storeRawRats = vmRats.getStore('rawdata');
                        if (storeRawRats) {
                            var result = storeRawRats.loadRawData(objData);
                            if (!result) {
                                // this.Unsubscribe(channel, lang);
                                //todo что делать?
                            } else {
                                vmRats.runnerTaskWs = null;
                            }
                        }
                    }

                    if (gridLine) {// * может не быть, если уже закрыли раздел, а данные еще приходят
                        var vmLine = gridLine.getViewModel(),
                            storeRawLine = vmLine.getStore('rawdata');
                        if (storeRawLine) {
                            var result = storeRawLine.loadRawData(objData);
                            if (!result) {
                                // this.Unsubscribe(channel, lang);
                                //todo что делать?
                            } else {
                                vmLine.runnerTaskWs = null;
                            }
                        }
                    }
                    //TaskF.startTaskWs(gridLive);
                    //this.DelayTimer(channel, this.websocketDelay);
                };
                ws.onClose = function () {
                    console.log('WebSocket соединение прервано');
                    //this.Unsubscribe('inplay', 'ru');
                    //this.Unsubscribe('prematch', 'ru');

                    // * начало в MenuMainC::onClickMenumain
                    var menumain = Ext.ComponentQuery.query('menumain')[0];
                    menumain.getEl().unmask();
                };
                ws.onReopen = function (m) {
                    console.log('WebSocket соединение восстановлено');
                    //ваш код обработчик
                    ws.subscribe('inplay', 'ru', null);
                    ws.subscribe('prematch', 'ru', null);
                };
                ws.onConnected = function () {
                    console.log('onConnected');
                    this.RefreshSubscription('inplay');
                    this.RefreshSubscription('prematch');
                };

                ws.RefreshSubscription = function (channel) {
                    console.log('RefreshSubscription', channel);
                    if (channel in this.currentSubscriptions) {
                        var fill = Ext.ComponentQuery.query('fill')[0],
                            west = fill.down('panel[region=west]');
                        // * окончание маски в GridEventLiveC::setLiveCountProperty
                        //Ext.defer(function () {
                        //
                        //}, 200, this);
                        this.Unsubscribe(channel, 'ru');
                        //delete this.currentSubscriptions[channel];
                        Ext.defer(function(){
                            west.getEl().mask('Загрузка матчей...');
                            this.subscribe(channel, 'ru', null);
                            this.currentSubscriptions[channel] = channel;
                        },100,this);

                        //this.AddTimer('prematch', function () {
                        //    console.info('prematch, AddTimer, timeout triggered, start api');
                        //    var gridLive = Ext.ComponentQuery.query('grideventlive')[0];
                        //    gridLive.getViewModel().getStore('rawdata').load();
                        //}.bind(this),this.websocketDelay);
                        return;
                    } else {
                        this.subscribe(channel, 'ru', null);
                        this.currentSubscriptions[channel] = channel;
                    }

                    // * когда происходит RefreshSubscription  нужно очищать центральную область fill
                    // * но только не для Экспресса дня
                    if (!BasketF.isDayExpress()) {
                        FillF.resetCenterArea();
                    }

                    /*var menumain = Ext.ComponentQuery.query('menumain')[0];
                     menumain.getEl().unmask();*/
                };
                ws.Unsubscribe = function (channel, lang) {
                    console.log('Unsubscribe', channel);
                    this.unsubscribe(channel, lang);
                    delete this.currentSubscriptions[channel];
                };
                ws.UnsubscribeAll = function () {
                    console.log('UnsubscribeAll');
                    this.Unsubscribe('inplay', 'ru');
                    this.Unsubscribe('prematch', 'ru');
                };
                //ws.DelayTimer = function (mode, delay) {
                //    //console.log('DelayTimer', arguments, WS.timers[mode]);
                //    //if (mode in this.timers) {
                //    //    window.clearTimeout(this.timers[mode]['timer']);
                //    //    this.AddTimer(mode, this.timers[mode].func, delay);
                //    //}
                //};
                //ws.AddTimer = function (mode, func, timeout) {
                //    //console.log('AddTimer');
                //    if (typeof timeout == 'undefined') {
                //        timeout = 0;
                //    } else {
                //        timeout = parseInt(timeout, 10);
                //    }
                //    this.timers[mode] = {
                //        func: func,
                //        timer: window.setTimeout(
                //            function () {
                //                //console.warn('timeout',mode);
                //                delete this.timers[mode];
                //                func.call();
                //            }.bind(this),
                //            timeout
                //        )
                //    };
                //};

                //ws.AddTimer('prematch', function () {
                //    //console.info('prematch, AddTimer, timeout triggered, start api');
                //    //this.AddTimer('prematch', function () {
                //    //    console.info('prematch','AddTimer','timeout triggered');
                //    //
                //    //},this.websocketDelay);
                //    //var gridLive = Ext.ComponentQuery.query('grideventlive')[0];
                //    //gridLive.getViewModel().getStore('rawdata').load();
                //}.bind(this), ws.websocketDelay);
                //ws.AddTimer('inplay', function () {
                //    //console.info('inplay', 'AddTimer', 'timeout triggered');
                //}, ws.websocketDelay);

                //TaskF.startTaskWs(gridLive);
            },
            function () {
                console.log('Браузер не поддерживает web sockets');
            }
        );

        //TaskF.startTaskWs1();
    },
});