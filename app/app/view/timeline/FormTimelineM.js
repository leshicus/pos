Ext.define('Office.view.timeline.FormTimelineM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.formtimeline',
    //data: {
    //    theStake: {
    //        type: 6 // * Установить тип ставки Game по-умолчанию
    //    }
    //},
    stores: {
        timelinetype: {
            fields: ['id', 'name'],
            data: [
                ['5', "Sport"],
                ['6', "Game"],
            ]
        },
        //lifetime: {
        //    fields: ['id', 'name'],
        //    data: [
        //        ['30', "30 дней"]
        //    ]
        //},
        //searchtimelinegambler: {
        //    fields: [],
        //    storeId: 'searchtimelinegambler',
        //    proxy: {
        //        type: 'ajax',
        //        url: Ext.util.Format.format(Server.getSearch(), '{token}','{filters.term}'),
        //        reader: {
        //            type: 'json',
        //            rootProperty:'response'
        //        }
        //    },
        //    autoLoad: false
        //}
    },
    //formulas: {
    //    showSaveButton: function (get) {
    //        var type = get('theStake.type'),
    //            stake = get('theStake.stake');
    //        console.info(type,stake);
    //        if (type && stake)
    //            return false;
    //        else
    //            return true;
    //    }
    //}

});