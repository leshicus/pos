Ext.define('Office.view.tabpanelmain.TabpanelMainV',{
    extend:'Ext.tab.Panel',
    requires:[
        'Office.view.fill.FillV'
    ],
    title:'Управление',
    initComponent: function () {
        console.log('TabpanelAuthV init');

        this.items = [
            {
                title:'Заполнение',
                xtype:'fill'
            },
            {
                title:'Ставки "Таймлайн"'
            },
            {
                title:'Принятые'
            },
            {
                title:'Клубные карты'
            },
            {
                title:'Выплаты'
            },
            {
                title:'Крысы'
            }
        ];

        this.callParent(arguments);
    }

});
