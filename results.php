<?php require_once('Connections/ith.php'); ?>
<?php include ('includes/functions.php');
$thepage = 'search';

$error = '';

if (isset($_GET['price'])){
$price = $_GET['price'];

	switch ($price) {
		case 0:
		unset ($price); // if price is 0 unset it so as not to be used in query
		break;
		
		case 1:
		$priceClause = '0 AND 500000 ';
		break;
		
		case 2:
		$priceClause = '500000 AND 1000000 ';
		break;
		
		case 3:
		$priceClause = '1000000 AND 3000000 ';
		break;
		
		case 4:
		$priceClause = '3000000 AND 100000000 ';
		break;
		
		
		default:
		unset ($price); // if price is 0 unset it so as not to be used in query
		
	
	}
}

if (isset($_GET['rooms'])){
$rooms = $_GET['rooms'];

	switch ($rooms) {
		case 0:
		unset ($rooms); // if price is 0 unset it so as not to be used in query
		break;
		
		case 1:
		$roomsClause = '1 AND 2 ';
		break;
		
		case 2:
		$roomsClause = '2 AND 3 ';
		break;
		
		case 3:
		$roomsClause = '3 AND 4 ';
		break;
		
		case 4:
		$roomsClause = '5 AND 50 ';
		break;
		
		
		
		default:
		unset ($rooms); // if price is 0 unset it so as not to be used in query
		
	
	}
}

if (isset($_GET['type'])){
$type = $_GET['type'];

	if ($type == 0) { // if type is 0 unset it so as not to be used in query
	unset($type);
	}
}

if (isset($_GET['zone'])){
$zone = $_GET['zone'];

	if ($zone == 0) unset($zone); // if zone is 0 unset it so as not to be used in query
}

if (isset($_GET['salerent'])){
$salerent = $_GET['salerent'];

if ($salerent == 'forsale') {
mysql_select_db($database_ith, $ith);
$query_list = "SELECT
details.propid,
details.reccommended,
details.`type`,
details.area,
details.zone,
details.date_added,
details.ref,
details.price,
details.onrequest,
detaildesc_$lang.title,
detaildesc_$lang.metadesc,
details.propid,
details.bedrooms,
details.online_$lang,
details.forsale,
`type`.typeurl_$lang,
`type`.typeurl_en AS typeurlen,
`type`.typeurl_es AS imagefolder,
`type`.typename,
details.livingarea,
details.landsize,
details.bathrooms,
zone.zoneurl,
zone.zonename,
area.area_es
FROM
details
Inner Join 
zone ON zone.zoneid = details.zone
Inner Join 
detaildesc_$lang ON detaildesc_$lang.detaildescid = details.detailid 
Inner Join 
`type` ON `type`.typeid = details.`type`
Inner Join 
details ON details.detailid = detaildesc_$lang.detaildescid
Inner Join 
area ON area.idarea = details.area

WHERE
`details`.`online_$lang` =  '1' ";

if (isset($type))
{
	if ($type == 1) 
	{ // mix villas and houses together
		$query_list .= "AND `type`.typeid IN  (1,8) ";	
	}	
	else // just show the normal type
	{
        $query_list .= "AND `type`.typeid =  '$type' ";
	}
}

if (isset($zone))
{
$query_list .= "AND
zone.zoneid =  '$zone' ";	
}

if (isset($price))
{
$query_list .= "AND
price BETWEEN $priceClause";	
}

if (isset($rooms))
{
$query_list .= "AND
bedrooms BETWEEN $roomsClause";	
}

$query_list .= "ORDER BY reccommended DESC, price ASC";

switch ($salerent) {
	
	case $translate['forsaleurl'][''.$lang.'']:
	$query_list .= "AND	`details`.`forsale` =  '1'";
	$titlesalerent = 'forsale';
	break;
	
    case $translate['forrenturl'][''.$lang.'']:	
	$query_list .= "AND	`details`.`forsale` =  '2'";
	$titlesalerent = 'forrent';
	break;
}

}

else {
	
mysql_select_db($database_ith, $ith);
$query_list = "SELECT
details.propid,
details.reccommended,
details.`type`,
details.area,
details.zone,
details.date_added,
details.ref,
details.price,
details.onrequest,
detaildesc_$lang.title,
detaildesc_$lang.metadesc,
details.propid,
details.bedrooms,
details.online_$lang,
details.forsale,
`type`.typeurl_$lang,
`type`.typeurl_en AS typeurlen,
`type`.typeurl_es AS imagefolder,
`type`.typename,
details.livingarea,
details.landsize,
details.bathrooms,
zone.zoneurl,
zone.zonename,
area.area_es
FROM
details
Inner Join 
zone ON zone.zoneid = details.zone
Inner Join 
detaildesc_$lang ON detaildesc_$lang.detaildescid = details.detailid 
Inner Join 
`type` ON `type`.typeid = details.`type`
Inner Join 
details ON details.detailid = detaildesc_$lang.detaildescid
Inner Join 
area ON area.idarea = details.area

WHERE
`details`.`online_$lang` =  '1' ";

if (isset($type))
{
	if ($type == 1) 
	{ // mix villas and houses together
		$query_list .= "AND `type`.typeid IN  (1,8) ";	
	}	
	else // just show the normal type
	{
        $query_list .= "AND `type`.typeid =  '$type' ";
	}
}

if (isset($zone))
{
$query_list .= "AND
zone.zoneid =  '$zone' ";	
}


if (isset($rooms))
{
$query_list .= "AND
bedrooms BETWEEN $roomsClause";	
}

$query_list .= "AND	`details`.`forsale` =  '2' ORDER BY reccommended DESC, price ASC";


	
}

}

