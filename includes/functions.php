<?php 
 # image types to display 
 
$imagetypes = array("image/jpeg", "image/gif", "image/jpg");



# Original PHP code by Chirp Internet: www.chirp.com.au 
# Please acknowledge use of this code by including this header. 

/*function getImages($dir) { 

global $imagetypes; 

# array to hold return value 

$retval = array(); 

# add trailing slash if missing 

if(substr($dir, -1) != "/") $dir .= "/"; 

# full server path to directory 

$fulldir = "{$_SERVER['DOCUMENT_ROOT']}/$dir"; 
$d = @dir($fulldir) or die("getImages: Failed opening directory $dir for reading"); 
while(false !== ($entry = $d->read())) { 

# skip hidden files 

if($entry[0] == ".") continue; 

# check for image files 

if(strpos($fulldir.$entry, "medium"))  { 
$retval[] = array( "file" => "/$dir$entry", "size" => getimagesize("$fulldir$entry") ); 

} 

 

} 

$d->close(); 

return $retval; 

}*/

if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "") 
{
  $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;

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
      $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
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

if (isset($_GET['type'])){
$type = $_GET['type'];
}

if (isset($_GET['lang'])){
$lang = $_GET['lang'];
}

if (isset($_GET['salerent'])){
$salerent = $_GET['salerent'];
}

/*if (isset($_GET['muni'])){
$zone = $_GET['muni'];
}*/

if (isset($_GET['page'])){
$page = $_GET['page'];
//$thepage = $_GET['page'];
}

if (isset($_GET['id'])){
$id = $_GET['id'];
}

function langFlags($page) {

global $type, $lang, $salerent, $zone, $id;

switch ($page) {
	
/*case 'home':

$flags = '<table border="0" cellspacing="5" cellpadding="5">
  <tr>
    <td><a href="/"><img src="/images/ui/flag_es.gif" width="20" height="14" border="0" /></a></td>
    <td><a href="/en/"><img src="/images/ui/flag_en.gif" width="20" height="14" border="0" /></a></td>
    <td><a href="/de/"><img src="/images/ui/flag_de.gif" width="20" height="14" border="0" /></a></td>
    <td><a href="/it/"><img src="/images/ui/flag_it.gif" width="20" height="14" border="0" /></a></td>
  </tr>
</table>';

break;

case 'detail':

$flags = '<table border="0" cellspacing="5" cellpadding="5">
  <tr>
    <td><a href="/es/'.$type.'/'.$salerent.'/'.$zone.'/'.$id.'.html"><img src="/images/ui/flag_es.gif" width="20" height="14" border="0" /></a></td>
    <td><a href="/en/'.$type.'/'.$salerent.'/'.$zone.'/'.$id.'.html"><img src="/images/ui/flag_en.gif" width="20" height="14" border="0" /></a></td>
    <td><a href="/de/'.$type.'/'.$salerent.'/'.$zone.'/'.$id.'.html"><img src="/images/ui/flag_de.gif" width="20" height="14" border="0" /></a></td>
    <td><a href="/it/'.$type.'/'.$salerent.'/'.$zone.'/'.$id.'.html"><img src="/images/ui/flag_it.gif" width="20" height="14" border="0" /></a></td>
  </tr>
</table>';

break;

case 'list':

$flags = '<table border="0" cellspacing="5" cellpadding="5">
  <tr>
    <td><a href="/es/'.$type.'/'.$salerent.'/"><img src="/images/ui/flag_es.gif" width="20" height="14" border="0" /></a></td>
    <td><a href="/en/'.$type.'/'.$salerent.'/"><img src="/images/ui/flag_en.gif" width="20" height="14" border="0" /></a></td>
    <td><a href="/de/'.$type.'/'.$salerent.'/"><img src="/images/ui/flag_de.gif" width="20" height="14" border="0" /></a></td>
    <td><a href="/it/'.$type.'/'.$salerent.'/"><img src="/images/ui/flag_it.gif" width="20" height="14" border="0" /></a></td>
  </tr>
</table>';

break;*/

default;

$flags = '<div class="langflags">
 <a href="/es/"><img src="/images/ui/flag_es.gif" width="20" height="14" border="0" alt="Espa&ntilde;ol" /></a>
    <a href="/"><img src="/images/ui/flag_en.gif" width="20" height="14" border="0" alt="English" /></a>

  

</div>';






}

return $flags;


}






function make_url( $x )
	  {
	  $x = trim($x);
	  $x = html_entity_decode( $x);
	  $r = array( '/[ÂÀÁÄÃ]/'=>'a','/[âãàáä]/'=>'a','/[ÊÈÉË]/' =>'e','/[êèéë]/' =>'e', '/[ñ]/' =>'n', '/[ÎÍÌÏ]/' =>'i','/[îíìï]/' =>'i','/[ÔÕÒÓÖ]/'=>'o','/[ôõòóö]/'=>'o','/[ÛÙÚÜ]/' =>'u','/[ûúùü]/' =>'u','/ç/' =>'c','/Ç/' => 'c');
	  $x = preg_replace( array_keys( $r ), array_values( $r ), $x);
	  $x = preg_replace( '/\s|\'|\"/', '-', $x);
	  preg_match_all('/[a-z]|\-[a-z]|[0-9]/i',$x, $R);
	  $x = implode('',$R[0]);
	  $x = strtolower( $x);
	  $x = print_r( $x, true);
	  return $x;
	  }



?>