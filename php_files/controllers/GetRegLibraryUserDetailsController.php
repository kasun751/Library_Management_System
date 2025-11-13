<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
require_once '../models/GetRegLibraryUserDetails.php';
class GetRegLibraryUserDetailsController
{
    private $getRegLibraryUserDetails;

    public function __construct()
    {
        $this->getRegLibraryUserDetails = new GetRegLibraryUserDetails();
    }

    public function handleRequest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case "GET":
                break;

            case "POST":
                $userID = $data['userID'];
                $this->getRegLibraryUserDetails->getUserIDDetails($userID);
                break;
        }
    }
}
$getRegLibraryUserDetailsController=new GetRegLibraryUserDetailsController();
$getRegLibraryUserDetailsController->handleRequest();
?>
