<?php
@session_start();

// SET your desired password here
$password = "kiwi4796";



if (isset($_GET["logout"])) {
	unset($_SESSION['commax_admin_viewing']);
	header("location: login.php");
}

if (isset($_POST["submitted"])) {
	unset($error);
	unset($Passworderror);	
	
	if ($_POST["password"] == "") {
		$Passworderror		= 1;
		$Passworderrortxt	= "Please insert your password";
	}	
	
	if (!isset($Passworderror)) {
		if ($_POST["password"] == $password) {
			$_SESSION["commax_admin_viewing"] = true;
			header("Location: index.php");
		} else {
			$Passworderror		= 1;
			$Passworderrortxt 	= "Incorrect password";
		}
	}
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Commax - Login</title>
		<meta name="robots" content="noindex, nofollow" />
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link href="css/admin_style.css" rel="stylesheet" type="text/css">
	</head>
	<body class="login">
		<center>
			<form method="post" action="login.php">
			<input type="hidden" name="submitted" value="1">
			<div class="logo"></div>
			<div id="loginbox">
				<div class="password">
					Password:<br/>
					<input type="password" name="password" class="formfield" <?php if ((isset($Passworderror)) and ($Passworderror==1)) echo "style=\"border:1px solid #b9060c;\"";?>>
					<?php if ((isset($Passworderror)) and ($Passworderror==1)){?>
						<div class="error">
							<div class="txt">
								<?php echo $Passworderrortxt; ?>
							</div>
						</div>
					<?php } ?>
				</div>
				<br/>
				<div id="formelement">
					<input type="submit" class="formsubmit" value="Login">
				</div>
			</div>	
			</form>
		</center>
	</body>
</html>