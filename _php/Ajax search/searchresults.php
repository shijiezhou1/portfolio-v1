<?php
$connection = mysqli_connect('localhost', 'root', 'root');
if(!$connection){
	die("Database Connection Failed" . mysqli_error($connection));
}
$selectdb = mysqli_select_db($connection, 'work');
if(!$selectdb){
	die("Database Selection Failed" . mysqli_error($connection));
}
$search = ($_GET['search']);
function mysql_escape_mimic($inp) { 
	if(is_array($inp)) 
			return array_map(__METHOD__, $inp); 
	if(!empty($inp) && is_string($inp)) { 
			return str_replace(array('\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), $inp); 
	} 
	return $inp; 
} 
$search = mysql_escape_mimic($search);

print_r($search);
$sql = "SELECT * FROM socialcontent WHERE previewtitle LIKE '$search%' LIMIT 10";
$result = mysqli_query($connection, $sql);
while($row = mysqli_fetch_assoc($result)){
	echo "<li><a href='#'>".$row['previewtitle']." ".$row['previewtitle']."</a>";
}
?>
