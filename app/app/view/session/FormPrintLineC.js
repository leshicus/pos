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
            cbSport = form.getViewModel().getData().cbSport,
            begin = form.getViewModel().getData().begin,
            end = form.getViewModel().getData().end,
            url = Ext.util.Format.format(Server.pos_printline(), type, Ext.Date.format(begin, 'U'), Ext.Date.format(end, 'U'), cbSport),
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
            cbSport = form.getViewModel().getData().cbSport,
            begin = form.getViewModel().getData().begin,
            end = form.getViewModel().getData().end,
            //url = Ext.util.Format.format(Server.linePrinter(), Ext.Date.format(begin, 'U'), Ext.Date.format(end, 'U'), cbSport),
            objUrl = {
                class: 'Pos_Lineprinter_print',
                params: {
                    from_date: Ext.Date.format(begin, 'U'),
                    to_date: Ext.Date.format(end, 'U'),
                    sport_id: cbSport,
                    mode: 'results'
                }
            };
        window.open(Server.getUrl(objUrl));
    }

});
