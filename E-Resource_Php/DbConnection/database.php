<?php
class database
{
    private $hostName='localhost';
    private $userName='root';
    private $password='';
    private $database='lms';
    private $port = 3308;

    public function dbConnect(){
        $con = new mysqli($this->hostName, $this->userName, $this->password, $this->database, $this->port);

        if($con->connect_error)
        {
            die ("<h1>Database Connection Failed</h1>");
        }

        return $con;
    }

}

?>
