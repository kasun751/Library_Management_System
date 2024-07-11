<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include '../Models/ENewsPaper.php';
//include 'database.php';
class UpdateNewsPapersController{
    private $eNewsPaperObj;

    public function __construct()
    {
        $this->eNewsPaperObj=new ENewsPaper();
    }
    public function UpdateNewsPaper(){
        if (isset($_POST['Id'])) {
            $id = $_POST['Id'];
            $title = $_POST['title'];
            $date = $_POST['date'];
            $description = $_POST['description'];

//            $dbCon = new database();
//            $conn = $dbCon->dbConnect();
//
//            if ($conn->connect_error) {
//                die("Connection failed: " . $conn->connect_error);
//            }

            // Get current file paths from the database
//            $sql1 = "SELECT pdf_path, image_path FROM enewspapers WHERE Id = ?";
//            $stmt = $conn->prepare($sql1);
//            $stmt->bind_param('s', $id);
//            $stmt->execute();
//            $stmt->bind_result($currentPdfPath, $currentImagePath);
//            $stmt->fetch();
//            $stmt->close();
            $result=$this->eNewsPaperObj->GetPath($id);
            $currentPdfPath=$result['pdf_path'];
            $currentImagePath=$result['image_path'];

            $uploadFileDir = 'C:/xampp1/htdocs/Lbrary Management System/NewsPapersPDF/';
            $uploadFileDir1 = 'C:/xampp1/htdocs/Lbrary Management System/NewsPapersIMAGES/';

            // Handle PDF file upload
            if (isset($_FILES['pdf']) && $_FILES['pdf']['error'] == UPLOAD_ERR_OK) {
                $fileTmpPath = $_FILES['pdf']['tmp_name'];
                $fileName = $_FILES['pdf']['name'];
                $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
                $newFileName = $fileName . $id . '.' . $fileExtension;
                $dest_path = $uploadFileDir . $newFileName;

                // Delete the previous PDF file
                if ($currentPdfPath && file_exists($uploadFileDir . $currentPdfPath)) {
                    unlink($uploadFileDir . $currentPdfPath);
                }

                if (!move_uploaded_file($fileTmpPath, $dest_path)) {
                    echo json_encode(['resultMessage' => 'Error moving the PDF file to the upload directory.']);
                    exit;
                }
            } else {
                $newFileName = $currentPdfPath; // Retain the current file if no new file is uploaded
            }

            // Handle image file upload
            if (isset($_FILES['image']) && $_FILES['image']['error'] == UPLOAD_ERR_OK) {
                $fileTmpPath1 = $_FILES['image']['tmp_name'];
                $fileName1 = $_FILES['image']['name'];
                $fileExtension1 = strtolower(pathinfo($fileName1, PATHINFO_EXTENSION));
                $newFileName1 = $fileName1 . $id . '.' . $fileExtension1;
                $dest_path1 = $uploadFileDir1 . $newFileName1;

                // Delete the previous image file
                if ($currentImagePath && file_exists($uploadFileDir1 . $currentImagePath)) {
                    unlink($uploadFileDir1 . $currentImagePath);
                }

                if (!move_uploaded_file($fileTmpPath1, $dest_path1)) {
                    echo json_encode(['resultMessage' => 'Error moving the image file to the upload directory.']);
                    exit;
                }
            } else {
                $newFileName1 = $currentImagePath; // Retain the current file if no new file is uploaded
            }

//            $sql2 = "UPDATE enewspapers SET title=?, date=?, description=?, pdf_path=?, image_path=? WHERE Id=?";
//            $stmt = $conn->prepare($sql2);
//
//            if ($stmt === false) {
//                die("Prepare failed: " . htmlspecialchars($conn->error));
//            }
//
//            $stmt->bind_param('ssssss', $title,  $date, $description, $newFileName, $newFileName1, $id);

            $result=$this->eNewsPaperObj->UpdateNewsPaper($title,  $date, $description, $newFileName, $newFileName1, $id);

            if ($result) {
                echo json_encode(['resultMessage' => 'true']);
            } else {
                echo json_encode(['resultMessage' => 'false']);
            }

//            $stmt->close();
//            $conn->close();
        } else {
            echo json_encode(['resultMessage' => 'ID not provided.']);
        }
    }
}

$updateNewsPaperObj=new UpdateNewsPapersController();
$updateNewsPaperObj->UpdateNewsPaper();


