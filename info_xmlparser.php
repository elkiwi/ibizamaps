<?php  
require_once('Connections/ibzm.php');

// Get parameters from URL
$center_lat = $_GET["lat"];
$center_lng = $_GET["lng"];
$lang = $_GET["lang"];
$type = $_GET["typeurl"];
$muni = $_GET["muni"];


// Start XML file, create parent node
$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");
$parnode = $dom->appendChild($node);

// Opens a connection to a mySQL server
$connection=mysql_connect ($hostname_ibzm, $username_ibzm, $password_ibzm);
if (!$connection) {
  die("Not connected : " . mysql_error());
}

// Set the active mySQL database
$db_selected = mysql_select_db($database_ibzm, $connection);
if (!$db_selected) {
  die ("Can\'t use db : " . mysql_error());
}

// Search the rows in the markers table
//$query = sprintf("SELECT address, http, name, type, lat, lng, ( 6371 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance FROM markers HAVING distance < '%s' WHERE type = 1 ORDER BY distance LIMIT 0 , 20",
$query = "SELECT markers.id, markers.name_$lang,
markers.`type`,
markers.lat,
markers.lng,  
contact.http, 
contact.address, 
contact.email, 
contact.telephone, 
contact.impage, 
contact.positiononly,
type.idtype, 
type.typeurl,
municipal.muniurl
FROM markers 
Left Join contact ON contact.idcontact = markers.id
Left Join `type` ON `type`.idtype = markers.`type`
Left Join municipal ON municipal.idmunicipal = contact.municipal " ;


switch ($type) {
	 
		case "accommodation": 
		   $query .= " WHERE `type`.idtype IN (1,2,3,4,5,23) ORDER BY municipal.name_ca ASC";
				
		break;
		
		case "hotels": 
		
				$query .= " WHERE `type`.idtype IN (1) AND markers.online = 1 ORDER BY municipal.name_ca ASC";	
				
					
		break;
		
		case "activities": 
				$query .= " WHERE `type`.idtype IN (12,28) AND markers.online = 1  GROUP BY markers.id ORDER BY municipal.name_ca ASC";
		break;
		
		case "transport": 
				$query .= " WHERE `type`.idtype IN (18,24) AND markers.online = 1  GROUP BY markers.id ORDER BY municipal.name_ca ASC";
		break;
		
		case "nightlife":
				$query .= " WHERE `type`.idtype IN (15,19) AND markers.online = 1  GROUP BY markers.id ORDER BY municipal.name_ca ASC";
		break;
		
		case "restaurants":
		if (isset($muni)) {
				$query .= " WHERE `type`.idtype IN (16,21) AND muniurl = '$muni' AND markers.online = 1 GROUP BY markers.id ORDER BY municipal.name_ca ASC";
				} else {
					$query .= " WHERE `type`.idtype IN (16,21) AND markers.online = 1  GROUP BY markers.id ORDER BY municipal.name_ca ASC";
				}
		break;
		
		default:
				$query .= "
		WHERE
		`type`.typeurl =  '$type' AND markers.online = 1 GROUP BY markers.id ORDER BY municipal.name_ca ASC";
		break;
		}


$result = mysql_query($query);
if (!$result) {
  die("Invalid query: " . mysql_error());
}

//exit ($query);
header("Content-type: text/xml");

// Iterate through the rows, adding XML nodes for each
while ($row = @mysql_fetch_assoc($result)){
  $node = $dom->createElement("marker");
  $newnode = $parnode->appendChild($node);
  $newnode->setAttribute("name", $row['name_'.$lang.'']);
  $newnode->setAttribute("id", $row['id']);
  $newnode->setAttribute("address", $row['address']);
  $newnode->setAttribute("email", $row['email']);
  $newnode->setAttribute("telephone", $row['telephone']);
  $newnode->setAttribute("http", $row['http']);
  $newnode->setAttribute("type", $row['type']);
  $newnode->setAttribute("typeurl", $row['typeurl']);
  $newnode->setAttribute("muniurl", $row['muniurl']);   
  $newnode->setAttribute("impage", $row['impage']);
  $newnode->setAttribute("positiononly", $row['positiononly']);
  $newnode->setAttribute("lat", $row['lat']);
  $newnode->setAttribute("lng", $row['lng']);
  //$newnode->setAttribute("distance", $row['distance']);
}

echo $dom->saveXML();
mysql_free_result($result);
?>