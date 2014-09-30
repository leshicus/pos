Ext.define('Office.model.Sessions', {
    extend: 'Ext.data.Model',
    fields: [],
    proxy: {
        type: 'ajax',
        url: 'resources/php/accept/sessions.php',
        reader: {type: 'json'},
        extraParams: {
            xaction: 'getLastSessionInfo',
            user_id: Ext.util.Cookies.get('userId'),
            username: Ext.util.Cookies.get('betzet_login'),
            token: Ext.util.Cookies.get('betzet_token')
        }
    }
});