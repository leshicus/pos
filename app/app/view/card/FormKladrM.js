Ext.define('Office.view.card.FormKladrM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.formkladr',
    data:{
        manual:false
    },
    formulas: {
        // * предпросмотр адреса, то что сохраняется в карточку
        get_preview: function (get) {
            var strOut = '',
                form = this.getView();

            if (get('manual')){
                if (get('filters.zip'))
                    strOut += get('filters.zip');
                if (get('filters.region'))
                    strOut += ', ' + get('filters.region');
                if (get('filters.district'))
                    strOut += ', ' + get('filters.district');
                if (get('filters.city_grand'))
                    strOut += ', ' + get('filters.city_grand');
                if (get('filters.city'))
                    strOut += ', ' + get('filters.city');
                if (get('filters.street'))
                    strOut += ', ' + get('filters.street');
                if (get('filters.building'))
                    strOut += ', ' + get('filters.building');
                if (get('filters.flat'))
                    strOut += ', кв.' + get('filters.flat');
            }else{
                if (get('get_zip'))
                    strOut += get('get_zip');
                if (get('filters.cityCombo'))
                    strOut += ', ' + (get('filters.cityCombo').get('fullname') || form.down('#comboLocality').getRawValue());
                if (get('filters.streetCombo'))
                    strOut += ', ' + (get('filters.streetCombo').get('fullname') || form.down('#comboStreet').getRawValue());
                if (get('filters.buildingCombo'))
                    strOut += ', ' + (get('filters.buildingCombo').get('fullname') || form.down('#comboBuilding').getRawValue());
                if (get('filters.flat'))
                    strOut += ', кв.' + get('filters.flat');
            }

            return strOut;
        },
        // * определяет индекс
        get_zip: function (get) {
            var strOut = '';

            if (get('filters.zip')){
                strOut = get('filters.zip');
            } else {
                if (get('filters.zip'))
                    strOut = get('filters.zip');
                if (get('filters.cityCombo') && get('filters.cityCombo').get('zip'))
                    strOut = get('filters.cityCombo').get('zip');
                if (get('filters.streetCombo') && get('filters.streetCombo').get('zip'))
                    strOut = get('filters.streetCombo').get('zip');
                if (get('filters.buildingCombo') && get('filters.buildingCombo').get('zip'))
                    strOut = get('filters.buildingCombo').get('zip');
            }

            return strOut;
        }
    },

    stores: {
        city: {
            fields: [
                'id',
                'name',
                'contentType',
                'okato',
                'type',
                'typeShort',
                'zip',
                {
                    name: 'fullname',
                    calculate: function (data) {
                        if (data.name && data.typeShort) {
                            return data.typeShort + '. ' + data.name;
                        }
                    }
                }
            ],
            idProperty: 'id',
            proxy: {
                type: 'jsonp',
                url: Server.getKladrApi(),
                reader: {
                    type: 'json',
                    rootProperty: 'result'
                },
                extraParams: {
                    callback: 'jQuery',
                    token: '51dfe5d42fb2b43e3300006e',
                    key: '51dfe5d42fb2b43e3300006e',
                    contentType: 'city',
                    limit: 100,
                    withParent: 1
                }
            },
            storeId: 'city',
            autoLoad: false
        },
        street: {
            fields: [
                'id',
                'name',
                'contentType',
                'okato',
                'type',
                'typeShort',
                'zip',
                {
                    name: 'fullname',
                    calculate: function (data) {
                        if (data.name && data.typeShort) {
                            return data.typeShort + '. ' + data.name;
                        }
                    }
                }
            ],
            idProperty: 'id',
            proxy: {
                type: 'jsonp',
                url: Server.getKladrApi(),
                reader: {
                    type: 'json',
                    rootProperty: 'result'
                },
                extraParams: {
                    callback: 'jQuery',
                    token: '51dfe5d42fb2b43e3300006e',
                    key: '51dfe5d42fb2b43e3300006e',
                    contentType: 'street',
                    limit: 100,
                    cityId: '{filters.cityId}'
                }
            },
            storeId: 'street',
            autoLoad: false
        },
        building: {
            fields: [
                'id',
                'name',
                'contentType',
                'okato',
                'type',
                'typeShort',
                'zip',
                {
                    name: 'fullname',
                    calculate: function (data) {
                        if (data.name && data.typeShort) {
                            return data.typeShort + '. ' + data.name;
                        }
                    }
                },
                // * !!! Это преобразование нужно, т.к. сервер возвращает некоторые записи с одним и тем же свойством "id" !!!
                {
                    name: 'id',
                    convert: function (val, data) {
                        return data.get('id') + '-' + data.get('name');
                    },
                    type: 'string'
                }
            ],
            idProperty: 'id',
            proxy: {
                type: 'jsonp',
                url: Server.getKladrApi(),
                reader: {
                    type: 'json',
                    rootProperty: 'result'
                },
                extraParams: {
                    callback: 'jQuery',
                    token: '51dfe5d42fb2b43e3300006e',
                    key: '51dfe5d42fb2b43e3300006e',
                    contentType: 'building',
                    limit: 100,
                    streetId: '{filters.streetId}'
                }
            },
            storeId: 'building',
            autoLoad: false
        }
    }
});
