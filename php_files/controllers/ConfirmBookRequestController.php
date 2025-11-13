<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include '../models/ConfirmRequest.php';
class ConfirmBookRequestController
{
    private $confirmRequestObj;

    public function __construct()
    {
        $this->confirmRequestObj = new ConfirmRequest();
    }

    public function handleRequest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {

            case "GET":
                break;
            case "POST":
                extract($data);
                if (!empty($bookID) && !empty($userID) && !empty($confirmationCode) && !empty($category)) {

                   $result= $this->confirmRequestObj->issueRequestedBook($userID,$confirmationCode,$category,$bookID);
                   if($result>0){
                       $this->respondWithSuccess();
                   }else{
                       $this->respondWithError();
                   }

                }
                break;
        }
    }


    private function respondWithSuccess()
    {
        $data = array('resultMessage' => 'Successfully Book Issued.');
        echo json_encode($data);
    }

    private function respondWithError()
    {
        $data = array('resultMessage' => 'Failed!');
        echo json_encode($data);
    }
}

$confirmRequestController = new ConfirmBookRequestController();
$confirmRequestController->handleRequest();
?>