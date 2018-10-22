<?php 
 # image types to display 
 
$imagetypes = array("image/jpeg", "image/gif", "image/jpg");



# Original PHP code by Chirp Internet: www.chirp.com.au 
# Please acknowledge use of this code by including this header. 

function getImages($dir) { 

global $imagetypes; 

# array to hold return value 

$retval = array(); 

# add trailing slash if missing 

if(substr($dir, -1) != "/") $dir .= "/"; 

# full server path to directory 

$fulldir = "{$_SERVER['DOCUMENT_ROOT']}/$dir"; 

if (file_exists($fulldir)) { 
$d = @dir($fulldir); 
while(false !== ($entry = $d->read())) { 

# skip hidden files 

if($entry[0] == "." | $entry[0] == "notes" ) continue; 

# check for image files 

if(strpos($fulldir.$entry, "600"))  { 
$retval[] = array( "file" => "$dir$entry", "size" => getimagesize("$fulldir$entry") ); 
} 

 

} 

$d->close(); 

return $retval; 
}
}

function getImageThumb($dir) { 

global $imagetypes; 

# array to hold return value 

$retval = array(); 

# add trailing slash if missing 

if(substr($dir, -1) != "/") $dir .= "/"; 

# full server path to directory 

$fulldir = "{$_SERVER['DOCUMENT_ROOT']}/$dir";
if (file_exists($fulldir)) { 
	$d = @dir($fulldir); 
	
	while(false !== ($entry = $d->read())) { 
	
		# skip hidden files 
		
		if($entry[0] == ".") continue; 
		
		# check for image files 
		
		if(strpos($fulldir.$entry, "115"))  { 
		$retval[] = array( "file" => "$dir$entry", "fileName" => "$entry",  "size" => getimagesize("$fulldir$entry") ); 
	
	} 
	
	 
	
	} 
	
	$d->close(); 
}
return $retval; 

}

