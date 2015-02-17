Ext.define('Office.view.login.WindowLoginC', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.windowlogin',
    init: function () {
        this.listen({
            component: {
                '#': {

                },
                // * язык
                'combobox[itemId=language]': {
                    change: function (field, newVal) {
                        console.log('language');

                        // * локализация пользовательских названий полей
                        Ux.locale.Manager.updateLocale(Ux.locale.Manager.getLanguageText(newVal));

                        // * локализация штатных компонентов
                        var url = Ext.util.Format.format("app/Ux/locale/ext-locale/ext-locale-{0}.js", newVal);
                        Ext.Loader.loadScript({
                                url: url,
                                onLoad: this.onSuccess,
                                onError: this.onFailure,
                                scope: this
                            }
                        );
                    }
                }
            }
        })
    },
    // * очищать поле username если на него щелкнуть
    usernameClickEvent: function (field) {
        field.getEl().on('click', function () {
            var form = this.getView(),
                sumField = form.down('form #username');
            sumField.reset();
        }, this);
    },
    onSuccess: function() {
        console.info('success load local file');
    },
    onFailure: function() {
        Ext.Msg.alert('Failure', 'Failed to load locale file.');
    },
    onLoginClick: function () {
        console.info('onLoginClick');
        var window = this.getView(),
            data = window.getViewModel().getData();
        Office.login(data);
        window.close();
    },
    onKeyPress: function (field, e) {
        console.info('onKeyPress');
        var window = this.getView(),
            form = window.lookupReference('formLogin');
        if (form.isValid() && Ext.EventObject.ENTER === e.getKey()) {
            this.onLoginClick();
        }
    },
    // * быстрое тестирование функционала
    onTest: function (btn) {
        btn.up('window').close();
        var formKladr = Ext.create('Office.view.card.FormKladrV', {

        });
        var window = Ext.create('Ext.Window', {
            width: 400,
            title: 'Заполнение адреса',
            constrain: true,
            closable: false,
            modal: true,
            layout: 'fit'
        });
        window.add(formKladr);
        window.show();
    }
});
