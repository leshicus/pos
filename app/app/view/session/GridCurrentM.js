Ext.define('Office.view.session.GridCurrentM', {
    extend: 'Ext.app.ViewModel',
    requires: [
    ],
    alias: 'viewmodel.gridcurrent',
    formulas: {
        isGlobalSession: function(get) {
            var openDatetime = get('theSession.openDatetime');
            if (openDatetime) {
                return openDatetime == 'Глобальная смена';
            }
        }
    }
});