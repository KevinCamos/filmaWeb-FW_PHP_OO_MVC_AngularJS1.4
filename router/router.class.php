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



class router
{
    private $URI_module;
    private $URI_function;
    private $module;
    private $obj;
    static $_instance;

    //////
    public static function getInstance()
    {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        } // end_if
        return self::$_instance;
    } // end_getInstance

    function __construct()
    {
        $this->uriModule = ($_GET['module']) ? $_GET['module'] : 'home';
        $this->uriFunction = ($_GET['function']) ? $_GET['function'] : 'list';
    } // end_construct

    function handlerRouter()
    {
        
        // if (!empty($_GET['module'])) {
        //     $URI_module = $_GET['module'];
        // } else {
        //     $URI_module = 'home';

            // echo'<script>window.location.href = "./home/list_home/";</script>';
        // }

        // if (!empty($_GET['function'])) {
        //     $URI_function = $_GET['function'];
        // } else {
        //     $URI_function = 'list';
        // }
        $this->handlerModule();
    }

    function handlerModule()
    {
        $modules = simplexml_load_file('resources/modules.xml');
        $exist = false;


        foreach ($modules->module as $module) {
            if (( $this->URI_module === (string) $module->uri)) {
                $exist = true;
                $this->URI_module = (string) $module->name;
                $path = MODULES_PATH . $this->URI_module . "/controller/controller_" .$this->URI_module . ".class.php";

                if (file_exists($path)) {

                    require_once($path);
                    $controllerClass = "controller_" .$this->URI_module;
                    $this->obj = new $controllerClass;
                } else {
                    ifNoExistPage();
                }
                $this->module = (string) $module->name;
                $this->handlerfunction();
                break;
            }
        }
        if (!$exist) {
            ifNoExistPage();
        }
    }

    function handlerfunction()
    {
        $functions = simplexml_load_file(MODULES_PATH .  $this->module . "/resources/function.xml");

        $exist = false;

        foreach ($functions->function as $function) {
            if (( $this->URI_function === (string) $function->uri)) {

                $exist = true;
                $event = (string) $function->name;
                break;
            } else {
            }
        }

        if (!$exist) {
            ifNoExistPage();
        } else {
            call_user_func(array( $this->obj, $event));
        }
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

// handlerRouter();

router::getInstance()->handlerRouter();
