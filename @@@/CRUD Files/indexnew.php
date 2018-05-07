<?php
// DATABASE CONNECTION
$databaseHost = 'localhost:8889';
$databaseName = 'crud';
$databaseUsername = 'root';
$databasePassword = 'root';
 
$mysqli = mysqli_connect($databaseHost, $databaseUsername, $databasePassword, $databaseName); 
 
// NUMBER OF ROWS TO SHOW PER PAGE
$limit = 3;
 
// GET PAGE AND OFFSET VALUE
if (isset($_GET['page'])) {
    $page = $_GET['page'] - 1;
    $offset = $page * $limit;
} else {
    $page = 0; 
    $offset = 0;
}
 
// COUNT TOTAL NUMBER OF ROWS IN TABLE
$sql = "SELECT count(id) FROM users";
$result = mysqli_query($mysqli, $sql);
$row = mysqli_fetch_array($result);
$total_rows = $row[0];
 
// DETERMINE NUMBER OF PAGES
if ($total_rows > $limit) {
    $number_of_pages = ceil($total_rows / $limit);
} else {
    $pages = 1;
    $number_of_pages = 1;
}
 
// FETCH DATA USING OFFSET AND LIMIT
$result = mysqli_query($mysqli, "SELECT * FROM users ORDER BY id DESC LIMIT $offset, $limit");
?>
 
<html>
<head>    
    <title>Homepage</title>
</head>
 
<body>
 
    <table width='80%' border=0>
 
    <tr bgcolor='#CCCCCC'>
        <td>Name</td>
        <td>Age</td>
        <td>Email</td>        
    </tr>
    <?php 
    while($res = mysqli_fetch_array($result)) {         
        echo "<tr>";
        echo "<td>".$res['name']."</td>";
        echo "<td>".$res['age']."</td>";
        echo "<td>".$res['email']."</td>";            
    }
    ?>    
    </table>
    
    <?php
    // SHOW PAGE NUMBERS
    if ($page) {
        echo "<a href='indexnew.php?page=1'>First</a> ";
    }
    for ($i=1;$i<=$number_of_pages;$i++) {
        echo "<a href='indexnew.php?page=$i'>".$i."</a> ";
    }    
    if (($page + 1) != $number_of_pages) {
        echo "<a href='indexnew.php?page=$number_of_pages'>Last</a> ";
    }
    ?>
</body>
</html>