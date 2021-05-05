<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';
//////
include("$path.\module\login\model\DAOLogin.php");
include("$path.\module\login\model\\functionsLogin.php");
include("$path.\assets\\middleWareAuth.php");
include("$path.\assets\\JWTKey.php");

//////

switch ($_GET['op']) {

    case 'login':
        // echo json_encode(validateLogin($_POST['serialize']));
        $nameUser =  strtolower($_POST['serialize'][0]['value']);
        $psswordUser =  strtolower($_POST['serialize'][1]['value']);

        $userSQL = validateLogin($nameUser);

        if ($userSQL != false) {
            list($userSQL) = $userSQL;

            if (password_verify($psswordUser, $userSQL['pssword']) == true) {
                $token = encodeToken($nameUser);

                echo json_encode($token);

                //  $json=   decodeToken($token);

                //  $json =  explode('"',$json);//el array num7
                //  echo json_encode($json[7]);

            } else {
                echo json_encode('falsePssword');
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


    case 'menu':
        $user = decodeToken(($_POST['token']));
        $user = getNameUserFromToken($user);

        if ($user != false) {
            echo json_encode($user);
        } else {
            echo json_encode(false);
        }
        //DAO - username, avatar
        //echo json_encode(datos del usuari)

        break;

    case 'updateToken':
        $token = encodeToken($_POST['user']);

        echo json_encode($token);

        break;
}
