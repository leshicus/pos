Ext.define('Office.view.fill.live.GridEventLiveV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.fill.live.GridEventLiveM',
        'Office.view.fill.live.GridEventLiveC'
    ],
    xtype: 'grideventlive',
    controller: 'grideventlive',
    viewModel: {
        type: 'grideventlive'
    },
    columnLines: true,
    frame: true,
    border: true,
    reserveScrollbar: true,
    hideHeaders: true,
    viewConfig: {
        preserveScrollOnRefresh: true,
        listeners: {
            'beforerefresh': function (cmp) {
                if(cmp.grid.getPlugins())
                cmp.grid.getPlugins()[0].bodyTop = 0;// * чтобы отступы не появлялись - работает ли это?
            },
            scope: 'controller'
        }
    },
    config:{
        type:'' // * чтобы был сеттер: setType, чтобы можно было байндить это свойство
    },
    features: [
        {
            ftype: 'grouping',
            id: 'groupFeatureId',
            // * сортировка по sport_id
            groupHeaderTpl: [
                '<span role="button" style="float: left;margin-top: -4px;padding-right: 5px;" data-qtip="' + '{children:this.getSportName}' + '"><img src="resources/image/sports/' + '{children:this.getSport}' + '.png"></span>'+
                '<span style="justify-content: space-between;display: flex;flex-direction: row;">' +
                '<div>{children:this.getName}</div>' +
                '<div><span style="font-weight:300;">{children:this.getSportName}</span></div>' +
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
        }
    ],
    bind: {
        store: '{eventstore_chained}'
    },
    listeners: {
        added: 'onAdded',
        itemclick: 'onSelect',
        afterrender: 'onRender',
        scope: 'controller'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'command',
                'locale',
                'line_version',
                'filters.cbSport',
                'filters.filterEvent',
                'filters.filterDate',
                'filters.filterTime'
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
        vm.set('type', this.getItemId());

        this.bbar = [
            {
                xtype: 'displayfield',
                fieldLabel: 'Версия линии',
                bind: {
                    value: '{line_version}'
                }
            }
        ];

        //var combocheck = Ext.create('Office.view.common.ComboCheckV',{
        //    emptyText: 'Спорт',
        //    itemId: 'cbSport',
        //    editable: false,
        //    queryMode: 'local',
        //    width: 110,
        //    displayField: 'name',
        //    valueField: 'id',
        //    padding: '5 0 0 0',
        //    _checkField: 'checked',
        //    _bind: {
        //        store: '{sport_chained}',
        //        value: '{filters.cbSport}',
        //        disabled: '{disableFastInputField}'
        //    },
        //    _func: function (combo, n) {
        //        me.controller.onAddFilter(combo, n);
        //    }
        //});

        this.tbar = [
            {
                xtype: 'combocheck',
                emptyText: 'Спорт',
                itemId: 'cbSport',
                editable: false,
                queryMode: 'local',
                width: 110,
                displayField: 'name',
                valueField: 'id',
                padding: '5 0 0 0',
                _checkField: 'checked',
                _bind: {
                    store: '{sportsslug}',
                    value: '{filters.cbSport}',
                    disabled: '{disableFastInputField}'
                },
                _func: function (combo, n) {
                    me.controller.onAddFilter(combo, n);
                }
            },
            {
                xtype: 'textfield',
                emptyText: 'Событие',
                flex: 1,
                enableKeyEvents: true,
                itemId: 'filterEvent',
                listeners: {
                    specialkey: 'onEnter'
                },
                bind: {
                    value: '{filters.filterEvent}',
                    disabled: '{disableFastInputField}'
                }
                //triggers: {// * значек лупы
                //    one: {
                //        cls: 'x-form-search-trigger'
                //    }
                //}
            },
            {
                xtype: 'datefield',
                emptyText: 'дата',
                width: 75,
                format: 'd.m',
                enableKeyEvents: true,
                itemId: 'filterDate',
                listeners: {
                    change: 'onAddFilter',
                    afterrender: 'onFilterDateTip'
                },
                bind: {
                    value: '{filters.filterDate}',
                    disabled: '{disableFastInputField}'
                }
            },
            {
                xtype: 'timefield',
                emptyText: 'время',
                width: 75,
                format: 'H:i',
                enableKeyEvents: true,
                editable: false,
                itemId: 'filterTime',
                listeners: {
                    change: 'onAddFilter',
                    afterrender: 'onFilterTimeTip'
                },
                bind: {
                    value: '{filters.filterTime}',
                    disabled: '{disableFastInputField}'
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
                    renderer: 'dateText' // * не только рендерит, но в крысах и удаляет ставки из купона
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