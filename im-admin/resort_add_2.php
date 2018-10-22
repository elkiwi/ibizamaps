<?php 

require_once('../Connections/ibzm.php');
require_once('../includes/ez_sql_core.php');
require_once('../includes/ez_sql_mysql.php');

?>
<?php 
session_cache_expire(180);
$cache_expire = session_cache_expire();
session_start(); 

if(!isset($_SESSION['user'])){
header("Location: index.php");
}
?>
<?php
$typeid = $_POST['type'];
$lat = $_POST['lat'];
$lng = $_POST['lng'];
$title = $_POST['title'];
$id = $_POST['id'];

$arr_accept_marker_fields = 
	array(
	'id', 'online', 'displayurl', 'nofollow', 'name_en', 'name_es', 'type', 'lat', 'lng', 'date_added', 'data_modified'
	);
	
$arr_accept_contact_fields = 
	array(
	'idcontact', 'address', 'telephone', 'http', 'email', 'area', 'municipal', 'impage', 'positiononly', 'notes_en', 'notes_es'
	);
	
$arr_accept_accom_fields = 
	array(
	'idaccom', 'affspot', 'stars', 'pool', 'gym', 'spa', 'wifi_lobby', 'rural', 'central', 'beach', 'sattv', 'restaurant', 'bar', 'entertainment', 'aircon', 'kitchenette', 'kettle', 'hairdryer', 'wifi_room', 'minibar', 'pricelow', 'pricehigh'
	);
	
$arr_accept_beach_fields = 
	array(
	'idbeach', 'blueflag', 'crowds', 'lifeguard', 'rubbishbins', 'showers', 'toilets', 'snorkeling', 'nudist', 'parking', 'beachbar', 'bar', 'restaurant', 'shop', 'sunbeds', 'length', 'width', 'bus', 'access', 'sand'
	);
	
$arr_accept_pages_en_fields = 
	array(
	'idpage_en', 'metadesc_en', 'keywords_en', 'summary_en', 'html_en'
	);
	
$arr_accept_pages_es_fields = 
	array(
	'idpage_es', 'metadesc_es', 'keywords_es', 'summary_es', 'html_es'
	);
	
$arr_accept_info_en_fields = 
	array(
	'idinfo_en', 'title_en', 'metadesc_en', 'keywords_en', 'summary_en', 'html_en', 'infourl_en', 'menuname_en'
	);
	
$arr_accept_info_es_fields = 
	array(
	'idinfo_es', 'title_es',  'metadesc_es', 'keywords_es', 'summary_es', 'html_es', 'infourl_es', 'menuname_es'
	);


/*$db = new ezSQL_mysql('root','root','maps_res_2012','localhost');*/

$db = new ezSQL_mysql('wwwibiz_kiwi2013','!kiwi4796','wwwibiz_2013maps','localhost');

$editFormAction = $_SERVER['PHP_SELF'];
if (isset($_SERVER['QUERY_STRING'])) {
  $editFormAction .= "?" . htmlentities($_SERVER['QUERY_STRING']);
}

