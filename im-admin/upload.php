<?php require_once('../Connections/ibzm.php'); ?>
<?php

if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;

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
      $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
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



$colname_marker = "-1";
if (isset($_POST['id'])) {
  $colname_marker = $_POST['id'];
}
mysql_select_db($database_ibzm, $ibzm);
$query_marker = sprintf("SELECT
`type`.typeurl_es
FROM
`type`
Inner Join property ON `type`.typeid = property.`type`
WHERE
property.propid = %s", GetSQLValueString($colname_marker, "int"));
$marker = mysql_query($query_marker, $ibzm) or die(mysql_error());
$row_marker = mysql_fetch_assoc($marker);
$totalRows_marker = mysql_num_rows($marker);

$typeurl = $row_marker['typeurl_es'];

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<title>Map of <?php echo $typeurl;?>, Ibiza Spain.</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link href="style.css" rel="stylesheet" type="text/css" />


</head>
<body>
<div id="container" align="center">
<div id="content" align="left">
<div class="top">
<img src="../images/ui/top.jpg" width="960" height="206" />
</div>

<div class="textcontentadmin">
<h1><?php echo $name; ?> Photos <a href="main.php">Admin home</a></h1>
<p>
<?php

error_reporting(E_ALL); 


// if no ref set, use dir called error
if ($typeurl == ''){
echo $typeurl;
$typeurl= 'error';
}

echo $_SERVER['DOCUMENT_ROOT'].'/images/pages/'.$typeurl.'/'.$colname_marker.'/';


// we first include the upload class, as we will need it here to deal with the uploaded file
include('classes/class.upload.php');


if ($_POST['action'] == 'multiple') {
	

    // ---------- MULTIPLE UPLOADS ----------

    // as it is multiple uploads, we will parse the $_FILES array to reorganize it into $files
    $files = array();
    foreach ($_FILES['my_field'] as $k => $l) {
        foreach ($l as $i => $v) {
            if (!array_key_exists($i, $files)) 
                $files[$i] = array();
            $files[$i][$k] = $v;
        }
    }

    // now we can loop through $files, and feed each element to the class
    foreach ($files as $file) {
    
        // we instanciate the class for each element of $file
        $handle = new Upload($file);
	
        
        // then we check if the file has been uploaded properly
        // in its *temporary* location in the server (often, it is /tmp)
        if ($handle->uploaded) {

            // now, we start the upload 'process'. That is, to copy the uploaded file
            // from its temporary location to the wanted location
            // It could be something like $handle->Process('/home/www/my_uploads/');
			$handle->file_new_name_body   = 'image600';
            $handle->image_resize         = true;
      		$handle->image_x              = 500;
			$handle->image_y              = 330;
      		$handle->image_ratio_fill      = true;
			$handle->image_background_color = '#000000';
			$handle->Process($_SERVER['DOCUMENT_ROOT']."/images/pages/".$typeurl."/".$colname_marker."/");
			
			$handle->file_new_name_body   = 'image115';
            $handle->image_resize         = true;
      		$handle->image_x              = 140;
			$handle->image_y              = 95;
			
			$handle->Process($_SERVER['DOCUMENT_ROOT']."/images/pages/".$typeurl."/".$colname_marker."/");

            // we check if everything went OK
            if ($handle->processed) {
                // everything was fine !
				
                echo '<div class="main_body"><fieldset>';
                echo '  <legend>file uploaded with success</legend>';
                echo '  <p>' . round(filesize($handle->file_dst_pathname)/256)/4 . 'KB</p>';
                
                echo '</fieldset></div>';
            } else {
                // one error occured
                echo '<div class="main_body"><fieldset>';
                echo '  <legend>file not uploaded to the wanted location</legend>';
                echo '  Error: ' . $handle->error . '';
                echo '</fieldset></div>';
            }
            
        } else {
            // if we're here, the upload file failed for some reasons
            // i.e. the server didn't receive the file
            echo '<div class="main_body"><fieldset>';
            echo '  <legend>file not uploaded on the server</legend>';
            echo '  Error: ' . $handle->error . '';
            echo '</fieldset></div>';
        }
    }
    


 $files = array();
    foreach ($_FILES['banner'] as $k => $l) {
        foreach ($l as $i => $v) {
            if (!array_key_exists($i, $files)) 
                $files[$i] = array();
            $files[$i][$k] = $v;
        }
    }

    // now we can loop through $files, and feed each element to the class
    foreach ($files as $file) {
    
        // we instanciate the class for each element of $file
        $handle = new Upload($file);
	
        
        // then we check if the file has been uploaded properly
        // in its *temporary* location in the server (often, it is /tmp)
        if ($handle->uploaded) {

            // now, we start the upload 'process'. That is, to copy the uploaded file
            // from its temporary location to the wanted location
            // It could be something like $handle->Process('/home/www/my_uploads/');
			$handle->file_new_name_body   = 'banner';
            $handle->image_resize         = false;
      		$handle->image_x              = 400;
			$handle->image_y              = 90;
      		
			$handle->Process($_SERVER['DOCUMENT_ROOT']."/images/pages/".$typeurl."/".$colname_marker."/");
			
			

            // we check if everything went OK
            if ($handle->processed) {
                // everything was fine !
				
                echo '<div class="main_body"><fieldset>';
                echo '  <legend>banner uploaded with success</legend>';
                echo '  <p>' . round(filesize($handle->file_dst_pathname)/256)/4 . 'KB</p>';
                
                echo '</fieldset></div>';
            } else {
                // one error occured
                echo '<div class="main_body"><fieldset>';
                echo '  <legend>banner not uploaded to the wanted location</legend>';
                echo '  Error: ' . $handle->error . '';
                echo '</fieldset></div>';
            }
            
        } else {
            // if we're here, the upload file failed for some reasons
            // i.e. the server didn't receive the file
            echo '<div class="main_body"><fieldset>';
            echo '  <legend>file not uploaded on the server</legend>';
            echo '  Error: ' . $handle->error . '';
            echo '</fieldset></div>';
        }
    }
    
} 


?>
</p>
<p align="center"><a href="main.php">Admin home</a></p>
</div>
</div>
</div>
</body>
</html>

