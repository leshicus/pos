Ext.define('Office.view.chat.GridChatUserV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.chat.GridChatUserM',
        'Office.view.chat.GridChatUserC'
    ],
    xtype: 'gridchatuser',
    controller: 'gridchatuser',
    viewModel: {
        type: 'gridchatuser'
    },
    columnLines: true,
    autoScroll: true,
    title: 'Пользователи',
    frame: true,
    border: true,
    viewConfig: {
        stripeRows: true
    },
    glyph: Glyphs.get('user'),
    bind: '{chatuser}',
    listeners: {
        cellclick: 'onCellclick',
        scope: 'controller'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'filters.groupid',
                'filters.userlogin',
                'filters.allUsers',
                'login'
            ]
        });
        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false
            },
            items: [
                {
                    text: 'Номер',
                    dataIndex: 'id',
                    width: 60
                },
                {
                    text: 'Имя',
                    dataIndex: 'login',
                    cellWrap:true,
                    flex: 1
                }
            ]
        }

        this.tbar = new Ext.container.Container({
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [
                {
                    xtype:'toolbar',
                    items:[
                        {
                            xtype: 'checkbox',
                            itemId: 'allUsers',
                            inputValue: true,
                            uncheckedValue: false,
                            boxLabel: 'Все пользователи',
                            flex: 1,
                            bind:{
                                value:'{filters.allUsers}'
                            }
                        }
                    ]
                },
                {
                    xtype:'toolbar',
                    items:[
                        {
                            xtype:'textfield',
                            emptyText: 'Поиск',
                            flex:1,
                            enableKeyEvents: true,
                            _fireEventOnEnter: true,
                            itemId: 'findUser',
                            listeners: {
                                specialkey: 'onEnter'
                            },
                            bind:{
                                value:'{filters.userlogin}'
                            },
                            triggers: {// * значек лупы
                                one: {
                                    cls: 'x-form-search-trigger'
                                }
                            }
                        }
                    ]
                }
            ]
        });

        this.tools = [
            {
                type: 'refresh',
                tooltip: 'Обновить'
            }
        ]

        this.callParent();
    }
});