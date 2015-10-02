Ext.define('Office.view.chat.GridChatGroupV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.chat.GridChatGroupM',
        'Office.view.chat.GridChatGroupC'
    ],
    xtype: 'gridchatgroup',
    controller: 'gridchatgroup',
    viewModel: {
        type: 'gridchatgroup'
    },
    columnLines: true,
    autoScroll: true,
    title: 'Группы',
    frame: true,
    border: true,
    viewConfig: {
        stripeRows: true
    },
    glyph: Glyphs.get('users'),
    cls: 'glyphWithPadding',
    bind: '{chatgroup}',
    listeners: {
        cellclick: 'onCellclick',
        scope: 'controller'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'login'
            ]
        });

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false
            },
            items: [
                {
                    text: 'Номер',
                    dataIndex: 'id',
                    width: 60
                },
                {
                    text: 'Название',
                    dataIndex: 'name',
                    cellWrap: true,
                    flex: 1
                }
            ]
        }

        this.tools = [
            {
                type: 'refresh',
                tooltip: 'Обновить'
            }
        ]

        this.callParent();
    }
});