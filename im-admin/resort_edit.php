<?php require_once('../Connections/ibzm.php');
include ('./functions/functions.php');


session_cache_expire(180);
$cache_expire = session_cache_expire();
session_start();

if(!isset($_SESSION['user'])){
header("Location: index.php");
}


$id = $_GET['id'];



if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "")
{
  if (PHP_VERSION < 6) {
    $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;
  }

  $theValue = function_exists("mysqli_real_escape_string") ? mysqli_real_escape_string($theValue) : mysqli_escape_string($theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? doubleval($theValue) : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? "'" . $theValue . "'" : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
	  break;
  }

  return $theValue;
}
}

function aDump($array) {
	echo '<pre>';
	print_r ($array);
	echo '</pre>';
	exit();
}

//if ($_POST) aDump ($_POST);

$editFormAction = $_SERVER['PHP_SELF'];
if (isset($_SERVER['QUERY_STRING'])) {
  $editFormAction .= "?" . htmlentities($_SERVER['QUERY_STRING']);
}


if ((isset($_POST["MM_update"])) && ($_POST["MM_update"] == "marker2")) {

	$updateSQL = sprintf("UPDATE markers SET name_en=%s, name_es=%s, type=%s, online=%s, date_modified=%s WHERE id=%s",
        GetSQLValueString($_POST['title_en'], "text"),
								GetSQLValueString($_POST['title_es'], "text"),
					   GetSQLValueString($_POST['type'], "int"),
								GetSQLValueString($_POST['online'], "int"),
					   GetSQLValueString($_POST['date_modified'], "date"),
        GetSQLValueString($_POST['id'], "int"));


  mysqli_select_db($database_ibzm, $ibzm);
  $Result1 = mysqli_query($updateSQL, $ibzm);

		$updateSQL = sprintf("UPDATE contact SET address=%s, telephone=%s, http=%s, displayurl=%s, email=%s WHERE idcontact=%s",
        GetSQLValueString($_POST['address'], "text"),
								GetSQLValueString($_POST['telephone'], "text"),
					   GetSQLValueString($_POST['http'], "text"),
								GetSQLValueString($_POST['displayurl'], "int"),
					   GetSQLValueString($_POST['email'], "text"),
        GetSQLValueString($_POST['id'], "int"));


  mysqli_select_db($database_ibzm, $ibzm);
  $Result1 = mysqli_query($updateSQL, $ibzm);


		$updateSQL = sprintf("UPDATE pages_en SET metadesc_en=%s, keywords_en=%s, summary_en=%s, html_en=%s WHERE idpage_en=%s",


					   GetSQLValueString($_POST['metadesc_en'], "text"),
								GetSQLValueString($_POST['keywords_en'], "text"),
								GetSQLValueString($_POST['summary_en'], "text"),
								GetSQLValueString($_POST['html_en'], "text"),
        GetSQLValueString($_POST['id'], "int"));


  mysqli_select_db($database_ibzm, $ibzm);
  $Result1 = mysqli_query($updateSQL, $ibzm);

		$updateSQL = sprintf("UPDATE pages_es SET metadesc_es=%s, keywords_es=%s, summary_es=%s, html_es=%s WHERE idpage_es=%s",


					   GetSQLValueString($_POST['metadesc_es'], "text"),
								GetSQLValueString($_POST['keywords_es'], "text"),
								GetSQLValueString($_POST['summary_es'], "text"),
								GetSQLValueString($_POST['html_es'], "text"),
        GetSQLValueString($_POST['id'], "int"));


  mysqli_select_db($database_ibzm, $ibzm);
  $Result1 = mysqli_query($updateSQL, $ibzm);

		if ( ($_POST["type"] == "1")  | ($_POST["type"] == "2")  | ($_POST["type"] == "3")  | ($_POST["type"] == "4")  | ($_POST["type"] == "5") | ($_POST["type"] == "23") ) {
  $updateSQL = sprintf("UPDATE accom SET stars=%s, pool=%s, gym=%s, spa=%s, wifi_lobby=%s, central=%s, rural=%s, beach=%s, sattv=%s, restaurant=%s, bar=%s, entertainment=%s, aircon=%s, internet=%s, wifi_room=%s, minibar=%s, kitchenette=%s, kettle=%s, hairdryer=%s,  pricelow=%s, pricehigh=%s, affspot=%s, affurl=%s, affurl2=%s, affurl3=%s, affurl4=%s, affurl5=%s WHERE idaccom=%s",
                       GetSQLValueString($_POST['stars'], "int"),
                       GetSQLValueString($_POST['pool'], "int"),
																							GetSQLValueString($_POST['gym'], "int"),
																							GetSQLValueString($_POST['spa'], "int"),
																							GetSQLValueString($_POST['wifi_lobby'], "int"),
																							GetSQLValueString($_POST['central'], "int"),
                       GetSQLValueString($_POST['rural'], "int"),
                       GetSQLValueString($_POST['beach'], "int"),
                       GetSQLValueString($_POST['sattv'], "int"),
                       GetSQLValueString($_POST['restaurant'], "int"),
                       GetSQLValueString($_POST['bar'], "int"),
                       GetSQLValueString($_POST['entertainment'], "int"),
                       GetSQLValueString($_POST['aircon'], "int"),
                       GetSQLValueString($_POST['internet'], "int"),
																							GetSQLValueString($_POST['wifi_room'], "int"),
                       GetSQLValueString($_POST['minibar'], "int"),
																							GetSQLValueString($_POST['kitchenette'], "int"),
																							GetSQLValueString($_POST['kettle'], "int"),
																							GetSQLValueString($_POST['hairdryer'], "int"),
                       GetSQLValueString($_POST['pricelow'], "double"),
                       GetSQLValueString($_POST['pricehigh'], "double"),
																							GetSQLValueString($_POST['affspot'], "text"),
																							GetSQLValueString($_POST['affurl'], "text"),
																							GetSQLValueString($_POST['affurl2'], "text"),
																							GetSQLValueString($_POST['affurl3'], "text"),
																							GetSQLValueString($_POST['affurl4'], "text"),
																							GetSQLValueString($_POST['affurl5'], "text"),
                       GetSQLValueString($_POST['id'], "int"));
																							//exit ($updateSQL);
																							mysqli_select_db($database_ibzm, $ibzm);
  																					$Result1 = mysqli_query($updateSQL, $ibzm);


		}



 $updateGoTo = $_SERVER['PHP_SELF'];

   if (isset($_SERVER['QUERY_STRING'])) {
    $updateGoTo .= (strpos($updateGoTo, '?')) ? "&" : "?";
    $updateGoTo .= $_SERVER['QUERY_STRING'];
  }

  header(sprintf("Location: %s", $updateGoTo));
}




