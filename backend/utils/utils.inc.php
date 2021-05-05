<?php
function friendlyURL($url)
{
    $link = "";
    if (URL_FRIENDLY) {
        $url = explode("&", str_replace("?", "", $url));
        foreach ($url as $key => $value) {
            $aux = explode("=", $value);
            $link .=  $aux[1] . "/";
        }
    } else {
        $link = "index.php?" . $url;
    } // end_else
    return SITE_PATH . $link;
}


function friendlyModFunc($module, $function, $token)
{
    $url =  "?module=$module&function=$function&token=$token";

    return friendlyURL($url);
}
function generate_Token_secure($longitud)
{
    if ($longitud < 4) {
        $longitud = 4;
    }
    return bin2hex(openssl_random_pseudo_bytes(($longitud - ($longitud % 2)) / 2));
}
