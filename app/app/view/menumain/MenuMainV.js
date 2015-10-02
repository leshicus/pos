Ext.define('Office.view.menumain.MenuMainV', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Office.view.menumain.MenuMainC',
        'Office.view.menumain.MenuMainM',
        'Office.view.fill.FillV',
        'Ux.locale.Manager',
        'Ext.button.Segmented',
        'Ext.layout.container.SegmentedButton',
        'Ext.plugin.Viewport',
        'Ext.plugin.Responsive'
    ],
    xtype: 'menumain',
    viewModel: {
        type: 'menumain'
    },
    controller: 'menumain',
    plugins: [
        'viewport',
        'responsive'
    ],
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        // * сразу открывать Смены после авторизации
        render: 'afterRender',
        //destroy: 'onDestroy'
    },
    initComponent: function () {
        Util.initClassParams({
            scope: this,
            params: [
                'locale'
            ]
        });

        var vm = this.getViewModel(),
            runner = new Ext.util.TaskRunner();
        vm.set('taskRunner', runner);
        vm.set('locale', Ux.locale.Manager.getCurrentLocale()['abbr']);


        // * верхнее левое меню развернутое в кнопки
        var responsiveFormulas = {
                // * условие узкого экрана
                getTallWidth: function (context) {
                    return context.width < Util.widthResponsive;
                },
                // * условие широкого экрана
                getWideWidth: function (context) {
                    return context.width >= Util.widthResponsive;
                }
            },
            segmentedButtonTopLeft = Ext.create('Ext.button.Segmented', {
                cls: 'menumain1',
                plugins: 'responsive',
                responsiveFormulas: responsiveFormulas,
                responsiveConfig: {
                    getTallWidth: {
                        hidden: true
                    },
                    getWideWidth: {
                        hidden: false
                    }
                },
                defaults: {
                    scale: 'large',
                    cls: 'menumain',
                    style: {
                        "border-width": "0px"
                        /*"border-right-width": "1px"*//*grey*/
                    },
                    handler: 'onClickMenumain',
                    bind: {
                        disabled: '{isGlobalSession}'
                    },
                    disabled: true
                },
                items: [
                    {
                        //text: 'Смена',
                        text: Ux.locale.Manager.get("menumain.session"),
                        itemId: 'session',
                        glyph: Glyphs.get('clock'),
                        style: {
                            "border-width": "0px",
                            "border-left-width": "0px !important"
                        },
                        disabled: false
                    },
                    {
                        //text: 'Ставки',
                        text: Ux.locale.Manager.get("menumain.fill"),
                        itemId: 'fill',
                        glyph: Glyphs.get('football')
                    },
                    {
                        //text: 'Ставки Таймлайн',
                        text: Ux.locale.Manager.get("menumain.timeline"),
                        itemId: 'timeline',
                        glyph: Glyphs.get('list_1'),
                        bind: {
                            hidden: '{!getShowButtonTimeline}'
                        }
                    },
                    {
                        //text: 'Игровые счета',
                        text: Ux.locale.Manager.get("menumain.gameacc"),
                        itemId: 'gameacc',
                        glyph: Glyphs.get('list_1'),
                        bind: {
                            hidden: '{!getShowButtonGameacc}'
                        }
                    },
                    {
                        //text: 'Принятые',
                        text: Ux.locale.Manager.get("menumain.accept"),
                        itemId: 'accept',
                        glyph: Glyphs.get('list')
                    },
                    {
                        //text: 'Клубные карты',
                        text: Ux.locale.Manager.get("menumain.card"),
                        itemId: 'card',
                        glyph: Glyphs.get('card'),
                        bind: {
                            hidden: '{!getShowButtonCard}'
                        }
                    },
                    {
                        //text: 'Выплаты',
                        text: Ux.locale.Manager.get("menumain.pay"),
                        itemId: 'pay',
                        glyph: Glyphs.get('dollar'),
                        //bind:{
                        //    hidden:'{!getShowButtonPay}'
                        //}
                    },
                    //{
                    //    //text: 'Крысы',
                    //    text: Ux.locale.Manager.get("menumain.rat"),
                    //    itemId: 'rat',
                    //    glyph: Glyphs.get('paw')
                    //},
                    //{
                    //    //text: 'Крысы',
                    //    text: Ux.locale.Manager.get("menumain.ratbets"),
                    //    itemId: 'ratbets',
                    //    glyph: Glyphs.get('paw')
                    //},
                    {
                        //text: 'Панели',
                        text: Ux.locale.Manager.get("menumain.panels"),
                        itemId: 'panels',
                        glyph: Glyphs.get('desktop'),
                        //_user_in_club:true,
                        bind: {
                            hidden: '{!getShowButtonPanel}'
                        }
                    },
                    {
                        //text: 'Виртуальные заявки',
                        text: Ux.locale.Manager.get("menumain.virtual"),
                        itemId: 'virtual',
                        glyph: Glyphs.get('list'),
                        bind: {
                            hidden: '{!getShowButtonVirtual}'
                        }
                    }
                ]
            }),
        // * верхнее левое меню свернутое в список
            buttonTopLeft = Ext.create('Ext.button.Button', {
                plugins: 'responsive',
                responsiveFormulas: responsiveFormulas,
                responsiveConfig: {
                    getTallWidth: {
                        hidden: false
                    },
                    getWideWidth: {
                        hidden: true
                    }
                },
                scale: 'large',
                cls: 'menumain',
                style: { // * через cls не получается
                    'background-color': '#038D98',
                    'border-width': 0
                },
                text: 'Меню',
                tooltip: 'Меню',
                itemId: 'menu',
                glyph: Glyphs.get('menu'),
                defaults: {
                    bind: {
                        disabled: '{isGlobalSession}'
                    }
                },
                menu: [
                    {
                        text: Ux.locale.Manager.get("menumain.session"),
                        itemId: 'session',
                        glyph: Glyphs.get('clock'),
                        cls: 'menutopleft',
                        listeners: {
                            click: 'onClickMenumain'
                        }
                    },
                    {
                        text: Ux.locale.Manager.get("menumain.fill"),
                        itemId: 'fill',
                        glyph: Glyphs.get('football'),
                        cls: 'menutopleft',
                        listeners: {
                            click: 'onClickMenumain'
                        },
                        bind: {
                            disabled: '{isGlobalSession}'
                        },
                        disabled: true
                    },
                    {
                        text: Ux.locale.Manager.get("menumain.timeline"),
                        itemId: 'timeline',
                        glyph: Glyphs.get('list_1'),
                        cls: 'menutopleft',
                        listeners: {
                            click: 'onClickMenumain'
                        },
                        bind: {
                            hidden: '{!getShowButtonTimeline}',
                            disabled: '{isGlobalSession}'
                        },
                        disabled: true
                    },
                    {
                        text: Ux.locale.Manager.get("menumain.gameacc"),
                        itemId: 'gameacc',
                        glyph: Glyphs.get('list_1'),
                        cls: 'menutopleft',
                        listeners: {
                            click: 'onClickMenumain'
                        },
                        bind: {
                            hidden: '{!getShowButtonGameacc}',
                            disabled: '{isGlobalSession}'
                        },
                        disabled: true
                    },
                    {
                        text: Ux.locale.Manager.get("menumain.accept"),
                        itemId: 'accept',
                        glyph: Glyphs.get('list'),
                        cls: 'menutopleft',
                        listeners: {
                            click: 'onClickMenumain'
                        },
                        bind: {
                            disabled: '{isGlobalSession}'
                        },
                        disabled: true
                    },
                    {
                        text: Ux.locale.Manager.get("menumain.card"),
                        itemId: 'card',
                        glyph: Glyphs.get('card'),
                        cls: 'menutopleft',
                        listeners: {
                            click: 'onClickMenumain'
                        },
                        bind: {
                            hidden: '{!getShowButtonCard}',
                            disabled: '{isGlobalSession}'
                        },
                        disabled: true
                    },
                    {
                        text: Ux.locale.Manager.get("menumain.pay"),
                        itemId: 'pay',
                        glyph: Glyphs.get('dollar'),
                        cls: 'menutopleft',
                        listeners: {
                            click: 'onClickMenumain'
                        },
                        bind: {
                            disabled: '{isGlobalSession}'
                        },
                        disabled: true
                    },
                    //{
                    //    text: Ux.locale.Manager.get("menumain.rat"),
                    //    itemId: 'rat',
                    //    glyph: Glyphs.get('paw'),
                    //    cls: 'menutopleft',
                    //    listeners: {
                    //        click: 'onClickMenumain'
                    //    },
                    //    bind: {
                    //        disabled: '{isGlobalSession}'
                    //    },
                    //    disabled: true
                    //},
                    //{
                    //    text: Ux.locale.Manager.get("menumain.ratbets"),
                    //    itemId: 'ratbets',
                    //    glyph: Glyphs.get('paw'),
                    //    cls: 'menutopleft',
                    //    listeners: {
                    //        click: 'onClickMenumain'
                    //    },
                    //    bind: {
                    //        disabled: '{isGlobalSession}'
                    //    },
                    //    disabled: true
                    //},
                    {
                        text: Ux.locale.Manager.get("menumain.panels"),
                        itemId: 'panels',
                        glyph: Glyphs.get('desktop'),
                        cls: 'menutopleft',
                        listeners: {
                            click: 'onClickMenumain'
                        },
                        bind: {
                            hidden: '{!getShowButtonPanel}',
                            disabled: '{isGlobalSession}'
                        },
                        disabled: true
                    },
                    {
                        text: Ux.locale.Manager.get("menumain.virtual"),
                        itemId: 'virtual',
                        glyph: Glyphs.get('list'),
                        cls: 'menutopleft',
                        listeners: {
                            click: 'onClickMenumain'
                        },
                        bind: {
                            hidden: '{!getShowButtonVirtual}',
                            disabled: '{isGlobalSession}'
                        },
                        disabled: true
                    }
                ]
            }),
        // * верхнее правое меню развернутое в кнопки
            segmentedButtonTopRight = Ext.create('Ext.button.Segmented', {
                cls: 'menumain1',
                allowToggle: false,
                defaults: {
                    scale: 'large',
                    cls: 'menumain',
                    style: {
                        'border-width': 0,
                        'box-shadow': 0
                        /*"border-right-width": "1px"*//*grey*/
                    },
                    handler: 'onClickMenumain'
                },
                items: [
                    {
                        tooltip: Ux.locale.Manager.get("menumain.info"),
                        itemId: 'info',
                        glyph: Glyphs.get('info'),
                        //defaults:{},// * не работает
                        menu: [
                            {
                                text: 'Памятка по НДФЛ',
                                href: Server.getPrefix() + "/office/files/info_about_identify.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Адреса пунктов приёма ставок',
                                href: Server.getPrefix() + "/office/files/betting_points.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Памятка для кассиров',
                                href: Server.getPrefix() + "/office/files/pamyatka.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Руководство',
                                href: Server.getPrefix() + "/office/files/help.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: '«MortalBet» и выкуп ставок',
                                href: Server.getPrefix() + "/office/files/mortalbet.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Правила конторы',
                                href: Server.getPrefix() + "/office/files/rules.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Объяснение ставок',
                                href: Server.getPrefix() + "/office/files/stavki.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Контакты технической поддержки',
                                href: Server.getPrefix() + "/office/files/telephony.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Правила для «Игры на поле»',
                                href: Server.getPrefix() + "/office/files/RulesForGameOnField.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Инструкция для кассира',
                                href: Server.getPrefix() + "/office/files/instruction.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Правила игры Bet Rat v2',
                                href: Server.getPrefix() + "/office/files/BetRatv2.0.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Коды для быстрого поиска',
                                href: Server.getPrefix() + "/office/files/QuickSearchCodes.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Инструкция ТАЙМЛАЙН',
                                href: Server.getPrefix() + "/office/files/info-timeline.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Инструкция к "ВИРТУАЛЬНАЯ ЗАЯВКА"',
                                href: Server.getPrefix() + "/office/files/cashbox_ru.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Клубные карты',
                                href: Server.getPrefix() + "/office/files/PlayerCard.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Инструкция для вывода ТОП матча',
                                href: Server.getPrefix() + "/office/files/TopMatch.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Инструкция по заполнению прописки',
                                href: Server.getPrefix() + "/office/files/AddressReg.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Тестирование кассира',
                                href: Server.getPrefix() + "/office/files/cashiers_test.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Инструкция к акции "Экспресс дня"',
                                href: Server.getPrefix() + "/office/files/express-of-day.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Правила HYPER DICE (кубики)',
                                href: Server.getPrefix() + "/office/files/hyperdice_rules.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Правила турнира "Колесо фортуны"',
                                href: Server.getPrefix() + "/office/files/fortune_rules.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Правила "Турнира комбинаций"',
                                href: Server.getPrefix() + "/office/files/combo_rules.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Программа лояльности "Спортивная лига"',
                                href: Server.getPrefix() + "/office/files/loyality_promo.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            }
                        ]
                    },
                    {
                        //text: 'Выход',
                        tooltip: Ux.locale.Manager.get("menumain.exit"),
                        itemId: 'exit',
                        glyph: Glyphs.get('signout'),
                        style: {
                            "border-width": "0px",
                            "border-right-width": "0px !important"
                        }
                    }
                ]
            }),
        // * верхний тулбар
            toolbarTop = Ext.create('Ext.toolbar.Toolbar', {
                dock: 'top',
                itemId: 'toolbarTop',
                //cls:'menumain3',  // * так почему-то не работает, через класс
                style: {
                    padding: "0px",
                    'box-shadow': "rgb(136, 136, 136) 0px 0px 6px",
                    //'background-color': '#e3e3e3 !important' // * grey
                    'background-color': '#038D98 !important' // * aqua
                },

                items: [
                    segmentedButtonTopLeft, // * показывается либо это меню
                    buttonTopLeft, // * либо это, в зависимости от ширины экрана
                    '->',
                    segmentedButtonTopRight
                ]
            }),
            segmentedButtonBottomRight = Ext.create('Ext.button.Segmented', {
                cls: 'menumain1',
                allowToggle: false,
                defaults: {
                    scale: 'large',
                    cls: 'menumain',
                    style: {
                        'border-width': 0
                    },
                    handler: 'onClickMenumain'
                },
                items: [
                    {
                        text: Ux.locale.Manager.get("menumain.chat"),
                        itemId: 'chat',
                        glyph: Glyphs.get('comments')
                    }
                ]
            }),
        // * нижний тулбар
            toolbarBottom = Ext.create('Ext.toolbar.Toolbar', {
                dock: 'bottom',
                cls: 'menumain2',
                style: {
                    padding: "0px",
                    'box-shadow': "rgb(136, 136, 136) 0px 0px 6px",
                    //'background-color': '#e3e3e3 !important' // * grey
                    'background-color': '#038D98 !important' // * aqua
                },
                items: [
                    {
                        xtype: 'displayfield',
                        itemId: 'balanceLabel',
                        fieldLabel: 'Сумма в кассе',
                        padding: '0 0 0 10',
                        width: 200,
                        cls: 'menumain1',
                        bind: '{theSession.currentSumInCash}',
                        renderer: Ext.util.Format.numberRenderer('0,0.00')
                    },
                    {
                        xtype: 'displayfield',
                        itemId: 'userLabel',
                        fieldLabel: 'Пользователь',
                        cls: 'menumain1',
                        bind: '{theUser}'
                    },
                    '->',
                    segmentedButtonBottomRight
                ]
            });

        this.dockedItems = [
            toolbarTop,
            toolbarBottom
        ];

        this.callParent();
    }

});