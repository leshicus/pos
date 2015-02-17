// * комбик с чекбоксами
// * Внимание!!!: элемент с id = 0 (или -1) рассмативаем как [Все]
Ext.define('Office.view.common.ComboCheckV', {
    extend: 'Ext.container.Container',
    requires: [
        'Office.util.Utilities'
    ],
    xtype: 'combocheck',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        var onePixelImg = "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            comboTPL = new Ext.XTemplate(
                '<tpl for=".">',
                '<div class="x-boundlist-item">',
                '<tpl if="values.checked">',
                '<div class="nowrap">',
                '<span style="vertical-align: -5px">',
                '<input type="checkbox" checked="checked" disabled="disabled" />',
                '</span>',
                '<span>',
                '<img class="{iconCls}" align="center" src=' + onePixelImg + '>',
                '</span>',
                '<span style="vertical-align: -0.3em">',
                ' {',
                this.displayField,
                '}',
                '</span>',
                '</div>',
                '</tpl>',
                '<tpl if="!values.checked">',
                '<div class="nowrap">',
                '<span style="vertical-align: -5px">',
                '<input type="checkbox" disabled="disabled" />',
                '</span>',
                '<span>',
                '<img class="{iconCls}" align="center" src=' + onePixelImg + '>',
                '</span>',
                '<span style="vertical-align: -0.3em">',
                ' {',
                this.displayField,
                '}',
                '</span>',
                '</div>',
                '</tpl>',
                '</div>',
                '</tpl>' // end for
            );

        this.items = [
            {
                xtype: 'combo',
                bind: this._bind,
                emptyText: this.emptyText,
                displayField: this.displayField,
                valueField: this.valueField,
                editable: this.editable,
                fieldLabel: this.fieldLabel,
                _checkField: this._checkField,
                itemId: this.itemId,
                tpl: comboTPL,
                queryMode: 'local',
                multiSelect: true,
                _func: this._func,
                listeners: {
                    change: function (combo, arrNew, arrOld) {
                        var checkField = combo._checkField,
                            store = combo.getStore();

                        // * вычислим разность между новым  и старым массивами отмеченных значений
                        // * с разностью поступим так: если новый массив длиннее, то установим cheked=true, иначе cheked=false
                        var arrDif = Array();
                        if (arrNew.length > arrOld.length) {
                            Ext.Array.each(arrNew, function (item, i) {
                                if (!Utilities.in_array(item, arrOld, true))
                                    arrDif.push(item);
                            });
                        } else {
                            Ext.Array.each(arrOld, function (item, i) {
                                if (!Utilities.in_array(item, arrNew, true))
                                    arrDif.push(item);
                            });
                        }

                        // * обратим значение для отмеченного поля
                        if (Utilities.in_array("0", arrDif, true) || Utilities.in_array("-1", arrDif, true)) { // * если выделен пункт Все, то поведение отличается
                            // * заморозим ивенты
                            combo.suspendEvent('change');
                            // * проставим/снимем чекеры
                            store.each(function (item) {
                                item.set(combo._checkField, arrNew.length > arrOld.length);
                            });
                            // * отметим/снимем отметки пункты комбика
                            if (arrNew.length > arrOld.length) {
                                combo.setValue(combo.store.getData().items);
                            } else {
                                combo.clearValue();
                            }
                            combo.resumeEvent('change');
                        } else {
                            Ext.Array.each(arrDif, function (item, i) {
                                var rec = store.findRecord(combo.valueField, item, 0, false, true, true),
                                    val = rec.get(checkField);
                                rec.set(checkField, !val);
                            });
                        }
                        if(combo._func){
                            combo._func(combo, arrNew, arrOld);
                        }
                    }
                }
            }
        ];

        this.callParent();
    }
});
