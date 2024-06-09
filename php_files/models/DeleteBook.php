<?php

require_once '../dbConnection/DBConnection.php';

class DeleteBook
{
    private $con;

    public function __construct()
    {
        $DBobj = new DBConnection();
        $this->con = $DBobj->dbConnect();

    }

    public function deleteAllBook($isbnNumber, $category)
    {
        $result = $this->backupBookDetails($isbnNumber, $category);
        $query1 = "DELETE FROM books WHERE ISBN_Number='$isbnNumber'";
        $query2 = "DELETE FROM $category WHERE ISBN_Number='$isbnNumber'";
        $result2 = $this->con->query($query2);
        $result1 = $this->con->query($query1);
        return array($result1, $result2, $result);
    }

    public function restoreAllBook($isbnNumber, $category)
    {
        $result = $this->restoreBookDetails($isbnNumber, $category);
        $query1 = "DELETE FROM backupBookDetails WHERE ISBN_Number='$isbnNumber'";
        $query2 = "DELETE FROM backupbook WHERE ISBN_Number='$isbnNumber'";
        $result2 = $this->con->query($query2);
        $result1 = $this->con->query($query1);
        return array($result1, $result2, $result);
    }

    public function restoreSomeBook($category, $bookID)
    {
        $result1 = $this->restoreOneBook($category, $bookID);
        if($result1){
            $query2 = "DELETE FROM backupbook WHERE Final_ID='$bookID'";
            $result2 = $this->con->query($query2);
            return array($result1, $result2);
        }
        return false;

    }

    public function deleteSomeBook($category, $bookID)
    {
        $result1 = $this->backupSomeBookDetails($category,$bookID);
        $query = "DELETE FROM $category WHERE Final_ID='$bookID'";
        $result2 = $this->con->query($query);
        return array($result1, $result2);
    }
    public function backupSomeBookDetails($category,$bookID)
    {
        $query1 = "SELECT * FROM $category WHERE Final_ID='$bookID'";
        $result1 = $this->con->query($query1);
        if ($result1 && $result1->num_rows > 0) {

            while ($row = $result1->fetch_assoc()) {
                $final_ID = $row['Final_ID'];
                $bookName_ID = $row['BookName_ID'];
                $book_No = $row['Book_No'];
                $availability = $row['Availability'];
                $isbnNumber = $row['ISBN_Number'];

                $query2 = "INSERT INTO backupbook (Final_ID,ISBN_Number,BookName_ID,Book_No,Availability)
                                VALUES ('$final_ID','$isbnNumber','$bookName_ID', '$book_No', '$availability' )";

                $result2 = $this->con->query($query2);
            }
            return $result2;
        }
        return false;
    }


