
<?php
  session_start();
  DEFINE('DB_USERNAME', 'root');
  DEFINE('DB_PASSWORD', 'root');
  DEFINE('DB_HOST', 'localhost:8889');
  DEFINE('DB_DATABASE', 'test');

  $mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

  if (mysqli_connect_error()) {
    die('Connect Error ('.mysqli_connect_errno().') '.mysqli_connect_error());
  }

  //echo 'Connected successfully.'; // only connect successful will display
  
  //$mysqli->close();

  
?>


