<?php
//
require 'PHPMailerAutoload.php';
require 'class.phpmailer.php';

		$mysql_hostname = 'localhost:8889';
		$mysql_username = 'root';
		$mysql_password = 'root';
		$mysql_dbname = 'db_email';
		
		$dbh = new PDO("mysql:host=$mysql_hostname;dbname=$mysql_dbname", $mysql_username, $mysql_password);
        /*** $message = a message saying we have connected ***/

        /*** set the error mode to excptions ***/
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        /*** prepare the select statement ***/
         $stmt = $dbh->prepare("SELECT id, name, email, promocode, status FROM email");

        /*** execute the prepared statement ***/
        $stmt->execute();

        while($row = $stmt->fetch()) {
            $id = $row['id'];
			$name = $row['name'];
			$email = $row['email'];
			$promoCode = $row['promocode'];
			$number = $row['status'];
			
			echo "what is the number: ".$number . "<br>";
      		echo "what is the id: ".$id . "<br>";

			
			sendEmail($email, $name, $promoCode);
							
		
        }
        
        
  
      
		 
	function sendEmail($email, $name, $promoCode){

		$mail = new PHPMailer;

		$htmlversion="<p style='color:Black;'>Hi ".$name.", <br><br> This is your promo code HTML : ".$promoCode.". </p>";
		$textVersion="Hi ".$name.",.\r\n This is your promo code:  ".$promoCode."text Version";
		$mail->isSMTP();                                     		 // Set mailer to use SMTP
		$mail->Host = "smtp.gmail.com";  								// Specify main and backup SMTP servers
		$mail->SMTPAuth = true;                               // Enable SMTP authentication
		$mail->Username = 'kenwupapwm2@gmail.com';         			  // SMTP username
		$mail->Password = 'Cs5129606';                      // SMTP password
		$mail->Port = 25;                                   // TCP port to connect to
		$mail->setFrom('cs5129606@gmail.com', 'Test Email Importance');
		$mail->addAddress($email);               // Name is optional
		$mail->addAttachment('/Applications/MAMP/htdocs/file/abc.pdf','adb.pdf');   //Add attachments
		//$mail->AddEmbeddedImage('file/events.jpg', 'logo_2u');   //option name
		
		$mail->isHTML(true);                                  // Set email format to HTML
		$mail->Subject = 'Test Email Subject!';
		$mail->Body    = $htmlversion;
		$mail->AltBody = $textVersion;


	if(!$mail->send()) {
			echo 'Message could not be sent.';
			echo 'Mailer Error: ' . $mail->ErrorInfo;
	} else {
  	
		echo 'Message has been sent to User name : '.$name.' Email:  '.$email.'<br><br>';
 	
	}
}
?>