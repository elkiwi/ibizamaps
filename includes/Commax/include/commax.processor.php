<?php
@session_start();

if ( (isset($_REQUEST["type"])) and ( ($_REQUEST["type"] === "reply") or ($_REQUEST["type"] === "comment") ) ) {
	// Post comment or reply request
	
	
	// checks if there is an ID sent, meaning we are receiving a reply post request
	if (isset($_REQUEST["id"]))
		$parentID = $_REQUEST["id"];
	else
		$parentID = "";
	
	// Include the class file. MUST BE ON SAME FOLDER AS THIS FILE.
	// and instantiate it to a var
	require_once str_replace('\\','/',dirname(__FILE__)) . "/commax.class.php";
	$Ccommax = new Ccommax();
	
	// This array is going to be populated with either the data that was sent to the script, or the error messages.
	$arr = array();
	
	// Call VALIDATION function before anything else
	$validates = $Ccommax->validate($arr, $_REQUEST["type"], $parentID);
	
	// Is a comment or a reply
	if ((isset($_REQUEST["type"])) and ($_REQUEST["type"] === "reply")) {
		$isReply = true;
	} else {
		$isReply = false;
	}
	
	if ($validates) {
		
		// Insert comment to database:
		$arr = $Ccommax->insert_new_comment($arr);
		
		// The data in $arr is escaped for the mysql query, but we need the unescaped variables, so we apply, stripslashes to all the elements in the array:
		$arr = array_map('stripslashes',$arr);
		
		// Now process comment for markup
		$insertedComment = $Ccommax->process_comment($arr);
		
		// Outputting the markup of the just-inserted comment:
		echo json_encode(array( 'status' => 1, 'html' => $Ccommax->pre_Markup($isReply, true) ));
		
	} else {
		/* Outputtng the error messages */
		echo '{"status":0,"errors":'.json_encode($arr).'}';
	}
	
	
	
} else if ((isset($_REQUEST["type"])) and ($_REQUEST["type"] === "ajax_paginate")) {
	// Comments pagination operation request
	
	
	// Include the class file. MUST BE ON SAME FOLDER AS THIS FILE.
	// and instantiate it to a var
	require_once str_replace('\\','/',dirname(__FILE__)) . "/commax.class.php";
	$Ccommax = new Ccommax();
	
	/* Calls class build_comment_system() wich builds up the comments for the specific id and return the XHTML for the whole system (comments + form) */
	$comments = $Ccommax->build_comment_system($_POST["ref_id"]);
	
	/* Output the whole comment system (Comments + form) */
	echo $comments;
	
	
	
	
} else if ((isset($_REQUEST["type"])) and ($_REQUEST["type"] === "getConfig")) {
	// Get Ajax Configurations request
	
	
	// Include the class file. MUST BE ON SAME FOLDER AS THIS FILE.
	// and instantiate it to a var
	require_once str_replace('\\','/',dirname(__FILE__)) . "/commax.class.php";
	$Ccommax = new Ccommax();
	
	// Call VALIDATION static function before anything else
	echo $Ccommax->getJSConfig();
	
	
	
	
	
} else if ((isset($_REQUEST["type"])) and ($_REQUEST["type"] === "rem")) {
	// Remove comment request
	
	
	// Include the class file. MUST BE ON SAME FOLDER AS THIS FILE.
	// and instantiate it to a var
	require_once str_replace('\\','/',dirname(__FILE__)) . "/commax.class.php";
	$Ccommax = new Ccommax();
	
	// Call VALIDATION static function before anything else
	echo $Ccommax->removeComment($_REQUEST["id"]);
	
	
	
	
	
} else if ((isset($_REQUEST["type"])) and ($_REQUEST["type"] === "app")) {
	// Approve comment request
	
	
	// Include the class file. MUST BE ON SAME FOLDER AS THIS FILE.
	// and instantiate it to a var
	require_once str_replace('\\','/',dirname(__FILE__)) . "/commax.class.php";
	$Ccommax = new Ccommax();
	
	// Call approveComment() function, and echo it's reply
	echo $Ccommax->approveComment($_REQUEST["id"]);
	
	
	
	
	
} else if ((isset($_REQUEST["type"])) and ($_REQUEST["type"] === "karma_vote")) {
	
	// Include the class file. MUST BE ON SAME FOLDER AS THIS FILE.
	// and instantiate it to a var
	require_once str_replace('\\','/',dirname(__FILE__)) . "/commax.class.php";
	$Ccommax = new Ccommax();
	
	// Call karma_vote() function, and echo it's reply
	echo $Ccommax->karma_vote($_REQUEST["ID"], $_REQUEST["voteUPorDOWN"]);
	
	
	
	
} else {
	die("Not valid operation nor direct access");
}

?>