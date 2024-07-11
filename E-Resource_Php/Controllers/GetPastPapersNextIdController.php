<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');

//include 'database.php';
include '../Models/EPastPaper.php';
class GetPastPapersNextIdController{
    private $ePastPaperObj;

    public function __construct()
    {
        $this->ePastPaperObj=new EPastPaper();
    }
    public function GetPastPapersNextId(){
//        $dbCon = new database();
//        $conn = $dbCon->dbConnect();
//
//        if ($conn->connect_error) {
//            die("Connection failed: " . $conn->connect_error);
//        }

//        $sql = $conn->prepare('SELECT Id FROM epastpapers WHERE Id ORDER BY Id DESC LIMIT 1');
//        $sql->execute();
//        $result=$sql->get_result();
//        $row = $result->fetch_assoc();
//        $next_id = $row['Id'] + 1;

        $next_id=$this->ePastPaperObj->GetPastPapersNextId();
        echo json_encode(array("next_Id" => $next_id));

//        $sql->close();
//        $conn->close();
    }
}

$getPastPapersNextIdObj=new GetPastPapersNextIdController();
$getPastPapersNextIdObj->GetPastPapersNextId();
