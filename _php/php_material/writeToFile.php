<?php

//this script will capture all the output of verifycron.html

ob_start();
$datum = date("d-m-Y H:i");

echo "the date is: $datum";

$page = ob_get_contents();

ob_end_flush();

$fp = fopen("verifycron.html", "w");

fwrite($fp,$page);
fclose($fp);
  
?>

