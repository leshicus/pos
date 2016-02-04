// * константы
Ext.define('Office.util.Config', {
    singleton: true,
    alternateClassName: ['Config'],

    // * цвета столов Крыс
    arrRatTableColors:[
        {
            name:'Стол 1',
            color:'#4CAE73'
        },
        {
            name:'Стол 2',
            color:'#64BDFC'
        }
    ],
    STR_FORM_ERROR:'Форма заполнена неверно.',
    NUM_RESIDENT_COUNTRY_CODE:643, // * код страны резидента- Россия
    //LOGIN_FROM_COOKIE:true // * логиниться на основании данных из кук, если они есть
    TASK_ALIAS_TOP_MATCH: 'topMatch',
    TASK_ALIAS_EVENT_ID: 'eventId',
    LOCALSTORAGE_ROWS_MAX_CNT:10, // * максимальное количество строк в локальном хранилище для запоминания
    MAX_LIMIT_BET_RATS:100,// * максимальная ставка для крыс в первых 2-х забегах
});
