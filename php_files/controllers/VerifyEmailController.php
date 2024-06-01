<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include '../models/VerifyEmail.php';
class VerifyEmailController
{
    private $verifyObj;

    public function __construct()
    {
        $this->verifyObj = new VerifyEmail();
    }

    public function handleRequest()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case "GET":
                $code = $_GET['code'];
                $verificationCode = $code;
                $this->verifyObj->verifyAccount($verificationCode);
                break;

            case "POST":
                break;


        }
    }
}
$verifyController=new VerifyEmailController();
$verifyController->handleRequest();

