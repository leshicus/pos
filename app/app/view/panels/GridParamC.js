Ext.define('Office.view.panels.GridParamC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridparam',

    listen: {
        component: {
            'tool[type=refresh]': {
                click: function (tool) {
                    var grid = tool.up('panel'),
                        gridParam = grid.up('menumain').down('gridparam'),
                        vm=gridParam.getViewModel(),
                        storeParam = vm.getStore('param'),
                        storeTourn = vm.getStore('tournaments');
                    storeParam.reload();
                    storeTourn.reload();
                }
            }
        }
    },

    onCellclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
        var gridParam = this.getView(),
            selected = gridParam.getSelectionModel().getSelection()[0],
            id = selected.get('id'),
            value = selected.get('value');
        gridParam.getViewModel().set('parameter.id', id);
        gridParam.getViewModel().set('parameter.value', value);
    },

    getParamEditor: function (record) {
        var description = record.get('description');

        if (description === Config.TASK_ALIAS_EVENT_ID) {
            return Ext.create('Ext.grid.CellEditor', {
                field: Ext.create('Ext.form.field.ComboBox', {
                    editable: false,
                    itemId: 'comboParam',
                    queryMode: 'local',
                    displayField: 'display_name',
                    valueField: 'id',
                    bind: {
                        value: '{parameter.value}',
                        store:'{tournaments}'
                    }
                })
            });
        } else {
            return Ext.create('Ext.grid.CellEditor', {
                field: Ext.create('Ext.form.field.Text', {
                    bind: {
                        value: '{parameter.value}'
                    }
                })
            });
        }
    },

    getRenderer:function(value, metaData, record) {
        var comboRecord,
            gridParam = this,
            combo = gridParam.down('#comboParam');
        if (record.get('description') === Config.TASK_ALIAS_EVENT_ID) {
            if(combo){
                comboRecord = combo.findRecord(combo.valueField, value);
                value = comboRecord ? comboRecord.get(combo.displayField) : combo.valueNotFoundText;
            }else{
                var storeTourn = gridParam.getViewModel().getStore('tournaments');
                if(storeTourn){
                    var recTourn= storeTourn.findRecord('id', record.get('value'), 0, false, true, true);
                    if(recTourn){
                        return recTourn.get('display_name');
                    }
                }
            }
        }
        return value;
    }

});
