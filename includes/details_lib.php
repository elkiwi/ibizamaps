<?php

class details {



	function pageTitle(){

			global $title, $typeUrl, $muniTitle, $areaTitle, $site, $country;

		$this->html = $title . ' ';
        ($typeUrl=='villas') ? $this->html .= ' for rent, ' : $this->html .= '';
        $this->html .= ' '.$muniTitle.', ' . $site . ', ' . $country;

	return $this->html;

	}

	function h1Title(){

		global $title, $muniTitle, $areaTitle, $site, $ibizaTrans, $country, $price;

		$this->html = $title.', '.$this->stars().' <br /><span class="h1address">' . $areaTitle . ' - ' . $muniTitle .', '. $ibizaTrans;

		if (isset($price)) {

		$this->html .= '<span class="bigText"> - '. $price.'  &euro;</span>';

		}

		$this->html .= '</span>';

	return $this->html;

	}

	function galleryLink() {

		$galleryLink = '';

		global $muni, $lang, $gallery, $typeUrl, $title, $id;

		if (file_exists($gallery)) {

			$galleryLink = '<a href="/ibiza-images/'. $muni .'/' . $typeUrl . '/' .$id. '/"><img src="/images/interface/gallery_'.$lang.'.gif" alt="Images of '.$title.'" width="138" height="34" hspace="20" vspace="10" border="0" align="left" /></a><br clear="all"/>';

		 }

			return $galleryLink;


	}

	function accomPriceBox () {

	global $row_Accom, $avPriceTrans, $typeInt, $weekTrans, $nightTrans, $priceLow, $priceHigh, $accom_arr, $lang, $affSpot, $affUrl4, $title;



	if (isset($priceLow)) {





	$priceBox = '<div class="accomPrice" align="center">
<p class="priceTitle">'. $avPriceTrans.' / ';
			if ($typeInt == 4) {
			$priceBox .= $nightTrans;
			}

			else {
			$priceBox .= $weekTrans;
			}

			$priceBox .= '<span class="bigText"> ' . round($priceLow + $priceHigh)/2 . ' &euro;</span></p>';



			if (in_array($typeInt, $accom_arr)) {
			$priceBox .= $this->priceButtons();
			}

			$priceBox .= '</div>';



	}
	return $priceBox;
	}

		//display the price button if we have affiliate link

		function priceButtons(){

		$html = '';

		global $affSpot, $affUrl4, $affUrl5, $lang, $typeInt, $title, $id;


		if ( $affSpot <> '') {

			$html = '<a href="'.$affSpot.'" onClick="javascript: pageTracker._trackPageview(\'/spotlight/prices/'. $typeInt.'/'. $id.'\')" rel="nofollow"><div class="right"><button class="tiny">' . $translate['Average price'][''.$lang.''] .'</button></div></a>';



		}



		if ( ($affUrl4 <> '') && ($typeInt == 4) ) {

			$html = '<a href="'.$affUrl4.'" rel="nofollow" onClick="javascript: pageTracker._trackPageview(\'/villarenters/prices/'. $typeInt.'/'. $id.'\')"><div class="right"><button class="tiny">' . $translate['Average price'][''.$lang.''] .'</button></div></a>';



		}

		if ( ($affUrl5 <> '') && ($typeInt == 4) ) {

			$html = '<a href="http://clkuk.tradedoubler.com/click?p(20358)a(1460512)g(739719)url('.$affUrl5.')" target="_blank"  rel="nofollow"" onClick="javascript: pageTracker._trackPageview(\'/jamesvillas/'. $typeInt.'/'. $id.'\')"><div class="right"><button class="tiny">' . $translate['Average price'][''.$lang.''] .'</button></div></a>';



		}


		return $html;

		}


	// displays number of stars for accomm markers
	function stars(){


		global $typeInt, $stars;

		if ($stars == '') return;

		$typearr = array(1,2,3,5,23);

		if (in_array($typeInt,$typearr)){

			$galleryLink = '<img src="/images/interface/'.$stars.'.star.hotel.gif" alt="'.$stars.' star accommodation" align="absbottom" />';

		return $galleryLink;

		}

	}


	// displays the correct flags for changing languages
	function langflag() {

		global $lang, $muniUrl, $typeUrl, $id;

		switch($lang){

		case 'en':

		$langFlags ='<a href="/es/'. $muniUrl . '/' . $typeUrl . '/' . $id . '.html"><img src="/ddtabmenufiles/media/en.gif" alt="Espa�ol" width="62" height="23" border="0" align="right" /></a>';

		break;

		case 'es':
		$langFlags ='<a href="/en/'. $muniUrl . '/' . $typeUrl . '/' . $id . '.html"><img src="/ddtabmenufiles/media/es.gif" alt="English" width="62" height="23" border="0" align="right" /></a>';
		break;

		}

		return $langFlags;

		}