if ((isset($_POST["MM_insert"])) && ($_POST["MM_insert"] == "marker2")) {
	
	if (isset($_REQUEST['MM_insert']))
{
	
	// now create arrays to insert data 
	$arr_insert_keys = '';
	$arr_insert_values = '';
	foreach($_REQUEST as $key => $value) 
	{ 
		if (in_array($key, $arr_accept_marker_fields) && !empty($value))
		{
			
			$arr_insert_marker_keys .= $key . ', ';
			$arr_insert_marker_values .= '\'' . trim($value) . '\', ';
		}	
		
		if (in_array($key, $arr_accept_contact_fields) && !empty($value))
		{
			
			$arr_insert_contact_keys .= $key . ', ';
			$arr_insert_contact_values .= '\'' . trim($value) . '\', ';
		}	
		
		if (in_array($key, $arr_accept_accom_fields) && !empty($value))
		{
			
			$arr_insert_accom_keys .= $key . ', ';
			$arr_insert_accom_values .= '\'' . trim($value) . '\', ';
		}
		
		if (in_array($key, $arr_accept_beach_fields) && !empty($value))
		{
			
			$arr_insert_beach_keys .= $key . ', ';
			$arr_insert_beach_values .= '\'' . trim($value) . '\', ';
		}	
		
		if (in_array($key, $arr_accept_pages_en_fields) && !empty($value))
		{
			
			$arr_insert_pages_en_keys .= $key . ', ';
			$arr_insert_pages_en_values .= '\'' . trim($value) . '\', ';
		}	
		
		if (in_array($key, $arr_accept_pages_es_fields) && !empty($value))
		{
			
			$arr_insert_pages_es_keys .= $key . ', ';
			$arr_insert_pages_es_values .= '\'' . trim($value) . '\', ';
		}	
		
		if (in_array($key, $arr_accept_info_en_fields) && !empty($value))
		{
			
			$arr_insert_info_en_keys .= $key . ', ';
			$arr_insert_info_en_values .= '\'' . trim($value) . '\', ';
		}		
		
			 
	} 
	$arr_insert_marker_keys = substr($arr_insert_marker_keys, 0, -2);
	$arr_insert_marker_values = substr($arr_insert_marker_values, 0, -2);
	
	$arr_insert_contact_keys = substr($arr_insert_contact_keys, 0, -2);
	$arr_insert_contact_values = substr($arr_insert_contact_values, 0, -2);
	
	$arr_insert_accom_keys = substr($arr_insert_accom_keys, 0, -2);
	$arr_insert_accom_values = substr($arr_insert_accom_values, 0, -2);
	
	$arr_insert_beach_keys = substr($arr_insert_beach_keys, 0, -2);
	$arr_insert_beach_values = substr($arr_insert_beach_values, 0, -2);
	
	$arr_insert_pages_en_keys = substr($arr_insert_pages_en_keys, 0, -2);
	$arr_insert_pages_en_values = substr($arr_insert_pages_en_values, 0, -2);
	
	$arr_insert_pages_es_keys = substr($arr_insert_pages_es_keys, 0, -2);
	$arr_insert_pages_es_values = substr($arr_insert_pages_es_values, 0, -2);
	
	$arr_insert_info_en_keys = substr($arr_insert_info_en_keys, 0, -2);
	$arr_insert_info_en_values = substr($arr_insert_info_en_values, 0, -2);
	
	$arr_insert_info_es_keys = substr($arr_insert_info_es_keys, 0, -2);
	$arr_insert_info_es_values = substr($arr_insert_info_es_values, 0, -2);

	$sql = "INSERT INTO markers ($arr_insert_marker_keys) VALUES ($arr_insert_marker_values)";
	//exit($sql);
	$db->query($sql);
	$ID = $ezdb->insert_id;
	
	
	$sql = "INSERT INTO contact ($arr_insert_contact_keys) VALUES ($arr_insert_contact_values)";
	//exit($sql);
	$db->query($sql);
	
	$sql = "INSERT INTO accom ($arr_insert_accom_keys) VALUES ($arr_insert_accom_values)";
	//exit($sql);
	$db->query($sql);
	
	$sql = "INSERT INTO beaches ($arr_insert_beach_keys) VALUES ($arr_insert_beach_values)";
	//exit($sql);
	$db->query($sql);
	
	$sql = "INSERT INTO pages_en ($arr_insert_pages_en_keys) VALUES ($arr_insert_pages_en_values)";
	//exit($sql);
	$db->query($sql);
	
	$sql = "INSERT INTO pages_es ($arr_insert_pages_es_keys) VALUES ($arr_insert_pages_es_values)";
	//exit($sql);
	$db->query($sql);
	
	$sql = "INSERT INTO infopages_en ($arr_insert_info_en_keys) VALUES ($arr_insert_info_en_values)";
	//exit($sql);
	$db->query($sql);
	
	$sql = "INSERT INTO infopages_es ($arr_insert_info_es_keys) VALUES ($arr_insert_info_es_values)";
	//exit($sql);
	$db->query($sql);
	
	
	//$db->debug();
	
	

	
	
	
	header ('Location: add_images.php?id=' . $_POST['id']);
	exit();
}

	
	
	
	
	
	
	
	}






mysql_select_db($database_ibzm, $ibzm);
$query_type = "SELECT idtype, markertype FROM type ORDER BY markertype ASC";
$type = mysql_query($query_type, $ibzm) or die(mysql_error());
$row_type = mysql_fetch_assoc($type);
$totalRows_type = mysql_num_rows($type);

