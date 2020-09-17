<?php
include_once("config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($postdata) && !empty($postdata))
{
	$pwd = mysqli_real_escape_string($mysqli, trim($request->password));
   $email = mysqli_real_escape_string($mysqli, trim($request->email));
$sql='';
	$sql = "SELECT * FROM messageuser where email='$email' and password='$pwd'";
if($result = mysqli_query($mysqli,$sql))
{
     $rows = array();
  while($row = mysqli_fetch_assoc($result))
  {
    $rows[] = $row;
  }
    $rowcount=mysqli_num_rows($result);
    if($rowcount===1){
        echo json_encode(['status'=>true,'userData'=>$rows]);
    }
    else{
        echo json_encode(['status'=>false]);
    }
//  $rows = array();
//   while($row = mysqli_fetch_assoc($result))
//   {
//     $rows[] = $row;
//   }
 
//   echo json_encode($rows);




}
else
{
  http_response_code(404);
}
}
?>