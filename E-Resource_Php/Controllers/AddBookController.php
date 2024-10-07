<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
include '../Models/EBook.php';
//include 'database.php';
class AddBookController{
    private $eBookObj;

    public function __construct(){
        $this->eBookObj=new EBook();
    }
    public function AddBook(){
        if (
            isset($_POST['isbn']) &&
            isset($_POST['title']) &&
            isset($_POST['price']) &&
            isset($_POST['volume']) &&
            isset($_POST['version']) &&
            isset($_POST['author']) &&
            isset($_POST['category']) &&
            isset($_POST['description']) &&
            isset($_FILES['image']) &&
            isset($_FILES['pdf'])&&
            isset($_POST['citations'])
        ) {
            $isbn = $_POST['isbn'];
            $title = $_POST['title'];
            $price = $_POST['price'];
            $volume = $_POST['volume'];
            $version = $_POST['version'];
            $author = $_POST['author'];
            $category = $_POST['category'];
            $description = $_POST['description'];
            $image = $_FILES['image'];
            $pdf = $_FILES['pdf'];
            $citations = $_POST['citations'];

            if ($pdf['error'] === UPLOAD_ERR_OK && $image['error'] === UPLOAD_ERR_OK) {

                //for pdf
                $fileTmpPath = $pdf['tmp_name'];
                $fileName = $pdf['name'];
                $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
                $newFileName = $fileName.$isbn . '.' . $fileExtension;

                // Directory where the file will be stored
                $uploadFileDir = 'C:/xampp1/htdocs/Lbrary Management System/PDF/'; // directory on  PC
                $dest_path = $uploadFileDir . $newFileName;

                //for image
                $fileTmpPath1 = $image['tmp_name'];
                $fileName1 = $image['name'];
                $fileExtension1 = strtolower(pathinfo($fileName1, PATHINFO_EXTENSION));
                $newFileName1 = $fileName1.$isbn . '.' . $fileExtension1;

                // Directory where the file will be stored
                $uploadFileDir1 = 'C:/xampp1/htdocs/Lbrary Management System/IMAGES/'; // directory on  PC
                $dest_path1 = $uploadFileDir1 . $newFileName1;

                if (move_uploaded_file($fileTmpPath, $dest_path) && move_uploaded_file($fileTmpPath1,$dest_path1)) {
//                    $dbCon = new database();
//                    $conn = $dbCon->dbConnect();
//
//                    if ($conn->connect_error) {
//                        die("Connection failed: " . $conn->connect_error);
//                    }
//
//                    $sql = "INSERT INTO ebook (isbn, title,price,author, category, description, pdf_path,image_path)
//                    VALUES (?, ?, ?, ?, ?, ?, ?,?)";
//
//                    $stmt = $conn->prepare($sql);
//                    if ($stmt === false) {
//                        die("Prepare failed: " . htmlspecialchars($conn->error));
//                    }
//
//                    $stmt->bind_param('ssssssss',  $isbn, $title, $price,$author, $category, $description, $newFileName,$newFileName1);
                    $result=$this->eBookObj->AddBook($isbn, $title, $price,$volume,$version,$author, $category, $description, $newFileName,$newFileName1,$citations);

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

$addBookControllerObj=new AddBookController();
$addBookControllerObj->AddBook();
