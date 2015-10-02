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

            var me = this,
                login,
                params,
                success = function (response) {
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
                    params = null;
                    me.failApp(response);
                },
                successParams = function (response) {
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
                            Util.toast('Внимание', 'Ошибка авторизации');
                            me.failApp(o);
                        } else {
                            Ext.util.Cookies.set('betzet_token', o.token);
                            Ext.util.Cookies.set('userId', o.userId);
                            Server.setToken(o.token);
                            Server.tok = o.token;
                            me.startApp();
                            //me.startApp(params['username']);
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
                    Ext.Ajax.request({
                        url: me.url,
                        success: success,
                        failure: failure,
                        method: 'POST'
                    });
                },
                sendParams: function () {
                    Ext.Ajax.request({
                        url: Ext.util.Format.format(Server.getLogin(params), Server.getToken()),
                        success: successParams,
                        failure: failure
                    });
                },
                sendCookie: function () {
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
            //Ext.Error.handle = function (err) {
            // Ext.Msg.show({
            // title: 'Error',
            // msg: [
            // 'source class: ' + err.sourceClass,
            // 'source method: ' + err.sourceMethod,
            // 'Message:' + err.msg
            // ].join('<br/>'),
            // icon: Ext.Msg.ERROR,
            // buttons: Ext.Msg.OK
            // });
            // return true;
            // }
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

        showMenumain: function (globals, constants) {
            // * главное меню
            var menumain = Ext.ComponentQuery.query('menumain')[0];

            if (!menumain) {
                menumain = Ext.create('Office.view.menumain.MenuMainV', {
                    viewModel: {
                        data: {
                            theUser: Ext.util.Cookies.get('betzet_login'),
                            globals: globals,
                            constants: constants
                        }
                    }
                });
            } else {
                var vm = menumain.getViewModel();
                vm.set('theUser', Ext.util.Cookies.get('betzet_login'));
                vm.set('globals', globals);
                vm.set('constants', constants);
            }

            TaskF.taskSessionStart();
        },

        // * получить глобальные константы системы
        getGlobalCons: function (arrProps, callbackFn) {
            var _this = this,
                objUrl = {
                    class: 'Pos_Sessions_Constantsread',
                    params: {
                        userId: Ext.util.Cookies.get('userId')
                    }
                };
            Ext.Ajax.request({
                url: Server.getUrl(objUrl),
                success: function (response) {
                    if (response.responseText) {
                        var o = Ext.decode(response.responseText);
                        if (o.success) {
                            _this.showMenumain(arrProps, o.rows);
                            if (callbackFn)
                                callbackFn();
                        } else {
                            Util.toast('Ошибка', 'Не удалось получить глобальные настройки системы');
                            _this.failApp(response);
                        }
                    } else {
                        Util.toast('Ошибка', 'Не удалось получить глобальные настройки системы');
                        _this.failApp(response);
                    }
                },
                failure: function (response) {
                    _this.failApp(response);
                }
            });
        },

        //todo объединить c  getGlobalCons
        // * получить глобальные параметры системы
        getGlobalProp: function (callbackFn) {
            // * запросим глобальные параметры системы
            var _this = this,
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
                            _this.getGlobalCons(o.rows, callbackFn);
                        } else {
                            Util.toast('Ошибка', 'Не удалось получить глобальные настройки системы');
                            _this.failApp(response);
                        }
                    } else {
                        Util.toast('Ошибка', 'Не удалось получить глобальные настройки системы');
                        _this.failApp(response);
                    }
                },
                failure: function (response) {
                    _this.failApp(response);
                }
            });
        },

        // * успешная авторизация
        startApp: function () {
            this.getGlobalProp();

            window.FayeClient = new FayeClient();
            FayeClient.init();

            FayeClient.sendCommand({command: 'hide_modal'});
        },

        // * провал авторизации
        failApp: function (o) {
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
                    //Debug.setLoginFields(win);
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