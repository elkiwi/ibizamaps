<?php



echo '

<br clear="all"/>

<p align="center"><img src="/images/ui/logo.small.gif" alt="Ibiza Top House Real Estate" width="235" height="75" /></p>

<p align="center" class="btmnav"><a href="/">'. $translate['home'][''.$lang.''].'</a> | <a href="/contact.php?lang='.$lang.'&amp;id='.$id.'&amp;salerent='.$salerent.'">'.$translate['contact'][''.$lang.''].'</a> | <a href="/link.htm">Links</a></p>';

if ($titlesalerent == 'forrent')
	{
	echo '
	
	<p align="center">Tel: 0034 971 310 128<br />
	
	<a href="mailto:info@yacht77.com">info@yach77.com</a><br />
	</p>';
	}
else 
	{
	echo '<p align="center">Tel: 0034 639239299<br />
	<a href="mailto:info@yacht77.com">info@yach77.com</a><br />
	</p>';
	}
 
?>


