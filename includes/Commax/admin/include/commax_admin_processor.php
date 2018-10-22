<?php
@session_start();

if ($_SESSION["commax_admin_viewing"] === true) {

	/* Calls comments class */
	require_once str_replace('\\','/',dirname(__FILE__)) . "/../../include/commax.class.php";

	/* Instatiates the class to a var */
	$Ccommax = new Ccommax();


	/* PROCESS POST ACTIONS (saves and stuff) that will be sent from ajax */
	if(isset($_REQUEST["post_action"])) {
		
		if ($_REQUEST["post_action"] == "save_cfg") {
			if (isset($_REQUEST["maxnumchars"]))
				$Ccommax->saveConfiguration("maxnumchars", $_REQUEST["maxnumchars"]);
			
			if (isset($_REQUEST["Replymaxnumchars"]))	
				$Ccommax->saveConfiguration("Replymaxnumchars", $_REQUEST["Replymaxnumchars"]);
			
			if (isset($_REQUEST["mod_comments"]))
				$Ccommax->saveConfiguration("mod_comments", $_REQUEST["mod_comments"]);
			
			if (isset($_REQUEST["mid_range"]))
				$Ccommax->saveConfiguration("mid_range", $_REQUEST["mid_range"]);
			
			if (isset($_REQUEST["default_ipp"]))
				$Ccommax->saveConfiguration("default_ipp", $_REQUEST["default_ipp"]);
			
			if (isset($_REQUEST["conv_url_to_link"]))
				$Ccommax->saveConfiguration("conv_url_to_link", $_REQUEST["conv_url_to_link"]);
			
			if (isset($_REQUEST["allowed_html"]))
				$Ccommax->saveConfiguration("allowed_html", $_REQUEST["allowed_html"]);
			
			if (isset($_REQUEST["blacklist"]))
				$Ccommax->saveConfiguration("blacklist", $_REQUEST["blacklist"]);
			
			if (isset($_REQUEST["display_order"]))
				$Ccommax->saveConfiguration("display_order", $_REQUEST["display_order"]);
			
			if (isset($_REQUEST["captcha_enabled"]))
				$Ccommax->saveConfiguration("captcha_enabled", $_REQUEST["captcha_enabled"]);
			
			if (isset($_REQUEST["captcha_width"]))
				$Ccommax->saveConfiguration("captcha_width", $_REQUEST["captcha_width"]);
			
			if (isset($_REQUEST["captcha_color1"]))
				$Ccommax->saveConfiguration("captcha_color1", $_REQUEST["captcha_color1"]);
			
			if (isset($_REQUEST["captcha_color2"]))
				$Ccommax->saveConfiguration("captcha_color2", $_REQUEST["captcha_color2"]);
			
			if (isset($_REQUEST["captcha_color3"]))
				$Ccommax->saveConfiguration("captcha_color3", $_REQUEST["captcha_color3"]);
			
			if (isset($_REQUEST["captcha_colorbg"]))
				$Ccommax->saveConfiguration("captcha_colorbg", $_REQUEST["captcha_colorbg"]);
			
			if (isset($_REQUEST["reg_users_only"]))
				$Ccommax->saveConfiguration("reg_users_only", $_REQUEST["reg_users_only"]);
			
			if (isset($_REQUEST["karma_on"]))
				$Ccommax->saveConfiguration("karma_on", $_REQUEST["karma_on"]);
			
			if (isset($_REQUEST["karma_type"]))
				$Ccommax->saveConfiguration("karma_type", $_REQUEST["karma_type"]);
			
			
			echo json_encode(array( 'status' => 1 ));
			
		}
		
		if ($_REQUEST["post_action"] == "app_comm") {
			$result = $Ccommax->admin_approveComment($_REQUEST["comm_app_id"]);
			if ($result == "1") {
				echo json_encode(array( 'status' => 1 ));
			} else {
				echo json_encode(array( 'status' => 0, 'error' => $result  ));
			}
			
			
		}
		
		if ($_REQUEST["post_action"] == "rem_comm") {
			$result = $Ccommax->admin_removeComment($_REQUEST["comm_rem_id"]);
			if ($result == "1") {
				echo json_encode(array( 'status' => 1 ));
			} else {
				echo json_encode(array( 'status' => 0, 'error' => $result  ));
			}
		}
		
	}
	
} else {
	die("SORRY NOT LOGGED IN");
}
?>