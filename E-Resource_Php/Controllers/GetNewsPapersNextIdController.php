<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include '../Models/ENewsPaper.php';
//include 'database.php';
class GetNewsPapersNextIdController{
    private $eNewsPaperObj;

    public function __construct()
    {
        $this->eNewsPaperObj=new ENewsPaper();
    }
    public function GetNewsPapersNextId(){
//        $dbCon = new database();
//        $conn = $dbCon->dbConnect();
//
//        if ($conn->connect_error) {
//            die("Connection failed: " . $conn->connect_error);
//        }

//        $sql = $conn->prepare('SELECT Id FROM enewspapers WHERE Id ORDER BY Id DESC LIMIT 1');
//        $sql->execute();
//        $result=$sql->get_result();
//        $row = $result->fetch_assoc();
//        $next_id = $row['Id'] + 1;

        $next_id=$this->eNewsPaperObj->GetNewsPapersNewxtId();
        echo json_encode(array("next_Id" => $next_id));

//        $sql->close();
//        $conn->close();
    }
}
$getNewsPapersNextIdObj=new GetNewsPapersNextIdController();
$getNewsPapersNextIdObj->GetNewsPapersNextId();