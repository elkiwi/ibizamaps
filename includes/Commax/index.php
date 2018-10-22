<?php
// Make sure you start session. The @ before will supress any warnings in case session has already been started somewhere.
@session_start();

// Probably the most important config in the world ;) $ref_id
//
// This will identify what page we are in. If you are using a CMS enter the page id here
// Or for example a post ID, or a product ID. If you have comments for pages with ID's, posts with ID's and also products with ID's
// it's probably good idea to use somthing like "PAGE_$YOUR_ID" for pages, and "PROD_$YOUR_ID" for products, and "POST_$YOUR_ID" for posts.
// Thing is, it must represent a unique identifier of a unique page to start a new comment thread.
// You can also use something like "my_page.php". Anything really :)
$ref_id = "3";


/*
Now comes the session configuration vars.
They are all commented out now. As they say, you don't need to set the default values, because they are pre set in system.
BUT IF you happen to sometime set some of these vars, and then comment them out after a while, remember they will keep in session.
*/


// Manual SESSION config override
$_SESSION["commax_comments_closed"] = false;					// You don't need to set it to false. It is FALSE by default.
$_SESSION["commax_moderated_com"]	= false;					// You don't need to set it to false. It is FALSE by default.
$_SESSION["commax_language"]		= "en"; 					// You don't need to set "en". It is "en" by default



// ONLY SET THIS TO TRUE AFTER PROCESSING YOUR AUTHENTICATION AND ADMIN LOGGED IS TRUE
// This will activate admin funcitons.
$_SESSION["commax_admin_viewing"]	= false;					// You don't need to set it to false. It is FALSE by default.



// Manual SESSION USER COMMENT ONLY  (User information)
// If you choose to have comments only for registered users
// you need to pass their information into session variables
$_SESSION["commax_is_user_logged"]	= false;				// You don't need to set it to false. It is FALSE by default.
$_SESSION["commax_user_name"] 		= "USERNAME";			// If you set commax_is_user_logged TRUE - YOU NEED TO SET THIS
$_SESSION["commax_user_email"] 		= "USER@email.com";		// If you set commax_is_user_logged TRUE - YOU NEED TO SET THIS


// Calls commax class
require_once "include/commax.class.php";

// Instatiates the class to a var
$Ccommax = new Ccommax();

// Calls class build_comment_system() wich builds up the comments for the specific id and return the XHTML for the whole system (comments + form)
$comments = $Ccommax->build_comment_system($ref_id);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>Commax - Commenting Ajax System</title>
		<link rel="stylesheet" type="text/css" href="assets/css/skin1.css" />
	</head>
	<body>
		<h1>Commax - Commenting Ajax System</h1>
		<div id="commax_container">
			<h2>There are <?php /* output number of comments */ echo $Ccommax->nbComments; ?> comments. Leave your please...</h2>
			<?php
			/* Output the whole comment system (Comments + form) */
			echo $comments;
			?>
		</div>
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
		<script type="text/javascript" src="assets/js/commax_engine.js"></script>
	</body>
</html>