		function affilliateLink() {


			global $accom_arr, $affSpot, $affUrl4, $affUrl5, $lang, $typeInt, $title, $id, $translate;


			// check if it's an accommodation page

			if (in_array($typeInt, $accom_arr)) {

				if (isset($affSpot)) {

			$affButtons = '<a href="'.$affSpot.'&lang='.$lang.'&label='.$id.'" rel="nofollow" onClick="_gaq.push([\'_trackEvent\', \'Booking.com\', \'Book Now (detail)\', \''. $title .'\']);"><button class="medium green">' . $translate['Book Now'][''.$lang.''] .'<span style="background-image: url(/data/img/icons/32/sign-in.png);"></span></button></a>';

			$affLink = $affButtons;

		}

		if (($affSpot =='') && ($typeInt <> 4)) {

			$affButtons = '<a href="http://www.ibiza-spotlight.com/aff/idevaffiliate.php?id=101&url='.$id.'" rel="nofollow" onClick="javascript: pageTracker._trackPageview(\'/spotlight/'. $typeInt.'/'. $id.'\')"><img src="/images/interface/spotaff_'.$lang.'.gif" width="300" height="120" border="0" alt="Book Ibiza Spotlight Hotels" /></a>';
			$affLink = $affButtons;
		}


		if (isset($affUrl4) && ($typeInt == 3)) {

	$affButtons = '<a href="'.$affSpot.'" rel="nofollow" onClick="javascript: pageTracker._trackPageview(\'/spotlight/'. $typeInt.'/'. $id.'\')"><button class="icon-32">' . $translate['Book Now'][''.$lang.''] .'<span style="background-image: url(/data/img/icons/32/sign-in.png);"></span></button></a>';
		$affLink = $affButtons;


		}

		if (isset($affUrl4) && ($typeInt == 4)) {

	$affButtons = '<a href="'.$affUrl4.'" rel="nofollow" onClick="javascript: pageTracker._trackPageview(\'/spotlight/'. $typeInt.'/'. $id.'\')"><button class="icon-32">' . $translate['Book Now'][''.$lang.''] .'<span style="background-image: url(/data/img/icons/32/sign-in.png);"></span></button></a>';
$affLink = $affButtons;

		}

		if (isset($affUrl5) && ($typeInt == 4)) {

		$affButtons = '<a href="'.$affUrl5.'" rel="nofollow" onClick="javascript: pageTracker._trackPageview(\'/spotlight/'. $typeInt.'/'. $id.'\')"><button class="icon-32">' . $translate['Book Now'][''.$lang.''] .'<span style="background-image: url(/data/img/icons/32/sign-in.png);"></span></button></a>';
$affLink = $affButtons;

		}

			}

			//otherwise show generic spotlight hotel aff link

			else {

			if ($lang == 'en'){

				$affLink = '<a href="http://www.ibiza-spotlight.com/hotel-guide/?aid=101" onClick="javascript: pageTracker._trackPageview(\'/spotlight/'. $typeInt .'/'. $title .'\')"><img src="/images/interface/spotaff_'.$lang.'.gif" width="300" height="120" border="0" /></a>';

			}

			else {

				$affLink = '<a href="http://www.ibiza-spotlight.es/hoteles/?aid=101" onClick="javascript: pageTracker._trackPageview(\'/spotlight/'. $typeInt .'/'. $title.'\')"><img src="/images/interface/spotaff_'.$lang.'.gif" width="300" height="120" border="0" /></a>';

			}

			}

			return $affLink;

			} //end affiliateLink

		function listPriceButtons(){

				$html = '';



		global $translate, $affSpot, $affUrl4, $affUrl5, $lang, $typeInt, $title, $row_List, $id;

		$affSpot = $row_List['affspot'];
			if (preg_match("/bookings/", $affSpot )) {
			$affSpot = str_replace("/en/", "/$lang/", $affSpot);
			}


		if ( (isset($row_List['affspot'])) && ($typeInt <> 4) )
		{
			$html = '<a href="'.$affSpot.'" rel="nofollow" onClick="_gaq.push([\'_trackEvent\', \'Booking.com\', \'Check prices (list)\', \''. $row_List['title_' .$lang .''] .'\']);"><div class="right"><button class="small blue">' . $translate['check prices'][''.$lang.''] .'</button></div></a>';
		}

		if ( isset($row_List['affurl4']) )
		{
			$html = '<a href="'.$row_List['affurl4'].'" rel="nofollow" onClick="javascript: pageTracker._trackPageview(\'/villarenters/prices/'. $row_List['type'] .'/'. $row_List['id'] .'\')"><div class="right"><button class="tiny">' . $translate['check prices'][''.$lang.''] .'</button></div></a>';
		}

		if ( isset($row_List['affurl5']) )
		{
			$html = '<a href="http://clkuk.tradedoubler.com/click?p(20358)a(1460512)g(739719)url('.$row_List['affurl5'].')" rel="nofollow" onClick="javascript: pageTracker._trackPageview(\'/jamesvillas/'. $row_List['type'] .'/'. $row_List['id'] .'\')"><div class="right"><button class="tiny">' . $translate['check prices'][''.$lang.''] .'</button></div></a>';
		}

		return $html;
		}






