Ext.define('Office.view.gameacc.GridGameActionM', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.gridgameaction',
    stores: {
        gameaction: {
            fields: [],
            proxy: {
                type: 'ajax',
                url:Server.getUrl({
                    class: 'Pos_Accounts_History',
                    token: '{token}',
                    params: {
                        player_id: '{filters.player_id}'
                    }
                }),
                reader: {
                    type: 'json'
                }
            },
            storeId:'gameaction',
            autoLoad: true
        }
    }
});
