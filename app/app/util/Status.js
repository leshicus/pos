/**
 * функции взятые из office/js/gui.js.php
 *
 */

Ext.define('Office.view.pay.Status', {
    singleton: true,
    alternateClassName: ['Status'],

    STS_RUN: 2, //в игре
    STS_WAITING: 6, // ожидает подтверждения
    STS_CANCELED: 7, // отклонена
    STS_NOTIFIED: 1, // пользователь оповещен, поле is_notified
    STS_NOT_NOTIFIED: 0, // пользователь не оповещен, поле is_notified
    STS_DELETED: 8, // удалена для кассы (видна в админке)
    STS_EXPIRED: 9, // выигрышна, но просрочен период выплаты
    STS_BUYBACK: 10, // выкуплена

    STS_LOST: '-1',
    STS_RETURN: '0',
    STS_WIN: '1',
    STS_UNDEFINED: '3',
    STS_HALFLOST: '4',
    STS_HALFWIN: '5',
    STS_FINAL_RETURN: '11',

    STS_RETURN_RU: 'возврат',
    STS_RUN_RU: 'в игре',
    STS_WAITING_RU: 'ожидает подтверждения',
    STS_CANCELED_RU: 'отклонена',
    STS_NOTIFIED_RU: 'оповещен',
    STS_NOT_NOTIFIED_RU: 'не оповещен',
    STS_DELETED_RU: 'удалена в кассе',
    STS_EXPIRED_RU: 'просрочен срок выплаты',
    STS_BUYBACK_RU: 'выкуплена',
    STS_FINAL_RETURN_RU: 'фикс.возврат',
});