<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include '../Models/EPastPaper.php';
//include 'database.php';
class DeletePastPapersController{
    private $ePastPaperObj;

    public function __construct()
    {
        $this->ePastPaperObj=new EPastPaper();
    }
    public function DeletePastPaper(){
        $data = json_decode(file_get_contents("php://input"), true);

        if(isset($data['id'])){

            $id = $data['id'];

//            $dbCon = new database();
//            $conn = $dbCon->dbConnect();
//
//            if ($conn->connect_error) {
//                echo json_encode(['resultMessage' => 'Connection failed', 'error' => $conn->connect_error]);
//                exit();
//            }

//            $sql = "DELETE FROM epastpapers WHERE id=?";
//            $stmt = $conn->prepare($sql);
//            if (!$stmt) {
//                echo json_encode(['resultMessage' => 'Prepare failed', 'error' => $conn->error]);
//                exit();
//            }
//            $stmt->bind_param('s', $id);
//            $stmt->execute();

            $result=$this->ePastPaperObj->DeletePastPaper($id);

            if ($result > 0) {
                echo json_encode(['resultMessage' => 'News deleted successfully']);
            } else {
                echo json_encode(['resultMessage' => 'No news found with the given ID']);
            }

//            $stmt->close();
//            $conn->close();
        }else{
            echo json_encode(['resultMessage' => 'data not set']);
        }
    }
}
$deletePastPapersObj=new DeletePastPapersController();
$deletePastPapersObj->DeletePastPaper();
?>

