<?php
//////
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';

//////
include("$path.\module\search\model\DAOSearch.php");
//////

switch ($_GET['op']) {

    case 'search':

        $search = $_GET['search'];
        searhQueryAllRows('SELECT * FROM movies
        WHERE  movie LIKE  "%' . $search . '%"
         OR movie LIKE  "%' . $search . '%"
        OR formats LIKE  "%' . $search . '%"
        OR director LIKE  "%' . $search . '%"
        OR genere LIKE  "%' . $search . '%"
        OR anyo LIKE "%' . $search . '%" ');

        break;

    case 'autoComplete':

        
        searhQueryAllRows('SELECT movie, anyo FROM movies');

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
