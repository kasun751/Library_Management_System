<?php
class DBConnection
{
    private $hostName='localhost';
    private $userName='root';
    private $password='';
    private $database='booksdetails';
    public function dbConnect(){
        $con = new mysqli($this->hostName, $this->userName, $this->password, $this->database);

        if($con->connect_error)
        {
            die ("<h1>Database Connection Failed</h1>");
        }

        return $con;
    }

}