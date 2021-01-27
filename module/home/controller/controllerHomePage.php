<?php
//////
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';

//////
include("$path.\module\home\model\DAOHomePage.php");
//////

switch ($_GET['op']) {


    case 'homeCategory':
        $homeQuery = new DAOHome();

        $category = $homeQuery->query("SELECT * FROM category ORDER BY id_category");
        if ($category==true) {
                        echo json_encode($category);

            exit;
        } else {

            $callback = 'index.php?page=error503';
            die('<script>window.location.href="' . $callback . '";</script>');
            // echo "error";
        } // end_else
 
        break;
        // case 'homePageCat';
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
        include('module/home/view/home.html');

        // include ('view/inc/error404.html');
        break;
}// end_switch