Ext.define('Office.Application', {
    extend: 'Ext.app.Application',
    requires: [
        'Ext.tip.*',
        /* 'Ext.state.CookieProvider',
         'Ext.state.LocalStorageProvider'*/
        'Office.util.Utilities',
        'Office.util.Filters',
        'Office.util.Setup',
        //'Office.view.login.WindowLoginV',
        //'Office.util.JsonPStorageProvider',
        //  'Office.util.AjaxStorageProvider',
        // * блок для локализации компонентов
        'Ux.locale.Manager',
        'Ux.locale.override.extjs.Button',
        'Ux.locale.override.extjs.Component',
        'Ux.locale.override.extjs.FieldContainer',
        'Ux.locale.override.extjs.MenuItem',
        'Ux.locale.override.extjs.Panel',
        'Ux.locale.override.extjs.GridColumn',
        'Ux.locale.override.extjs.Text',
        'Ux.locale.override.extjs.TreePanel',
        'Office.overrides.Table',
        'Office.overrides.ActionGlyphs'
    ],
    name: 'Office',

    views: [
        'Office.view.login.WindowLoginV',
        'Office.view.menumain.MenuMainV'
    ],

    controllers: [
        'Main'
    ],
    models:[
    ],

    stores: [],

    launch: function () {
        Ext.setGlyphFontFamily('FontAwesome');
        Ext.tip.QuickTipManager.init();

        Ext.util.Cookies.set('locale', Ux.locale.Manager.getLanguage());

        var me = this,
            Setup = Office.util.Setup;
        // * install listeners
        Setup.on({
            scope: me,
            setupready: me.startApp,
            setupfail: me.failApp
        });
        Setup.init();
    },

    startApp: function () {
        console.info('startApp');
        var me = this,
            login = Office.getLogin();
        if (!login) {
            me.failApp({error: 'login'});
            return;
        }
        var menumain = Ext.create('Office.view.menumain.MenuMainV');
    },
    failApp: function (o) {
        console.info('failApp');
        var me = this,
            E = Ext.Error;
        if (Ext.isObject(o)) {
            if (o.errors) {
                Ext.Msg.show({
                    title: 'Error',
                    msg: o.errors.reason,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK,
                    fn: function () {
                        Ext.create({
                            xtype: 'windowlogin'
                        });
                    }
                });
            } else {
                // * пользователь еще не зарегистрирован, нужно показать ему окно регистрации
                Ext.create({
                    xtype: 'windowlogin'
                });
            }
        } else {
            E.raise('Сервер вернул не объект');
        }
    }
});
