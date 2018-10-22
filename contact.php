<?php
/**
 * @package Website_Template
 * @since Website 1.0
 */

// -----------------------------------------------------------------------------
	$thepage = 'contact';
	require '_top.php';
	require '_nav.php';
	






?>

<!-- Content -->
<section id="content" class="alpha">

	<!-- Right sidebar -->
	<article class="post page">
		<section class="main clear">
			<h1 class="title">Contact Ibiza Maps</h1>
			<div class="content">

				
				<p>Please contact us with any enquiries.</p>
				<p>&nbsp;</p>

				<hr />

				<div class="quform-outer">
        <form class="quform" action="/quform/process.php" method="post" enctype="multipart/form-data">
            <div class="quform-wrapper">
   	            <input type="hidden" name="language" value="<?php echo $lang;?>"/>
   	           
	   	        <div class="quform-inner">
	   	            <div class="quform-title"><?php echo $translate['emailnote'][''.$lang.'']?></div>
	                <div class="quform-elements clearfix">                    
                        <!-- Begin Name element -->
                        <div class="element-wrapper name-element-wrapper clearfix">
                            <label for="name"><?php echo $translate['name'][''.$lang.'']?><span class="red">*</span></label>
                            <div class="input-wrapper name-input-wrapper">
                                <input class="name-element" id="name" type="text" name="name" />
                            </div>
                        </div>
                        <!-- End Name element -->
                        <!-- Begin Email element -->
                        <div class="element-wrapper email-element-wrapper clearfix">
                            <label for="email">Email <span class="red">*</span></label>
                            <div class="input-wrapper email-input-wrapper">
                                <input class="email-element quform-tooltip" id="email" type="text" name="email" title="<?php echo utf8_encode( $translate['makesure'][''.$lang.'']);?>" />
                            </div>
                        </div>
                        
                        
                        
                       
                        <!-- Begin Subject element -->
                        <div class="element-wrapper subject-element-wrapper clearfix">
                            <label for="subject"><?php echo $translate['subject'][''.$lang.'']?></label>
                            <div class="input-wrapper subject-input-wrapper clearfix">
                                 <input class="email-element quform-tooltip" id="subject" type="text" name="subject"  />
                            </div>
                        </div>
                        <!-- End Subject element -->
                        <br />

                        <!-- Begin Message element -->
                        <div class="element-wrapper message-element-wrapper clearfix">
                            <label for="message"><?php echo $translate['message'][''.$lang.'']?> <span class="red">*</span></label>
                            <div class="input-wrapper message-input-wrapper clearfix">
                                <textarea class="message-element" id="message" name="message" rows="7" cols="45"></textarea>
                            </div>
                        </div>
                        <!-- End Message element -->
                        
                        <!-- Begin Captcha element -->
                      
                      <div class="element-wrapper captcha-element-wrapper clearfix">
                        <label for="type_the_word">Anti Spam <span class="red">*</span></label>
                        <div class="input-wrapper captcha-input-wrapper clearfix">
                          <div class="quform-captcha-img"><img src="/quform/images/captcha.png" alt="" /></div>
                          <input id="type_the_word" class="captcha-element" type="text" name="type_the_word" />
                        </div>
                      </div>
                      
                      <!-- End Captcha element --> 
                       
                        <!-- Begin Submit button -->
                        <div class="button-wrapper submit-button-wrapper clearfix">
                            <div class="quform-loading-wrap"><span class="loading">Please wait...</span></div>
                            <div class="button-input-wrapper submit-button-input-wrapper">
                                <input type="submit" class="quform-submit-button" value="<?php echo $translate['send'][''.$lang.''] ?>" name="boom" />
                            </div>

                        </div>
                        <!-- End Submit button -->
	               </div><!-- .quform-elements -->
	           </div><!-- .quform-inner -->	  
            </div><!-- .quform-wrapper -->         
        </form>
	</div>

			</div>
		</section>
		<ul class="social clear">
			<li><a href="https://twitter.com/share" class="twitter-share-button" data-url="<?php echo $_SERVER['SERVER_NAME'] . $_SERVER['SCRIPT_NAME'] ;?>" data-text="Website - responsive template" data-count="horizontal">Tweet</a></li>
			<li><div class="fb-like" data-href="http://themes.kubasto.com/template/website/contact.php" data-send="false" data-layout="button_count"></div></li>
			<li><div class="g-plusone" data-size="medium" data-href="http://themes.kubasto.com/template/website/contact.php"></div></li>
		</ul>
	</article>
	<!-- // Right sidebar -->

</section>
<!-- // Content -->

<?php
	require '_aside_right.php';
	require '_bottom.php';
?>