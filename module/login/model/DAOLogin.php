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
        $hashavatar = md5(strtolower(trim($email)));
        $hashed_pass = password_hash($password, PASSWORD_DEFAULT);
        $avatar = "https://www.gravatar.com/avatar/$hashavatar?s=40&d=identicon";

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
    WHERE username LIKE '$user'";

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
