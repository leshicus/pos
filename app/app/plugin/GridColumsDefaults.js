/* не работает */
Ext.define('Office.plugin.GridColumnsDefaults',{
    extend:'Ext.plugin.Abstract',
    requires:[],
    alias:'plugin.gridcolumnsdefaults',
    init:function (cmp){
        this.setCmp(cmp);
        console.info(arguments, this.getCmp());
        //var grid = this.getCmp();
        //cmp.columns=cmp.clmns;
        Ext.apply(cmp, {
            columns:{
                defaults: {
                    menuDisabled: true,
                    sortable: false,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    }
                }
            }
        });

    }
});