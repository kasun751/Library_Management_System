<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');

include 'database.php';

$dbcon = new database();
$conn = $dbcon->dbConnect();

if ($conn->connect_error) {
    echo json_encode(['resultMessage' => 'Connection failed', 'error' => $conn->connect_error]);
    exit();
}

$offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 5;

$sql = "SELECT COUNT(*) as total FROM ebook";
$result = $conn->query($sql);
$totalBooks = $result->fetch_assoc()['total'];
$totalPages = ceil($totalBooks / $limit);

$sql = "SELECT isbn, title, price, author, category, description, image_path, pdf_path 
        FROM ebook 
        ORDER BY isbn DESC 
        LIMIT $limit OFFSET $offset";
$result = $conn->query($sql);

$details = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $details[] = $row;
    }
} else {
    echo json_encode(['books' => [], 'totalPages' => $totalPages]);
    exit();
}

$conn->close();

echo json_encode(['books' => $details, 'totalPages' => $totalPages]);
?>
