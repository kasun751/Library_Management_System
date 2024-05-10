<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include 'SqlQuery.php';
// Check if the request method is OPTIONS and respond with 200 OK

$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":


    case "POST":
        //Access the object key properties
        $isbnNumber = $data['isbnNumber'];
        $qty = $data['number'];
        if (strlen($isbnNumber)>0 && $qty>0 ) {
            $getData = new SqlQuery();
            $result = $getData->addMoreQty($qty,$isbnNumber);
            if ($result > 0) {
                $data = array('resultMessage' => 'true');
                echo json_encode($data);
            } else if ($result == 0) {
                $data = array('resultMessage' => 'false');
                echo json_encode($data);
            }
        } else {
            $data = array('resultMessage' => 'false');
            echo json_encode($data);
        }


}
