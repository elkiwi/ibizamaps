<?php
require_once('Connections/ibzm.php');

// Get parameters from URL
$center_lat = $_GET["lat"];
$center_lng = $_GET["lng"];
$lang = $_GET["lang"];



// Start XML file, create parent node
$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");
$parnode = $dom->appendChild($node);

// Opens a connection to a mySQL server
$connection=mysqli_connect ($hostname_ibzm, $username_ibzm, $password_ibzm);
if (!$connection) {
  die("Not connected : " . mysqli_error());
}

// Set the active mySQL database
$db_selected = mysqli_select_db($database_ibzm, $connection);
if (!$db_selected) {
  die ("Can\'t use db : " . mysqli_error());
}

// Search the rows in the markers table
//$query = sprintf("SELECT address, http, name, type, lat, lng, ( 6371 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance FROM markers HAVING distance < '%s' WHERE type = 1 ORDER BY distance LIMIT 0 , 20",
$query = "SELECT markers.id, markers.name_$lang,
markers.`type`,
markers.lat,
markers.lng,
image_order.filename,
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
Left Join municipal ON municipal.idmunicipal = contact.municipal
Left Join image_order ON image_order.marker_id = markers.id
WHERE markers.online = 1 GROUP BY markers.id";

$result = mysqli_query($query);
if (!$result) {
  die("Invalid query: " . mysqli_error());
}




header("Content-type: text/xml");

// Iterate through the rows, adding XML nodes for each
while ($row = @mysqli_fetch_assoc($result)){

		if (isset($row['filename']))
		{
			$row['filename'] = str_replace('image300', 'image120', $row['filename']);
		}
		else
		{
			$row['filename'] = 'th_image.jpg';
		}

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
		$newnode->setAttribute("filename", $row['filename']);
		$newnode->setAttribute("positiononly", $row['positiononly']);
		$newnode->setAttribute("lat", $row['lat']);
		$newnode->setAttribute("lng", $row['lng']);
		//$newnode->setAttribute("distance", $row['distance']);
}

echo $dom->saveXML();
mysqli_free_result($result);
?>