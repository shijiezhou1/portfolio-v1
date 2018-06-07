<?php
/**
*    @author     Shijie Zhou
*
*    @since      2018-05-05
*/
$dsn = 'mysql:host=localhost;dbname=crud';
$username = 'root';
$password = 'root';
$options = array(
    PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
);
try {
    $dbh = new PDO($dsn, $username, $password, $options);
} catch (PDOException $e) {
    echo 'Connection failed: '.$e->getMessage();
    exit();
}
