<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include 'database.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($data === null || !isset($data['userId'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON or missing user ID']);
    exit;
}

$userId = $data['userId'];

$dbcon = new database();
$conn = $dbcon->dbConnect();

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Use prepared statements to prevent SQL injection
$stmt = $conn->prepare(
    "SELECT * FROM ebook, purchase, user 
     WHERE ebook.isbn = purchase.isbn 
     AND user.userId = purchase.userId 
     AND user.userId = ?"
);
$stmt->bind_param('s', $userId);
$stmt->execute();
$result = $stmt->get_result();

$books = [];
while ($row = $result->fetch_assoc()) {
    $books[] = $row;
}

echo json_encode(['status' => 'success', 'data' => $books]);

$stmt->close();
$conn->close();
?>
