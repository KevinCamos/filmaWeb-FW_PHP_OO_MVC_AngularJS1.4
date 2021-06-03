<?php
class controller_shop
{
	function __construct()
	{
		$_SESSION['module'] = "shop";
	}

	function openProduct()
	{
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "openProduct", $_POST["id"], $_POST["userID"]);
		echo json_encode($json);
	}
	function listShop()
	{
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "listShop", $_POST);
		echo json_encode($json);
	}



	function categoryDecade()
	{
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "categoryDecade", $_POST);
		echo json_encode($json);
	}
	function categoryFormate()
	{
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "categoryFormate", $_POST);
		echo json_encode($json);
	}
	function categoryGenere()
	{
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "categoryGenere",$_POST);
		echo json_encode($json);
	}

	function filter()
	{
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "filter", $_POST);
		echo json_encode($json);
	}
	function pagination()
	{
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "pagination", $_GET["type"]);
		echo json_encode($json);
	}
	function filterType()
	{
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "filterType", $_GET["type"]);
		echo json_encode($json);
	}

	function likeds()
	{
		$json = array();
		$json = loadModel(MODEL_SHOP, "shop_model", "likeds", $_POST);
		echo json_encode($json);
	}

	//////////////////////// PAGINATION ///////////////////////



}
