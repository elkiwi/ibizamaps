<?php require_once('../Connections/ibzm.php'); ?>
<?php

session_cache_expire(180);
$cache_expire = session_cache_expire();
session_start(); 

if(!isset($_SESSION['user'])){
header("Location: index.php");
}

if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
	  $theValue = htmlspecialchars($theValue);
      break;    
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}
}


$editFormAction = $_SERVER['PHP_SELF'];
if (isset($_SERVER['QUERY_STRING'])) {
  $editFormAction .= "?" . htmlentities($_SERVER['QUERY_STRING']);
}

if ((isset($_POST["MM_insert"])) && ($_POST["MM_insert"] == "form1")) {
	

	  function normalise ($string){
		  $a = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞ
	  ßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŔŕ ';
		  $b = 'aaaaaaaceeeeiiiidnoooooouuuuy
	  bsaaaaaaaceeeeiiiidnoooooouuuyybyRr-';
		  $string = utf8_decode($string);    
		  $string = strtr($string, utf8_decode($a), $b);
		  $string = strtolower($string);
		  return utf8_encode($string);
	  }

   $data = normalise ( $_POST['area']);
   

  $insertSQL = sprintf("INSERT INTO area (area_es, areaurl, area_en) VALUES (%s, %s, %s)",
                       GetSQLValueString($_POST['area'], "text"),
                       GetSQLValueString($data, "text"),
                       GetSQLValueString($_POST['area'], "text"));

  mysql_select_db($database_ibzm, $ibzm);
  $Result1 = mysql_query($insertSQL, $ibzm) or die(mysql_error());

  $insertGoTo = "main.php";
 
  header(sprintf("Location: %s", $insertGoTo));
}


?>




<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<title>Add a new markeron Ibiza Maps</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link href="/style.css" rel="stylesheet" type="text/css" />
</head>
  <body onload="initialize()" onunload="GUnload()">

<div id="container" align="center">
<div id="content" align="left">
<div class="top">
<img src="../images/ui/top.jpg" width="900" height="193" /> 
</div>
<div class="textcontentadmin">
<form id="form1" name="form1" method="POST" action="<?php echo $editFormAction; ?>">
<table width="500" border="0" align="center" cellpadding="5" cellspacing="0">
<tr>
<td>&nbsp;</td>
<td><h2>Añadir nuevo Area</h2></td>
</tr>
<tr>
<td width="66"><strong>Area</strong></td>
<td width="414"><input type="text" name="area" id="area" /></td>
</tr>
<tr>
<td>&nbsp;</td>
<td><input type="submit" name="button" id="button" value="Submit" /></td>
</tr>
</table>
<input type="hidden" name="MM_insert" value="form1" />
</form>
<p align="center">&nbsp;</p>
</div>
<img src="../images/ui/btm.gif" width="900" height="52" />
</div>
</div>
</body>
</html>

