Ext.define('Office.view.chat.GridChatGroupM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridchatgroup',
    stores: {
        chatgroup: {
            fields: [],
            proxy: {
               type: 'ajax',
                //url: Ext.util.Format.format(Server.chatgroup(),'{login}'),
                url:Server.getUrl({
                    class: 'Pos_Chat_Groupread',
                    token: '{token}',
                    params: {
                        login: '{login}'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            storeId: 'chatgroup',
            autoLoad: true
        }
    }
});
