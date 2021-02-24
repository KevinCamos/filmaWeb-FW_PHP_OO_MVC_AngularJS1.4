function APIspam() {
  $("#apispam").empty();
  $("<h2>").attr({style:"text-align: center;  margin-top: 40px;  "}).text("¡Hola cinemaniaco! Creo que las siguientes películas te pueden interesar").appendTo("#apispam");

//   $("#apispam").addClass("owl-carousel");
  for (i = 0; i < 4; i++) {
    var number =  Math.round(Math.random() * 100);
    console.log(number)
    ajaxPromise(
      "http://www.omdbapi.com/?t=" + number + "&apikey=" + API_MOVIES_KEY,
      "GET",
      "JSON"
    )
      .then(function (data) {
        console.log(data);

        console.log(data.Title);
       var hrefWeb= $("<a>").attr({ href: data.Website, id:"websiteAPI"}).appendTo("#apispam");

        $("<img>").attr({ src: data.Poster, id:"apiPublicidad"}).appendTo(hrefWeb);

        // $.each(data, function (index, list) {});
      })
      .catch(function (data) {
        console.log("error API_SPAM");
      });
  }
//   $("#apispam").owlCarousel({
//     // items: category.length, //Puc canviar-la de lloc, però ¡¡ULL!! Hi hauria que deixar de gastar category.lenght
//     loop: true,
//     center: true,
//     nav: true,
//     margin: 0, //Separación entre imágenes
//     // URLhashListener: true
//     items: 3,
//   });
}
