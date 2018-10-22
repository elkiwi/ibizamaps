<?php
/**
 * @package Website_Template
 * @since Website 1.0
 */
?>

			</div>
		</div>
		<!-- // Main section -->
		
		<!-- Bottom section -->
		<footer id="bottom">
			<div class="container">

				<!-- Bottom aside -->
				<aside id="aside-bottom" class="clear">
					<ul>
						<li class="small widget widget-info">
							<hgroup>
								<h1>Ibiza Maps</h1>
								<h2>Unfolding to new<br />Discoveries</h2>
							</hgroup>
						</li>
						
						<li class="small widget widget-twitter" data-username="ibizamaps" data-count="2" data-retweets="true">
							<h1>Latest tweets</h1>
							<div class="tweets"></div>
						</li>
						<li class="small widget widget-text">
							<h1>Address</h1>
							<p>
								email: <a href="mailto:info@ibizamaps.net">info@ibizamaps.net</a><br />
								
								
							</p>
							<p>
								Apdo Correos 25<br />
								Sant Antoni de Portmany<br />
								07820 Ibiza<br />
								España
							</p>
						</li>
						<li class="fixed widget widget-contact" data-id="52617155@N08" data-count="8">
							<h1>New Pages</h1>
        <?php do { ?>
 <p><a href="/en/<?php echo $row_newpages['muniurl']; ?>/<?php echo $row_newpages['typeurl']; ?>/<?php echo $row_newpages['id']; ?>.html"><?php echo $row_newpages['name_en']; ?></a></p>
<?php } while ($row_newpages = mysql_fetch_assoc($newpages)); ?>
							
						</li>
					</ul>
				</aside>
				<!-- // Bottom aside -->

				<!-- Footer -->
				<section id="footer" class="clear">
					<p class="alpha">&copy; Copyright, <?php echo date("Y"); ?><br /><a href="http://www.kiwi-designed.com">Kiwi Designed - Ibiza Web Design</a></p>
					
				</section>
				<!-- // Footer -->

			</div>
		</footer>
		<!-- // Bottom section -->

        

		<script type="text/javascript">

		  var _gaq = _gaq || [];
			var pluginUrl =
			 '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
			_gaq.push(['_require', 'inpage_linkid', pluginUrl]);
		  _gaq.push(['_setAccount', 'UA-289128-8']);
		  _gaq.push(['_trackPageview']);
		
		  (function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		
		</script>
		


		

	</body>
</html>