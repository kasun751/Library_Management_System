<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
require_once '../models/ViewBookListInBackupBookTable.php';

class ViewBookListInBackupBookTableController
{

    private $viewBookListAndDetailsObj;

    public function __construct()
    {
        $this->viewBookListAndDetailsObj = new ViewBookListInBackupBookTable();
    }

    public function handleRequest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {
            case "GET":
                $result = $this->viewBookListAndDetailsObj->getBookList();
                $books = array();
                while ($row = mysqli_fetch_assoc($result)) {
                    $books[] = $row;
                }
                echo json_encode($books);
                break;

            case "POST":
                $isbnNumber = $data['isbnNumber'];
                $result = $this->viewBookListAndDetailsObj->getBookDetails($isbnNumber);
                $books = array();
                while ($row = mysqli_fetch_assoc($result)) {
                    $books[] = $row;
                }
                echo json_encode($books);
                break;
        }
    }
}
$viewBookListAndDetailsController= new ViewBookListInBackupBookTableController();
$viewBookListAndDetailsController->handleRequest();
?>
