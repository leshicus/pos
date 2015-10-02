Ext.define('Office.view.fill.live.GridEventLiveV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.fill.live.GridEventLiveM',
        'Office.view.fill.live.GridEventLiveC',
        // 'Ext.grid.feature.Grouping',

    ],
    xtype: 'grideventlive',
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
    viewConfig: {
        preserveScrollOnRefresh: true,
        listeners: {
            // * сохранение скролбара коэффициентов после обновления. По-другому сделать не получалось.
            // * правда скролбар дергается
            /*   beforeselect: 'beforeselectView',
             select: 'selectView',*/
            'beforerefresh': function(cmp) {
                //console.info(cmp.grid.getPlugins());
                //console.info(cmp.grid.getPlugin('bufferedrenderer'));

                //cmp.grid.getPlugin('bufferedrenderer').bodyTop = 0;
                cmp.grid.getPlugins()[0].bodyTop = 0;
            },
            scope: 'controller'
        }
    },
    features: [{
        ftype: 'grouping',
        // groupHeaderTpl: '{name}',
        // * сортировка по sport_id
        groupHeaderTpl: [
            '<span style="justify-content: space-between;display: flex;flex-direction: row;">' +
            '<div>{children:this.getName}</div>' +
            '<div><span role="button" style="float: right;" data-qtip="' + '{children:this.getSportName}' + '"><img src="resources/image/sports/' + '{children:this.getSport}' + '.png"></span></div>' +
            '</span>',
            {
                getSport: function (name) {
                    return name[0].data.sport_slug;
                },
                getSportName: function (name) {
                    return UtilMarkets.getSportName(name[0].data);
                },
                getName: function (name) {
                    return name[0].data.tournament_name;
                }
            }
        ],
        collapsible: false
    }],
    bind: {
        // store: '{eventstore}'
        store: '{eventstore_chained}'
    },
    listeners: {
        //select: 'onSelect', // * вызывается дважды, поэтому использую itemclick
        // * select & selectionchange вызываются дважды из-за bind selection
        selectionchange: { // * вызывается дважды- баг
            fn: 'onSelectionChange'
        },
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
                'filters.cbSport',
                'filters.filterEvent'
            ]
        });

        var me = this,
            vm = this.getViewModel();

        if (this.getItemId() == 'live' || this.getItemId() == 'rats') {
            vm.set('command', 'inplay');
        } else if (this.getItemId() == 'line') {
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

        this.tbar = [
            {
                xtype: 'combocheck',
                emptyText: 'Вид спорта',
                //emptyText: '\uF0b0 Вид спорта',
                itemId: 'cbSport',
                editable: false,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                padding:'5 0 0 0',
                _checkField: 'checked',
                _bind: {
                    store: '{sport_chained}',
                    value: '{filters.cbSport}',
                    disabled:'{disableFastInputField}'
                },
                flex: 1,
                _func: function (combo, n) {
                    me.controller.onAddFilter(combo, n);
                }
            },

            {
                xtype: 'textfield',
                emptyText: 'Фильтр по имени',
                flex: 1,
                enableKeyEvents: true,
                itemId: 'filterEvent',
                listeners: {
                    keydown: 'onKeydown',
                    change: 'onKeydown'
                },
                style: {
                    top: '0!important' // * убирает какой-то непонятный отступ сверху для текстового поля
                },
                bind: {
                    value: '{filters.filterEvent}',
                    disabled:'{disableFastInputField}'
                },
                //triggers: {// * значек лупы
                //    one: {
                //        cls: 'x-form-search-trigger'
                //    }
                //}
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

        /*       this.tools = [
         {
         type: 'refresh',
         tooltip: 'Обновить'
         }
         ]*/

        this.callParent();
    }
});