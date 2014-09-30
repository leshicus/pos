<?php

require_once("db_connect.php");
$success = true;

function _select($sql,$mode = 0)
{
    if($mode)
        print_r($sql);
    global $mysqli;
    $output = array();
    try {
        $res = $mysqli->query($sql);
        if(!$res) throw new Exception;
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            foreach ($row as $k => $v)
                $arr[$k] = $v;
            array_push($output, $arr);
        }
    } catch (Exception $e) {
        $success = false;
        echo json_encode(
            array('success' => $success,
                'message' => 'error in _select: ' . $sql));
    }
    return $output;
}

function _do($sql,$mode = 0)
{
    if($mode)
        print_r($sql);
    global $mysqli,$success;
    $success = true;
    try {
        $res = $mysqli->query($sql);
        if(!$res) throw new Exception;
    } catch (Exception $e) {
        $success = false;
        echo json_encode(
            array('success' => $success,
                'message' => 'error in _do: ' . $sql));
    }
    return $success;
}
?>