<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';
$error = $_SERVER['DOCUMENT_ROOT'] . "Kevin\Ejercicios_Kevin\Projecte\view\inc\\error\\error503.html";

include("$path.\module\movies\model\DAOMovie.php");
include("$path.\module\movies\model\\validate_php.php");
switch ($_GET['op']) {

		///LIST - LIST - LIST - LIST - LIST - LIST - //
	case 'list':

		try {
			$daomovies = new DAOMovie();
			$resultado = $daomovies->select_all_movie(); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!
		} catch (Exception $e) {
			$callback = 'index,php?page=error503';
		}
		if (!isset($resultado)) {
			die('<script>window.location.href="' . $callback . '";</script>');
		} else {
			include("$path.\module\movies\\view\list_movies.php");
		}
		break;
		///CREATE - CREATE - CREATE - CREATE - CREATE - CREATE - //
	case 'category':
		echo "<pre>";
		echo print_r($_GET);
		echo "</pre>";
		try {
			$daomovies = new DAOMovie();
			$resultado = $daomovies->select_category_movie($_GET['filter']); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!
		} catch (Exception $e) {
			$callback = 'index,php?page=error503';
		}
		if (!isset($resultado)) {
			die('<script>window.location.href="' . $callback . '";</script>');
		} else {
			include("$path.\module\movies\\view\list_movies.php");
		}
		break;
		///CREATE - CREATE - CREATE - CREATE - CREATE - CREATE - //
	case 'create':
		// echo '<script> console.log("Ha entrar a la creació 1")</script>';


		if (isset($_POST) && !empty($_POST)) {
			// echo "<pre>";
			// echo print_r($_POST);
			// echo "</pre>";
			// validate($_POST) == true ? $switch = true : $switch = false;
			$switch = validate($_POST);

			if ($switch === true) {
				try {
					$daomovie = new DAOMovie();
					$resultado = $daomovie->insert_movie($_POST);
				} catch (Exception $e) {
					$callback = 'index.php?page=error503';
					die('<script>window.location.href="' . $callback . '";</script>');
				}
				if (isset($resultado)) {
					echo '<script language="javascript">alert("Registrado en la base de datos correctamente")</script>';
					$callback = 'index.php?page=movies&op=list';
					die('<script>window.location.href="' . $callback . '";</script>');
				}
			} else {
				include "module/movies/view/create.php";
			}
		} else {

			include "module/movies/view/create.php";
		}
		break;

		// case 'read':

		// 	try {
		// 		$daomovies = new DAOMovie();
		// 		$resultado = $daomovies->select_movie($_GET['id']); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!
		// 		$movie = get_object_vars($resultado);
		// 	} catch (Exception $e) {
		// 		$callback = 'index,php?page=error503';
		// 	}
		// 	if (!isset($resultado)) {
		// 		die('<script>window.location.href="' . $callback . '";</script>');
		// 	} else {
		// 		include "module/movies/view/read.php";
		// 	}
		// 	break;


	case 'read_modal':

		try {
			$daomovies = new DAOMovie();
			$resultado = $daomovies->select_movie($_GET['modal']); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!
		} catch (Exception $e) {
			echo json_encode("error");
		}
		if (!isset($resultado)) {
			echo json_encode("error");
		} else {
			$movie = get_object_vars($resultado);
			echo json_encode($movie);
		}
		break;

	case 'update':
		if (isset($_POST) && !empty($_POST)) {
			// echo "<pre>";
			// echo print_r($_POST);
			// echo "</pre>";
			validate($_POST) == true ? $switch = true : $switch = false;
			if ($switch == true) {

				try {
					$daomovie = new DAOMovie();
					$resultado = $daomovie->update_movie($_POST);
				} catch (Exception $e) {
					$callback = 'index.php?page=error503';
					die('<script>window.location.href="' . $callback . '";</script>');
				}
				if (isset($resultado)) {
					echo '<script language="javascript">alert("Registrado en la base de datos correctamente")</script>';
					$callback = 'index.php?page=movies&op=list';
					die('<script>window.location.href="' . $callback . '";</script>');
				}
			} else {
				try {
					$daomovies = new DAOMovie();
					$resultado = $daomovies->select_movie($_GET['id']); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!
					$movie = get_object_vars($resultado);
				} catch (Exception $e) {
					$callback = 'index.php?page=error503';
				}
				if (!isset($resultado)) {
					die('<script>window.location.href="' . $callback . '";</script>');
				} else {
					include "module/movies/view/update.php";
				}
			}
		} else {
			try {
				$daomovies = new DAOMovie();
				$resultado = $daomovies->select_movie($_GET['id']); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!
				$movie = get_object_vars($resultado);
			} catch (Exception $e) {
				$callback = 'index.php?page=error503';
			}
			if (!isset($resultado)) {
				die('<script>window.location.href="' . $callback . '";</script>');
			} else {
				include "module/movies/view/update.php";
			}
		}
		break;

	case 'delete_modal':

		if ($_GET['modal']) {

			try {
				$daomovie = new DAOMovie();
				$resultado = $daomovie->delete_movie($_GET['modal']);
			} catch (Exception $e) {
				$callback = 'index.php?page=error503';
				die('<script>window.location.href="' . $callback . '";</script>');
			}
			if (isset($resultado)) {
				exit;
			}
		} else {
			$callback = 'index,php?page=error503';
		}

		exit;

		break;

		// case 'delete':

		// 	if (isset($_POST) && !empty($_POST)) {

		// 		try {
		// 			$daomovie = new DAOMovie();
		// 			$resultado = $daomovie->delete_movie($_GET['id']);
		// 		} catch (Exception $e) {
		// 			$callback = 'index.php?page=error503';
		// 			die('<script>window.location.href="' . $callback . '";</script>');
		// 		}
		// 		if (isset($resultado)) {
		// 			echo '<script language="javascript">alert("Registrado en la base de datos correctamente")</script>';
		// 			$callback = 'index.php?page=movies&op=list';
		// 			die('<script>window.location.href="' . $callback . '";</script>');
		// 		}
		// 	} else {
		// 		include "module/movies/view/delete.php";
		// 	}
		// 	break;

	default:

		$callback = 'index.php?page=error503';
		die('<script>window.location.href="' . $callback . '";</script>');
}
