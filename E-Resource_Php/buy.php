<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header('Content-Type: application/json');
include 'database.php';

// Decode the incoming JSON data
$data = json_decode(file_get_contents("php://input"), true);

// Check if JSON decoding was successful and if 'isbn' exists
if ($data === null || !isset($data['isbn'])) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid JSON or missing ISBN']);
    exit;
}

$isbn = $data['isbn'];

$dbcon = new database();
$conn = $dbcon->dbConnect();

if ($conn->connect_error) {
    echo json_encode(['resultMessage' => 'Connection failed', 'error' => $conn->connect_error]);
    exit();
}

// Use prepared statements to prevent SQL injection
$stmt = $conn->prepare("SELECT * FROM ebook WHERE isbn = ?");
$stmt->bind_param("s", $isbn);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows == 1) {
    $row = $result->fetch_assoc();

    $merchant_id="1227044";
    $order_id=$row['isbn'];
    $amount=$row['price'];
    $currency="LKR" ;
    $merchant_secret="Mjk3ODYzMTcxMDExMDAxOTc1OTY2MzkyOTQ3NTEyMjgzNTIwNjg1";

    $hash = strtoupper(
        md5(
            $merchant_id .
            $order_id .
            number_format($amount, 2, '.', '') .
            $currency .
            strtoupper(md5($merchant_secret))
        )
    );

    $row['hash'] = $hash;

    echo json_encode(['status' => 'success', 'data' => $row]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Book not found']);
}



$stmt->close();
$conn->close();
?>
