<?php
require_once(MODEL_PATH . "jwt.class.php");
require_once(ASSETS_PATH_PHP . "middleWareAuth.php");
require_once(ASSETS_PATH_PHP . "jwt_process.inc.php");

class controller_login
{
	function __construct()
	{
		$_SESSION['module'] = "login";
	}

	function list()
	{
		require_once(VIEW_PATH_INC . "top_page_login.php");
		require_once(VIEW_PATH_INC . "header.html");
		require_once(VIEW_PATH_INC . "menu.html");
		loadView(VIEW_PATH_LOGIN . 'login.html');
		require_once(VIEW_PATH_INC . "footer.html");
	}
	function register()
	{
		// echo json_encode($_GET['serialize']);
		$json = array();
		$json = loadModel(MODEL_LOGIN, "login_model", "register", $_GET['serialize']);
		echo json_encode($json);


		// $nameUser =  strtolower($formulario[0]['value']);
		// $email = strtolower($formulario[3]['value']);
	}
	function login()
	{
		// echo json_encode("LOGIN");
		$json = array();
		$json = loadModel(MODEL_LOGIN, "login_model", "login", $_GET['serialize']);
		echo json_encode($json);

		// $nameUser =  strtolower($formulario[0]['value']);
		// $email = strtolower($formulario[3]['value']);
	}

	function getUser()
	{
		// echo json_encode("LOGIN");
		$json = array();
		$json = loadModel(MODEL_LOGIN, "login_model", "login", $_GET['serialize']);
		echo json_encode($json);

		// $nameUser =  strtolower($formulario[0]['value']);
		// $email = strtolower($formulario[3]['value']);
	}
	//////////////////////// PAGINATION ///////////////////////



}
