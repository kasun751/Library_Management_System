<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
require_once '../models/UpdateExistingBookQty.php';
class GetBookIDController
{
    private $updateExistingBookQty;
    public function __construct()
    {
        $this->updateExistingBookQty = new UpdateExistingBookQty();
    }
    public function handleRequest()
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $method = $_SERVER['REQUEST_METHOD'];


        switch ($method) {
            case "GET":
                break;

            case "POST":
                $isbnNumber = $data['isbnNumber'];
                $category = $data['category'];
                $dataGetting_parameter = $data['dataGetting_parameter'];
                if (!empty($isbnNumber) && !empty($category)) {
                    list($final_ID1,$final_ID2)=$this->generateBookID($category, $isbnNumber);
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
                break;
        }
    }

    public function generateBookID($category, $isbnNumber){
        $result = $this->updateExistingBookQty->getLastBook_No($category, $isbnNumber);
        $uppercaseString = strtoupper($category);
        $charArray = str_split($uppercaseString);

        if (count($charArray) >= 3) {
            $final_ID1 = $charArray[0] . $charArray[1] . $charArray[2] . "/" . ($result['BookName_ID']);
            $final_ID2 = $charArray[0] . $charArray[1] . $charArray[2] . "/" . ($result['BookName_ID']) . "/" . ($result['Book_No'] + 1);
            return array($final_ID1,$final_ID2);
        } else {
            $final_ID1 = $charArray[0] . $charArray[1] . "/" . ($result['BookName_ID']);
            $final_ID2 = $charArray[0] . $charArray[1] . "/" . ($result['BookName_ID']) . "/" . ($result['Book_No'] + 1);
            return array($final_ID1,$final_ID2);
        }
}
}
$getBookIDController=new GetBookIDController();
$getBookIDController->handleRequest();
?>