    public function restoreOneBook($category,$bookID)
    {
        $query1 = "SELECT * FROM backupbook WHERE Final_ID='$bookID'";
        $result1 = $this->con->query($query1);
        if ($result1 && $result1->num_rows > 0) {
           $row = $result1->fetch_assoc();
                $final_ID = $row['Final_ID'];
                $bookName_ID = $row['BookName_ID'];
                $book_No = $row['Book_No'];
                $availability = $row['Availability'];
                $isbnNumber = $row['ISBN_Number'];

                $query="SELECT ISBN_Number,AllBookQty FROM books WHERE ISBN_Number='$isbnNumber'";
                $result = $this->con->query($query);

                if($result && $result->num_rows > 0){
                    $query2 = "INSERT INTO $category (Final_ID,ISBN_Number,BookName_ID,Book_No,Availability)
                                VALUES ('$final_ID','$isbnNumber','$bookName_ID', '$book_No', '$availability' )";

                    $result2= $this->con->query($query2);
                    if($result2){
                        $row = $result->fetch_assoc();
                        $allBookQty = $row['AllBookQty'];
                        $allBookQty++;
                        $queryForUpdateQty="UPDATE books SET AllBookQty ='$allBookQty'  WHERE ISBN_NUmber='$isbnNumber'";
                         return $this->con->query($queryForUpdateQty);

                    }

                }else{
                    $query3 = "SELECT * FROM backupBookDetails WHERE ISBN_Number='$isbnNumber'";
                    $result3 = $this->con->query($query3);
                    if ($result3 && $result3->num_rows > 0) {
                        $row = $result3->fetch_assoc();
                        $bookName = $row['BookName'];
                        $authorName = $row['AuthorName'];
                        $publisherName = $row['PublisherName'];
                        $category = $row['Category'];
                        $allBookQty = $row['AllBookQty'];
                        $bookLocation = $row['BookLocation'];
                        $description = $row['Description'];

                        $query4 = "INSERT INTO books (ISBN_Number,BookName,AuthorName,PublisherName,Category,AllBookQty,
                               BookLocation,Description) VALUES ('$isbnNumber','$bookName','$authorName', '$publisherName', '$category',
                                                                 1, '$bookLocation','$description')";
                        $result4 = $this->con->query($query4);
                        if($result4){
                            $query2 = "INSERT INTO $category (Final_ID,ISBN_Number,BookName_ID,Book_No,Availability)
                                VALUES ('$final_ID','$isbnNumber','$bookName_ID', '$book_No', '$availability' )";

                            return $this->con->query($query2);
                        }

                    }
                    return false;
                }
        }
        return false;
    }


    public function backupBookDetails($isbnNumber, $category)
    {
        $query1 = "SELECT * FROM books WHERE ISBN_Number='$isbnNumber'";
        $result1 = $this->con->query($query1);
        if ($result1 && $result1->num_rows > 0) {
            $row = $result1->fetch_assoc();
            $bookName = $row['BookName'];
            $authorName = $row['AuthorName'];
            $publisherName = $row['PublisherName'];
            $category = $row['Category'];
            $allBookQty = $row['AllBookQty'];
            $bookLocation = $row['BookLocation'];
            $description = $row['Description'];

            $query2 = "INSERT INTO backupBookDetails (ISBN_Number,BookName,AuthorName,PublisherName,Category,AllBookQty,
                               BookLocation,Description) VALUES ('$isbnNumber','$bookName','$authorName', '$publisherName', '$category',
                                                                 '$allBookQty', '$bookLocation','$description')";
            $result2 = $this->con->query($query2);
            if ($result2) {
                $query3 = "SELECT * FROM $category WHERE ISBN_Number='$isbnNumber'";
                $result3 = $this->con->query($query3);
                if ($result3 && $result3->num_rows > 0) {

                    while ($row = $result3->fetch_assoc()) {
                        $final_ID = $row['Final_ID'];
                        $bookName_ID = $row['BookName_ID'];
                        $book_No = $row['Book_No'];
                        $availability = $row['Availability'];

                        $query4 = "INSERT INTO backupbook (Final_ID,ISBN_Number,BookName_ID,Book_No,Availability)
                                VALUES ('$final_ID','$isbnNumber','$bookName_ID', '$book_No', '$availability' )";

                        $result4 = $this->con->query($query4);
                    }
                    return $result4;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }


    public function restoreBookDetails($isbnNumber, $category)
    {
        $query1 = "SELECT * FROM backupBookDetails WHERE ISBN_Number='$isbnNumber'";
        $result1 = $this->con->query($query1);
        if ($result1 && $result1->num_rows > 0) {
            $row = $result1->fetch_assoc();
            $bookName = $row['BookName'];
            $authorName = $row['AuthorName'];
            $publisherName = $row['PublisherName'];
            $category = $row['Category'];
            $allBookQty = $row['AllBookQty'];
            $bookLocation = $row['BookLocation'];
            $description = $row['Description'];

            $query="SELECT ISBN_Number,AllBookQty FROM books WHERE ISBN_Number='$isbnNumber'";
            $result = $this->con->query($query);

            if($result && $result->num_rows > 0){
                $queryForUpdateQty="UPDATE books SET AllBookQty ='$allBookQty'  WHERE ISBN_NUmber='$isbnNumber'";
                $result2 = $this->con->query($queryForUpdateQty);
                $result2;
            }else{
                $query2 = "INSERT INTO books (ISBN_Number,BookName,AuthorName,PublisherName,Category,AllBookQty,
                               BookLocation,Description) VALUES ('$isbnNumber','$bookName','$authorName', '$publisherName', '$category',
                                                                 '$allBookQty', '$bookLocation','$description')";
                $result2 = $this->con->query($query2);
            }

            if ($result2) {
            $query3 = "SELECT * FROM backupbook WHERE ISBN_Number='$isbnNumber'";
            $result3 = $this->con->query($query3);
            if ($result3->num_rows > 0) {

                while ($row = $result3->fetch_assoc()) {
                    $final_ID = $row['Final_ID'];
                    $bookName_ID = $row['BookName_ID'];
                    $book_No = $row['Book_No'];
                    $availability = $row['Availability'];

                        $query4 = "INSERT INTO $category (Final_ID,ISBN_Number,BookName_ID,Book_No,Availability)
                                VALUES ('$final_ID','$isbnNumber','$bookName_ID', '$book_No', '$availability' )";

                        $result4 = $this->con->query($query4);
                }
                    return $result4;
                }else{
                    return false;
                }
            } else {
                return false;
            }
        }
    }
}
$x=new DeleteBook();
$x->restoreOneBook("assdd","ASS/1/2");