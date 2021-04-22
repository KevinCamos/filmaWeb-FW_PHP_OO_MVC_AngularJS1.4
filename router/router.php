<?php


require 'autoload.php';
require 'assets/JWTKey.php';


if (PRODUCTION) { //estamos en producción
    ini_set('display_errors', '1');
    ini_set('error_reporting', E_ERROR | E_WARNING); //error_reporting(E_ALL) ;
} else {
    ini_set('display_errors', '0');
    ini_set('error_reporting', '0'); //error_reporting(0); 
}

ob_start();
session_start();
$_SESSION['module'] = "";



function handlerRouter()
{
    if (!empty($_GET['module'])) {
        $URI_module = $_GET['module'];
    } else {
        $URI_module = 'home';

        // echo'<script>window.location.href = "./home/list_home/";</script>';
    }

    if (!empty($_GET['function'])) {
        $URI_function = $_GET['function'];
    } else {
        $URI_function = 'list';
    }
    handlerModule($URI_module, $URI_function);
}

function handlerModule($URI_module, $URI_function)
{
    $modules = simplexml_load_file('resources/modules.xml');
    $exist = false;


    foreach ($modules->module as $module) {
        if (($URI_module === (string) $module->uri)) {
            $exist = true;
            $URI_module = (string) $module->name;
            $path = MODULES_PATH . $URI_module . "/controller/controller_" . $URI_module . ".class.php";

            if (file_exists($path)) {

                require_once($path);
                $controllerClass = "controller_" . $URI_module;
                $obj = new $controllerClass;
            } else {
                ifNoExistPage();
            }
            handlerfunction(((string) $module->name), $obj, $URI_function);
            break;
        }
    }
    if (!$exist) {
        ifNoExistPage();
    }
}

function handlerfunction($module, $obj, $URI_function)
{
    $functions = simplexml_load_file(MODULES_PATH . $module . "/resources/function.xml");

    $exist = false;

    foreach ($functions->function as $function) {
        if (($URI_function === (string) $function->uri)) {

            $exist = true;
            $event = (string) $function->name;
            break;
        } else {
        }
    }

    if (!$exist) {
        ifNoExistPage();
    } else {
        call_user_func(array($obj, $event));
    }
}
function ifNoExistPage()
{
    require_once(VIEW_PATH_INC . "top_page_home.php");
    require_once(VIEW_PATH_INC . "header.html");
    require_once(VIEW_PATH_INC . "menu.html");
    loadView(VIEW_PATH_HOME . 'home.html');

    require_once(VIEW_PATH_INC . "footer.html");
}
handlerRouter();
