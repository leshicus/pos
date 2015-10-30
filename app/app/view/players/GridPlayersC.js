Ext.define('Office.view.players.GridPlayersC', {
    extend: 'Ext.app.ViewController',
    requires: ['Office.view.players.FormAddPlayerV'],
    alias: 'controller.gridplayers',
    listen: {
        component: {
            '#': {},
            'tool[type=refresh]': {
                click: function (tool) {
                    var grid = tool.up('panel');
                    grid.store.reload();
                }
            },
            /*'gridplayers actioncolumn button': function () {
                console.info('я работаю');
                console.info(arguments);
            }*/
        }
    },
    control: {
       /*'gridplayers actioncolumn button': function () {
            console.info('я работаю');
            console.info(arguments);
        }*/
    },
    onRender: function (grid) {
        /*Ext.defer(function(){
            TaskF.startTaskVirtualRefresh(grid);
        },500,this);*/
    },
    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var mainController = Office.app.getController('Main'),
                grid = this.getView();
            mainController.storeLoadVm(grid);
        }
    },
    onAddPlayer: function () {

        Ext.defer(function () {
            var formaddplayer = Ext.create('Office.view.players.FormAddPlayerV', {
                    viewModel: {
                        data: {
                            //theClient: selected
                        }
                    }
                }),
                win = new Ext.window.Window({
                    title: 'Добавление нового игрока',
                    modal: true,
                    constrain: true,
                    width: 360,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        formaddplayer
                    ],
                    buttons: Util.getButtonsSaveCancel({
                        scope: formaddplayer.getController(),
                        textSave: 'Ok'
                    })
                });
            win.show();
        }, 10);
        /*
            var win = new Ext.Window({
                            id: 'addUserWindow',
                            height: 125,
                            width: 290,
                            modal: true,
                            layout: 'fit',
                            title: '<?php echo Language::getCaption(Language::ID_NEW_PLAYER); ?>',
                            items: [{
                                xtype: 'panel',
                                layout: 'vbox',
                                bodyStyle: 'background-color: #d4e1f2; padding: 4px;',
                                items: [{
                                    xtype: 'panel',
                                    layout: 'form',
                                    labelWidth: 80,
                                    bodyStyle: 'padding: 2px; background-color: #d4e1f2;',
                                    border: false,
                                    autoWidth: true,
                                    items: [{
                                        xtype: 'textfield',
                                        id: 'officeClientNameField',
                                        fieldLabel: '<?php echo Language::getCaption(Language::ID_PLAYERS_NAME); ?>',
                                        width: 180,
                                        enableKeyEvents: true,
                                        listeners:
                                        {
                                            afterrender: function (field) {
                                                field.focus(false, 200);
                                            },
                                            keydown: function(o, event)
                                            {
                                                var keyCode = event.which;
                                                if (keyCode == undefined)
                                                {
                                                    keyCode = event.keyCode;
                                                }
                                                if (keyCode == 13)
                                                {
                                                    addOfficeClient();
                                                }
                                            }
                                        }
                                    }
                                    ]
                                }]
                            }],
                            plain: true,
                            border: false,
                            resizable: false,
                            draggable: false,
                            closable: false,
                            buttonAlign: 'center',
                            autoScroll: true,
                            buttons: [

                                {
                                    text: '<?php echo Language::getCaption(Language::ID_OK); ?>',
                                    handler: addOfficeClient
                                },
                                {
                                    text: '<?php echo Language::getCaption(Language::ID_CANCEL); ?>',
                                    handler : function() {
                                        Ext.Msg.hide();
                                        win.close();
                                    }
                                }
                            ]
                        });
                        win.show();
        */
    },
    onDeletePlayer: function () {
        var grid = Ext.ComponentQuery.query('gridplayers')[0],
                selection = grid.getSelectionModel().getSelection()[0];
                
            if(selection)
            {
                var player = selection.get('text'),
                office_client_id = selection.get('office_client_id'),
                objUrl = {
                    class: 'Pos_Officeplayers_Officeplayersdelete',
                    params: {
                        office_client_id: office_client_id
                    }
                };
                Ext.Msg.confirm('Подтверждение', 'Вы действительно хотите удалить игрока «' + player + '»?', function (btn) {
                    if (btn == 'yes') {
                        Ext.Ajax.request({
                            url: Server.getUrl(objUrl),
                            success: function (response) {
                                var info = Gui.JSONDecodeSafe(response.responseText);

                                if (info.success) {
                                    //var grid = this.getView();
                                    grid.store.reload();
                                } else {
                                    
                                        Util.erMes(info.errorText);
                                    
                                }
                            },
                            failure: function (response) {
                                var mes = Gui.JSONDecodeSafe(response.responseText);
                                Util.erMes(mes);
                                console.info(mes);
                            },
                            method: 'POST'
                        });
                    }

                });
            }
        /*var node = Ext.getCmp('im-tree').getSelectionModel().getSelectedNode();
                        Ext.Msg.confirm('<?php echo Language::getCaption(Language::ID_CONFIRMATION); ?>', '<?php echo Language::getCaption(Language::ID_QUESTION_DELETE_PLAYER); ?> «' + node.text + '»?', function(btn) {
                            if (btn == 'yes')
                            {
                                Ext.Ajax.request({
                                    url: getOfficeClientsDataUrl(),
                                    params: {
                                        xaction: 'destroy',
                                        office_client_id: node.attributes.office_client_id
                                    },
                                    method: 'POST',
                                    failure: function(resp, o) {
                                        Ext.Msg.alert('<?php echo Language::getCaption(Language::ID_ERROR); ?>', '<?php echo Language::getCaption(Language::ID_ERROR_DELETE_PLAYER); ?>');
                                    },
                                    success: function(resp, o) {
                                        var response = Ext.util.JSON.decode(resp.responseText);
                                        if (typeof(response.success) != 'undefined' && response.success)
                                        {
                                            refreshOfficeClientsListInBasket();
                                        }
                                        else
                                        {
                                            Ext.Msg.alert('<?php echo Language::getCaption(Language::ID_ERROR); ?>', response.errorText);
                                        }
                                    }
                                });
                            }
                        }, this);*/
    }
});
