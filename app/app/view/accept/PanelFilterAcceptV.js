Ext.define('Office.view.accept.PanelFilterAcceptV', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Office.view.accept.PanelFilterAcceptM',
        'Office.view.accept.PanelFilterAcceptC',
        'Office.view.accept.GridAcceptM',
        'Ext.form.field.Tag',
        'Ext.form.FieldSet',

        'Office.model.Sessions',
        'Office.view.common.ComboCheckV'
    ],
    xtype: 'panelfilteraccept',
    viewModel: {
        type: 'panelfilteraccept'
    },
    layout: {
        type: 'hbox'
        //align: 'stretch' // * позволяет растягивать по горизонтали до конца экрана
    },
    /* defaults: {
     enableKeyEvents: true,
     queryMode: 'local',
     displayField: 'name',
     valueField: 'id',
     editable: false,
     margin: 5
     },*/
    autoScroll: true,
    collapsible: true,
    split: true,
    title: 'Фильтры',
    glyph: 'xf0b0@FontAwesome',
    controller: 'panelfilteraccept',
    stateful: true,
    stateId: 'panelfilteraccept',
    initComponent: function () {
        var me = this;

       // console.info( App.model.Sessions.load());
        /*this.items = [
         {
         layout: {
         type: 'hbox'
         },
         defaults: {
         enableKeyEvents: true,
         queryMode: 'local',
         displayField: 'name',
         valueField: 'id',
         editable: false,
         margin: 2
         },
         items: [
         {
         xtype: 'tagfield',
         fieldLabel: 'Результат',
         itemId: 'cbStateSlip',
         displayField: 'value',
         editable: true,
         //width: 230,
         labelWidth: 100,
         viewModel: {
         type: 'gridaccept'
         },
         filterPickList: true,
         bind: {
         store: '{result}'
         },
         listeners: {
         change: 'onAddFilter'
         }
         }
         ]
         },
         {
         layout: {
         type: 'hbox'
         },
         defaults: {
         enableKeyEvents: true,
         queryMode: 'local',
         displayField: 'name',
         valueField: 'id',
         editable: false,
         margin: 2
         },
         items: [
         {
         xtype: 'tagfield',
         fieldLabel: 'Вид спорта',
         //width: 230,
         labelWidth: 100,
         itemId: 'cbSport',
         editable: true,
         filterPickList: true,
         bind: {
         store: '{sport}'
         },
         listeners: {
         change: 'onAddFilter'
         }
         }
         ]
         },
         {
         layout: {
         type: 'hbox'
         },
         defaults: {
         enableKeyEvents: true,
         queryMode: 'local',
         displayField: 'name',
         valueField: 'id',
         editable: false
         },
         items: [
         {
         xtype: 'combobox',
         itemId:'cbPaid',
         width: 200,
         labelWidth: 100,
         fieldLabel: 'Выплачено',
         emptyText: 'да/нет',
         margin: 2,
         bind: {
         store: '{yesNo}'
         },
         listeners: {
         change:'onAddFilter'
         }
         },
         {
         xtype: 'combobox',
         itemId: 'cbIsLive',
         width: 170,
         labelWidth: 50,
         margin: '2 2 2 30',
         fieldLabel: 'Лайв',
         bind: {
         store: '{live}'
         },
         listeners: {
         change: 'onAddFilter'
         }
         },
         {
         xtype: 'textfield',
         itemId: 'cbSlipId',
         fieldLabel: 'Номер',
         editable: true,
         labelWidth: 55,
         width: 120,
         margin: '2 2 2 30',
         _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
         listeners: {
         //select: 'onAddFilter',
         specialkey: 'onEnter',
         change:'onAddFilter'
         }
         },
         {
         xtype: 'checkbox',
         itemId: 'cbByBets',
         margin: '2 2 2 30',
         //inputValue: 'on',
         boxLabel: 'По бетам',
         flex: 1,
         listeners: {
         change: 'onAddFilter'
         }
         },
         {
         xtype: 'displayfield',
         itemId: 'labelCash',
         fieldLabel: 'Сумма в кассе',
         value: '2500.00',
         width: 200
         }
         ]
         }
         ]*/

        this.items = [
            {
                xtype: 'combocheck',
                fieldLabel: 'Вид спорта',
                //width: 230,
                margin:2,
                labelWidth: 90,
                itemId: 'cbSport',
                editable: false,
                queryMode: 'local',
                displayField: 'value',
                valueField: 'id',
                _checkField: 'checked',
                _func: function (combo, n) {
                    me.controller.onAddFilter(combo, n);
                },
                store: '{sport}'
            },
            {
                xtype: 'combobox',
                itemId: 'cbPaid',
                width: 190,
                labelWidth: 90,
                fieldLabel: 'Выплачено',
                emptyText: 'да/нет',
                margin: '2 2 2 30',
                editable: false,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                bind: {
                    store: '{yesNo}'
                },
                listeners: {
                    change: 'onAddFilter'
                }
            },
            {
                xtype: 'combobox',
                itemId: 'cbIsLive',
                width: 170,
                labelWidth: 50,
                margin: '2 2 2 30',
                fieldLabel: 'Лайв',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                editable: false,
                bind: {
                    store: '{live}'
                },
                listeners: {
                    change: 'onAddFilter'
                }
            },
            {
                xtype: 'textfield',
                itemId: 'cbSlipId',
                fieldLabel: 'Номер',
                editable: true,
                labelWidth: 55,
                width: 120,
                margin: '2 2 2 30',
                _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                listeners: {
                    //select: 'onAddFilter',
                    specialkey: 'onEnter'
                    //change: 'onAddFilter'
                }
            },
            {
                xtype: 'checkbox',
                itemId: 'cbByBets',
                margin: '2 2 2 30',
                //inputValue: 'on',
                boxLabel: 'По бетам',
                flex: 1,
                listeners: {
                    change: 'onAddFilter'
                }
            },
            {
                xtype: 'displayfield',
                itemId: 'balanceLabel',
                fieldLabel: 'Сумма в кассе',
                width: 200,
                bind:'{theSessions.sessionCash}'
            }

        ]
        this.tools = [
            /* {
             type: 'gear',
             tooltip: 'Настройка'
             },*/
            {
                type: 'close',
                tooltip: 'Удалить фильтры'
            }
        ]
        this.callParent(); // * без этого пишет Cannot read property 'items' of undefined
    }
})