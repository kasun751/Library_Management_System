<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include '../models/LibraryUserLogin.php';
class LibraryUserLoginController
{
    private $libraryUserLogin;
    public function __construct()
    {
        $this->libraryUserLogin = new LibraryUserLogin();
    }

    public function handleRequest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case "GET":
                break;

            case "POST":
                $userIDOrEmail = $data['loginUserEmailOrUser_ID'];
                $password = $data['loginUserPassword'];

                if (!empty($userIDOrEmail) && !empty($password)) {
                    $this->libraryUserLogin ->loginDetailsValidate($userIDOrEmail, $password);
                } else {
                    $data = array('resultMessage' => 'Fill all inputs');
                    echo json_encode($data);
                }
                break;
        }
    }
}
$libraryUserLoginController=new LibraryUserLoginController();
$libraryUserLoginController->handleRequest();