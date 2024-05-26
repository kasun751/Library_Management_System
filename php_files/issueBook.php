<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include 'SqlQuery.php';

$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case "GET":


    case "POST":

        $bookID = $data['bookID'];
        $category = $data['category'];
        $availability=$data['setAvailability'];
        if(strlen($bookID)>0 && strlen($category)>0 && strlen($availability)>0){
            $updateData = new SqlQuery();
            $result = $updateData-> setBookAvailability($category,$bookID,$availability);
            if ($result > 0) {
                $data = array('resultMessage' => 'true');
                echo json_encode($data);
            } else if ($result == 0 ) {
                $data = array('resultMessage' => 'false');
                echo json_encode($data);
            }
        }else {
            $data = array('resultMessage' => 'false');
            echo json_encode($data);
        }


}

?>