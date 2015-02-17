Ext.define('Office.util.Filters', {
    requires: [],
    singleton: true,
    alternateClassName: ['Filters'],
    filters: Object(),
    dateDefault: new Date(),
    stringToday: Ext.Date.format(this.dateDefault, 'Y-m-d'),

    constructor: function () {
        console.info('Filters init');

        //console.info(this,this.filters,this.filters.length);
        if (!this.filters.length) {
            // * accept, pay - это section, равны для удобства store.storeId соответствующих гридов
            // * таймлайн
            this.filters['timeline'] = Array();
            // * таймлайн-Ставки
            this.filters['slip'] = Array(
                {id: 'xaction', value: 'subslipsTree'}
            );
            // * таймлайн-поиск игроков
            this.filters['searchtimelinegambler'] = Array(
                {id: 'xaction', value: 'read'},
                {id: 'hasLimit', value: '0'}
            );
            // * Принятые
            this.filters['accept'] = Array(
             /*   {id: 'cbDateFrom', value: this.stringToday},
                {id: 'cbDateType', value: 0},
                {id: 'placeName', value: 'office'},
                // {id: 'page', value: 1},
                {id: 'userId', value: Ext.util.Cookies.get('userId')},
                {id: 'username', value: Ext.util.Cookies.get('betzet_login')},
                {id: 'token', value: Server.getToken()}*/
            );
            // * Выплаты
            this.filters['pay'] = Array(
                {id: 'xaction', value: 'getSlipInfo'},
                {id: 'displayUser', value: true}
            );
            // * Крысы
            this.filters['rat'] = Array(
                {id: 'xaction', value: 'read'},
                {id: 'min_date', value: this.stringToday}
            );
            // * Клубные карты
            this.filters['card'] = Array(
                {id: 'xaction', value: 'read'},
                {id: 'checkNoUser', value: 'true'}
            );
            //this.filters['gameaction'] = Array();
        }

    },
    initFilter: function (section) {
        this.filters[section] = Array();
    },

    // * установка и удаление фильтров (в зависимости от того, value указан или нет)
    setFilters: function (section, id, value) { // * section- accept, pay и т.д.- поля filters
        var filters = this.getFilters(section),
            exist;
        //console.info(this,filters);
        if (filters.length > 0) {
            exist = Ext.Array.findBy(filters, function (item, index) {
                //console.info(item, index);
                if (item && item.id == id) {
                    if (value && value.length != 0) {// * обновление фильтра
                        this.filters[section][index] = {
                            id: id,
                            value: value
                        }
                        //console.info(this.filters[index]);
                    } else {// * удаление фильтра
                        Ext.Array.remove(this.filters[section], item);
                    }
                    return true;
                }
            }, this);
        }
        //console.info(filters);
        //console.info(exist,value,value.length  );
        if (!exist && value && value.length != 0) {// * добаление фильтра
            var filter = {
                id: id,
                value: value
            };
            //console.info(filter);
            this.filters[section].push(filter);
        }


    },
    setFiltersVm: function (section, id, value, grid) { // * section- accept, pay и т.д.- поля filters
        var vm = grid.getViewModel()
            filters = vm.get('filters');
        if (Ext.Object.getSize(filters) > 0 && id) {
            console.info();
            if(typeof filters[id] == Array){
                grid.getViewModel().set('filters.'+ id, filters[id].push(value));
            }else{
                grid.getViewModel().set('filters.'+ id, value);
            }
            //console.info(filters);
        }
    },
    getFilters: function (section) {
        return this.filters[section];
    },

    removeAllFilters: function (section) {
        this.filters[section] = [];
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
            } else {
                // * проверка, чтобы колонки грида не лезли
                if (superclassXtype !== 'headercontainer' && superclassSuperclassXtype !== 'headercontainer') {
                    //console.info(superclassXtype, superclassSuperclassXtype);
                    arrOut.push(item);
                }
            }
        });
        return arrOut;
    }
});