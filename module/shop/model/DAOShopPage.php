<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';

include("$path.\model\connect.php");

class DAOShop
{

    function query($select)
    {
        $sql = $select;
        $conexion = connect::connect();
        $result = mysqli_query($conexion, $sql)->fetch_all(MYSQLI_ASSOC);
        // ->fetch_object(); //Si me tornara NULL a AJAX; tal volta es perquè falta el fetch_object
        connect::close($conexion);
        return $result;


        
    }

    function queryOneRow($select)
    {
        $sql = $select;
        $conexion = connect::connect();
        $result = mysqli_query($conexion, $sql)->fetch_object();
        // ->fetch_object(); //Si me tornara NULL a AJAX; tal volta es perquè falta el fetch_object
        connect::close($conexion);
        return $result;


        
    }
}
