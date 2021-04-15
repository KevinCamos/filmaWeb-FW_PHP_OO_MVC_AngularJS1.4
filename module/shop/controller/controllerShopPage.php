<?php
//////
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';

//////
include("$path.\module\shop\model\DAOShopPage.php");
//////

switch ($_GET['op']) {

        // case 'openProduct':
        //     $user = $_GET['idUser'];


        //     searhQueryOneRow("SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        //     ((SELECT DISTINCT li.idmovies, 'like' as likes 
        //     FROM liketo li
        //     WHERE li.idusers=  $user) AS B)
        //     ON mo.id = B.idmovies
        //     WHERE mo.id=" . $_GET["product"]);

        //     break;
        // case 'listShop'://FET
        //     $user = $_GET['idUser'];


        //     // $searchQuery = base64_decode($_GET["od"]);
        //     // searhQueryAllRows("SELECT * FROM movies ORDER BY " . $_GET['od'] . " , movie asc LIMIT  " . $_GET['offset'] . ", 6");

        //     searhQueryAllRows("SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        //     ((SELECT DISTINCT li.idmovies, 'like' as likes 
        //     FROM liketo li
        //     WHERE li.idusers=  $user) AS B)
        //     ON mo.id = B.idmovies
        //     ORDER BY " . $_GET['od'] . " , movie asc LIMIT  " . $_GET['offset'] . ", 6");
        //     break;


    case 'searchQuery':
        $user = $_GET['idUser'];

        $searchQuery = base64_decode($_GET["query"]);

        searhQueryAllRows("SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        ((SELECT DISTINCT li.idmovies, 'like' as likes 
        FROM liketo li
        WHERE li.idusers=  $user) AS B)
        ON mo.id = B.idmovies " . $searchQuery . " ORDER BY " . $_GET['od'] . " , movie asc LIMIT   " . $_GET['offset'] . ", 6");
        break;



        // case 'filterCarousel':
        //     $user = $_GET['idUser'];

        //     switch ($_GET['category']) {

        //         case 'decade':
        //             searhQueryAllRows("SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        //             ((SELECT DISTINCT li.idmovies, 'like' as likes 
        //             FROM liketo li
        //             WHERE li.idusers=  $user) AS B)
        //             ON mo.id = B.idmovies                     
        //             WHERE anyo BETWEEN 1980 AND 1989  
        //             ORDER BY " . $_GET['od'] . " , movie asc LIMIT  " . $_GET['offset'] . ", 6");
        //             break;
        //         case 'formate':
        //             searhQueryAllRows("SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        //             ((SELECT DISTINCT li.idmovies, 'like' as likes 
        //             FROM liketo li
        //             WHERE li.idusers=  $user) AS B)
        //             ON mo.id = B.idmovies               
        //              WHERE formats LIKE '%VHS%' ORDER BY " . $_GET['od'] . " , movie asc LIMIT  " . $_GET['offset'] . ", 6");
        //             break;
        //         case 'genere':
        //             searhQueryAllRows("SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        //             ((SELECT DISTINCT li.idmovies, 'like' as likes 
        //             FROM liketo li
        //             WHERE li.idusers=  $user) AS B)
        //             ON mo.id = B.idmovies               
        //             WHERE genere = 'Fantasia' ORDER BY " . $_GET['od'] . " , movie asc LIMIT  " . $_GET['offset'] . ", 6");
        //             break;
        //     }
        //     break;
    case 'countClick':
        $homeQuery = new DAOShop();

        // console_log("entra ací");
        $result = $homeQuery->updateQuery("UPDATE movies SET clicks = clicks+ 1 
                    WHERE id = " . $_GET["count"]);
        echo json_encode($result);
        if ($result == true) {
            echo json_encode($result);
            exit;
        } else {
            echo json_encode("eeeh");
            break;
        }
    case 'shopsGeolocation':

        searhQueryAllRows("SELECT tiene.id, shop.*
                FROM tiene, shop
                WHERE tiene.cod_shop = shop.cod_shop
                AND tiene.cantidad >0
                AND tiene.id=" . $_GET["product"]);

        break;

    case 'countPage':

        $selCountFrom = "SELECT COUNT(*) AS countPage FROM MOVIES ";
        switch ($_GET['count']) {

            case 'listShop':
                searhQueryOneRow($selCountFrom);
                break;
            case 'searchQuery':
                $searchQuery = base64_decode($_GET["query"]);
                searhQueryOneRow($selCountFrom . $searchQuery);


                // searhQueryAllRows($searchQuery . " LIMIT  " . $_GET['offset'] . ", 6");
                break;
            case 'filterCarousel':
                switch ($_GET['category']) {

                    case 'decade':
                        searhQueryOneRow($selCountFrom . "WHERE anyo BETWEEN 1980 AND 1989");

                        break;
                    case 'formate':
                        searhQueryOneRow($selCountFrom . "WHERE formats LIKE '%VHS%'");
                        break;
                    case 'genere':
                        searhQueryOneRow($selCountFrom . "WHERE genere = 'Fantasia'");
                        break;
                }
                break;
        }
        break;


    case 'countryFilter':

        searhQueryAllRows("SELECT DISTINCT country FROM movies ORDER BY  country asc");
        break;
    case 'genereFilter':

        searhQueryAllRows("SELECT DISTINCT genere FROM movies ORDER BY  genere asc");
        break;


    case 'likeds':
        switch ($_GET['typeLike']) {

            case 'like':
                $idUser =  $_GET['idUser'];
                $idProduct = $_GET['idProduct'];

                $homeQuery = new DAOShop();
                $thisQuery = "INSERT INTO liketo 
                VALUES ($idUser, $idProduct)";
                $category = $homeQuery->query($thisQuery);

                // echo json_encode($category);

                break;
            case 'unlike':
                $idUser =  $_GET['idUser'];
                $idProduct = $_GET['idProduct'];
                $homeQuery = new DAOShop();
                $thisQuery = "DELETE FROM liketo 
               WHERE idusers=$idUser AND idmovies= $idProduct";
                $category = $homeQuery->query($thisQuery);
                break;
        }
        break;
}
function searhQueryAllRows($thisQuery)
{
    $homeQuery = new DAOShop();

    $category = $homeQuery->query($thisQuery);
    if ($category == true) {
        echo json_encode($category);

        exit;
    } else {
        echo ($thisQuery);

        // echo "error";
    }
}

function searhQueryOneRow($thisQuery)
{
    $homeQuery = new DAOShop();

    $category = $homeQuery->queryOneRow($thisQuery);
    if ($category == true) {
        echo json_encode($category);

        exit;
    } else {
        echo "error";
    }
}

// function updateMovie($thisQuery)
// {
//     $homeQuery = new DAOShop();

//     $homeQuery->queryUpdate($thisQuery);
//     exit;
// }
