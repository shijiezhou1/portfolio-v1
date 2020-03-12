<?php

ini_set('display_errors',1);
ini_set('log_errors',1);
ini_set('error_log', dirname(__FILE__) . '/log.txt');
error_reporting(E_ALL);

// require 'helloworld.com';
?>
<html>
   <head>
      <title>AJAX jQuery Example with PHP MySQL</title>
      <style type="text/css">
         body{
         font-family: Verdana, Geneva, sans-serif;
         }
         .container{
         width: 50%;
         margin: 0 auto;
         }
         table, tr, th, td {
         border: 1px solid #e3e3e3;
         padding: 10px;
         }
      </style>
   </head>

   <body>
      <div class = "container" >
         <h3><u>AJAX jQuery Example with PHP MySQL</u></h3>
         <p><strong>Click on button to display users records from database</strong></p>
         <div id="records"></div>
         <p>
            <input type="button" id="getusers" value = "Update Records" />
         </p>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/jquery@3.3.1"></script>
      <script type="text/javascript">

        //WITHOUT BUTTON CLICK
         $(document).ready(function refresh() {

        //WITH BUTTON CLICK
         //$("#getusers").on('click', function refresh(){

         $.ajax({

         method: "GET",

         url: "getrecords_ajax.php",

         }).done(function( data ) {

         var result= $.parseJSON(data);

         var string='<table width="100%"><tr> <th>#</th><th>Name</th> <th>Email</th><tr>';

         /* from result create a string of data and append to the div */

         $.each( result, function( key, value ) {

         console.log(key);

         string += "<tr> <td>"+value['id'] + "</td><td>"+value['first_name']+' '+value['last_name']+'</td>  \
           <td>'+value['email']+"</td> </tr>";
         });

         string += '</table>';

         //update all the time
          $("#records").html(string);
          setTimeout(refresh, 3000);
         });
         });

      </script>
   </body>
</html>
