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
        $getData = new SqlQuery();
        $getData->getCategoryList();
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
        $book_No=1;

        if (strlen($bookName) > 0 && strlen($authorName) > 0 && strlen($publisherName) > 0 && strlen($isbnNumber) > 0
            && strlen($category) > 0 && strlen($qty) > 0 && strlen($description) > 0) {
            $insertData = new SqlQuery();
            list($result1,$result2) = $insertData->InsertBookSTableDetails($bookName, $authorName, $publisherName, $isbnNumber, $category,$qty, $description,$book_No);
            if ($result1 > 0 && $result2 > 0) {
                $data = array('resultMessage' => 'true');
                echo json_encode($data);
            } else if ($result1 == 0 || $result2 == 0) {
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