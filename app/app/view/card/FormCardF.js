// * ф-ии для formcard
Ext.define('Office.view.card.FormCardF', {
    singleton: true,
    alternateClassName: ['FormCardF'],

    // * общий код - сделал для того, чтобы меньше копипасты было между formcard в Клубных картах и Таймлайн
    cellDblClickCommon: function (diffCode, record) {
        if (this.isAllowedPlayer(record)) {
            var gridSearch = Ext.ComponentQuery.query('gridsearch')[0],
                selected = record,
                window = gridSearch.up('window');

            var //passport_number = selected.get('passport_number'),
            //is_resident = selected.get('is_resident'),
                passport_issue_datetime = selected.get('passport_issue_datetime'),
                birthday = selected.get('birthday');

            //if (parseInt(is_resident)) {
            //    // * приведем формат полей к тому, как они хранятся в форме
            //    selected.set('passer', Gui.getPassportSerie(passport_number, is_resident));
            //    selected.set('pasnom', Gui.getPassportNumber(passport_number, is_resident));
            //} else {
            //    selected.set('pasnom', passport_number);
            //}
            selected.set('passport_issue_datetime', Gui.formatPassportIssueDate(passport_issue_datetime));
            selected.set('birthday', Gui.formatPassportIssueDate(birthday));

            diffCode(selected, window);
        } else {
            this.sayNotAllowedPlayer(record);
        }
    },

    // * можно выбирать данного игрока в данной кассе
    isAllowedPlayer: function (rec) {
        var isDemoCash = Util.getGlobalProp('is_demo');

        if (typeof rec.get == 'function')
            var record = rec.getData();
        else
            var record = rec;

        if (record.enabled == 1
            && record.is_blacklisted == 0
            && (record.is_demo == 0 && isDemoCash == 0
            || record.is_demo == 1 && isDemoCash == 1))
            return true;
        else return false;
    },

    sayNotAllowedPlayer: function (rec) {
        var arr = [];

        if (typeof rec.get == 'function')
            var record = rec.getData();
        else
            var record = rec;

        if (record.enabled != 1)
            arr.push('не активен');
        if (record.is_blacklisted == 1)
            arr.push('в черном списке');
        if (record.is_demo == 1)
            arr.push('демо');
        if (record.is_demo == 0)
            arr.push('не демо');

        Util.warnMes('Нельзя выбрать игрока: ' + arr.join(','));
    },

    afterRender: function (form) {
        // * создаю временную форму КЛДАР для пинга КЛАДР-АПИ
        var formkladr = Ext.create('Office.view.card.FormKladrV');

        Ext.defer(function () {// * задержка должна быть больше 100мс
            var //passer = form.down('#passer'),
                vm = form.getViewModel(),
                selectedDocument = vm.get('selectedDocument'),
                country = form.down('#country'),
                fieldResident = form.down('#is_resident'),
                address = form.down('#address'),
                buttonKladr = form.down('#buttonKladr'),
                is_resident = fieldResident.getValue(),
                vmKladr = formkladr.getViewModel(),
                storeStreet = vmKladr.getStore('street'),
                useKladr = Util.getGlobalConst('USE_KLADR_TO_ENTER_ADDRESSES');

            if (is_resident) { // * такой изврат, т.к. нельзя сделать disabled- так значение поля не будет передаваться при form::submit
                //country.addCls('x-item-disabled');
                country.setReadOnly(true);
                country.select(Config.NUM_RESIDENT_COUNTRY_CODE);
            } else {
                //country.removeCls('x-item-disabled');
            }

            //if(selectedDocument){
            //    if (is_resident) { // * такой изврат, т.к. нельзя сделать disabled- так значение поля не будет передаваться при form::submit
            //        passer.removeCls('x-item-disabled');
            //    } else {
            //        passer.addCls('x-item-disabled');
            //        passer.setReadOnly(true);
            //    }
            //}


            // * отфильтруем типы документов
            this.filterStoreDocument(is_resident, form);

            // * пробный пинг КЛАДР
            storeStreet.getProxy().extraParams = {
                callback: 'jQuery',
                token: '51dfe5d42fb2b43e3300006e',
                key: '51dfe5d42fb2b43e3300006e',
                contentType: 'street',
                limit: 1,
                cityId: '7700000000000'
            };
            storeStreet.load({
                callback: function (arrRes) {
                    if (arrRes && arrRes.length > 0 && useKladr) {
                        if (!form.down('#address').getValue())
                            buttonKladr.enable();

                        //address.addCls('x-item-disabled');
                        //address.setReadOnly(true);
                    } else {
                        if (useKladr)
                            buttonKladr.setTooltip('КЛАДР не может быть загружен');
                    }

                    // * закроем временную форму
                    Ext.defer(function () {
                        formkladr.close();
                    }, 100, this);
                }
            });
        }, 500, this);
    },

    // * фильтрация типов документа
    filterStoreDocument: function (is_resident, form) {
        var document = form.down('#document_type'),
            storeDocument = document.store;

        storeDocument.clearFilter();

        if (is_resident) {
            storeDocument.filterBy(function (item) {
                return item.get('resident') == 1;
            });
        } else {
            storeDocument.filterBy(function (item) {
                return item.get('resident') == 0;
            });
        }
    },

    setFieldMask: function (pasnom) {
        var form = Ext.ComponentQuery.query('formcard')[0],
            vm = form.getViewModel(),
            selectedDocument = vm.get('selectedDocument'),
        //passer = form.down('#passer'),
        //pasnom = form.down('#passport_number'),
            mask;
        // maskSer;

        // pasnom.reset();
        //passer.reset();

        switch (selectedDocument.get('id')) {
            /*
             *	Код: 01
             *  Паспорт гражданина СССР
             *  Формат: R-ББ 999999
             */
            case '01':
                mask = 'R-ББ 999999';
                break;
            /*
             *	Код: 02
             *  Загранпаспорт гражданина СССР
             *  Формат: 99 0999999
             */
            case '02':
                mask = '99 9999990';
                break;
            /*
             *	Код: 04
             *  Удостоверение личности офицера
             *  Формат: ББ 999999
             */
            case '04':
                mask = 'ББ 999999';
                break;
            /*
             *	Код: 06
             *  Паспорт Минморфлота
             *  Формат: ББ 999999
             */
            case '06':
                mask = 'ББ 999999';
                break;
            /*
             *	Код: 07
             *  Военный билет солдата (матроса, сержанта, старшины)
             *  Формат: ББ 0999999
             */
            case '07':
                mask = 'ББ 9999990';
                break;
            /*
             * Код: 21
             * Паспорт гражданина Российской Федерации
             * Формат: 99 99 999999
             */
            case '21':
                mask = '99 99 999999';
                //maskSer = '99 99';
                break;
            /*
             *	Код: 26
             *  Паспорт моряка
             *  Формат: ББ 0999999
             */
            case '26':
                mask = 'ББ 9999990';
                break;
            /*
             *	Код: 27
             *  Военный билет офицера запаса
             *  Формат: ББ 0999999
             */
            case '27':
                mask = 'ББ 9999990';
                break;
            /*
             *	Код: 91
             *  Иные документы, выдаваемые органами МВД
             *  Формат: SSSSSSSSSSSSSSSSSSSSSSSSS
             */
            case '91':
            /*
             *	Код: 10
             *  Иностранный паспорт
             *  Формат: SSSSSSSSSSSSSSSSSSSSSSSSS
             */
            case '10':
            /*
             *	Код: 11
             *  Свидетельство о регистрации ходатайства о признании иммигранта беженцем
             *  Формат: SSSSSSSSSSSSSSSSSSSSSSSSS
             */
            case '11':
            /*
             *	Код: 12
             *  Вид на жительство
             *  Формат: SSSSSSSSSSSSSSSSSSSSSSSSS
             */
            case '12':
            /*
             *	Код: 13
             *  Удостоверение беженца в Российской Федерации
             *  Формат: SSSSSSSSSSSSSSSSSSSSSSSSS
             */
            case '13':
            /*
             *	Код: 14
             *  Временное удостоверение личности гражданина Российской Федерации
             *  Формат: SSSSSSSSSSSSSSSSSSSSSSSSS
             */
            case '14':
            default :
                mask = 'SSSSSSSSSSSSSSSSSSSSSSSSS';
        }

        if (mask) {
            pasnom._mask = mask;
            pasnom.plugin[0].setInputMask(mask);
            pasnom.plugin[0].init(pasnom);
        }

        //var pasnomId = pasnom.getItemId(),
        //    tipId = 'tip_' + pasnomId,
        //    pasnom_tip = Ext.ComponentQuery.query('#' + tipId)[0];
        ////passer_tip = Ext.ComponentQuery.query('#passer_tip')[0];
        //if (mask) {
        //    pasnom._tooltip = 'Формат: ' + mask;
        //    pasnom._mask = mask;
        //    pasnom.plugin[0].setInputMask(mask);
        //    pasnom.plugin[0].init(pasnom);
        //
        //    if (!pasnom_tip) {
        //        var tip = Ext.create('Ext.tip.ToolTip', {
        //            target: pasnom.el,
        //            anchor: 'top',
        //            trackMouse: false,
        //            itemId:  tipId,
        //            closeAction: 'destroy',
        //            html: pasnom._tooltip
        //        });
        //    } else {
        //        pasnom_tip.update(pasnom._tooltip);
        //    }
        //} else {
        //    pasnom._tooltip = '';
        //
        //    if (pasnom_tip)
        //        pasnom_tip.close();
        //}

        //pasnom.focus();

        //if (maskSer) {
        //    passer.enable();
        //
        //    passer._tooltip = 'Формат: ' + maskSer;
        //    passer.plugin[0].setInputMask(maskSer);
        //    passer.plugin[0].init(passer);
        //    if (!passer_tip) {
        //        var tip = Ext.create('Ext.tip.ToolTip', {
        //            target: passer.id,
        //            itemId: 'passer_tip',
        //            closeAction: 'destroy',
        //            html: passer._tooltip
        //        });
        //    } else {
        //        passer_tip.update(passer._tooltip);
        //    }
        //
        //    Ext.defer(function () {
        //        passer.focus();
        //    }, 300, this);
        //} else {
        //    passer._tooltip = '';
        //    if (passer_tip)
        //        passer_tip.close();
        //
        //    Ext.defer(function () {
        //        // * скроем поле
        //        passer.disable();
        //        passer.reset();
        //        pasnom.focus();
        //    }, 300, this);
        //}
    },

    // * удалим маски из полей с маской, если она там осталась
    removeMask: function (form) {
        var arrMaskedFields = form.query('textfield[_mask]');
        Ext.Array.each(arrMaskedFields, function (item) {
            var plugin = item.plugin[0],
                val = item.getValue();
            if (plugin && val.indexOf('_') > -1) {
                console.info('removeMask', val);
                item.setValue(plugin.removeMask(val));
            }
        });
    }
});