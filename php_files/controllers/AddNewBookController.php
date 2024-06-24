<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include '../models/AddNewBook.php';
include '../models/Category.php';

class AddNewBookController{
    private $addNewBookObj;
    public function __construct()
    {
        $this->addNewBookObj = new AddNewBook();
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
                $lastBookName_ID = $this->addNewBookObj->getLastBookName_ID($category);
                if ($lastBookName_ID === null || !isset($lastBookName_ID['BookName_ID'])) {
                    $bookName_ID = 1;
                } else {
                    $bookDetails2 = $this->addNewBookObj->getLastBookName_ID($category);
                    $bookName_ID = $bookDetails2['BookName_ID'] + 1;
                }
                $book_No = 1;
                if (!empty($bookName) && !empty($authorName) && !empty($publisherName) && !empty($isbnNumber)
                    && !empty($category) && !empty($qty) && !empty($bookLocation) && !empty($setAvailability) && !empty($description)) {
                    list($result1, $result2) = $this->addNewBookObj->InsertBookSTableDetails($bookName, $authorName, $publisherName, $isbnNumber, $category, $qty, $bookLocation, $setAvailability, $description, $bookName_ID, $book_No);
                    $this->handleResult($result1, $result2);
                } else {
                    $this->respondWithError();
                }
        }
    }

    private function handleResult($result1, $result2)
    {
        if ($result1 > 0 && $result2 > 0) {
            $this->respondWithSuccess();
        } else {
            $this->respondWithError();
        }
    }
    private function respondWithSuccess()
    {
        $data = array('resultMessage' => 'true');
        echo json_encode($data);
    }

    private function respondWithError()
    {
        $data = array('resultMessage' => 'false');
        echo json_encode($data);
    }
}

$addNewBookController= new AddNewBookController();
$addNewBookController->handleRequest();
?>