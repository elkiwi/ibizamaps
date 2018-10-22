<?php require_once('Connections/newmaps.php'); 
require_once($_SERVER['DOCUMENT_ROOT'].'/includes/functions_details.php');?>
<?php 


if (isset($_GET['lang'])) {
  $lang = $_GET['lang'];
}

else $lang = 'en';


$colname_infopages = "-1";
if (isset($_GET['type'])) {
  $colname_infopages = $_GET['type'];
}

mysql_select_db($database_newmaps, $newmaps);
$query_places = "SELECT 
`markers`.`name_$lang`,
`municipal`.`muniurl`,
`type`.`typeurl`,
`markers`.`id`
FROM
`markers`
Inner Join `contact` ON `contact`.`idcontact` = `markers`.`id`
Inner Join `municipal` ON `municipal`.`idmunicipal` = `contact`.`municipal`
Inner Join `type` ON `type`.`idtype` = `markers`.`type`
WHERE
`markers`.`type` =  '22'";
$places = mysql_query($query_places, $newmaps) or die(mysql_error());
$row_places = mysql_fetch_assoc($places);
$totalRows_places = mysql_num_rows($places);


mysql_select_db($database_newmaps, $newmaps);
$query_munilinks = "SELECT
municipal.idmunicipal,
municipal.name_ca,
municipal.name_es,
municipal.name_en,
municipal.muniurl,
`type`.typeurl
FROM
markers
Inner Join contact ON contact.idcontact = markers.id
Inner Join municipal ON municipal.idmunicipal = contact.idcontact
Inner Join `type` ON `type`.idtype = markers.`type`";

$munilinks = mysql_query($query_munilinks, $newmaps) or die(mysql_error());
$row_munilinks = mysql_fetch_assoc($munilinks);
$totalRows_munilinks = mysql_num_rows($munilinks);

mysql_select_db($database_newmaps, $newmaps);
$query_List = "SELECT DISTINCT
markers.name_$lang AS title_$lang,
markers.type,
contact.address,
contact.telephone,
contact.municipal,
contact.impage,
pages_$lang.summary,
markers.id,
`type`.typeurl,
`type`.idtype,
area.area_$lang,
municipal.name_ca,
municipal.name_es,
municipal.name_en,
municipal.muniurl,
accom.stars
FROM
markers
Left Join `type` ON `type`.idtype = markers.`type`
Left Join contact ON contact.idcontact = markers.id
Left Join pages_$lang ON pages_$lang.idpage = markers.id
Left Join area ON area.idarea = contact.area
Left Join municipal ON municipal.idmunicipal = contact.municipal
Left Join accom ON accom.idaccom = markers.id
WHERE impage = 1
ORDER BY municipal.name_ca ASC, markers.type ASC";


$List = mysql_query($query_List, $newmaps) or die(mysql_error());
$row_List = mysql_fetch_assoc($List);
$totalRows_List = mysql_num_rows($List);

// nested loop vars reset
$lastTFM_nest = "";
$lastTFM2_nest = "";


?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<title>Ibiza <?php echo $translate['Distance calculator'][''.$lang.'']?></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="description" content="<?php echo $row_infopages['metadesc']; ?>" />
<script type="text/javascript" src="/ddtabmenufiles/ddtabmenu.js">



</script>
<link rel="stylesheet" type="text/css" href="/ddtabmenufiles/glowtabs.css" />
<link href="/ibizamaps.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
//SYNTAX: ddtabmenu.definemenu("tab_menu_id", integer OR "auto")
ddtabmenu.definemenu("ddtabs2", 0) //initialize Tab Menu #1 with 1st tab selected

</script>
<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAA5kVkUGzRIT3xPoAKGaKYthQ78Sz2AJkJedwABS5wMh3H4uTgXRRGg1Q2OY1hDaq2gVMN77V-KvVTiA"
      type="text/javascript"></script>

