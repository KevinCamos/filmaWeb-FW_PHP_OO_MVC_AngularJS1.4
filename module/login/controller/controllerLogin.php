<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';
//////
include("$path.\module\login\model\DAOLogin.php");
include("$path.\module\login\model\\validate_php.php");

//////

switch ($_GET['op']) {

    case 'login':
        // $homeQuery = new DAOHome();
        // $category = $homeQuery->query("SELECT * FROM category ORDER BY id_category");
        // if ($category == true) {
        //     echo json_encode($category);
        //     exit;
        // } else {
        //     //echo json_encode($error);
        //     $callback = 'index.php?page=error503';
        //     die('<script>window.location.href="' . $callback . '";</script>');
        //     // echo "error";
        // } // end_else
        break;
    case 'register':
        // if (validate($_POST['serialize']) == true) {

        //     echo "Entra al registrarse";


        // }
        echo json_encode("Error al registrarse") ;

        break;
}