mysqli_select_db($database_ibzm, $ibzm);
$query_type = "SELECT * FROM type ORDER BY markertype ASC";
$type = mysqli_query($query_type, $ibzm);
$row_type = mysqli_fetch_assoc($type);
$totalRows_type = mysqli_num_rows($type);

mysqli_select_db($database_ibzm, $ibzm);
$query_Muni = "SELECT * FROM municipal";
$Muni = mysqli_query($query_Muni, $ibzm);
$row_Muni = mysqli_fetch_assoc($Muni);
$totalRows_Muni = mysqli_num_rows($Muni);

mysqli_select_db($database_ibzm, $ibzm);
$query_Area = "SELECT * FROM area";
$Area = mysqli_query($query_Area, $ibzm);
$row_Area = mysqli_fetch_assoc($Area);
$totalRows_Area = mysqli_num_rows($Area);



mysqli_select_db($database_ibzm, $ibzm);
$query_edit = "SELECT
markers.id,
markers.name_en AS title_en,
markers.name_es AS title_es,
markers.lat,
markers.lng,
markers.`online`,
markers.date_added,
markers.date_modified,
markers.date_expires,
contact.address,
contact.telephone,
contact.notes_en,
contact.notes_es,
contact.http,
contact.displayurl,
contact.email,
contact.municipal AS muni,
contact.area AS zone,
contact.impage,
municipal.name_ca,
municipal.name_es,
pages_en.metadesc_en AS metadesc_en,
pages_en.keywords_en AS keywords_en,
pages_en.summary_en AS summary_en,
pages_en.html_en AS html_en,
pages_es.metadesc_es AS metadesc_es,
pages_es.keywords_es AS keywords_es,
pages_es.summary_es AS summary_es,
pages_es.html_es AS html_es,
beaches.blueflag,
beaches.crowds,
beaches.lifeguard,
beaches.rubbishbins,
beaches.showers,
beaches.toilets,
beaches.snorkeling,
beaches.nudist,
beaches.parking,
beaches.beachbar,
beaches.restaurant AS beachrestaurant,
beaches.shop,
beaches.sunbeds,
beaches.length,
beaches.width,
beaches.bus,
beaches.access,
beaches.sand,
accom.stars,
accom.pool,
accom.rural,
accom.beach,
accom.central,
accom.sattv,
accom.gym,
accom.spa,
accom.restaurant AS acc_restaurant,
accom.bar,
accom.entertainment,
accom.aircon,
accom.internet,
accom.wifi_lobby,
accom.wifi_room,
accom.minibar,
accom.kitchenette,
accom.kettle,
accom.hairdryer,
accom.pricelow,
accom.pricehigh,
accom.affspot,
accom.affurl,
accom.affurl2,
accom.affurl3,
accom.affurl4,
accom.affurl5,
type.markertype,
markers.type
FROM
markers
LEFT JOIN contact ON contact.idcontact = markers.id
LEFT JOIN municipal ON municipal.idmunicipal = contact.municipal
LEFT JOIN pages_en ON pages_en.idpage_en = markers.id
LEFT JOIN beaches ON beaches.idbeach = markers.id
LEFT JOIN accom ON accom.idaccom = markers.id
LEFT JOIN type ON type.idtype = markers.type
LEFT JOIN pages_es ON pages_es.idpage_es = pages_en.idpage_en
WHERE
markers.id =  $id";
$edit = mysqli_query($query_edit, $ibzm);
$row_edit = mysqli_fetch_assoc($edit);
$totalRows_edit = mysqli_num_rows($edit);



