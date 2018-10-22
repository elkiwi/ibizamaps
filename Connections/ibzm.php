<?php


/*$hostname_ibzm = "localhost";
$database_ibzm = "maps_res_2012";
$username_ibzm = "root";
$password_ibzm = "root";
$ibzm = mysqli_pconnect($hostname_ibzm, $username_ibzm, $password_ibzm) or trigger_error(mysqli_error(),E_USER_ERROR); */

$hostname_ibzm = "localhost";
$database_ibzm = "wwwibiz_2013maps";
$username_ibzm = "admin";
$password_ibzm = "kiwi4796";
$ibzm = mysqli_connect($hostname_ibzm, $username_ibzm, $password_ibzm) or trigger_error(mysqli_error(),E_USER_ERROR);
?>