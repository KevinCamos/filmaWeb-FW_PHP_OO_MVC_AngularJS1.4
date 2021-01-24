$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 5,
    loop: true,
    center: true,
    nav: true,
    margin: 0, //Separación entre imágenes
    URLhashListener: true,
    startPosition: "URLHash",

    responsive: {
      0: {
        items: 1,
      },
      350: {
        items: 2,
      },
      1000: {
        items: 3,
      },
      1200: {
        items: 4,
      },
      1400: {
        items: 5,
      },
      3000: {
        items: 6,
      },
      3200: {
        items: 7,
      },
      3400: {
        items: 10,
      },
    },
  });
});
$(document).ready(function () {
  prueba();
});

function prueba() {
  $(".prueba").click(function () {
    var id = this.getAttribute("id");
    // console.log(id); //Debugeo para comprobar que entra a la función

    $.ajax({
      url:
        "module/movies/controller/controller_movies.php?op=read_modal&modal=" +
        id,
      dataType: "JSON",
      //  type : tipo de la petición, GET o POST (GET por defecto).
      //  url : dirección a la que se envía la petición.
      //  data : datos a enviar al servidor.
      //  dataType : tipo de datos que esperas obtener del servidor (si no se especifica, jQuery intenta averiguar de qué tipo se trata).
      //  success : función que se ejecuta cuando se obtiene una respuesta con éxito.
      //  error : función que se llama si la petición no tiene éxito.
    }).done(function (movie) {
      // console.log(movie.movie);
      var chair = "";
      for (var clave in movie) {
        if (movie.hasOwnProperty(clave)) {
          chair +=
            "<b class=readWindow>" + clave + ": </b>" + movie[clave] + "<br>"; //Guarda una cadena de cada clau i text, més un salt de línea
        }
      }

      $("#list_modal").html(chair);
      $("#list_modal").show();
      $("#list_modal").dialog({
        width: 600, //<!-- ------------- ancho de la ventana -->
        height: 400, //<!--  ------------- altura de la ventana -->
        // show: 22, //<!-- ----------- animación de la ventana al aparecer -->
        hide: 22, //<!-- ----------- animación al cerrar la ventana -->
        resizable: "false", //<!-- ------ fija o redimensionable si ponemos este valor a "true" -->
        // position: "center",//<!--  ------ posicion de la ventana en la pantalla (left, top, right...) -->
        modal: "true", //<!-- ------------ si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
        buttons: {
          "De Acuerdo": function () {
            $(this).dialog("close");
          },
        },
        show: {
          effect: "drop",
          duration: 1000,
        },
        hide: {
          effect: "puff",
          duration: 1300,
        },
      });
    });
  });
}
