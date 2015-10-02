Ext.define('Office.view.fill.coeff.GridCoeffV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.fill.coeff.GridCoeffM',
        'Office.view.fill.coeff.GridCoeffC',
        'Ext.grid.feature.Grouping'
    ],
    xtype: 'gridcoeff',
    controller: 'gridcoeff',
    viewModel: {
        type: 'gridcoeff'
    },
    columnLines: true,
    //scrollable:true,
    //autoScroll: true,
    frame: true,
    border: true,
    reserveScrollbar:true,
    hideHeaders:true,
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}'
    }],
    bind: {
        store:'{coeff}',
        title: '{title}'
    },
    listeners: {
        //cellclick: 'onCellclick',
        scope: 'controller'
    },
    flex:1,
    cls:'gridgroupheader',
    initComponent: function () {
        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false
            },
            items: [
                {
                    //text: 'coeff_code',
                    dataIndex: 'coeff_code',
                    flex: 1
                },
                {
                    //text: 'coeff_value',
                    dataIndex: 'coeff_value',
                    width:60

                }
            ]
        }

 /*       this.tools = [
            {
                type: 'refresh',
                tooltip: 'Обновить'
            }
        ]*/

        this.callParent();
    }
});