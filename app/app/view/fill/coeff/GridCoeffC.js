Ext.define('Office.view.fill.coeff.GridCoeffC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridcoeff',
    listen: {
        component: {
            '#': {

            },
            'tool[type=refresh]': {
                click: function (tool) {
                    /*console.log('refresh');
                    var grid = tool.up('panel'),
                        gridParam = grid.up('menumain').down('gridparam');
                    grid.store.reload();*/
                }
            }
        },
        store: {
            '#coeff': {
                /*load: function (store, arr, success, resp) {
                    if(!success || !resp._response || !resp._response.responseText){
                        Util.toast('Ошибка', 'Ошибка загрузки стора: ' + store.getStoreId());
                    }
                }*/
            }
        }
    },




});
