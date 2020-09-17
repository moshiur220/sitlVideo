<?php
include_once("config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{
	$sender = mysqli_real_escape_string($mysqli, trim($request->sender));
   $receiver = mysqli_real_escape_string($mysqli, trim($request->receiver));
$sql='';
	$sql = "SELECT * FROM message where sender='$sender' and receiver='$receiver'";
if($result = mysqli_query($mysqli,$sql))
{
 $rows = array();
  while($row = mysqli_fetch_assoc($result))
  {
    $rows[] = $row;
  }
 
  echo json_encode($rows);
}
else
{
  http_response_code(404);
}
}
?>