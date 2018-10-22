<?php require_once('../Connections/ibzm.php');

session_cache_expire(180);
session_start();

/*if(!isset($_SESSION['user'])){
header("Location: index.php");
}*/



$_SESSION['MyIsLoggedInState'] = true;
$_SESSION['imagemanager.filesystem.path'] = "/home/wwwibiz/public_html/";
$_SESSION['imagemanager.filesystem.rootpath'] = "/home/wwwibiz/public_html/images/";




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


mysqli_select_db($database_ibzm, $ibzm);
$query_list = "SELECT
markers.id,
markers.`online`,
markers.name_en,
markers.type,
markers.lat,
markers.lng,
markers.date_added,
markers.date_modified,
markers.date_expires,
type.markertype,
type.typeurl,
municipal.name_es,
area.area_es,
markers.displayurl,
markers.nofollow
FROM
markers
INNER JOIN contact ON contact.idcontact = markers.id
INNER JOIN type ON type.idtype = markers.type
INNER JOIN municipal ON municipal.idmunicipal = contact.municipal
INNER JOIN area ON area.idarea = contact.area
ORDER BY markertype, name_en ASC";



$list = mysqli_query($query_list, $ibzm);
$row_list = mysqli_fetch_assoc($list);
$totalRows_list = mysqli_num_rows($list);







?>
<!doctype html>
<html lang="en-us">
<head>
<meta charset="utf-8">
<title>Ibiza Maps Admin</title>
<meta name="description" content="">
<meta name="author" content="revaxarts.com">
<!-- Google Font and style definitions -->
<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=PT+Sans:regular,bold">
<link rel="stylesheet" href="css/style.css">
<!-- include the skins (change to dark if you like) -->
<link rel="stylesheet" href="css/dark/theme.css" id="themestyle">
<!-- <link rel="stylesheet" href="css/dark/theme.css" id="themestyle"> -->
<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<link rel="stylesheet" href="css/ie.css">
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

<script src="js/all_wl.js"></script>
<!-- configuration to overwrite settings -->
<script src="js/config.js"></script>
<!-- the script which handles all the access to plugins etc... -->
<script src="js/script.js"></script>
</head>
<body>
<header>
	<div>
		<h1 style="padding-left:20px;">Ibiza Maps</h1><br>
		<span>Hi <?php echo $_SESSION['user'];?></span>
	</div>
	<div id="header">
		<!--
	<ul id="headernav">
				<li><ul>
					<li><a href="icons.html">Icons</a><span>300+</span></li>
					<li><a href="#">Submenu</a><span>4</span>
						<ul>
							<li><a href="#">Just</a></li>
							<li><a href="#">another</a></li>
							<li><a href="#">Dropdown</a></li>
							<li><a href="#">Menu</a></li>
						</ul>
					</li>
					<li><a href="login.html">Login</a></li>
					<li><a href="wizard.html">Wizard</a><span>Bonus</span></li>
					<li><a href="#">Errorpage</a><span>new</span>
						<ul>
							<li><a href="error-403.html">403</a></li>
							<li><a href="error-404.html">404</a></li>
							<li><a href="error-405.html">405</a></li>
							<li><a href="error-500.html">500</a></li>
							<li><a href="error-503.html">503</a></li>
						</ul>
					</li>
				</ul></li>
			</ul>

		<div id="searchbox">
			<form id="searchform" autocomplete="off">
				<input type="search" name="query" id="search" placeholder="Search">
			</form>
		</div>
		<ul id="searchboxresult">
		</ul>-->
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

	<div class="g12">
	<table width="800" border="0" align="center" cellpadding="5" cellspacing="0" class="datatable" >
<thead>
					<tr>
						<th>Fecha Añadido</th><th>Title</th><th>Type</th><th>Location</th><th>Display URL/NF</th><th>Edit</th><th>Online</th><th>Delete</th>
					</tr>
				</thead>


  <?php do { ?>
<tr>
<td><?php echo $row_list['date_added']; ?></td>
<td><?php echo $row_list['name_en']; ?></td>

<td><?php echo $row_list['markertype']; ?></td>
<td><?php echo $row_list['name_es'] . ' - ' . $row_list['area_es']; ?></td>
<td><?php echo ($row_list['displayurl'] == 0) ? '<span class="red">NO</span>' : '<span class="green">YES</span>';?> - <?php echo ($row_list['nofollow'] == 0) ? '<span class="red">NO</span>' : '<span class="green">YES</span>';?></td>
<td> <a href="resort_edit.php?id=<?php echo $row_list['id'];?>"><span class="red">Editar</span></a></td>

<td><?php echo ($row_list['online'] == 0) ? '<span class="red">OFFLINE</span>' : '<span class="green">ONLINE</span>';?></td>
<td width="16" align="right"><a href="delete.php?id=<?php echo $row_list['id'];?>" class="red" onClick="javascript:return confirm('Estas seguro que\nquieres borrar?\n \n <?php echo $row_list['name_en']; ?>');">X</a></td>
</tr>
<?php } while ($row_list = mysqli_fetch_assoc($list)); ?>
</table>

	</div>

<footer>Copyright by kiwi-designed.com 2011</footer>
</body>
</html>
<?php
mysqli_free_result($list);
mysqli_free_result($pages);
?>
