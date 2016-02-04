Ext.define('Office.view.panels.GridParamV', {
    extend: 'Ext.grid.Panel',
    requires: [
         'Office.view.panels.GridParamM',
         'Office.view.panels.GridParamC'
    ],
    xtype: 'gridparam',
    controller: 'gridparam',
    viewModel: {
        type: 'gridparam'
    },
    columnLines: true,
    autoScroll: true,
    title: 'Параметры',
    frame: true,
    border: true,
    viewConfig: {
        stripeRows: true
    },
    plugins: [
        {
            ptype: 'cellediting',
            pluginId: 'cellediting',
            clicksToEdit: 1
        }
    ],
    bind: {store:'{param}'} ,
    listeners: {
        cellclick: 'onCellclick',
        scope: 'controller'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'filters.panel_id',
                'filters.task_id',
                'parameter.value',
                'parameter.id'
            ]
        });

        var _this=this;

        //_this.getViewModel().getStore('tournaments').load();
        //var combo=Ext.create('Ext.form.field.ComboBox', {
        //    editable: false,
        //    //itemId: 'cbIsLive',
        //    queryMode: 'local',
        //    displayField: 'display_name',
        //    valueField: 'id',
        //    valueNotFoundText:'пусто',
        //    bind: {
        //        value: '{parameter.value}',
        //        store:'{tournaments}'
        //    }
        //});

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false
            },
            items: [
                {
                    text: 'id',
                    dataIndex: 'id',
                    width: 60
                },
                {
                    text: 'Наименование',
                    dataIndex: 'description',
                    width: 150
                },
                {
                    text: 'Значение',
                    dataIndex: 'value',
                    width: 600,
                    getEditor: _this.getController().getParamEditor,
                    renderer: _this.getController().getRenderer
                }
            ]
        }

        this.tools = [
            {
                type: 'refresh',
                tooltip: 'Обновить'
            }
        ]

        this.callParent();
    }

});