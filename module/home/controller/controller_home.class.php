<?php
class controller_home
{
	function __construct()
	{
		$_SESSION['module'] = "home";
	}

	function home()
	{
		require_once(VIEW_PATH_INC . "top_page_home.html");
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


	// function best_breed()
	// {
	// 	if ((isset($_POST["best_breed"])) && ($_POST["best_breed"] == true)) {
	// 		$json = array();
	// 		$json = loadModel(MODEL_HOME, "home_model", "best_breed_home", $_POST['position']);
	// 		echo json_encode($json);
	// 	}
	// }

	// function select_auto_name() {
	// 	if ((isset($_POST["select_auto_name"])) && ($_POST["select_auto_name"] == true)){
	// 		$json = array();
	// 	 	$json = loadModel(MODEL_HOME, "home_model", "select_auto_name",$_POST['keyword']);
	// 	 	echo json_encode($json);
	// 	}
	// }

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
