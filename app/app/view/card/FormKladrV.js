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
        Util.initClassParams({
            scope: this,
            params: [
                'filters.zip',
                'filters.city',
                'filters.cityId',
                'filters.cityCombo',
                'filters.street',
                'filters.streetId',
                'filters.streetCombo',
                'filters.building',
                'filters.buildingId',
                'filters.buildingCombo',
                'filters.flat',
                'filters.region',
                'filters.district',
                'filters.city_grand'
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
                xtype: 'checkbox',
                fieldLabel: 'Ручной ввод',
                inputValue: '1',
                uncheckedValue: '0',
                //name: 'is_resident',
                itemId: 'manual',
                handler: 'clickManual',
                bind: {
                    value: '{manual}'
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Индекс',
                bind: {
                    value: '{filters.zip}',
                    disabled: '{!manual}'
                },
                itemId: 'zip'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Регион',
                bind: {
                    value: '{filters.region}',
                    disabled: '{!manual}'
                },
                itemId: 'region'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Район',
                bind: {
                    value: '{filters.district}',
                    disabled: '{!manual}'
                },
                itemId: 'district'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Город',
                bind: {
                    value: '{filters.city_grand}',
                    disabled: '{!manual}'
                },
                itemId: 'city_grand'
            },
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
                autoSelect: false,
                itemId: 'comboLocality',
                queryMode: 'remote',
                minChars: 0,
                _contentType: 'city',
                enableKeyEvents: true,
                /* то, что показывается в списке */
                tpl: comboLocTpl,
                listeners: {
                    change: 'onChangeKladr',
                    keydown: 'onKeydownKladr',
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
                autoSelect: false,
                enableKeyEvents: true,
                itemId: 'comboStreet',
                queryMode: 'remote',
                minChars: 0,
                _contentType: 'street',
                tpl: comboStreetTpl,
                listeners: {
                    change: 'onChangeKladr',
                    keydown: 'onKeydownKladr',
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
                autoSelect: false,
                enableKeyEvents: true,
                itemId: 'comboBuilding',
                queryMode: 'remote',
                minChars: 0,
                _contentType: 'building',
                tpl: comboStreetTpl,
                listeners: {
                    change: 'onChangeKladr',
                    keydown: 'onKeydownKladr',
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
        this.buttons = Util.getButtonsSaveCancel({
            scope: this.getController()
        });
        this.callParent();
    }
});