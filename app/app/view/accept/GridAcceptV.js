Ext.define('Office.view.accept.GridAcceptV', {
    extend: 'Ext.tree.Panel',
    requires: [
        'Ext.toolbar.Paging',
        'Ext.form.field.Tag',
        'Ext.tree.View',
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
    bind: '{accept}',
    defaults: {
        menuDisabled: true,
        layout: {
            type: 'vbox',
            align: 'stretch'
        }
    },
    initComponent: function () {
        var viewModel = this.getViewModel(),
            madeFrom = Ext.create('Office.view.common.ContainerDateTimeV', {
                margin: 2,
                _itemIdDate: 'cbDateFrom',
                _itemIdTime: 'cbTimeFrom',
                _emptyTextDate: 'дата с',
                _emptyTextTime: 'время',
                _allowBlank: true,
                _listenersDate: {
                    //change: 'onAddFilter',
                    // * почему-то не получается сделать как выше, пишет 'unable to dynamically resolve method onAddFilter'
                    // * поменял select to change, чтобы срабатывал ивент на setValue
                    change: function (field, n, o, e) {
                        var mainController = Office.app.getController('Main'),
                            store = viewModel.getStore('accept');
                        mainController.onAddFilter(field, n, o, e, false, store);
                    }
                },
                _listenersTime: {
                    select: 'onAddFilter'
                }
            }),
            madeTo = Ext.create('Office.view.common.ContainerDateTimeV', {
                margin: 2,
                _itemIdDate: 'cbDateTo',
                _itemIdTime: 'cbTimeTo',
                _emptyTextDate: 'дата по',
                _emptyTextTime: 'время',
                _allowBlank: true,
                _listenersDate: {
                    select: 'onAddFilter',
                    specialkey: 'onClearFilter'
                },
                _listenersTime: {
                    select: 'onAddFilter'
                }
            }),
            calcFrom = Ext.create('Office.view.common.ContainerDateTimeV', {
                margin: 2,
                _itemIdDate: 'cbDateFrom',
                _itemIdTime: 'cbTimeFrom',
                _emptyTextDate: 'дата с',
                _emptyTextTime: 'время',
                _allowBlank: true,
                _listenersDate: {
                    select: 'onAddFilter'
                },
                _listenersTime: {
                    select: 'onAddFilter'
                }
            }),
            calcTo = Ext.create('Office.view.common.ContainerDateTimeV', {
                margin: 2,
                _itemIdDate: 'cbDateTo',
                _itemIdTime: 'cbTimeTo',
                _emptyTextDate: 'дата по',
                _emptyTextTime: 'время',
                _allowBlank: true,
                _listenersDate: {
                    select: 'onAddFilter'
                },
                _listenersTime: {
                    select: 'onAddFilter'
                }
            }),
            me = this,
            filters = Office.util.Filters;
        filters.init();
        //this.getViewModel().getStore('accept').load();
        madeFrom.setValue('cbDateFrom',new Date());

        this.columns = [
            {
                xtype: 'treecolumn',
                text: 'Действие',
                dataIndex: 'operation',
                itemId: 'gridaccept-num',
                //flex:1 //todo заменить после обновления
                width: 250
            },
            {
                text: 'Сумма',
                dataIndex: 'stake',
                itemId: 'gridaccept-stake',
                menuDisabled: true,
                width: 70
            },
            {
                text: 'Коэф.',
                dataIndex: 'coefficient',
                itemId: 'gridaccept-coefficient',
                menuDisabled: true,
                width: 60
            },
            {
                text: 'Результат',
                dataIndex: 'original_result_text',
                itemId: 'gridaccept-original_result_text',// * указываем id, т.к. вроде только с ним stateful работает
                menuDisabled: true,
                renderer: Office.util.Utilities.renderResult,
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
                        store: '{result}',
                        displayField: 'value',
                        valueField: 'id',
                        editable: false,
                        _checkField: 'checked',
                        _func: function (combo, n) {
                            me.controller.onAddFilter(combo, n);
                        }
                    }
                ]
            },
            {
                text: 'Совершена',
                dataIndex: 'made_datetime',
                itemId: 'gridaccept-made_datetime',
                width: 180,
                menuDisabled: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    madeFrom,
                    madeTo
                ]
            }, {
                text: 'Рассчитана',
                dataIndex: 'calc_datetime',
                itemId: 'gridaccept-calc_datetime',
                width: 180,
                menuDisabled: true,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
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
                menuDisabled: true,
                width: 75
            },
            {
                text: 'Выигрыш',
                dataIndex: 'win_sum',//?
                itemId: 'gridaccept-win_sum',
                menuDisabled: true,
                width: 90
            },
            {
                text: 'НДФЛ',
                dataIndex: 'tax_sum',//?
                itemId: 'gridaccept-tax_sum',
                menuDisabled: true,
                width: 60
            },
            {
                text: 'К выплате',
                dataIndex: 'to_pay',
                itemId: 'gridaccept-to_pay',
                menuDisabled: true,
                width: 90
            },
            {
                text: 'Счет',
                dataIndex: 'score',
                itemId: 'gridaccept-score',
                menuDisabled: true,
                width: 70
            },
            {
                text: 'Лайв',
                dataIndex: 'is_live',
                itemId: 'gridaccept-is_live',
                menuDisabled: true,
                width: 60
            },
            {
                text: 'Выплачено',
                dataIndex: 'paid',
                itemId: 'gridaccept-paid',
                menuDisabled: true,
                width: 110
            },
            {
                text: 'Печать',
                //dataIndex: '',//?
                itemId: 'gridaccept-print',
                menuDisabled: true,
                width: 65,
                renderer: function (val, meta, rec) {
                    /*if (rec.get('status') == 1) {
                     return '<span role="button" class="icon-lock-4" data-qtip="Заблокирована"></span>';
                     }*/
                }
            },
            {
                text: 'Подтв.',
                //dataIndex: '',//?
                itemId: 'gridaccept-confirm',
                menuDisabled: true,
                width: 65,
                renderer: function (val, meta, rec) {
                    /*if (rec.get('status') == 1) {
                     return '<span role="button" class="icon-lock-4" data-qtip="Заблокирована"></span>';
                     }*/
                }
            },
            {
                text: 'Копир.',
                //dataIndex: '',//?
                itemId: 'gridaccept-copy',
                menuDisabled: true,
                width: 65,
                renderer: function (val, meta, rec) {
                    /*if (rec.get('status') == 1) {
                     return '<span role="button" class="icon-lock-4" data-qtip="Заблокирована"></span>';
                     }*/
                }
            },
            {
                text: 'Выкуп',
                //dataIndex: '',//?
                itemId: 'gridaccept-buyout',
                menuDisabled: true,
                width: 65,
                renderer: function (val, meta, rec) {
                    /*if (rec.get('status') == 1) {
                     return '<span role="button" class="icon-lock-4" data-qtip="Заблокирована"></span>';
                     }*/
                }
            },
            {
                text: 'Фикс.<br>возврат',
                //dataIndex: '',//?
                itemId: 'gridaccept-fix_return',
                menuDisabled: true,
                width: 70,
                renderer: function (val, meta, rec) {
                    /*if (rec.get('status') == 1) {
                     return '<span role="button" class="icon-lock-4" data-qtip="Заблокирована"></span>';
                     }*/
                }
            },

        ]

        this.dockedItems = [{
            xtype: 'pagingtoolbar',
            //todo проверить работу после обновления
            bind: {store: '{accept}'},
            reference: 'pagingtoolbar',
            dock: 'bottom',
            displayInfo: true,
            displayMsg: 'Показаны записи {0} - {1} из {2}',
            emptyMsg: "Нет записей для отображения"
        }];
        this.tools = [
            {
                type: 'maximize',
                tooltip: 'Скрыть/Раскрыть экспрессы'
            },
            {
                type: 'refresh',
                tooltip: 'Обновить'
            },
            /* {
             type: 'gear',
             tooltip: 'Настройка'
             },*/
            {
                type: 'close',
                tooltip: 'Удалить фильтры'
            }
        ]

        this.callParent();
    }
});