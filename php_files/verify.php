<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include 'SqlQuery.php';

$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $code =$_GET['code'];
        $verificationCode=$code;
        $getData = new SqlQuery();
        $getData->verifyAccount($verificationCode);
        break;

    case "POST":



}


