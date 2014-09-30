Ext.define('BetMill.view.timeline.PanelFilterTimelineC', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.panelfiltertimeline',
    views: [
        'timeline.PanelFilterTimelineV'
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
