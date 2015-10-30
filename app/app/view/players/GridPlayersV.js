Ext.define('Office.view.players.GridPlayersV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.Img',
        'Office.view.players.GridPlayersM',
        'Office.view.players.GridPlayersC'
    ],
    xtype: 'gridplayers',
    viewModel: {
        type: 'gridplayers'
    },
    columnLines: true,
    flex: 1,
    title: 'Игроки',
    frame: true,
    controller: 'gridplayers',
    viewConfig: {
        stripeRows: true,
        loadMask: false // * чтобы сообщение loading не показывалось
    },
    /*glyph: Glyphs.get('virtual'),
    cls: 'gridvirtual',*/
    bind: '{players}',
    listeners:{
      render:'onRender'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this
        });

        // * создаю taskRunner- менеджер заданий для данного раздела
        //Util.createTaskRunner(this);

        /*var short_number = Ext.create('Ext.form.field.Text', {
                _fireEventOnEnter: true, // * change event будет работать только по нажатию на Enter
                itemId: 'bidNum',
                bind:'{filters.short_number}',
                listeners: {
                    specialkey: 'onEnter'
                }
            }),
            placeId = Ext.create('Ext.form.field.Text', {
                _fireEventOnEnter: true,
                itemId: 'placeId',
                bind:'{filters.place_id}',
                listeners: {
                    specialkey: 'onEnter'
                }
            });*/

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                }
            },
            items: [
                {
                    text: 'Клиенты кассы',
                    dataIndex: 'text',
                    itemId: 'text',
                    width: 200
                }
                
            ]
        }

        this.tbar = [
            {
                //text: 'Внести',
                handler: 'onAddPlayer',
                itemId: 'addPlayer',
                glyph: Glyphs.get('plus'),
                cls: 'plus'
            },
            {
                //text: 'Изъять',
                handler: 'onDeletePlayer',
                itemId: 'deletePlayer',
                glyph: Glyphs.get('minus'),
                cls: 'cancel'
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