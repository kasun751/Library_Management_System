<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
require_once '../models/ReturnBook.php';

class ReturnBookController
{
    private $returnBookObj;

    public function __construct()
    {
        $this->returnBookObj = new ReturnBook();
    }

    public function handleRequest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {

            case "GET":
                $bookID = $_GET['bookID'];
                if (!empty($bookID)) {
                    $returnBookDetails = $this->returnBookObj->getReturnBookData($bookID);
                    echo json_encode($returnBookDetails);
                }else{
                    $data = array('resultMessage' => 'false');
                    echo json_encode($data);
                }
                break;

            case "POST":
                extract($data);
                if (!empty($returnBookID) && !empty($category)  && !empty($setAvailability)  && !empty($userID)){
                    $result=$this->returnBookObj->returnBook($userID,$returnBookID,$category,$setAvailability);
                    if ($result){
                        $data = array('resultMessage' => 'true');
                        echo json_encode($data);
                    }else{
                        $data = array('resultMessage' => 'false');
                        echo json_encode($data);
                    }
                }
                break;
        }
    }
}

$returnBookController = new ReturnBookController();
$returnBookController->handleRequest();
?>