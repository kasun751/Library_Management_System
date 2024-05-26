<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

include 'SqlQuery.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $isbnNumber  = $_GET['id'];
        if (strlen($isbnNumber)>0) {
            $getData = new SqlQuery();
            $result = $getData->getISBNData($isbnNumber);
            if ( mysqli_num_rows($result) > 0) {
                echo json_encode($result->fetch_assoc());
            } else if (mysqli_num_rows($result) == 0) {
                $data = array('successMessage' => 'not have book');
                echo json_encode($data);
            }
        } else {
            $data = array('successMessage' => 'not have book');
            echo json_encode($data);
        }
        break;

    case "POST":

}
?>
