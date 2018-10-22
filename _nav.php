<?php
/**
 * @package Website_Template
 * @since Website 1.0
 */
?>

<!-- Main navigation -->

<nav id="nav-main" class="clear">
  <ul>
    <li><a href="<?php echo ($lang == 'en') ? '/' : '/es/' ;?>" title="<?php echo $translate['Ibiza Maps'][''.$lang.''];?>"><span><?php echo $translate['Ibiza Maps'][''.$lang.''];?> Home</span></a></li>
    
    <li><a href="/<?php echo $lang;?>/accommodation/" ><?php echo $translate['Accommodation'][''.$lang.''];?></a>
      <ul>
        <li><a href="<?php echo '/' .$lang. '/';?>accommodation/hotels/"><?php echo $translate['Hotels'][''.$lang.''];?></a>
          <ul>
            <li><a href="/<?php echo $lang;?>/ibiza/hotels/">Ibiza</a></li>
            <li><a href="/<?php echo $lang;?>/san-antonio/hotels/">San Antonio</a></li>
            <li><a href="/<?php echo $lang;?>/santa-eulalia/hotels/">Santa Eulalia</a></li>
            <li><a href="/<?php echo $lang;?>/san-jose/hotels/">San José</a></li>
          </ul>
        </li>
        
        <li><a href="<?php echo '/' .$lang. '/';?>accommodation/hostels/"><?php echo $translate['Hostels'][''.$lang.''];?></a></li>
        <li><a href="<?php echo '/' .$lang. '/';?>accommodation/villas/">Villas</a></li>
        <li><a href="<?php echo '/' .$lang. '/';?>accommodation/apartments/"><?php echo $translate['Apartments'][''.$lang.''];?></a></li>
        <li><a href="<?php echo '/' .$lang. '/';?>accommodation/rural-hotels/"><?php echo $translate['Rural Hotels'][''.$lang.''];?></a></li>
      </ul>
    </li>
    
    <li><a href="<?php echo '/' .$lang. '/';?>restaurants/"><?php echo $translate['Restaurants'][''.$lang.''];?></a>
       <ul>
          <li><a href="<?php echo '/' .$lang. '/';?>ibiza/restaurants/">Ibiza</a></li>
          <li><a href="<?php echo '/' .$lang. '/';?>san-antonio/restaurants/">San Antonio</a></li>
          <li><a href="<?php echo '/' .$lang. '/';?>san-jose/restaurants/">San José</a></li>
          <li><a href="<?php echo '/' .$lang. '/';?>santa-eulalia/restaurants/">Santa Eulalia</a></li>
       </ul>
    
    </li>
    
    
    <li><a href="<?php echo '/' .$lang. '/';?>beaches/"><?php echo $translate['Beaches'][''.$lang.''];?></a></li>
    
    
    
    <li> <a href="#" title=""><?php echo $translate['Info'][''.$lang.'']?></a>
      <ul>
        <?php do { ?>
          <li><a href="/<?php echo $lang; ?>/<?php echo $row_menu['infourl_' . $lang . ''];?>/"><span><?php echo $row_menu['menuname_' . $lang . ''];?></span></a></li>
          <?php } while ($row_menu = mysql_fetch_assoc($menu)); ?>
      </ul>
    </li>
    
    <li> <a href="#" title=""><?php echo $translate['Ibiza Maps'][''.$lang.'']?></a>
      <ul>
       <li><a href="<?php echo '/' .$lang. '/';?>ibiza/map/9.html">Ibiza</a></li>
       <li><a href="<?php echo '/' .$lang. '/';?>san-antonio/map/10.html">San Antonio</a></li>
       <li><a href="<?php echo '/' .$lang. '/';?>san-jose/map/13.html">San José</a></li>
       <li><a href="<?php echo '/' .$lang. '/';?>santa-eulalia/map/11.html">Santa Eulalia</a></li>
      </ul>
    </li>
    <li><a href="/contact.php?lang=<?php echo $lang;?>" title="Contact"><?php echo $translate['Contact'][''.$lang.'']?></a></li>
  </ul>
</nav>
<!-- // Main navigation -->