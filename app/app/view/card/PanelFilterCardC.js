Ext.define('BetMill.view.card.PanelFilterCardC', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.panelfiltercard',
    views: [
        'card.PanelFilterCardV'
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
