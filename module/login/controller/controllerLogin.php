<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';
//////
include("$path.\module\login\model\DAOLogin.php");
include("$path.\module\login\model\\functionsLogin.php");

//////

switch ($_GET['op']) {

    case 'login':
        // echo json_encode(validateLogin($_POST['serialize']));
        $nameUser =  strtolower($_POST['serialize'][0]['value']);
        $psswordUser =  strtolower($_POST['serialize'][1]['value']);

        $userSQL = validateLogin($nameUser);
        if ($userSQL != false) {
            echo json_encode($userSQL);

            if (password_verify($psswordUser, $userSQL['pssword'])==true) {
            echo json_encode($userSQL);
            }
        } else {
            echo json_encode(false);
        }
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
