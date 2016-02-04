// * ф-ии для session
Ext.define('Office.view.session.SessionF', {
    singleton: true,
    alternateClassName: ['SessionF'],

// * обновить значения во всех гридах
    reloadGrids: function () {
        var menumain = Ext.ComponentQuery.query('menumain')[0],
            gridcurrent = Ext.ComponentQuery.query('gridcurrent')[0],
            gridpayslip = Ext.ComponentQuery.query('gridpayslip')[0],
            gridlastsession = Ext.ComponentQuery.query('gridlastsession')[0],
            griddetalization = Ext.ComponentQuery.query('griddetalization')[0],
            callback = function (session) {
                gridcurrent.getViewModel().set({
                    theSession: session
                });
            };

        gridpayslip.getController().loadPaySlipData();
        menumain.getController().loadSessionData(callback);
        gridlastsession.getViewModel().getStore('lastsession').load();
        griddetalization.getViewModel().getStore('detalization').load();
        griddetalization.getViewModel().getStore('totals').load();
    },
});