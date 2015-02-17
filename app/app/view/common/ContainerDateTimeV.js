// * контейнер из даты и времени
Ext.define('Office.view.common.ContainerDateTimeV', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.form.field.Time',
        'Office.util.Utilities'
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
                //format: Utilities.dateFormatHyphenShort, // * определяется требуемым форматом передачи на сервер
                itemId: this._itemIdDate,
                value: this._value,
                allowBlank: this._allowBlank,
                _cbDateType:this._cbDateType,
                width:105,
                format: this._format,
                emptyText: this._emptyTextDate,
                bind: this._bindDate,
                listeners:this._listenersDate
            },
            {
                xtype: 'timefield',
                itemId: this._itemIdTime,
                format: 'H:i:s',
                flex:1,
                _cbDateType:this._cbDateType,
                margin: '0 0 0 2',
                emptyText: this._emptyTextTime,
                bind: this._bindTime,
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
    },
    setValue: function (itemId, value) {
        var el = this.down('#'+itemId);
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
