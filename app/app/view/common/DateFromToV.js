// * контейнер из дат от и до
Ext.define('Office.view.common.DateFromToV', {
    extend: 'Ext.container.Container',
    requires: [],
    xtype: 'datefromto',
    initComponent: function () {
        this.layout = this._layout;
        this.items = [
            {
                xtype: 'datefield',
                itemId: this._itemIdFrom,
                flex:1,
                bind:this._bindFrom,
                emptyText: 'Дата c',
                value: this._dateFrom || null,
                allowBlank: this._allowBlankFrom || true,
                format: this._format || 'd.m.Y',
                altFormats: 'd.m.Y H:i:s',
                listeners: this._listenersFrom || null
            },
            {
                xtype: 'datefield',
                itemId: this._itemIdTo,
                flex:1,
                bind:this._bindTo,
                emptyText: 'Дата по',
                value: this._dateTo || null,
                allowBlank: this._allowBlankTo || true,
               // margin: '0 0 0 2',
                format: this._format || 'd.m.Y',
                altFormats: 'd.m.Y H:i:s',
                listeners: this._listenersTo || null
            }
        ];

        this.callParent();
    },
    reset: function () {
        var datefield = this.down('datefield'),
            timefield = this.down('timefield');
        datefield.reset();
        timefield.reset();
    },
    setValue: function (itemId, value) {
        var el = this.down('#' + itemId);
        el.setValue(value);
    },
    silentReset: function () {
        // * погасим ивент на изменение, чтобы не обновлял стор каждый раз при удалении
        var datefield = this.down('datefield'),
            timefield = this.down('timefield');

        datefield.suspendEvent('change');
        timefield.suspendEvent('change');
        this.reset();
        datefield.resumeEvent('change');
        timefield.resumeEvent('change');
    }
});
