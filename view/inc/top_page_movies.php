<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <!-- CACHE, COFIFICACIÓN Y FORMATO LINGÜISTICO-->
    <meta http-equiv="Content-Type" content="no-cache" content="text/html; charset=utf-8" />
    <title>Formulario Películas</title>

    <link href="view/css/style.css" rel="stylesheet" type="text/css" />

    <!-- LIBRERÍA JQUERY CLICK READ -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <!--VALIDACIÓN JAVASCRIPT-->
    <script type="text/javascript" src="module/movies/model/validaciones.js"></script>
    <script type="text/javascript" src="module/movies/model/modalWindow.js"></script>
    <!-- <script type="text/javascript" src="module/movies/model/readWindow.js"></script>
    <script type="text/javascript" src="module/movies/model/deleteWindow.js"></script> -->

    <!--TRANSLATE-->
    <!-- Bootstrap core JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/js/bootstrap.bundle.min.js"></script>

    <!-- Custom scripts for this template -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/startbootstrap-clean-blog/3.3.7/js/clean-blog.min.js"></script>
    <script type="text/javascript" src="view/inc/translate.js"></script>

    <!-- LIBRERÍA FECHA-->

    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script>
        $(function() {
            $("#anyo").datepicker({
                changeMonth: false,
                changeYear: true,
                showButtonPanel: true,
                yearRange: '1900:2025', // Optional Year Range
                dateFormat: 'yy',
                onClose: function(dateText, inst) {
                    var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                    $(this).datepicker('setDate', new Date(year, 0, 1));
                }
            });
        });
    </script>


    <!-- JQUERY  ACCORDION-->
<!-- <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script>
  $( function() {
    $( "#accordion" ).accordion();
  } );
  </script>     -->
</head>

<body>