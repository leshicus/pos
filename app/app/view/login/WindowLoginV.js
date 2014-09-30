Ext.define('Office.view.login.WindowLoginV', {
    extend: 'Ext.window.Window',
    requires: [
        'Ext.layout.container.Fit',
        'Ext.form.Panel',
        'Ext.app.ViewModel',
        'Ext.form.Label'
    ],
    alias: 'widget.windowlogin',
    autoShow: true,
    width: 400,
    //height:150,
    closable: false,
    title: 'Авторизация',
    layout: 'fit',
    modal: true,
    defaultListenerScope: true,
    referenceHolder: true,
    viewModel: 'default',

    items: [
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
                    keypress: 'onKeyPress'
                }
            },
            items: [
           /*     {
                    xtype: 'label',
                    text: 'Укажите Имя пользователя: test, пароль любой'
                },*/
                {
                    bind: '{username}',
                    itemId: 'username',
                    emptyText:'1',
                    fieldLabel: 'Имя пользователя'
                },
                {
                    bind: '{password}',
                    fieldLabel: 'Пароль',
                    emptyText:'любой',
                    inputType: 'password'
                },
                {
                    xtype: 'button',
                    text: 'Войти',
                    scale: 'medium',
                    margin: '15 0 0 230',
                    formBind: true, // * enable|disable depends on form validation
                    handler: 'onLoginClick'
                }
            ]
        }
    ],
    defaultButton: 'username',
    onLoginClick: function () {
        console.info('onLoginClick');
        var me = this,
            data = me.getViewModel().getData();
        Office.login(data);
        me.close();
    },
    onKeyPress: function (field, e) {
        console.info('onKeyPress');
        var me = this,
            form = me.lookupReference('formLogin');
        if (form.isValid() && Ext.EventObject.ENTER === e.getKey()) {
            me.onLoginClick();
        }
    }
});