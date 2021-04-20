<?php
class login_dao
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
    public function select_data_validateRegister($db, $nameUser, $email)
    {
        $sql = "SELECT username, email 
        FROM users
        WHERE username LIKE '$nameUser'
        OR email LIKE  '$email'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function insert_data_register($db, $email, $nameUser, $hashed_pass,  $avatar)
    {
        //PREGUNTAR A YOLANDA PER LA CREACIÓ DE LA ID ALEATORIA.
        // return $sendDatArray;
        $sql = "INSERT INTO `users` (`email`, `username`, `pssword`, `avatar`, `type`)
        VALUES ( '$email', '$nameUser', '$hashed_pass','$avatar', 'user')";
        +

        // return $sql;
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_validateUserLogin($db, $nameUser)
    {
        $sql = "SELECT *
        FROM users
        WHERE username LIKE '$nameUser'
        OR email LIKE '$nameUser'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_getUser($db, $nameUser)
    {
        $sql = "SELECT idusers, email, username, avatar, type
        FROM users
        WHERE username LIKE '$nameUser'
        OR email LIKE '$nameUser'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);    }
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
