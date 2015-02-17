Ext.define('Office.util.Setup', {
        singleton: true,
        alternateClassName: ['Setup'],
        requires: [
            'Ext.util.Observable',
            'Ext.util.Cookies'
        ],
        mixins: {
            observable: 'Ext.util.Observable'
        },
        url: Ext.util.Format.format(Server.getLogin(), Server.getToken()),
        constructor: function (config) {
            console.info('constructor Setup');

            var me = this,
                login,
                params,
                success = function (response) {
                    console.info('success getLogin');
                    var o;
                    params = null;
                    try {
                        o = Ext.decode(response.responseText);
                    } catch (e) {
                        me.failApp(response.responseText);
                        return;
                    }
                    if (true !== o.success) {
                        me.failApp(o);
                    }
                },
                failure = function (response) {
                    console.info('failure getLogin');
                    params = null;
                    me.failApp(response);
                },
                successParams = function (response) {
                    console.info('successParams');
                    var o,
                        days = 7,
                        expiresDate = new Date();
                    expiresDate.setTime(expiresDate.getTime() + (days * 24 * 60 * 60 * 1000));
                    if (response.responseText) {
                        Ext.util.Cookies.set('betzet_login', params.username);
                        try {
                            o = Ext.decode(response.responseText);
                        } catch (e) {
                            //me.fireEvent('setupfail', response.responseText);
                            me.failApp(response.responseText);
                            return;
                        }
                        if (o.success !== true) {
                            Utilities.toast('Внимание', 'Ошибка авторизации');
                            me.failApp(o);
                        } else {
                            Ext.util.Cookies.set('betzet_token', o.token);
                            Server.setToken(o.token);
                            Server.tok = o.token;
                            me.startApp(params['username']);
                        }
                    } else { // фиг знает что это за случай
                        console.info(arguments);
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
                        method: 'POST'
                    });
                },
                sendParams: function () {
                    console.info('sendParams');
                    Ext.Ajax.request({
                        url: Ext.util.Format.format(Server.getLogin(params), Server.getToken()),
                        success: successParams,
                        failure: failure
                    });
                },
                sendCookie: function () {
                    console.info('sendCookie');
                    Ext.Ajax.request({
                        url: me.url,
                        success: successCookie,
                        failure: failure,
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
                    window.location.reload(true);
                }
            });
            // * вывод ошибок приложения в окне (вместо консоли)
            /*Ext.Error.handle = function (err) {
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
             }*/
        },
        clearCookies: function () {
            Ext.util.Cookies.clear('betzet_login');
            Ext.util.Cookies.clear('betzet_password_hash');
            Ext.util.Cookies.clear('betzet_token');
            Ext.util.Cookies.clear('locale');
            Ext.util.Cookies.clear('userId');
            Ext.util.Cookies.clear('officeCurrentPagePropetry');
            Ext.util.Cookies.clear('officePagesProperty');
        },

        showMenumain: function (username, globals) {
            // * главное меню
            var menumain = Ext.create('Office.view.menumain.MenuMainV', {
                    viewModel: {
                        data: {
                            theUser: username,
                            globals:globals
                        }
                    }
                }),
                mainController = Office.app.getController('Main');
            var runner = new Ext.util.TaskRunner(),
                taskSession = runner.newTask({
                    run: function () {
                        console.info('taskSession reload');
                        menumain.getController().loadSessionData();
                    },
                    interval: 1000 * Utilities.sessionAskInterval // в секундах
                });

            menumain.on('close', function () {
                taskSession.stop();
            });

            taskSession.start();
        },
        // * успешная авторизация
        startApp: function (username) {
            console.info('startApp');

            // * запросим глобальные параметры системы
            var me = this,
                objUrl = {
                class: 'Pos_Sessions_Globalpropread',
                params: {}
            };
            Ext.Ajax.request({
                url: Server.getUrl(objUrl),
                success: function (response) {
                    if (response.responseText) {
                        var o = Ext.decode(response.responseText);
                        if (o.success) {
                            me.showMenumain(username, o.rows);
                        } else {
                            Utilities.toast('Ошибка', 'Не удалось получить глобальные настройки системы');
                            me.failApp(response);
                        }
                    } else {
                        Utilities.toast('Ошибка', 'Не удалось получить глобальные настройки системы');
                        me.failApp(response);
                    }
                },
                failure: function (response) {
                    me.failApp(response);
                }
            });
        },
        // * провал авторизации
        failApp: function (o) {
            console.info('failApp');

            var E = Ext.Error;

            if (Ext.isObject(o)) {
                if (o.errors) {
                    Ext.Msg.show({
                        title: 'Error',
                        msg: o.errors.reason,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK,
                        fn: function () {
                            Ext.create({
                                xtype: 'windowlogin',
                                _language: Ux.locale.Manager.getLanguage(),
                                _languageStore: Ux.locale.Manager.getAvailable()
                            });
                        }
                    });
                } else {
                    // * пользователь еще не зарегистрирован, нужно показать ему окно регистрации
                    var win = Ext.create({
                        xtype: 'windowlogin',
                        _language: Ux.locale.Manager.getLanguage(),
                        _languageStore: Ux.locale.Manager.getAvailable()
                    });
                    Debug.setLoginFields(win);
                }
            } else {
                E.raise('Сервер вернул не объект');
            }
        }
    },

    function () {
        var me = this;
        // * короткие имена для полезных методов
        Ext.apply(Office, {
            init: me.init,
            sendParam: me.sendParams,
            //sendCookie: me.sendCookie,
            getLogin: me.getLogin,
            login: me.login,
            logout: me.logout
        });
    }
);