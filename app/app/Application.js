Ext.define('Office.Application', {
    extend: 'Ext.app.Application',
    requires: [
        // 'Ext.tip.*',
        /* 'Ext.state.CookieProvider',
         'Ext.state.LocalStorageProvider'*/

        'Office.util.Util',
        'Office.view.fill.UtilMarkets',
        'Office.view.pay.Status',
        'Office.util.TaskF',
        // 'Office.view.fill.coeff.CoefShowModes',
        'Office.view.fill.coeff.ApplyChangedData',
        'Office.util.Server',
        'Office.util.Filters',
        'Office.util.Setup',
        'Office.util.Debug',
        'Office.util.Gui',
        //'Office.util.ClientWS',
        //'Office.util.JsonPStorageProvider',
        //  'Office.util.AjaxStorageProvider',

        'Ux.locale.Manager', // * блок для динамической локализации компонентов
        'Ux.locale.override.extjs.Button',
        'Ux.locale.override.extjs.Component1',
        'Ux.locale.override.extjs.FieldContainer',
        'Ux.locale.override.extjs.MenuItem',
        'Ux.locale.override.extjs.Panel',
        'Ux.locale.override.extjs.GridColumn',
        'Ux.locale.override.extjs.Text',
        'Ux.locale.override.extjs.TreePanel',
        'Office.overrides.NavigationModel', // * исправление комбо, нельзя нажать первую запись
        'Office.overrides.Table', // * мой багфикс, какая-то ошибка выскакивала в гриде
        'Office.overrides.TreeView', // * возможность размещать глифы в tools
        'Office.overrides.Combo', // лечение пропадание значения из комбика при forceSelection
        'Office.overrides.TreeStore', // * отправлять номер страницы на сервер и др. параметры для пэйджинга
        'Office.overrides.Panel',
        'Office.overrides.LocalStore',
        'Office.overrides.BufferedRenderer' // * лечит грид, который после рефреша имеет отступ сверху при скроллинге
    ],
    name: 'Office',

    views: [
        'Office.view.menumain.MenuMainV',
        'Office.view.login.WindowLoginV'
    ],
    controllers: [
        'Main'
    ],
    models: [],
    stores: [],

    launch: function () {
        // * багфиксы
        // * Исправление бага 43 Хрома, когда смещалось отображение textfield
        if (Ext.isChrome && Ext.chromeVersion === 43)
            Ext.getBody().addCls('chrome-43');

        // * какого шрифта у нас будут глифы
        Ext.setGlyphFontFamily('FontAwesome');

        Office.util.Setup.clearCookies();
        Ext.util.Cookies.set('locale', Ux.locale.Manager.getLanguage());

        // * очищаю хэш в url
        parent.location.hash = "";

        // * инициализация локализации
        Ux.locale.Manager.setConfig({
            ajaxConfig: {
                method: 'GET'
            },
            language: 'Русский',
            tpl: Office.util.Server.getLocalization(),
            type: 'ajax'
        });
        var callbackLocale = function () {
                var Setup = Office.util.Setup;
                Setup.init();
            };
        // * применяю Русскую локализацию, после этого запускаю интерфейс ввода имент-пароля
        Ux.locale.Manager.init(callbackLocale);

        // * указываю явно как отображать разделитель тысячных, и дробной части.
        // * В противном случае они меняются в зависимости от языка
        Ext.util.Format.thousandSeparator = " ";
        Ext.util.Format.decimalSeparator = ".";
    }
});
