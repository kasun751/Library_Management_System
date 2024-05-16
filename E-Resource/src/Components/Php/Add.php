<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");

include 'database.php';

$data = json_decode(file_get_contents('php://input'), true);

if (
    isset($data['id']) &&
    isset($data['isbn']) &&
    isset($data['title']) &&
    isset($data['author']) &&
    isset($data['category']) &&
    isset($data['description'])
) {
    // Proceed with assigning values to variables
    $id = $data['id'];
    $isbn = $data['isbn'];
    $title = $data['title'];
    $author = $data['author'];
    $category = $data['category'];
    $description = $data['description'];
} else {
    // Handle missing keys
    die("Required keys are missing in the JSON data.");
}

$dbCon = new database();
$conn = $dbCon->dbConnect();

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO eBook (id, isbn, title, author, category, description) 
        VALUES ('$id', '$isbn', '$title', '$author', '$category', '$description')";

$result = $conn->query($sql);

if ($result === TRUE) {
    $data = array('resultMessage' => 'true');
    echo json_encode($data);
} else {
    $data = array('resultMessage' => 'false', 'error' => $conn->error);
    echo json_encode($data);
}

$conn->close();
?>
