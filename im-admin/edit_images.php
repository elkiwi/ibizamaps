<?php require_once('../Connections/ibzm.php');
session_cache_expire(180);
$cache_expire = session_cache_expire();
session_start();

if(!isset($_SESSION['user'])){
header("Location: index.php");
}
?>
<?php



if (isset($_GET['id'])) {
  $id = $_GET['id'];

}


if (isset($_GET['type'])) {
  $type = $_GET['type'];

}



mysqli_select_db($database_ibzm, $ibzm);
$query_imagesDelete = "SELECT
`type`.typeurl_es,
property.propid
FROM
property
Inner Join `type` ON `type`.typeid = property.`type`
WHERE property.propid =  $id";
$imagesDelete = mysqli_query($query_imagesDelete, $ibzm);
$row_imagesDelete = mysqli_fetch_assoc($imagesDelete);
$totalRows_imagesDelete = mysqli_num_rows($imagesDelete);


$path = $_SERVER['DOCUMENT_ROOT'] . '/images/pages/'.$row_imagesDelete['typeurl_es'].'/'.$row_imagesDelete['propid'].'';


if(isset($_POST['file']) && is_array($_POST['file']))
{
	foreach($_POST['file'] as $file)
	{
		unlink($path . "/" . $file) or die("Failed to delete file");
	}
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<title>Añadir fotos</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link href="/style.css" rel="stylesheet" type="text/css" />

</head>
<body>
<div id="container" align="center">
<div id="content" align="left">
<div class="top"><img src="../images/ui/top.jpg" width="900" height="193" /></div>

<div class="textcontentadmin">
<h1 align="center">Añadir Photos | <a href="main.php">Inicio</a> </h1>
<?php echo '<h2 align="center">Dir = '.$path.'</h2>'; ?>
<form id="images" name="images" method="POST" enctype="multipart/form-data" action="upload.php">
<?php if ($type == 11)  { ?>
<table width="30%" border="0" cellpadding="5" cellspacing="0">
<tr>
<td width="603"><input type="file" size="15" name="banner[]" value="" id="banner" />
&lt;--- <span class="red">Incluir Banner aqui </span></td>
</tr>
</table><hr /><?php } ?>
<p align="center">&nbsp;</p>
<table width="30%" border="0" align="left" cellpadding="0" cellspacing="0">
<tr>
<td width="70%"><input type="file" size="15" name="my_field[]" value="" />
<span class="red">** </span></td>
</tr>
<tr>
<td><input type="file" size="15" name="my_field[]" value="" /></td>
</tr>
<tr>
<td><input type="file" size="15" name="my_field[]" value="" /></td>
</tr>
<tr>
<td><input type="file" size="15" name="my_field[]" value="" /></td>
</tr>
<tr>
<td><input type="file" size="15" name="my_field[]" value="" /></td>
</tr>
<tr>
<td><input type="file" size="15" name="my_field[]" value="" /></td>
</tr>
<tr>
<td><input type="file" size="15" name="my_field[]" value="" /></td>
</tr>
<tr>
<td><input type="file" size="15" name="my_field[]" value="" id="banner" /></td>
</tr>
<tr>
<td align="center"><br /><input type="submit" name="Submit" value="Subir Fotos" /></td>
</tr>
</table>
<input type="hidden" name="action" value="multiple" />
<input type="hidden" name="id" value="<?php echo $id;?>" />
</form>




<form name="form1" method="post">
<?php
$path = '/home/ithcom/www/images/pages/'.$row_imagesDelete['typeurl_es'].'/'.$row_imagesDelete['propid'].'';
$dir_handle = @opendir($path) or die("Unable to open folder");


echo '<table width="20%" border="0" cellpadding="5" cellspacing="0" align="left">';

$files = array();
while ($files[] = readdir($dir_handle));
sort($files);


foreach ($files as $file) {

if ($file== '.' || $file == '..' || $file == '' || substr("$file", -9, 3) == "600")  {
            continue;
        }

echo '<tr><td><input type="CHECKBOX" name="file[]" value="'.$file.'">'.$file.'</td>';

echo '<td><img src="/images/pages/'.$row_imagesDelete['typeurl_es'].'/'.$row_imagesDelete['propid'].'/'.$file.'" alt="'.$file.'" height="50"></td></tr>';

}
echo '<tr><td></td></tr></table>';
closedir($dir_handle);


$dir_handle = @opendir($path) or die("Unable to open folder");

echo '<table width="20%" border="0" cellpadding="5" cellspacing="0" align="left">';

$files = array();
while ($files[] = readdir($dir_handle));
sort($files);


foreach ($files as $file) {

if ($file== '.' || $file == '..' || $file == '' || substr("$file", -9, 3) == "115"  || substr("$file", -9, 3) == "ner")  {
            continue;
        }

echo '<tr><td><input type="CHECKBOX" name="file[]" value="'.$file.'">'.$file.'</td>';

echo '<td><img src="/images/pages/'.$row_imagesDelete['typeurl_es'].'/'.$row_imagesDelete['propid'].'/'.$file.'" alt="'.$file.'" height="50"></td></tr>';

}
echo '<tr><td><input type="submit" name="Delete" value="Delete"></td></tr></table>';
closedir($dir_handle);
?>


</form>




<div id="cleardiv"></div>

</div>
<img src="/images/ui/btm.gif" width="900" height="52" /></div>
</div>
</body>
</html>

