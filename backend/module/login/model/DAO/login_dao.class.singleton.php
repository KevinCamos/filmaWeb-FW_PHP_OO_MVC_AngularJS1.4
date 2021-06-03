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
        WHERE (username LIKE '$nameUser'
        OR email LIKE  '$email')
        AND idusers LIKE 'FW-%'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function insert_data_register($db, $email, $nameUser, $hashed_pass,  $avatar, $token_email)
    {
        $idUser = generate_Token_secure(20);
        $idUser = 'FW-' . $idUser;
        $sql = "INSERT INTO `users` (`idusers`, `email`, `username`, `pssword`, `avatar`, `token_email`)
        VALUES ( '$idUser', '$email', '$nameUser', '$hashed_pass','$avatar', '$token_email')";


        return $db->ejecutar($sql);
    }

    public function select_data_validateUserLogin($db, $nameUser)
    {
        $sql = "SELECT *
        FROM users
        WHERE (username LIKE '$nameUser'
        OR email LIKE '$nameUser')
        AND activate LIKE 'activate'
        AND idusers LIKE 'FW-%'";

        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_getUser($db, $nameUser)
    {
        $sql = "SELECT idusers, email, username, avatar, type
        FROM users
        WHERE (username LIKE '$nameUser'
        OR email LIKE '$nameUser')
        AND activate LIKE 'activate'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function update_data_token_mail($db, $nameUser)
    {
        $sql = "UPDATE `filmoteca`.`users` SET `activate` = 'activate', `token_email` = '' WHERE (`username` = '$nameUser');";

        return $db->ejecutar($sql);
    }
    public function select_data_validateSocialLogin($db, $nameUser)
    {
        $sql = "SELECT * FROM users
        WHERE idusers LIKE '$nameUser'";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function insert_data_registerSocialLogin($db, $dataUser)
    {
        $idUser = $dataUser[0];
        $email = $dataUser[1];
        $nameUser = $dataUser[2];
        $avatar = $dataUser[3];
        $hashed_pass = generate_Token_secure(100);

        $sql = "INSERT INTO `users` (`idusers`, `email`, `username`, `pssword`, `avatar`, `activate`)
        VALUES ( '$idUser', '$email', '$nameUser', '$hashed_pass','$avatar', 'activate')";

        return $db->ejecutar($sql);
    }

    public function update_data_changePassword($db, $nameUser, $password)
    {
        $sql = "UPDATE `filmoteca`.`users` SET `pssword` = '$password' WHERE (`email` = '$nameUser') AND idusers LIKE 'FW-%';";

        return $db->ejecutar($sql);
    }
  
}