// query to find if images have an order in the DB
mysqli_select_db($database_ibzm, $ibzm);
$query_image_order = "SELECT * FROM image_order WHERE marker_id = $id ORDER BY position ASC";
$image_order = mysqli_query($query_image_order, $ibzm);
$row_image_order = mysqli_fetch_assoc($image_order);
$totalRows_image_order = mysqli_num_rows($image_order);

//if there is no order for this id insert them into db with no order
if ($totalRows_image_order == 0) {

	//if (file_exists('/images/pages/' . $row_edit['typeurl_es'] . '/' . $id . '')) {

		$thumbs =  getImageThumb('/images/pages/' . $id . '/');
		//echo '/images/pages/' . $row_edit['typeurl_es'] . '/' . $id ;
		//aDump ($thumbs);


			foreach($thumbs as $img) {

			$sql = "INSERT INTO `image_order` (`marker_id`,`filename`,`alt`,`position`) VALUES ('" . $id . "','" . $img['fileName'] . "','','')";
			$image_order = mysqli_query($sql, $ibzm);

	//	}
	}

mysqli_select_db($database_ibzm, $ibzm);
$query_image_order = "SELECT * FROM image_order WHERE marker_id = $id ORDER BY position ASC";
$image_order = mysqli_query($query_image_order, $ibzm);
$row_image_order = mysqli_fetch_assoc($image_order);
$totalRows_image_order = mysqli_num_rows($image_order);


}


