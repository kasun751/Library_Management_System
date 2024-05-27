<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include 'SqlQuery.php';

$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case "GET":
        break;

    case "POST":
        $updateData = new SqlQuery();
        $bookID = $data['bookID'];
        $category = $data['category'];
        $availability = $data['setAvailability'];
        $userID = $data['userID'];
        $dateTime = $data['dateTime'];

        if (strlen($bookID) > 0 && strlen($category) > 0 && strlen($availability) > 0 && strlen($userID) > 0) {

            $result1 = $updateData->setBookAvailability($category, $bookID, $availability);
            $result2 = $updateData->updateIsueBooksTable($bookID, $userID, $dateTime, $availability);
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
}

?>