mysql_select_db($database_ibzm, $ibzm);
$query_munilist = "SELECT DISTINCT * FROM municipal";
$munilist = mysql_query($query_munilist, $ibzm) or die(mysql_error());
$row_munilist = mysql_fetch_assoc($munilist);
$totalRows_munilist = mysql_num_rows($munilist);

mysql_select_db($database_ibzm, $ibzm);
$query_arealist = "SELECT DISTINCT * FROM area";
$arealist = mysql_query($query_arealist, $ibzm) or die(mysql_error());
$row_arealist = mysql_fetch_assoc($arealist);
$totalRows_arealist = mysql_num_rows($arealist);



?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<title>Add resort</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" /></head>
<link href="css/style.css" rel="stylesheet" type="text/css" />

<!-- Google Font and style definitions -->
<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=PT+Sans:regular,bold">
<link rel="stylesheet" href="css/style.css">
<!-- include the skins (change to dark if you like) -->
<link rel="stylesheet" href="css/dark/theme.css" id="themestyle">
<!-- <link rel="stylesheet" href="css/dark/theme.css" id="themestyle"> -->
<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<link rel="stylesheet" href="css/ie.css">
	<![endif]-->
<!-- Apple iOS and Android stuff -->
<meta name="apple-mobile-web-app-capable" content="no">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<link rel="apple-touch-icon-precomposed" href="apple-touch-icon-precomposed.png">
<!-- Apple iOS and Android stuff - don't remove! -->
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,maximum-scale=1">
<!-- Use Google CDN for jQuery and jQuery UI -->

<script type="text/javascript" src="tinymce/jscripts/tiny_mce/tiny_mce.js"></script>
<script type="text/javascript">
	tinyMCE.init({
		// General options
		mode : "specific_textareas",
	    editor_selector : "description",
		theme : "advanced",
		skin : "o2k7",
        skin_variant : "black",



		plugins : "media,style,advhr,advimage,advlink,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,inlinepopups",

		// Theme options
		theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,|,image,insertimage,media",
		theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,imanager,cleanup,code,|,forecolor,backcolor",
		theme_advanced_buttons3 : "",
		theme_advanced_buttons4 : "",
		theme_advanced_toolbar_location : "top",
		theme_advanced_toolbar_align : "left",
		theme_advanced_statusbar_location : "bottom",
		theme_advanced_resizing : true,

		// Example word content CSS (should be your site CSS) this one removes paragraph margins
		content_css : "css/word.css",

		// Drop lists for link/image/media/template dialogs
		template_external_list_url : "lists/template_list.js",
		external_link_list_url : "lists/link_list.js",
		external_image_list_url : "lists/image_list.js",
		media_external_list_url : "lists/media_list.js",

		// Replace values for the template plugin
		template_replace_values : {
			username : "daniele",
			staffid : "ganesha"
		}
	});
</script>
<!-- /TinyMCE -->

</head>
<body>
<header>
	<div><br />
		<h2 style="padding-left: 20px; color: red;" class="red">Add resort</h2>
	</div>
	
</header>

<nav>
	<ul id="nav">
		<?php include('mainnav.php');?>
		
	</ul>
</nav>

