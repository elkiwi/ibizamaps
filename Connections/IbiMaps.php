<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
$hostname_IbiMaps = "localhost";
$database_IbiMaps = "wwwibiz_mapdata";
$username_IbiMaps = "wwwibiz_elkiwi";
$password_IbiMaps = "kiwi4796";
$IbiMaps = mysqli_pconnect($hostname_IbiMaps, $username_IbiMaps, $password_IbiMaps) or trigger_error(mysqli_error(),E_USER_ERROR);
?>