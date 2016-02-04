Ext.define('Office.view.gameacc.GridGameAccV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.gameacc.GridGameAccM',
        'Office.view.gameacc.GridGameAccC'
    ],
    xtype: 'gridgameacc',
    controller: 'gridgameacc',
    viewModel: {
        type: 'gridgameacc'
    },
    columnLines: true,
    autoScroll: true,
    title: 'Игровые счета',
    frame: true,
    border: true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        getRowClass: function (record, index, rowParams, store) { // * класс для строки грида
            if (record.get('enabled') != 1 || record.get('is_blacklisted') == 1) return 'blocked-card-row';
        }
    },
    /*glyph: Glyphs.get('card'),
     cls: 'gridcard',*/
    bind: '{gameacc}',
    listeners: {
        cellclick: 'onCellclick',
        scope: 'controller'
    },
    initComponent: function () {
        /*        this.getViewModel().set('token', Server.getToken());
         this.getViewModel().set('user_id', '');
         this.getViewModel().set('username', Ext.util.Cookies.get('betzet_login'));*/
        Util.initClassParams({
            scope: this,
            params: [
                'filters.user_id',
                'filters.username',
                'filters.mobile_phone',
                'filters.min_balance',
                'filters.max_balance'
            ]
        });

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false
            },
            items: [
                {
                    text: 'Телефон',
                    dataIndex: 'mobile_phone',
                    flex: 1
                },
                {
                    text: 'Баланс',
                    dataIndex: 'balance',
                    width: 90
                },
                {
                    text: 'Активность',
                    dataIndex: 'enabled',
                    width: 90,
                    renderer: function (val, meta, rec) {
                        if (val == 1) {
                            meta.align = 'center';
                            return '<span role="button" class="fa fa-check" style="color: green" data-qtip="Активный"></span>';
                        }
                    }
                },
                {
                    text: 'Черный<br>список',
                    dataIndex: 'is_blacklisted',
                    width: 90,
                    renderer: function (val, meta, rec) {
                        if (val == 1) {
                            meta.align = 'center';
                            return '<span role="button" class="fa fa-check" style="color: black" data-qtip="Черный список"></span>';
                        }
                    }
                }
            ]
        }

        this.tbar = [
            {
                xtype: 'textfield',
                labelWidth: 110,
                width: 120,
                bind:'{filters.mobile_phone}',
                itemId: 'mobile_phone',
                emptyText: 'Телефон игрока',
                listeners: {
                    specialkey: 'onEnter'
                }
            },
            {
                xtype: 'textfield',
                //fieldLabel: 'Баланс игрока',
                labelWidth: 100,
                width: 90,
                bind: '{filters.min_balance}',
                itemId: 'min_balance',
                emptyText: 'Баланс от',
                listeners: {
                    specialkey: 'onEnter'
                }
            },
            {
                xtype: 'textfield',
                width: 90,
                bind: '{filters.max_balance}',
                itemId: 'max_balance',
                emptyText: 'до',
                listeners: {
                    specialkey: 'onEnter'
                }
            },
            {
                text: 'Внести',
                handler: 'onInputCash',
                itemId: 'inputCash',
                glyph: Glyphs.get('plus'),
                cls: 'plus',
                bind:{
                    disabled: '{disableInputButton}'
                }

            },
            {
                text: 'Изъять',
                handler: 'onOutputCash',
                itemId: 'outputCash',
                glyph: Glyphs.get('minus'),
                cls: 'cancel',
                bind:{
                    disabled: '{disableInputButton}'
                }
            }
        ]

        this.tools = [
            {
                type: 'refresh',
                tooltip: 'Обновить'
            }
        ]


        this.callParent();
    }
});