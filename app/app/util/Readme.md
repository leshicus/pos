# Синглеты
Автоматически подключаются к проекту, не требуют require
- `Debug.js` - Функции и переменные, используемые во время разработки.
Устанавливают начальные значения некоторых полей, чтобы не заполнять их
каждый раз вручную. Режим разработки устанавливается переменной debug.
- `Filters.js` - Функции для работы с фильтрами.
- `Glyphs.js` - Функции для работы с глифами (icon fonts).
- `Server.js` - Функции для подключения к серверу. Возвращают разные значения, в
зависимости от адреса сайта/локального сервера.
- `Setup.js` - Класс для обслуживания процедуры авторизации.
- `Utilities.js` - Класс - сборная солянка из полезных ф-ий и глобальных переменных.