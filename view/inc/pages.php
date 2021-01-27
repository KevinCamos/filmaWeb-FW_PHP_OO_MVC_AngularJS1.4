<?php
if ((isset($_GET['page']))) {

	switch ($_GET['page']) {
		case "home";
			include("module\home\\view\home.html");
			break;
		case "movies";
			include("module/movies/controller/controller_movies.php");
			break;
		case "services";
			include("module/services/" . $_GET['page'] . ".html");
			break;
		case "portfolio";
			include("module/portfolio/" . $_GET['page'] . ".html");
			break;
		case "pricing";
			include("module/pricing/" . $_GET['page'] . ".html");
			break;
		case "aboutus";
			include("module/aboutus/" . $_GET['page'] . ".html");
			break;
		case "contactus";
			include("module/contactus/" . $_GET['page'] . ".html");
			break;
		case "404";
			include("view/inc/error/" . $_GET['page'] . ".html");
			break;
		case "error503";
			include("view/inc/error/" . $_GET['page'] . ".html");
			break;
		default;
			include("module/home/home.php");
			break;
	}
} else {
	include("module\home\\view\home.html");
}
