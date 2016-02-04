// * не получается использовать, из-за того, что класс модели создается
// * до того, как приходит токен Server.getToken(). Печально.
Ext.define('Office.model.SportM', {
    extend: 'Ext.data.Model',
    fields: ['id', 'name', 'slug', 'group', 'rating', 'checked', 'iconCls'],
    proxy: {
        type: 'ajax',
        url: Ext.util.Format.format(Server.getFillEvent(), 'sports', '{locale}'),
        reader: {
            type: 'json'
        },
        useDefaultXhrHeader: false // * для кроссдоменных запросов
    }
});