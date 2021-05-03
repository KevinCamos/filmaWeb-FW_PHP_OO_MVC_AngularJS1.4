function APIspam() {
  $("#apispam").empty();
  $("<h2>")
    .attr({ style: "text-align: center;  margin-top: 40px;  " })
    .text(
      "¡Hola cinemaniaco! Creo que las siguientes películas te pueden interesar"
    )
    .appendTo("#apispam");

  for (i = 0; i < 4; i++) {
    var number = Math.round(Math.random() * 100);
    console.log(number);
    ajaxPromise(
      "http://www.omdbapi.com/?t=" + number + "&apikey=" + API_MOVIES_KEY,
      "GET",
      "JSON"
    )
      .then(function (data) {
        // console.log(data);
        if (data.Poster != "N/A") {
          console.log(data.Title);
          var hrefWeb = $("<a>")
            .attr({ href: data.Website, id: "websiteAPI" })
            .appendTo("#apispam");

          $("<img>")
            .attr({ src: data.Poster, id: "apiPublicidad" })
            .appendTo(hrefWeb);
        }
      })
      .catch(function () {
        console.log("error API_SPAM");
      });
  }

}