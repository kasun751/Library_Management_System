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
        $book_No = 1;
        $dataGetting_parameter = $data['dataGetting_parameter'];
        if (strlen($isbnNumber) > 0 && strlen($category) > 0) {
            $getData = new SqlQuery();
            $result = $getData->getLastBook_No($category, $isbnNumber);
            $uppercaseString = strtoupper($category);
            $charArray = str_split($uppercaseString);
            if (count($charArray) >= 3) {
                $final_ID1 = $charArray[0] . $charArray[1] . $charArray[2] . "/" . ($result['BookName_ID']);
                $final_ID2 = $charArray[0] . $charArray[1] . $charArray[2] . "/" . ($result['BookName_ID']) . "/" . ($result['Book_No']+1);
            } else {
                $final_ID1 = $charArray[0] . $charArray[1] . "/" . ($result['BookName_ID']);
                $final_ID2 = $charArray[0] . $charArray[1] . "/" . ($result['BookName_ID']) . "/" . ($result['Book_No']+1);
            }
            if ($dataGetting_parameter == 1) {
                $data = array('resultMessage' => $final_ID1);
                echo json_encode($data);
            }
            if ($dataGetting_parameter == 0) {
                $data = array('resultMessage' => $final_ID2);
                echo json_encode($data);
            }

        } else {
            $data = array('resultMessage' => 'false');
            echo json_encode($data);
        }

}

?>