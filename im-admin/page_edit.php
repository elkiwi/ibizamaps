<?php require_once('../Connections/ibzm.php'); 

session_cache_expire(180);

$cache_expire = session_cache_expire();

session_start(); 

// Authenication
$mcImageManagerConfig['authenticator'] = "SessionAuthenticator"; // Tell it to use the session authenticator
$mcImageManagerConfig['authenticator.login_page'] = "main.php"; // <- URL to your login page if the user couldn't be verified

// SessionAuthenticator
$mcImageManagerConfig['SessionAuthenticator.logged_in_key'] = "MyIsLoggedInState"; // The name of the session to check for "true" in



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



$editFormAction = $_SERVER['PHP_SELF'];

if (isset($_SERVER['QUERY_STRING'])) {

  $editFormAction .= "?" . htmlentities($_SERVER['QUERY_STRING']);

}



if ((isset($_POST["MM_update"])) && ($_POST["MM_update"] == "form1")) {

$updateSQL = sprintf("UPDATE infopages_en SET title_en=%s, menuname_en=%s, metadesc_en=%s, html_en=%s WHERE idinfo_en=%s",
		GetSQLValueString($_POST['title_en'], "text"),
		GetSQLValueString($_POST['menuname_en'], "text"),
		GetSQLValueString($_POST['metadesc_en'], "text"),
		GetSQLValueString($_POST['html_en'], "text"),
		GetSQLValueString($_POST['page_id'], "int"));
mysql_select_db($database_ibzm, $ibzm);

$Result1 = mysql_query($updateSQL, $ibzm) or die(mysql_error());

$updateSQL = sprintf("UPDATE infopages_es SET title_es=%s, menuname_es=%s, metadesc_es=%s, html_es=%s WHERE idinfo_es=%s",
		GetSQLValueString($_POST['title_es'], "text"),
		GetSQLValueString($_POST['menuname_es'], "text"),
		GetSQLValueString($_POST['metadesc_es'], "text"),
		GetSQLValueString($_POST['html_es'], "text"),
		GetSQLValueString($_POST['page_id'], "int"));
mysql_select_db($database_ibzm, $ibzm);

$Result1 = mysql_query($updateSQL, $ibzm) or die(mysql_error());

$updateGoTo = "page_edit.php";

if (isset($_SERVER['QUERY_STRING'])) 
		{
    $updateGoTo .= (strpos($updateGoTo, '?')) ? "&" : "?";
    $updateGoTo .= $_SERVER['QUERY_STRING'];
  }
  header(sprintf("Location: %s", $updateGoTo));
}









$colname_edit = "-1";

if (isset($_GET['id'])) {
		$colname_edit = $_GET['id'];
}

if(!isset($colname_edit)){
		header("Location: index.php");
}





mysql_select_db($database_ibzm, $ibzm);

$query_edit = "SELECT
infopages_en.title_en,
infopages_es.title_es,
infopages_en.metadesc_en,
infopages_en.html_en,
infopages_es.metadesc_es,
infopages_es.html_es,
infopages_en.menuname_en,
infopages_en.infourl_en,
infopages_es.menuname_es,
infopages_es.infourl_es
FROM
infopages_en
INNER JOIN infopages_es ON infopages_es.idinfo_es = infopages_en.idinfo_en
WHERE
infopages_en.idinfo_en = $colname_edit";





$edit = mysql_query($query_edit, $ibzm) or die(mysql_error());

$row_edit = mysql_fetch_assoc($edit);

$totalRows_edit = mysql_num_rows($edit);

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"

"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<title>Edit Page</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
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

		document_base_url : "http://www.ibizamaps.net/",





		

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





	});

	

</script>

<!-- /TinyMCE -->

</head><body>
<header>
  <div><br />
  </div>
  <div id="header">
    <ul id="headernav">
      <li>
        <ul>
          <li><a href="javascript:history.back()">Back</a><span><</span></li>
        </ul>
      </li>
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
    <form id="form1" name="form1" method="POST" data-ajax="false" action="<?php echo $editFormAction; ?>">
      <input name="page_id" type="hidden" value="<?php echo $colname_edit; ?>" />
      <fieldset>
        <label>Page Title</label>
        <section>
          <label> <img src="/images/ui/flag_en.gif" alt="" /> Title </label>
          <div>
            <input name="title_en" type="text" value="<?php echo $row_edit['title_en']; ?>" size="50" />
          </div>
        </section>
         <section>
          <label> <img src="/images/ui/flag_es.gif" alt="" /> Título </label>
          <div>
            <input name="title_es" type="text" value="<?php echo $row_edit['title_es']; ?>" size="50" />
          </div>
        </section>
      </fieldset>
      <fieldset>
        <label>Short Menu Title</label>
        <section>
          <label><img src="/images/ui/flag_en.gif" alt="" /> Menu Title </label>
          <div>
            <input name="menuname_en" type="text" value="<?php echo $row_edit['menuname_en']; ?>" size="50" />
          </div>
        </section>
        <section>
          <label><img src="/images/ui/flag_es.gif" alt="" /> Título corto </label>
          <div>
            <input name="menuname_es" type="text" value="<?php echo $row_edit['menuname_es']; ?>" size="50" />
          </div>
        </section>
      </fieldset>
      <fieldset>
        <label>Meta Description</label>
        <section>
          <label><img src="/images/ui/flag_en.gif" alt="" /> Meta Desc </label>
          <div>
            <textarea name="metadesc_en"  class="metadesc" cols="40" rows="5"><?php echo $row_edit['metadesc_en']; ?></textarea>
          </div>
        </section>
         <section>
          <label><img src="/images/ui/flag_es.gif" alt="" /> Meta Descripción </label>
          <div>
            <textarea name="metadesc_es"  class="metadesc" cols="40" rows="5"><?php echo $row_edit['metadesc_es']; ?></textarea>
          </div>
        </section>
      </fieldset>
      <fieldset>
        <label>HTML</label>
        <section>
          <label><img src="/images/ui/flag_en.gif" alt="" /> HTML </label>
          <div>
            <textarea name="html_en" cols="30" rows="20" class="htmltext" id="textarea_wysiwyg"><?php echo $row_edit['html_en']; ?></textarea>
          </div>
        </section>
        <section>
          <label><img src="/images/ui/flag_es.gif" alt="" /> HTML </label>
          <div>
            <textarea name="html_es" cols="30" rows="20" class="htmltext" id="textarea_wysiwyg_2"><?php echo $row_edit['html_es']; ?></textarea>
          </div>
        </section>
      </fieldset>
      <fieldset>
        <section>
          <button class="submit green" >Save Page</button>
        </section>
      </fieldset>
      <input type="hidden" name="MM_update" value="form1" />
    </form>
  </div>
  </div>
</section>
<footer>Copyright by kiwi-designed.com 2011</footer>
</body>
</html>
<?php mysql_free_result($edit);?>