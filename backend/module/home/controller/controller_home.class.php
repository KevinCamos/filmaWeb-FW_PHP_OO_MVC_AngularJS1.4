<?php
class controller_home
{
	function __construct()
	{
		$_SESSION['module'] = "home";
	}

	// function list()
	// {
	// 	require_once(VIEW_PATH_INC . "top_page_home.php");
	// 	require_once(VIEW_PATH_INC . "header.html");
	// 	require_once(VIEW_PATH_INC . "menu.html");
	// 	loadView(VIEW_PATH_HOME . 'home.html');

	// 	require_once(VIEW_PATH_INC . "footer.html");
	// }
	function carousel()
	{
		// echo json_encode("HOLA");

		$json = array();
		$json = loadModel(MODEL_HOME, "home_model", "carousel");
		echo json_encode($json);
		exit;

	}


	function homeProducts()
	{
		
		if (isset($_GET["offset"])) {
			$json = array();
			$json = loadModel(MODEL_HOME, "home_model", "homeProducts", $_GET["offset"]);
			echo json_encode($json);
		}else{
			$json = loadModel(MODEL_HOME, "home_model", "homeProducts",0);
			echo json_encode($json);	
		}
	}
	function countClick()
	{

		if (isset($_POST["id"])) {
			$json = array();
			$json = loadModel(MODEL_HOME, "home_model", "countClick", $_POST["id"]);
			echo json_encode($json);
		}
	}

}
