<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");

include 'database.php';

if (
    isset($_POST['id']) &&
    isset($_POST['isbn']) &&
    isset($_POST['title']) &&
    isset($_POST['author']) &&
    isset($_POST['category']) &&
    isset($_POST['description']) &&
    isset($_FILES['pdf'])
) {
    $id = $_POST['id'];
    $isbn = $_POST['isbn'];
    $title = $_POST['title'];
    $author = $_POST['author'];
    $category = $_POST['category'];
    $description = $_POST['description'];
    $pdf = $_FILES['pdf'];

    if ($pdf['error'] === UPLOAD_ERR_OK) {
        $fileTmpPath = $pdf['tmp_name'];
        $fileName = $pdf['name'];
        $fileExtension = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        $newFileName = $fileName.$isbn . '.' . $fileExtension;

        // Directory where the file will be stored
        $uploadFileDir = 'C:/xampp1/htdocs/Lbrary Management System/PDF/'; // directory on  PC
        $dest_path = $uploadFileDir . $newFileName;

        if (move_uploaded_file($fileTmpPath, $dest_path)) {
            $dbCon = new database();
            $conn = $dbCon->dbConnect();

            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            $sql = "INSERT INTO ebook (id, isbn, title, author, category, description, pdf_path) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)";

            $stmt = $conn->prepare($sql);
            if ($stmt === false) {
                die("Prepare failed: " . htmlspecialchars($conn->error));
            }

            $stmt->bind_param('sssssss', $id, $isbn, $title, $author, $category, $description, $dest_path);

            if ($stmt->execute()) {
                echo json_encode(['resultMessage' => 'true']);
            } else {
                echo json_encode(['resultMessage' => 'false', 'error' => $stmt->error]);
            }

            $stmt->close();
            $conn->close();
        } else {
            echo json_encode(['resultMessage' => 'Error moving the file to the upload directory.']);
        }
    } else {
        echo json_encode(['resultMessage' => 'File upload error.']);
    }
} else {
    echo json_encode(['resultMessage' => 'Required fields are missing.']);
}
?>
