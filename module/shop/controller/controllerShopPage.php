<?php
//////
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';

//////
include("$path.\module\shop\model\DAOShopPage.php");
//////

switch ($_GET['op']) {


    case 'homeCarousel':
        $homeQuery = new DAOShop();

        $category = $homeQuery->query("SELECT * FROM category ORDER BY id_category");
        if ($category == true) {
            echo json_encode($category);

            exit;
        } else {
            //echo json_encode($error);
            echo "error";

            // echo "error";
        } // end_else

        break;


    case 'listShop':
        $homeQuery = new DAOShop();

        $category = $homeQuery->query("SELECT * FROM movies   LIMIT 12");
        if ($category == true) {
            echo json_encode($category);

            exit;
        } else {
            echo "error";
        } // end_else
    break;

    case 'openProduct':
        $homeQuery = new DAOShop();

        $category = $homeQuery->queryOneRow("SELECT * FROM movies WHERE id =".$_GET["product"]);
        if ($category == true) {
            echo json_encode($category);

            exit;
        } else {
            echo "error";
        } // end_else
    break;


        // case 'mPageCat';
        //     $selCatBrand = $homeQuery -> selectMultiple("SELECT * FROM brandCars ORDER BY views DESC LIMIT " . $_POST['loaded'] . ", " . $_POST['items']);
        //     if (!empty($selCatBrand)) {
        //         echo json_encode($selCatBrand);
        //     }else{
        //         echo "error";
        //     }// end_else
        //     break;
        // case 'incrementView';
        //     $viewUp = $homeQuery -> selectBoolean('UPDATE brandCars SET views = views + 1 WHERE brand ="' . $_POST['brand'] . '"');
        //     //////
        //     echo $viewUp;
        //     break;
        //     //////
    default;
        include('module/shop/view/shop.html');

        // include ('view/inc/error404.html');
        break;
}// end_switch