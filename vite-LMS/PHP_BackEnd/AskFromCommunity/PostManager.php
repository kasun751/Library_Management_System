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
        $post_id = isset($_GET['post_id']) ? $_GET['post_id'] : '';

        $obj = new DatabaseHandler();
        $data = $obj->getPostData($category, $post_id);

        header('Content-Type: application/json');
        echo json_encode($data);
        break;

    case "POST":
        $requestData = json_decode(file_get_contents('php://input', true));
        if (isset($requestData->category) && isset($requestData->title) && isset($requestData->description) && isset($requestData->user_id)) {
            $category = $requestData->category;
            $title = $requestData->title;
            $description = $requestData->description;
            $user_id = $requestData->user_id;

            $obj = new DatabaseHandler();

            $success = $obj->insertPost($user_id, $title, $description, $category);

            $response = array('success' => $success, 'message' => $success ? 'Post sent successfully' : 'Failed to send Post');
            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => 'Missing required fields in the request');
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        break;
    case "PUT":
        $requestData = json_decode(file_get_contents('php://input'), true);
        if (isset($requestData['post_id']) && isset($requestData['category']) && isset($requestData['title']) && isset($requestData['description'])) {
            $post_id = $requestData['post_id'];
            $category = $requestData['category'];
            $title = $requestData['title'];
            $description = $requestData['description'];

            $obj = new DatabaseHandler();

            $success = $obj->updatePostTable($title, $category, $description, $post_id);

            $response = array('success' => $success, 'message' => $success ? 'Update successfully' : 'Failed to update post');
            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => 'Missing required fields in the request');
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        break;
}
