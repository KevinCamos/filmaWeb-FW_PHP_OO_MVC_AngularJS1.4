<?php
////////////////////////////////////////////////
//https://github.com/miguelangel-nubla/JWT-PHP//
////////////////////////////////////////////////
// require_once "JWT.php";

//iat: hora que se expide 
//exp=expiración del usuario 
function encodeToken($user) //60*10 == 10 minuts
{
    $header = '{"typ":"JWT", "alg":"HS256"}';
    $secret = SECRET;
    $payload = '{
            "iat":-' . time() . '-, 
            "exp":-' . time() + (60 * 90) . '-,
            "name":-' . $user . '-}';
    $JWT = new JWT;
    return  $JWT->encode($header, $payload, $secret);
}
function decodeToken($token)
{

    $JWT = new JWT;
    return $JWT->decode($token, SECRET);
}
