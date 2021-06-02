<?php
class controller_shop
{
	function __construct()
	{
		$_SESSION['module'] = "shop";
	}

	function openProduct()
	{
		// echo json_encode( $_POST["id"]);
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "openProduct", $_POST["id"], $_POST["userID"]);
		echo json_encode($json);
	}
	function listShop()
	{
		// echo json_encode($_GET["sendData"][0]);
		$json = array();
		// $json = loadModel(MODEL_SHOP, "shop_model", "listShop", $_GET["sendData"]);
		$json = loadModel(MODEL_SHOP, "shop_model", "listShop", $_POST);
		echo json_encode($json);
	}



	function categoryDecade()
	{
		// echo json_encode($_GET["sendData"][0]);
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "categoryDecade", $_POST);
		echo json_encode($json);
	}
	function categoryFormate()
	{
		// echo json_encode($_GET["sendData"][0]);
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "categoryFormate", $_POST);
		echo json_encode($json);
	}
	function categoryGenere()
	{
		// echo json_encode($_GET["sendData"][0]);
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "categoryGenere",$_POST);
		echo json_encode($json);
	}

	function filter()
	{
		// echo json_encode($_POST["arrayFilter"]['titulo']);
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "filter", $_POST);
		echo json_encode($json);
	}
	function pagination()
	{
		// echo json_encode($_GET["sendData"][4]);
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "pagination", $_GET["type"]);
		echo json_encode($json);
	}
	function filterType()
	{
		// echo json_encode($_GET["type"]);
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "filterType", $_GET["type"]);
		echo json_encode($json);
	}

	function likeds()
	{
		// echo json_encode($_GET["idUser"]);
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "likeds", $_POST);
		echo json_encode($json);
	}

	//////////////////////// PAGINATION ///////////////////////



}
