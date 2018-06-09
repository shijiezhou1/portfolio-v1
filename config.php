<?php
/**
*    @author     Shijie Zhou
*    @since      2018-05-05
*/
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASSWORD', 'root');
define('DB_NAME', 'crud');

class Connection{
    private $db;
    private $Message;
    function __construct(){
        $this->db = $this->connect();
        $options = array(
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
        );
    }
    public function connect(){
        try {
            $this->connection = new PDO("mysql:host=".DB_HOST."; dbname=".DB_NAME.";",DB_USER, DB_PASSWORD);
        } catch (PDOException $error) {
            echo "Connection failed: " . $error->getMessage();
        }
                     return $this->connection;
    }

    public function setMessage($Message){
        $this->Message = $Message;
    }
    public function getMessage(){
        return $this->Message;
    }
}
?>