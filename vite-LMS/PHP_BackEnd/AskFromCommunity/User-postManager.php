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
        $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : '';

        $obj = new DatabaseHandler();
        $data = $obj->getUserPostData($user_id);

        header('Content-Type: application/json');
        echo json_encode($data);
        break;
    case "POST":
        $requestData = json_decode(file_get_contents('php://input'), true);

        if (isset($requestData['user_id']) && isset($requestData['post_id'])) {
            $user_id = $requestData['user_id'];
            $post_id = $requestData['post_id'];

            $obj = new DatabaseHandler();
            $success = $obj->addUserPostDetails($post_id, $user_id);

            $response = array('success' => $success, 'message' => $success ? 'Save successfully' : 'Failed to save post');
            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => 'Missing required fields in the request');
            header('Content-Type: application/json');
            echo json_encode($response);
        }
        break;
    case "DELETE":
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['user_id']) && isset($data['post_id'])) {
            $user_id = $data['user_id'];
            $post_id = $data['post_id'];

            $obj = new DatabaseHandler();
            $success = $obj->removeUserPostData($user_id, $post_id);

            $response = array('success' => $success, 'message' => $success ? 'Save successfully' : 'Failed to save post');
            header('Content-Type: application/json');
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => 'Missing required fields in the request');
            header('Content-Type: application/json');
            echo json_encode($response);
        }

        break;
}
