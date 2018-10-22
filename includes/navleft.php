<?php

echo '

<p><strong class="red">'.$translate['forsale'][''.$lang.''].'</strong><br />

<a href="/'.$lang .'/'. $translate['forsaleurl'][''.$lang.''].'/">'.$translate['all'][''.$lang.''].'</a><br />
  
  
<a href="/'.$lang .'/'. $translate['motorlink'][''.$lang.''] .'/'. $translate['forsaleurl'][''.$lang.''].'/">'.$translate['motor'][''.$lang.''].'</a><br />

<a href="/'.$lang .'/'. $translate['saillink'][''.$lang.''] .'/'. $translate['forsaleurl'][''.$lang.''].'/">'.$translate['sail'][''.$lang.''].'</a><br />


	
</p>

<p><strong class="red">'.$translate['forrent'][''.$lang.''].'</strong><br />

<a href="/'.$lang .'/'. $translate['forrenturl'][''.$lang.''].'/">'.$translate['all'][''.$lang.''].'</a><br />
  
<a href="/'.$lang .'/'. $translate['motorlink'][''.$lang.''] .'/'. $translate['forrenturl'][''.$lang.''].'/">'.$translate['motor'][''.$lang.''].'</a><br />

<a href="/'.$lang .'/'. $translate['saillink'][''.$lang.''] .'/'. $translate['forrenturl'][''.$lang.''].'/">'.$translate['sail'][''.$lang.''].'</a><br />


<p><strong class="red">Services</strong><br />

<a href="/'.$lang .'/'.$translate['crewslink'][''.$lang.''].'/">'.$translate['crews'][''.$lang.''].'</a><br />

  
<a href="/'.$lang .'/'.$translate['surveyslink'][''.$lang.''].'/">'.$translate['surveys'][''.$lang.''].'</a></p>

<p><strong class="red">'.$translate['contact'][''.$lang.''].'</strong><br />';

if ($titlesalerent == 'forrent')
	{
	echo '
	
	Tel: 0034 971 310 128<br />
	
	<a href="mailto:info@yacht77.com">rent@ibizatophouse.com</a><br />
	</p>';
	}
else 
	{
	echo 'Tel: 0034 639239299<br />
	<a href="mailto:info@yacht77.com">info@ibizatophouse.com</a><br />
	</p>';
	}

echo '<p><strong class="red">'.$translate['aboutus'][''.$lang.''].'</strong><br />
<a href="/'.$lang .'/ibizatophouse/">'.$translate['aboutus'][''.$lang.''].'</a><br />
<a href="http://architecture.ibizatophouse.com/">'.$translate['architecture'][''.$lang.''].'</a></p>';
 
?>


<br clear="all" />

