<?php session_cache_expire(180);
session_start(); ?>
<?php require_once('../Connections/ibzm.php');


$myUsername_rsLogin = "0";
if (isset($_POST['user'])) {
  $myUsername_rsLogin = (get_magic_quotes_gpc()) ? $_POST['user'] : addslashes($_POST['user']);
}
$myPassword_rsLogin = "0";
if (isset($_POST['pass'])) {
  $myPassword_rsLogin = (get_magic_quotes_gpc()) ? $_POST['pass'] : addslashes($_POST['pass']);
}




// Verify Login is correct


mysqli_select_db($database_ibzm, $ibzm);
$query_rsLogin = sprintf("SELECT user, pass FROM users WHERE user = '%s' AND pass = '%s'", $myUsername_rsLogin,$myPassword_rsLogin);
$rsLogin = mysqli_query($query_rsLogin, $ibzm);
$row_rsLogin = mysqli_fetch_assoc($rsLogin);
$totalRows_rsLogin = mysqli_num_rows($rsLogin);



// Login & Set Session - Main



if($_POST['action']=="login"){
	if($totalRows_rsLogin==0)
	{
		$errorMessage = "Error con tu nombre o contraseña";
		mysqli_free_result($rsLogin);
	}
	else
	{
			$_SESSION['user'] = $_POST['user'];
			header("Location: main.php");
	}
}

?>

<!doctype html>

<html lang="en-us">

<head>

	<meta charset="utf-8">



	<title>White Label | Login</title>



	<meta name="description" content="">

	<meta name="author" content="revaxarts.com">





	<!-- Apple iOS and Android stuff -->

	<meta name="apple-mobile-web-app-capable" content="yes">

	<meta name="apple-mobile-web-app-status-bar-style" content="black">

	<link rel="apple-touch-icon-precomposed" href="img/icon.png">

	<link rel="apple-touch-startup-image" href="img/startup.png">

	<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,maximum-scale=1">



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



	<!-- Use Google CDN for jQuery and jQuery UI -->

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js"></script>

	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js"></script>



	<!-- Loading JS Files this way is not recommended! Merge them but keep their order -->



	<!-- some basic functions -->

	<script src="js/functions.js"></script>



	<!-- all Third Party Plugins -->

	<script src="js/plugins.js"></script>



	<!-- Whitelabel Plugins -->

	<script src="js/wl_Alert.js"></script>

	<script src="js/wl_Dialog.js"></script>

	<script src="js/wl_Form.js"></script>



	<!-- configuration to overwrite settings -->

	<script src="js/config.js"></script>



	<!-- the script which handles all the access to plugins etc... -->



</head>

<body id="login">

		<header>

			<div id="logo">

				<a href="index.php">Ibiza Top House</a>

			</div>

		</header>

<section id="content">

<fieldset>

<section>

<label>Administración</label></section>

</fieldset>



<form id="login" name="login" method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">



<section><label for="user">Usuario</label>

<div><input type="text" id="user" name="user" required ></div>

</section>

<section><label for="pass">Contraseña</label>

<div><input type="password" id="pass" name="pass" required ></div>

</section>



<section>

<div><button class="fr submit">Login</button></div>

</section>



<p align="right" style="color:#900"><?php echo "$errorMessage"; ?></p>





<input name="action" type="hidden" id="action" value="login">







</form>



</section>



<footer>Copyright by Kiwi Designed</footer>



</body>

</html>