<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include 'SqlQuery.php';

$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        break;

    case "POST":
        $Data = new SqlQuery();
        $userID = $data['userID'];
        $Data->getUserIDDetails($userID);


}

?>
