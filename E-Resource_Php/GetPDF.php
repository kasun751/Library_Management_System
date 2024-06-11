<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");

include 'database.php';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $isbn = $_POST['isbn'];

    $dbcon = new database();
    $conn = $dbcon->dbConnect();
    // Fetch the PDF path from the database
    $query = "SELECT pdf_path FROM books WHERE isbn = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $isbn);
    $stmt->execute();
    $stmt->bind_result($pdf_path);
    $stmt->fetch();
    $stmt->close();

    echo $pdf_path;
    if ($pdf_path) {
        $file = "C:/xampp1/htdocs/Lbrary Management System/PDF" . $pdf_path;
        if (file_exists($file)) {
            header('Content-Type: application/pdf');
            readfile($file);

        } else {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "File not found"]);

        }
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Book not found"]);
    }
}
?>
