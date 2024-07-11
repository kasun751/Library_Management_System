<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');

include '../Models/EBook.php';

//include 'database.php';
class RemoveBookController{
    private $eBookObj;
    public function __construct(){
        $this->eBookObj=new EBook();
    }

    public function RemoveBook(){
        $data = json_decode(file_get_contents("php://input"), true);
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {
            case "GET":
                // Handle GET request if needed
                break;

            case "POST":
                if (isset($data['isbn'])) {
                    $isbn = $data['isbn'];

//                    $dbCon = new database();
//                    $conn = $dbCon->dbConnect();
//
//                    if ($conn->connect_error) {
//                        echo json_encode(['resultMessage' => 'Connection failed', 'error' => $conn->connect_error]);
//                        exit();
//                    }

                    // Fetch the paths before deleting the record
//                    $sql1 = "SELECT pdf_path, image_path FROM ebook WHERE isbn = ?";
//                    $stmt = $conn->prepare($sql1);
////            if (!$stmt) {
////                echo json_encode(['resultMessage' => 'Prepare failed', 'error' => $conn->error]);
////                exit();
////            }
//                    $stmt->bind_param('s', $isbn);
//                    $stmt->execute();
//                    $stmt->bind_result($currentPdfPath, $currentImagePath);
//                    $stmt->fetch();
//                    $stmt->close();

                    $path=$this->eBookObj->GetPath($isbn);
                    $currentPdfPath=$path['pdf_path'];
                    $currentImagePath=$path['image_path'];

                    if ($currentPdfPath || $currentImagePath) {
                        $uploadFileDir = 'C:/xampp1/htdocs/Library Management System/PDF/';
                        $uploadFileDir1 = 'C:/xampp1/htdocs/Library Management System/IMAGES/';

                        $pdfFullPath = $uploadFileDir . $currentPdfPath;
                        $imageFullPath = $uploadFileDir1 . $currentImagePath;

                        // Check if files exist before deletion
                        $pdfExists = file_exists($pdfFullPath);
                        $imageExists = file_exists($imageFullPath);

                        // Delete the previous PDF and image files
                        $pdfDeleted = true;
                        $imageDeleted = true;

                        if ($pdfExists && !unlink($pdfFullPath)) {
                            $pdfDeleted = false;
                            error_log("Failed to delete PDF file: " . $pdfFullPath);
                        }

                        if ($imageExists && !unlink($imageFullPath)) {
                            $imageDeleted = false;
                            error_log("Failed to delete image file: " . $imageFullPath);
                        }

                        $response = ['resultMessage' => 'Record and associated files deleted successfully'];
                        if (!$pdfDeleted) {
                            $response['resultMessage'] = 'Failed to delete PDF file';
                        }
                        if (!$imageDeleted) {
                            $response['resultMessage'] = 'Failed to delete image file';
                        }

                        echo json_encode($response);

//                 Delete the record from the database

                        $this->eBookObj->DeleteBook($isbn);
//                        $sql3 = "DELETE FROM ebook WHERE isbn=?";
//                        $stmt = $conn->prepare($sql3);
//                        if (!$stmt) {
//                            echo json_encode(['resultMessage' => 'Prepare failed', 'error' => $conn->error]);
//                            exit();
//                        }
//                        $stmt->bind_param('s', $isbn);
//                        $stmt->execute();
//                        $stmt->close();
                    } else {
                        echo json_encode(['resultMessage' => 'No rows affected', 'error' => 'Record not found']);
                    }

//                    $conn->close();
                } else {
                    echo json_encode(['resultMessage' => 'Required fields are missing.']);
                }
                break;

            default:
                echo json_encode(['resultMessage' => 'Unsupported request method.']);
                break;
        }
    }
}

$removeBookCobtrollerObj=new RemoveBookController();
$removeBookCobtrollerObj->RemoveBook();
?>
