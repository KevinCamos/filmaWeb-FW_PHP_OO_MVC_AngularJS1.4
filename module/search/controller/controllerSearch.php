<?php
//////
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';

//////
include("$path.\module\search\model\DAOSearch.php");
//////

switch ($_GET['op']) {

    case 'search':

        // echo '<script>';
        // echo 'console.log(' . $_GET['search'] . ')';
        // echo '</script>';

        $search = $_GET['search'];
        // $search = "ea";
        searhQueryAllRows('SELECT * FROM movies
        WHERE  movie LIKE  "%' . $search . '%"
         OR movie LIKE  "%' . $search . '%"
        OR formats LIKE  "%' . $search . '%"
        OR director LIKE  "%' . $search . '%"
        OR genere LIKE  "%' . $search . '%"
        OR anyo LIKE "%' . $search . '%" ');


        // $homeQuery = new DAOSearch();
        // $search = $mysqli->real_escape_string($_GET['search']);
        // $search = "%" +  $search + "%";
        // // $query = "SELECT * FROM movies
        // WHERE reference LIKE \"" . $search . "\"
        // OR movie LIKE \"" . $search . "\"
        // OR formats LIKE \"" . $search . "\"
        // OR director LIKE \"" . $search . "\"
        // OR genere LIKE \"" . $search . "\"
        // OR anyo LIKE \"" . $search . "\" ";

        // // console_log($query);
        // // echo json_encode($search);

        // $category = $homeQuery->query("SELECT * FROM movies
        // WHERE reference LIKE \"" . $search . "\"
        // OR movie LIKE \"" . $search . "\"
        // OR formats LIKE \"" . $search . "\"
        // OR director LIKE \"" . $search . "\"
        // OR genere LIKE \"" . $search . "\"
        // OR anyo LIKE \"" . $search . "\" ");
        // return false;
        // if ($category == true) {
        //     echo json_encode($category);

        //     exit;
        // } else {
        //     echo "error";
        // }
        break;

    default;
        include('module/shop/view/shop.html');

        break;
}

function searhQueryAllRows($thisQuery)
{
    $homeQuery = new DAOSearch();

    $category = $homeQuery->query($thisQuery);
    if ($category == true) {
        echo json_encode($category);

        exit;
    } else {
        echo "error";
    }
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
