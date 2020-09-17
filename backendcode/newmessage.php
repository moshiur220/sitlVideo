<?php
include_once("config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{
  $sender = mysqli_real_escape_string($mysqli, trim($request->sender));
  $receiver = mysqli_real_escape_string($mysqli, trim($request->receiver));
  $message = mysqli_real_escape_string($mysqli, trim($request->message));

  $sql = "INSERT INTO message(sender,receiver,message) VALUES ('{$sender}','{$receiver}','{$message}')";
 // echo $sql;
if ($mysqli->query($sql) === TRUE) {

echo json_encode(['status'=>true]);
 
}
else{
    echo json_encode(['status'=>false]);
}
}
?>