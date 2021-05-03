<?php
class search_dao
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
    public function select_data_autoComplete($db)
    {
        $sql = 'SELECT movie, anyo FROM movies ORDER BY movie';
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_searchList($db, $sendDatArray)
    {
        // return $sendDatArray;
        $offset = $sendDatArray[2];
        $order = $sendDatArray[1];

        $user = $sendDatArray[0];
        $search = $sendDatArray[3];

        $sql = "SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        ((SELECT DISTINCT li.idmovies, 'like' as likes 
        FROM liketo li
        WHERE li.idusers LIKE  '$user') AS B)
        ON mo.id = B.idmovies
        WHERE  movie LIKE  '%$search%'
        OR formats LIKE '%$search%'
        OR director LIKE '%$search%' 
        OR genere LIKE '%$search%' 
        OR anyo LIKE '%$search%'  ORDER BY $order, movie asc  LIMIT $offset, 6  ";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
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
