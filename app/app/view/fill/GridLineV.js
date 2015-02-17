Ext.define('Office.view.fill.GridLineV', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Office.view.fill.GridLineM',
        'Office.view.fill.GridLineC',
        //'Office.view.accept.PanelFilterAcceptM',
        'Ext.tree.View',
        'Ext.tree.Panel',
    ],
    xtype: 'gridline',
    itemId: 'gridline',
    controller: 'gridline',
    viewModel: {
        type: 'gridline'
    },
    autoScroll: true,
    columnLines: true,
    rowLines: true,
    flex: 1,
    forceFit:true,
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
        vm.set('type', 'line');
       vm.set('locale', Ux.locale.Manager.getCurrentLocale()['abbr']);
         /*vm.set('token', Server.getToken());*/



       /* this.tbar = [
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
                *//*_func: function (combo, n) {
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