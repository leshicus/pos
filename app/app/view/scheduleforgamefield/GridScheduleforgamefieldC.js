Ext.define('Office.view.scheduleforgamefield.GridScheduleforgamefieldC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridscheduleforgamefield',
    listen: {
        component: {
            'tool[type=refresh]': {
                click: function (tool) {
                    var grid = tool.up('panel');
                    grid.store.reload();
                }
            }
        }
    },

    getTimeTimeZone: function () {
        var grid = Ext.ComponentQuery.query('gridscheduleforgamefield')[0],
            timezone = grid.down('#cbTimezone').getValue(),
            time = grid.down('#currentTime');

        var objUrl = {
            class: 'Pos_Filters_Timezone',
            params: {
                action: 'getCurrentTime',
                timezone: encodeURIComponent(timezone)
            }
        };

        Ext.Ajax.request({
            url: Server.getUrl(objUrl),
            method: 'POST',
            callback: function (opt, success, response) {
                if (response.responseText) {
                    var o = Ext.decode(response.responseText);
                    if (o.success) {
                        grid.store.reload();
                    } else {
                        Util.erMes(o.message || o.errors[0]);
                    }
                    time.setValue(o.time);
                } else {
                    Util.erMes('Нет ответа от сервера');
                }
            }
        });
    },
    onPrintData: function () {
        var grid = Ext.ComponentQuery.query('gridscheduleforgamefield')[0],
            timezone = grid.down('#cbTimezone').getValue(),
            time = grid.down('#currentTime');

        var objUrl = {
            class: 'Pos_Scheduleforgamefield_Print',
            params: {
                timezone: encodeURIComponent(timezone)
            }
        };
        window.open(Server.getUrl(objUrl));

    },

    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var mainController = Office.app.getController('Main'),
                grid = this.getView();
            mainController.storeLoadVm(grid);
        }
    }
});
