<?php
class controller_shop
{
	function __construct()
	{
		$_SESSION['module'] = "shop";
	}

	function shop()
	{
		require_once(VIEW_PATH_INC . "top_page_shop.php");
		require_once(VIEW_PATH_INC . "header.html");
		require_once(VIEW_PATH_INC . "menu.html");
		loadView(VIEW_PATH_SHOP . 'shop.html');

		require_once(VIEW_PATH_INC . "footer.html");
	}
	function openProduct()
	{
		// echo json_encode(MODEL_SHOP);
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "openProduct", $_GET["id"], $_GET["idUser"]);
		// $json = loadModel(MODEL_SHOP, "shop_model", "listShop", $_GET["order"], $_GET["offset"]);
		echo json_encode($json);
	}
	function listShop()
	{
		// echo json_encode($_GET["sendData"][0]);
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "listShop", $_GET["sendData"]);
		// $json = loadModel(MODEL_SHOP, "shop_model", "listShop", $_GET["order"], $_GET["offset"]);
		echo json_encode($json);
	}



	function categoryDecade()
	{
		// echo json_encode($_GET["sendData"][0]);
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "categoryDecade", $_GET["sendData"]);
		// $json = loadModel(MODEL_SHOP, "shop_model", "listShop", $_GET["order"], $_GET["offset"]);
		echo json_encode($json);
	}
	function categoryFormate()
	{
		// echo json_encode($_GET["sendData"][0]);
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "categoryFormate", $_GET["sendData"]);
		// $json = loadModel(MODEL_SHOP, "shop_model", "listShop", $_GET["order"], $_GET["offset"]);
		echo json_encode($json);
	}
	function categoryGenere()
	{
		// echo json_encode($_GET["sendData"][0]);
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "categoryGenere", $_GET["sendData"]);
		// $json = loadModel(MODEL_SHOP, "shop_model", "listShop", $_GET["order"], $_GET["offset"]);
		echo json_encode($json);
	}
}
