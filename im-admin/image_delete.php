<?php require_once('../Connections/ibzm.php'); ?>
<?php
if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "")
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysqli_real_escape_string") ? mysqli_real_escape_string($theValue) : mysqli_escape_string($theValue);

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



$colname_delete = "-1";
if (isset($_GET['photoid'])) {
$colname_delete = str_replace('item_' , '', $_GET['photoid']);

}

if (!isset($colname_delete)){
exit('No ID set!');
}

mysqli_select_db($database_ibzm, $ibzm);
$query_imagesDelete = "SELECT
image_order.filename,
markers.id AS marker_id,
image_order.id
FROM
image_order
INNER JOIN markers ON markers.id = image_order.marker_id
WHERE image_order.id = '$colname_delete'";
$imagesDelete = mysqli_query($query_imagesDelete, $ibzm);
$row_imagesDelete = mysqli_fetch_assoc($imagesDelete);
$totalRows_imagesDelete = mysqli_num_rows($imagesDelete);

//exit($query_imagesDelete);



$deletefile2 = $_SERVER['DOCUMENT_ROOT'] . 'images/pages/' . $row_imagesDelete['marker_id'] . '/' . str_replace('image300_', 'image800_', $row_imagesDelete['filename']);
unlink($deletefile2);

$deletefile4 = $_SERVER['DOCUMENT_ROOT'] . 'images/pages/' . $row_imagesDelete['marker_id'] . '/' . str_replace('image300_', 'image300_', $row_imagesDelete['filename']);
unlink($deletefile4);

$deletefile3 = $_SERVER['DOCUMENT_ROOT'] . 'images/pages/' . $row_imagesDelete['marker_id'] . '/' . str_replace('image300_', '', $row_imagesDelete['filename']);
unlink($deletefile3);

/*$deletefile = $_SERVER['DOCUMENT_ROOT'] . 'images/pages/' . $row_imagesDelete['marker_id'] . '/' . $row_imagesDelete['filename'];
unlink($deletefile);*/




$query_delete = "DELETE FROM image_order WHERE id = $colname_delete";

$delete = mysqli_query($query_delete, $ibzm);

echo 'success';


?>
