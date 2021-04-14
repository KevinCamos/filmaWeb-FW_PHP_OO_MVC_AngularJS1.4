<?php
//load all inc.php
require_once("paths.php");
include(UTILS . "utils.inc.php");
include(UTILS . "common.inc.php");
include(UTILS . "upload.inc.php");
include(UTILS . "mail.inc.php");

//load all class.singleton.php    //esta no está comentada per mi 


// spl_autoload_register(null, false);


// spl_autoload_register(null, false);
spl_autoload_extensions('.php,.inc.php,.class.php,.class.singleton.php');

spl_autoload_register('loadClasses');
function loadClasses($className)
{
    //Get module name 
    $porciones = explode("_", $className);
    $module_name = $porciones[0];
    $model_name = "";

    //we need have this because if not exist $porciones[1], app will have problems when we sent error (showErrorPage(2..)).
    if (isset($porciones[1])) {
        $model_name = $porciones[1];
        $model_name = strtoupper($model_name);
    }
    if (file_exists('module/' . $module_name . '/model/' . $model_name . '/' . $className . '.class.singleton.php')) {
        set_include_path('module/' . $module_name . '/model/' . $model_name . '/');
        spl_autoload($className);
    } elseif (file_exists('model/' . $className . '.class.singleton.php')) {
        set_include_path('model/');
        spl_autoload($className);
    }
}
