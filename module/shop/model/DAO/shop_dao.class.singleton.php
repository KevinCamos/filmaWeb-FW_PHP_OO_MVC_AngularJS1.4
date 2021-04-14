<?php
class shop_dao
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

    public function select_data_listShop($db,$order, $offset,$idUser)
    {
        $sql = "SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        ((SELECT DISTINCT li.idmovies, 'like' as likes 
        FROM liketo li
        WHERE li.idusers=  $idUser) AS B)
        ON mo.id = B.idmovies
        ORDER BY $order, movie asc LIMIT $offset, 6";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    // public function select_data_homeProducts($db, $offset)
    // {
    //     $sql = "SELECT * FROM movies ORDER BY clicks DESC LIMIT $offset, 2";
    //     $stmt = $db->ejecutar($sql);
    //     return $db->listar($stmt);
    // }
    // public function update_countClick($db, $arrArgument)
    // {
    //     $sql = "UPDATE movies SET clicks = clicks+ 1 
    //     WHERE id = $arrArgument";
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
