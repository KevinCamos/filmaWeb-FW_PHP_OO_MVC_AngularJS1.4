<?php
require_once(MODEL_PATH . "jwt.class.php");
require_once(UTILS . "jwt_process.inc.php");

class controller_login
{
	function __construct()
	{
		$_SESSION['module'] = "login";
	}


	function register() //FET
	{

		$json = array();
		$json = loadModel(MODEL_LOGIN, "login_model", "register", $_POST['user']);
		echo json_encode($json);
	}
	function login() //FET
	{
		// echo json_encode("LOGIN");
		$json = array();
		$json = loadModel(MODEL_LOGIN, "login_model", "login", $_POST['user']);
		echo json_encode($json);
	}

	function getUser() //FET
	{
		// echo json_encode($_POST['token']);
		try {
			$json = array();
			$json = loadModel(MODEL_LOGIN, "login_model", "getUser", $_POST['token']);
			echo json_encode($json);
		} catch (Exception $e) {
			echo json_encode(false);
		}
	}
	function updateToken() //FET
	{
		$json = array();
		$json = loadModel(MODEL_LOGIN, "login_model", "updateToken", $_POST['token']);
		echo json_encode($json);
	}
	function token_mail()
	{


		$json =	loadModel(MODEL_LOGIN, "login_model", "token_mail", $_POST['token']);
		echo ("<script> localStorage.setItem('token', '$json');	</script>");
	}
	function socialLogin() //FET
	{


		$json =	loadModel(MODEL_LOGIN, "login_model", "socialLogin", $_POST['dataUser']);
		echo json_encode($json);
	}
	function recoveredMail() //FET
	{

		$json =	loadModel(MODEL_LOGIN, "login_model", "recoveredMail", $_POST['user']);
		echo json_encode($json);
	}
	function recoveredPassword()
	{

		$json =	loadModel(MODEL_LOGIN, "login_model", "recoveredPassword", $_POST['token']);
		echo json_encode($json);
	}
	//////////////////////// PAGINATION ///////////////////////

	function changePassword()
	{
		// echo json_encode($_GET['password']);

		$json =	loadModel(MODEL_LOGIN, "login_model", "changePassword", $_POST['password'], $_POST['token']);
		echo json_encode($json);
	}
}
