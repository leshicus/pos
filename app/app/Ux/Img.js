// * расширение класса Img- добавление ckick event
Ext.define('Ux.Img', {
    extend : 'Ext.Img',
    xtype  : 'ux-img',

    onRender : function() {
        this.callParent(arguments);

        this.el.on('click', this.onClick, this);
    },

    onClick : function(e, t) {
        this.fireEvent('click', this, e, t);
    }
});