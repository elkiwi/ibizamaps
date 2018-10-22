<?php
/**
 * @package Website_Template
 * @since Website 1.0
 */
?>

<!-- Aside -->
<aside id="aside" class="beta">

<div class="columns">
<div class="column 1-2">

<!--<iframe src="http://www.ibiza-spotlight.com/widgets/partyselector/101/?ajax=1" scrolling="no" width="315" height="225"></iframe>
<hr />-->
<div class="fb-like-box" data-href="http://www.facebook.com/ibizamaps" data-width="330" data-show-faces="false" data-stream="false" data-header="false"></div>
<hr />
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Ibiza maps large square sidebar -->
<ins class="adsbygoogle"
     style="display:inline-block;width:300px;height:250px"
     data-ad-client="ca-pub-8283575214062599"
     data-ad-slot="6943396552"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script><br />


 <iframe src="http://www.booking.com/?aid=378800&tmpl=searchbox&width=315&region=1408&ifl=1&ss=ibiza&label=ibizamapssearch&lang=<?php echo $lang;?>" scrolling="no" width="315" height="225"></iframe><br />


<a href="https://www.booking.com/region/es/ibiza.en.html?aid=378800&no_rooms=1&group_adults=1"><img src="/content/spot_carhire.jpg" width="160" height="96" alt="Spotlight Car hire" /></a><a href="https://www.booking.com/region/es/ibiza.en.html?aid=378800&no_rooms=1&group_adults=1"><img src="/content/spot_tickets.jpg" width="158" height="96" alt="Spotlight Club Tickets" /></a>
</div>
<div class="columns 1-2 last">
<a href="https://www.booking.com/region/es/ibiza.en.html?aid=378800&no_rooms=1&group_adults=2"><img src="/content/hotels.jpg" width="158" height="96" alt="Ibiza Hotels" /></a><a href="https://www.booking.com/region/es/ibiza.en.html?aid=378800&no_rooms=1&group_adults=4"><img src="/content/villas.jpg" width="160" height="96" alt="Ibiza Villas" /></a>
</div>
</div> <!-- close columns-->
<ul>

<!--  <li><a href="http://www.facebook.com/IbizaMaps" title="Like Us" style="background-image: url(/data/img/<?php echo $website_config['scheme']; ?>/social/facebook.png);">Like Us</a></li>

  <li><a href="https://twitter.com/#!/ibizamaps" title="Follow Us" style="background-image: url(/data/img/<?php echo $website_config['scheme']; ?>/social/twitter.png);">Follow Us</a></li>

</ul>
		<ul>-->
		<!--<li class="widget widget-search">
		<form action="http://www.ibizamaps.net/results.php" id="cse-search-box">

        <input type="hidden" name="cx" value="partner-pub-8283575214062599:k9cucu-1kig" />
        <input type="hidden" name="cof" value="FORID:10" />
        <input type="hidden" name="ie" value="UTF-8" />
        <div class="input"><input name="s" type="text" placeholder="search" /> </div>


    </form>
		</li>-->


<br />
<p class="head"><strong>Ibiza Towns &amp; Locations</strong></p>
<?php do { ?>
  <p><a href="/en/<?php echo $row_places['muniurl']; ?>/<?php echo $row_places['typeurl']; ?>/<?php echo $row_places['id']; ?>.html"><?php echo $row_places['place_name']; ?></a></p>
  <?php } while ($row_places = mysqli_fetch_assoc($places)); ?>


</ul><br />

<div id ="directionsPanel"></div>




<script type="text/javascript">
<!--
google_ad_client = "ca-pub-8283575214062599";
/* NewIbizaMaps sidebar */
google_ad_slot = "2890113358";
google_ad_width = 336;
google_ad_height = 280;
//-->
</script>

<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
</aside>
<!-- // Aside -->