		function affbuttons(){

			global $affSpot, $affUrl4, $lang, $typeInt, $title, $id;

			//$affButtons = $affUrl4;



		if (isset($affSpot) && ($typeInt <> 4)) {

			$affButtons = '<a href="'.$affSpot.'" rel="nofollow" onClick="javascript: pageTracker._trackPageview(\'/spotlight/'. $typeInt.'/'. $id.'\')"><img src="/images/interface/spotbookaff_'.$lang.'.gif" width="300" height="120" border="0" alt="Book '.$title.' online" /></a>';

			return $affButtons;

		}

		if (($affSpot =='') && ($typeInt <> 4)) {

			$affButtons = '<a href="http://www.ibiza-spotlight.com/hotel-guide/?aid=101" rel="nofollow" onClick="javascript: pageTracker._trackPageview(\'/spotlight/'. $typeInt.'/'. $id.'\')"><img src="/images/interface/spotaff_'.$lang.'.gif" width="300" height="120" border="0" alt="Book Ibiza Spotlight Hotels" /></a>';
		}


		if (isset($affUrl4) && ($typeInt == 3)) {

		$affButtons = '<img src="/images/interface/villaaff_en.gif" width="300" height="120" border="0" usemap="#Map" />
		<map name="Map" id="Map">
<area shape="rect" coords="98,46,196,78" href="'.$affUrl4.'" target="_blank" rel="nofollow" onClick="javascript: pageTracker._trackPageview(\'/villarenters/'. $typeInt.'/'. $id.'\')" />
</map>';

		}

		if (isset($affUrl4) && ($typeInt == 4)) {

		$affButtons = '<img src="/images/interface/villaaff_en.gif" width="300" height="120" border="0" usemap="#Map" />
		<map name="Map" id="Map">
<area shape="rect" coords="98,46,196,78" href="'.$affUrl4.'" target="_blank" rel="nofollow" onClick="javascript: pageTracker._trackPageview(\'/villarenters/'. $typeInt.'/'. $id.'\')" />
</map>';

		}

		return $affButtons;

		}






	function accom($infotype, $onoff) {

		  if( $onoff == 1) {

		  $accomInfo = '<li class="notes">'.$infotype.'</li>';

		  }

		  else $accomInfo = '';

	return $accomInfo;

	}

	function proplist($infotype, $onoff) {

		  if( $onoff == 1) {

		  $propertyList = '<li class="notes">'.$infotype.'</li>';

		  }

		  else $propertyList = '';

	return $propertyList;

	}

function accommodation($infotype, $onoff, $translate) {

		  if( $onoff == 1) {

		  $accomIcons = '<img src="/images/icons/'.$infotype.'.png" alt="'.$translate.'" />';

		  } else {

		  $beachNotes = '';

		  }

	return $accomIcons;

	}

	function beach($infotype, $onoff, $translate) {

		  if( $onoff == 1) {

		  $beachIcons = '<img src="/images/icons/'.$infotype.'.png" alt="'.$translate.'" />';

		  } else {

		  $beachIcons = '';

		  }

	return $beachIcons;

	}

