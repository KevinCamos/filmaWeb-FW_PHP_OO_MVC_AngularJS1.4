<?php
//////
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';

//////
include("$path.\module\shop\model\DAOShopPage.php");
//////

switch ($_GET['op']) {


    case 'homeCarousel':

        searhQueryAllRows("SELECT * FROM category ORDER BY id_category");
        break;


    case 'listShop':

        searhQueryAllRows("SELECT * FROM movies");
        break;

    case 'filterCarousel':
        switch ($_GET['category']) {


            case 'decade':
                searhQueryAllRows("SELECT * FROM movies
                WHERE anyo BETWEEN 1980 AND 1989");
                break;
            case 'formate':
                searhQueryAllRows("SELECT * FROM movies
                                 WHERE formats LIKE '%VHS%'");
                break;
            case 'genere':
                searhQueryAllRows("SELECT * FROM movies
                                 WHERE genere = 'Fantasia'");
                break;
        }
    break;

    case 'openProduct':

        searhQueryOneRow("SELECT * FROM movies WHERE id =" . $_GET["product"]);
        // $homeQuery = new DAOShop();
        // $category = $homeQuery->queryOneRow("SELECT * FROM movies WHERE id =" . $_GET["product"]);
        // if ($category == true) {
        //     echo json_encode($category);
        //     exit;
        // } else {
        //     echo "error";
        // } // end_else
        break;

    default;
        include('module/shop/view/shop.html');

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
        echo "error";
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
