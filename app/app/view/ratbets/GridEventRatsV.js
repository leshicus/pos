Ext.define('Office.view.ratbets.GridEventRatsV', {
    extend: 'Ext.grid.Panel',
    requires: [
        //'Office.view.fill.live.GridEventLiveV'
        'Office.view.fill.live.GridEventLiveM',
        'Office.view.fill.live.GridEventLiveC',
    ],
    xtype: 'grideventrats',
    controller: 'grideventlive',
    viewModel: {
        type: 'grideventlive'
    },
    columnLines: true,
    autoScroll: true,
    frame: true,
    border: true,
    reserveScrollbar: true,
    hideHeaders: true,
    //viewConfig: {
    //    preserveScrollOnRefresh: true,
    //    listeners: {
    //        // * сохранение скролбара коэффициентов после обновления. По-другому сделать не получалось.
    //        // * правда скролбар дергается
    //        /*   beforeselect: 'beforeselectView',
    //         select: 'selectView',*/
    //        scope: 'controller'
    //    }
    //},

    bind: {
       // store: '{eventstore}'
        store: '{eventstore_chained}'
    },
    listeners: {
        //select: 'onSelect', // * вызывается дважды, поэтому использую itemclick
        // * select & selectionchange вызываются дважды из-за bind selection
        //selectionchange: { // * вызывается дважды- баг
        //    fn: 'onSelectionChange'
        //},
        itemclick: 'onSelect',
        afterrender: 'onRender',
       // destroy:'onDestroy',
        scope: 'controller'
    },
    flex: 1,

    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'command',
                'locale',
                'line_version',
            ]
        });

        var me = this,
            vm = this.getViewModel();

        if (this.getItemId() == 'live' || this.getItemId() == 'rats') {
            vm.set('command', 'inplay');
        } else if (this.getItemId() == 'line'){
            vm.set('command', 'prematch');
        }

        vm.set('locale', Ux.locale.Manager.getCurrentLocale()['abbr']);

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
                    text: 'id',
                    dataIndex: '_date_base',
                    width: 65,
                    renderer: 'dateText'
                },
                {
                    text: 'Событие',
                    dataIndex: '_event_name',
                    flex: 1
                }
            ]
        }

        this.callParent();
    }
});