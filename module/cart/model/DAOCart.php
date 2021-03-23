<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';

include("$path.\model\connect.php");

class DAOCart
{



    function getAlbaran($idUser)
    {

        $sql = "SELECT idalbaran 
        FROM albaran
        WHERE idcliente = $idUser
        AND estado LIKE  'proceso'";

        return  close_fetch_object($sql);
    }
    function setAlbaran($idUser)
    {

        $sql = "INSERT INTO `albaran` (`idcliente`)
            VALUES ($idUser)";
        return  close_no_fetch($sql);
    }

    function getLine($idAlbaran, $idProduct)
    {

        $sql = "SELECT idlinea 
        FROM linea_producto
        WHERE idalbaran = $idAlbaran
        AND idproducto =  $idProduct";

        return  close_fetch_object($sql);
    }

    function setLine($idAlbaran, $idProduct)
    {

        $sql = "INSERT INTO `linea_producto` (`idalbaran`, `idproducto`)
        VALUES ($idAlbaran, $idProduct)";
        return  close_no_fetch($sql);
    }
    function updateLineIncrease($idAlbaran, $idLinea)
    {

        $sql = "UPDATE `linea_producto` SET `cantidad` = `cantidad`+1 WHERE (`idlinea` = '$idLinea') and (`idalbaran` = '$idAlbaran')";
        return  close_no_fetch($sql);
    }







    function register_user($formulario)
    {
        $nameUser =  strtolower($formulario[0]['value']);
        $password =  strtolower($formulario[1]['value']);
        $email = strtolower($formulario[3]['value']);
        $hashavatar = md5(strtolower(trim($email)));
        $hashed_pass = password_hash($password, PASSWORD_DEFAULT);
        $avatar = "https://www.gravatar.com/avatar/$hashavatar?s=40&d=robohash";

        $sql = "INSERT INTO `users` (`email`, `username`, `pssword`, `avatar`, `type`)
			VALUES ( '$email', '$nameUser', '$hashed_pass','$avatar', 'user')";

        return  close_fetch_all($sql);
    }
    function login_user($formulario)
    {
        $nameUser =  strtolower($formulario[0]['value']);
        $password =  strtolower($formulario[1]['value']);

        $sql = "SELECT *
        FROM users
        WHERE username LIKE '$nameUser'";

        return  close_fetch_all($sql);
    }



    function queryValidateRegister($nameUser, $email)
    {

        $sql = "SELECT username, email 
        FROM users
        WHERE username LIKE '$nameUser'
        OR email LIKE  '$email'";

        return  close_fetch_all($sql);
    }
    function queryLogin($nameUser)
    {

        $sql = "SELECT *
        FROM users
        WHERE username LIKE '$nameUser'
        OR email LIKE '$nameUser'";

        return  close_fetch_all($sql);
    }

    function login_user_token($user)
    {


        $sql = "SELECT idusers, email, username, avatar, type
    FROM users
    WHERE username LIKE '$user'
    OR email LIKE '$user'";

        return  close_fetch_all($sql);
    }
}
function close_fetch_all($sql)
{
    $conexion = connect::connect();
    $result = mysqli_query($conexion, $sql)->fetch_all(MYSQLI_ASSOC);
    connect::close($conexion);
    return $result;
}
function close_fetch_object($sql)
{
    $conexion = connect::connect();
    $result = mysqli_query($conexion, $sql)->fetch_object();
    connect::close($conexion);
    return $result;
}
function close_no_fetch($sql)
{
    $conexion = connect::connect();
    $result = mysqli_query($conexion, $sql);
    connect::close($conexion);
    return $result;
}
