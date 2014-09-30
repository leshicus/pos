Ext.define('Office.view.card.GridCardM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.gridcard',
    stores: {
        storeGridcard: {
            fields: [
                'cardid',
                'family',
                'firstname',
                'lastname',
                'pasnum',
                'passer',
                'resident',
                'issued',
                'dateissue',
                'depcode',
                'regaddr',
                'phone',
                'vip',
                'blacklist',
                'barcode',
                {name:'status',type:'int'}
            ],
            //idProperty: 'id',
            proxy: {
                type: 'ajax',
                url: 'resources/data/card/getGridCard.json',
                reader: {type: 'json'}
            },
            pageSize: Office.util.Utilities.pageSize,
            remoteSort: true,
            sorters: [{
                property: 'family',
                direction: 'DESC'
            }],
            autoLoad: true
        }
    },
    formulas: {
        currentClient: {
            bind: {
                bindTo: '{gridcardRef.selection}',
                deep: true
            },
            get: function (client) {
                //console.info(arguments);
                return client;
            },
            set: function (client) {
                //console.info(arguments);
                if (!client.isModel) {

                    client = this.get('storeGridcard').getById(client);
                    //console.info(client);
                }
                this.set('currentClient', client);
            }
        },
        // * для активации/деактивации кнопок в зависимости от того, изменили что-то или нет
        /*status: {
         bind: {
         bindTo: 'currentClient',
         deep: true
         },
         get: function (client) {
         var ret = {
         dirty: client ? client.dirty : false,
         valid: client && client.isModel ? client.isValid() : false
         };
         ret.dirtyAndValid = ret.dirty && ret.valid;
         return ret;
         }
         }*/
    }
});
