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
        case 'getCart':

                $result = getCart($_POST['idUser']);

                echo json_encode($result);

                break;


        case 'updateAmount':



                $result = updateAmount($_POST['type'], $_POST['idAlbaran'], $_POST['idProduct']);

                echo json_encode($result);

                break;
        case 'totalPrice':

                // echo json_encode($_POST['idAlbaran'], $_POST['idProduct']);


                $result = totalPrice($_POST['idAlbaran'], $_POST['idProduct']);

                echo json_encode($result);

                break;
        case 'getAlbaran':



                $result = getAlbaran($_POST['idUser']);

                echo json_encode($result);

                break;
        case 'getTotal':



                $result = getTotal($_POST['idAlbaran']);

                echo json_encode($result);

                break;
        case 'endCart':



                $result = endCart($_POST['idAlbaran']);

                echo json_encode($result);
                break;
}
