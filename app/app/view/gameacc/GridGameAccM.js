Ext.define('Office.view.gameacc.GridGameAccM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridgameacc',
    stores: {
        gameacc: {
            fields: [],
            proxy: {
                type: 'ajax',
                //url: Ext.util.Format.format(Server.accountsRead(), '{token}', '{filters.user_id}', '{filters.username}', '{filters.mobile_phone}', '{filters.min_balance}', '{filters.max_balance}'),
                url: Server.getUrl({
                    class: 'Pos_Accounts_Read',
                    token: '{token}',
                    params: {
                        mobile_phone: '{filters.mobile_phone}',
                        min_balance: '{filters.min_balance}',
                        max_balance: '{filters.max_balance}'
                    }
                }),
                reader: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            storeId: 'gameacc',
            autoLoad: true,
            listeners: {
                load: 'onLoad'
            }
        }
    },
    formulas: {
        // * определяет, нужно ли показывать кнопку Внести
        disableInputButton: {
            get: function (data) {
                var minBalance = Util.getGlobalConst('MINIMAL_CLUB_DEPOSIT_BALANCE'),
                    clubBalance = Util.getGlobalProp('balanceClub'),
                    isActiveDeposit = Util.getGlobalProp('isActiveDeposit');

                if ((isActiveDeposit == '1' && parseFloat(clubBalance) >= parseFloat(minBalance))
                    || isActiveDeposit == '0')
                    return 0;
                else
                    return 1;
            }
        }
    }
});
