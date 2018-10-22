<?php
/**
 * @package Website_Template
 * @since Website 1.0
 */

// -----------------------------------------------------------------------------
	$lang = $_GET['lang'];
    $thepage = 'detail';
	include '_top.php';
	require '_nav.php';


?>

<!-- Content -->

<section id="content" class="alpha">

  <!-- Credits -->
  <article class="post default">
    <section class="main clear">
      <h1 class="title"><?php echo $html->h1Title();?></h1>
      <div style="float:right; padding: 0 20px 20px 20px;" class="content"><?php echo $html->affilliateLink();?></div>
      <?php if ($row_detailpage['typeurl'] == 'beaches') {
						$beaches = new details();
						echo
						$beaches->beach("blueflag", $row_Beaches['blueflag'], $translate['Blue Flag'][''.$lang.'']).
						//$beaches->crowds("crowds", $row_Beaches['crowds'], $lang, $translate['Crowds'][''.$lang.''] ).
						$beaches->beach("parking", $row_Beaches['parking'], $translate['Parking'][''.$lang.'']).
						$beaches->beach("bus", $row_Beaches['bus'], $translate['Bus'][''.$lang.'']).
						$beaches->beach("toilets", $row_Beaches['toilets'], $translate['Toilets'][''.$lang.'']).
						$beaches->beach("showers", $row_Beaches['showers'], $translate['Showers'][''.$lang.'']).
						$beaches->beach("rubbish", $row_Beaches['rubbish'], $translate['Rubbish'][''.$lang.'']).
						$beaches->beach("lifeguard", $row_Beaches['lifeguard'], $translate['Lifeguard'][''.$lang.'']).
						$beaches->beach("sunbeds", $row_Beaches['sunbeds'], $translate['Sunbed Hire'][''.$lang.'']).
						//$beaches->beach("shop", $row_Beaches['shop'], $translate['Shop'][''.$lang.'']).
						$beaches->beach("beachbar", $row_Beaches['beachbar'], $translate['Beach Bar'][''.$lang.'']).
						$beaches->beach("restaurant", $row_Beaches['restaurant'], $translate['Restaurant'][''.$lang.'']).
						$beaches->beach("snorkeling", $row_Beaches['snorkeling'], $translate['Snorkeling'][''.$lang.'']).
						$beaches->beach("disabled", $row_Beaches['disabled'], $translate['Disabled'][''.$lang.'']).
						$beaches->beach("nudist", $row_Beaches['nudist'], $translate['Nudist'][''.$lang.''])
						;
			};
						if ($row_detailpage['typeurl'] == 'hotels') {
						$accommodation = new details();
						echo
						$accommodation->accommodation("restaurant", $row_Accom['restaurant'], $translate['Restaurant'][''.$lang.'']).
						$accommodation->accommodation("bar", $row_Accom['bar'], $translate['Bar'][''.$lang.'']).
						$accommodation->accommodation("aircon", $row_Accom['aircon'], $translate['Aircon'][''.$lang.'']).
						$accommodation->accommodation("pool", $row_Accom['pool'], $translate['Pool'][''.$lang.'']).
						$accommodation->accommodation("sattv", $row_Accom['sattv'], $translate['Sattv'][''.$lang.'']).
						$accommodation->accommodation("internet", $row_Accom['internet'], $translate['Internet'][''.$lang.'']).
						$accommodation->accommodation("minibar", $row_Accom['minibar'], $translate['Minibar'][''.$lang.'']);
						}


