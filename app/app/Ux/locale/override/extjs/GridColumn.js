Ext.define('Ux.locale.override.extjs.GridColumn', {
    override: 'Ext.grid.column.Column',

    requires: [
        'Ux.locale.override.extjs.Component1'
    ],

    initComponent: function () {
        this.callOverridden(arguments);

        if (this.enableLocale) {
            this.title = '&nbsp;';
        }
    },

    setLocale: function (locale) {
        var me = this,
            locales = me.locales,
            text = locales.text,
            manager = me.locale,
            defaultText = '';
        if (text) {
            if (Ext.isObject(text)) {
                defaultText = text.defaultText;
                text = text.key;
            }

            text = manager.get(text, defaultText);
            if (Ext.isString(text)) {
                me.setText(text);
            }
        }

        me.callOverridden(arguments);
    }
});