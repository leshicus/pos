Ext.define('Office.view.login.WindowLoginC', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.windowlogin',
    init: function () {
        this.listen({
            component: {
                '#': {},
                // * язык
                'combobox[itemId=language]': {
                    change: function (field, newVal) {
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
    passwordClickEvent: function (field) {
        field.getEl().on('click', function () {
            var form = this.getView(),
                sumField = form.down('form #password');
            sumField.reset();
        }, this);
    },
    onSuccess: function () {
        console.log('success load local file');
    },
    onFailure: function () {
        Util.erMes('Failed to load locale file.');
    },
    onLoginClick: function () {
        var window = this.getView(),
            data = window.getViewModel().getData();
        Office.login(data);
        window.close();
    },
    onKeyPress: function (field, e) {
        var window = this.getView(),
            form = window.lookupReference('formLogin');

        if (form.isValid() && Ext.EventObject.ENTER === e.getKey()) {
            this.onLoginClick();
        }
    },

    onChangeUsername: function (field, n, o) {
        // * сохраним в локальное хранилище username
        var localStorage = Ext.util.LocalStorage.get('newpos');
        //if (!localStorage)
        //    localStorage = new Ext.util.LocalStorage({
        //        id: 'newpos'
        //    });

        //if (localStorage) {
            localStorage.setItem('lastLogin', n);
        //}
    },

    onAfterRender: function (win) {
        var localStorage = Ext.util.LocalStorage.get('newpos');
        if (!localStorage)
            localStorage = new Ext.util.LocalStorage({
                id: 'newpos'
            });
        //if (localStorage) {
            // * очистим локальное хранилище от прежних игроков
            localStorage.removeItem('selectedGamer');
            localStorage.removeItem('timeline_id');

            // * возьмем из локального хранилища username
            var lastLogin = localStorage.getItem('lastLogin');
            var vm = win.getViewModel();
            vm.set('username', lastLogin);
       // }

        // * очистим локальное хранилище от прежних купонов
        var localStorageBasket = Ext.util.LocalStorage.get('newpos_basket');
        if (localStorageBasket) {
            delete window.localStorage.newpos_basket; // * удаляю запись newpos_basket
            delete window.localStorage.bets;

            localStorageBasket.clear();
        }
        //localStorage.removeItem('multi_value');
        //localStorage.removeItem('system_value');

        // * если логин есть- фокусируемся на пароле, если нет- на логине
        var username = win.down('#username'),
            password = win.down('#password');
        if (lastLogin)
            password.focus();
        else
            username.focus();
    }

    // * быстрое тестирование функционала
    //onTest: function (btn) {
    //    btn.up('window').close();
    //   // var formKladr = Ext.create('Office.view.card.FormKladrV', {});
    //    Ext.create('Ext.data.Store', {
    //        storeId:'employeeStore',
    //        fields:['firstname', 'lastname', 'seniority', 'dep', 'hired'],
    //        data:[
    //            {firstname:"Michael", lastname:"Scott"},
    //            {firstname:"Dwight", lastname:"Schrute"},
    //            {firstname:"Jim", lastname:"Halpert"},
    //            {firstname:"Kevin", lastname:"Malone"},
    //            {firstname:"Angela", lastname:"Martin"}
    //        ]
    //    });
    //
    //    var grid = Ext.create('Ext.grid.Panel', {
    //        title: 'Action Column Demo',
    //        store: Ext.data.StoreManager.lookup('employeeStore'),
    //        columns: [
    //            {text: 'First Name',  dataIndex:'firstname'},
    //            {text: 'Last Name',  dataIndex:'lastname'},
    //            {
    //                xtype:'actioncolumn',
    //                width:50,
    //                items: [{
    //                    iconCls: 'football',  // Use a URL in the icon config
    //                    tooltip: 'Edit',
    //                    handler: function(grid, rowIndex, colIndex) {
    //                        var rec = grid.getStore().getAt(rowIndex);
    //                        alert("Edit " + rec.get('firstname'));
    //                    }
    //                }]
    //            }
    //        ],
    //        width: 250,
    //        //renderTo: window
    //    });
    //
    //    var window = Ext.create('Ext.Window', {
    //        width: 400,
    //        title: 'Заполнение адреса',
    //        constrain: true,
    //        closable: false,
    //        modal: true,
    //        layout: 'fit'
    //    });
    //    window.add(grid);
    //    window.show();
    //}

});
