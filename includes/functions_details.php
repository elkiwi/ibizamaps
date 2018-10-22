<?php



// marker ids for accommodation
$accom_arr = array(1, 2, 3, 4, 5, 23);

$type = "-1";
if (isset($_GET['type'])) {
  $type = $_GET['type'];
}

$lang = "-1";
if (isset($_GET['lang'])) {
  $lang = $_GET['lang'];
}

$muni = "-1";
if (isset($_GET['muni'])) {
  $muni = $_GET['muni'];
}

$id = "-1";
if (isset($_GET['markerid'])) {
  $id = $_GET['markerid'];
}


$radius = "2";

switch ($type) {
case "weather":
    $navselect = "7";
    break;
case "restaurants":
	$navselect = "6";
	break;
case "bars";
case "nightclubs";
	$navselect = "5";
	break;
case "activities":
	$navselect = "4";
	break;
case "beaches":
	$navselect = "3";
mysqli_select_db($database_ibzm, $ibzm);
$query_Beaches = "SELECT * FROM beaches WHERE idbeach = $id";
$Beaches = mysqli_query($query_Beaches, $ibzm);
$row_Beaches = mysqli_fetch_assoc($Beaches);
$totalRows_Beaches = mysqli_num_rows($Beaches);

	break;


case "transport":
	$navselect = "2";
	break;

case "hotels";
case "apartments";
case "hostels";
case "villas";
case "rural-hotels";

mysqli_select_db($database_ibzm, $ibzm);
$query_Accom = "SELECT * FROM accom WHERE idaccom = $id";
$Accom = mysqli_query($query_Accom, $ibzm);
$row_Accom = mysqli_fetch_assoc($Accom);
$totalRows_Accom = mysqli_num_rows($Accom);
//exit();
break;



case "ibiza":
	$navselect = "0";
	break;
default:
$navselect = "0";
}

switch ($muni) {
case "ibiza":
    $muniint = "9";
    break;
case "san-antonio":
    $muniint = "10";
    break;
case "santa-eulalia":
    $muniint = "11";
    break;
case "san-jose":
    $muniint = "13";
    break;
case "san-juan":
    $muniint = "12";
    break;
}

function detailImages()
{


    global $row_detail;
    $typeurl = $row_detail['typeurl_es'];
    $id = $row_detail['propid'];
    $detailImageDir = '/images/pages/' . $typeurl . '/' . $id . '';


    function getDetailImages($dir)
    {

        //$imagetypes = array("image/jpeg", "image/gif", "image/jpg");

        $retval = array();

        # add trailing slash if missing

        if (substr($dir, -1) != "/")
            $dir .= "/";

        # full server path to directory

        $fulldir = "{$_SERVER['DOCUMENT_ROOT']}$dir";
        if (file_exists($fulldir)) {
            $d = @dir($fulldir) or die("getImages: Failed opening directory $dir for reading");
            while (false !== ($entry = $d->read())) {

                # skip hidden files

                if ($entry[0] == ".")
                    continue;

                # check for image files

                if (substr("$entry", 0,8) == "image300_") {

                    $retval[] = array("file" => "$dir$entry", "size" => getimagesize("$fulldir$entry"));

                }

            }

            $d->close();

        }

        return $retval;

    }


    $imgs = getDetailImages($detailImageDir);
    //echo $detailImageDir;

    //$this->html = $imgs;
    return $imgs;
}

require('lang.php');

?>
