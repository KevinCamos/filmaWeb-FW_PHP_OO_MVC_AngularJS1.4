<?php
class controller_search
{
	function __construct()
	{
		$_SESSION['module'] = "search";
	}


	function autoComplete()
	{
		// echo json_encode(MODEL_SEARCH_PHP);
		$json = array();
		$json = loadModel(MODEL_SEARCH_PHP, "search_model", "autoComplete");
		echo json_encode($json);
	}


	//////////////////////// PAGINATION ///////////////////////



}
