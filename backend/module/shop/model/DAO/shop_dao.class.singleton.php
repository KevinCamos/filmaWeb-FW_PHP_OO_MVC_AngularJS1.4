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
        WHERE li.idusers LIKE '$idUser') AS B)
        ON mo.id = B.idmovies
        WHERE mo.id= $idProduct";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_listShop($db, $sendDatArray)
    {
        $sql = "SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        ((SELECT DISTINCT li.idmovies, 'like' as likes 
        FROM liketo li
        WHERE li.idusers LIKE '$sendDatArray[userID]') AS B)
        ON mo.id = B.idmovies
        ORDER BY  movie asc";
        // ORDER BY " . $sendDatArray[1] . ", movie asc LIMIT " . $sendDatArray[2] . ",6";

        // $sql = "SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        // ((SELECT DISTINCT li.idmovies, 'like' as likes 
        // FROM liketo li
        // WHERE li.idusers LIKE '0') AS B)
        // ON mo.id = B.idmovies
        // ORDER BY  movie asc";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_categoryDecade($db, $sendDatArray)
    {
        // return $sendDatArray;
        // $sql = "SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        // ((SELECT DISTINCT li.idmovies, 'like' as likes 
        // FROM liketo li
        // WHERE li.idusers LIKE '$sendDatArray[0]') AS B)
        // ON mo.id = B.idmovies                     
        // WHERE anyo BETWEEN 1980 AND 1989  
        // ORDER BY " . $sendDatArray[1] . " , movie asc LIMIT  " . $sendDatArray[2] . ", 6";
        $sql = "SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        ((SELECT DISTINCT li.idmovies, 'like' as likes 
        FROM liketo li
        WHERE li.idusers LIKE '$sendDatArray[userID]') AS B)
        ON mo.id = B.idmovies                     
        WHERE anyo BETWEEN 1980 AND 1989  
        ORDER BY  movie asc";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_categoryFormate($db, $sendDatArray)
    {
        // return $sendDatArray;
        // $sql = "SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        // ((SELECT DISTINCT li.idmovies, 'like' as likes 
        // FROM liketo li
        // WHERE li.idusers LIKE '$sendDatArray[0]') AS B)
        // ON mo.id = B.idmovies               
        //  WHERE formats LIKE '%VHS%' ORDER BY " . $sendDatArray[1] . " , movie asc LIMIT  " . $sendDatArray[2] . ", 6";        // return $sendDatArray;
        $sql = "SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        ((SELECT DISTINCT li.idmovies, 'like' as likes 
        FROM liketo li
        WHERE li.idusers LIKE '$sendDatArray[userID]') AS B)
        ON mo.id = B.idmovies   
        WHERE formats LIKE '%VHS%'            
        ORDER BY  movie asc";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_categoryGenere($db, $sendDatArray)
    {
      
        $sql = "SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
         ((SELECT DISTINCT li.idmovies, 'like' as likes 
         FROM liketo li
         WHERE li.idusers LIKE '$sendDatArray[userID]') AS B)
         ON mo.id = B.idmovies               
         WHERE genere = 'Fantasia'  
         ORDER BY  movie asc";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_filter($db, $sendDatArray)
    {

        $user = $sendDatArray['userID'];
        $sendDatArray = $sendDatArray['arrayFilter'];
       
        if ($sendDatArray[2] != 0) {
            $whereYear = "AND anyo = $sendDatArray[2]";
        } else {
            $whereYear = '';
        }

       
        $sql = "SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        ((SELECT DISTINCT li.idmovies, 'like' as likes 
        FROM liketo li
        WHERE li.idusers LIKE '$user') AS B)
        ON mo.id = B.idmovies               
        WHERE movie LIKE '%$sendDatArray[0]%'
        AND director LIKE '%$sendDatArray[1]%'
         $whereYear
         AND price BETWEEN  $sendDatArray[3] AND $sendDatArray[4]";
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function select_data_pagination($db, $array)
    {
        $type = $array[0];
        $sql =  "SELECT COUNT(*) AS countPage FROM MOVIES ";
        //  return $array;

        switch ($type) {
            case "listShop":
                break;
            case "searchQuery":
                $search = $array[1];
                $sql = "SELECT COUNT(*) AS countPage FROM MOVIES
                WHERE movie LIKE '%$search%'
                OR formats LIKE '%$search%'
                OR director LIKE '%$search%' 
                OR genere LIKE '%$search%' 
                OR anyo LIKE '%$search%'";

                break;
            case "filterQuery":
                $searchQuery = base64_decode($array[1]);

                $sql =  $sql . $searchQuery;
                break;
            case 'decade':
                $sql =  "SELECT COUNT(*) AS countPage FROM MOVIES " . "WHERE anyo BETWEEN 1980 AND 1989";

                break;
            case 'formate':
                $sql =  "SELECT COUNT(*) AS countPage FROM MOVIES " . "WHERE formats LIKE '%VHS%'";
                break;
            case 'genere':
                $sql =  "SELECT COUNT(*) AS countPage FROM MOVIES " . "WHERE genere = 'Fantasia'";
                break;
        }
        // return $sendDatArray;
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }

    public function select_data_filterType($db, $type)
    {
        $sql =  "SELECT COUNT(*) AS countPage FROM MOVIES ";

        switch ($type) {

            case 'country':
                $sql =  "SELECT DISTINCT country FROM movies ORDER BY  country asc";

                break;
            case 'genere':
                $sql =  "SELECT DISTINCT genere FROM movies ORDER BY  genere asc";
                break;
        }
     
        $stmt = $db->ejecutar($sql);
        return $db->listar($stmt);
    }
    public function insert_data_like($db, $get)
    {
        $idUser =  $get['idUser'];
        $idProduct = $get['idProduct'];

        $sql = "INSERT INTO liketo 
        VALUES ('$idUser', $idProduct)";
        return $db->ejecutar($sql);
    }
    public function remove_data_like($db, $get)
    {
        $idUser =  $get['idUser'];
        $idProduct = $get['idProduct'];
        $sql = "DELETE FROM liketo 
               WHERE idusers LIKE '$idUser' 
               AND idmovies= $idProduct";

        return   $db->ejecutar($sql);
    }
  
}
