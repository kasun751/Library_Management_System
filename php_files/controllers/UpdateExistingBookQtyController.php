<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
require_once '../models/UpdateExistingBookQty.php';

class UpdateExistingBookQtyController
{
    private $updateExistingBookQty;
    public function __construct()
    {
        $this->updateExistingBookQty = new UpdateExistingBookQty();
    }
    public function handleRequest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {
            case "GET":
                $isbnNumber =$_GET['isbnNumber'] ;
                if(!empty($isbnNumber)){
                    $result=$this->updateExistingBookQty->stillNotAddedBooksRelevantToIsbn($isbnNumber);
                    echo json_encode($result);
                }
                break;

            case "POST":
                $isbnNumber='';
                $bookID='';
                extract($data);

                switch ($parameter){
                    case 0:
                        if (!empty($isbnNumber) && $addNewQty > 0) {
                            $result =  $this->updateExistingBookQty->addMoreQty($addNewQty, $isbnNumber, $setAvailability);
                            if ($result > 0) {
                                $this->respondWithSuccess();
                            } else if ($result == 0) {
                                $this->respondWithError();
                            }
                        } else {
                            $this->respondWithError();
                        }
                        break;
                    case 1:
                        $result =  $this->updateExistingBookQty->availableNow($isbnNumber,$AvailableAllOrOncePara,$bookID);
                        if ($result > 0) {
                            $this->respondWithSuccess();
                        } else if ($result == 0) {
                            $this->respondWithError();
                        }
                }

                break;
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
$updateExistingBookQtyController= new UpdateExistingBookQtyController();
$updateExistingBookQtyController->handleRequest();
