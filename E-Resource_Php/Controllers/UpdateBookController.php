<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');

include '../Models/EBook.php';
//include 'database.php';
class UpdateBookController{

    private $eBookObj;

    public function __construct()
    {
        $this->eBookObj=new EBook();
    }

    public function UpdateBook(){
        if (isset($_POST['isbn'])) {
            $isbn = $_POST['isbn'];
            $title = $_POST['title'];
            $price = $_POST['price'];
            $volume = $_POST['volume'];
            $version = $_POST['version'];
            $author = $_POST['author'];
            $category = $_POST['category'];
            $description = $_POST['description'];
            $citations = $_POST['citations'];

//            $dbCon = new database();
//            $conn = $dbCon->dbConnect();
//
//            if ($conn->connect_error) {
//                die("Connection failed: " . $conn->connect_error);
//            }

            // Get current file paths from the database
//            $sql1 = "SELECT pdf_path, image_path FROM ebook WHERE isbn = ?";
//            $stmt = $conn->prepare($sql1);
//            $stmt->bind_param('s', $isbn);
//            $stmt->execute();
//            $stmt->bind_result($currentPdfPath, $currentImagePath);
//            $stmt->fetch();
//            $stmt->close();

            $path=$this->eBookObj->GetPath($isbn);
            $currentPdfPath=$path['pdf_path'];
            $currentImagePath=$path['image_path'];

            $uploadFileDir = 'C:/xampp1/htdocs/Lbrary Management System/PDF/';
            $uploadFileDir1 = 'C:/xampp1/htdocs/Lbrary Management System/IMAGES/';

            // Handle PDF file upload
            if (isset($_FILES['pdf']) && $_FILES['pdf']['error'] == UPLOAD_ERR_OK) {
                $fileTmpPath = $_FILES['pdf']['tmp_name'];
                $fileName = $_FILES['pdf']['name'];
                $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
                $newFileName = $fileName . $isbn . '.' . $fileExtension;
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
                $newFileName1 = $fileName1 . $isbn . '.' . $fileExtension1;
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

//            $sql2 = "UPDATE ebook SET title=?, price=?, author=?, category=?, description=?, pdf_path=?, image_path=? WHERE isbn=?";
//            $stmt = $conn->prepare($sql2);
//
//            if ($stmt === false) {
//                die("Prepare failed: " . htmlspecialchars($conn->error));
//            }
//
//            $stmt->bind_param('ssssssss', $title, $price, $author, $category, $description, $newFileName, $newFileName1, $isbn);
            $result=$this->eBookObj->UpdateBook($title, $price, $volume,$version,$author, $category, $description, $newFileName, $newFileName1,$citations, $isbn);

            if ($result) {
                echo json_encode(['resultMessage' => 'true']);
            } else {
                echo json_encode(['resultMessage' => 'false']);
            }

//            $stmt->close();
//            $conn->close();
        } else {
            echo json_encode(['resultMessage' => 'ISBN not provided.']);
        }
    }
}
$updateBookControllerObj=new UpdateBookController();
$updateBookControllerObj->UpdateBook();

?>