$list = mysql_query($query_list, $ith) or die(mysql_error());
$row_list = mysql_fetch_assoc($list);
$totalRows_list = mysql_num_rows($list);

//$trans = new Latin1UTF8();

if ($totalRows_list == 0) {
$error = 1;

$updateGoTo = '/search.php?lang='.$lang.'&error='.$error.'';
 	
  header("Location: $updateGoTo");

}





if (isset($zone)) {
	
mysql_select_db($database_ith, $ith);
$query_zonename = sprintf("SELECT * FROM `zone` WHERE zoneurl = %s", GetSQLValueString($zone, "text"));
$zonename = mysql_query($query_zonename, $ith) or die(mysql_error());
$row_zonename = mysql_fetch_assoc($zonename);
$totalRows_zonename = mysql_num_rows($zonename);  

$zoneTitle = $row_zonename['zonename'];

}

if ($type == 'nuove-costruzioni' | $type == 'offplan' | $type == 'neubau' | $type == 'proyectos' ) 
	  {
	  $titletype = 'offplan';
	  }

else $titletype = $row_list['typeurlen'];


$luxtype = $row_list['type'];

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $translate['details'][''.$lang.''].' '.  $translate[''.$titlesalerent.''][''.$lang.'']; if (isset($zone)) echo ', ' .$zoneTitle; ?>, Ibiza</title>
<link href="/style.css" rel="stylesheet" type="text/css" />
<script src="/includes/functions.js" type="text/javascript"></script>



</head>
<body onload="MM_preloadImages('/images/maps/juan.gif','/images/maps/eulalia.gif','/images/maps/antonio.gif','/images/maps/ibiza.gif','/images/maps/jose.gif')">
<div id="container" align="center">
<div id="content" align="left">
<div id="top">
<img src="/images/ui/top.jpg" width="900" height="193" border="0" />
</div>


<div id="sidebar">

<div id="sidebarcontent">
<?php echo langFlags($thepage);
include('includes/navleft.php');?>
</div>

</div>


<div class="textcontent">
<h1> Resultados
</h1>

<?php if ($totalRows_list > 0) { ?>

<table width="700" border="0" cellspacing="5" cellpadding="5">
<tr>
<td colspan="2"><?php echo $translate['description'][''.$lang.''];?></td>
<td valign="top"><?php echo $translate['reference'][''.$lang.''];?></td>
<td valign="top"><?php echo $translate['price'][''.$lang.''];?></td>
</tr>
<?php 

do { 

?>  
<?php 

if ($row_list['forsale']==1)
	 
	  {
		   
	  $salerent = $translate['forsaleurl'][''.$lang.''];
		   
	  }

else  {
	
	  $salerent = $translate['forrenturl'][''.$lang.''];
	
	  }

$type = $row_list['typeurl_'.$lang.''];
$imagefolder = $row_list['imagefolder'];
$zoneurl = $row_list['zoneurl'];
$id = $row_list['propid'];?>

<tr>
<td width="115"><a href="
<?php echo '/'.$lang.'/'.$type.'/'.$salerent.'/'.$zoneurl.'/'.$id.'.html';

?>

"><img src="/images/pages/

<?php echo $imagefolder;

?>

/

<?php echo $id;

?>

/image115_1.jpg" alt="Alt" width="115" height="75" border="0" /></a></td>
<td width="377" valign="top"><a href="

<?php echo '/'.$lang.'/'.$type.'/'.$salerent.'/'.$zoneurl.'/'.$id.'.html';

?>

">

<?php echo $row_list['title'];

?>

</a> -<span class="orange"><?php echo $row_list['zonename'];

?></span><br />

<?php echo $row_list['metadesc'];?>

</td>
<td width="117" valign="middle">

<?php echo $row_list['ref'];  if ($row_list['reccommended'] == 1) echo '<br /><img src="/images/ui/recommended_'.$lang.'.gif" width="76" height="15" align="absmiddle" alt="'.$translate['recommended'][''.$lang.''].'" />'; if ($row_list['newbuild'] == 1) echo '<br /><img src="/images/ui/newbuild_'.$lang.'.gif" width="76" height="15" align="absmiddle" alt="'.$translate['recommended'][''.$lang.''].' " />';

?>

</td>
<td width="86" valign="middle">

<?php 

echo $langphrase['Price']['.$lang.'];
$onrequest = $row_list['onrequest'];
$number = $row_list['price'];

if($onrequest == 1){
		
		echo 'a consultar';

} else {
	
		$english_format_number = number_format($number, 0, '', '.') ;
		echo $english_format_number; echo "&nbsp;&euro;&nbsp;"; 

} 

?>

</td>
     
</tr>

<?php } while ($row_list = mysql_fetch_assoc($list)); ?>


</table>
<?php } else {?>

<p class="orange"><?php echo $translate['noresults'][''.$lang.''];?></p>

<?php } ?>


</div>
<!-- /textcontent -->


<div id="cleardiv"><br />
</div>

<?php include('includes/btmnav.php');?>
<img src="/images/ui/btm.gif" width="900" height="52" alt="Ibiza Top House" />
</div><!-- /container -->
</div><!-- /content -->
<script src="http://www.google-analytics.com/urchin.js" type="text/javascript">
</script>
<script type="text/javascript">
_uacct = "UA-512507-1";
urchinTracker();
</script>

</body>
</html>
<?php


mysql_free_result($list);
?>
