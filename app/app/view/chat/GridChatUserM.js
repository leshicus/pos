Ext.define('Office.view.chat.GridChatUserM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridchatuser',
    stores: {
        chatuser: {
            fields: [],
            proxy: {
               type: 'ajax',
                //url: Ext.util.Format.format(Server.chatgroupuser(),'{filters.groupid}','{filters.allUsers}','{login}','{filters.userlogin}'),
                url:Server.getUrl({
                    class: 'Pos_Chat_Userread',
                    token: '{token}',
                    params: {
                        login: '{login}',
                        groupid: '{filters.groupid}',
                        allusers: '{filters.allUsers}',
                        userlogin: '{filters.userlogin}'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            storeId: 'chatuser',
            autoLoad: false
        }
    }
});
