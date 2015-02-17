Ext.define('Office.view.login.WindowLoginV', {
        extend: 'Ext.window.Window',
        requires: [
            'Ext.layout.container.Fit',
            'Ext.form.Panel',
            'Ext.app.ViewModel',
            'Ext.form.Label',
            'Ux.locale.Manager',
            'Office.util.Setup',
            'Office.view.login.WindowLoginC'
        ],
        alias: 'widget.windowlogin',
        controller: 'windowlogin',
        autoShow: true,
        width: 350,
        closable: false,
        locales: {
            title: "windowlogin.title"
        },
        layout: 'fit',
        modal: true,
        defaultListenerScope: true,
        referenceHolder: true,
        viewModel: 'default',
        glyph: 'xf084@FontAwesome',
        cls: 'loginkey',
        defaultButton: 'username',
        initComponent: function () {
            console.info('WindowLoginV init');

            Setup.clearCookies();

            var vm = this.getViewModel();
            vm.set('username', 'kassa103'); // * удалить

            this.title = Ux.locale.Manager.get("windowlogin.title", '?');
            this.items = [
                {
                    xtype: 'form',
                    padding: 15,
                    reference: 'formLogin',
                    defaults: {
                        labelWidth: 130,
                        xtype: 'textfield',
                        allowBlank: false,
                        enableKeyEvents: true,
                        anchor: '100%',
                        msgTarget: 'side', // * чтобы убрать глюк со сбиванием фокуса с поля всплывающей подсказкой
                        listeners: {
                            keypress: 'onKeyPress',
                            scope: 'controller'
                        }
                    },
                    items: [
                        {
                            xtype: 'combo',
                            itemId: 'language',
                            editable: false,
                            allowBlank: false,
                            valueField: 'abbr',
                            displayfield: 'text',
                            store: this._languageStore,
                            value: this._language,
                            fieldLabel: Ux.locale.Manager.get("windowlogin.formfield.language"),
                            locales: {
                                fieldLabel: "windowlogin.formfield.language"
                            }
                        },
                        {
                            bind: '{username}',
                            itemId: 'username',
                            fieldLabel: Ux.locale.Manager.get("windowlogin.formfield.username"),
                            locales: {
                                fieldLabel: "windowlogin.formfield.username"
                            },
                            listeners:{
                                render: 'usernameClickEvent',
                                scope:'controller'
                            }
                        },
                        {
                            bind: '{password}',
                            itemId: 'password',
                            fieldLabel: Ux.locale.Manager.get("windowlogin.formfield.password"),
                            inputType: 'password',
                            locales: {
                                fieldLabel: "windowlogin.formfield.password"
                            }
                        },
                        {
                            xtype: 'button',
                            scale: 'medium',
                            margin: '15 0 0 180',
                            glyph: Glyphs.get('signin'),
                            formBind: true, // * enable|disable depends on form validation
                            handler: 'onLoginClick',
                            scope: 'controller',
                            text: Ux.locale.Manager.get("windowlogin.button.login"),
                            locales: {
                                text: "windowlogin.button.login"
                            }
                        }
                    ]
                }
            ]
            this.tools = [
                {
                    type: 'close',
                    tooltip: 'test',
                    listeners:{
                        click:'onTest',
                        scope:'controller'
                    }
                }
            ]
            this.callParent();
        }
    }
);