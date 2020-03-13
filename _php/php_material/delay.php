<?php

ob_start();
ignore_user_abort(true);
set_time_limit(0);


date_default_timezone_set('America/Denver');

/**
 * @param int $target_time Timestamp
 * @param int $min_sleep Always sleep for a minimum number of seconds
 */
function sleep_until($target_time, $min_sleep = 0){

    $time_now = time();
    echo 'Current time: '.$time_now;

    ob_flush();
    flush();
    $time_for_targets = $target_time - $time_now;


    echo '<br />';
    echo 'Current target: ' . $time_for_targets;
    ob_flush();
    flush();

    if($time_for_targets <= $min_sleep){
        //if not setting, sleep for 0 seconds
        sleep($min_sleep);
    }
    else{

        //sleep for the number of seconds until the target time
        sleep($time_for_targets);
        echo '<br>';
        echo 'Time for now: '. time();


        $makefile = fopen('makefile.txt','w') or die ("Unable to open file!");

        $txt = "The text is made on this time : ";
        $txt .= date('Y-m-d H:i:s');

        fwrite($makefile,$txt);

        fclose($makefile);
    }
}

$sec = $_POST['sec'];
$min = $_POST['min'];
$hours = $_POST['hours'];
$day = $_POST['day'];
$month = $_POST['month'];
$year = $_POST['year'];

$diff = strtotime('2018-05-28 22:31:20')-time(); //convert datetime to second
$future  = time() + $diff; //count down



?>


<h1><?php sleep_until($future, 0); ?></h1>


