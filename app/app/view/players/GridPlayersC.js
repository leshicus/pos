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
    }
});
