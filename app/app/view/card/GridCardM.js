Ext.define('Office.view.card.GridCardM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridcard',
    stores: {
        card: {
            fields: [
                'id',
                'lastname',
                'firstname',
                'patronymic_name',
                'passport_number',
                'is_resident',
                'passport_issuer',
                'passport_issue_datetime',

                'passport_code',
                'address',
                'mobile_phone',
                'is_vip',
                'is_blacklisted',
                'barcode',
                'binding_datetime',

                {name: 'card_status', persist: false},
                {name: 'edit', persist: false},
                {name: 'login', persist: false},
                // * виртуальные, рассченые поля
                /* {
                 name: 'passport_issue_datetime_converted',
                 calculate: function (data) {
                 return Gui.formatPassportIssueDate(data.passport_issue_datetime);
                 },
                 persist: false
                 },*/
                {
                    name: 'passer',
                    calculate: function (data) {
                        return Gui.getPassportSerie(data.passport_number, data.is_resident == 1);
                    },
                    persist: false
                },
                {
                    name: 'pasnom',
                    calculate: function (data) {
                        return Gui.getPassportNumber(data.passport_number, data.is_resident == 1);
                    },
                    persist: false
                }
            ],
            proxy: {
                type: 'ajax',
                url: Server.getUrl({
                    class: 'Pos_Barcode_Read',
                    token: '{token}',
                    params: {
                        userid: '{filters.userid}',
                        lastname: '{filters.lastname}',
                        firstname: '{filters.firstname}',
                        passport_number: '{filters.passport_number}',
                        barcode: '{filters.barcode}'
                    }
                }),
                /*api: {
                 create: Ext.util.Format.format(Server.getBarCode(),'{token}','{filters.user}'),
                 read: Ext.util.Format.format(Server.getBarCode(),'{token}','{filters.user}'),
                 update: Ext.util.Format.format(Server.getBarCode(),'{token}','{filters.user}')
                 },*/
                reader: {
                    type: 'json',
                    limit:100,
                    rootProperty: 'rows',
                    totalProperty: 'results'
                },
                writer: {
                    type: 'json',
                    rootProperty: 'rows'
                }
            },
            storeId: 'card',
            autoLoad: false
        }
    }

});
