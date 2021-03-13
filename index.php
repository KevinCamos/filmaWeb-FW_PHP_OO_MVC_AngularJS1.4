<?php

if ((isset($_GET['page'])) && ($_GET['page'] === "movies")) {
    include("view/inc/top_page_movies.html");
} else if ((isset($_GET['page'])) && (($_GET['page'] === "shop") || ($_GET['page'] === "controllerShopPage"))) {


    include("view/inc/top_page_shop.html");
} else if (!(isset($_GET['page'])) || ($_GET['page'] === "home")) {

    include("view/inc/top_page_home.html");
} else if (!(isset($_GET['page'])) || ($_GET['page'] === "login")) {

    include("view/inc/top_page_login.html");
} else {
    include("view/inc/top_page.html");
}
session_start();
?>


<div id="wrapper">
</div>
<!-- header -->
<div id="header">
    <?php include("view/inc/header.html"); ?>
</div>
<!-- MENU -->
<div id="menu">
    <?php include("view/inc/menu.html"); ?>
</div>
<div id="contenido">
    <?php

    include("view/inc/pages.php"); ?>
    <br />
</div>
<div id="footer">
    <?php include("view/inc/footer.html"); ?>
</div>
<div id="bottom_page">
    <?php include("view/inc/bottom_page.html"); ?>
</div>
</div>