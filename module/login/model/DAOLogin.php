<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';

include("$path.\model\connect.php");

class DAOLogin
{
    function register_user($formulario)
    {
        $nameUser =  strtolower($formulario[0]['value']);
        $password =  strtolower($formulario[1]['value']);
        $email = strtolower($formulario[3]['value']);
        $avatar = "avatar";


        $sql = "INSERT INTO `users` (`email`, `username`, `pssword`, `avatar`, `type`)
			VALUES ( '$email', '$nameUser', '$password','$avatar', 'user')";

        $conexion = connect::connect();
        $result = mysqli_query($conexion, $sql);
        connect::close($conexion);
        return  $result ;
    }


    // function query($select)
    // {
    //     $sql = $select;
    //     $conexion = connect::connect();
    //     $result = mysqli_query($conexion, $sql)->fetch_all(MYSQLI_ASSOC);
    //     // ->fetch_object(); //Si me tornara NULL a AJAX; tal volta es perquè falta el fetch_object
    //     connect::close($conexion);
    //     return $result;
    // }
    // function updateQuery($select)
    // {

    //     $sql = $select;
    //     $conexion = connect::connect();
    //     $res = mysqli_query($conexion, $sql);
    //     connect::close($conexion);
    //     return $res;
    // }

    function queryValidateRegister()
    {

        $sql = "SELECT username, email FROM users";
        $conexion = connect::connect();
        $result = mysqli_query($conexion, $sql)->fetch_all(MYSQLI_ASSOC);
        connect::close($conexion);
        return $result;
    }
}
