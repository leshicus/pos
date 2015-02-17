Ext.define('Office.view.card.FormKladrV', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.form.Panel',
        'Ext.layout.container.Column',
        'Office.view.card.FormKladrC',
        'Office.view.card.FormKladrM'
    ],
    xtype: 'formkladr',
    controller: 'formkladr',
    viewModel: {
        type: 'formkladr'
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    defaults: {
        labelWidth: 140,
        margin: 5,
        hideTrigger: true
    },
    initComponent: function () {
        Utilities.initClassParams({
            scope: this,
            params: [
                'filters.zip',
                'filters.cityId',
                'filters.cityCombo',
                'filters.streetId',
                'filters.streetCombo',
                'filters.buildingId',
                'filters.buildingCombo',
                'filters.flat'
            ]
        });

        // * показывать адрес с родительскими элементами
        var comboLocTpl = Ext.create('Ext.XTemplate',
            '<tpl for=".">',
            '<div class="x-boundlist-item"><b>{fullname}</b> (',
            '<tpl for="parents" between=", ">',
            '<font color="#777">{name} {typeShort}</font>',
            '</tpl>',
            ')</div>',
            '</tpl>'
        );
        var comboStreetTpl = Ext.create('Ext.XTemplate',
            '<tpl for=".">',
            '<div class="x-boundlist-item"><b>{fullname}</b></div>',
            '</tpl>'
        );

        this.items = [
            {
                fieldLabel: 'Населенный пункт',
                xtype: 'combo',
                bind: {
                    store: '{city}',
                    selection: '{filters.cityCombo}',
                    value: '{filters.cityId}'
                },
                displayField: 'name',
                valueField: 'id',
                editable: true,
                itemId: 'comboLocality',
                queryMode: 'remote',
                minChars: 0,
                _contentType: 'city',
                /* то, что показывается в списке */
                tpl: comboLocTpl,
                listeners: {
                    change: 'onChangeKladr',
                    //beforequery:'beforequery',
                    scope: 'controller'
                }
            },
            {
                fieldLabel: 'Улица',
                xtype: 'combo',
                bind: {
                    store: '{street}',
                    selection: '{filters.streetCombo}',
                    value: '{filters.streetId}'
                },
                displayField: 'name',
                valueField: 'id',
                editable: true,
                itemId: 'comboStreet',
                queryMode: 'remote',
                minChars: 0,
                _contentType: 'street',
                tpl: comboStreetTpl,
                listeners: {
                    change: 'onChangeKladr',
                    scope: 'controller'
                }
            },
            {
                fieldLabel: 'Дом',
                xtype: 'combo',
                bind: {
                    store: '{building}',
                    selection: '{filters.buildingCombo}',
                    value: '{filters.buildingId}'
                },
                displayField: 'name',
                valueField: 'id',
                editable: true,
                itemId: 'comboBuilding',
                queryMode: 'remote',
                minChars: 0,
                _contentType: 'building',
                tpl: comboStreetTpl,
                listeners: {
                    change: 'onChangeKladr',
                    scope: 'controller'
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Квартира',
                bind: {
                    value: '{filters.flat}'
                },
                itemId: 'flat',
                listeners: {
                    change: 'onChangeKladr',
                    scope: 'controller'
                }
            },
            {
                fieldLabel: 'Предпросмотр адреса',
                xtype: 'textarea',
                itemId: 'address',
                name: 'address',
                bind: {
                    value: '{get_preview}'
                },
                editable: false
            }
        ];
        this.buttons = Utilities.getButtonsSaveCancel({
            scope: this.getController()
        });
        this.callParent();
    }
});