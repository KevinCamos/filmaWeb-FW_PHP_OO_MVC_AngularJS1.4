<?php
// require_once(MODEL_PATH . "jwt.class.php");
// require_once(ASSETS_PATH_PHP . "middleWareAuth.php");
// require_once(ASSETS_PATH_PHP . "jwt_process.inc.php");

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
	function countCart()
	{
		// echo json_encode($_GET['idUser']);

		$json = array();
		$json = loadModel(MODEL_CART, "cart_model", "countCart", $_GET['idUser']);
		echo json_encode($json);
	}
	function addLine()
	{
		// echo json_encode($_GET['idUser']);

		$json = array();
		$json = loadModel(MODEL_CART, "cart_model", "addLine", $_GET);
		echo json_encode($json);
	}
}
