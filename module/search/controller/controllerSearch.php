<?php
//////
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';

//////
include("$path.\module\search\model\DAOSearch.php");
//////

switch ($_GET['op']) {

    case 'search':
        $offset = $_GET['offset'];
        $offset = $_GET['order'];

        $user = $_GET['idUser'];
        $search = $_GET['search'];

        searhQueryAllRows("SELECT mo.*, B.likes  FROM movies mo LEFT JOIN 
        ((SELECT DISTINCT li.idmovies, 'like' as likes 
        FROM liketo li
        WHERE li.idusers=  $user) AS B)
        ON mo.id = B.idmovies
        WHERE  movie LIKE  '%$search%'
        OR formats LIKE '%$search%'
        OR director LIKE '%$search%' 
        OR genere LIKE '%$search%' 
        OR anyo LIKE '%$search%'  ORDER BY " . $_GET['od'] . " , movie asc  LIMIT $offset, 6  ");

        break;
    case 'countPage':


        $search = $_GET['search'];
        $selCountFrom = "SELECT COUNT(*) AS countPage FROM MOVIES
           WHERE movie LIKE '%$search%'
        OR formats LIKE '%$search%'
        OR director LIKE '%$search%' 
        OR genere LIKE '%$search%' 
        OR anyo LIKE '%$search%'";

        searhQueryOneRow($selCountFrom);

        break;


    case 'autoComplete':


        searhQueryAllRows('SELECT movie, anyo FROM movies ORDER BY movie');

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

function searhQueryOneRow($thisQuery)
{
    $homeQuery = new DAOSearch();

    $category = $homeQuery->queryOneRow($thisQuery);
    if ($category == true) {
        echo json_encode($category);

        exit;
    } else {
        echo json_encode($category);
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
