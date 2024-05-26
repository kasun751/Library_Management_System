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
        break;

    case "POST":
        $isbnNumber = $data['isbnNumber'];
        $bookName = $data['bookName'];
        $authorName = $data['authorName'];
        $publisherName = $data['publisherName'];
        $bookLocation = $data['bookLocation'];
        $description = $data['description'];
        if(strlen($isbnNumber) > 0 && strlen($bookName) > 0 && strlen($authorName) > 0 &&
            strlen($publisherName) > 0 && strlen($bookLocation) > 0 && strlen($description) > 0) {
            $Data = new SqlQuery();
                $result1 = $Data->updateBookDetails($isbnNumber, $bookName, $authorName, $publisherName, $bookLocation, $description);
                if ($result1 > 0) {
                    $data = array('resultMessage' => 'true');
                    echo json_encode($data);
                } else if ($result1 == 0) {
                    $data = array('resultMessage' => 'false');
                    echo json_encode($data);
                }
        }
}


