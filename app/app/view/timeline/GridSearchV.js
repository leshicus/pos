Ext.define('Office.view.timeline.GridSearchV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Office.view.timeline.GridSearchM',
        'Office.view.timeline.GridSearchC'
    ],
    xtype: 'gridsearch',
    controller: 'gridsearch',
    viewModel: {
        type: 'gridsearch'
    },
    columnLines: true,
    rowLines: true,
    flex: 1,
    frame: true,
    border: true,
    title: 'Игроки',
    autoScroll: true,
    reserveScrollbar: true,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        getRowClass: function (record, index, rowParams, store) { // * класс для строки грида
            if (!FormCardF.isAllowedPlayer(record)) return 'blocked-card-row';
        }
    },
    glyph: Glyphs.get('user'),
    cls: 'gridsearch',
    bind: '{searchtimelinegambler}',
    listeners: {
        celldblclick: 'onCellDblclick',
        scope: 'controller'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: ['filters.term']
        });

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false
            },
            items: [
                {
                    text: 'id',
                    dataIndex: 'id',
                    itemId: 'id',
                    width: 70
                },
                {
                    text: 'Логин',
                    dataIndex: 'login',
                    itemId: 'login',
                    width: 110
                },
                {
                    text: 'Фамилия',
                    dataIndex: 'lastname',
                    itemId: 'lastname',
                    width: 130
                },
                {
                    text: 'Имя',
                    dataIndex: 'firstname',
                    itemId: 'firstname',
                    width: 130
                },
                {
                    text: 'Отчество',
                    dataIndex: 'patronymic_name',
                    itemId: 'patronymic_name',
                    width: 110
                },
                {
                    text: 'Паспорт',
                    dataIndex: 'passport_number',
                    itemId: 'passport_number',
                    width: 100,
                    // * серия и номер отдельно
                    //renderer: function (val, w, rec) {
                    //    if (val && val.length == 10) {
                    //        var passer = val.substr(0, 4),
                    //            pasnum = val.substr(-6, 6);
                    //        return passer + ' ' + pasnum;
                    //    } else {
                    //        return val;
                    //    }
                    //}
                },
                {
                    text: 'Телефон',
                    dataIndex: 'mobile_phone',
                    itemId: 'mobile_phone',
                    width: 110
                },
                {
                    text: 'Актив.',
                    dataIndex: 'enabled',
                    itemId: 'enabled',
                    width: 70,
                    renderer: function (val, meta, rec) {
                        if (val == 1) {
                            meta.align = 'center';
                            return '<span role="button" class="fa fa-check" style="color: green" data-qtip="Активный"></span>';
                        }
                    }
                },
                {
                    text: 'Черный<br>список',
                    dataIndex: 'is_blacklisted',
                    itemId: 'is_blacklisted',
                    width: 70,
                    renderer: function (val, meta, rec) {
                        if (val == 1) {
                            meta.align = 'center';
                            return '<span role="button" class="fa fa-check" style="color: black" data-qtip="Черный список"></span>';
                        }
                    }
                },
                {
                    text: 'Демо',
                    dataIndex: 'is_demo',
                    itemId: 'is_demo',
                    width: 60,
                    renderer: function (val, meta, rec) {
                        if (val == 1) {
                            meta.align = 'center';
                            return '<span role="button" class="fa fa-check" style="color: crimson" data-qtip="Демо"></span>';
                        }
                    }
                },
                {
                    text: 'Адрес',
                    dataIndex: 'address',
                    itemId: 'address',
                    width: 130
                }
            ]
        }

        //this.buttons=Util.getButtonCancel({scope:'controller'});

        this.callParent();
    }
});