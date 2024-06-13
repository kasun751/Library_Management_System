<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
//$data = json_decode(file_get_contents("php://input"), true);
include 'database.php';

//error_log(print_r($_POST, true));
//error_log(print_r($_FILES, true));

if (
    isset($_POST['id']) &&
    isset($_POST['subject']) &&
    isset($_POST['grade']) &&
    isset($_POST['year']) &&
    isset($_POST['extra']) &&
    isset($_FILES['image']) &&
    isset($_FILES['pdf'])
) {
    $id = $_POST['id'];
    $subject = $_POST['subject'];
    $grade = $_POST['grade'];
    $year = ($_POST['year']);
    $extra = $_POST['extra'];
    $image = $_FILES['image'];
    $pdf = $_FILES['pdf'];

    if ($pdf['error'] === UPLOAD_ERR_OK && $image['error'] === UPLOAD_ERR_OK) {

        // for pdf
        $fileTmpPath = $pdf['tmp_name'];
        $fileName = pathinfo($pdf['name'], PATHINFO_FILENAME);
        $fileExtension = strtolower(pathinfo($pdf['name'], PATHINFO_EXTENSION));
        $newFileName = $fileName . '_' . $id . '.' . $fileExtension;

        $uploadFileDir = 'C:/xampp1/htdocs/Lbrary Management System/PastPapersPDF/';
        $dest_path = $uploadFileDir . $newFileName;

        // for image
        $fileTmpPath1 = $image['tmp_name'];
        $fileName1 = pathinfo($image['name'], PATHINFO_FILENAME);
        $fileExtension1 = strtolower(pathinfo($image['name'], PATHINFO_EXTENSION));
        $newFileName1 = $fileName1 . '_' . $id . '.' . $fileExtension1;

        $uploadFileDir1 = 'C:/xampp1/htdocs/Lbrary Management System/PastPapersIMAGES/';
        $dest_path1 = $uploadFileDir1 . $newFileName1;

        if (move_uploaded_file($fileTmpPath, $dest_path) && move_uploaded_file($fileTmpPath1, $dest_path1)) {
            $dbCon = new database();
            $conn = $dbCon->dbConnect();

            if ($conn->connect_error) {
                die("Connection failed: " . $conn->connect_error);
            }

            $sql = "INSERT INTO epastpapers (id, subject,grade, year, extra_details, image_path,pdf_path)
                    VALUES (?, ?, ?, ?, ?, ?,?)";

            $stmt = $conn->prepare($sql);
            if ($stmt === false) {
                die("Prepare failed: " . htmlspecialchars($conn->error));
            }

            $stmt->bind_param('sssssss',  $id, $subject,$grade, $year, $extra ,$newFileName1, $newFileName);

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
<?php
