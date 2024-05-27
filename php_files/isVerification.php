<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");

include 'SqlQuery.php';

$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case "GET":
        $userID = $_GET['id'];
        $getData = new SqlQuery();
        $result = $getData->checkVerification($userID,0);
        if ($result) {
            $data = array('resultMessage' => 'EmailVerified');
            echo json_encode($data);
        } else {
            $data = array('resultMessage' => 'EmailNotVerified');
            echo json_encode($data);
        }
        break;

    case "POST":
        break;
}



