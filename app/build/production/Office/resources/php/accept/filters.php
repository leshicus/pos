<?php
$mode = $_REQUEST['mode'];
$xaction = $_REQUEST['xaction'];

if($mode && $xaction){
    switch($xaction){
        case 'slip_state':
            $store = file_get_contents("../../data/accept/getResult.json");
            echo $store;
            break;
        case 'sport':
            $store = file_get_contents("../../data/accept/getSport.json");
            echo $store;
            break;
    }
}