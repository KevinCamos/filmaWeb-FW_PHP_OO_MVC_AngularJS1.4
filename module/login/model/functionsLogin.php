<?php


function validateLogin($nameUser)
{


    try {
        $daologin = new DAOLogin();
        $resultado = $daologin->queryLogin($nameUser); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!
    } catch (Exception $e) {
        die('<script>window.location.href=index.php?page=503;</script>');
    }
    count($resultado) === 0 ? $resultado = false : $resultado = $resultado;
    return $resultado;
}




function validateRegister($formulario)
{

    $nameUser =  strtolower($formulario[0]['value']);
    $email = strtolower($formulario[3]['value']);

    try {
        $daologin = new DAOLogin();
        $resultado = $daologin->queryValidateRegister($nameUser, $email); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!
    } catch (Exception $e) {
        die('<script>window.location.href=index.php?page=503;</script>');
    }
    count($resultado) === 0 ? $resultado = true : $resultado = false;
    return $resultado;
}

function getNameUserFromToken($token)
{

    $token =  explode('-', $token); //array 3 final sesion. //array 5 "NameUser"
    $tokenArray = array("user" => $token[5], "endsesion" => $token[3]);
    if (time() < $tokenArray["endsesion"]) {
        try {
            $daologin = new DAOLogin();
            $daologin  = $daologin->login_user_token($tokenArray["user"]); // La flecheta sería com el punt de java, per a obrir funcions d'eixe objecte!!!
        } catch (Exception $e) {
            return false;
        }
        list($daologin) = $daologin;

        return  $daologin;
    }
    return false;
}
