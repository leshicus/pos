Ext.define('Office.view.virtual.GridVirtualC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridvirtual',
    listen: {
        component: {
            '#': {},
            'tool[type=refresh]': {
                click: function (tool) {
                    var grid = tool.up('panel');
                    grid.store.reload();
                }
            },
            'gridvirtual actioncolumn button': function () {
                console.info('я работаю');
                console.info(arguments);
            }
        }
    },
    control: {
        'gridvirtual actioncolumn button': function () {
            console.info('я работаю');
            console.info(arguments);
        }
    },
    onRender: function (grid) {
        Ext.defer(function () {
            TaskF.startTaskVirtualRefresh(grid);
        }, 500, this);
    },
    onEnter: function (field, e) {
        if (e.getKey() == e.ENTER) {
            var mainController = Office.app.getController('Main'),
                grid = this.getView();
            mainController.storeLoadVm(grid);
        }
    },
    // * копируем заявку в купон
    copyToCoupon: function (view, div, scope, options) {
        // console.info(arguments);
        var grid = this.getView(),
            rec = options.args[0],
            short_number = rec.get('short_number'),
            coupon_id = rec.get('id'),
            json_data = rec.get('json_data'),
            jsonData = JSON.parse(json_data.replace('"{', '{').replace('}"', '}')),
            arrBets = jsonData.bets,
            state = jsonData.state,
            msg = 'Отправить виртуальную заявку № ' + short_number + ' в купон?<br>Купон при этом будет очищен.',
            objUrl = {
                class: 'Pos_Virtualslip_Virtualslipcopy',
                params: {
                    coupon_id: coupon_id
                }
            };

        Ext.Msg.confirm('Предупреждение', msg, function (button) {
            if (button == 'yes') {
                // * очистим купон, если он не чист
                var fill = Ext.ComponentQuery.query('#main')[0];
                if (fill) {
                    fill.getController().clickClearBet();
                }

                if (coupon_id) {
                    Ext.Ajax.request({
                        url: Server.getUrl(objUrl),
                        success: function (response) {
                            var mes = Gui.JSONDecodeSafe(response.responseText);

                            if (mes.success) {
                                Util.warnMes('Заявка отправлена в купон');

                                // * реально отпраляем заявку в localStorage
                                var menumain = Ext.ComponentQuery.query('menumain')[0],
                                    vmMenumain = menumain.getViewModel(),
                                    storeBasketLocal = vmMenumain.getStore('basket_localstorage'),
                                    localStorage = Ext.util.LocalStorage.get('newpos'),
                                    isLive = 0;

                                storeBasketLocal.removeAll();

                                // * перебираем ставки и добавляем в локальное хранилище
                                Ext.Array.each(arrBets, function (item) {
                                    isLive = item.type == 'line' ? 0 : 1;

                                    storeBasketLocal.add({
                                        query: {
                                            coefId: item.cf_id,
                                            coefTypeId: null,
                                            coefName: item.short_name,
                                            event_id: item.event_id,
                                            arrCoef: [item.cf_id, null, parseFloat(item.cf_value)],
                                            amount: parseInt(item.value),
                                            arrBasis: [item.odds_id],
                                            min: item.min,
                                            max: item.max,
                                            type: item.type, // * line/live/
                                            outcome_mnemonic_name:item.outcome_mnemonic_name,
                                            odds_outcome_mnemonic_name:item.odds_outcome_mnemonic_name,
                                            multi_value: state.multi_value,
                                            system_value: state.system_value
                                        }
                                    });
                                }, this);

                                // * переключим вкладку в Ставки::События
                                localStorage.setItem('activeEventTab', isLive);
                            } else {
                                if (mes.message)
                                    Util.erMes(mes.message);
                                else
                                    Util.erMes('Заявка не отправлена в купон.');
                            }
                            grid.store.reload();
                        },
                        failure: function (response) {
                            try {
                                var mes = Ext.decode(response.responseText);
                                Util.erMes(mes);
                            } catch (e) {
                                return;
                            }
                            grid.store.reload();
                        },
                        method: 'POST'
                    });
                } else {
                    console.info('Внимание: coupon_id не определен');
                }
            }
        }, this);
    },
    // * обработка нажатия на глиф Открыть заявку
    clickCopyToCoupon: function (val, meta, rec) {
        meta.align = 'center';
        var id = Ext.id(),
            me = this;
        setTimeout(function () { // * иначе не успевают воказаться иконки
            if (rec.get('is_copy_to_coupon') == "0") {
                var cls = 'virtualGreen',
                    title = 'Скопировать в купон';
            } else {
                var cls = 'virtualBlue',
                    title = 'Уже скопирована в купон';
            }
            // * далее следует изощренный способ показывания глифов- как свойство картинки
            // * эта картинка помещается в div и возвращается renderer'y колонки грида
            var img = new Ext.Img({
                glyph: Glyphs.get('arrow_right'),
                cls: cls,
                title: title,
                listeners: {
                    click: {
                        element: 'el', //bind to the underlying el property on the panel
                        fn: me.copyToCoupon,
                        scope: me,
                        args: Array(rec)
                    }
                }
                // * точнее надо вот так писать:
                //listeners: {
                //    el: {
                //        click: function() {
                //            Util.erMes("Message");
                //        }
                //    }
                //}
            });
            if (Ext.get(id)) {
                img.render(Ext.get(id));
            }
        }, 1);
        return '<div id="' + id + '"></div>';
    }
});
