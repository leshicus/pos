Ext.define('Office.view.card.GridCardC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Office.view.card.FormCardV',
        'Office.view.card.GridCardM'
    ],
    alias: 'controller.gridcard',

    listen: {
        controller: {

        }
    },

    control: {
        'gridcard': {
            celldblclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
                var form = Ext.create('Office.view.card.FormCardV'),
                    gridViewModel = this.getViewModel();
                var window = Ext.create('Ext.Window', {
                    width: 700,
                    bind: {
                        title: 'Редактирование: <b>{currentClient.family}</b>'
                    },
                    constrain: true,
                    closable: false,
                    modal: true,
                    layout: 'fit'
                });
                window.setViewModel(gridViewModel);
                window.add(form);
                window.show();
            }
        },
        'gridcard button[action=addClient]': {
            click: function (button) {
                var form = Ext.create('Office.view.card.FormCardV'),
                    gridViewModel = this.getViewModel(),
                    grid = button.up('gridcard'),
                    store = gridViewModel.getStore('storeGridcard'),
                    newRec = store.insert(0,{})[0];
                console.info(newRec);
                gridViewModel.set('currentClient',newRec);
                var window = Ext.create('Ext.Window', {
                    width: 700,
                    bind: {
                        title: 'Редактирование: {currentClient.family}'
                    },
                    constrain: true,
                    closable: false,
                    modal: true,
                    layout: 'fit'
                });
                window.setViewModel(gridViewModel);
                window.add(form);
                window.show();
            }
        }
    }
});
