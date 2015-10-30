<?php
    if (getenv('BETMILL_CONF_PATH') && !defined("BETMILL_CONF_PATH")) {
        define('BETMILL_CONF_PATH', true);
        include getenv('BETMILL_CONF_PATH') . DIRECTORY_SEPARATOR . "config.php";
        return;
    }
	define('DB_NAME', 'betzet');
	define('DB_HOST', 'localhost');
	define('DB_USER', 'root');
	define('DB_PASS', 'root');
	define('BETTING_DB_HOST', 'localhost');
	define('BETTING_DB_NAME', 'betting');
	define('BETTING_DB_USER', 'betting');
	define('BETTING_DB_PASS', 'bettingbetting123');
    define('SITE_ROOT_URL', 'http://installname.dev.badbin.ru/');
	define('DEV_MODE', false);
	define('COX_REST_API_URL', 'http://bapi.paycox.com/');
    define('MEMCACHE_SUFFIX', '_'.md5(SITE_ROOT_URL.DB_NAME));
	define('REDIS_ADDRESS', 'localhost:6379');
	define('REDIS_PASSWORD', '');
	define('ENABLE_VOCXOD', 1);

// массив $RATS_TOURNAMENTS должен быть пустой если ставки на крыс надо ставить только в одном турнире
$RATS_TOURNAMENTS = array(/* формат table_id => tournament_id */'2'=>'1658','3'=>'1659');
?>