//aDump($row_image_order);


?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-us" lang="en-us">
<head>
<title>Edit Resort</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<link href="css/style.css" rel="stylesheet" type="text/css" />

<!-- Google Font and style definitions -->
<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=PT+Sans:regular,bold" />
<link rel="stylesheet" href="css/style.css" />
<!-- include the skins (change to dark if you like) -->
<link rel="stylesheet" href="css/dark/theme.css" id="themestyle" />
<link rel="stylesheet" href="plupload/js/jquery.ui.plupload/jquery.ui.plupload.js" type="text/css" media="screen" />
<style type="text/css">@import url(plupload/js/jquery.ui.plupload/css/jquery.ui.plupload.css);</style>
<!-- <link rel="stylesheet" href="css/dark/theme.css" id="themestyle"> -->
<!--[if lt IE 9]>
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<link rel="stylesheet" href="css/ie.css">
	<![endif]-->
<!-- Apple iOS and Android stuff -->
<meta name="apple-mobile-web-app-capable" content="no" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<link rel="apple-touch-icon-precomposed" href="apple-touch-icon-precomposed.png" />
<!-- Apple iOS and Android stuff - don't remove! -->
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,maximum-scale=1" />
<!-- Use Google CDN for jQuery and jQuery UI -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js"></script>
<!-- Loading JS Files this way is not recommended! Merge them but keep their order -->

<script type="text/javascript" src="http://bp.yahooapis.com/2.4.21/browserplus-min.js"></script>

<!-- Load plupload and all it's runtimes and finally the jQuery UI queue widget -->
<script type="text/javascript" src="plupload/js/plupload.full.js"></script>
<script type="text/javascript" src="plupload/js/jquery.ui.plupload/jquery.ui.plupload.js"></script>


<!-- all Third Party Plugins and Whitelabel Plugins -->
<script src="js/all_wl.js"></script>
<!-- configuration to overwrite settings -->
<script src="js/config.js"></script>
<!-- the script which handles all the access to plugins etc... -->
<script src="js/script.js"></script>

<!-- some basic functions -->
<script src="js/functions.js"></script>
<script type="text/javascript">

$(document).ready(function(){

        $(".image_uploader").hide();
        $(".show_hide").show();

    $('.show_hide').click(function(){
    $(".image_uploader").slideToggle();
    });

});

