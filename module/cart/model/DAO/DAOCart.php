<?php

$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';

include("$path.\model\connect.php");

class DAOCart
{



    // function getAlbaran($idUser)
    // {

    //     $sql = "SELECT idalbaran 
    //     FROM albaran
    //     WHERE idcliente = $idUser
    //     AND estado LIKE  'proceso'";

    //     return  close_fetch_object($sql);
    // }
    // function setAlbaran($idUser)
    // {

    //     $sql = "INSERT INTO `albaran` (`idcliente`)
    //         VALUES ($idUser)";
    //     return  close_no_fetch($sql);
    // }

    // function getLine($idAlbaran, $idProduct)
    // {

    //     $sql = "SELECT idlinea 
    //     FROM linea_producto
    //     WHERE idalbaran = $idAlbaran
    //     AND idproducto =  $idProduct";

    //     return  close_fetch_object($sql);
    // }

    // function setLine($idAlbaran, $idProduct)
    // {

    //     $sql = "INSERT INTO `linea_producto` (`idalbaran`, `idproducto`)
    //     VALUES ($idAlbaran, $idProduct)";
    //     return  close_no_fetch($sql);
    // }
    function updateLineIncreaseLine($idAlbaran, $idLinea)
    {

        $sql = "UPDATE `linea_producto` SET `cantidad` = `cantidad`+1 WHERE (`idlinea` = '$idLinea') AND (`idalbaran` = '$idAlbaran')";
        return  close_no_fetch($sql);
    }

    function updateLineIncreaseSum($idAlbaran, $idProduct)
    {

        $sql = "UPDATE `linea_producto` SET `cantidad` = `cantidad`+1 WHERE (`idproducto` = '$idProduct') AND (`idalbaran` = '$idAlbaran')";
        return  close_no_fetch($sql);
    }

    function updateLineIncreaseRest($idAlbaran, $idProduct)
    {

        $sql = "UPDATE `linea_producto` SET `cantidad` = `cantidad`-1 WHERE (`idproducto` = '$idProduct') AND (`idalbaran` = '$idAlbaran')";
        return  close_no_fetch($sql);
    }
    function DeleteLineIncrease($idAlbaran, $idProduct)
    {


        $sql = "UPDATE `linea_producto` SET `cantidad` = 0 WHERE (`idproducto` = '$idProduct') AND (`idalbaran` = '$idAlbaran')";
        return  close_no_fetch($sql);
    }

    function countCart($idAlbaran)
    {

        $sql = "SELECT SUM(cantidad) as cantidad
        FROM linea_producto
        WHERE idalbaran = $idAlbaran
        GROUP BY idalbaran";
        return  close_fetch_object($sql);
    }

    // function getCart($idAlbaran)
    // {

    //     $sql = "SELECT l.*, m.movie,  m.price,  m.img
    //     FROM linea_producto l, movies m
    //     WHERE l.idalbaran = $idAlbaran
    //     AND l.idproducto = m.id
    //     AND l.cantidad <> 0";
    //     return  close_fetch_all($sql);
    // }

    function getTotalPrice($idAlbaran, $idProduct)
    {

        $sql = "SELECT l.idproducto, l.cantidad,  m.price
    FROM linea_producto l, movies m
    WHERE l.idalbaran = $idAlbaran
    and m.id=l.idproducto
    AND l.idproducto = $idProduct";
        return  close_fetch_object($sql);
    }
    function getTotal($idAlbaran)
    {

        $sql = "SELECT l.idproducto, l.idalbaran, l.cantidad, m.movie, m.price, (l.cantidad*m.price) AS totalPrice
        FROM linea_producto l, movies m
        WHERE l.idproducto=m.id
        AND l.cantidad <> 0 
        AND  l.idalbaran = $idAlbaran;";

        return  close_fetch_all($sql);
    }
    function endCart($idAlbaran)
{

    $sql = "UPDATE albaran SET estado = 'F' WHERE idalbaran = $idAlbaran";
    return  close_no_fetch($sql);
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

