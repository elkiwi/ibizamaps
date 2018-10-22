<?php
/**
 * @package Website_Template
 * @since Website 1.0
 */

// -----------------------------------------------------------------------------
	$thepage = 'islandmap';


	require '_top.php';
	require '_nav.php';
$pageTitle = 'Ibiza ' . $row_infopages['title_' . $lang . ''];

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
				<?php echo $row_infopages['html_' . $lang .''];?>

			</div>
		</section>



  	<section class="items small clear">

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