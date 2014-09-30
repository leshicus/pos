// * контейнер из даты и времени
Ext.define('Office.view.common.ContainerDateTime', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.form.field.Time'
    ],
    xtype: 'containerdatetime',
    layout: {
        type: 'hbox'
    },
    defaults: {
        enableKeyEvents: true
    },
    initComponent: function () {
        this.items = [
            {
                xtype: 'datefield',
                format: Office.util.Utilities.dateFormat,
                itemId: this._itemIdDate,
                value: this._value,
                allowBlank: this._allowBlank,
                width:100,
                emptyText: this._emptyTextDate,
                listeners:this._listenersDate
            },
            {
                xtype: 'timefield',
                itemId: this._itemIdTime,
                format: 'H:i',
                flex:1,
                margin: '0 0 0 2',
                emptyText: this._emptyTextTime,
                listeners:this._listenersTime
            }
        ]

        this.callParent();
    },
    reset:function () {
        var datefield = this.down('datefield'),
            timefield = this.down('timefield');
        datefield.reset();
        timefield.reset();
    }

});
