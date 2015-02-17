Ext.define('Office.view.fill.GridLiveV', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Office.view.fill.GridLiveM',
        'Office.view.fill.GridLiveC',
        //'Office.view.accept.PanelFilterAcceptM',
        'Ext.tree.View',
        'Ext.tree.Panel',
    ],
    xtype: 'gridlive',
    itemId: 'gridlive',
    controller: 'gridlive',
    viewModel: {
        type: 'gridlive'
    },
    autoScroll: true,
    columnLines: true,
    rowLines: true,
    flex: 1,
    rootVisible: false,
    _collapsed: true,
    viewConfig: {
        stripeRows: true
    },
    bind: {store: '{line}'},
    hideHeaders: true,
    listeners: {
        celldblclick: 'onCelldblclick',
        //afterrender: 'onRender',
        scope:'controller'
    },
    lines: false,
    initComponent: function () {
        Utilities.initClassParams({
            scope: this,
            params: [
                'type',
                'locale'
            ]
        });

        var vm = this.getViewModel();
        vm.set('type', 'live');
        vm.set('locale', Ux.locale.Manager.getCurrentLocale()['abbr']);


        /*this.tbar = [
            {
                xtype: 'combocheck',
                emptyText: 'Вид спорта',
                *//*viewModel: {
                    type: 'panelfilteraccept'
                },*//*
                margin: 2,
                labelWidth: 90,
                itemId: 'filterSport',
                editable: false,
                queryMode: 'local',
                displayField: 'value',
                valueField: 'id',
                _checkField: 'checked',
               *//* _func: function (combo, n) {
                    me.controller.onAddFilter(combo, n);
                },*//*
                _store: '{sport}'
            }
        ]*/

        this.bbar = [
            {
                xtype: 'displayfield',
                fieldLabel: 'Версия линии',
                bind: {
                    value: '{line_version}'
                }
            }
        ]

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false
            },
            items: [
                {
                    xtype: 'treecolumn',
                    dataIndex: 'name',
                    flex: 1
                }
            ]
        }

        this.callParent();
    }
});