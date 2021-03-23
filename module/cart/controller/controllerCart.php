<?php
$path = $_SERVER['DOCUMENT_ROOT'] . '\Kevin\Ejercicios_Kevin\Projecte';
//////
include("$path.\module\cart\model\DAOCart.php");
include("$path.\module\cart\model\\functionsCart.php");

//////


switch ($_POST['op']) {


        case 'addLine':
                $result = addLineShop($_POST['idUser'], $_POST['idProduct']);

                echo json_encode($result);

                break;

        case 'countCart':
                $result = countCart($_POST['idUser']);

                echo json_encode($result);

                break;
}
