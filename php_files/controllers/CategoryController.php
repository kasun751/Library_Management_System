<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
require_once '../models/Category.php';

class CategoryController
{
    private $catObj;

    public function __construct()
    {
        $this->catObj = new Category();
    }

    public function handleRequest()
    {

        $data = json_decode(file_get_contents('php://input'), true);
        $method = $_SERVER['REQUEST_METHOD'];

        switch ($method) {
            case "GET":
                $categoryList = $this->catObj->getCategoryList();
                if (count($categoryList) > 0) {
                    echo json_encode($categoryList);
                } else {
                    $this->respondWithError();
                }
                break;

            case "POST":

                $newCategory = isset($data['addCategory']) ? $data['addCategory'] : null;
                $removeCategory = isset($data['category']) ? $data['category'] : null;
                $access_parameter = isset($data['access_parameter']) ? $data['access_parameter'] : null;

                if (!empty($newCategory) || !empty($removeCategory)) {

                    switch ($access_parameter) {
                        case "add":
                            $result = $this->catObj->CategoryTableUpdate($newCategory);
                            $this->handleResult($result,"add");
                            break;

                        case "remove":
                            $numOfRaws=$this->catObj->checkCategoryTableIsEmpty($removeCategory);
                            if($numOfRaws==0){
                                $result1 = $this->catObj->dropCategoryDetails($removeCategory);
                                $this->handleResult($result1,"remove");
                            }else{
                                $data = array('resultMessage' =>'tableNotEmpty');
                                echo json_encode($data);
                            }

                            break;
                        default:
                            $this->respondWithError();
                            break;
                    }

                } else {
                    $this->respondWithError();
                }
                break;

            default:
                $this->respondWithError();
                break;
        }
    }

    private function handleResult($result,$para)
    {
        if ($result > 0 && $para==="add") {
            $this->respondWithSuccess("add");
        } else if($result == 0 && $para==="add"){
            $this->respondWithError("notAdd");
        } else if($result > 0 && $para==="remove"){
            $this->respondWithSuccess("remove");
        } else if($result == 0 && $para==="remove"){
            $this->respondWithError("notRemove");
        }
    }

    private function respondWithSuccess($para)
    {
        $data = array('resultMessage' => $para);
        echo json_encode($data);
    }

    private function respondWithError($para)
    {
        $data = array('resultMessage' => $para);
        echo json_encode($data);
    }
}
$categoryController = new CategoryController();
$categoryController->handleRequest();
?>