<script type="text/javascript" src="/includes/distance.js" ></script>
</head>
<?php flush(); ?>
<body onload="loadGMap();" onunload="GUnload();">
<div id="container" align="center">
<div id="content" align="left">
<div class="top">
<div class="topMap"><script type="text/javascript"><!--
google_ad_client = "ca-pub-8283575214062599";
/* 468x60, created 04/02/09 */
google_ad_slot = "5069706757";
google_ad_width = 468;
google_ad_height = 60;
//-->
</script>
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script></div>
<?php include ($_SERVER['DOCUMENT_ROOT'].'/includes/top.menu.html');?>
<div class="tabcontainer">
<?php include ($_SERVER['DOCUMENT_ROOT'].'/includes/sub.menu.html');?>
</div>
</div>
<?php include($_SERVER['DOCUMENT_ROOT'].'/includes/side.nav.html');?>
<div class="textcontent">

<div class="checkboxlabel">
<h1>Ibiza <?php echo $translate['Distance calculator h1'][''.$lang.'']?></h1>
</div>

<div id="googlemap" style="width: 100%; height: 530px;">

<div id="map" style="margin-left:5px; margin-right:10px; width: 580px; height: 530px; float:left;"></div>
<div class="distinfo">

<?php echo $translate['Distance instruct'][''.$lang.'']?>
<p>
<input style="margin-top: 10px;" type="button" value="<?php echo $translate['Distance clear last'][''.$lang.'']?>" onclick="clearLastLeg();"/>
<input style="margin-top: 10px;" type="button" value="<?php echo $translate['Distance clear all'][''.$lang.'']?>" onclick="clearRoute();"/>
<br />
<!--<input type="radio" name="dist" onclick="toggleUnits('MILES');"  />
miles
<input type="radio" name="dist" onclick="toggleUnits('KMS');" checked="checked"/>
kms&nbsp;&nbsp;<br /> -->
<br />
<strong><?php echo $translate['Distance total'][''.$lang.'']?></strong>
<input style="display: inline;" id="distance" type="text" size="4" value="0.000"/>
<span id="units"></span></p>
<p><?php echo $translate['Distance priceday'][''.$lang.'']?><br />
<div id ="priceday" style="font-weight:bold;">3.25&euro; flag fall - 98c/Km</div></p>
<p><?php echo $translate['Distance pricenight'][''.$lang.'']?><br />
<div id ="pricenight" style="font-weight:bold;">3.25&euro; flag fall - 1.20c/Km</div></p>
<?php echo $translate['Distance sendfriend'][''.$lang.'']?>
</div>
</div>
<p><br />
	<br />
	<strong>Radiotaxi Eivissa</strong> - tel. 971 39 84 83<br />
	<strong>Radiotaxi Sant Josep</strong> - tel. 971 80 00 80<strong><br />
		Radiotaxi Sant Antoni</strong> - tel. 971 34 37 64<strong><br />
			Radiotaxi Santa Eulària</strong> - tel. 971 33 33 33<strong><br />
	</strong><strong>Radiotaxi</strong><strong> Sant Joan</strong> - tel. 971 33 33 33	</p>
<p>&nbsp;</p>
<p>
	
</p>
</div>
<br clear="all" /><br />
<?php include('includes/footerlinks.php');?>


<img src="/ddtabmenufiles/media/btm.gif" alt="ibiza maps" width="960" height="56" /></div>
</div>
</script>

<?php include('includes/google_analytics.php');?>

<!-- Woopra Code Start -->
<script type="text/javascript">
    var _wh = ((document.location.protocol=='https:') ? "https://sec1.woopra.com" : "http://static.woopra.com");
    document.write(unescape("%3Cscript src='" + _wh + "/js/woopra.js' type='text/javascript'%3E%3C/script%3E"));
</script>
<!-- Woopra Code End -->
</body>
</html>
<?php


mysql_free_result($munilinks);

?>
