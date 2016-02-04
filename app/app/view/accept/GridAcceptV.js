Ext.define('Office.view.accept.GridAcceptV', {
        extend: 'Ext.tree.Panel',
        requires: [
            'Ext.grid.plugin.CellEditing',
            'Ext.tree.Panel',
            'Office.view.accept.GridAcceptM',
            'Office.view.accept.GridAcceptC',
            'Office.view.common.ContainerDateTimeV'
        ],
        xtype: 'gridaccept',
        viewModel: {
            type: 'gridaccept'
        },
        controller: 'gridaccept',
        columnLines: true,
        rowLines: true,
        flex: 1,
        title: 'Принятые',
        frame: true,
        viewConfig: {
            stripeRows: true
        },
        rootVisible: false,
        _collapsed: true, // * признак раскрытости всех Экспрессов
        stateful: true,
        stateId: 'gridaccept',
        bind: {store: '{accept}'},
        enableLocking: true,
        listeners: {
            celldblclick: 'onCelldblclick',
            itemmouseenter: 'onItemmouseenter',
            // render: 'onRender',
            scope: 'controller'
        },
        bbar: [
            /* {
             xtype: 'component',
             itemId: 'tipTarget',
             html: '...'
             },*/
            {
                xtype: 'pagingtoolbar',
                //pageSize:5,
                bind: {
                    store: '{accept}'
                },
                displayInfo: true,
                displayMsg: 'Показаны записи {0} - {1} из {2}',
                emptyMsg: "Нет записей для отображения"
            }
        ],
        initComponent: function () {
            Util.initClassParams({
                scope: this,
                params: [
                    'filters.cbDateType',
                    'filters.cbDateFromMade',
                    'filters.cbTimeFromMade',
                    'filters.cbDateFromCalc',
                    'filters.cbTimeFromCalc',
                    'filters.cbDateToMade',
                    'filters.cbTimeToMade',
                    'filters.cbDateToCalc',
                    'filters.cbTimeToCalc',
                    'filters.cbStateSlip',
                    'cbStateSlip_model',
                    'filters.cbPaid',
                    'cbPaid_model',
                    'filters.cbIsLive',
                    'cbIsLive_model',
                    'filters.cbByBets',
                    'filters.cbSport',
                    'cbSport_model',
                    'filters.cbSlipId'
                ]
            });

            //Util.createTaskRunner(this);

            var now = new Date();
            var now_ms = now.getTime();
            var days_slips_visible_in_office = Util.getGlobalConst('DAYS_SLIPS_VISIBLE_IN_OFFICE');
            //var days_slips_visible_in_office = Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals').days_slips_visible_in_office;
            var minDate_ms = now_ms - 1000 * 60 * 60 * 24 * days_slips_visible_in_office;
            var minDate = new Date(minDate_ms);

            var viewModel = this.getViewModel(),
                madeFrom = Ext.create('Office.view.common.ContainerDateTimeV', {
                    margin: 2,
                    _itemIdDate: 'cbDateFromMade',
                    _itemIdTime: 'cbTimeFromMade',
                    _emptyTextDate: 'дата с',
                    _emptyTextTime: 'время',
                    _cbDateType: 0,
                    _format: 'Y-m-d',
                    _allowBlank: true,
                    _bindDate: '{filters.cbDateFromMade}',
                    _bindTime: '{filters.cbTimeFromMade}',
                    _minDateValue: minDate,
                    _listenersDate: {
                        change: 'onAddFilter'
                        // * почему-то не получается сделать как выше, пишет 'unable to dynamically resolve method onAddFilter'
                        // * поменял select to change, чтобы срабатывал ивент на setValue
                        /*change: function (field, n, o, e) {
                         console.info(arguments);
                         var mainController = Office.app.getController('Main'),
                         store = me.getViewModel().getStore('accept');
                         //store = me.getStore('accept');
                         //me.getViewModel().set(field.getItemId(),field.getValue());
                         // console.info(me, store);
                         //mainController.onAddFilter(field, n, o, e, false, store, me);
                         mainController.onAddFilterVm(field, n, o, e, false, store, me);
                         }*/
                    },
                    _listenersTime: {
                        change: 'onAddFilter',
                        specialkey: 'onClearFilterVm'
                    }
                }),
                madeTo = Ext.create('Office.view.common.ContainerDateTimeV', {
                    margin: 2,
                    _itemIdDate: 'cbDateToMade',
                    _itemIdTime: 'cbTimeToMade',
                    _emptyTextDate: 'дата по',
                    _emptyTextTime: 'время',
                    _cbDateType: 0,
                    _format: 'Y-m-d',
                    _allowBlank: true,
                    _bindDate: '{filters.cbDateToMade}',
                    _bindTime: '{filters.cbTimeToMade}',
                    _minDateValue: minDate,
                    _listenersDate: {
                        change: 'onAddFilter',
                        specialkey: 'onClearFilterVm'
                    },
                    _listenersTime: {
                        change: 'onAddFilter',
                        specialkey: 'onClearFilterVm'
                    }
                }),
                calcFrom = Ext.create('Office.view.common.ContainerDateTimeV', {
                    margin: 2,
                    _itemIdDate: 'cbDateFromCalc',
                    _itemIdTime: 'cbTimeFromCalc',
                    _emptyTextDate: 'дата с',
                    _emptyTextTime: 'время',
                    _cbDateType: 1,
                    _format: 'Y-m-d',
                    _allowBlank: true,
                    _bindDate: '{filters.cbDateFromCalc}',
                    _bindTime: '{filters.cbTimeFromCalc}',
                    _minDateValue: minDate,
                    _listenersDate: {
                        change: 'onAddFilter',
                        specialkey: 'onClearFilterVm'
                    },
                    _listenersTime: {
                        change: 'onAddFilter',
                        specialkey: 'onClearFilterVm'
                    }
                }),
                calcTo = Ext.create('Office.view.common.ContainerDateTimeV', {
                    margin: 2,
                    _itemIdDate: 'cbDateToCalc',
                    _itemIdTime: 'cbTimeToCalc',
                    _emptyTextDate: 'дата по',
                    _emptyTextTime: 'время',
                    _cbDateType: 1,
                    _format: 'Y-m-d',
                    _allowBlank: true,
                    _bindDate: '{filters.cbDateToCalc}',
                    _bindTime: '{filters.cbTimeToCalc}',
                    _minDateValue: minDate,
                    _listenersDate: {
                        change: 'onAddFilter',
                        specialkey: 'onClearFilterVm'
                    },
                    _listenersTime: {
                        change: 'onAddFilter',
                        specialkey: 'onClearFilterVm'
                    }
                });

            Ext.defer(function () {
                if (viewModel.getStore('sport'))
                    viewModel.getStore('sport').load();

                if (viewModel.getStore('result'))
                    viewModel.getStore('result').load();

                viewModel.set('filters.cbDateFromMade', new Date());
            }, 10);

            // * установка начального значения- Дата с, срабатывает listener madeFrom
            //Debug.setGridAcceptMadeFrom(madeFrom, 'cbDateFrom');

            this.tbar = [
                {
                    xtype: 'combocheck',
                    emptyText: 'Вид спорта',
                    width: 170,
                    matchFieldWidth: false,
                    margin: '2 2 0 0',
                    padding: '5 0 0 0',
                    itemId: 'cbSport',
                    editable: false,
                    queryMode: 'local',
                    displayField: 'value',
                    valueField: 'id',
                    _checkField: 'checked',
                    _bind: {
                        store: '{sport}',
                        selection: '{cbSport_model}',
                        value: '{filters.cbSport}'
                    }
                },
                {
                    xtype: 'combobox',
                    itemId: 'cbIsLive',
                    width: 100,
                    emptyText: 'Лайв',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    editable: false,
                    bind: {
                        store: '{live}',
                        selection: '{cbIsLive_model}',
                        value: '{filters.cbIsLive}'
                    },
                    listeners: {
                        change: 'onAddFilter'
                    }
                },
                {
                    xtype: 'checkbox',
                    itemId: 'cbByBets',
                    bind: '{filters.cbByBets}',
                    margin: '2 2 2 5',
                    //inputValue: 'on',
                    boxLabel: 'По бетам',
                    listeners: {
                        change: 'onAddFilter'
                    }
                },
                //{
                //    xtype: 'tbseparator',
                //    height: 40,
                //    margin: '0 0 0 30'
                //},
                //{
                //    xtype: 'textfield',
                //    itemId: 'cashBalance',
                //    labelWidth: 110,
                //    margin: '2 2 2 30',
                //    fieldLabel: 'Сумма в кассе',
                //    readOnly: true
                //}
            ];

            this.columns = {
                defaults: {
                    menuDisabled: true,
                    sortable: false
                },
                items: [
                    {
                        xtype: 'treecolumn',
                        text: 'Действие',
                        dataIndex: 'operation',
                        itemId: 'gridaccept-operation',
                        locked: true,
                        width: 250,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        renderer: function (value, meta, record, row, col) {
                            meta['tdAttr'] = 'data-qtip="' + '<b>' + record.get('qtipTitle') + '</b><br>' + value + '"';
                            return value;
                        },
                        items: [
                            {
                                xtype: 'textfield',
                                itemId: 'cbSlipId',
                                bind: '{filters.cbSlipId}',
                                emptyText: 'Номер',
                                editable: true,
                                margin: 2,
                                _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                                listeners: {
                                    specialkey: 'onEnter',
                                    scope: 'controller'
                                }
                            }
                        ]
                    },
                    {
                        text: 'Сумма',
                        dataIndex: 'stake',
                        itemId: 'gridaccept-stake',
                        width: 100,
                        renderer: Ext.util.Format.numberRenderer('0,0.00')
                    },
                    {
                        text: 'Коэф.',
                        dataIndex: 'coefficient',
                        itemId: 'gridaccept-coefficient',
                        width: 60
                    },
                    {
                        text: 'Результат',
                        dataIndex: 'result_text',
                        itemId: 'gridaccept-original_result_text',// * указываем id, т.к. вроде только с ним stateful работает
                        renderer: Util.renderResult,
                        width: 150,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'combocheck',
                                margin: 2,
                                itemId: 'cbStateSlip',
                                _bind: {
                                    store: '{result}',
                                    selection: '{cbStateSlip_model}',
                                    value: '{filters.cbStateSlip}'
                                },
                                displayField: 'value',
                                valueField: 'id',
                                editable: false,
                                _checkField: 'checked'
                            }
                        ]
                    },
                    {
                        text: 'Совершена',
                        dataIndex: 'made_datetime',
                        itemId: 'gridaccept-made_datetime',
                        width: 185,
                        format: Util.dateFormatDot,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            madeFrom,
                            madeTo
                        ]
                    },
                    {
                        text: 'Рассчитана',
                        dataIndex: 'fin_datetime',
                        itemId: 'gridaccept-calc_datetime',
                        width: 185,
                        format: Util.dateFormatHyphen,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        renderer: function (val, id, rec) {
                            if (rec.get('result_text') == "в игре") {
                                return '0000-00-00 00:00:00';
                            } else {
                                return rec.get('fin_datetime');
                            }
                        },
                        items: [
                            calcFrom,
                            calcTo
                        ]
                    },
                    {
                        text: 'Изм.<br>баланса',
                        dataIndex: 'balance_change',
                        itemId: 'gridaccept-balance_change',
                        width: 100,
                        renderer: Ext.util.Format.numberRenderer('0,0.00')
                    },
                    {
                        text: 'Выигрыш',
                        dataIndex: 'win_sum',//?
                        itemId: 'gridaccept-win_sum',
                        hidden: !Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals').use_ndfl,
                        width: 90,
                        renderer: Ext.util.Format.numberRenderer('0,0.00')
                    },
                    {
                        text: 'НДФЛ',
                        dataIndex: 'tax_sum',
                        itemId: 'gridaccept-tax_sum',
                        hidden: !Ext.ComponentQuery.query('menumain')[0].getViewModel().get('globals').use_ndfl,
                        width: 60,
                        renderer: Ext.util.Format.numberRenderer('0,0.00')
                    },
                    {
                        text: 'К выплате',
                        dataIndex: 'to_pay',
                        itemId: 'gridaccept-to_pay',
                        width: 90,
                        renderer: Ext.util.Format.numberRenderer('0,0.00')
                    },
                    {
                        text: 'Счет',
                        dataIndex: 'score',
                        itemId: 'gridaccept-score',
                        width: 120,
                        // * выяснить почему приходит <td>. Заплатка
                        renderer: function (value) {
                            if (value) {
                                if (value.indexOf('td') == -1)
                                    return value;
                                else
                                    return "";
                            } else
                                return "";
                        }
                    },
                    {
                        text: 'Лайв',
                        dataIndex: 'is_live',
                        itemId: 'gridaccept-is_live',
                        width: 55,
                        renderer: function (val, meta, rec) {
                            if (val == 'Да') {
                                meta.align = 'center';
                                return '<span role="button" class="fa fa-check" style="color: green" data-qtip="Да"></span>';
                            } else if (val == 'Нет') {
                                return '';
                            } else {
                                return val;
                            }
                        }
                    },
                    {
                        text: 'Выплачено',
                        dataIndex: 'paid',
                        itemId: 'gridaccept-paid',
                        width: 130,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'combobox',
                                itemId: 'cbPaid',
                                margin: 2,
                                emptyText: 'да/нет',
                                editable: false,
                                queryMode: 'local',
                                displayField: 'name',
                                valueField: 'id',
                                bind: {
                                    store: '{paid}',
                                    selection: '{cbPaid_model}',
                                    value: '{filters.cbPaid}'
                                },
                                listeners: {
                                    change: 'onAddFilter'
                                }
                            }
                        ]
                    }
                ]
            };

            //this.dockedItems = [{
            //    xtype: 'pagingtoolbar',
            //    store: me.store,
            //    pageSize: 5,
            //    //bind: {store: '{accept}'},
            //    reference: 'pagingtoolbar',
            //    dock: 'bottom',
            //    displayInfo: true,
            //    displayMsg: 'Показаны записи {0} - {1} из {2}',
            //    emptyMsg: "Нет записей для отображения"
            //}]
            //this.bbar = Ext.create('Ext.PagingToolbar', {
            //    bind: {
            //        store: '{accept}'
            //    },
            //    pageSize: 5,
            //    displayInfo: true,
            //    displayMsg: 'Показаны записи {0} - {1} из {2}',
            //    emptyMsg: "Нет записей для отображения"
            //});


            /* this.bbar = [
             {
             xtype: 'component',
             itemId: 'tipTarget',
             html: '...'
             }
             ]*/

            this.tools = [
                {
                    type: 'maximize',
                    tooltip: 'Скрыть/Раскрыть экспрессы'
                },
                {
                    type: 'refresh',
                    tooltip: 'Обновить'
                },
                {
                    type: 'close',
                    tooltip: 'Удалить фильтры'
                }
            ];

            this.callParent();
        }

    }
);
