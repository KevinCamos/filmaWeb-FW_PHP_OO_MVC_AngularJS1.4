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
      
   $search = $sendDatArray;
         $sql = "SELECT * FROM movies
        WHERE  movie LIKE  '%$search%'
        OR formats LIKE '%$search%'
        OR director LIKE '%$search%' 
        OR genere LIKE '%$search%' 
        OR anyo LIKE '%$search%'  ORDER BY  movie asc  ";
        
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
   
}
