<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include '../models/AddNewBook.php';
include '../models/Category.php';
include '../models/HandleRequest.php';

class HandleRequestController
{
    private $handlerequestObj;

    public function __construct()
    {
        $this->handlerequestObj = new HandleRequest();
    }

    public function handleRequest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {

            case "GET":
                $result = $this->handlerequestObj->getRequestList();
                echo json_encode($result);
                break;
            case "POST":
                $id = $_GET['id'];
                switch ($id){
                    case 0:
                        extract($data);
                        date_default_timezone_set('Asia/Colombo');
                        $requestTime = date('Y-m-d H:i:s');
                        if (!empty($bookID) && !empty($userID) && !empty($category)) {

                            $result = $this->handlerequestObj->placeRequest($bookID, $userID, $category, $requestTime);
                            if ($result === "userExists") {
                                $data = array('resultMessage' => 'User already has a request.');
                                echo json_encode($data);
                            } else if (is_array($result)) {
                                list($result1, $result2, $result3) = $result;
                                $this->handleResult($result1, $result2,$result3);
                            } else {
                                $this->respondWithError();
                            }
                        }
                        break;
                    case 1:
                        $userID = $data['userID'];
                        $result = $this->handlerequestObj->getRequestDetails($userID);
                        $requests = array();
                        while ($row = mysqli_fetch_assoc($result)) {
                            $requests[] = $row;
                        }
                        echo json_encode($requests);
                        break;
                }

                break;
        }
    }

    private function handleResult($result1, $result2,$result3)
    {
        if ($result1 > 0 && $result2 > 0 && $result3 > 0) {
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

$handleRequestController = new HandleRequestController();
$handleRequestController->handleRequest();
?>