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
        $bookID = $data['bookID'];
        if (strlen($bookID)>0) {
            $getData = new SqlQuery();
            $resultCategory = $getData->getBookIdCategory( $bookID );  //return category related to the book id
            if ($resultCategory!= null) {
                $bookDetails = $getData->getBookIdData($resultCategory,$bookID) ;
                $isbnNumber = $bookDetails['ISBN_Number'];
                $result = $getData->getISBNData($isbnNumber);
                if ( mysqli_num_rows($result) > 0) {
                    echo json_encode($result->fetch_assoc());
                } else if (mysqli_num_rows($result) == 0) {
                    $data = array('successMessage' => 'not have book1');
                    echo json_encode($data);
                }
            } else {
                $data = array('successMessage' => 'not have book');
                echo json_encode($data);
            }
        } else {
            $data = array('successMessage' => 'not have book');
            echo json_encode($data);
        }


}

?>
