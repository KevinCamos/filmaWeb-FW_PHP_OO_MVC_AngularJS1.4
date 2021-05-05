<?php

$path= $_SERVER['DOCUMENT_ROOT'].'\Kevin\Ejercicios_Kevin\Projecte';

include("$path.\model\connect.php");

class DAOMovie
{
	function insert_movie($datos)
	{
		$count = 0;
		$formats = "";

		$reference = $datos["ref"];
		$movie = $datos["movie"];
		$genere = $datos["genere"];
		$email = $datos["email"];
		if (isset($datos["format"]) && !empty($datos["format"]))
			foreach ($datos["format"] as $indice => $valor) {
				// echo '<script language="javascript">alert("' . $valor . '")</script>';

				if ($count == 0) {
					$formats = "$valor";
					$count++;
				} else {
					$formats = 	$formats . ":$valor";
				}
			}
		// echo '<script language="javascript">alert("' . $formats . '")</script>';

		$director = $datos["director"];
		$awards = $datos["awards"];
		$anyo = $datos["anyo"];


		$sql = "INSERT INTO `movies` (`reference`, `movie`, `email`, `formats`, `director`, `genere`, `awards`, `anyo`)
			VALUES ( '$reference','$movie', '$email','$formats', '$director', '$genere','$awards', '$anyo')";

		$conexion = connect::connect();
		$result = mysqli_query($conexion, $sql);
		connect::close($conexion);
		return $result;
	}

	function select_all_movie()
	{
		//Fincs ací aplega
		$sql = "SELECT * 
		FROM movies 
		ORDER BY movie";
		$conexion = connect::connect();
		$result = mysqli_query($conexion, $sql);
		connect::close($conexion);
		return $result;
	}
	function select_category_movie($category)
	{
		//Fincs ací aplega
		$sql = "SELECT * 
		FROM movies 
		WHERE genere= '$category'
		ORDER BY movie";
		$conexion = connect::connect();
		$result = mysqli_query($conexion, $sql);
		connect::close($conexion);
		return $result;
	}

	function select_movie($id_movie)
	{
		$sql = "SELECT * 
		FROM movies 
		WHERE id='$id_movie'";

		$conexion = connect::connect();
		$result = mysqli_query($conexion, $sql)->fetch_object();
		connect::close($conexion);
		return $result;
	}

	function update_movie($datos)
	{
		$count = 0;
		$formats = "";
		echo '<script language="javascript">alert("' . $count . '")</script>';
		$id = $datos["id"];
		$reference = $datos["ref"];
		$movie = $datos["movie"];
		$genere = $datos["genere"];
		$email = $datos["email"];
		if (isset($datos["format"]) && !empty($datos["format"]))
			foreach ($datos["format"] as $indice => $valor) {
				// echo '<script language="javascript">alert("' . $valor . '")</script>';

				if ($count == 0) {
					$formats = "$valor";
					$count++;
				} else {
					$formats = 	$formats . ":$valor";
				}
			}
		// echo '<script language="javascript">alert("' . $formats . '")</script>';

		$director = $datos["director"];
		$awards = $datos["awards"];
		$anyo = $datos["anyo"];



		// $sql = "UPDATE movies (id, reference, movie, email,  formats, director, genere, awards, anyo)
		// VALUES ( '$id', '$reference,'$movie', '$email','$formats', '$director',  '$genere','$awards', '$anyo')";

	$sql="	UPDATE `movies` SET `reference` = '$reference', `movie` = '$movie', `email` = '$email', `formats` = '$formats', `director` = '$director', `genere` = '$genere', `awards` = '$awards', `anyo` = '$anyo' WHERE `movies`.`id` = 	$id ";

		$conexion = connect::connect();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);
		return $res;
	}

	function delete_movie($id)
	{
		$sql = "DELETE FROM movies WHERE id='$id'";
		$conexion = connect::connect();
		$res = mysqli_query($conexion, $sql);
		connect::close($conexion);
		return $res;
	}
}
