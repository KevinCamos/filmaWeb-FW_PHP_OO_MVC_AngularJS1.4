<?php
class cart_dao
{
    static $_instance;

    private function __construct()
    {
    }

    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }
    public function select_data_countCart($db, $idAlbaran)
    {
        $sql = "SELECT SUM(cantidad) as cantidad
        FROM linea_producto
        WHERE idalbaran = $idAlbaran
        GROUP BY idalbaran";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_getAlbaran($db, $idUser)
    {

        $sql = "SELECT idalbaran 
        FROM albaran
        WHERE idcliente LIKE '$idUser'
        AND estado LIKE  'proceso'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function insert_data_albaran($db, $idUser)
    {


        $sql = "INSERT INTO `albaran` (`idcliente`)
            VALUES ('$idUser')";
        return $db->ejecutar($sql);
    }
    public function select_data_getLine($db, $idAlbaran, $idProduct)
    {

        $sql = "SELECT idlinea 
        FROM linea_producto
        WHERE idalbaran = $idAlbaran
        AND idproducto =  $idProduct";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function insert_data_line($db, $idAlbaran, $idProduct)
    {


        $sql = "INSERT INTO `linea_producto` (`idalbaran`, `idproducto`)
        VALUES ($idAlbaran, $idProduct)";
        return $db->ejecutar($sql);
    }
    public function update_data_addToLine($db, $idAlbaran, $idLineaOrProduct)
    {


        $sql = "UPDATE `linea_producto` 
        SET `cantidad` = `cantidad`+1 
        WHERE ((`idlinea` = '$idLineaOrProduct')  OR (`idproducto` = '$idLineaOrProduct'))
        AND (`idalbaran` = '$idAlbaran')";

        return $db->ejecutar($sql);
    }
    public function update_data_removeToLine($db, $idAlbaran, $idProduct)
    {

        $sql = "UPDATE `linea_producto` 
        SET `cantidad` = `cantidad`-1 
        WHERE (`idproducto` = '$idProduct') 
        AND (`idalbaran` = '$idAlbaran')";
        return $db->ejecutar($sql);
    }

    public function delete_data_dropToLine($db, $idAlbaran, $idProduct)
    {

        $sql = "UPDATE `linea_producto` 
        SET `cantidad` = 0 WHERE (`idproducto` = '$idProduct') 
        AND (`idalbaran` = '$idAlbaran')";
        return $db->ejecutar($sql);
    }
    public function select_data_getCart($db, $idAlbaran)
    {
        $sql = "SELECT l.*, m.movie,  m.price,  m.img
        FROM linea_producto l, movies m
        WHERE l.idalbaran = $idAlbaran
        AND l.idproducto = m.id
        AND l.cantidad <> 0";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_totalPrice($db, $idAlbaran, $idProduct)
    {
        $sql = "SELECT l.idproducto, l.cantidad,  m.price
        FROM linea_producto l, movies m
        WHERE l.idalbaran = $idAlbaran
        and m.id=l.idproducto
        AND l.idproducto = $idProduct";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_getTotalCart($db, $idAlbaran)
    {
        $sql = "SELECT l.idproducto, l.idalbaran, l.cantidad, m.movie, m.price, (l.cantidad*m.price) AS totalPrice
        FROM linea_producto l, movies m
        WHERE l.idproducto=m.id
        AND l.cantidad <> 0 
        AND  l.idalbaran = $idAlbaran;";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function update_data_endCart($db, $idAlbaran)
    {
        $sql = "UPDATE albaran 
        SET estado = 'F' 
        WHERE idalbaran = $idAlbaran";

        return $db->ejecutar($sql);
    }
    // public function insert_data_register($db, $email, $nameUser, $hashed_pass,  $avatar, $token_email)
    // {
    //     //PREGUNTAR A YOLANDA PER LA CREACIÓ DE LA ID ALEATORIA.
    //     // return $sendDatArray;  
    //     $idUser = generate_Token_secure(20);
    //     $idUser = 'FW-' . $idUser;
    //     $sql = "INSERT INTO `users` (`idusers`, `email`, `username`, `pssword`, `avatar`, `token_email`)
    //     VALUES ( '$idUser', '$email', '$nameUser', '$hashed_pass','$avatar', '$token_email')";


    //     // return $sql;
    //     return $db->ejecutar($sql);
    //     // return $db->listar($stmt);
    // }

    // public function select_data_validateUserLogin($db, $nameUser)
    // {
    //     $sql = "SELECT *
    //     FROM users
    //     WHERE (username LIKE '$nameUser'
    //     OR email LIKE '$nameUser')
    //     AND activate LIKE 'activate'
    //     AND idusers LIKE 'FW-%'";

    //     $stmt = $db->ejecutar($sql);
    //     return $db->listar($stmt);
    // }
    // public function select_data_getUser($db, $nameUser)
    // {
    //     $sql = "SELECT idusers, email, username, avatar, type
    //     FROM users
    //     WHERE (username LIKE '$nameUser'
    //     OR email LIKE '$nameUser')
    //     AND activate LIKE 'activate'";
    //     $stmt = $db->ejecutar($sql);
    //     return $db->listar($stmt);
    // }

    // public function update_data_token_mail($db, $nameUser)
    // {
    //     $sql = "UPDATE `filmoteca`.`users` SET `activate` = 'activate', `token_email` = '' WHERE (`username` = '$nameUser');";

    //     // return $sql;
    //     return $db->ejecutar($sql);
    // }
    // public function select_data_validateSocialLogin($db, $nameUser)
    // {
    //     $sql = "SELECT * FROM users
    //     WHERE idusers LIKE '$nameUser'";
    //     $stmt = $db->ejecutar($sql);
    //     return $db->listar($stmt);
    // }
    // public function insert_data_registerSocialLogin($db, $dataUser)
    // {
    //     $idUser = $dataUser[0];
    //     $email = $dataUser[1];
    //     $nameUser = $dataUser[2];
    //     $avatar = $dataUser[3];
    //     $hashed_pass = generate_Token_secure(100);

    //     $sql = "INSERT INTO `users` (`idusers`, `email`, `username`, `pssword`, `avatar`, `activate`)
    //     VALUES ( '$idUser', '$email', '$nameUser', '$hashed_pass','$avatar', 'activate')";

    //     return $db->ejecutar($sql);
    //     // return $db->listar($stmt);
    // }

    // public function update_data_changePassword($db, $nameUser, $password)
    // {
    //     $sql = "UPDATE `filmoteca`.`users` SET `pssword` = '$password' WHERE (`email` = '$nameUser') AND idusers LIKE 'FW-%';";

    //     // return $sql;
    //     return $db->ejecutar($sql);
    // }
    // public function select_best_breed($db, $arrArgument)
    // {
    //     $sql = "SELECT breed FROM dogs GROUP BY breed ORDER BY count(*) DESC LIMIT $arrArgument,2";
    //     $stmt = $db->ejecutar($sql);
    //     return $db->listar($stmt);
    // }

    // public function select_load_name($db)
    // {
    //     $sql = "SELECT DISTINCT name FROM dogs WHERE state = 0";
    //     $stmt = $db->ejecutar($sql);
    //     return $db->listar($stmt);
    // }

    // public function select_auto_name($db, $arrArgument)
    // {
    //     $sql = "SELECT DISTINCT name,chip,breed,sex,stature,picture,date_birth FROM dogs WHERE name LIKE '%$arrArgument%' AND state = 0";
    //     $stmt = $db->ejecutar($sql);
    //     return $db->listar($stmt);
    // }

    // public function update_active_user($db, $arrArgument)
    // {
    //     $sql = "UPDATE users SET activate = 1 WHERE token = '$arrArgument'";
    //     return $db->ejecutar($sql);
    // }
}
