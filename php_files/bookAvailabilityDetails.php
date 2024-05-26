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
            $result1 = $getData->getISBNData($isbnNumber);
            if ( mysqli_num_rows($result1) > 0) {
                $bookData = $result1->fetch_assoc();
                $category=$bookData['Category'];
                $result2=$getData->getAvailableBooksList($category,$isbnNumber);
                $books = array();
                while ($row = mysqli_fetch_assoc($result2)) {
                    $books[] = $row;
                }
                echo json_encode($books);
            } else if (mysqli_num_rows($result1) == 0) {
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

