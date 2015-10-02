// * Форма поиска игрока.
Ext.define('Office.view.timeline.FormUserSearchV', {
    extend: 'Ext.container.Container',
    requires: [
        'Office.view.timeline.GridSearchV'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    xtype: 'formusersearch',
    flex: 1,
    initComponent: function () {
        this.items = [
            {
                xtype: 'textfield',
                emptyText: 'Фамилия, имя, телефон, ID или паспорт',
                itemId: 'term',
                viewModel: 'default',
                bind: '{filters.term}',
                _fireEventOnEnter: true,
                margin: 2,
                listeners: {
                    specialkey: function (field, e) {
                        if (e.getKey() == e.ENTER) {
                            var mainController = Office.app.getController('Main'),
                                gridSearch = Ext.ComponentQuery.query('gridsearch')[0],
                                store = gridSearch.getViewModel().getStore('searchtimelinegambler');
                            mainController.onAddFilterVm(field, null, null, null, true, store, gridSearch);
                        }
                    }
                }
            },
            {
                xtype: 'gridsearch',
                margin: 2,
                buttons: Util.getButtonCancel({scope: 'controller'})
            }
        ]

        this.callParent();
    }

});