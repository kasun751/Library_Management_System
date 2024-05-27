<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include 'SqlQuery.php';
// Check if the request method is OPTIONS and respond with 200 OK

$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":

        break;

    case "POST":
        $getData = new SqlQuery();
        $userIDOrEmail=$data['loginUserEmailOrUser_ID'];
        $password=$data['loginUserPassword'];


        if(strlen($userIDOrEmail)>0 && strlen($password)>0) {
            $getData->loginDetailsValidate($userIDOrEmail,$password);
        }else{
            $data = array('resultMessage' => 'Fill all inputs');
            echo json_encode($data);
        }

}