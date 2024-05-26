<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include 'SqlQuery.php';

$data = json_decode(file_get_contents('php://input'), true);
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {

    case "GET":
        $getData = new SqlQuery();
        $categoryList=$getData->getCategoryList();
        if(count($categoryList)>0 ){
            echo json_encode($categoryList);
        }else{
            $data = array('resultMessage' => 'false');
            echo json_encode($data);
        }

        break;

    case "POST":
        $getData = new SqlQuery();
        $bookName = $data['bookName'];
        $authorName = $data['authorName'];
        $publisherName = $data['publisherName'];
        $isbnNumber = $data['isbnNumber'];
        $category = $data['category'];
        $qty = $data['number'];
        $bookLocation = $data['bookLocation'];
        $bookAvailability = $data['setAvailability'];
        $description = $data['description'];
        $lastBookName_ID =$getData->getLastBookName_ID($category);
        if( $lastBookName_ID === null || !isset($lastBookName_ID['BookName_ID'])){
            $bookName_ID = 1;
        }else{
            $bookDetails2 = $getData->getLastBookName_ID($category) ;
            $bookName_ID = $bookDetails2['BookName_ID']+1;
        }
        $book_No=1;

        if (strlen($bookName) > 0 && strlen($authorName) > 0 && strlen($publisherName) > 0 && strlen($isbnNumber) > 0
            && strlen($category) > 0 && strlen($qty) > 0 && strlen($bookLocation) > 0 && strlen($bookAvailability) > 0 && strlen($description) > 0) {
            $insertData = new SqlQuery();
            list($result1,$result2) = $insertData->InsertBookSTableDetails($bookName, $authorName, $publisherName, $isbnNumber, $category, $qty,$bookLocation,$bookAvailability, $description,$bookName_ID, $book_No);
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
}

//$bookName = 'as';
//$authorName = '127';
//$publisherName = 'publisher1111';
//$isbnNumber = 'isbnNumbersdd';
//$category='science';
//$qty =2;
//$bookLocation='bookLocation';
//$description = 'description';
//$bookName_ID=1000;
//$book_No=2000;
//$insertData = new SqlQuery();
//list($result1,$result2) = $insertData->InsertBookSTableDetails($bookName, $authorName, $publisherName, $isbnNumber, $category,$qty,$bookLocation, $description,$bookName_ID,$book_No);
//if ($result1 > 0 && $result2 > 0) {
//    $data = array('resultMessage' => 'true');
//    echo json_encode($data);
//}else if ($result1 == 0 || $result2 == 0) {
//    $data = array('resultMessage' => 'false');
//    echo json_encode($data);
//}
?>