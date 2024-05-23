<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DatabaseHandler.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case "GET":
        $category = isset($_GET['category']) ? $_GET['category'] : '';
        $obj = new DatabaseHandler();
        $data = $obj->getPostData($category);
        header('Content-Type: application/json');
        echo json_encode($data);
        break;

    case "POST":
        $requestData = json_decode(file_get_contents('php://input', true));
        if (isset($requestData->category) && isset($requestData->title) && isset($requestData->description) && isset($requestData->member_id)) {
            $category = $requestData->category;
            $title = $requestData->title;
            $description = $requestData->description;
            $member_id = $requestData->member_id;

            $obj = new DatabaseHandler();
            $sql = "INSERT INTO post_table(post_id, member_id, title, description, category, report_status) VALUES (null, '$member_id', '$title', '$description', '$category', 0)";
            $success = $obj->insertPost($sql);

            $response = array('success' => $success, 'message' => $success ? 'Post sent successfully' : 'Failed to send Post');
            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => 'Missing required fields in the request');
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        break;
}
