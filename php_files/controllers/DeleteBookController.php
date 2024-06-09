<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Content-Type: application/json");
require_once '../models/DeleteBook.php';

class DeleteBookController
{
    private $deleteBookObj;

    public function __construct()
    {
        $this->deleteBookObj = new DeleteBook();
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
                switch ($delete_parameter) {
                    case 0:
                        if (!empty($category)  && !empty($isbnNumber)) {
                            list($result1, $result2,$result3) = $this->deleteBookObj->deleteAllBook($isbnNumber, $category);
                            $this->handleResult($result1, $result2,$result3);
                        } else {
                            $this->respondWithError();
                        }
                        break;

                    case 1:
                        if (strlen($bookID) > 0 && strlen($category) > 0) {
                            list($result1, $result2) = $this->deleteBookObj->deleteSomeBook($category, $bookID);
                            if (($result1 && $result2)=== true) {
                                $this->respondWithSuccess();
                            } else {
                                $this->respondWithError();
                            }
                        } else {
                            $this->respondWithError();
                        }
                        break;
                    case 2:
                        switch ($restorePara){
                            case "RestoreAll":
                                if (!empty($category)  && !empty($isbnNumber)) {
                                    list($result1, $result2,$result3) = $this->deleteBookObj->restoreAllBook($isbnNumber, $category);
                                    $this->handleResult($result1, $result2,$result3);
                                } else {
                                    $this->respondWithError();
                                }
                                break;
                            case "RestoreOnce":
                                if (!empty($category)  && !empty($BookIDForrestoreOnce)) {
                                    list($result1, $result2) = $this->deleteBookObj->restoreSomeBook($category, $BookIDForrestoreOnce);
                                    if (($result1 && $result2) === true) {
                                        $this->respondWithSuccess();
                                    } else {
                                        $this->respondWithError();
                                    }
                                    break;
                                }
                        }

                        break;
                    case 3:
                }
        }
    }
    private function handleResult($result1, $result2,$result3)
    {
        if ($result1 > 0 && $result2 > 0 && $result3>0) {
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
$deleteBookController= new DeleteBookController();
$deleteBookController->handleRequest();
?>