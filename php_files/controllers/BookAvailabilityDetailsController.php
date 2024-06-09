<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
include '../models/GetIsbnData.php';
include '../models/BookAvailabilityDetails.php';

class BookAvailabilityDetailsController
{
    private $getISBNData;
    private $bookAvailabilityDetails;
    public function __construct()
    {
        $this->getISBNData = new GetIsbnData();
        $this->bookAvailabilityDetails = new BookAvailabilityDetails();
    }

    public function handleRequest()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case "GET":
                $isbnNumber = $_GET['id'];
                if (strlen($isbnNumber) > 0) {
                    $result1 = $this->getISBNData->getISBNData($isbnNumber);
                    if ($result1->num_rows > 0) {
                        $bookData = $result1->fetch_assoc();
                        $category = $bookData['Category'];
                        $result2 = $this->bookAvailabilityDetails->getAvailableBooksList($category, $isbnNumber);
                        $books = array();
                        while ($row = $result2->fetch_assoc()) {
                            $row['category'] = $category;
                            $books[] = $row;
                        }
                        echo json_encode($books);
                    } else if ($result1->num_rows == 0) {
                        $data = array('successMessage' => 'not have book');
                        echo json_encode($data);
                    }
                } else {
                    $data = array('successMessage' => 'not have book');
                    echo json_encode($data);
                }
                break;

            case "POST":
        }
    }
}
$bookAvailabilityDetailsController=new BookAvailabilityDetailsController();
$bookAvailabilityDetailsController->handleRequest();
?>

