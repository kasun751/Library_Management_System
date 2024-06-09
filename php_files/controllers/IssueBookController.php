<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
require_once '../models/IssueBook.php';
class IssueBookController
{
    private $issueBookControllerObj;
    public function __construct()
    {
        $this->issueBookControllerObj = new IssueBook();
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
                if (!empty($bookID) && !empty($category) && !empty($setAvailability) && !empty($userID)) {
                    $result1 =$this->issueBookControllerObj->setBookAvailability($category, $bookID, $setAvailability);
                    $result2 =$this->issueBookControllerObj->updateIsueBooksTable($bookID, $userID, $dateTime, $setAvailability);
                    if ($result1 > 0 && $result2 > 0) {
                        $data = array('resultMessage' => 'true');
                        echo json_encode($data);
                    } else if ($result1 == 0 || $result2 == 0) {
                        $data = array('resultMessage' => 'false');
                        echo json_encode($data);
                    }
                } else {
                    $data = array('resultMessage' => 'false');
                    echo json_encode($data);
                }
                break;
        }
    }
}

$issueBookController= new IssueBookController();
$issueBookController->handleRequest();
?>