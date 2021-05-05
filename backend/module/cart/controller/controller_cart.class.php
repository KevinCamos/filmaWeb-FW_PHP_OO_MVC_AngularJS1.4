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
		$json = array();
		$json = loadModel(MODEL_CART, "cart_model", "countCart", $_POST['idUser']);
		echo json_encode($json);
	}
	function addLine()
	{
		$json = array();
		$json = loadModel(MODEL_CART, "cart_model", "addLine", $_POST);
		echo json_encode($json);
	}
	function getCart()
	{
		$json = array();
		$json = loadModel(MODEL_CART, "cart_model", "getCart", $_POST['idUser']);
		echo json_encode($json);
	}


	function updateAmount()
	{
		$json = array();
		$json = loadModel(MODEL_CART, "cart_model", "updateAmount", $_POST);
		echo json_encode($json);
	}
	function totalPrice()
	{
		$json = array();
		$json = loadModel(MODEL_CART, "cart_model", "totalPrice", $_POST);
		echo json_encode($json);
	}
	function getAlbaran()
	{
		$json = array();
		$json = loadModel(MODEL_CART, "cart_model", "getAlbaran",  $_POST['idUser']);
		echo json_encode($json);
	}
	function getTotalCart()
	{
		$json = array();
		$json = loadModel(MODEL_CART, "cart_model", "getTotalCart",  $_POST['idAlbaran']);
		echo json_encode($json);
	}
	function endCart()
	{
		$json = array();
		$json = loadModel(MODEL_CART, "cart_model", "endCart",  $_POST['idAlbaran']);
		echo json_encode($json);
	}
}
