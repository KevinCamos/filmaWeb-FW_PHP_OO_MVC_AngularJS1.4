<?php

class connect
{

    public static function connect()
    {

        $servername = "localhost";
        $username = "Kevin";
        $password = "Kevin";
        $db = "filmoteca";
        $port = 3306;
        $tabla = "movies";

        // Create connection
        $connect = mysqli_connect($servername, $username, $password, $db, $port, $tabla);
        if (!$connect || $connect->connect_error) {
            die("Connection failed: " . $connect->connect_error);
        }
        // echo '<script> console.log("Connected successfully")</script>';
        return $connect;
        // Check connection
    }
    public static function close($conexion)
    {
        mysqli_close($conexion);
        // echo '<script> console.log("Desconnected successfully")</script>';
    }
}
