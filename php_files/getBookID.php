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
        $isbnNumber = $data['isbnNumber'];
        $category = $data['category'];
        $book_No=1;

        if ( strlen($isbnNumber) > 0 && strlen($category) > 0 ) {
            $getData = new SqlQuery();
            $result=$getData->getLastBook_No($category,$isbnNumber);
            $uppercaseString = strtoupper($category);
            $charArray = str_split($uppercaseString);
            $final_ID=$charArray[0].$charArray[1].$charArray[2]."/".$isbnNumber."/".($result+1);
            $data = array('resultMessage' => $final_ID);
                echo json_encode($data);
            } else {
            $data = array('resultMessage' => 'false');
            echo json_encode($data);
        }



}

?>