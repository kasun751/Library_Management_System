<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include '../Models/EPastPaper.php';
//include 'database.php';
class ViewPastPapersDetailsController{
    private $ePastPaperObj;

    public function __construct()
    {
        $this->ePastPaperObj=new EPastPaper();
    }
    public function ViewPastPaperDetails(){
        $dbcon = new database();
        $conn = $dbcon->dbConnect();

        if ($conn->connect_error) {
            echo json_encode(['resultMessage' => 'Connection failed', 'error' => $conn->connect_error]);
            exit();
        }
//        $sql = "SELECT * FROM epastpapers";
//        $result = $conn->query($sql);

        $result=$this->ePastPaperObj->ViewPastPaperDetails();

        $details = array();

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $details[] = $row;
            }
        } else {
            echo json_encode([]);
            exit();
        }

        $conn->close();

        echo json_encode($details);
}
}

$viewPastPaperDetailsObj=new ViewPastPapersDetailsController();
$viewPastPaperDetailsObj->ViewPastPaperDetails();
