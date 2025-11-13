<?php

namespace PHPMailer\controllers;
use GetIsbnData;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include '../models/GetIsbnData.php';

class GetIsbnDataController
{
    private $getIsbnDataObj;

    public function __construct()
    {
        $this->getIsbnDataObj = new GetIsbnData();
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
                $id=$data['id'];
                switch ($id){
                    case "normalBook":
                        if (strlen($isbnNumber) > 0) {
                            $result = $this->getIsbnDataObj->getISBNData($isbnNumber);
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
                    case "restoreBook":
                        if (strlen($isbnNumber) > 0) {
                            $result = $this->getIsbnDataObj->getISBNDataFromBackupTable($isbnNumber);
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
                }
                break;
        }
    }
}
$getIsbnDataController= new GetIsbnDataController();
$getIsbnDataController->handleRequest();
?>
