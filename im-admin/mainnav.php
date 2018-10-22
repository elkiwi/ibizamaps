<?php require_once('../Connections/ibzm.php');
mysqli_select_db($database_ibzm, $ibzm);
$query_pages = "SELECT idinfo_en, title_en, menuname_en FROM infopages_en";
$pages = mysqli_query($query_pages, $ibzm);
$row_pages = mysqli_fetch_assoc($pages);
$totalRows_pages = mysqli_num_rows($pages);


?>

<li class="i_house"><a href="main.php"><span>Admin Home</span></a></li>
<li class="i_house_2"><a><span>Marker Points</span></a>
  <ul>
    <li><a href="resort_add.php"><span>Add Marker</span></a></li>
  </ul>
</li>
<li class="i_create_write"><a><span>Pages</span></a>
  <ul>
    <?php do { ?>
      <li><a href="page_edit.php?id=<?php echo $row_pages['idinfo_en'];?>"><span><?php echo substr($row_pages['menuname_en'], 0 , 30);?></span></a></li>
      <?php } while ($row_pages = mysqli_fetch_assoc($pages)); ?>
    <li><a href="page_add.php"><span class="red">Add Page</span></a></li>
  </ul>
</li>
