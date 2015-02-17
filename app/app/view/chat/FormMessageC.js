Ext.define('Office.view.chat.FormMessageC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.formmessage',

    onClickSend: function (button) {
        var formMes = button.up('formmessage'),
            editField = formMes.down('htmleditor'),
        //message = editField.getValue(),
            message = formMes.getViewModel().get('value'),
            mesId = formMes.getViewModel().get('id'),
            window = button.up('window'),
            gridChatMes = window.down('gridchatmes'),
            vmMes = gridChatMes.getViewModel(),
            userid = vmMes.get('filters.userid'),
            groupid = vmMes.get('filters.groupid'),
            //xaction = mesId ? 'update' : 'insert',
            classType = mesId ? 'Pos_Chat_Messageupdate' : 'Pos_Chat_Messageinsert',
            objUrl = {
                class: classType,
                params: {
                    id: mesId,
                    value: message,
                    userid: userid,
                    groupid: groupid,
                    login: vmMes.getData().login
                }
            };
        Ext.Ajax.request({
            //url: Ext.util.Format.format(Server.chatmes(), userid, groupid, vmMes.getData().login),
            url: Server.getUrl(objUrl),
            success: function (response) {
                console.info('success');
                try {
                    var o = Ext.decode(response.responseText);
                } catch (e) {
                    Ext.MessageBox.alert('Ошибка', o.message);
                }
                if (!o.success) {
                    Ext.MessageBox.alert('Ошибка', 'Ошибка отправки сообщения');
                } else {
                    gridChatMes.store.reload();
                }
            },
            failure: function (response) {
                console.info('failure');
                Ext.MessageBox.alert('Ошибка', 'Ошибка отправки сообщения');
            }
        });
    }

});
