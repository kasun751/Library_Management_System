<?php

require_once '../dbConnection/DBConnection.php';

class Category
{
    private $con;

    public function __construct($categoryName=null)
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();
    }
    public function createNewCategoryTable($newCategory)
    {   //create new category table for new category

                $query = "CREATE TABLE $newCategory (
            Final_ID VARCHAR(255) PRIMARY KEY,
            ISBN_Number VARCHAR(255),
            BookName_ID INT DEFAULT 0,
            Book_No INT NOT NULL,
            Availability VARCHAR(255),
            FOREIGN KEY (ISBN_Number) REFERENCES Books(ISBN_Number)
        )";

        $result = $this->con->query($query);
        return $result;
    }

    public function CategoryTableUpdate($category)
    {   //update categoryList table & generate category ID

        $categoryFirstLetters =  $this->categoryLetterCheck($category);
        $query1 = "INSERT INTO category (Category_Name) VALUES ('$category')";
        $this->con->query($query1);
        $query2 = "SELECT Category_No FROM category WHERE Category_Name='$category'";
        $result2 = $this->con->query($query2);
        $row = $result2->fetch_assoc();
        $final_ID = $categoryFirstLetters . "/" . $row['Category_No'];
        $query3 = "UPDATE category SET Category_ID ='$final_ID'  WHERE Category_Name='$category'";
        $result3 = $this->con->query($query3);
        return $result3;
    }

    public function categoryLetterCheck($category1)
    {   //check first 3 category letters are already exists or not for creation of category ID

        $charArray1 = str_split(strtoupper($category1));
        if (count($charArray1) >= 3) {
            $firstThreeLetters1 = $charArray1[0] . $charArray1[1] . $charArray1[2];
        } else {
            $firstThreeLetters1 = $charArray1[0] . $charArray1[1];
        }

        $categoryList =  $this->getCategoryList();
        $newArray = [];
        foreach ($categoryList as $item) {
            $newArray[] = $item['Category_Name'];
        }
        foreach ($newArray as $category) {
            if (is_string($category)) {
                $charArray2 = str_split(strtoupper($category));
                if (count($charArray2) >= 3) {
                    $firstThreeLetters2 = $charArray2[0] . $charArray2[1] . $charArray2[2];
                } else {
                    $firstThreeLetters2 = $charArray2[0] . $charArray2[1];
                }
                if ($firstThreeLetters1 === $firstThreeLetters2) {
                    $firstFourLetters = $charArray1[0] . $charArray1[1] . $charArray1[2] . $charArray1[3];
                    return $firstFourLetters;
                }
            }
        }
        return $firstThreeLetters1;
    }

    public function getCategoryList()
    { //get all category name list from category List table

        $query = "SELECT DISTINCT Category_Name FROM category";
        $result = $this->con->query($query);
        $categoryList = array();
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $categoryList[] = $row;
            }
            return $categoryList;
        }
    }


    public function dropCategoryTable($Category)
    {
        $query = "DROP TABLE $Category";
        $result = $this->con->query($query);
        return $result;
    }

    public function dropCategoryDetails($Category)
    {
        $query = "DELETE FROM category WHERE Category_Name='$Category'";
        $result = $this->con->query($query);
        return $result;
    }


}