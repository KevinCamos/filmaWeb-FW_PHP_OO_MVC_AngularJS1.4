<?php
//////
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';

//////
include("$path.\module\search\model\DAOsearchPage.php");
//////

switch ($_GET['op']) {

    case 'search':


        $homeQuery = new DAOShop();
        $search = $mysqli->real_escape_string($_GET['search']);

        $category = $homeQuery->query("SELECT * FROM movies
        WHERE reference LIKE \"" . $search . "\"
        OR movie LIKE \"" . $search . "\"
        OR formats LIKE \"" . $search . "\"
        OR director LIKE \"" . $search . "\"
        OR genere LIKE \"" . $search . "\"
        OR anyo LIKE \"" . $search . "\" ");

        if ($category == true) {
            echo json_encode($category);

            exit;
        } else {
            echo "error";
        }


    default;
        include('module/shop/view/shop.html');

        break;
}









// function searhQueryAllRows($thisQuery)
// {
//     $homeQuery = new DAOsearch();

//     $category = $homeQuery->query($thisQuery);
//     if ($category == true) {
//         echo json_encode($category);

//         exit;
//     } else {
//         echo "error";
//     }
// }
// function searhQueryOneRow($thisQuery)
// {
//     $homeQuery = new DAOsearch();

//     $category = $homeQuery->queryOneRow($thisQuery);
//     if ($category == true) {
//         echo json_encode($category);

//         exit;
//     } else {
//         echo "error";
//     }
// }
