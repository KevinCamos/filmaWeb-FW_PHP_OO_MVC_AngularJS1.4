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
    public function select_data_openProduct($db, $idProduct, $idUser)
    {
        $sql = "SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        ((SELECT DISTINCT li.idmovies, 'like' as likes 
        FROM liketo li
        WHERE li.idusers=  $idUser) AS B)
        ON mo.id = B.idmovies
        WHERE mo.id= $idProduct";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_listShop($db, $sendDatArray)
    {
        // return $sendDatArray;
        $sql = "SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        ((SELECT DISTINCT li.idmovies, 'like' as likes 
        FROM liketo li
        WHERE li.idusers= " . $sendDatArray[0] . ") AS B)
        ON mo.id = B.idmovies
        ORDER BY " . $sendDatArray[1] . ", movie asc LIMIT " . $sendDatArray[2] . ",6";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_categoryDecade($db, $sendDatArray)
    {
        // return $sendDatArray;
        $sql = "SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        ((SELECT DISTINCT li.idmovies, 'like' as likes 
        FROM liketo li
        WHERE li.idusers= " . $sendDatArray[0] . ") AS B)
        ON mo.id = B.idmovies                     
        WHERE anyo BETWEEN 1980 AND 1989  
        ORDER BY " . $sendDatArray[1] . " , movie asc LIMIT  " . $sendDatArray[2] . ", 6";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    
    public function select_data_categoryFormate($db, $sendDatArray)
    {
        // return $sendDatArray;
        $sql ="SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        ((SELECT DISTINCT li.idmovies, 'like' as likes 
        FROM liketo li
        WHERE li.idusers=  " . $sendDatArray[0] . ") AS B)
        ON mo.id = B.idmovies               
         WHERE formats LIKE '%VHS%' ORDER BY " . $sendDatArray[1] . " , movie asc LIMIT  " . $sendDatArray[2] . ", 6";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_categoryGenere($db, $sendDatArray)
    {
        // return $sendDatArray;
        $sql ="SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        ((SELECT DISTINCT li.idmovies, 'like' as likes 
        FROM liketo li
        WHERE li.idusers=   " . $sendDatArray[0] . ") AS B)
        ON mo.id = B.idmovies               
        WHERE genere = 'Fantasia' ORDER BY ". $sendDatArray[1] . " , movie asc LIMIT  " .  $sendDatArray[2] . ", 6";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    // public function select_data_categoryDecade($db, $offset)
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
