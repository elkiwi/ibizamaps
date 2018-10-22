<?php require_once('../Connections/ibzm.php'); ?>
<?php
/*session_cache_expire(180);
$cache_expire = session_cache_expire();
session_start();

if(!isset($_SESSION['user'])){
header("Location: index.php");
}*/



mysqli_select_db($database_ibzm, $ibzm);

foreach ($_GET['item'] as $position => $item) {
$query_edit = "UPDATE `image_order` SET `position` = $position WHERE `id` = $item";
mysqli_query($query_edit, $ibzm);
$sql[] = "UPDATE `image_order` SET `position` = $position WHERE `id` = $item";
}

echo json_encode($sql);

?>




