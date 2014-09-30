<?php
$userName = $_REQUEST['username'];
$password = $_REQUEST['password'];
$cookieBetzet_login = $_COOKIE['betzet_login'];
$cookieBetzet_token = $_COOKIE['betzet_token'];

$login = $userName;
$userToken = $userName;
$cookieUserName = $cookieBetzet_login;
$cookieUserToken = $cookieBetzet_login;
$expire = time() + 60 * 60 * 24 * 7;
$rightLogin = '1';


if (!$cookieBetzet_login || !$cookieBetzet_token) {
    if ($login) { // * чего-то ввели
        if ($login == $rightLogin) { // * верный логин
            unset($_COOKIE['betzet_login']);
            unset($_COOKIE['betzet_token']);
            setcookie("betzet_login", $login, $expire, '/', null);
            setcookie("betzet_token", $userToken, $expire, '/', null);
        } else if ($login == 'admin') {
            $output = array(
                'success' => false,
                'errors' => array(
                    'reason' => 'Доступ к АРМ Касса для пользователя (' . $userName . ') запрещен, так как у него нет прав доступа к кассе.'
                ),
                'login' => $login
            );
        } else { // * ввели непонятный логин
            $output = array(
                'success' => false,
                'errors' => array(
                    'reason' => 'Неправильное имя пользователяe (' . $userName . ') или пароль. Возможно, неверный IP. Попробуйте снова.'
                ),
                'login' => ""
            );
        }

    } else {// * ничего не вводили- аутент
        $output = array(
            'success' => false,
            'login' => null
        );
    }
} else {
    if ($cookieBetzet_login == $rightLogin) {
        $output = array(
            'success' => true,
            'login' => $cookieBetzet_login,
            'userId' => '111',
            'userName' => $cookieUserName,
            'userToken' => $cookieUserToken
        );
    } else if ($cookieBetzet_login == 'admin') {
        $output = array(
            'success' => false,
            'errors' => array(
                'reason' => 'Доступ к АРМ Касса для пользователя (' . $cookieUserName . ') запрещен, так как у него нет прав доступа к кассе.'
            ),
            'login' => $cookieBetzet_login
        );
    } else { // * ввели непонятный логин
        $output = array(
            'success' => false,
            'errors' => array(
                'reason' => 'Неправильное имя пользователяe (' . $cookieUserName . ') или пароль. Возможно, неверный IP. Попробуйте снова.'
            ),
            'login' => ""
        );
    }

}

if ($output)
    echo json_encode($output);