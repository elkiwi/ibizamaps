<?php require_once('../Connections/ibzm.php');
session_cache_expire(180);
$cache_expire = session_cache_expire();
session_start();

if(!isset($_SESSION['user'])){
header("Location: index.php");
}

if (!function_exists("GetSQLValueString")) {
function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "")
{
  $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;

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
      $theValue = ($theValue != "") ? "'" . doubleval($theValue) . "'" : "NULL";
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


if (isset($_GET['id'])) {
 $colname_marker = $_GET['id'];
 $id = $_GET['id'];
}




?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
<head>
<title>Imagenes</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href="/admin-new/plupload/js/jquery.ui.plupload/css/jquery.ui.plupload.css" rel="stylesheet" type="text/css" />
</head>
<link href="css/style.css" rel="stylesheet" type="text/css" />


<!-- Google Font and style definitions -->
<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=PT+Sans:regular,bold">
<link rel="stylesheet" href="css/style.css">
<!-- include the skins (change to dark if you like) -->
<link rel="stylesheet" href="css/dark/theme.css" id="themestyle">
<link rel="stylesheet" href="plupload/js/jquery.ui.plupload/jquery.ui.plupload.js" type="text/css" media="screen" />
<style type="text/css">@import url(plupload/js/jquery.ui.plupload/css/jquery.ui.plupload.css);</style>


<script type="text/javascript" src="js/ui/js/jquery-1.7.1.min.js"></script>

<script src="js/ui/development-bundle/ui/jquery.ui.core.js"></script>
<script src="js/ui/development-bundle/ui/jquery.ui.widget.js"></script>
<script src="js/ui/development-bundle/ui/jquery.ui.mouse.js"></script>
<script src="js/ui/development-bundle/ui/jquery.ui.button.js"></script>
<script src="js/ui/development-bundle/ui/jquery.ui.sortable.js"></script>
<script src="js/ui/development-bundle/ui/jquery.ui.progressbar.js"></script>
<script type="text/javascript" src="http://bp.yahooapis.com/2.4.21/browserplus-min.js"></script>

<!-- Load plupload and all it's runtimes and finally the jQuery UI queue widget -->
<script type="text/javascript" src="plupload/js/plupload.full.js"></script>
<script type="text/javascript" src="plupload/js/jquery.ui.plupload/jquery.ui.plupload.js"></script>


</head>
<body>
<header>
	<div><br />
		<h2 style="padding-left: 20px; color: red;" class="red">Add images</h2>
	</div>
	<div id="header">




	</div>
</header>

<nav>
	<ul id="nav">


        	<?php include('mainnav.php');?>
	</ul>
</nav>
<!--<div id="pageoptions">
	<ul>
		<li><a href="login.html">Logout</a></li>
		<li><a href="#" id="wl_config">Configuration</a></li>
		<li><a href="#">Settings</a></li>
	</ul>
	<div>
		<h3>Place for some configs</h3>
		<p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores.</p>
	</div>
</div>-->
<section id="content">
	<div class="g12 nodrop">
		<form method="post" action="">
	<!--<h1>Events example</h1>

	<p>Shows how to bind and use all available events.</p>

	<h3>Log messages</h3>
	<textarea id="log" style="width: 100%; height: 150px; font-size: 11px" spellcheck="false" wrap="off"></textarea>-->

	<h3>Seleccionar Imganenes</h3>
	<div id="uploader" style="width: 800px; height: 450px;">You browser doesn't support upload.</div>

</form>
<div class="alert i_speech_bubble blue">Antes de continuar espera que están subidas todas las fotos</div><br />
<br />

<a href="main.php"><button class="btn green">Continuar</button></a>
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
		resize: {width: 1200, height: 800, quality: 100},

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
</section>
<footer>Copyright by kiwi-designed.com 2011</footer>
</body>
</html>
