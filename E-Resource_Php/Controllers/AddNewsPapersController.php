<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
//$data = json_decode(file_get_contents("php://input"), true);
//include 'database.php';
include '../Models/ENewsPaper.php';
class AddNewsPapersController{
    private $eNewsPaperObj;

    public function __construct()
    {
        $this->eNewsPaperObj=new ENewsPaper();
    }
    public function AddNewsPaper(){
        if (
            isset($_POST['id']) &&
            isset($_POST['title']) &&
            isset($_POST['date']) &&
            isset($_POST['description']) &&
            isset($_FILES['image']) &&
            isset($_FILES['pdf'])
        ) {
            $id = $_POST['id'];
            $title = $_POST['title'];
            $date = date('Y-m-d', strtotime($_POST['date']));
            $description = $_POST['description'];
            $image = $_FILES['image'];
            $pdf = $_FILES['pdf'];

            if ($pdf['error'] === UPLOAD_ERR_OK && $image['error'] === UPLOAD_ERR_OK) {

                // for pdf
                $fileTmpPath = $pdf['tmp_name'];
                $fileName = pathinfo($pdf['name'], PATHINFO_FILENAME);
                $fileExtension = strtolower(pathinfo($pdf['name'], PATHINFO_EXTENSION));
                $newFileName = $fileName . '_' . $id . '.' . $fileExtension;

                $uploadFileDir = 'C:/xampp1/htdocs/Lbrary Management System/NewsPapersPDF/';
                $dest_path = $uploadFileDir . $newFileName;

                // for image
                $fileTmpPath1 = $image['tmp_name'];
                $fileName1 = pathinfo($image['name'], PATHINFO_FILENAME);
                $fileExtension1 = strtolower(pathinfo($image['name'], PATHINFO_EXTENSION));
                $newFileName1 = $fileName1 . '_' . $id . '.' . $fileExtension1;

                $uploadFileDir1 = 'C:/xampp1/htdocs/Lbrary Management System/NewsPapersIMAGES/';
                $dest_path1 = $uploadFileDir1 . $newFileName1;

                if (move_uploaded_file($fileTmpPath, $dest_path) && move_uploaded_file($fileTmpPath1, $dest_path1)) {
//                    $dbCon = new database();
//                    $conn = $dbCon->dbConnect();
//
//                    if ($conn->connect_error) {
//                        die("Connection failed: " . $conn->connect_error);
//                    }
//
//                    $sql = "INSERT INTO enewspapers (Id, title, date, description, image_path,pdf_path)
//                    VALUES (?, ?, ?, ?, ?, ?)";
//
//                    $stmt = $conn->prepare($sql);
//                    if ($stmt === false) {
//                        die("Prepare failed: " . htmlspecialchars($conn->error));
//                    }
//
//                    $stmt->bind_param('ssssss',  $id, $title, $date, $description, $newFileName1, $newFileName);

                    $result=$this->eNewsPaperObj->AddNewsPaper($id, $title, $date, $description, $newFileName1, $newFileName);

                    if ($result) {
                        echo json_encode(['resultMessage' => 'true']);
                    } else {
                        echo json_encode(['resultMessage' => 'false', 'error' => $result->error]);
                    }

//                    $stmt->close();
//                    $conn->close();
                } else {
                    echo json_encode(['resultMessage' => 'Error moving the file to the upload directory.']);
                }
            } else {
                echo json_encode(['resultMessage' => 'File upload error.']);
            }
        } else {
            echo json_encode(['resultMessage' => 'Required fields are missing.']);
        }
    }
}

$addNewsPapersObj=new AddNewsPapersController();
$addNewsPapersObj->AddNewsPaper();
?>
