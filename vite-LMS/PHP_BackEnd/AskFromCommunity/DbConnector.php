<?php
class DbConnector
{
    private $dbServer;
    private $dbUser;
    private $dbPass;
    private $database;

    protected function connect()
    {
        $this->dbServer = 'localhost';
        $this->dbUser = 'root';
        $this->dbPass = '';
        $this->database = 'lms_database';

        $conn = new mysqli($this->dbServer, $this->dbUser, $this->dbPass, $this->database);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        } else {
            return $conn;
        }
    }
}
