Ext.define('Office.view.chat.GridChatMesM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridchatmes',
    stores: {
        chatmes: {
            fields: [],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Chat_Messageread',
                    token: '{token}',
                    params: {
                        login: '{login}',
                        groupid: '{filters.groupid}',
                        userlogin: '{filters.userlogin}',
                        userid: '{filters.userid}',
                        min_date: '{get_min_date}',
                        max_date: '{get_max_date}'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            idProperty: 'id',
            storeId: 'chatmes',
            autoLoad: false
        }
    },
    formulas: {
        get_min_date: function (get) {
            return Ext.Date.format(get('filters.min_date'), 'Y-m-d H:i:s');
        },
        get_max_date: function (get) {
            return Ext.Date.format(get('filters.max_date'), 'Y-m-d H:i:s');
        }
    }
});
