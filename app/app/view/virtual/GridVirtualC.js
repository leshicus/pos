Ext.define('Office.view.virtual.GridVirtualC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.gridvirtual',
    listen: {
        component: {
            '#': {},
            'tool[type=refresh]': {
                click: function (tool) {
                    console.log('refresh');
                    var grid = tool.up('panel');
                    grid.store.reload();
                }
            },
            'gridvirtual actioncolumn button': function () {
                console.info('123');
                console.info(arguments);
            }
        }
    },
    control: {
        'gridvirtual actioncolumn button': function () {
            console.info('123');
            console.info(arguments);
        }
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
        var grid = this.getView(),
            rec = options.args[0],
            short_number = rec.get('short_number'),
            coupon_id = rec.get('id'),
            msg = 'Отправить виртуальную заявку № ' + short_number + ' в купон?<br>Купон при этом будет очищен.',
            objUrl = {
                class: 'Pos_Virtualslip_Virtualslipcopy',
                params: {
                    coupon_id: coupon_id
                }
            };
        Ext.Msg.confirm('Предупреждение', msg, function (button) {
            if (button == 'yes') {
                if (coupon_id) {
                    Ext.Ajax.request({
                        /*url: Server.virtualSlip(),
                         params: {
                         xaction: 'set_to_coupon',
                         coupon_id: coupon_id
                         },*/
                        url: Server.getUrl(objUrl),
                        success: function (response) {
                            try {
                                var mes = Ext.decode(response.responseText);
                                if (mes.success)
                                    Ext.Msg.alert('Сообщение', 'Заявка отправлена в купон.');
                                else {
                                    if (mes.message)
                                        Ext.Msg.alert('Ошибка', mes.message);
                                    else
                                        Ext.Msg.alert('Не известная ошибка', 'Заявка не отправлена в купон.');
                                }
                            } catch (e) {
                                return;
                            }
                            grid.store.reload();
                        },
                        failure: function (response) {
                            try {
                                var mes = Ext.decode(response.responseText);
                                Ext.Msg.alert('Ошибка', mes);
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
            });
            if (Ext.get(id)) {
                img.render(Ext.get(id));
            }
        }, 1);
        return '<div id="' + id + '"></div>';
    }
});
