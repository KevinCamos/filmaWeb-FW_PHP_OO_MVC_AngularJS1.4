<?php
//////

define('PROJECT', '/Kevin/Ejercicios_Kevin/Projecte/'); // Project Path
define('SITE_ROOT', $_SERVER['DOCUMENT_ROOT'] . PROJECT); // Site Root
define('SITE_PATH', 'http://' . $_SERVER['HTTP_HOST'] . PROJECT); // Site Path

define('VIEW_PATH', SITE_PATH . 'view/'); // Css Path
define('ASSETS_PATH', SITE_PATH . 'assets/'); // Css Path
define('ASSETS_PATH_PHP', SITE_ROOT . 'assets/'); // Css Path

define('CSS_PATH', VIEW_PATH . 'css/'); // Css Path
define('JS_PATH', VIEW_PATH . 'js/'); // JS Path
define('IMG_PATH', VIEW_PATH . 'img/'); // IMG Path
define('PRODUCTION', true);
define('MODEL_PATH', SITE_ROOT . 'model/'); // Model Path
define('MODULES_PATH', SITE_ROOT . 'module/'); // Modules Path
define('VIEW_PATH_INC', SITE_ROOT . 'view/inc/'); // View Path Inc
define('VIEW_INC', VIEW_PATH . 'inc/'); // View Path Inc
define('VIEW_PLUGINS', VIEW_PATH . 'plugins/'); // View Path Inc

define('RESOURCES', SITE_ROOT . 'resources/'); // Resources Path
define('UTILS', SITE_ROOT . 'utils/'); // Utils Path
//////
// Contact
define('VIEW_PATH_CONTACT', SITE_ROOT . 'module/contact/view/');
define('MODEL_PATH_CONTACT', SITE_PATH . 'module/contact/model/');
// define('UTILS_CONTACT', SITE_ROOT . 'module/contact/utils/');
// define('DAO_CONTACT', SITE_ROOT . 'module/contact/model/DAO/');
// define('BLL_CONTACT', SITE_ROOT . 'module/contact/model/BLL/');
define('MODEL_CONTACT', SITE_ROOT . 'module/contact/model/model/');
define('JS_VIEW_CONTACT', SITE_PATH . 'module/contact/view/js/');

//Home
define('VIEW_PATH_HOME', SITE_ROOT . 'module/home/view/');
define('MODEL_PATH_HOME', SITE_PATH . 'module/home/model/');
define('UTILS_HOME', SITE_ROOT . 'module/home/utils/');
define('DAO_HOME', SITE_ROOT . 'module/home/model/DAO/');
define('BLL_HOME', SITE_ROOT . 'module/home/model/BLL/');
define('MODEL_HOME', SITE_ROOT . 'module/home/model/model/');
define('JS_VIEW_HOME', SITE_PATH . 'module/home/view/js/');
define('JS_HOME', SITE_PATH . 'module/home/js/');


//Shop
define('VIEW_PATH_SHOP', SITE_ROOT . 'module/shop/view/');
define('MODEL_SHOP_JS', SITE_PATH . 'module/shop/model/');
define('MODEL_SHOP', SITE_ROOT . 'module/shop/model/model/');

define('MODEL_PATH_SHOP', SITE_ROOT . 'module/shop/model/model/');

//Search
define('MODEL_SEARCH', SITE_PATH . 'module/search/model/');
define ('MODEL_SEARCH_PHP', SITE_ROOT . 'module/search/model/model/');

// define ('MODEL_PATH_SEARCH', SITE_ROOT . '/model/');

//Login
define('VIEW_PATH_LOGIN', SITE_ROOT . 'module/login/view/');
define('MODEL_LOGIN_JS', SITE_PATH . 'module/login/model/');
define('MODEL_LOGIN', SITE_ROOT  . 'module/login/model/model/');
define('CSS_LOGIN', SITE_PATH . 'module/login/css/');

//Cart
define('VIEW_PATH_CART', SITE_ROOT . 'module/cart/view/');
define('MODEL_CART_JS', SITE_PATH . 'module/cart/model/');
define('MODEL_CART', SITE_ROOT  . 'module/cart/model/model/');
define('CSS_CART', SITE_PATH . 'module/cart/css/');


//Profile
define('VIEW_PATH_PROFILE', SITE_ROOT . 'module/profile/view/');
define('MODEL_PATH_PROFILE', SITE_ROOT . '/module/profile/model/model/');


//VIEW_INC JS
define('VIEW_JS', VIEW_PATH_INC . 'js/'); // View Path Inc



// Friendly
define('URL_FRIENDLY', TRUE);
