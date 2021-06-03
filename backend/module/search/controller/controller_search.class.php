<?php
class controller_search
{
	function __construct()
	{
		$_SESSION['module'] = "search";
	}


	function autoComplete()
	{
		$json = array();
		$json = loadModel(MODEL_SEARCH_PHP, "search_model", "autoComplete");
		echo json_encode($json);
	}
	function searchList()
	{
		$json = array();
		$json = loadModel(MODEL_SEARCH_PHP, "search_model", "searchList", $_POST["arrayFilter"]);
		echo json_encode($json);
	}

}
