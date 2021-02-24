<?php
//////
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';

//////
include("$path.\module\shop\model\DAOShopPage.php");
//////

switch ($_GET['op']) {

    case 'openProduct':

        searhQueryOneRow("SELECT * FROM movies WHERE id =" . $_GET["product"]);

        break;
    case 'listShop':
        $offset = $_GET['offset'];
        // $offset = $offset > 0 ?  $offset : 0;
        // if ($_GET['offset'] > 0) {
        //     $offset = $_GET['offset'];
        // } else {
        //     $offset = 0;
        // }
        // $offset = 0;

        searhQueryAllRows("SELECT * FROM movies ORDER BY " . $_GET['od'] . " , movie asc LIMIT  $offset, 6");
        break;


    case 'searchQuery':
        $searchQuery = base64_decode($_GET["query"]);
        searhQueryAllRows($searchQuery);
        break;

    case 'shopsGeolocation':

        searhQueryAllRows("SELECT tiene.id, shop.*
            FROM tiene, shop
            WHERE tiene.cod_shop = shop.cod_shop
            AND tiene.cantidad >0
            AND tiene.id=" . $_GET["product"]);

        break;


    case 'filterCarousel':
        switch ($_GET['category']) {

            case 'decade':
                searhQueryAllRows("SELECT * FROM movies
                    WHERE anyo BETWEEN 1980 AND 1989  ORDER BY " . $_GET['od'] . " , movie asc");
                break;
            case 'formate':
                searhQueryAllRows("SELECT * FROM movies
                                     WHERE formats LIKE '%VHS%' ORDER BY " . $_GET['od'] . " , movie asc");
                break;
            case 'genere':
                searhQueryAllRows("SELECT * FROM movies
                                     WHERE genere = 'Fantasia' ORDER BY " . $_GET['od'] . " , movie asc");
                break;
        }
        break;
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
    case 'countPage':
        $homeQuery = new DAOShop();

        // console_log("entra ací");
        // $result = $homeQuery->updateQuery("SELECT COUNT(*) FROM MOVIES");
        searhQueryOneRow("SELECT COUNT(*) AS countPage FROM MOVIES");

        break;

    case 'countryFilter':

        searhQueryAllRows("SELECT DISTINCT country FROM movies ORDER BY  movie asc");
        break;
    case 'genereFilter':

        searhQueryAllRows("SELECT DISTINCT genere FROM movies ORDER BY  movie asc");
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
