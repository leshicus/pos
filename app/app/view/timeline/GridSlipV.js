Ext.define('Office.view.timeline.GridSlipV', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Office.view.timeline.GridSlipM',
        'Office.plugin.GridColumnsDefaults',
        'Ext.tree.View',
        'Ext.tree.Panel',
    ],
    xtype: 'gridslip',
    viewModel: {
        type: 'gridslip'
    },
    columnLines: true,
    rowLines: true,
    //flex: 1,
    height:200,
    title: 'Параметры таймлайна',
    rootVisible: false,
    _collapsed: true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true
    },
    //enableLocking: true, // * глючит с деревьями
    /*glyph: Glyphs.get('list_1'),
    cls: 'gridslip',*/
    bind: '{slip}',
    initComponent: function () {
        /*
         1) сохраняем токен в VM, чтобы его потом параметризировать там
         2) и timelineId тоже самое, но это сделаем уже в контроллере
         */

        Utilities.initClassParams({
            scope: this,
            params: ['filters.timelineId']
        });

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                }
            },
            items: [
                {
                    xtype: 'treecolumn',
                    text: 'Действие',
                    dataIndex: 'operation',
                    itemId: 'gridslip-operation',
                    flex:1
                  //  locked: true,
                },
                {
                    text: 'Сумма',
                    dataIndex: 'stake',
                    //itemId: 'stake',
                    width: 130
                },
                {
                    text: 'Коэф.',
                    dataIndex: 'coefficient',
                    //itemId: 'coefficient',
                    width: 180
                },
                {
                    text: 'Результат',
                    dataIndex: 'result_text',
                    //itemId: 'result_text',
                    width: 130,
                    renderer: Utilities.renderResult
                },
                {
                    text: 'Совершена',
                    dataIndex: 'made_datetime',
                    //itemId: 'made_datetime',
                    width: 130
                },
                {
                    text: 'Выигрыш',
                    dataIndex: 'win_sum',
                    //itemId: 'win_sum',
                    width: 130
                },
                {
                    text: 'Лайв',
                    dataIndex: 'is_live',
                    //itemId: 'is_live',
                    width: 130
                }
            ]
        }

        this.callParent();
    }
});