<section id="content">
	<div class="g12 nodrop">
	  <div class="textcontentadmin">
	    
	   
	    <form id="marker2" name="marker2" method="post" action="<?php echo $editFormAction; ?>" data-ajax="false" >
	      <input type="hidden" name="id" id="id" value="<?php echo $id; ?>" />
          
         
	     	<fieldset>
						<label>Destination title</label>
						<section><label for="text_field"><img src="../images/ui/flag_en.gif" /></label>
							<div><input type="text" name="name_en" value="<?php echo $title; ?>" ></div>
						</section>
                        
                        <section><label for="text_field"><img src="../images/ui/flag_es.gif" /></label>
							<div><input type="text" name="name_es" value="<?php echo $title; ?>" ></div>
						</section>
                        
                        <section>
                        <label>Online?</label>
                        <div><input type="radio" name="online" value="1" id="online_0" checked /><label>Yes</label>
                        <input type="radio" name="online" value="0" id="online_1" /><label>No</label>
                        </div>
                        </section>
                        
                         <section>
                        <label>Display url?</label>
                        <div><input type="radio" name="displayurl" value="1" id="displayurl_0" /><label>Yes</label>
                        <input type="radio" name="displayurl" value="0" id="displayurl_1" checked /><label>No</label>
                        </div>
                        </section>
                        
                         <section>
                        <label>Apply Nofollow?</label>
                        <div><input type="radio" name="nofollow" value="1" id="nofollow_0" checked /><label>Yes</label>
                        <input type="radio" name="nofollow" value="0" id="nofollow_1" /><label>No</label>
                        </div>
                        </section>
                        
                        
                      
                        
             </fieldset>  
             
             <fieldset>
             
              <section><label for="text_field"> Address </label>
							<div><textarea name="address" id="address" cols="45" rows="5"></textarea></div>
						</section>
                        
                         <section><label for="text_field"> Telephone </label>
							<div><input type="text" name="telephone" id="telephone" /></div>
						</section>
                        
                          <section><label for="text_field"> Email </label>
							<div><input type="text" name="email" id="email" /></div>
						</section>
                        
                         <section><label for="text_field"> Website </label>
                        <div><input name="http" type="text" id="http" value="http://" size="50" /></div>
				  		</section>
                        
                         <section><label for="text_field"> Notes EN</label>
                        <div><textarea name="notes_en" id="notes" cols="45" rows="5"></textarea></div>
				  		</section>
                        
                        <section><label for="text_field"> Notes ES</label>
                        <div><textarea name="notes_es" id="notes" cols="45" rows="5"></textarea></div>
				  		</section>
                        
				     <section>
                     
                     </fieldset>      
               
                  <fieldset>
                  <label>Meta Description <br />
<span>(This text is what appears in Googles results ~ 160 characters)</span></label> 
						<section><label for="textarea"> <img src="../images/ui/flag_en.gif" /></label>
							<div><textarea name="metadesc_en"   data-autogrow="true" /></textarea></div>
						</section>
                        
                        <section><label for="textarea"> <img src="../images/ui/flag_es.gif" /></label>
							<div><textarea name="metadesc_es"   data-autogrow="true" /></textarea></div>
						</section>
						
					
						
						
				  
						
						
					</fieldset>
                    
                    
                    <fieldset>
                  <label>Summary</label> 
                 
                        
					 <section><label for="textarea_auto"><img src="../images/ui/flag_en.gif" /></label>
							<div><textarea name="summary_en" class="description" rows="12" ></textarea>
							</div>
						</section>
                        
                         <section><label for="textarea_auto"><img src="../images/ui/flag_es.gif" /></label>
							<div><textarea name="summary_es" class="description" rows="12" ></textarea>
							</div>
						</section>
					</fieldset>
                    
                    
                     <fieldset>
                  <label>HTML</label> 
                 
                        
					 <section><label for="textarea_auto"><img src="../images/ui/flag_en.gif" /></label>
							<div><textarea name="html_en" class="description" rows="12" ></textarea>
							</div>
						</section>
                        
                         <section><label for="textarea_auto"><img src="../images/ui/flag_es.gif" /></label>
							<div><textarea name="html_es" class="description" rows="12" ></textarea>
							</div>
						</section>
					</fieldset>
                    
                     
                    
                  <fieldset>
                  <label>Detalles <a name="detalles"></a></label> 
				  
				 
				  
				 
				  
				  
				  
				  
				   <section>
				 <label>Type</label>
				  <div> <select name="type" id="type" required />
                  <option value="">Select</option>
					<?php
                    do {  
                    ?>
                    <option value="<?php echo $row_type['idtype']?>"<?php if (!(strcmp($row_type['idtype'], $typeid))) {echo "selected=\"selected\"";} ?>><?php echo $row_type['markertype']?></option>
                    <?php
                    } while ($row_type = mysql_fetch_assoc($type));
                      $rows = mysql_num_rows($type);
                      if($rows > 0) {
                          mysql_data_seek($type, 0);
                          $row_type = mysql_fetch_assoc($type);
                      }
                    ?>
                    </select></div>
				  </section>
				  
				   <section>
                   
				 <label>Municipal</label>
				  <div><select name="municipal" id="municipal">
					<?php
                    do {  
                    ?>
                    <option value="<?php echo $row_munilist['idmunicipal']?>"><?php echo $row_munilist['name_ca']?></option>
                    <?php
                    } while ($row_munilist = mysql_fetch_assoc($munilist));
                      $rows = mysql_num_rows($munilist);
                      if($rows > 0) {
                          mysql_data_seek($munilist, 0);
                          $row_munilist = mysql_fetch_assoc($munilist);
                      }
                    ;?>
                    </select></div>
                    
                    </section>
                    <section>
				 
                  
                   
                    <label>Area</label>
                        <div><select name="area" id="area">
                        <?php
                        do {  
                        ?>
                        <option value="<?php echo $row_arealist['idarea']?>"><?php echo $row_arealist['area_es']?></option>
                        <?php
                        } while ($row_arealist = mysql_fetch_assoc($arealist));
                          $rows = mysql_num_rows($arealist);
                          if($rows > 0) {
                              mysql_data_seek($arealist, 0);
                              $row_arealist = mysql_fetch_assoc($arealist);
                          }
                        ;?>
                        </select></div>
                   
                   
				
				  </section>
                  </fieldset>
                 
                  <?php if ($typeid == 14) { include('includes/form.beach.html'); } ?>
                  
					<?php if ($typeid == 1 | $typeid == 2 | $typeid == 3 | $typeid == 4 | $typeid == 5 | $typeid == 23) { include('includes/form.accom.html'); } ?>
                    <?php // if ($typeid == 27) { include('includes/form.property.html'); } ?>
                   
				  
				 
            <label></label>
            <div>
              <button class="submit green" name="ir" value="submit">Next -></button>
            </div>
          </section>
				  
				 
                   

              
                   
                    
	    
