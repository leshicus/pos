Ext.define('Office.view.login.WindowLoginV', {
        extend: 'Ext.window.Window',
        requires: [
            'Ext.layout.container.Fit',
            'Ext.form.Panel',
            'Ext.app.ViewModel',
            'Ext.form.Label',
            'Ux.locale.Manager',
            'Office.util.Setup',
            'Office.view.login.WindowLoginC',
            //'Office.view.login.WindowLoginM'
        ],
        alias: 'widget.windowlogin',
        controller: 'windowlogin',
        autoShow: true,
        width: 350,
        closable: false,
        closeAction: 'destroy',
        locales: {
            title: "windowlogin.title"
        },
        layout: 'fit',
        modal: true,
        //defaultListenerScope: true,
        referenceHolder: true,
        viewModel: 'default',
        //viewModel: {
        //    type: 'windowlogin'
        //},
        glyph: 'xf084@FontAwesome',
        cls: 'loginkey',
        //defaultButton: 'username',
        listeners: {
            afterrender: 'onAfterRender'
        },
        initComponent: function () {
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
                        anchor: '100%'
                        // msgTarget: 'side', // * чтобы убрать глюк со сбиванием фокуса с поля всплывающей подсказкой
                    },
                    layout: 'anchor',
                    items: [
                        {
                            xtype: 'combo',
                            itemId: 'language',
                            editable: false,
                            allowBlank: false,
                            valueField: 'abbr',
                            displayField: 'text',
                            store: this._languageStore,
                            value: this._language,
                            fieldLabel: Ux.locale.Manager.get("windowlogin.formfield.language"),
                            locales: {
                                fieldLabel: "windowlogin.formfield.language"
                            },
                            listeners:{
                                change:'onChangeLocale'
                            }
                        },
                        {
                            bind: '{username}',
                            itemId: 'username',
                            selectOnFocus: true,
                            fieldLabel: Ux.locale.Manager.get("windowlogin.formfield.username"),
                            locales: {
                                fieldLabel: "windowlogin.formfield.username"
                            },
                            listeners: {
                                keypress: 'onKeyPress',
                                change: 'onChangeUsername',
                                scope: 'controller'
                            }
                        },
                        {
                            bind: '{password}',
                            itemId: 'password',
                            //emptyText:'\u0362 \u20D7 \u279F \u2192',
                            fieldLabel: Ux.locale.Manager.get("windowlogin.formfield.password"),
                            inputType: 'password',
                            locales: {
                                fieldLabel: "windowlogin.formfield.password"
                            },
                            listeners: {
                                render: 'passwordClickEvent',
                                keypress: 'onKeyPress',
                                scope: 'controller'
                            }
                        },
                        {
                            xtype: 'button',
                            scale: 'medium',
                            anchor: '100%',
                            // margin: '15 0 0 180',
                            margin: '15 0 0 135',
                            glyph: Glyphs.get('signin'),
                            formBind: true, // * enable|disable depends on form validation
                            handler: 'onLoginClick',
                            scope: 'controller',
                            text: Ux.locale.Manager.get("windowlogin.button.login"),
                            locales: {
                                text: "windowlogin.button.login"
                            }
                        },
                        //{
                        //    xtype: 'button',
                        //    scale: 'medium',
                        //    anchor: '100%',
                        //    margin: '15 0 0 135',
                        //    handler: 'onTest',
                        //    scope: 'controller',
                        //    text: 'grid'
                        //}

                    ],
                    listeners: {
                        afterrender: Util.validate
                    }
                }
            ]
            //this.tools = [
            //    {
            //        type: 'close',
            //        tooltip: 'test',
            //        listeners:{
            //            click:'onTest',
            //            scope:'controller'
            //        }
            //    }
            //]
            this.callParent();
        }
    }
);