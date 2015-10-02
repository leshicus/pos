Ext.define('Office.view.fill.coeff.GridCoeffM', {
    extend: 'Ext.app.ViewModel',
    requires: [

    ],
    alias: 'viewmodel.gridcoeff',
    stores: {
        coeff:{
            fields: ['coeff_code','coeff_line_id','coeff_id','coeff_value'],
            data: '{sourceArray}',
            expandData: true,
            idProperty:'coeff_id',
            storeId: 'coeff',
            groupField: 'coeff_type'
        }
    },
    data:{
        title:''
    }
});
