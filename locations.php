<?php
/**
 * @package Website_Template
 * @since Website 1.0
 */

// -----------------------------------------------------------------------------
	$thepage = 'locations';


	require '_top.php';
	require '_nav.php';
$pageTitle = $translate['Map of'][''.$lang.''].' '. $row_location['name_'.$lang.''] .', Ibiza '. $translate['Spain'][''.$lang.''];

 //echo __FILE__;









?>
<!-- Content -->
<div id="map_canvas" style="margin-left:5px; width: 100%; height: 450px;"></div>

<section id="content" class="alpha">

	<!-- Right sidebar -->
	<article class="post page">
		<section class="main clear">
			<h1 class="title"><?php echo $pageTitle; ?></h1>
			<div class="content">
				<?php echo $row_location['html_' . $lang .''];?>

			</div>
		</section>
  <?php if(!isset($muni)) { ?>
  <!-- Filter -->
	<section class="filter">
		<a href="#">all</a>
		<a href="#ibiza">Ibiza</a>
		<a href="#san-antonio">San Antonio</a>
  <a href="#san-jose">San José</a>
  <a href="#santa-eulalia">Santa Eulalia</a>
  <a href="#san-jaun">San Jaun</a>

	</section>
 <?php } ?>
	<!-- // Filter -->


  	<section class="items small clear">
  <?php

			 do {



  $type = $row_List['typeurl'];
		$muni = $row_List['muniurl'];
		$onrequest = $row_List['onrequest'];
		$number = $row_List['price'];
		$english_format_number = number_format($number, 0, '', '.') ;
		$price = '';

		$image = $row_List['filename'];

		if ($image == '') $image = 'image_1.jpg';


		//exit ( $query_List );


		$id = $row_List['id'];?>

		<article class="item" data-category="<?php echo $muni;?>">
			<div class="image">
				<a href="/<?php echo $lang . '/' . $muni . '/' . $type . '/' . $id . '.html';?>">
					<img src="/" data-src="/images/pages/<?php echo $id . '/' . $image;?>" height="180" class="responsive" alt="" />
					<span class="hover"></span>
				</a>
			</div>
			<section class="main">
				<div class="content">
                <h5><strong><?php echo $row_List['title_' .$lang .''];?></strong></h5>
                <?php
                if($row_List['pool'] == 1){
																	echo '<img src="/images/icons/pool.png" alt="'.$translate.'" />';
																	};

																	if($row_List['sattv'] == 1){
																	echo '<img src="/images/icons/sattv.png" alt="'.$translate.'" />';
																	};

																	if($row_List['aircon'] == 1){
																	echo '<img src="/images/icons/aircon.png" title="'.$translate.'" />';
																	};

																	if($row_List['minibar'] == 1){
																	echo '<img src="/images/icons/minibar.png" alt="'.$translate.'" />';
																	};

																	if($row_List['internet'] == 1){
																	echo '<img src="/images/icons/internet.png" alt="'.$translate.'" />';
																	};




																	?>
                <p><?php echo $row_List['summary_' . $lang .''];?></p>
<?php $accom_array = array('hotels','hostels','apartments','villas','rural-hotels','accommodation');
																	if (in_array($colname_List, $accom_array)) { ?>
																	<div>
																	<p class="priceTitle"><?php echo $translate['Average price'][''.$lang.'']?> /
																	<?php if ($row_List['type'] == 4) echo $translate['Week'][''.$lang.'']; else echo $translate['Night'][''.$lang.''];?>
                 <?php  echo ' <strong>' . round($row_List['pricelow'] + $row_List['pricehigh'])/2 . '€</strong>'; ?>
																	</p>

																	<?php $accomarray = array(1,2,3,4,5,23);
																	if (in_array($row_List['type'], $accomarray)) {
																		echo $html->listPriceButtons();
																	}
																	;?>
																	</div>
																	<?php } ?>




					<!--<p class="tags">
						<a href="#_">tag one</a>
						<a href="#_">another tag</a>
						<a href="#_">favourite</a>
					</p>-->
				</div>
			</section>
		</article>

		<?php } while ($row_List = mysqli_fetch_assoc($List));



		;?>
        </section>
		<ul class="social clear">
			<li><a href="https://twitter.com/share" class="twitter-share-button" data-url="<?php echo 'http://www.ibizamaps.net' . $_SERVER['REQUEST_URI'];?>" data-text="<?php echo $pageTitle; ?>" data-count="horizontal">Tweet</a></li>
			<li><div class="fb-like" data-href="<?php echo 'http://www.ibizamaps.net' . $_SERVER['REQUEST_URI'];?>" data-send="false" data-layout="button_count"></div></li>
			<li><div class="g-plusone" data-size="medium" data-href="<?php echo 'http://www.ibizamaps.net' . $_SERVER['REQUEST_URI'];?>"></div></li>
		</ul>
	</article>
	<!-- // Right sidebar -->

</section>
<!-- // Content -->


<?php
	require '_aside_first.php';
	require '_bottom.php';
	mysqli_free_result($List);
?>