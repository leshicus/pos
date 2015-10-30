Ext.define('Office.view.scheduleforgamefield.GridScheduleforgamefieldC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridscheduleforgamefield',
    listen: {
        component: {
            '#': {},
            'tool[type=refresh]': {
                click: function (tool) {
                    var grid = tool.up('panel');
                    grid.store.reload();
                }
            }
        }
    },
    control: {
        
    },
    getTimeTimeZone: function()
    {
        /*Ext.Ajax.request({
            url: '../admin/store/intervalTimeZone.php',
            params: {
                timezone: zoneFilterCombo.getValue(),
            },
            success: function(resp)
            {
                //alertObj(time);
                    Ext.getCmp('timeTimeZone').setValue(resp.responseText);
            }
        });*/
console.log('start');
var grid = Ext.ComponentQuery.query('gridscheduleforgamefield')[0];
        var //window = button.up('window'),
            timezone = String(grid.down('#cbTimezone').getValue()),
            time = grid.down('#currentTime');
        /*var timezone = Ext.getCmp('cbTimezone').getValue(),//window.down('#cbTimezone').getValue(),
            time = Ext.getCmp('currentTime');//window.down('#currentTime');*/
            console.log(timezone);
        var objUrl = {
            class: 'Pos_Filters_Timezone',
            params: {
               // timezone: timezone,
                action: 'getCurrentTime'
            }
        };
        console.log(Server.getUrl(objUrl));
        Ext.Ajax.request({
            url: Server.getUrl(objUrl),
            params: {
                tzona: timezone
            },
            method: 'POST',
            callback: function (opt, success, response) {
                if (response.responseText) {
                    var o = Ext.decode(response.responseText);
                    if (o.success) {
                        //Util.toast('Успех', 'Операция внесения прошла успешно');
                        /*var gridcurrent = Ext.ComponentQuery.query('gridscheduleforgamefield')[0];
                        gridcurrent.getController().reloadGrids();*/
                        
                        grid.store.reload();
                    } else {
                        Util.erMes(o.message||o.errors[0]);
                    }
                    time.setValue(o.time);
                } else {
                    Util.erMes('Нет ответа от сервера');
                }
            }
        });
    },
    onPrintData: function(){
        //Pos_Scheduleforgamefield_Print
        var grid = Ext.ComponentQuery.query('gridscheduleforgamefield')[0];
        var //window = button.up('window'),
            timezone = String(grid.down('#cbTimezone').getValue()),
            time = grid.down('#currentTime');
        /*var timezone = Ext.getCmp('cbTimezone').getValue(),//window.down('#cbTimezone').getValue(),
            time = Ext.getCmp('currentTime');//window.down('#currentTime');*/
            console.log(timezone);
        var objUrl = {
            class: 'Pos_Scheduleforgamefield_Print',
            params: {
                timezone: timezone,
               // action: 'getCurrentTime'
            }
        };
        console.log(Server.getUrl(objUrl));
        window.open(Server.getUrl(objUrl));
       /* Ext.Ajax.request({
            url: Server.getUrl(objUrl),
            params: {
                timezone: timezone
            },
            method: 'POST',
            callback: function (opt, success, response) {*/
               /* if (response.responseText) {
                    var o = Ext.decode(response.responseText);
                    if (o.success) {
                        //Util.toast('Успех', 'Операция внесения прошла успешно');
                        
                        grid.store.reload();
                    } else {
                        Util.erMes(o.message||o.errors[0]);
                    }
                    time.setValue(o.time);
                } else {
                    Util.erMes('Нет ответа от сервера');
                }*/
           /* }
        });*/
    },
    onRender: function (grid) {
       /* Ext.defer(function(){
            TaskF.startTaskVirtualRefresh(grid);
        },500,this);*/
    },
    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var mainController = Office.app.getController('Main'),
                grid = this.getView();
            mainController.storeLoadVm(grid);
        }
    }
});
