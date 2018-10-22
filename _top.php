<?php
/**
 * @package Website_Template
 * @since Website 1.0
 */

// -----------------------------------------------------------------------------

	// PHP configuration
	$website_config = array(
		'scheme'        => 'bright',
		'cookie_prefix' => 'websiteVk3q-'
	);
	
	require ('Connections/ibzm.php');
	require ('includes/functions.php');
	require ('includes/lang.php');
	
	mysql_select_db($database_ibzm, $ibzm);
	$query_menu = "SELECT idinfo_$lang, title_$lang, infourl_$lang, menuname_$lang FROM infopages_$lang WHERE menuname_$lang <> ''" ;
	$menu = mysql_query($query_menu, $ibzm) or die(mysql_error());
	$row_menu = mysql_fetch_assoc($menu);
	$totalRows_menu = mysql_num_rows($menu);
	
	//echo $muni;
	
	switch ($thepage){
		
		case 'list':
		require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/functions_details.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/details_lib.php');
		
		$colname_detail = "-1";
		if (isset($_GET['muni'])) {
		  $muni = $_GET['muni'];
				
		} else {
			unset($muni);
		}
		 //exit ($muni);
		$colname_location = "-1";
		if (isset($_GET['id'])) {
		  $colname_location = $_GET['id'];
		}
		
		
		
		$colname_infopages = "-1";
		if (isset($_GET['type'])) {
		  $colname_infopages = $_GET['type'];
		}
		
		
		
		
		mysql_select_db($database_ibzm, $ibzm);
		$query_infopages = sprintf("SELECT * FROM infopages_$lang WHERE infourl_$lang = %s", GetSQLValueString($colname_infopages, "text"));
		$infopages = mysql_query($query_infopages, $ibzm) or die(mysql_error());
		$row_infopages = mysql_fetch_assoc($infopages);
		$totalRows_infopages = mysql_num_rows($infopages);
		
		$colname_List = "-1";
		if (isset($_GET['type'])) {
		  $colname_List = $_GET['type'];
		}
		// exit ($query_infopages);
		// Min(image_order.id),

		mysql_select_db($database_ibzm, $ibzm);
		$query_List = "SELECT 
		markers.name_$lang AS title_$lang,
		markers.id,
		markers.online,
		pages_$lang.summary_$lang,
		image_order.filename,
		markers.type,
		contact.address,
		contact.telephone,
		contact.municipal,
		contact.impage,
		pages_$lang.summary_$lang,
		`type`.typeurl,
		`type`.idtype,
		area.area_$lang,
		municipal.name_ca,
		municipal.name_es,
		municipal.name_en,
		municipal.muniurl,
		accom.stars,
		accom.pool,
		accom.sattv,
		accom.aircon,
		accom.minibar,
		accom.internet,
		accom.pricelow,
		accom.pricehigh,
		accom.affspot,
		accom.affurl4
		
		FROM
		markers
		Left Join `type` ON `type`.idtype = markers.`type`
		left Join contact ON contact.idcontact = markers.id
		Left Join pages_$lang ON pages_$lang.idpage_$lang = markers.id
		Left Join area ON area.idarea = contact.area
		Left Join municipal ON municipal.idmunicipal = contact.municipal
		Left Join accom ON accom.idaccom = markers.id
		
		Left Join image_order ON image_order.marker_id = markers.id";
		switch ($colname_List) {
	 case "accommodation": 
		   $query_List .= " WHERE `type`.idtype IN (1,2,3,4,5,23) AND markers.online = 1 GROUP BY markers.id ORDER BY municipal.name_ca ASC";
				
		break;
		
		case "hotels": 
		if (isset($muni)) {
				$query_List .= " WHERE `type`.idtype IN (1) AND muniurl = '$muni' AND markers.online = 1 GROUP BY markers.id ORDER BY municipal.name_ca ASC";
				} else {
				$query_List .= " WHERE `type`.idtype IN (1) AND markers.online = 1 GROUP BY markers.id ORDER BY municipal.name_ca ASC";	
				}
					
		break;
		
		case "activities": 
				$query_List .= " WHERE `type`.idtype IN (12,28) AND markers.online = 1  GROUP BY markers.id ORDER BY municipal.name_ca ASC";
		break;
		
		case "nightlife":
				$query_List .= " WHERE `type`.idtype IN (15,19) AND markers.online = 1  GROUP BY markers.id ORDER BY municipal.name_ca ASC";
		break;
		
		case "restaurants":
		if (isset($muni)) {
				$query_List .= " WHERE `type`.idtype IN (16,21) AND muniurl = '$muni' AND markers.online = 1 GROUP BY markers.id ORDER BY municipal.name_ca ASC";
				} else {
					$query_List .= " WHERE `type`.idtype IN (16,21) AND markers.online = 1  GROUP BY markers.id ORDER BY municipal.name_ca ASC";
				}
		break;
		
		default:
				$query_List .= "
		WHERE
		`type`.typeurl =  '$colname_List' AND markers.online = 1 GROUP BY markers.id ORDER BY municipal.name_ca ASC";
		break;
		}
 
		$List = mysql_query($query_List, $ibzm) or die(mysql_error());
		$row_List = mysql_fetch_assoc($List);
		$totalRows_List = mysql_num_rows($List);
		
		
		$pageTitle = $row_infopages['title_' . $lang . ''];
		
		//exit ($query_List);
		$html = new details();




		
		$avPriceTrans = $translate['Average price'][''.$lang.''];
		$weekTrans = $translate['Night'][''.$lang.''];
		$nightTrans = $translate['Week'][''.$lang.''];
		$priceLow = $row_List['pricelow'];
		$priceHigh = $row_List['pricehigh'];
		$affSpot = $row_List['affspot'];
		$affUrl4 = $row_List['affurl4'];
		
		$infoForTrans = $translate['Distances'][''.$lang.'']; 
		$detailTrans = $translate['Detail map'][''.$lang.''];
		$distancesTrans = $translate['Distances'][''.$lang.''];
		$accomWithinTrans = $translate['Accomm within'][''.$lang.''];
		
		// nested loop vars reset
		$lastTFM_nest = "";
		$lastTFM2_nest = "";
		
		
		break;
		
		
		case 'detail':
		require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/functions_details.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/details_lib.php');
		// Calls commax class
		// require_once ($_SERVER['DOCUMENT_ROOT'] . '/includes/Commax/include/commax.class.php');
		// $Ccommax = new Ccommax();
		


		mysql_select_db($database_ibzm, $ibzm);
		$query_detailpage = sprintf("SELECT
		markers.id,
		markers.name_$lang AS title,
		markers.`type`,
		markers.lat,
		markers.lng,
		contact.address,
		contact.telephone,
		contact.http,
		contact.email,
		contact.area,
		contact.municipal,
		contact.displayurl,
		contact.notes_$lang,
		pages_$lang.metadesc_$lang,
		pages_$lang.keywords_$lang,
		pages_$lang.summary_$lang,
		pages_$lang.html_$lang,
		municipal.idmunicipal,
		municipal.name_ca,
		municipal.name_es,
		municipal.name_en,
		municipal.muniurl,
		area.area_$lang,
		accom.stars,
		`type`.typeurl
		FROM
		markers
		Left Join contact ON contact.idcontact = markers.id
		Left Join pages_$lang ON pages_$lang.idpage_$lang = markers.id
		left Join municipal ON municipal.idmunicipal = contact.municipal
		left Join area ON area.idarea = contact.area
		Left Join accom ON accom.idaccom = markers.id
		Inner Join `type` ON `type`.idtype = markers.`type`
		WHERE
		markers.id = %s", GetSQLValueString($id, "int"));
		$detailpage = mysql_query($query_detailpage, $ibzm) or die(mysql_error());
		$row_detailpage = mysql_fetch_assoc($detailpage);
		$totalRows_detailpage = mysql_num_rows($detailpage);
		
		mysql_select_db($database_ibzm, $ibzm);
		$query_munilinks = "SELECT
		markers.id,
		contact.idcontact,
		municipal.idmunicipal,
		municipal.muniurl,
		municipal.name_$lang,
		`type`.typeurl
		FROM
		markers
		Inner Join contact ON contact.idcontact = markers.id
		Inner Join municipal ON municipal.idmunicipal = contact.idcontact
		Inner Join `type` ON `type`.idtype = markers.`type`";
		$munilinks = mysql_query($query_munilinks, $ibzm) or die(mysql_error());
		$row_munilinks = mysql_fetch_assoc($munilinks);
		$totalRows_munilinks = mysql_num_rows($munilinks);
		
		$lat = $row_detailpage['lat'];
		$lng = $row_detailpage['lng'];
		
		$query_hotels = sprintf("SELECT markers.id, markers.name_$lang,
		markers.`type`,
		markers.lat,
		markers.lng, ( 6371 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance, 
		contact.http, contact.address, contact.email, contact.telephone, contact.impage,
		type.idtype, type.typeurl,
		municipal.muniurl
		FROM markers 
		Left Join contact ON contact.idcontact = markers.id
		Left Join `type` ON `type`.idtype = markers.`type`
		Left Join municipal ON municipal.idmunicipal = contact.municipal
		WHERE
		markers.`type` IN  (1,2,3,4,5,23)
		AND markers.id <> '$id'
		ORDER BY distance LIMIT 0 , 10",
		  mysql_real_escape_string($lat),
		  mysql_real_escape_string($lng),
		  mysql_real_escape_string($lat));
		$hotels = mysql_query($query_hotels, $ibzm) or die(mysql_error());
		$row_hotels = mysql_fetch_assoc($hotels);
		$totalRows_hotels = mysql_num_rows($hotels);
		
		$query_restaurants = sprintf("SELECT markers.id, markers.name_$lang,
		markers.`type`,
		markers.lat,
		markers.lng, ( 6371 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance, 
		contact.http, contact.address, contact.email, contact.telephone, contact.impage,
		type.idtype, type.typeurl,
		municipal.muniurl
		FROM markers 
		Left Join contact ON contact.idcontact = markers.id
		Left Join `type` ON `type`.idtype = markers.`type`
		Left Join municipal ON municipal.idmunicipal = contact.municipal
		WHERE
		markers.`type` IN  (15,16,17,19)
		AND markers.id <> '$id'
		ORDER BY distance LIMIT 0 , 5",
		  mysql_real_escape_string($lat),
		  mysql_real_escape_string($lng),
		  mysql_real_escape_string($lat));
		
		$restaurants = mysql_query($query_restaurants, $ibzm) or die(mysql_error());
		$row_restaurants = mysql_fetch_assoc($restaurants);
		$totalRows_restaurants = mysql_num_rows($restaurants);
		
		
		
		
		if ($row_detailpage['type'] == 22) {
		$query_businesses = sprintf("SELECT markers.id, markers.name_$lang,
		markers.`type`,
		markers.lat,
		markers.lng, ( 6371 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance, 
		contact.http, contact.address, contact.email, contact.telephone, contact.impage,
		type.idtype, type.typeurl,
		municipal.muniurl
		FROM markers 
		Left Join contact ON contact.idcontact = markers.id
		Left Join `type` ON `type`.idtype = markers.`type`
		Left Join municipal ON municipal.idmunicipal = contact.municipal
		WHERE
		markers.`type` IN  (7,8,9,18,25,26)
		AND markers.id <> '$id'
		ORDER BY distance LIMIT 0 , 5",
		  mysql_real_escape_string($lat),
		  mysql_real_escape_string($lng),
		  mysql_real_escape_string($lat),
		  mysql_real_escape_string($radius));
		$businesses = mysql_query($query_businesses, $ibzm) or die(mysql_error());
		$row_businesses = mysql_fetch_assoc($businesses);
		$totalRows_businesses = mysql_num_rows($businesses);
		
		
		}
		
		
		
		
		// distances to places
		mysql_select_db($database_ibzm, $ibzm);
		$query_Distances = sprintf("SELECT DISTINCT
		markers.id,
		( 6371 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance, 
		markers.name_$lang,
		markers.`type`,
		`type`.typeurl,
		`type`.idtype,
		municipal.muniurl,
		area.areaurl
		FROM
		markers
		Left Join `type` ON `type`.idtype = markers.`type`
		Inner Join contact ON contact.idcontact = markers.id
		Inner Join municipal ON municipal.idmunicipal = contact.municipal
		Inner Join area ON area.idarea = contact.area
		WHERE
		markers.`type` IN  (13,18,22,14,25,7,9,24,26,27)
		AND markers.id <> '$id'
		
		ORDER BY distance LIMIT 0,5",
		 mysql_real_escape_string($lat),
		  mysql_real_escape_string($lng),
		  mysql_real_escape_string($lat),
		  mysql_real_escape_string($radius));
		$Distances = mysql_query($query_Distances, $ibzm) or die(mysql_error());
		$row_Distances = mysql_fetch_assoc($Distances);
		$totalRows_Distances = mysql_num_rows($Distances);
		
		mysql_select_db($database_ibzm, $ibzm);
		$query_places = "SELECT 
		`markers`.`name_$lang` AS place_name,
		`municipal`.`muniurl`,
		`type`.`typeurl`,
		`markers`.`id`
		FROM
		`markers`
		Inner Join `contact` ON `contact`.`idcontact` = `markers`.`id`
		Inner Join `municipal` ON `municipal`.`idmunicipal` = `contact`.`municipal`
		Inner Join `type` ON `type`.`idtype` = `markers`.`type`
		WHERE
		`markers`.`type` =  '22'
		AND `markers`.`id` <> $id";
		$places = mysql_query($query_places, $ibzm) or die(mysql_error());
		$row_places = mysql_fetch_assoc($places);
		$totalRows_places = mysql_num_rows($places);
		
		$html = new details();
		$title =  $row_detailpage['title'];
		$areaTitle = $row_detailpage['area_'.$lang.'']; 
		$muniTitle = $row_detailpage['name_'.$lang.''];
		$muniUrl = $row_detailpage['muniurl'];
		$site = 'Ibiza';
		$ibizaTrans = $translate['Ibiza'][''.$lang.''];
		$country = $translate['Spain'][''.$lang.''];
		$stars = $row_detailpage['stars'];
		$typeInt = $row_detailpage['type'];
		$typeUrl = $row_detailpage['typeurl'];
		//$price = $row_property['price'];
		//$gallery = $_SERVER['DOCUMENT_ROOT'].'/ibiza-images/albums/'.$muniUrl.'/'.$typeUrl.'/'.$id.'/';
		$accom_arr = array(1, 2, 3, 4, 5, 23);
		$detailTitle = $row_detailpage['title'];
		$avPriceTrans = $translate['Average price'][''.$lang.''];
		$weekTrans = $translate['Night'][''.$lang.''];
		$nightTrans = $translate['Week'][''.$lang.''];
		$priceLow = $row_Accom['pricelow'];
		$priceHigh = $row_Accom['pricehigh'];
		$affSpot = $row_Accom['affspot'];
		$affUrl4 = $row_Accom['affurl4'];
		$affUrl3 = $row_Accom['affurl3'];
		$affUrl2 = $row_Accom['affurl2'];
		$infoForTrans = $translate['Distances'][''.$lang.'']; 
		$detailTrans = $translate['Detail map'][''.$lang.''];
		$distancesTrans = $translate['Distances'][''.$lang.''];
		$accomWithinTrans = $translate['Accomm within'][''.$lang.''];
		
		$sql_image_gallery = "SELECT * FROM image_order WHERE marker_id = $id ORDER BY position ASC ;";
		$image_gallery = mysql_query($sql_image_gallery, $ibzm) or die(mysql_error());
		$row_image_gallery = mysql_fetch_assoc($image_gallery);
		$totalRows_image_gallery = mysql_num_rows($image_gallery);
			
		
		
		$sql_image_order = "SELECT * FROM image_order WHERE marker_id = $id ORDER BY position ASC LIMIT 0,3;";
		$image_order = mysql_query($sql_image_order, $ibzm) or die(mysql_error());
		$row_image_order = mysql_fetch_assoc($image_order);
		$totalRows_image_order = mysql_num_rows($image_order);

		// $comments = $Ccommax->build_comment_system($row_detailpage['id']);
		$pageTitle = $row_detailpage['title'] .' '.  utf8_encode($row_detailpage['name_'.$lang.'']) ; 
		
		mysql_select_db($database_ibzm, $ibzm);
		$query_directions = "SELECT
		markers.name_en,
		markers.lat,
		markers.lng
		FROM
		markers
		WHERE
		markers.type IN (10,13,22)
		ORDER BY
		markers.name_en ASC";
		$directions = mysql_query($query_directions, $ibzm) or die(mysql_error());
		$row_directions = mysql_fetch_assoc($directions);
		$totalRows_directions = mysql_num_rows($directions);
		
		
		
		break;
		
		case 'home':
		
		$colname_infopages = "-1";
		if (isset($_GET['type'])) {
		  $colname_infopages = $_GET['type'];
		}
		
		
		
		mysql_select_db($database_ibzm, $ibzm);
		$query_infopages = sprintf("SELECT * FROM infopages_en WHERE infourl_en = %s", GetSQLValueString($colname_infopages, "text"));
		$infopages = mysql_query($query_infopages, $ibzm) or die(mysql_error());
		$row_infopages = mysql_fetch_assoc($infopages);
		$totalRows_infopages = mysql_num_rows($infopages);
		
		
		
		
		
		
		
		
		$pageTitle = 'Ibiza Maps | Ibiza Hotels, Beaches & Restaurants';
		
		
		break;
		
		case 'pages':
		
		mysql_select_db($database_ibzm, $ibzm);
		$query_pages = "SELECT * FROM infopages_$lang WHERE infourl_$lang = '$page'";
		$pages = mysql_query($query_pages, $ibzm) or die(mysql_error());
		$row_pages = mysql_fetch_assoc($pages);
		$totalRows_pages = mysql_num_rows($pages);
		
		$pageTitle = $row_pages['title'];
		// exit($query_pages);
		break;
		
		case 'islandmap':
		require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/functions_details.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/details_lib.php');
		
		
		
		break;
		
		case 'locations':
		
		$colname_detail = "-1";
		if (isset($_GET['muni'])) {
		  $muni = $_GET['muni'];
				
		} else {
			unset($muni);
		}
		 //exit ($muni);
		$colname_location = "-1";
		if (isset($_GET['id'])) {
		  $colname_location = $_GET['id'];
		}
		
		
		
		$colname_infopages = "-1";
		if (isset($_GET['type'])) {
		  $colname_infopages = $_GET['type'];
		}
			require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/functions_details.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/details_lib.php');
		
									mysql_select_db($database_ibzm, $ibzm);
							$query_location = sprintf("SELECT
							markers.id,
							markers.name_$lang,
							markers.`type`,
							markers.lat,
							markers.lng,
							pages_$lang.idpage_$lang,
							pages_$lang.metadesc_$lang,
							pages_$lang.keywords_$lang,
							pages_$lang.summary_$lang,
							pages_$lang.html_$lang
							FROM
							markers
							Inner Join pages_$lang ON pages_$lang.idpage_$lang = markers.id
							WHERE markers.id = %s", GetSQLValueString($colname_location, "int"));
							$location = mysql_query($query_location, $ibzm) or die(mysql_error());
							$row_location = mysql_fetch_assoc($location);
							$totalRows_location = mysql_num_rows($location);
							//exit ($query_location);
							$lat = $row_location['lat'];
							$lng = $row_location['lng'];
							
							$pageTitle = $row_location['name_'.$lang.''];
							$metaDesc = $row_location['metadesc_'.$lang.''];
							
							$query_hotels = sprintf("SELECT markers.id, markers.name_$lang,
							markers.`type`,
							markers.lat,
							markers.lng, ( 6371 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance, 
							contact.http, contact.address, contact.email, contact.telephone, contact.impage,
							type.idtype, type.typeurl,
							municipal.muniurl
							FROM markers 
							Left Join contact ON contact.idcontact = markers.id
							Left Join `type` ON `type`.idtype = markers.`type`
							Left Join municipal ON municipal.idmunicipal = contact.municipal
							WHERE
							markers.`type` IN  (1,2,3,4,5,23)
							
							HAVING distance < '%s' ORDER BY distance LIMIT 0 , 20",
									mysql_real_escape_string($lat),
									mysql_real_escape_string($lng),
									mysql_real_escape_string($lat),
									mysql_real_escape_string($radius));
							$hotels = mysql_query($query_hotels, $ibzm) or die(mysql_error());
							$row_hotels = mysql_fetch_assoc($hotels);
							$totalRows_hotels = mysql_num_rows($hotels);
							
							$query_restaurants = sprintf("SELECT markers.id, markers.name_$lang,
							markers.`type`,
							markers.lat,
							markers.lng, ( 6371 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance, 
							contact.http, contact.address, contact.email, contact.telephone, contact.impage,
							type.idtype, type.typeurl,
							municipal.muniurl
							FROM markers 
							Left Join contact ON contact.idcontact = markers.id
							Left Join `type` ON `type`.idtype = markers.`type`
							Left Join municipal ON municipal.idmunicipal = contact.municipal
							WHERE
							markers.`type` IN  (15,16,17)
							
							HAVING distance < 4 ORDER BY distance LIMIT 0 , 20",
									mysql_real_escape_string($lat),
									mysql_real_escape_string($lng),
									mysql_real_escape_string($lat));
							
							$restaurants = mysql_query($query_restaurants, $ibzm) or die(mysql_error());
							$row_restaurants = mysql_fetch_assoc($restaurants);
							$totalRows_restaurants = mysql_num_rows($restaurants);
							
							
							$result = mysql_query($query_restaurants);
							if (!$result) {
									die("Invalid query: " . mysql_error());
							}
							
							
							$query_businesses = sprintf("SELECT markers.id, markers.name_$lang,
							markers.`type`,
							markers.lat,
							markers.lng, ( 6371 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance, 
							contact.http, contact.address, contact.email, contact.telephone, contact.impage,
							type.idtype, type.typeurl,
							municipal.muniurl
							FROM markers 
							Left Join contact ON contact.idcontact = markers.id
							Left Join `type` ON `type`.idtype = markers.`type`
							Left Join municipal ON municipal.idmunicipal = contact.municipal
							WHERE
							markers.`type` IN  (7,8,9,18)
							HAVING distance < '%s' ORDER BY distance LIMIT 0 , 20",
									mysql_real_escape_string($lat),
									mysql_real_escape_string($lng),
									mysql_real_escape_string($lat),
									mysql_real_escape_string($radius));
							$businesses = mysql_query($query_businesses, $ibzm) or die(mysql_error());
							$row_businesses = mysql_fetch_assoc($businesses);
							$totalRows_businesses = mysql_num_rows($businesses);
							
							$result = mysql_query($query_businesses);
							if (!$result) {
									die("Invalid query: " . mysql_error());
							}
							
							// distances to places
							mysql_select_db($database_ibzm, $ibzm);
							$query_Distances = sprintf("SELECT DISTINCT
							markers.id,
							( 6371 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance, 
							markers.name_$lang,
							markers.`type`,
							`type`.typeurl,
							`type`.idtype,
							municipal.muniurl,
							area.areaurl
							FROM
							markers
							Left Join `type` ON `type`.idtype = markers.`type`
							Inner Join contact ON contact.idcontact = markers.id
							Inner Join municipal ON municipal.idmunicipal = contact.municipal
							Inner Join area ON area.idarea = contact.area
							WHERE
							markers.`type` IN  (12,13,18,22,14,25,7,9,24,26)
							AND markers.id <> '$colname_location'
							HAVING distance < '5'
							ORDER BY distance",
								mysql_real_escape_string($lat),
									mysql_real_escape_string($lng),
									mysql_real_escape_string($lat),
									mysql_real_escape_string($radius));
							$Distances = mysql_query($query_Distances, $ibzm) or die(mysql_error());
							$row_Distances = mysql_fetch_assoc($Distances);
							$totalRows_Distances = mysql_num_rows($Distances);
							
							
							
							
							
							mysql_select_db($database_ibzm, $ibzm);
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
							$munilinks = mysql_query($query_munilinks, $ibzm) or die(mysql_error());
							$row_munilinks = mysql_fetch_assoc($munilinks);
							$totalRows_munilinks = mysql_num_rows($munilinks);
							
							mysql_select_db($database_ibzm, $ibzm);
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
							$places = mysql_query($query_places, $ibzm) or die(mysql_error());
							$row_places = mysql_fetch_assoc($places);
							$totalRows_places = mysql_num_rows($places);
							$html = new details();
		break;
		
		case 'islandmap':
		require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/functions_details.php');
		require_once($_SERVER['DOCUMENT_ROOT'] . '/includes/details_lib.php');
		
		
		
		break;
		
		
		
		
		}
		
		mysql_select_db($database_ibzm, $ibzm);
		$query_places = "SELECT 
		`markers`.`name_en` AS place_name,
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
		$places = mysql_query($query_places, $ibzm) or die(mysql_error());
		$row_places = mysql_fetch_assoc($places);
		$totalRows_places = mysql_num_rows($places);
		
		
		mysql_select_db($database_ibzm, $ibzm);
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
		$munilinks = mysql_query($query_munilinks, $ibzm) or die(mysql_error());
		$row_munilinks = mysql_fetch_assoc($munilinks);
		$totalRows_munilinks = mysql_num_rows($munilinks);
		
		mysql_select_db($database_ibzm, $ibzm);
		$query_newpages = "SELECT
		markers.name_en,
		municipal.muniurl,
		municipal.name_ca,
		`type`.typeurl,
		markers.id,
		contact.impage
		FROM 
		`markers` 
		Inner Join
		`contact` ON idcontact = `markers`.`id` 
		Inner Join
		municipal ON contact.municipal = municipal.idmunicipal
		Inner Join
		`type` ON `type`.`idtype` = `markers`.`type`  
		WHERE
		markers.`type` <>  24
		ORDER BY `markers`.`id` DESC
		LIMIT 0, 5";
		$newpages = mysql_query($query_newpages, $ibzm) or die(mysql_error());
		$row_newpages = mysql_fetch_assoc($newpages);
		$totalRows_newpages = mysql_num_rows($newpages);

?>
<!DOCTYPE html>
<html class="no-js">

	<!-- Head section -->
	<head>

		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
  <title><?php echo $pageTitle;?> | Ibiza Maps</title>
		<meta name="description" content="<?php echo $metDesc['metadesc_$lang'];?>" />

		<link rel="icon" href="/data/img/favicon/w.png" />
		<!--<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Rokkitt:400,700" />-->
        <link href='http://fonts.googleapis.com/css?family=Advent+Pro:400,700' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="/data/php/attach.php?f=fancybox.css,flexslider.css,base.css,structure.css,parts.css,widgets.css,<?php echo $website_config['scheme']; ?>.css,color.css" />
        <link rel="stylesheet" type="text/css" href="/includes/Commax/assets/css/skin1.css" />
		

        
        <?php if ($thepage == 'detail') { ?>
        
        <link rel="stylesheet" type="text/css" href="/quform/css/standard.css" /><!-- Standard form layout -->
    <script type="text/javascript">
            //<![CDATA[
			
			
			//on the server
			var latitude = <?php echo $lat;?>;
			var longitude = <?php echo $lng;?>;
			var lang = '<?php echo $lang;?>';
			var radius = 5;
			var detailtype = '<?php echo $row_detailpage['type'];?>';
			
			//]]>
		</script>

<script src="http://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAfUinhMrZXJwn5qi-KdXIdwfIWgFpL1IY&sensor=true" type="text/javascript"></script>
        <script type="text/javascript" src="/includes/detail.js"></script>
        <script type="text/javascript" src="/data/js/jquery-1.8.1.min.js"></script>
             
        
        <script type="text/javascript" src="/quform/js/plugins.js"></script>
        <script type="text/javascript" src="/quform/js/scripts.js"></script>
		
        
      	<?php } ?>
        
         <?php if ($thepage == 'list') { ;?>

        <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAfUinhMrZXJwn5qi-KdXIdwfIWgFpL1IY&sensor=true&libraries=weather" type="text/javascript"></script>
        <script type="text/javascript">
            //<![CDATA[
			            
            //on the server
            var latitude = 38.961929;
            var longitude = 1.398375;
            var lang = '<?php echo $lang; ?>';
												var typeurl =  '<?php echo $_GET['type'];?>'
												var muni =  '<?php echo $_GET['muni'];?>'
            //]]>
            </script>
        <script type="text/javascript" src="/includes/info.googlemap.js" ></script>
    
    



    				<?php } ?>
        
         <?php if ($thepage == 'locations') { ;?>

        <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAfUinhMrZXJwn5qi-KdXIdwfIWgFpL1IY&sensor=true&libraries=weather" type="text/javascript"></script>
        <script type="text/javascript">
            //<![CDATA[
			            
            //on the server
            var latitude = <?php echo $row_location['lat'];?>;
            var longitude = <?php echo $row_location['lng'];?>;
            var lang = '<?php echo $lang; ?>';
												var radius = 5;
												
            //]]>
            </script>
        <script type="text/javascript" src="/includes/location.googlemap.js" ></script>
    
    



    				<?php } ?>
        
        <?php if ($thepage == 'islandmap') { ;?>

       <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyAfUinhMrZXJwn5qi-KdXIdwfIWgFpL1IY&sensor=true&libraries=weather" type="text/javascript"></script>
       <script type="text/javascript">
            //<![CDATA[
			            
            //on the server
            var latitude = 38.961929;
            var longitude = 1.398375;
            var lang = '<?php echo $lang; ?>';
												
            //]]>
            </script>
        <script type="text/javascript" src="/includes/island.googlemap.js" ></script>
    
    



    				<?php } ?>
        
         <?php if ($thepage == 'contact') { ;?>

      
           <link rel="stylesheet" type="text/css" href="/quform/css/standard.css" /><!-- Standard form layout -->
            <script type="text/javascript" src="/data/js/jquery-1.8.1.min.js"></script>
            <script type="text/javascript" src="/quform/js/plugins.js"></script>
            <script type="text/javascript" src="/quform/js/scripts.js"></script>
    



    				<?php } ?>
    
    
		
		<script src="/data/php/attach.php?f=jquery-1.8.1.min.js,jquery.cookie.min.js,jquery.fancybox.min.js,jquery.flexslider.min.js,jquery.jflickrfeed.min.js,jquery.masonry.min.js,jquery.tweet.min.js,jquery.yaselect.min.js,prefixfree.min.js,website.config.js,website.min.js"></script>
		

		<script src="http://platform.twitter.com/widgets.js"></script>
		<script src="https://apis.google.com/js/plusone.js"></script>
		<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.css" />
		<script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.0.3/cookieconsent.min.js"></script>
		<script>
			window.addEventListener("load", function(){
			window.cookieconsent.initialise({
			  "palette": {
				"popup": {
				  "background": "#000"
				},
				"button": {
				  "background": "#f1d600"
				}
			  },
			  "content": {
				"message": "Ibiza Maps uses cookies to personalise ads shown to you, to provide social media features and to analyse our traffic. We also may share information about your use of our advertising and analytics partners."
			  }
			})});
		</script>

		
	</head>
	<!-- // Head section -->

	<body onload="initialize()">

		<!-- Facebook -->
		<div id="fb-root"></div>
		<script>(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/<?php echo $lang;?>_<?php echo ($lang == 'en') ? 'GB' : strtoupper($lang);?>/all.js#xfbml=1";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));</script>
		<!-- // Facebook -->

		<!-- Browser notification -->
		<div class="browser-notification ie6">
			<p>Your browser (Internet Explorer 7 or lower) is <strong>out of date</strong>. It has known <strong>security flaws</strong> and may <strong>not display all features</strong> of this and other websites. <a href="http://www.browser-update.org/update.html">Learn how to update your browser</a>.</p>
			<div class="close">X</div>
		</div>
		<!-- // Browser notification -->

		

		<!-- Main section -->
		<div id="main" class="clear">
			<div class="container">

				<!-- Header -->
				<header id="header" class="clear"> 
                <hgroup class="alpha">
						<h1 class="alpha">
							<a href="/" title="Ibiza Maps"><img src="/content/top.png" alt="" class="logo" /></a>
						</h1>
            </hgroup>
            <div class="ad beta vertical">
						<div>
						 <!-- <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
              <!-- Ibiza maps top bar -->
              <ins class="adsbygoogle"
                   style="display:inline-block;width:468px;height:60px"
                   data-ad-client="ca-pub-8283575214062599"
                   data-ad-slot="1535991350"></ins>
              <script>
              (adsbygoogle = window.adsbygoogle || []).push({});
              </script>
						</div>
					</div>
             
          
                       
						
					
                   
					
							
							 <?php echo langFlags($thepage);?>
						
						
				</header>
				<!-- // Header -->