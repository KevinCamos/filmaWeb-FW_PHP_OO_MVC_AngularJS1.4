
<?php 

if ((isset($_GET['page'])) && ($_GET['page']==="movies")){
include("view/inc/top_page_movies.php");
}else{
    include("view/inc/top_page.php");
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
        <br style="clear:both;" />
    </div>
    <div id="footer">
        <?php include("view/inc/footer.php"); ?>
    </div>
    <div id="bottom_page">
        <?php include("view/inc/bottom_page.php"); ?>
    </div>
</div>