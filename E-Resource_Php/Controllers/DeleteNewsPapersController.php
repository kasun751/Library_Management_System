<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');

include '../Models/ENewsPaper.php';
//include 'database.php';
class DeleteNewsPapersController{
    private $eNewsPaperObj;

    public function __construct()
    {
        $this->eNewsPaperObj=new ENewsPaper();
    }
    public function DeleteNewsPaper(){
        $data = json_decode(file_get_contents("php://input"), true);

        if(isset($data['Id'])){

            $id = $data['Id'];

//            $dbCon = new database();
//            $conn = $dbCon->dbConnect();
//
//            if ($conn->connect_error) {
//                echo json_encode(['resultMessage' => 'Connection failed', 'error' => $conn->connect_error]);
//                exit();
//            }
//
//            $sql = "DELETE FROM enewspapers WHERE Id=?";
//            $stmt = $conn->prepare($sql);
//            if (!$stmt) {
//                echo json_encode(['resultMessage' => 'Prepare failed', 'error' => $conn->error]);
//                exit();
//            }
//            $stmt->bind_param('s', $id);
//            $stmt->execute();

            $result=$this->eNewsPaperObj->DeleteNewsPaper($id);

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
$deleteNewsPaperObj=new DeleteNewsPapersController();
$deleteNewsPaperObj->DeleteNewsPaper();
?>
