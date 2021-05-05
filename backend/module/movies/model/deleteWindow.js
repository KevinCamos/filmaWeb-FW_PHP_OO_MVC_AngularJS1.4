// $(document).ready(function () {

//     $(".movieDelete").click(function () {
//         var id = this.getAttribute('id');

//         $.ajax({
//             url: "module/movies/controller/controller_movies.php?op=read_modal&modal=" + id,
//             dataType: "JSON",
    

//         }).done(function (movie) {
//             var chair = "Seguro que desea eliminar la siguiente película? <br>";
//             for (var clave in movie) {
//                 if (movie.hasOwnProperty(clave)&& (clave==="reference" || clave === "movie"|| clave === "director"|| clave === "anyo")) {

//                     chair += "<b class=readWindow>" + clave + ": </b>" + movie[clave] + "<br>";//Guarda una cadena de cada clau i text, més un salt de línea
//                 }
//             }
//             $("#list_modal").html(chair);
//             $("#details_movie").show();
//             $("#movie_modal").dialog({
//                 width: 600, //<!-- ------------- ancho de la ventana -->
//                 height: 400, //<!--  ------------- altura de la ventana -->
//                 // show: 22, //<!-- ----------- animación de la ventana al aparecer -->
//                 hide: 22, //<!-- ----------- animación al cerrar la ventana -->
//                 resizable: "false", //<!-- ------ fija o redimensionable si ponemos este valor a "true" -->
//                 // position: "center",//<!--  ------ posicion de la ventana en la pantalla (left, top, right...) -->
//                 modal: "true", //<!-- ------------ si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
//                 // buttons: {
//                 //     "De Acuerdo": function () {
//                 //         $(this).dialog("close");
                        
//                 //     }
//                 buttons : {
//                     Cancel: function() {
//                         $(this).dialog("close");                            },
//                     Delete: function() {
//                                 $(this).dialog("close");
//                                 window.location.href = 'module/movies/controller/controller_movies.php?op=delete_modal&modal=' + id;

//                             }
                
//                 },
//                 show: {
//                     effect: "drop",
//                     duration: 1000
//                 },
//                 hide: {
//                     effect: "clip",
//                     duration: 1300
//                 }
//             });
//         })
//     });



// })
