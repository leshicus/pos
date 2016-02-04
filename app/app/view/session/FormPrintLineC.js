Ext.define('Office.view.session.FormPrintLineC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.formprintline',
    listen: {
        component: {
            '#': {}
        },
        store: {}
    },
    onPrintLine: function (button) {
        var form = button.up('formprintline'),
            type = button._type,
            cbSport = form.getViewModel().get('filters.cbSport'),
            cbTournament = form.getViewModel().get('filters.cbTournament'),
            begin = form.getViewModel().get('begin'),
            end = form.getViewModel().get('end'),
            url = Ext.util.Format.format(Server.pos_printline(), type, Ext.Date.format(begin, 'U'), Ext.Date.format(end, 'U'), cbSport, cbTournament),
            myWindow = window.open(url);
        //myWindow.document.close();
        myWindow.focus();
        myWindow.print();
        //myWindow.close();
        //todo не закрывает окно после печати
        // myWindow.onfocus=function(){ myWindow.close();}
        /*     var printWindow = window.open(url);
         var printAndClose = function() {
         if (printWindow.document.readyState == 'complete') {
         clearInterval(sched);
         printWindow.focus();
         printWindow.print();
         printWindow.close();
         }
         }
         var sched = setInterval(printAndClose, 200);*/

    },
    onPrintResults: function (button) {
        var form = button.up('formprintline'),
            cbSport = form.getViewModel().get('filters.cbSport') || [],
            cbTournament = form.getViewModel().get('filters.cbTournament') || [],
            begin = form.getViewModel().get('begin'),
            end = form.getViewModel().get('end'),
        //url = Ext.util.Format.format(Server.linePrinter(), Ext.Date.format(begin, 'U'), Ext.Date.format(end, 'U'), cbSport),
            objUrl = {
                class: 'Pos_Lineprinter_print',
                params: {
                    from_date: Ext.Date.format(begin, 'U'),
                    to_date: Ext.Date.format(end, 'U'),
                    sport_id: cbSport.join(','),
                    tournament_id: cbTournament.join(','),
                    mode: 'results'
                }
            };
        window.open(Server.getUrl(objUrl));
    },
    onPrintDayExpress: function (button) {
        console.log(button._type);
        var form = button.up('formprintline'),
            type = button._type,
            url = Ext.util.Format.format(Server.pos_printline_day_express(), type),
            myWindow = window.open(url);
        myWindow.focus();
        myWindow.print();
    },
    onResetFilter: function (button) {
        var formprintline = Ext.ComponentQuery.query('formprintline')[0],
            sportCombo = formprintline.down('#cbSport'),
            tournamentCombo = formprintline.down('#cbTournament'),
            beginDate = formprintline.down('#begin'),
            endDate = formprintline.down('#end');
        sportCombo.reset();
        tournamentCombo.reset();
        formprintline.getViewModel().getStore('tournament').removeAll();
        beginDate.reset();
        endDate.reset();
    },
    reloadTournamentCombo: function () {
        var formprintline = Ext.ComponentQuery.query('formprintline')[0],
            sportCombo = formprintline.down('#cbSport'),
            tournamentCombo = formprintline.down('#cbTournament');

        var menumain = Ext.ComponentQuery.query('menumain')[0],
            vmMenumain = menumain.getViewModel();

        var proxy = tournamentCombo.getStore().getProxy();
        proxy.url = Server.getUrl({
            class: 'Pos_Filters_Tournament',
            token: vmMenumain.get('token'),
            params: {
                sport_id: sportCombo.getValue(),
                mode: 0
            }
        });

        tournamentCombo.getStore().setProxy(proxy);
        tournamentCombo.getStore().reload();
    }

});
