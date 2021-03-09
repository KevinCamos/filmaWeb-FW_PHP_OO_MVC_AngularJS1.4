<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';
//////
include("$path.\module\login\model\DAOLogin.php");
include("$path.\module\login\model\\functionsLogin.php");

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
        // echo json_encode(validate($_POST['serialize']));
        if (validateRegister($_POST['serialize']) == true) {
            $loginQuery = new DAOLogin();
            $resultado =  $loginQuery->register_user($_POST['serialize']);
            echo json_encode($resultado);
        } else {
            echo json_encode(false);
        }
        // echo json_encode($_POST['serialize']) ;
        // [0]['value']
        break;
}
