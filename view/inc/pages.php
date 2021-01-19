<?php
if ((isset($_GET['page']))){
	
	switch($_GET['page']){
		case "home";
			include("module/home/home.php");
			break;
		case "movies";
			include("module/movies/controller/controller_movies.php");
			break;
		case "services";
			include("module/services/".$_GET['page'].".php");
			break;
		case "aboutus";
			include("module/aboutus/".$_GET['page'].".php");
			break;
		case "contactus";
			include("module/contactus/".$_GET['page'].".php");
			break;
		case "404";
			include("view/inc/error/".$_GET['page'].".php");
			break;
		case "error503";
			include("view/inc/error/".$_GET['page'].".php");
			break;
		default;
			include("module/home/home.php");
			break;
	}
	
}else{
	include("module/home/home.php");

}
?>