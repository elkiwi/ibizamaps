<?php 
error_reporting(E_ALL ^ E_NOTICE); //For disabling non fatal error outputs

$file = "http://localhost/en/ibiza/hotels/1.html"; //Location to file

$iter = 5; //No of times to check

function getmtime()

{

$a = explode (' ',microtime());

return(double) $a[0] + $a[1];

}

for ($i = 0; $i < $iter; $i++)

{

$start = getmtime();

file ($file);

$loadtime += getmtime() - $start ;

$intertime = getmtime() - $start ;

echo $intertime . "<br>" ;

$avgload = $loadtime / $iter;

}

echo "<p><b>Average" . $avgload . "</b>" ;

?>