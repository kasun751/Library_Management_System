<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include '../models/IsVerify.php';
class IsVerifyController
{
    private $IsVerifyObj;

    public function __construct()
    {
        $this->IsVerifyObj = new IsVerify();
    }

    public function handleRequest()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case "GET":
                $userID = $_GET['id'];
                $result = $this->IsVerifyObj->checkVerification($userID, 0);
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
    }
}
$isVerifyController=new IsVerifyController();
$isVerifyController->handleRequest();
