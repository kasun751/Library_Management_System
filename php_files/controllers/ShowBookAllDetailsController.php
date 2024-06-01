<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
include '../models/GetIsbnData.php';

class ShowBookAllDetailsController
{
    private $getISBNData;
    public function __construct()
    {
        $this->getISBNData = new GetIsbnData();
    }

    public function handleRequest()
    {
        $method = $_SERVER['REQUEST_METHOD'];
        switch ($method) {
            case "GET":
                $isbnNumber = $_GET['id'];
                if (strlen($isbnNumber) > 0) {
                    $result = $this->getISBNData->getISBNData($isbnNumber);
                    if ($result->num_rows > 0) {
                        echo json_encode($result->fetch_assoc());
                    } else if ($result->num_rows == 0) {
                        $data = array('successMessage' => 'not have book');
                        echo json_encode($data);
                    }
                } else {
                    $data = array('successMessage' => 'not have book');
                    echo json_encode($data);
                }
                break;

            case "POST":
                break;
        }
    }
}
$showBookAllDetailsController=new ShowBookAllDetailsController();
$showBookAllDetailsController->handleRequest();
?>
