<?php
# FileName="Connection_php_mysql.htm"
# Type="MYSQL"
# HTTP="true"
$hostname_newmaps = "localhost";
$database_newmaps = "wwwibiz_ibzmaps";
$username_newmaps = "wwwibiz_pete";
$password_newmaps = "kiwi4796";
$newmaps = mysqli_pconnect($hostname_newmaps, $username_newmaps, $password_newmaps) or trigger_error(mysqli_error(),E_USER_ERROR);
?>