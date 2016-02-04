Ext.define('Office.view.fill.basket.GridBasketSingleV', {
    extend: 'Office.view.fill.basket.GridBasketProtoV',
    requires: [
        'Office.view.fill.basket.GridBasketSingleM',
        'Office.view.fill.basket.GridBasketSingleC',
        'Office.view.fill.basket.GridBasketProtoV'
    ],
    xtype: 'gridbasketsingle',
    controller: 'gridbasketsingle',
    viewModel: {
        type: 'gridbasketsingle'
    },
    bind: {
        store: '{basket}'
    },
    initComponent: function () {
        this.bbar = [
            {
                xtype: 'container',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                cls: 'bbar-bet',
                flex: 1,
                items: [
                    {
                        xtype: 'container',
                        layout: {
                            type: 'hbox'
                        },
                        flex: 1,
                        items: [
                            {
                                xtype: 'checkbox',
                                inputValue: true,
                                value: false,
                                itemId: 'checkBetSeries',
                                reference: 'checkBetSeries', // * чтобы можно было байндить другие компоненты как '{!checkBetSeries.checked}'
                                bind: {
                                    hidden: '{!showBetsSeries}'
                                },
                                listeners: {
                                    change: 'onChangeCheckBetSeries'
                                }
                            },
                            {
                                xtype: 'textfield',
                                labelWidth: 130,
                                flex: 1,
                                margin: '0 0 0 5',
                                itemId: 'betSeries',
                                selectOnFocus: true,
                                maskRe: /^[0-9]$/,
                                fieldLabel: 'Серия ставок по',
                                bind: {
                                    disabled: '{!checkBetSeries.checked}',
                                    hidden: '{!showBetsSeries}',
                                    value: '{betSeries}'
                                },
                                listeners: {
                                    change: 'onChangeBetSeries',
                                    specialkey: 'onEnterBetSeries',
                                    focus: 'onFocusBetResult'
                                }
                            }
                        ]
                    },
                    {
                        xtype: 'textfield',
                        labelWidth: 150,
                        margin: '2 0 0 0',
                        itemId: 'betResult',
                        selectOnFocus: true,
                        maskRe: /^[0-9]$/,
                        fieldLabel: 'Общая сумма ставки',
                        bind: {
                            disabled: '{!checkBetSeries.checked}',
                            hidden: '{!showBetsSeries}',
                            value: '{betResult}'
                        },
                        listeners: {
                            change: 'onChangeBetSum',
                            specialkey: 'onEnterBetSeries',
                            focus: 'onFocusBetResult'
                        }
                    },
                    {
                        xtype: 'displayfield',
                        itemId: 'singleResultPrize',
                        labelWidth: 150,
                        bind: {
                            value: '{prize}'
                        },
                        fieldLabel: 'Возможный выигрыш'
                    },
                ]
            }
        ]

        this.columns = {
            defaults: {
                menuDisabled: true,
                sortable: false
            },
            items: [
                {
                    xtype: 'templatecolumn',
                    flex: 1,
                    tpl: new Ext.XTemplate( // * min,max,amount,coefName- это поля стора basket_chained
                        // * заголовок
                        '<table width="100%" class="bet-title" >',
                        '<tr>',
                        '<td align="center"><span class="bet-title">' + '{coefName}' + '</span></td>',
                        '</tr>',
                        '</table>',

                        // * название команд 
                        '<table width="100%" class="bet-teams">',
                        '<tr style="vertical-align: top;">',
                        '<td align="left" style="white-space: normal;"><span>' + '{[this.colorText("green", "1&nbsp&nbsp")]}' + '{[this.getFirstTeam(values)]}' + '</span></td>',
                        '<td align="right" style="width: 50px;"><span style="color: #8A259B;">' + '№ ' + '{short_number}' + '</span></td>',
                        '</tr>',
                        '<tr>',
                        '<td align="left" style="white-space: normal;" colspan="2"><span>' + '{[this.colorText("red", "2&nbsp&nbsp")]}' + '{[this.getSecondTeam(values)]}' + '</span></td>',
                        '</tr>',
                        '</table>',

                        // * параметры ставки
                        '<table width="100%" class="bet" >',
                        '<tr>',
                        '<td align="center"><span style="color: rgb(39, 127, 204);">Кф</span></td>',
                        '<td align="center"><span style="color: rgb(39, 127, 204);">Min</span></td>',
                        //'<td align="center"><span style="color: rgb(39, 127, 204);">Ставка</span></td>',
                        '<td align="center"><span style="color: rgb(39, 127, 204);">Max</span></td>',
                        '<td align="center"><span style="color: rgb(39, 127, 204);">Выигрыш</span></td>',
                        '</tr>',
                        '<tr>',
                        '<td align="center"><span class="bet">' + '{[values.arrCoef[2]]}' + '</span></td>',
                        '<td align="center">' + '{min}' + '</td>',
                        //'<td align="center" width="60"><input type="number" id="{id}" min="0" value="{amount}" class="bet" onClick="this.select();"  onkeypress="OfficeGlobalNS.config.onKeyPressBet(this,event,{min},{max})" onkeyup="OfficeGlobalNS.config.setSingleBetValue(this,{min},{max});" onchange="OfficeGlobalNS.config.setSingleBetValue(this,{min},{max});"/></td>',//onchange="OfficeGlobalNS.config.setSingleBetValue(this,{min},{max});"
                        '<td align="center">' + '{max}' + '</td>',
                        '<td align="center"><span class="bet">' + '{[this.multiple(values.amount,values.arrCoef[2],values.min,values.max)]}' + '</span></td>',
                        '</tr>',
                        '<tr height="25">',
                        '<td align="left" colspan="2" width="150"><span style="color: rgb(39, 127, 204);font-size: 18px;line-height:1;padding-left: 2px;">Ставка</span></td>',
                        '<td align="left" colspan="2" style="padding: 0;"><input type="number" required id="{id}" min="0" value="{amount}" class="bet-amount"  onClick="this.select();"  onkeypress="OfficeGlobalNS.config.onKeyPressBet(this,event,\'{min}\',\'{max}\')" onkeyup="OfficeGlobalNS.config.setSingleBetValue(this,\'{min}\',\'{max}\');" onchange="OfficeGlobalNS.config.setSingleBetValue(this,\'{min}\',\'{max}\');"/></td>',
                        '</tr>',
                        '</table>',
                        //'<span style="font-size: 18px;color: #666;padding-left: 5px;padding-right: 5px;">Ставка:</span><input type="number"  style="font-size: 18px;width: 100px;border: 0;" id="{id}" min="0" value="{amount}" onClick="this.select();"  onkeypress="OfficeGlobalNS.config.onKeyPressBet(this,event,{min},{max})" onkeyup="OfficeGlobalNS.config.setSingleBetValue(this,{min},{max});" onchange="OfficeGlobalNS.config.setSingleBetValue(this,{min},{max});"/></td>',//onchange="OfficeGlobalNS.config.setSingleBetValue(this,{min},{max});"'
                        //todo не получается сделать обновление выиграша сразу после ввода цифры в поле Ставка, т.к. в oninput после rec.set('amount', value) теряется фокус
                        // * autocomplete="off" in input: чтобы значение в disabled input обновлялось, отключение браузерной фичи по сохранению введенных значений
                        {
                            getLimit: function (limit) {
                                return parseInt(limit) || 0;
                            },
                            multiple: function (bet, coef, min, max) {
                                var sum = this.getValidatedBet(bet, min, max) * coef;
                                return Ext.util.Format.currency(sum, '&nbsp', 2, true);
                            },
                            getValidatedBet: function (bet, min, max) {
                                var out = 0;
                                if (bet >= min || bet <= max) {
                                    out = bet;
                                }
                                return out;
                            },
                            colorText: function (color, text) {
                                return '<font color="' + color + '">' + text + '</font>';
                            },
                            getFirstTeam: function (values) {
                                if (values.type == 'rats') {
                                    return values.tournament_name;
                                } else {
                                    return values.home;
                                }
                            },
                            getSecondTeam: function (values) {
                                if (values.type == 'rats') {
                                    return Ext.Date.format(new Date(values.time), 'd F G:i');
                                } else {
                                    return values.away;
                                }
                            }
                        }),
                    listeners: {
                        click: 'onSelect'
                    }
                },
                {
                    text: 'Cancel',
                    width: 25,
                    renderer: function (val, meta, rec) {
                        meta.align = 'center';
                        meta.tdCls = 'bet-cancel-cell';
                        return '<span role="button" class="fa fa-times" style="color: red;font-size: 24px;" data-qtip="Удалить ставку"></span>';
                    }
                }
            ]
        }

        this.callParent();
    }
});