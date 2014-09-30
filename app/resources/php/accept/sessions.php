<?php
$xaction = $_REQUEST['xaction'];

if($xaction){
    $store = file_get_contents("../../data/accept/sessions.json");
    echo $store;
}