</script>
<script type="text/javascript" src="tinymce/jscripts/tiny_mce/tiny_mce.js"></script>
<script type="text/javascript">
	tinyMCE.init({
		// General options
		mode : "specific_textareas",
	    editor_selector : "description",
		theme : "advanced",
		skin : "o2k7",
        skin_variant : "black",



		plugins : "media,style,advhr,advimage,imagemanager,advlink,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,inlinepopups",

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
    <h2 style="padding-left: 20px; color: red;" class="red">Edit <?php echo $row_edit['title'] ?></h2>
  </div>
  <div id="header">
    <ul id="headernav">
      <li>
        <ul>
          <li><a href="main.php">Inicio</a><span>Inicio</span></li>

          <li><a href="#detalles">Detalles</a><span>Saltar</span></li>
        </ul>
      </li>
    </ul>
  </div>
</header>
<nav>
  <ul id="nav">
    <?php include('mainnav.php');?>
  </ul>
</nav>

<section id="content">
<div class="g12 nodrop">

  <ul class="gallery">

  <?php
  do {

echo '<li id="item_' . $row_image_order['id'] . '"><a href="/images/pages/' . $id . '/' . str_replace('300_','800_',$row_image_order['filename']) . '" title=""><img src="/images/pages/' . $id . '/' . $row_image_order['filename'] . '" height="95" width="140" alt="" /></a></li>' ;

} while ($row_image_order  = mysqli_fetch_assoc($image_order));

  ?>


		</ul>
		<div class="alert i_speech_bubble blue"><div id="msg">Drag images to chage their order or click "delete" to remove.</div></div>
<button class="show_hide green i_camera" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add Images</button>
	<br />
<br />

<div class="image_uploader">
		<form method="post" action="">

<br />

	<h3>Select Images</h3><br />

<!--	<textarea id="log" style="width: 100%; height: 150px; font-size: 11px" spellcheck="false" wrap="off"></textarea>-->
	<div id="uploader" style="width: 800px; height: 450px;">You browser doesn't support upload.</div>

</form>
<div class="alert i_speech_bubble ">Before saving Images, make sure they have all finished uploading in the queue</div><br />
<br />


<script type="text/javascript">
$(function() {
	function log() {
		var str = "";

		plupload.each(arguments, function(arg) {
			var row = "";

			if (typeof(arg) != "string") {
				plupload.each(arg, function(value, key) {
					// Convert items in File objects to human readable form
					if (arg instanceof plupload.File) {
						// Convert status to human readable
						switch (value) {
							case plupload.QUEUED:
								value = 'QUEUED';
								break;

							case plupload.UPLOADING:
								value = 'UPLOADING';
								break;

							case plupload.FAILED:
								value = 'FAILED';
								break;

							case plupload.DONE:
								value = 'DONE';
								break;
						}
					}

					if (typeof(value) != "function") {
						row += (row ? ', ': '') + key + '=' + value;
					}
				});

				str += row + " ";
			} else {
				str += arg + " ";
			}
		});

		$('#log').val($('#log').val() + str + "\r\n");
	}

	$("#uploader").plupload({
		// General settings
		runtimes: 'html5,gears,browserplus,silverlight,flash,html4',
		url: 'plupload/upload.php?id=<?php echo $id;?>',
		max_file_size: '10mb',
		chunk_size: '1mb',
		unique_names: false,
		sortable: true,
		rename: true,

		// Resize images on clientside if we can
		resize: {width: 1200, height: 800, quality: 50},

		// Specify what files to browse for
		filters: [
			{title: "Image files", extensions: "jpg,gif,png"},
			{title: "Zip files", extensions: "zip"}
		],

		// Flash/Silverlight paths
		flash_swf_url: 'plupload/js/plupload.flash.swf',
		silverlight_xap_url: 'plupload/js/plupload.silverlight.xap',

		// PreInit events, bound before any internal events
		preinit: {
			Init: function(up, info) {
				log('[Init]', 'Info:', info, 'Features:', up.features);
			},

			UploadFile: function(up, file) {
				log('[UploadFile]', file);

				// You can override settings before the file is uploaded
				// up.settings.url = 'upload.php?id=' + file.id;
				// up.settings.multipart_params = {param1: 'value1', param2: 'value2'};
			}
		},



		// Post init events, bound after the internal events
		init: {
			Refresh: function(up) {
				// Called when upload shim is moved
				log('[Refresh]');
			},

			StateChanged: function(up) {
				// Called when the state of the queue is changed
				log('[StateChanged]', up.state == plupload.STARTED ? "STARTED": "STOPPED");
			},

			QueueChanged: function(up) {
				// Called when the files in queue are changed by adding/removing files
				log('[QueueChanged]');
			},

			UploadProgress: function(up, file) {
				// Called while a file is being uploaded
				log('[UploadProgress]', 'File:', file, "Total:", up.total);
			},

			FilesAdded: function(up, files) {
				// Callced when files are added to queue
				log('[FilesAdded]');

				plupload.each(files, function(file) {
					log('  File:', file);
				});
			},

			FilesRemoved: function(up, files) {
				// Called when files where removed from queue
				log('[FilesRemoved]');

				plupload.each(files, function(file) {
					log('  File:', file);
				});
			},

			FileUploaded: function(up, file, info) {
				// Called when a file has finished uploading
				log('[FileUploaded] File:', file, "Info:", info);
			},



			ChunkUploaded: function(up, file, info) {
				// Called when a file chunk has finished uploading
				log('[ChunkUploaded] File:', file, "Info:", info);
			},

			Error: function(up, args) {
				// Called when a error has occured

				// Handle file specific error and general error
				if (args.file) {
					log('[error]', args, "File:", args.file);
				} else {
					log('[error]', args);
				}
			}
		}
	});

	$('#log').val('');
	$('#clear').click(function(e) {
		e.preventDefault();
		$("#uploader").pluploadQueue().splice();
	});
});
</script>
	</div>


    <?php if ($totalRows_edit <> 0) { ?>
    <form id="marker2" name="marker2" method="post" action="<?php echo $editFormAction; ?>" data-ajax="false" >
      <input type="hidden" name="id" value="<?php echo $id; ?>" />
      <button class="submit green" name="ir" value="submit">SAVE CHANGES</button>


      <fieldset>
        <label>Activate Online </label>
        <section>
          <label>Online</label>
          <div>
            <input name="online" id="online" type="checkbox" <?php if (!(strcmp($row_edit['online'],1))) {echo " checked ";} ?>  />
            <label for="online" style="padding-right: 20px;" ></label>

          </div>
        </section>
      </fieldset>


      <fieldset>


        <label>Titles</label>
        <section>
          <label><img src="../images/ui/flag_en.gif" /></label>
          <div>
            <input type="text"  name="title_en" value="<?php echo $row_edit['title_en'] ?>" />
          </div>
        </section>


        <section>
           <label><img src="../images/ui/flag_es.gif" /></label>
          <div>
            <input type="text"  name="title_es" value="<?php echo $row_edit['title_es'] ?>" />
          </div>
        </section>

      </fieldset>

        <fieldset>
            <label>Position</label>
            <section><label for="textarea">Lat</label>
                <div><input type="text" id="lat" name="lat" value="<?php echo $row_edit['lat'] ?>" ></div>
            </section>
             <section><label for="textarea">Long</label>
               <div><input type="text" id="lng" name="lng" value="<?php echo $row_edit['lng'] ?>" ></div>
            </section>
		</fieldset>


        <fieldset>
            <label>Meta Description <br />
            <span>(This text is what appears in Googles results)</span></label>
            <section><label for="textarea"><img src="../images/ui/flag_en.gif" /></label>
                <div><textarea name="metadesc_en"  id="metadesc_en" data-autogrow="true" /><?php echo $row_edit['metadesc_en'] ?></textarea></div>
            </section>
             <section><label for="textarea"><img src="../images/ui/flag_es.gif" /></label>
                <div><textarea name="metadesc_es"  id="metadesc_es" data-autogrow="true" /><?php echo $row_edit['metadesc_es'] ?></textarea></div>
            </section>

            <label>Keywords</label>
        <section>
          <label><img src="../images/ui/flag_en.gif" /></label>
          <div>
            <input type="text"  name="keywords_en" value="<?php echo $row_edit['keywords_en'] ?>" />
          </div>
        </section>

         <section>
          <label><img src="../images/ui/flag_es.gif" /></label>
          <div>
            <input type="text"  name="keywords_es" value="<?php echo $row_edit['keywords_es'] ?>" />
          </div>
        </section>
		</fieldset>

   <fieldset>
            <label>Summary </label>
            <section><label for="textarea"><img src="../images/ui/flag_en.gif" /></label>
                <div><textarea name="summary_en"  id="summary_en" class="description" data-autogrow="true" /><?php echo $row_edit['summary_en'] ?></textarea></div>
            </section>
             <section><label for="textarea"><img src="../images/ui/flag_es.gif" /></label>
                <div><textarea name="summary_es"  id="summary_es" class="description" data-autogrow="true" /><?php echo $row_edit['summary_es'] ?></textarea></div>
            </section>
		</fieldset>

         <fieldset>
            <label>HTML Description </label>
            <section><label for="textarea"><img src="../images/ui/flag_en.gif" /></label>
                <div><textarea name="html_en" class="description"  id="html_en" data-autogrow="true" /><?php echo $row_edit['html_en'] ?></textarea></div>
            </section>
             <section><label for="textarea"><img src="../images/ui/flag_es.gif" /></label>
                <div><textarea name="html_es" class="description"  id="html_es" data-autogrow="true" /><?php echo $row_edit['html_es'] ?></textarea></div>
            </section>
		</fieldset>






                  <fieldset>
                  <label>Detalles <a name="detalles"></a></label>
				  												<section>
                  <label>Website</label>
                  <div>
                  <input type="text"  name="http" value="<?php echo $row_edit['http'] ?>" />
               		 </div>
                  </section>
                  <section>
                   <label>Display URL?</label>
                  <div>
                   <input name="displayurl" type="checkbox" <?php if (!(strcmp($row_edit['displayurl'],1))) {echo " checked ";} ?>  />
               		 </div>
                  </section>
                  <section>

                   <label>Address</label>
                  <div>
                  <input type="text"  name="address" value="<?php echo $row_edit['address'] ?>" />
               		 </div>
                   </section>
                   <section>
                   <label>Telephone</label>
                  <div>
                  <input type="text"  name="telephone" value="<?php echo $row_edit['telephone'] ?>" />
               		 </div>
                   </section>
                   <section>
                  <label>Email</label>
                  <div>
                  <input type="text"  name="email" value="<?php echo $row_edit['email'] ?>" />
               		 </div>


                  </section>







				   <section>
				 <label>Type</label>
				  <div> <select name="type" id="type" />
                  <option value="">Select</option>
<?php
do {
?>
<option value="<?php echo $row_type['idtype']?>"<?php if (!(strcmp($row_type['idtype'], $row_edit['type']))) {echo "selected=\"selected\"";} ?>><?php echo $row_type['markertype']?></option>
<?php
} while ($row_type = mysqli_fetch_assoc($type));
  $rows = mysqli_num_rows($type);
  if($rows > 0) {
      mysqli_data_seek($type, 0);
	  $row_type = mysqli_fetch_assoc($type);
  }
?>
</select></div>
				  </section>
<?php if ($row_edit['type'] == 14) include('includes/form.beach.html'); ?>
<?php if ($row_edit['type'] == 1 | $row_edit['type'] == 2 | $row_edit['type'] == 3 | $row_edit['type'] == 4 | $row_edit['type'] == 5 | $row_edit['type'] == 23)  include('includes/form.accom.html'); ?>



				     <section>
            <label></label>
            <div>
              <button class="submit green" name="ir" value="submit">SAVE CHANGES</button>
            </div>
          </section>

				  </fieldset>

      <input type="hidden" name="date_modified" id="date_modified" value="<?php echo date("Y-m-d H:i:s"); ?>" />
      <input type="hidden" name="MM_update" value="marker2" />
    </form>

    <?php } else echo '<br/><br/><br/><br/><h2 align="center">Not Found...<a href="main.php">volver</a></h2><br/><br/><br/><br/><br/>'; ?>
</div>
</section>
<footer>Copyright by kiwi-designed.com 2011</footer>
<!--<script>
  $(document).ready(function () {
  $.getJSON('client_get_json.php?id=<?php echo $row_edit['clientid']; ?>' , function(data) {
				$("#testdiv").html(data.company);
	});
});
  </script>-->
 <!-- <script type='text/javascript'>

$(document).ready(function(){

$("#client").live('change',function(){
//alert(this+"option:selected");
alert($(this+"option:selected").val());
});


});


</script>-->




</body>
</html>
<?php


mysqli_free_result($edit);
?>