?>
      <p><strong><?php echo $row_detailpage['summary_'.$lang.''];?></strong></p>
      <div class="content">
        <ul class="social clear">
          <li><a href="https://twitter.com/share" class="twitter-share-button" data-url="<?php echo 'http://www.ibizamaps.net' . $_SERVER['REQUEST_URI'];?>" data-text="<?php echo $row_detailpage['title'] .' '.  $row_detailpage['zonename_'.$lang.''] .' - '. $translate[''.$titlesalerent.''][''.$lang.'']; ?>" data-count="horizontal">Tweet</a></li>
          <li>
            <div class="fb-like" data-href="<?php echo 'http://www.ibizamaps.net' . $_SERVER['REQUEST_URI'];?>" data-send="false" data-layout="button_count"></div>
          </li>
          <li>
            <div class="g-plusone" data-size="medium" data-href="<?php echo 'http://www.ibizamaps.net' . $_SERVER['REQUEST_URI'];?>"></div>
          </li>
        </ul>
        <div class="tabs" id="tabs">
          <ul>
            <li>Details</li>
            <li>Map & Taxi Prices</li>
            <li>Close by here</li>
            <li>Comments</li>
            <?php if($row_image_gallery != 0) { ?>
            <li>Gallery</li>
            <?php } ?>
            <!--<li>Contact</li>-->
          </ul>
          <div>
          <?php if($row_image_gallery != 0) { ?>
            <figure class="alignright full-width-mobile" style="width: 40%;">
              <?php do {
											echo '
											<a href="/images/pages/' . $row_detailpage['id'] . '/' . str_replace('image300_','',$row_image_order['filename']) . '" title="' . $row_detailpage['title'] . '" class="fancybox" rel="gallery" >
											<img src="/" data-src="/images/pages/' . $row_detailpage['id'] . '/' . $row_image_order['filename'] . '" class="responsive"   /></a>
											<figcaption>' . $row_detailpage['title'] . '</figcaption>
											';
											 } while ($row_image_order = mysqli_fetch_assoc($image_order));

																				?>
            </figure>
            <?php } ?>
            <?php echo $row_detailpage['html_'.$lang.''];?> <br />
												<div class="content"><?php echo $html->affilliateLink();?></div>



            </div>
          <div>
            <div id="distance"  style="width:400px; float:right;"></div>
            <p><strong>Directions and Taxi prices to/from:</strong><br />

              <select id="end" onchange="calcRoute();">
                <option selected="selected">pls select</option>
                <?php
                            do {
                            ?>
                <option value="<?php echo $row_directions['lat']?>,<?php echo $row_directions['lng']?>"><?php echo $row_directions['name_en']?></option>
                <?php
                            } while ($row_directions = mysqli_fetch_assoc($directions));
                              $rows = mysqli_num_rows($directions);
                              if($rows > 0) {
                                  mysqli_data_seek($directions, 0);
                                  $row_directions = mysqli_fetch_assoc($directions);
                              }
                            ?>
              </select>
            </p>
            <div id="map_canvas" style="width:100%; height:450px"></div>
            <div id="directionsPanel" width="650px"></div>
          </div>
          <div> <?php echo $html->infoMapBox(); ?> </div>
          <div>
            <div id="commax_container">
            <div id="fb-root"></div>
												<script>(function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = "//connect.facebook.net/en_GB/all.js#xfbml=1&appId=245895675436453";
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));</script>
              <div class="fb-comments" data-href="<?php echo "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]"; ?>" data-width="700" data-num-posts="10"></div>

            </div>
          </div>
          <?php if($row_image_gallery != 0) { ?>
          <div>

            <!-- Gallery tiny -->
            <section class="items tiny clear">
              <?php do { ?>
                <?php $filename = $row_image_gallery['filename'];?>
                <article class="item">
                  <div class="image"> <a href="<?php echo '/images/pages/' . $row_detailpage['id'] . '/' . str_replace('image300_' , '', $filename) ;?>"  class="fancybox" rel="gallery" title=""><img src="/" data-src="<?php echo '/images/pages/' . $row_detailpage['id'] . '/' . $filename  ;?>"  class="responsive" alt="" > <span class="hover"></span></a> </div>
                </article>
                <?php } while ($row_image_gallery = mysqli_fetch_assoc($image_gallery)); ?>
            </section>
          </div>
          <?php } ?>

        </div>
        <!-- close tabs -->

      </div>
    </section>
    <ul class="social clear">
      <li><a href="https://twitter.com/share" class="twitter-share-button" data-url="<?php echo 'http://www.ibizamaps.net' . $_SERVER['REQUEST_URI'];?>" data-text="<?php echo $row_detailpage['title'] .' '.  $row_detailpage['zonename_'.$lang.''] .' - '. $translate[''.$titlesalerent.''][''.$lang.'']; ?>" data-count="horizontal">Tweet</a></li>
      <li>
        <div class="fb-like" data-href="<?php echo 'http://www.ibizamaps.net' . $_SERVER['REQUEST_URI'];?>" data-send="false" data-layout="button_count"></div>
      </li>
      <li>
        <div class="g-plusone" data-size="medium" data-href="<?php echo 'http://www.ibizamaps.net.com' . $_SERVER['REQUEST_URI'];?>"></div>
      </li>
    </ul>
  </article>
  <!-- // Credits -->

</section>
<!-- // Content -->

<?php
	require '_aside_first.php';
	require '_bottom.php';
?>
