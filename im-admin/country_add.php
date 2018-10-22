<?php require_once('../Connections/ibzm.php'); 
session_cache_expire(180);
$cache_expire = session_cache_expire();
session_start(); 

if(!isset($_SESSION['user'])){
header("Location: index.php");
}



?>
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

mysql_select_db($database_ibzm, $ibzm);
$query_countries = "SELECT * FROM countries WHERE countries.active =  0 ORDER BY name ASC";
$countries = mysql_query($query_countries, $ibzm) or die(mysql_error());
$row_countries = mysql_fetch_assoc($countries);
$totalRows_countries = mysql_num_rows($countries);


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
	
	$ccode = $_POST['country'];
	

  $insertSQL = "UPDATE countries SET `active`='1' WHERE (`code`='$ccode')  ";

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
<title>Add Country</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
<link href="css/style.css" rel="stylesheet" type="text/css" />



<!-- Google Font and style definitions -->
<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=PT+Sans:regular,bold">

<!-- include the skins (change to dark if you like) -->
<link rel="stylesheet" href="css/dark/theme.css" id="themestyle">
<!-- <link rel="stylesheet" href="/css/light/theme.css" id="themestyle"> -->
<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<link rel="stylesheet" href="/css/ie.css">
	<![endif]-->
<!-- Apple iOS and Android stuff -->
<meta name="apple-mobile-web-app-capable" content="no">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<link rel="apple-touch-icon-precomposed" href="apple-touch-icon-precomposed.png">
<!-- Apple iOS and Android stuff - don't remove! -->
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,maximum-scale=1">
<!-- Use Google CDN for jQuery and jQuery UI -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js"></script>
<!-- Loading JS Files this way is not recommended! Merge them but keep their order -->
<!-- some basic functions -->
<script src="js/functions.js"></script>
<!-- all Third Party Plugins and Whitelabel Plugins -->
<script src="js/plugins.js"></script>
<script src="js/editor.js"></script>
<script src="js/calendar.js"></script>
<script src="js/flot.js"></script>
<script src="js/elfinder.js"></script>
<script src="js/datatables.js"></script>
<script src="js/wl_Alert.js"></script>
<script src="js/wl_Autocomplete.js"></script>
<script src="js/wl_Breadcrumb.js"></script>
<script src="js/wl_Calendar.js"></script>
<script src="js/wl_Chart.js"></script>
<script src="js/wl_Color.js"></script>
<script src="js/wl_Date.js"></script>
<script src="js/wl_Editor.js"></script>
<script src="js/wl_File.js"></script>
<script src="js/wl_Dialog.js"></script>
<script src="js/wl_Fileexplorer.js"></script>
<script src="js/wl_Form.js"></script>
<script src="js/wl_Gallery.js"></script>
<script src="js/wl_Multiselect.js"></script>
<script src="js/wl_Number.js"></script>
<script src="js/wl_Password.js"></script>
<script src="js/wl_Slider.js"></script>
<script src="js/wl_Store.js"></script>
<script src="js/wl_Time.js"></script>
<script src="js/wl_Valid.js"></script>
<script src="js/wl_Widget.js"></script>
<!-- configuration to overwrite settings -->
<script src="js/config.js"></script>
<!-- the script which handles all the access to plugins etc... -->
<script src="js/script.js"></script>

<!-- TinyMCE -->
<script type="text/javascript" src="tinymce/jscripts/tiny_mce/tiny_mce.js"></script>

<script type="text/javascript">
	tinyMCE.init({
		// General options
		mode : "specific_textareas",
	    editor_selector : "htmltext",
		theme : "advanced",
		width : "600",
		relative_urls : false,
		document_base_url : "http://www.ibizatophouse.com/",


		
		plugins : "media,style,advhr,advimage,imagemanager,advlink,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,inlinepopups",

		// Theme options
		theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,|,image,insertimage,media",
		theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,imanager,cleanup,code,|,forecolor,backcolor",
		theme_advanced_buttons3 : "",
		theme_advanced_buttons4 : "",
		theme_advanced_toolbar_location : "top",
		theme_advanced_toolbar_align : "left",
		theme_advanced_statusbar_location : "bottom",
		theme_advanced_resizing : true,

		// Example word content CSS (should be your site CSS) this one removes paragraph margins
		content_css : "css/word.css",

		// Drop lists for link/image/media/template dialogs
		template_external_list_url : "lists/template_list.js",
		external_link_list_url : "lists/link_list.js",
		external_image_list_url : "lists/image_list.js",
		media_external_list_url : "lists/media_list.js",

		// Replace values for the template plugin
		template_replace_values : {
			username : "",
			staffid : ""
		}
	});
	
</script>
<!-- /TinyMCE -->


</head>
<body>
<header>
	<div><br />
		
	</div>
	<div id="header">

	<ul id="headernav">
				<li><ul>
					<li><a href="javascript:history.back()">Back</a><span><</span></li>
					
					
					
					
					
				</ul></li>
			</ul>

		
	</div>
</header>

<nav>
	<ul id="nav">
		<?php include('mainnav.php');?>
		
	</ul>
</nav>
<!--<div id="pageoptions">
	<ul>
		<li><a href="login.html">Logout</a></li>
		<li><a href="#" id="wl_config">Configuration</a></li>
		<li><a href="#">Settings</a></li>
	</ul>
	<div>
		<h3>Place for some configs</h3>
		<p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores.</p>
	</div>
</div>-->
<section id="content">
<h2 style="padding-left: 20px; color: red;" class="red"><?php echo $row_edit['title'] ;?></h2>
	<div class="g12 nodrop">
    
<form id="form1" name="form1" method="POST" action="<?php echo $editFormAction; ?>">
<h2>Add a new country</h2>

<fieldset>

<label>Add Country</label>
<section>

<label> Name </label>
<div><select name="country" id="country">
<?php
do {  
?>
	<option value="<?php echo $row_countries['code']?>"><?php echo  utf8_encode($row_countries['name'])?></option>
	<?php
} while ($row_countries = mysql_fetch_assoc($countries));
  $rows = mysql_num_rows($countries);
  if($rows > 0) {
      mysql_data_seek($countries, 0);
	  $row_countries = mysql_fetch_assoc($countries);
  }
?>
</select>
</div>
</section>


</fieldset>






<fieldset>
<section>
<button class="submit green" >Add country</button>
</section>


</fieldset>


<input type="hidden" name="MM_insert" value="form1" />
</form>

     </div>
	</div>
</section>
<footer>Copyright by kiwi-designed.com 2011</footer>
</body>
</html>
<?php
mysql_free_result($countries);
?>