	function crowds($infotype, $number, $lang, $translate) {
	require('lang.php');
	switch ($number) {
	case 1:
		$crowds = '<tr class="notes">
		  <td><img src="/images/icons/'.$infotype.'.gif" alt="'.$infotype.'" width="21" height="20" align="absmiddle" />'.$translate['Crowds'][''.$lang.''].'</td><td>'.$translate['Uncrowded'][''.$lang.''].'</td></tr>';

		break;
	case 2:
		$crowds = '<tr class="notes">
		  <td><img src="/images/icons/'.$infotype.'.gif" alt="'.$infotype.'" width="21" height="20" align="absmiddle" />'.$translate['Crowds'][''.$lang.''].'</td><td>'.$translate['Average'][''.$lang.''].'</td></tr>';
		break;
	case 3:
		$crowds = '<tr class="notes">
		  <td><img src="/images/icons/'.$infotype.'.gif" alt="'.$infotype.'" width="21" height="20" align="absmiddle" />'.$translate['Crowds'][''.$lang.''].'</td><td>'.$translate['Crowded'][''.$lang.''].'</td></tr>';
		break;
	}

	return $crowds;

	}

function detailImages() {



	global $typeUrl, $id;
	$detailImageDir = '/images/pages/'.$typeUrl.'/'.$id.'';


	  function getImages($dir) {

	  //$imagetypes = array("image/jpeg", "image/gif", "image/jpg");

	  $retval = array();

	  # add trailing slash if missing

	  if(substr($dir, -1) != "/") $dir .= "/";

	  # full server path to directory

	  $fulldir = "{$_SERVER['DOCUMENT_ROOT']}$dir";
	  if (file_exists($fulldir)) {
	  $d = @dir($fulldir) or die("getImages: Failed opening directory $dir for reading");
	  while(false !== ($entry = $d->read())) {

	  # skip hidden files

	  if($entry[0] == ".") continue;

	  # check for image files

	  if(substr("$fulldir$entry", -11, 5) == "image")  {
	  $retval[] = array( "file" => "$dir$entry", "size" => getimagesize("$fulldir$entry") );

	  }

	  }

	  $d->close();

	  }

	  return $retval;

	  }


	  $imgs = getImages($detailImageDir);


		  //$this->html = $imgs;
          return $imgs;;
}




		function infoMapBox () {

			global $infoForTrans, $id, $lang, $detailTrans, $title, $distancesTrans, $totalRows_hotels, $accomWithinTrans, $row_hotels, $row_detailpage, $hotels, $restaurants, $totalRows_restaurants, $row_restaurants, $translate, $row_Distances, $Distances;

			$infoBoxHtml = '<div class="columns">';
			$infoBoxHtml .= '<div class="column col-1-2">';



			if ( $totalRows_hotels > 0 ) {
				$infoBoxHtml .= '<p class="distancehead">' . $accomWithinTrans .' ' .  $title .'</p>';

	do {
		$infoBoxHtml .= '<div class="alignleft">'.round($row_hotels['distance'],1).' Km&nbsp;</div><a href="/'.$lang.'/'. $row_hotels['muniurl'] .'/'.$row_hotels['typeurl'].'/'.$row_hotels['id'].'.html">' . $row_hotels['name_'.$lang.''] .' </a><br />';
	} while ($row_hotels = mysqli_fetch_assoc($hotels));

	$infoBoxHtml .= '</div>';

	$infoBoxHtml .= '<div class="column col-1-2 last">';



			}

			if ($totalRows_restaurants > 0){
	$infoBoxHtml .= '<p class="distancehead">' . $translate['Restaurants within'][''.$lang.''].' ' .  $row_detailpage['title'] .'</p>';

	do {
		$infoBoxHtml .= '<div class="alignleft">'.round($row_restaurants['distance'],1).' Km&nbsp;</div><a href="/'.$lang.'/'. $row_restaurants['muniurl'] .'/'.$row_restaurants['typeurl'].'/'.$row_restaurants['id'].'.html">' . $row_restaurants['name_'.$lang.''] .' </a><br />';
	} while ($row_restaurants = mysqli_fetch_assoc($restaurants));

}

			$infoBoxHtml .= '<p class="distancehead">'.$translate['Distance towns'][''.$lang.''].'</p>';

			do {
		$dist_array = array(13,18,22,14,25,7,9,24,26);
	  if (in_array($row_Distances['type'], $dist_array) && ($row_Distances['type'] <> 14) && ($row_Distances['id'] <> $id))
	  {

	  $infoBoxHtml .= '<div class="alignleft">'.round($row_Distances['distance'],1).' Km&nbsp;</div><a href="/'.$lang.'/'.$row_Distances['muniurl'].'/'. $row_Distances['typeurl'].'/'.$row_Distances['id'].'.html">'.$row_Distances['name_'.$lang.''].'</a><br />';
	  }
	  /*if (($row_Distances['type'] <> 14) && ($row_Distances['type'] <> 13))
	  {
	  echo '<p>'.round($row_Distances['distance'],2).' Km - <a href="/'.$lang.'/'.$row_Distances['muniurl'].'/'. $row_Distances['typeurl'].'/'.$row_Distances['id'].'.html">'.$row_Distances['name_'.$lang.''].'</a></br>';

	  }*/


} while ($row_Distances = mysqli_fetch_assoc($Distances));

			$infoBoxHtml .= '</div>';



			$infoBoxHtml .= '</div><br /><br />';


			//echo $infoBoxHtml;

			return $infoBoxHtml;

		}

} //end of class

?>
