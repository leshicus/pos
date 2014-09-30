Ext.define('Office.util.Filters', {
    singleton: true,

    filters: Array(),
    init: function () {
        var dateDefault = new Date(),
            stringDate = Ext.Date.format(dateDefault, Office.util.Utilities.dateFormat);

        this.filters.push(
            {id: 'cbDateFrom', value: stringDate},
            {id: 'cbDateType', value: 0},
            {id: 'placeName', value: 'office'},
            {id: 'page', value: 1},
            {id: 'userId', value: Ext.util.Cookies.get('userId')},
            {id: 'username', value: Ext.util.Cookies.get('betzet_login')},
            {id: 'token', value: Ext.util.Cookies.get('betzet_token')}
        );
    },
    setFilters: function (id, value) {
        var filters = this.getFilters(),
            exist;

        exist = Ext.Array.findBy(filters, function (item, index) {
            if (item && item.id == id) {
                if (value && value.length != 0) {// * обновление фильтра
                    this.filters[index] = {
                        id: id,
                        value: value
                    }
                } else {// * удаление фильтра
                    Ext.Array.remove(this.filters, item);
                }
                return true;
            }
        }, this);
        if (!exist && value && value.length != 0) {// * добаление фильтра
            var filter = {
                id: id,
                value: value
            };
            this.filters.push(filter);
        }
    },
    getFilters: function () {
        return this.filters;
    },

    removeAllFilters: function () {
        this.filters = [];
    },
    // * массив фильтров в заголовке грида
    getArrFilterComp: function (panel) {
        var arrOut = [],
            itemArr = (panel.superclass.xtype == 'gridpanel' || panel.superclass.xtype == 'treepanel') ? panel.columns : panel.items.items;
        //console.info(itemArr);
        Ext.Array.each(itemArr, function (item) {
            var superclassXtype = item.superclass.xtype,
                superclassSuperclassXtype = item.superclass.superclass.xtype,
            // * чтобы выбрать контейнеры- column и fieldset
                filterArr = (superclassXtype == 'container' || superclassXtype == 'headercontainer' || superclassSuperclassXtype == 'headercontainer' ) ? item.items.items : item;
            if (Office.util.Utilities.count(filterArr) > 0) { // * не пустой контейнер, либо единичный элемент
                Ext.Array.each(filterArr, function (item) {
                    //console.info(item,filterArr,superclassXtype,superclassSuperclassXtype);
                    arrOut.push(item);
                });
            }else{
                // * проверка, чтобы колонки грида не лезли
                if(superclassXtype !== 'headercontainer' && superclassSuperclassXtype !== 'headercontainer') {
                    //console.info(superclassXtype, superclassSuperclassXtype);
                    arrOut.push(item);
                }
            }
        });
        return arrOut;
    }
});