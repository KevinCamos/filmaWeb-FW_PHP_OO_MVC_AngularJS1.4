<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';
//////
include("$path.\module\home\model\DAOHomePage.php");
//////

switch ($_GET['op']) {

    case 'homeCarousel':
        $homeQuery = new DAOHome();
        $category = $homeQuery->query("SELECT * FROM category ORDER BY id_category");
        if ($category == true) {
            echo json_encode($category);
            exit;
        } else {
            //echo json_encode($error);
            $callback = 'index.php?page=error503';
            die('<script>window.location.href="' . $callback . '";</script>');
            // echo "error";
        } // end_else
        break;

    case 'homeProducts':
        $homeQuery = new DAOHome();
        $category = $homeQuery->query("SELECT * FROM movies   ORDER BY rand()  LIMIT 2");
        if ($category == true) {
            echo json_encode($category);
            exit;
        } else {
            //echo json_encode($error);
            $callback = 'index.php?page=error503';
            die('<script>window.location.href="' . $callback . '";</script>');
            // echo "error";
        } // end_else

        break;
    case 'countClick':
        $homeQuery = new DAOHome();

        // console_log("entra ací");
        $result = $homeQuery->updateQuery("UPDATE movies SET clicks = clicks+ 1 
                WHERE id = " . $_GET["count"]);

        if ($result == true) {
            echo json_encode($result);
            exit;
        } else {
            echo json_encode($result);
            break;
        }
    default;

        include('module/home/view/home.html');

        break;
}
