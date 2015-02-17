// * панель с итогами грида (для дерева)
Ext.define('Office.view.common.GridSummaryV', {
    extend: 'Ext.grid.Panel',
    requires: [
    ],
    xtype: 'gridsummary',
    flex: 1,
    //height:50,
    border: false,
    //hideHeaders:true,
    columnLines: true,
    initComponent: function () {

        //this.store = Ext.create('App.store.GridSubjectS');
        this.columns = [
            {
                text:'Группа',
                dataIndex:'groid',
                width:90,
                //renderer:App.util.Utilities.streamGridColumnRenderer
            },
            {
                text:'Предмет',
                dataIndex:'subjectid',
                flex:1,
                //renderer:App.util.Utilities.streamGridColumnRenderer
            }
        ];

        this.callParent();
    }
});
