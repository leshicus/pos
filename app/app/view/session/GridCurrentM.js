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
        },
        showOperatorFio: {
            get: function (data) {
                var globals = Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals');
                return globals.use_ndfl;
            }
        }

    }
});