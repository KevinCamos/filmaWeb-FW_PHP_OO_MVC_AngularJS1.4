<?php
////////////////////////////////////////////////
//https://github.com/miguelangel-nubla/JWT-PHP//
////////////////////////////////////////////////
// require_once "JWT.php";

//iat: hora que se expide 
//exp=expiración del usuario 
function encodeToken($user)
{
    $header = '{"typ":"JWT", "alg":"HS256"}';
    $secret = SECRET;
    $payload = '{
            "iat":-' . time() . '-, 
            "exp":-' . time() + (60 * 60) . '-,
            "name":-' . $user . '-}';
    $JWT = new JWT;
    return  $JWT->encode($header, $payload, $secret);
}
function decodeToken($token)
{

    $JWT = new JWT;
return $JWT->decode($token,SECRET);
}

// $header = '{"typ":"JWT", "alg":"HS256"}';
// $secret = 'maytheforcebewithyou';

// /////////////////////////// yomogan ////////////////////////////////////////
// //iat: Tiempo que inició el token
// //exp: Tiempo que expirará el token (+1 hora)
// //name: info user
// $payload = '{
//         "iat":time(), 
//         "exp":time() + (60*60),
//         "name":"yomogan"
//     }';

// $JWT = new JWT;
// $token = $JWT->encode($header, $payload, $secret);
// $json = $JWT->decode($token, $secret);
// echo 'JWT encode yomogan: ' . $token . "\n\n";
// echo '<br>';
// echo 'JWT decode yomogan: ' . $json . "\n\n";
// echo '<br>';
// echo '<br>';

// ////////////////////////////// yomogana /////////////////////////////////////
// $payload = '{
//         "iat":time(),
//         "exp":time() + (60*60),
//         "name":"yomogana"
//     }';

// $JWT = new JWT;
// $token = $JWT->encode($header, $payload, $secret);
// $json = $JWT->decode($token, $secret);
// echo 'JWT encode yomogana: ' . $token . "\n\n";
// echo '<br>';
// echo 'JWT decode yomogana: ' . $json . "\n\n";
