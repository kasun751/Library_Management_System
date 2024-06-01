<?php

namespace PHPMailer\controllers;
use BookIDData;
use GetIsbnData;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include '../models/BookIDData.php';
include '../models/GetIsbnData.php';
class BookIDDataController
{
    private $bookIDDataObj;
    private $isbnData;
    public function __construct()
    {
        $this->bookIDDataObj = new BookIDData();
        $this->isbnData = new GetIsbnData();
    }
    public function handleRequest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case "GET":
                break;

            case "POST":
                $bookID = $data['bookID'];
                if (strlen($bookID) > 0) {
                    $resultCategory = $this->bookIDDataObj->getBookIdCategory($bookID);  //return category related to the book id
                    if ($resultCategory != null) {
                        $bookDetails = $this->bookIDDataObj->getBookIdData($resultCategory, $bookID);
                        $isbnNumber = $bookDetails['ISBN_Number'];
                        $result = $this->isbnData->getISBNData($isbnNumber);
                        if ($result->num_rows > 0) {
                            $raw=$result->fetch_assoc();
                            $bookName = $raw['BookName'];
                            $category = $raw['Category'];
                            $availability=$bookDetails['Availability'];
                            $isbnNumber=$raw['ISBN_Number'];
                            $data = array('BookName' => $bookName,
                                'Category'=>$category,
                                'Availability'=> $availability,
                                'ISBN_Number'=>$isbnNumber
                            );
                            echo json_encode($data);
                        } else if ($result->num_rows == 0) {
                            $data = array('successMessage' => 'not have book1');
                            echo json_encode($data);
                        }
                    } else {
                        $data = array('successMessage' => 'not have book');
                        echo json_encode($data);
                    }
                } else {
                    $data = array('successMessage' => 'not have book');
                    echo json_encode($data);
                }
                break;
        }
    }
}
$bookIDDataController= new BookIDDataController();
$bookIDDataController->handleRequest();
?>
