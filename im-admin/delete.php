<?php require_once('../Connections/ibzm.php'); ?>
<?php

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



$colname_delete = "";
if (isset($_GET['id'])) {
  $colname_delete = $_GET['id'];
 
}

if (!isset($colname_delete)){
die('No ID set!'); 
}





/**
 * Delete a file, or a folder and its contents (recursive algorithm)
 *
 * @author      Aidan Lister <aidan@php.net>
 * @version     1.0.3
 * @link        http://aidanlister.com/repos/v/function.rmdirr.php
 * @param       string   $dirname    Directory to delete
 * @return      bool     Returns TRUE on success, FALSE on failure
 */
function rmdirr($dirname)
{
    // Sanity check
    if (!file_exists($dirname)) {
        return false;
    }

    // Simple delete for a file
    if (is_file($dirname) || is_link($dirname)) {
        return unlink($dirname);
    }

    // Loop through the folder
    $dir = dir($dirname);
    while (false !== $entry = $dir->read()) {
        // Skip pointers
        if ($entry == '.' || $entry == '..') {
            continue;
        }

        // Recurse
        rmdirr($dirname . DIRECTORY_SEPARATOR . $entry);
    }

    // Clean up
    $dir->close();
    return rmdir($dirname);
}





$dirremove = $_SERVER['DOCUMENT_ROOT'] . '/images/pages/' . $colname_delete;

rmdirr($dirremove);





mysql_select_db($database_ibzm, $ibzm);
$query_delete = sprintf("DELETE FROM markers WHERE id = %s", GetSQLValueString($colname_delete, "int"));
$delete = mysql_query($query_delete, $ibzm) or die(mysql_error());

$query_delete = sprintf("DELETE FROM beaches WHERE idbeach = %s", GetSQLValueString($colname_delete, "int"));
$delete = mysql_query($query_delete, $ibzm) or die(mysql_error());

$query_delete = sprintf("DELETE FROM contact WHERE idcontact = %s", GetSQLValueString($colname_delete, "int"));
$delete = mysql_query($query_delete, $ibzm) or die(mysql_error());

$query_delete = sprintf("DELETE FROM accom WHERE idaccom = %s", GetSQLValueString($colname_delete, "int"));

$delete = mysql_query($query_delete, $ibzm) or die(mysql_error());
$query_delete = sprintf("DELETE FROM pages_en WHERE idpage_en = %s", GetSQLValueString($colname_delete, "int"));

$delete = mysql_query($query_delete, $ibzm) or die(mysql_error());
$query_delete = sprintf("DELETE FROM pages_es WHERE idpage_es = %s", GetSQLValueString($colname_delete, "int"));

$delete = mysql_query($query_delete, $ibzm) or die(mysql_error());
$query_delete = sprintf("DELETE FROM image_order WHERE marker_id = %s", GetSQLValueString($colname_delete, "int"));

$delete = mysql_query($query_delete, $ibzm) or die(mysql_error());



 $deleteGoTo = "main.php";
  
  header(sprintf("Location: %s", $deleteGoTo));

mysql_free_result($delete);

mysql_free_result($imagesDelete);
?>
