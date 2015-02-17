Ext.define('Office.view.card.FormKladrC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.window.MessageBox',
        'Ext.data.proxy.JsonP'
    ],
    alias: 'controller.formkladr',

    listen: {
        controller: {}
    },

    control: {},
    onClickSave: function (button) {
        var form = button.up('form'),
            window = form.up('window'),
            formCard = Ext.ComponentQuery.query('formcard')[0] || Ext.ComponentQuery.query('formtimeline')[0],
            preview = form.getViewModel().getData().get_preview;
        formCard.getViewModel().set('theClient.address', preview);
        window.close();
    },
    onClickCancel: function (button) {
        var form = button.up('form'),
            window = form.up('window');
        window.close();
    },

    // * после изменения значения в комбо
    onChangeKladr: function (field, newValue, oldValue) {
        if (field.getItemId() != 'address') {
            var form = this.getView(),
                street = form.down('#comboStreet'),
                building = form.down('#comboBuilding'),
                flat = form.down('#flat');
            switch (field._contentType) {
                case 'city':
                    street.reset();
                    building.reset();
                    flat.reset();
                    break;
                case 'street':
                    building.reset();
                    flat.reset();
                    break;
                case 'building':
                    flat.reset();
                    break;
            }
        }
    }

});
