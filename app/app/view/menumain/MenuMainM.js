Ext.define('Office.view.menumain.MenuMainM', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.menumain',
    // * в data добавляется theSession после обновления данных по сессии
   /* data:{
        isGlobalSession:'isGlobalSession'
    },*/
    formulas: {
        isGlobalSession: function(get) {
            var openDatetime = get('theSession.openDatetime');
            if (openDatetime) {
                return openDatetime == 'Глобальная смена';
            }
        }
    }

});