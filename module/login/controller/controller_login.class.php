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

	static function list()
	{
		require_once(VIEW_PATH_INC . "top_page_login.php");
		require_once(VIEW_PATH_INC . "header.html");
		require_once(VIEW_PATH_INC . "menu.html");
		loadView(VIEW_PATH_LOGIN . 'login.html');
		require_once(VIEW_PATH_INC . "footer.html");
	}
	function register()
	{
		// echo json_encode(friendlyModFunc("asdf", "asdv", "sdfasd"));

		// echo json_encode(friendlyURL("?model=model&function=function&token=pepinoss"));
		$json = array();
		$json = loadModel(MODEL_LOGIN, "login_model", "register", $_POST['serialize']);
		echo json_encode($json);
	}
	function login()
	{
		// echo json_encode("LOGIN");
		$json = array();
		$json = loadModel(MODEL_LOGIN, "login_model", "login", $_POST['serialize']);
		echo json_encode($json);

		// $nameUser =  strtolower($formulario[0]['value']);
		// $email = strtolower($formulario[3]['value']);
	}

	function getUser()
	{
		$json = array();
		$json = loadModel(MODEL_LOGIN, "login_model", "getUser", $_POST['token']);
		echo json_encode($json);
	}
	function updateToken()
	{
		// echo json_encode($_POST['token']);

		$json = array();
		$json = loadModel(MODEL_LOGIN, "login_model", "updateToken", $_POST['token']);
		echo json_encode($json);
	}
	function token_mail()
	{


		$json =	loadModel(MODEL_LOGIN, "login_model", "token_mail", $_GET['param']);


		self::list();
		// die('<script>window.location.href="' . $callback . '";</script>');
		echo ("<script> localStorage.setItem('token', '$json');	</script>");
	}
	function socialLogin()
	{
		// echo json_encode($_GET['dataUser'][1]);
		// echo json_encode("LOGIN");

		$json =	loadModel(MODEL_LOGIN, "login_model", "socialLogin", $_POST['dataUser']);
		echo json_encode($json);
	}
	function recoveredMail()
	{
		// echo json_encode($_GET['dataUser']);

		$json =	loadModel(MODEL_LOGIN, "login_model", "recoveredMail", $_POST['dataUser']);
		echo json_encode($json);
	}
	function recoveredPassword()
	{
		self::list();


		$json =	loadModel(MODEL_LOGIN, "login_model", "recoveredPassword", $_GET['param']);


		// die('<script>window.location.href="' . $callback . '";</script>');
		echo ("<script> localStorage.setItem('token', '$json');	</script>");
	}
	//////////////////////// PAGINATION ///////////////////////

	function changePassword()
	{
		// echo json_encode($_GET['password']);

		$json =	loadModel(MODEL_LOGIN, "login_model", "changePassword", $_POST['password'], $_POST['token']);
		echo json_encode($json);
	}

}
