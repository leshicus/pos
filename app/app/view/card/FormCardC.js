Ext.define('Office.view.card.FormCardC', {
    extend: 'Ext.app.ViewController',
    requires: [
       // 'Office.view.card.FormCardV'
    ],
    alias: 'controller.formcard',

    listen: {
        controller: {

        }
    },

    control: {
        'formcard button[action=save]': {
            click: function (button) {
                var form = button.up('form'),
                    window = form.up('window'),
                    client = this.getViewModel().get('currentClient');
                //client.commit();
                window.close();
            }
        },
        //TODO разобраться с двусторонним связыванием
        'formcard button[action=cancel]': {
            click: function (button) {
                var form = button.up('form'),
                    window = form.up('window'),
                    client = this.getViewModel().get('currentClient');
                client.reject();
                window.close();
            }
        }

    }

});
