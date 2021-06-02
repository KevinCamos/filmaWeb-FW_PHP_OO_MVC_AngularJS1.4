<?php
class home_dao
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

    public function select_data_carousel($db)
    {
        $sql = "SELECT * FROM category ORDER BY id_category";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_homeProducts($db, $offset)
    {
        $sql = "SELECT * FROM movies ORDER BY clicks DESC LIMIT $offset, 18";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function update_countClick($db, $arrArgument)
    {
        $sql = "UPDATE movies SET clicks = clicks+ 1 
        WHERE id = $arrArgument";
        return $db->ejecutar($sql);
    }
  
}
