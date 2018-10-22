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
$query_typelist = "SELECT * FROM type";
$typelist = mysqli_query($query_typelist, $ibzm);
$row_typelist = mysqli_fetch_assoc($typelist);
$totalRows_typelist = mysqli_num_rows($typelist);

mysqli_select_db($database_ibzm, $ibzm);
$query_nextmarkerid = "SHOW TABLE STATUS LIKE 'markers'";
$nextmarkerid = mysqli_query($query_nextmarkerid, $ibzm);
$row_nextmarkerid = mysqli_fetch_assoc($nextmarkerid);
$totalRows_nextmarkerid = mysqli_num_rows($nextmarkerid);


?>
<!doctype html>
<html lang="en-us">
<head>
<meta charset="utf-8">
<title>Añadir Resort</title>
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






<script src="http://maps.google.com/maps?file=api&amp;v=3&amp;key=AIzaSyAfUinhMrZXJwn5qi-KdXIdwfIWgFpL1IY&sensor=false"   type="text/javascript"></script>











<script type="text/javascript">
 //<![CDATA[
function initialize() {
      if (GBrowserIsCompatible()) {
        var map = new GMap2(document.getElementById("map"));
		map.addControl(new GSmallMapControl());
      	map.addControl(new GMapTypeControl());
		map.addControl(new GOverviewMapControl(new GSize(175,100)));
        map.setCenter(new GLatLng(0, 0), 1);

		GEvent.addListener(map, "moveend", function() {
          var lat = map.getCenter().lat();
		  var lng = map.getCenter().lng();
    document.getElementById("lat1").innerHTML = lat.toString();
		  document.getElementById("lng1").innerHTML = lng.toString();
		  document.getElementById("lat").value = lat;
		  document.getElementById("lng").value = lng;
		  xhair.setPoint(map.getCenter());
	  	  xhair.redraw(true);
		   });

		var Icon = new GIcon();
      	Icon.image = "/images/maps/crosshair.png";
      	Icon.iconSize = new GSize(15, 15);
     	Icon.shadowSize = new GSize(0,0);
     	Icon.iconAnchor = new GPoint(7, 7);
     	Icon.infoWindowAnchor = new GPoint(7, 7);
     	Icon.infoShadowAnchor = new GPoint(7, 7);

		var xhair = new GMarker(map.getCenter(), Icon);
      	map.addOverlay(xhair);

      }
    }



	    //]]>
    </script>
</head>
 <body onLoad="initialize()" onUnload="GUnload()">
<header>
	<div><br />
		<h2 style="padding-left: 20px;">Add new resort</h2>
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
-->
		<div id="searchbox">
			<form id="searchform" autocomplete="off">
				<input type="search" name="query" id="search" placeholder="Search">
			</form>
		</div>
		<ul id="searchboxresult">
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

<div class="g12">
<div class="g4">
<form id="marker" name="marker" method="POST" action="resort_add_2.php" data-ajax="false">


<fieldset>
<label>Title</label>
<input name="title" type="text" id="title" size="20" required />

<label>Type</label>

<select name="type" id="type" required >
<option value="">Select</option>
<?php
do {
?>
<option value="<?php echo $row_typelist['idtype']?>"><?php echo $row_typelist['markertype']?></option>
<?php
} while ($row_typelist = mysqli_fetch_assoc($typelist));
  $rows = mysqli_num_rows($typelist);
  if($rows > 0) {
      mysqli_data_seek($typelist, 0);
	  $row_typelist = mysqli_fetch_assoc($typelist);
  }
?>
</select>
<br />

<input name="lat" type="hidden" id="lat" required />
<input name="lng" type="hidden" id="lng" required />
<input name="id" type="hidden" id="id" value="<?php echo $row_nextmarkerid['Auto_increment']; ?>"/>

<br />
Latitude: <div id="lat1" class="red">You must move the map to position</div>
Longitude: <div id="lng1" class="red">You must move the map to position</div>
<br />
<label>Instructions</label>
<section>

<div>
<ol><li>Enter title</li>
<li>Select type</li>
<li>Drag the map and zoom<br />
until the red cross is on location</li>
<li>Click "NEXT"</li>

</ol></div>
</section>
<section>

<button class="submit green" name="ir" value="submit">NEXT</button>
</section>
</fieldset>

</div>

<div class="g6">
<div id="map" style="margin-left:5px; width: 800px; height: 500px; float:left;"></div>


</div>
<input type="hidden" name="MM_insert" value="marker" />

</form>


</div>
</div>
</section>
<footer>Copyright by kiwi-designed.com 2011</footer>
</body>
</html>
