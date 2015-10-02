Ext.define('Office.view.timeline.GridSearchC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridsearch',

    // * выбрали клиента в списке поиска
    //onCellDblclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
    //    if (record.get('enabled') == 1 && record.get('is_blacklisted') == 0 && record.get('is_demo') == 0) {
    //        var gridSearch = this.getView(),
    //            selected = gridSearch.getSelectionModel().getSelection()[0],
    //            window = gridSearch.up('window'),
    //            formCard = window.down('#card-2').down('formcard'),
    //            formTimeline = window.down('formtimeline'),
    //            layout = formTimeline.getLayout();
    //        formCard.reset();
    //
    //        var passport_number = selected.get('passport_number'),
    //            is_resident = selected.get('is_resident'),
    //            passport_issue_datetime = selected.get('passport_issue_datetime');
    //
    //        if (parseInt(is_resident)) {
    //            // * для резидентов серия паспорта обязательна
    //            var fieldPasser = formCard.down('#passer');
    //            fieldPasser.allowBlank = false;
    //
    //            // * приведем формат полей к тому, как они хранятся в форме
    //            selected.set('passer', Gui.getPassportSerie(passport_number, is_resident));
    //            selected.set('pasnom', Gui.getPassportNumber(passport_number, is_resident));
    //        } else {
    //            selected.set('pasnom', passport_number);
    //        }
    //        selected.set('passport_issue_datetime', Gui.formatPassportIssueDate(passport_issue_datetime));
    //
    //        formCard.loadRecord(selected);
    //        layout.setActiveItem('card-2');
    //        window.setTitle('Параметры таймлайн');
    //
    //        // * сделать не пустые поля не редактируемыми
    //        Ext.defer(function () { // * без задержки не успевают проставиться признаки
    //            formCard.getController().setNotEditable();
    //        }, 100);
    //    } else {
    //        var str = record.get('enabled') != 1 ? 'не активен; ' : '';
    //        str += record.get('is_blacklisted') == 1 ? 'в черном списке; ' : '';
    //        str += record.get('is_demo') == 1 ? 'демо; ' : '';
    //
    //        Util.toast('Внимание', 'Нельзя создать таймлайн: ' + str);
    //    }
    //
    //},
    //onCellDblclick: function (grid, td, cellIndex, record, tr, rowIndex, e) {
    //    if (record.get('enabled') == 1 && record.get('is_blacklisted') == 0 && record.get('is_demo') == 0) {
    //        var gridSearch = Ext.ComponentQuery.query('gridsearch')[0],
    //            selected = gridSearch.getSelectionModel().getSelection()[0],
    //            window = gridSearch.up('window');
    //        //formCard = window.down('#card-2').down('formcard'),
    //        //formTimeline = window.down('formtimeline'),
    //        //layout = formTimeline.getLayout();
    //        //formCard.reset();
    //
    //
    //        var passport_number = selected.get('passport_number'),
    //            is_resident = selected.get('is_resident'),
    //            passport_issue_datetime = selected.get('passport_issue_datetime');
    //
    //        if (parseInt(is_resident)) {
    //            // * для резидентов серия паспорта обязательна
    //            //var fieldPasser = formCard.down('#passer');
    //            //fieldPasser.allowBlank = false;
    //
    //            // * приведем формат полей к тому, как они хранятся в форме
    //            selected.set('passer', Gui.getPassportSerie(passport_number, is_resident));
    //            selected.set('pasnom', Gui.getPassportNumber(passport_number, is_resident));
    //        } else {
    //            selected.set('pasnom', passport_number);
    //        }
    //        selected.set('passport_issue_datetime', Gui.formatPassportIssueDate(passport_issue_datetime));
    //
    //        var formTimeline = Ext.create('Office.view.timeline.FormTimelineV', {
    //                viewModel: {
    //                    data: {
    //                        theClient: selected
    //                    }
    //                }
    //            }),
    //            formCard = formTimeline.down('formcard');
    //
    //        // * не надо показывать поле штрихкод
    //        var fieldBarcode = formCard.down('#barcode');
    //        fieldBarcode.setDisabled(true);
    //
    //        formCard.loadRecord(selected);
    //        //layout.setActiveItem('card-2');
    //        window.setTitle('Параметры таймлайн');
    //
    //        window.removeAll();
    //        window.add(formTimeline);
    //
    //        window.setWidth(900);
    //
    //        // * сделать не пустые поля не редактируемыми
    //        Ext.defer(function () { // * без задержки не успевают проставиться признаки
    //            formCard.getController().setNotEditable();
    //        }, 100);
    //    } else {
    //        var str = record.get('enabled') != 1 ? 'не активен; ' : '';
    //        str += record.get('is_blacklisted') == 1 ? 'в черном списке; ' : '';
    //        str += record.get('is_demo') == 1 ? 'демо; ' : '';
    //
    //        Util.toast('Внимание', 'Нельзя создать таймлайн: ' + str);
    //    }
    //},
    //
    //// * при загрузке стора Список игроков
    //loadSearchTimelineGambler: function (store, records) {
    //    if (!records.length)
    //        Util.erMes('Игрок не найден');
    //},

    // * кнопка Отмена
    onClickCancel: function (button) {
        var win = button.up('window');
        win.close();
    }

});
