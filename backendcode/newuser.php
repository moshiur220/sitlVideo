<?php
include_once("config.php");
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if(isset($postdata) && !empty($postdata))
{
  $name = $request->userName;
  $pwd = $request->password;
   $email =$request->email;
  $mobile =$request->mobile;
  $sql = "INSERT INTO messageuser(userName, mobile, email, password) VALUES ('{$name}','{$mobile}','{$email}','{$pwd}')";
 // echo $sql;
if ($mysqli->query($sql) === TRUE) {
 
 
    $authdata = [
      'userName' => $name,
	  'status' =>true,
	  'email' => $email,
      'mobile' => $mobile,
      'Id'    => mysqli_insert_id($mysqli)
    ];
    echo json_encode($authdata);
 
}
else{
    echo json_encode(['message'=>"Change Email Address",'status' =>false]);
}
}
?>