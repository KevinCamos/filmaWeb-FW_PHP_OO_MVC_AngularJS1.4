<?php
class controller_home
{
	function __construct()
	{
		$_SESSION['module'] = "home";
	}

	function list()
	{
		require_once(VIEW_PATH_INC . "top_page_home.php");
		require_once(VIEW_PATH_INC . "header.html");
		require_once(VIEW_PATH_INC . "menu.html");
		loadView(VIEW_PATH_HOME . 'home.html');

		require_once(VIEW_PATH_INC . "footer.html");
	}
	function carousel()
	{
		// echo json_encode(MODEL_HOME);

		$json = array();
		$json = loadModel(MODEL_HOME, "home_model", "carousel");
		echo json_encode($json);
	}


	function homeProducts()
	{
		// echo json_encode($_GET["offset"]);

		if (isset($_GET["offset"])) {
			$json = array();
			$json = loadModel(MODEL_HOME, "home_model", "homeProducts", $_GET["offset"]);
			echo json_encode($json);
		}
	}
	function countClick()
	{
		// echo json_encode($_GET["id"]);

		if (isset($_GET["id"])) {
			$json = array();
			$json = loadModel(MODEL_HOME, "home_model", "countClick", $_GET["id"]);
			echo json_encode($json);
		}
	}

	// function load_name(){
	// 	if ((isset($_POST["load_name"])) && ($_POST["load_name"] == true)){
	// 		$json = array();
	// 	 	$json = loadModel(MODEL_HOME, "home_model", "load_name");
	// 	 	echo json_encode($json);
	// 	}
	// }

	// function selected_best_breed(){
	// 	if ((isset($_POST["selected_best_breed"])) && ($_POST["selected_best_breed"] == true)){
	// 		$_SESSION['selectbreed'] = $_POST['seltbreed'];
	// 		if ($_SESSION['selectbreed']) {
	// 			echo json_encode(true);
	// 			exit();
	// 		}else{
	// 			echo json_encode(false);
	// 			exit();
	// 		}
	// 	}
	// }

	// function details_list(){
	// 	if ((isset($_POST["details_list"])) && ($_POST["details_list"] == true)){
	// 		$json = array();
	// 	 	$json = loadModel(MODEL_HOME, "home_model", "obtain_data_details",$_POST["idchip"]);
	// 	 	echo json_encode($json);
	// 	}
	// }

	// function get_breed(){
	// 	if ((isset($_POST["get_breed"])) && ($_POST["get_breed"] == true)){
	// 		if (isset($_SESSION['selectbreed'])) {
	// 			echo $_SESSION['selectbreed'];
	// 			unset($_SESSION['selectbreed']);
	// 			exit();
	// 		}else{
	// 			echo '%';
	// 			exit();
	// 		}
	// 	}
	// }

	// function load_list(){
	// 	if ((isset($_POST["load_list"])) && ($_POST["load_list"] == true)){
	// 		$json = array();
	// 	 	$json = loadModel(MODEL_HOME, "home_model", "obtain_data_list",$_POST['rlt_breed'],$_POST['number']);
	// 	 	echo json_encode($json);
	// 	}
	// }

	// function active_user(){
	// 	if (isset($_GET['param'])) {
	// 		loadModel(MODEL_HOME, "home_model", "active_user",$_GET['param']);
	// 		setcookie("toastr","ver");
	// 		header('Location: ' . SITE_PATH);
	// 	}	
	// }

}
