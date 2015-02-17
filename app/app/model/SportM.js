Ext.define('Office.model.SportM', {
    extend:'Ext.data.Model',
    fields: ['id', 'value', 'checked', 'iconCls'],
    proxy: {
        type: 'ajax',
        url: Server.getUrl({
            class: 'Pos_Filters_Sport',
            //token: '{token}',
            token: Server.getToken(),
            params: {
                mode: 'office'
            }
        }),
        reader: {
            type: 'json',
            rootProperty: 'sportfilter.types'
        }
    }
});