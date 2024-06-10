<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include 'database.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($data === null || !isset($data['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON or missing user ID']);
    exit;
}

$user_id = $data['user_id'];
$table_name = 'purchases_' . $user_id;

$dbcon = new database();
$conn = $dbcon->dbConnect();

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit();
}

// Check if table for user exists
$check_table_query = "SHOW TABLES LIKE '$table_name'";
$result = $conn->query($check_table_query);

if ($result->num_rows == 0) {
    echo json_encode(['status' => 'error', 'message' => 'No purchases found for this user']);
    exit();
}

// Use prepared statements to prevent SQL injection
$stmt = $conn->prepare(
    "SELECT * FROM ebook,$table_name 
     WHERE ebook.isbn = $table_name.isbn"
);
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
