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
        // * сразу открывать определенный пункт меню после авторизации
        afterrender: 'onAfterRender'
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
                        glyph: Glyphs.get('football'),
                        bind: {
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        //text: 'Ставки Таймлайн',
                        text: Ux.locale.Manager.get("menumain.timeline"),
                        itemId: 'timeline',
                        glyph: Glyphs.get('list_1'),
                        bind: {
                            hidden: '{!getShowButtonTimeline}',
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        //text: 'Игровые счета',
                        text: Ux.locale.Manager.get("menumain.gameacc2"),
                        itemId: 'gameacc',
                        glyph: Glyphs.get('list_1'),
                        bind: {
                            hidden: '{!getShowButtonGameacc}',
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        //text: 'Принятые',
                        text: Ux.locale.Manager.get("menumain.accept"),
                        itemId: 'accept',
                        glyph: Glyphs.get('table'),
                        bind: {
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        //text: 'Выплаты',
                        text: Ux.locale.Manager.get("menumain.pay"),
                        itemId: 'pay',
                        glyph: Glyphs.get('dollar'),
                        bind: {
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        //text: 'Виртуальные заявки',
                        text: Ux.locale.Manager.get("menumain.virtual2"),
                        itemId: 'virtual',
                        glyph: Glyphs.get('list'),
                        bind: {
                            hidden: '{!getShowButtonVirtual}',
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        //text: 'Клубные карты',
                        text: Ux.locale.Manager.get("menumain.card2"),
                        itemId: 'card',
                        glyph: Glyphs.get('card'),
                        bind: {
                            hidden: '{!getShowButtonCard}',
                            disabled: '{isGlobalSession}'
                        }
                    },

                    {
                        //text: 'Печать линии',
                        text: Ux.locale.Manager.get("menumain.printline2"),
                        itemId: 'printline',
                        glyph: Glyphs.get('print'),
                        bind: {
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        //text: 'Панели',
                        text: Ux.locale.Manager.get("menumain.panels"),
                        itemId: 'panels',
                        glyph: Glyphs.get('desktop'),
                        bind: {
                            hidden: '{!getShowButtonPanel}',
                            disabled: '{isGlobalSession}'
                        }
                    },

                    {
                        //text: 'График для игры на поле',
                        text: Ux.locale.Manager.get("menumain.scheduleforgamefield2"),
                        itemId: 'scheduleforgamefield',
                        glyph: Glyphs.get('list'),
                        bind: {
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        //text: 'Игроки',
                        text: Ux.locale.Manager.get("menumain.players"),
                        itemId: 'players',
                        glyph: Glyphs.get('user'),
                        bind: {
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        //text: 'Анонс матчей для УГМ',
                        text: Ux.locale.Manager.get("menumain.coords2"),
                        itemId: 'coords',
                        glyph: Glyphs.get('list'),
                        bind: {
                            disabled: '{isGlobalSession}'
                        }
                    }
                ]
            }),
        // * верхнее левое меню свернутое в список
            buttonTopLeft = Ext.create('Ext.button.Button', {
                plugins: 'responsive',
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
                defaults: {},
                disabled: false,
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
                    //{
                    //    text: Ux.locale.Manager.get("menumain.fill"),
                    //    itemId: 'fill',
                    //    glyph: Glyphs.get('football'),
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
                    //    text: Ux.locale.Manager.get("menumain.timeline"),
                    //    itemId: 'timeline',
                    //    glyph: Glyphs.get('list_1'),
                    //    cls: 'menutopleft',
                    //    listeners: {
                    //        click: 'onClickMenumain'
                    //    },
                    //    bind: {
                    //        hidden: '{!getShowButtonTimeline}',
                    //        disabled: '{isGlobalSession}'
                    //    },
                    //    disabled: true
                    //},
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
                    //{
                    //    text: Ux.locale.Manager.get("menumain.accept"),
                    //    itemId: 'accept',
                    //    glyph: Glyphs.get('list'),
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
                    //    text: Ux.locale.Manager.get("menumain.card"),
                    //    itemId: 'card',
                    //    glyph: Glyphs.get('card'),
                    //    cls: 'menutopleft',
                    //    listeners: {
                    //        click: 'onClickMenumain'
                    //    },
                    //    bind: {
                    //        hidden: '{!getShowButtonCard}',
                    //        disabled: '{isGlobalSession}'
                    //    },
                    //    disabled: true
                    //},
                    //{
                    //    text: Ux.locale.Manager.get("menumain.pay"),
                    //    itemId: 'pay',
                    //    glyph: Glyphs.get('dollar'),
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
                    },
                    {
                        text: Ux.locale.Manager.get("menumain.printline"),
                        itemId: 'printline',
                        glyph: Glyphs.get('print'),
                        cls: 'menutopleft',
                        listeners: {
                            click: 'onClickMenumain'
                        },
                        bind: {
                            disabled: '{isGlobalSession}'
                        }
                    },
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
                        text: Ux.locale.Manager.get("menumain.scheduleforgamefield"),
                        itemId: 'scheduleforgamefield',
                        glyph: Glyphs.get('list'),
                        cls: 'menutopleft',
                        listeners: {
                            click: 'onClickMenumain'
                        },
                        bind: {
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        text: Ux.locale.Manager.get("menumain.players"),
                        itemId: 'players',
                        glyph: Glyphs.get('user'),
                        cls: 'menutopleft',
                        listeners: {
                            click: 'onClickMenumain'
                        },
                        bind: {
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        text: Ux.locale.Manager.get("menumain.coords"),
                        itemId: 'coords',
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
                ]
            }),
            segmentedButtonTopLeftMin = Ext.create('Ext.button.Segmented', {
                cls: 'menumain1',
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
                defaults: {
                    scale: 'large',
                    cls: 'menumain',
                    style: {
                        "border-width": "0px"
                        /*"border-right-width": "1px"*//*grey*/
                    },
                    handler: 'onClickMenumain',
                    disabled: true
                },
                items: [
                    buttonTopLeft,
                    {
                        //text: 'Ставки',
                        text: Ux.locale.Manager.get("menumain.fill"),
                        itemId: 'fill',
                        glyph: Glyphs.get('football'),
                        bind: {
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        //text: 'Ставки Таймлайн',
                        text: Ux.locale.Manager.get("menumain.timeline"),
                        itemId: 'timeline',
                        glyph: Glyphs.get('list_1'),
                        bind: {
                            hidden: '{!getShowButtonTimeline}',
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        //text: 'Принятые',
                        text: Ux.locale.Manager.get("menumain.accept"),
                        itemId: 'accept',
                        glyph: Glyphs.get('table'),
                        bind: {
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        //text: 'Выплаты',
                        text: Ux.locale.Manager.get("menumain.pay"),
                        itemId: 'pay',
                        glyph: Glyphs.get('dollar'),
                        bind: {
                            disabled: '{isGlobalSession}'
                        }
                    },
                    {
                        //text: 'Клубные карты',
                        text: Ux.locale.Manager.get("menumain.card2"),
                        itemId: 'card',
                        glyph: Glyphs.get('card'),
                        bind: {
                            hidden: '{!getShowButtonCard}',
                            disabled: '{isGlobalSession}'
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
                    segmentedButtonTopLeftMin
                    // buttonTopLeft, // * либо это, в зависимости от ширины экрана
                    //{
                    //    //text: 'Ставки',
                    //    text: Ux.locale.Manager.get("menumain.fill"),
                    //    itemId: 'fill',
                    //    glyph: Glyphs.get('football'),
                    //    bind: {
                    //        disabled: '{isGlobalSession}'
                    //    }
                    //},
                    //{
                    //    //text: 'Ставки Таймлайн',
                    //    text: Ux.locale.Manager.get("menumain.timeline"),
                    //    itemId: 'timeline',
                    //    glyph: Glyphs.get('list_1'),
                    //    bind: {
                    //        hidden: '{!getShowButtonTimeline}',
                    //        disabled: '{isGlobalSession}'
                    //    }
                    //},
                    //{
                    //    //text: 'Принятые',
                    //    text: Ux.locale.Manager.get("menumain.accept"),
                    //    itemId: 'accept',
                    //    glyph: Glyphs.get('list'),
                    //    bind: {
                    //        disabled: '{isGlobalSession}'
                    //    }
                    //},
                    //{
                    //    //text: 'Клубные карты',
                    //    text: Ux.locale.Manager.get("menumain.card2"),
                    //    itemId: 'card',
                    //    glyph: Glyphs.get('card'),
                    //    bind: {
                    //        hidden: '{!getShowButtonCard}',
                    //        disabled: '{isGlobalSession}'
                    //    }
                    //},
                    //{
                    //    //text: 'Выплаты',
                    //    text: Ux.locale.Manager.get("menumain.pay"),
                    //    itemId: 'pay',
                    //    glyph: Glyphs.get('dollar'),
                    //    bind: {
                    //        disabled: '{isGlobalSession}'
                    //    }
                    //}
                    //'->',
                    //segmentedButtonTopRight
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
                    },
                    {
                        text: 'Инфо',
                        //tooltip: Ux.locale.Manager.get("menumain.info"),
                        itemId: 'info',
                        glyph: Glyphs.get('info'),
                        bind: {
                            hidden: '{showButtonInfo}'
                        },
                        //defaults:{},// * не работает
                        menu: [
                            {
                                text: 'Памятка по НДФЛ',
                                href: Server.getPrefix() + "office/files/info_about_identify.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Адреса пунктов приёма ставок',
                                href: Server.getPrefix() + "office/files/betting_points.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Памятка для кассиров',
                                href: Server.getPrefix() + "office/files/pamyatka.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Руководство',
                                href: Server.getPrefix() + "office/files/help.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: '«MortalBet» и выкуп ставок',
                                href: Server.getPrefix() + "office/files/mortalbet.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Правила конторы',
                                href: Server.getPrefix() + "office/files/rules.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Объяснение ставок',
                                href: Server.getPrefix() + "office/files/stavki.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Контакты технической поддержки',
                                href: Server.getPrefix() + "office/files/telephony.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Правила для «Игры на поле»',
                                href: Server.getPrefix() + "office/files/RulesForGameOnField.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Инструкция для кассира',
                                href: Server.getPrefix() + "office/files/instruction.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Правила игры Bet Rat v2',
                                href: Server.getPrefix() + "office/files/BetRatv2.0.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Коды для быстрого поиска',
                                href: Server.getPrefix() + "office/files/QuickSearchCodes.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Инструкция ТАЙМЛАЙН',
                                href: Server.getPrefix() + "office/files/info-timeline.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Инструкция к "ВИРТУАЛЬНАЯ ЗАЯВКА"',
                                href: Server.getPrefix() + "office/files/cashbox_ru.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Клубные карты',
                                href: Server.getPrefix() + "office/files/PlayerCard.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Инструкция для вывода ТОП матча',
                                href: Server.getPrefix() + "office/files/TopMatch.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Инструкция по заполнению прописки',
                                href: Server.getPrefix() + "office/files/AddressReg.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Тестирование кассира',
                                href: Server.getPrefix() + "office/files/cashiers_test.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Инструкция к акции "Экспресс дня"',
                                href: Server.getPrefix() + "office/files/express-of-day.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Правила HYPER DICE (кубики)',
                                href: Server.getPrefix() + "office/files/hyperdice_rules.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Правила турнира "Колесо фортуны"',
                                href: Server.getPrefix() + "office/files/fortune_rules.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Правила "Турнира комбинаций"',
                                href: Server.getPrefix() + "office/files/combo_rules.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            },
                            {
                                text: 'Программа лояльности "Спортивная лига"',
                                href: Server.getPrefix() + "office/files/loyality_promo.pdf",
                                hrefTarget: '_blank',
                                glyph: Glyphs.get('pdf'),
                                cls: 'pdf'
                            }
                        ]
                    },
                    {
                        text: 'Выход',
                        //tooltip: Ux.locale.Manager.get("menumain.exit"),
                        itemId: 'exit',
                        glyph: Glyphs.get('signout'),
                        style: {
                            "border-width": "0px",
                            "border-right-width": "0px !important"
                        }
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
                        itemId: 'userLabel',
                        fieldLabel: 'Пользователь',
                        labelWidth: 95,
                        padding: '0 0 0 10',
                        cls: 'menumain1',
                        bind: '{theUser}'
                    },
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