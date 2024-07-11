<?php

// Allow cross-origin requests (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Credentials: true");

//include 'database.php';
include '../Models/EBook.php';
class GetPDFController{
    private $eBookObj;

    public function __construct()
    {
        $this->eBookObj=new EBook();
    }
    public function GetPdf(){
        $data = json_decode(file_get_contents("php://input"), true);

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            // Retrieve the ISBN from the POST request
            $isbn = $data['isbn'];

            if (!$isbn) {
                echo json_encode(["status" => "error", "message" => "ISBN is required"]);
                exit();
            }

            // Create a new database connection
//            $dbcon = new database();
//            $conn = $dbcon->dbConnect();
//
//            if ($conn->connect_error) {
//                echo json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]);
//                exit();
//            }

            // Fetch the PDF path from the database
//            $query = "SELECT pdf_path FROM ebook WHERE isbn = ?";
//            $stmt = $conn->prepare($query);
//
//            if (!$stmt) {
//                echo json_encode(["status" => "error", "message" => "Failed to prepare statement: " . $conn->error]);
//                exit();
//            }
//
//            $stmt->bind_param('s', $isbn);
//            $stmt->execute();
//            $stmt->bind_result($pdf_path);
//            $stmt->fetch();

            $pdf_path=$this->eBookObj->GetPDF($isbn);

            if ($pdf_path) {
                echo json_encode(["status" => "success", "data" => $pdf_path]);
            } else {
                echo json_encode(["status" => "error", "message" => "PDF not found for the given ISBN"]);
            }

//            $stmt->close();
//            $conn->close();
        }
    }
}
$getPDFControllerObj=new GetPDFController();
$getPDFControllerObj->GetPdf();

?>



