Ext.define('BetMill.view.rat.PanelFilterRatC', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.panelfilterrat',
    views: [
        'rat.PanelFilterRatV'
    ],
    init: function () {
        this.listen({
            component: {
                
            },
            /*store: {
                '#sport': {
                    load: function (store, records, successful, eOpts) {
                    console.info(store);
                        //this.getView().store.load();
                    }
                }
            }*/
        })
    }

    

});
