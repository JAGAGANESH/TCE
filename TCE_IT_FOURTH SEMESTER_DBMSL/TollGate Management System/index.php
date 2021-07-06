<?php
include("ConnectToDatabase.php");
?>
<!DOCTYPE HTML>
<html>
<title>Tollgate Management System</title>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="index.css">
<script src="index.js"></script>
</head>
<body>
<title1>
<t1><b>TOLL TAX MANAGEMENT SYSTEM</b></t1></br>
<t2 style="color:white;font-size:30px;">Department of Transport Service</t2>
</title1>
<div id="id01" class="modal">
  <div class="modal-content animate">
    <div class="imgcontainer">
      <img src="https://newsearchinnovation.github.io/NSI/Photos/nsi_logo.png" width="50" height="50">
    </div>
    <div class="container">
      <label for="uname"><b>User Id</b></label>
      <input type="text" placeholder="Enter User Id" name="uname" id="uname" required>
      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" id="psw" required>
      <button onclick="signIn()">Login</button>
    </div>
    <div class="container" style="background-color:#f1f1f1">
      <a href="https://newsearchinnovation.github.io/NSI/registeruser.nsi.in.html"><button type="button" class="cancelbtn">Register</button></a>
      <span class="psw">Forgot <a href="#">password?</a></span>
    </div>
  </div>
</div>
</body>
</html>