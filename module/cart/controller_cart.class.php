<?php
require_once(MODEL_PATH . "jwt.class.php");
require_once(ASSETS_PATH_PHP . "middleWareAuth.php");
require_once(ASSETS_PATH_PHP . "jwt_process.inc.php");

class controller_cart
{
	function __construct()
	{
		$_SESSION['module'] = "cart";
	}

	static function list()
	{
		require_once(VIEW_PATH_INC . "top_page_cart.php");
		require_once(VIEW_PATH_INC . "header.html");
		require_once(VIEW_PATH_INC . "menu.html");
		loadView(VIEW_PATH_CART . 'cart.html');
		require_once(VIEW_PATH_INC . "footer.html");
	}
	function register()
	{
		// echo json_encode(friendlyModFunc("asdf", "asdv", "sdfasd"));

		// echo json_encode(friendlyURL("?model=model&function=function&token=pepinoss"));
		$json = array();
		$json = loadModel(MODEL_CART, "cart_model", "register", $_GET['serialize']);
		echo json_encode($json);
	}


}
