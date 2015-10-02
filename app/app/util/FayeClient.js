//window.FayeClient = (function() {
function FayeClient() {
    var FAYE_HOST = window.location.origin+":9292/faye";
   // var FAYE_HOST = "http://newpos.dev.badbin.ru:9292/faye";
    if (typeof FAYE_HOST === "undefined" || FAYE_HOST === null) {
        return;
    }
    this.faye = new Faye.Client(FAYE_HOST, {
        timeout: 20,
        retry: 2
    });
    this.faye.on('transport:down', (function (_this) {
        return function () {
            return _this.transport_down();
        };
    })(this));
    this.faye.on('transport:up', (function (_this) {
        return function () {
            return _this.transport_up();
        };
    })(this));
    this.control = '/control';
    this.faye.subscribe(this.control, (function (_this) {
        return function (message) {
            var cmd;
            cmd = message.command;
            return typeof _this[cmd] === "function" ? _this[cmd](message) : void 0;
        };
    })(this));

    var login = Ext.util.Cookies.get('betzet_login');
    this.monitor_enabled = login;
    //this.monitor_enabled = App.isOffice() && App.user.isAuth();
    if (this.monitor_enabled) {
        //login = App.user.getLogin();
        this.channel_in = '/' + login + '/in';
        this.channel_out = '/' + login;
        this.faye.subscribe(this.channel_in, (function (_this) {
            return function (message) {
                var cmd;
                cmd = message.command;
                return typeof _this[cmd] === "function" ? _this[cmd](message) : void 0;
            };
        })(this));
    }


}

FayeClient.prototype.transport_up = function () {
    var downtime_duration,
        newDate = new Date(),
        moment = Ext.Date.format(newDate, 'Y-m-d');
    if (this.downtime != null) {
        downtime_duration = Math.ceil((newDate.getTime() - this.downtime) / 1000);
        this.downtime = null;
        return console.info("transport is UP at [" + (moment) + "] after downtime: " + downtime_duration + "s");
        //return console.info("transport is UP at [" + (moment().format('HH:mm:ss')) + "] after downtime: " + downtime_duration + "s");
    } else {
        return console.info("transport is UP at [" + (moment) + "]");
    }
};

FayeClient.prototype.transport_down = function () {
    this.downtime = new Date().getTime();
    var moment = Ext.Date.format(new Date(), 'Y-m-d');
    return console.info("transport is DOWN at [" + (moment) + "]");
};

FayeClient.prototype.sendPing = function () {
    if (this.monitor_enabled) {
        return this.faye.publish(this.channel_out, {
            command: 'ping'
        });
    }
};

FayeClient.prototype.sendCommand = function (message) {
    if (this.monitor_enabled && (message != null ? message.command : void 0)) {
        return this.faye.publish(this.channel_out, message);
    }
};

FayeClient.prototype.registerCallback = function (message) {
    if (this.monitor_enabled && (message != null ? message.command : void 0)) {
        return this.faye.publish(this.channel_out, message);
    }
};

//FayeClient.prototype.getState = function (message) {
//    console.info(this.faye);
//    console.info(this.faye._state);
//    if (this.monitor_enabled && (message != null ? message.command : void 0)) {
//
//        return this.faye._state;
//    }
//};

FayeClient.prototype.ping = function () {
    console.log('got ping');
    return this.faye.publish(this.channel_out, {
        command: 'pong'
    });
};

// * очистка монитора игрока
FayeClient.prototype.init = function () {
    var data = {"state": {"count": 0}};
    if (FayeClient.sendCommand)
        FayeClient.sendCommand({command: 'snapshot', data: data});
};

//FayeClient.prototype.reload = function() {
//    $.idleTimer(60 * 1000);
//    return $(document).on('idle.idleTimer', (function(_this) {
//        return function() {
//            return window.location.reload();
//        };
//    })(this));
//};
//
//FayeClient.prototype.forced_reload = function() {
//    return window.location.reload();
//};

//FayeClient.prototype.initialize = function(message) {
//    var coupon, ref;
//    console.log('got initialize');
//    coupon = (ref = App.module('Line.Coupon')) != null ? ref.coupon : void 0;
//    return coupon != null ? coupon.take_snapshot() : void 0;
//};

//return FayeClient;
//window.FayeClient = new FayeClient();

//})();