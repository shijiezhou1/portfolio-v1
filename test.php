<?php

// ob_implicit_flush(true);
// ob_end_flush();

// for ($i=0; $i<5; $i++) {
//    echo $i.'<br>';
//    sleep(2);
// }
?>

<?php
/**
 * sleep函数定时执行动态生成时间段的代码
 * 琼台博客
 */
// 目前时间
//echo date('Y-m-d H:i:s'); // out:2018-05-26 23:04:00
echo '<br />';
 
// 动态生成时间 范围在今天下午六点到晚上零点前的任意时间
// $datetime = date('Y-m-d').' '.rand('18,23').':'.rand('0,59').':'.rand('0,59');  // 2012-05-27 19:20:00

$datetime = date('2018-05-26 23:05:00');

// 算得时间戳
$a = strtotime($datetime);
 
// 算得时间差
$reduce = $a-time();
 
// sleep等待
sleep($reduce);
 
// 执行到时间后执行的代码块
print_r(date('Y-m-d H:i:s'));  // out:2012-05-27 19:20:00

?>


<?php
$dt = new DateTime();
echo $dt->format('Y-m-d H:i:s');
?>