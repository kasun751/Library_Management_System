<?php
include 'DbConnector.php';

class DatabaseHandler extends DbConnector
{
    public function getPostData($category)
    {
        $data = array();
        $sql = "SELECT * FROM post_table";

        if (!empty($category)) {
            $sql .= " WHERE category = '$category'";
        }

        $result = $this->connect()->query($sql);

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        return $data;
    }

    public function getReplyData($post_id)
    {
        $data = array();
        $sql = "SELECT * FROM reply_table";

        if (!empty($post_id)) {
            $sql .= " WHERE post_id = '$post_id'";
        }

        $result = $this->connect()->query($sql);

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
        }
        return $data;
    }

    public function insertReply($post_id, $member_id, $reply_msg)
    {
        $sql = "INSERT INTO reply_table (reply_id, post_id, member_id, reply_msg, report_status) VALUES (null, '$post_id', '$member_id', '$reply_msg', 0);";
        $result = $this->connect()->query($sql);
        return $result === true;
    }

    public function updateMsg($sql)
    {
        $result = $this->connect()->query($sql);
        return true;
    }

    public function insertPost($sql)
    {
        $result = $this->connect()->query($sql);
        return true;
    }
}
