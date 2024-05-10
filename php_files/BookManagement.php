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
        $getID = new SqlQuery();
        $result = $getID->getLastBookId();
        $row = $result->fetch_assoc();


       echo json_encode($row);
break;

    case "POST":
        //Access the object key properties
        $bookName = $data['bookName'];
        $authorName = $data['authorName'];
        $publisherName = $data['publisherName'];
        $isbnNumber = $data['isbnNumber'];
        $category = $data['category'];
        $qty = $data['number'];
        $description = $data['description'];

        if (strlen($bookName) > 0 && strlen($authorName) > 0 && strlen($publisherName) > 0 && strlen($isbnNumber) > 0
            && strlen($category) > 0 && strlen($qty) > 0 && strlen($description) > 0) {
            $insertData = new SqlQuery();
            $result = $insertData->runSqlInsertQuery($bookName, $authorName, $publisherName, $isbnNumber, $category, $qty, $description);
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
//$bookName = 'as';
//$authorName = '127';
//$publisherName = 'publisher1111';
//$isbnNumber = 'isbnNumber';
//='category';
//$qty =2;
//$description = 'description';


}

?>