Ext.define('Office.view.menumain.MenuMainC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.accept.GridAcceptV',
        'Office.view.accept.PanelFilterAcceptV',
        'Office.view.timeline.GridTimelineV',
        'Office.view.timeline.PanelFilterTimelineV',
        'Office.view.rat.GridRatV',
        'Office.view.rat.PanelFilterRatV',
        'Office.view.card.GridCardV',
        'Office.view.card.GridCardM',
        'Office.view.card.PanelFilterCardV',
        'Office.view.card.FormCardV',

        'Ext.window.MessageBox',
        'Ext.layout.container.Border'
    ],
    alias: 'controller.menumain',
    routes: {
        'menu/:text': {
            action: 'clickButton',
            conditions: {
                ':text': '([%а-яА-ЯёЁa-zA-Z0-9\\-\\_\\s,\\(\\)]+)'
            }
        }
    },
    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onUnmatchedRoute'
            }
        }
    },

    control: {
        // * for routing
        'menumain toolbar menu menuitem, menumain toolbar button': {
            click: function (item) {
                //TODO разобраться с двойной загрузкой (вообще этот контрол-заглушка, одна все пункты меню
                //TODO когда будут контролы для каждого пункта отдельно, двойной загрузки не должно быть
                //console.log(arguments);
                var menuText = item.text,
                    hash = 'menu/' + menuText;
                this.redirectTo(hash);
            }
        },
        'menu menuitem[itemId=menumain_russian]': {
            click: function (item) {
                Ux.locale.Manager.updateLocale(item.text);
            }
        },
        'menu menuitem[itemId=menumain_english]': {
            click: function (item) {
                Ux.locale.Manager.updateLocale(item.text);
            }
        },
        'menumain toolbar button[itemId=menumain_exit]': {
            click: function (button) {
                console.info('qwe');
                Office.util.Setup.logout();
                /*var menumain = this.getView();
                menumain.removeAll(true);*/
            }
        },
        'menumain toolbar button[itemId=menumain_fill]': {
            click: function (button) {
                var menumain = this.getView(),
                    panel = Ext.ComponentQuery.query('fill')[0];
                if (!panel) {
                    menumain.removeAll(true);
                    panel = Ext.create('Office.view.fill.FillV');
                    menumain.add(panel);
                }
            }
        },
        'menumain toolbar button[itemId=menumain_timeline]': {
            click: function (button) {
                var menumain = this.getView();
                menumain.removeAll(true);
                var grid = Ext.create('Office.view.timeline.GridTimelineV', {
                        region: 'center'
                    }),
                    panel = Ext.create('Office.view.timeline.PanelFilterTimelineV', {
                        region: 'north',
                        height: 100
                    }),
                    container = Ext.create('Ext.container.Container', {
                        layout: 'border',
                        flex: 1,
                        items: [panel, grid]
                    });
                menumain.add(container);
            }
        },
        'menumain toolbar button[itemId=menumain_accept]': {
            click: function (button) {
                var menumain = this.getView();
                menumain.removeAll(true);
                var grid = Ext.create('Office.view.accept.GridAcceptV', {
                        region: 'center'
                    }),
                    panel = Ext.create('Office.view.accept.PanelFilterAcceptV', {
                        region: 'north',
                        //height: 100
                    }),
                    container = Ext.create('Ext.container.Container', {
                        layout: 'border',
                        flex: 1,
                        items: [panel, grid]
                    }),
                    comboResult = grid.down('#comboResult') ;
                //comboResult.on('')
                //console.info(menumain,container);
                menumain.add(container);
            }
        },
        'menumain toolbar button[itemId=menumain_rat]': {
            click: function (button) {
                var menumain = this.getView();
                menumain.removeAll(true);
                var grid = Ext.create('Office.view.rat.GridRatV', {
                        region: 'center'
                    });
                    /*panel = Ext.create('Office.view.rat.PanelFilterRatV', {
                        region: 'north',
                        height: 100
                    }),
                    container = Ext.create('Ext.container.Container', {
                        layout: 'border',
                        flex: 1,
                        items: [panel, grid]
                    });*/
                menumain.add(grid);
            }
        },
        'menumain toolbar button[itemId=menumain_card]': {
            click: function (button) {
                var menumain = this.getView();
                menumain.removeAll(true);
                var grid = Ext.create('Office.view.card.GridCardV', {
                        //region: 'center'
                        //height: 400
                    });
                    //viewModel = Ext.create('Office.view.card.GridCardM');

                //grid.setViewModel(viewModel);
                    /*form = Ext.create('Office.view.card.FormCardV',{
                        width: 700,
                        height: 200
                    }),
                    container = Ext.create('Ext.container.Container', {
                        layout: 'fit',
                        viewModel: {
                            type: 'gridcard'
                        },
                        //flex: 1,
                        items: [form,grid]
                    });*/
                menumain.add(grid);
            }
        }
    },
    beforeClickButton: function (action, text) {
        action.resume();
    },
    clickButton: function (text) {
        Ext.defer(function () {
            var menumain = this.getView(),
                toolbar = menumain.down('toolbar'),
                splitbutton = toolbar.query('splitbutton[text=' + text + ']')[0],
                menuitem = toolbar.query('menuitem[text=' + text + ']')[0],
                button = toolbar.query('button[text=' + text + ']')[0],
                item = menuitem || splitbutton || button;
            if (item) {
                item.fireEvent('click', item);
            } else {

                Ext.Msg.alert('Ошибка', 'Не известныый пункт меню: ' + text);
            }
        }, 10, this);

    },
    onUnmatchedRoute: function (text) {
        Ext.defer(function () {
            var menumain = this.getView(),
                toolbar = menumain.down('toolbar'),
                splitbutton = toolbar.query('splitbutton[text=' + text + ']')[0],
                menuitem = toolbar.query('menuitem[text=' + text + ']')[0],
                item = menuitem || splitbutton;
            if (item) {
                item.fireEvent('click', item);
            } else {
                console.log(arguments, splitbutton, item);
                Ext.Msg.alert('Ошибка', 'Не известныый пункт меню: ' + text);
            }
        }, 10, this);
    }
});
