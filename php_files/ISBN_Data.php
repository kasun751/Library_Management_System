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

        if (strlen($isbnNumber)>0) {
            $getData = new SqlQuery();
            $result = $getData->getISBNData($isbnNumber);
            if ( mysqli_num_rows($result) > 0) {
                $data = array('successMessage' => 'have book');
                echo json_encode($result->fetch_assoc());
            } else if (mysqli_num_rows($result) == 0) {
                $data = array('successMessage' => 'not have book');
                echo json_encode($data);
            }
        } else {
            $data = array('successMessage' => 'not have book');
            echo json_encode($data);
        }


}

?>
