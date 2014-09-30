Ext.define('Office.view.rat.GridRatV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.toolbar.Paging',
        'Office.view.rat.GridRatM',
        'Office.view.common.ContainerDateTimeV'
    ],
    xtype: 'gridrat',
    viewModel: {
        type: 'gridrat'
    },
    columnLines: true,
    flex: 1,
    title:'Крысы',
    frame: true,
    viewConfig: {
        stripeRows: true
    },
    bind:'{gridrat}',
    initComponent: function () {
        var datecomFrom = Ext.create('Office.view.common.ContainerDateTimeV', {
                margin: 2,
                _itemIdDate: 'daterunFrom',
                _itemIdTime: 'daterunFromTime',
                _emptyTextDate: 'дата с',
                _emptyTextTime: 'время',
                _value: new Date(),
                _allowBlank: false
            }),
            datecomTo = Ext.create('Office.view.common.ContainerDateTimeV', {
                margin: 2,
                _itemIdDate: 'daterunTo',
                _itemIdTime: 'daterunToTime',
                _emptyTextDate: 'дата по',
                _emptyTextTime: 'время',
                _allowBlank: true
            });
        this.columns = [
            {
                text: 'Дата и время',
                dataIndex: 'daterun',
                itemId: 'daterun',
                width: 180,
                menuDisabled: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    datecomFrom,
                    datecomTo
                ]
            },
            {
                text: 'Номер забега',
                dataIndex: 'numrun',
                itemId: 'numrun',
                width: 120,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    enableKeyEvents: true,
                    margin: 2
                },
                items: [
                    {
                        xtype: 'textfield',
                        emptyText: '=',
                        _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                        itemId: 'textNumrun'
                    }
                ]
            },
            {
                text: 'Результат',
                dataIndex: 'result',
                itemId: 'result',
                width: 100
            },
            {
                text: 'I место',
                dataIndex: 'firstplace',
                itemId: 'firstplace',
                renderer:Office.util.Utilities.renderRat,
                width: 70
            },
            {
                text: 'II место',
                dataIndex: 'secondplace',
                itemId: 'secondplace',
                width: 70
            },
            {
                text: 'III место',
                dataIndex: 'thirdplace',
                itemId: 'thirdplace',
                width: 70
            },
            {
                text: 'Повтор записи',
                width: 130
                //flex:1
            }
        ];
        this.bbar = Ext.create('Ext.PagingToolbar', {
            bind: {
                store:'{gridrat}'
            },
            displayInfo: true,
            displayMsg: 'Показаны записи {0} - {1} из {2}',
            emptyMsg: "Нет записей для отображения"
        });
        this.callParent();
    }
});