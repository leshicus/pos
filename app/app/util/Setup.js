Ext.define('Office.util.Setup', {
        singleton: true,

        requires: [
            'Ext.util.Observable',
            'Ext.util.Cookies'
        ],
        mixins: {
            observable: 'Ext.util.Observable'
        },
        url: 'resources/php/checkLogin.php',
        constructor: function (config) {
            console.info('constructor Setup');
            Ext.util.Cookies.clear('betzet_login');
            Ext.util.Cookies.clear('betzet_password_hash');
            Ext.util.Cookies.clear('betzet_token');
            var me = this,
                login,
                params,
                success = function (response) {
                    var o;
                    params = null;
                    try {
                        o = Ext.decode(response.responseText);
                    } catch (e) {
                        me.fireEvent('setupfail', response.responseText);
                        return;
                    }
                    if (true !== o.success) {
                        me.fireEvent('setupfail', o);
                    }
                },
                failure = function (response) {
                    params = null;
                    me.fireEvent('setupfail', response);
                },
                successParams = function (response) {
                    console.info('successParams');
                    var o,
                        days = 7,
                        expiresDate = new Date();
                    expiresDate.setTime(expiresDate.getTime() + (days * 24 * 60 * 60 * 1000));
                    if (!response.responseText) { // * пришел пустой ответ, все ОК, отправить куки
                        Ext.util.Cookies.set('betzet_password_hash', params.password, expiresDate);
                        me.sendCookie();
                    } else { // * пришел ответ, скорее всего проблемы с авторизацией, надо разобрать
                        try {
                            o = Ext.decode(response.responseText);
                        } catch (e) {
                            me.fireEvent('setupfail', response.responseText);
                            return;
                        }
                        if (o.success !== true) {
                            me.fireEvent('setupfail', o);
                        } else {
                            login = o.login;
                            me.fireEvent('setupready');
                        }
                    }
                },
                successCookie = function (response) { // * отправляем куки на сервер
                    var o;
                    params = null;
                    try {
                        o = Ext.decode(response.responseText);
                    } catch (e) {
                        me.fireEvent('setupfail', response.responseText);
                        return;
                    }
                    if (o.success !== true) {
                        me.fireEvent('setupfail', o);
                    } else {
                        Ext.util.Cookies.set('userId', o.userId);
                        login = o.login;
                        me.fireEvent('setupready');
                    }
                };

            me.initConfig(config);
            me.mixins.observable.constructor.call(me);
            me.callParent([config]);

            Ext.apply(me, {
                init: function () {
                    console.info('Setup init');
                    Ext.Ajax.request({
                        url: me.url,
                        success: success,
                        failure: failure,
                        //params: params,
                        method: 'POST'
                    });
                },
                sendParams: function () {
                    console.info('sendParams');
                    Ext.Ajax.request({
                        url: me.url,
                        success: successParams,
                        failure: failure,
                        params: params,
                        method: 'POST'
                    });
                },
                sendCookie: function () {
                    console.info('sendCookie');
                    Ext.Ajax.request({
                        url: me.url,
                        success: successCookie,
                        failure: failure,
                        //params: params,
                        method: 'POST'
                    });
                },
                getLogin: function () {
                    return login;
                },
                login: function (data) {
                    params = data;
                    me.sendParams();
                },
                logout: function () {
                    window.location.reload();
                }
            });

            // * вывод ошибок приложения в окне (вместо консоли)
            Ext.Error.handle = function (err) {
                Ext.Msg.show({
                    title: 'Error',
                    msg: [
                        'source class: ' + err.sourceClass,
                        'source method: ' + err.sourceMethod,
                        'Message:' + err.msg
                    ].join('<br/>'),
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
                return true;
            }
        }
    },
    function () {
        var me = this;
        // * короткие имена для полезных методов
        Ext.apply(Office, {
            init: me.init,
            sendParam: me.sendParams,
            sendCookie: me.sendCookie,
            getLogin: me.getLogin,
            login: me.login,
            logout: me.logout
        });
    }
);