<input type="hidden" name="lat" id="lat" value="<?php echo $lat;?>" />
<input type="hidden" name="lng" id="lng" value="<?php echo $lng;?>" />
<input type="hidden" name="id" id="id" value="<?php echo $id;?>" />
<input type="hidden" name="idcontact" id="id" value="<?php echo $id;?>" />
<input type="hidden" name="idaccom" id="id" value="<?php echo $id;?>" />
<input type="hidden" name="idbeach" id="id" value="<?php echo $id;?>" />
<input type="hidden" name="idpage_en" id="id" value="<?php echo $id;?>" />
<input type="hidden" name="idpage_es" id="id" value="<?php echo $id;?>" />
<input type="hidden" name="idinfo_en" id="id" value="<?php echo $id;?>" />
<input type="hidden" name="idinfo_es" id="id" value="<?php echo $id;?>" />
<input type="hidden" name="type" id="type" value="<?php echo $typeid;?>" />
<input type="hidden" name="date_added" id="date_added" value="<?php echo date("Y-m-d H:i:s"); ?>" />
<input type="hidden" name="positiononly" id="positiononly" value="<?php echo $positiononly;?>" />   


<input type="hidden" name="MM_insert" value="marker2" />
        </form>
	    <p></p>
	   
      </div>
	</div>
</section>
<footer>Copyright by kiwi-designed.com 2011</footer>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js"></script>
<!-- Loading JS Files this way is not recommended! Merge them but keep their order -->
<!-- some basic functions -->
<script src="js/functions.js"></script>
<!-- all Third Party Plugins and Whitelabel Plugins -->
<script src="js/plugins.js"></script>
<script src="js/editor.js"></script>
<script src="js/calendar.js"></script>
<script src="js/flot.js"></script>
<script src="js/elfinder.js"></script>
<script src="js/datatables.js"></script>
<script src="js/wl_Alert.js"></script>
<script src="js/wl_Autocomplete.js"></script>
<script src="js/wl_Breadcrumb.js"></script>
<script src="js/wl_Calendar.js"></script>
<script src="js/wl_Chart.js"></script>
<script src="js/wl_Color.js"></script>
<script src="js/wl_Date.js"></script>
<script src="js/wl_Editor.js"></script>
<script src="js/wl_File.js"></script>
<script src="js/wl_Dialog.js"></script>
<script src="js/wl_Fileexplorer.js"></script>
<script src="js/wl_Form.js"></script>
<script src="js/wl_Gallery.js"></script>
<script src="js/wl_Multiselect.js"></script>
<script src="js/wl_Number.js"></script>
<script src="js/wl_Password.js"></script>
<script src="js/wl_Slider.js"></script>
<script src="js/wl_Store.js"></script>
<script src="js/wl_Time.js"></script>
<script src="js/wl_Valid.js"></script>
<script src="js/wl_Widget.js"></script>
<!-- configuration to overwrite settings -->
<script src="js/config.js"></script>
<!-- the script which handles all the access to plugins etc... -->
<script src="js/script.js"></script>

</body>
</html>
