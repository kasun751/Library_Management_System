<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');

include 'database.php';

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $subject = $_POST['subject'];
    $year = $_POST['year'];
    $grade = $_POST['grade'];
    $extra = $_POST['extra'];

    $dbCon = new database();
    $conn = $dbCon->dbConnect();

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Get current file paths from the database
    $sql1 = "SELECT pdf_path, image_path FROM epastpapers WHERE id = ?";
    $stmt = $conn->prepare($sql1);
    $stmt->bind_param('s', $id);
    $stmt->execute();
    $stmt->bind_result($currentPdfPath, $currentImagePath);
    $stmt->fetch();
    $stmt->close();

    $uploadFileDir = 'C:/xampp1/htdocs/Lbrary Management System/PastPapersPDF/';
    $uploadFileDir1 = 'C:/xampp1/htdocs/Lbrary Management System/PastPapersIMAGES/';

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

    $sql2 = "UPDATE epastpapers SET subject=?, grade=?,year=?, extra_details=?, pdf_path=?, image_path=? WHERE id=?";
    $stmt = $conn->prepare($sql2);

    if ($stmt === false) {
        die("Prepare failed: " . htmlspecialchars($conn->error));
    }

    $stmt->bind_param('sssssss', $subject,  $grade,$year, $extra, $newFileName, $newFileName1, $id);

    if ($stmt->execute()) {
        echo json_encode(['resultMessage' => 'true']);
    } else {
        echo json_encode(['resultMessage' => 'false']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['resultMessage' => 'ID not provided.']);
}




