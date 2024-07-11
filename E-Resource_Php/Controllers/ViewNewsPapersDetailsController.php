<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include '../Models/ENewsPaper.php';
//include 'database.php';
class ViewNewsPapersDetailsController{
    private $eNewsPaperObj;

    public function __construct()
    {
        $this->eNewsPaperObj=new ENewsPaper();
    }
    public function ViewNewsPapersDetails(){
//        $dbcon=new database();
//        $conn=$dbcon->dbConnect();
//
//        if($conn->connect_error){
//            echo json_encode(['resultMessage' => 'Connection failed', 'error' => $conn->connect_error]);
//            exit();
//        }
//        $sql = "SELECT * FROM enewspapers";
//        $result=$conn->query($sql);

        $result=$this->eNewsPaperObj->ViewNewsPapers();

        $details=array();

        if($result->num_rows>0){
            while($row = $result->fetch_assoc()){
                $details[]=$row;
            }
        }else{
            echo json_encode([]);
            exit();
        }

//        $conn->close();

        echo json_encode($details);
    }
}

$viewNewsPapersDetailsObj=new ViewNewsPapersDetailsController();
$viewNewsPapersDetailsObj->ViewNewsPapersDetails();
