<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include 'SqlQuery.php';

$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case "GET":
        $getData = new SqlQuery();
        $getData->getCategoryList();
        break;

    case "POST":

        $category = $data['category'];
        $delete_Parameter=$data['delete_parameter'];


        switch ($delete_Parameter){
            case 0:
                if (strlen($isbnNumber) > 0 && strlen($category) > 0) {
                    $deleteBook = new SqlQuery();
                    list($result1, $result2) = $deleteBook->deleteAllBook($isbnNumber, $category);
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
                break;

            case 1:
                $bookID = $data['bookID'];
                if (strlen($bookID) > 0 && strlen($category) > 0 ) {
                    $deleteBook = new SqlQuery();
                    $result= $deleteBook->deleteSomeBook($category,$bookID);
                    if ($result === true) {
                        $data = array('resultMessage' => 'true');
                        echo json_encode($data);
                    } else {
                        $data = array('resultMessage' => 'false');
                        echo json_encode($data);
                    }
                } else {
                    $data = array('resultMessage' => 'false');
                    echo json_encode($data);
                }
        }


}

?>