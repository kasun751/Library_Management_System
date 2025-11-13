<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include '../models/UpdateBookDetails.php';
class UpdateBookDetailsController{
    private $updateBookDetailsObj;
    public function __construct()
    {
        $this->updateBookDetailsObj = new UpdateBookDetails();
    }
    public function handleRequest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case "GET":
                break;

            case "POST":
                $isbnNumber = $data['isbnNumber'];
                $bookName = $data['bookName'];
                $authorName = $data['authorName'];
                $publisherName = $data['publisherName'];
                $bookLocation = $data['bookLocation'];
                $description = $data['description'];
                if (!empty($bookName) && !empty($authorName) && !empty($publisherName) && !empty($isbnNumber)
                    && !empty($bookLocation) &&  !empty($description)) {
                    $result1 = $this->updateBookDetailsObj->updateBookDetails($isbnNumber, $bookName, $authorName, $publisherName, $bookLocation, $description);
                    if ($result1 > 0) {
                        $data = array('resultMessage' => 'true');
                        echo json_encode($data);
                    } else if ($result1 == 0) {
                        $data = array('resultMessage' => 'false');
                        echo json_encode($data);
                    }
                }
        }
    }
}
$updateBookDetailsController=new UpdateBookDetailsController();
$updateBookDetailsController->handleRequest();
