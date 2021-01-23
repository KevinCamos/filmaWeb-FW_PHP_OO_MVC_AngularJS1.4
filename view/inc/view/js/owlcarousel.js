$(document).ready(function () {
    $("#owl-slider").owlCarousel({
      navigation: true, // Show next and prev buttons
      slideSpeed: 300,
      paginationSpeed: 400,
      singleItem: true,
      // Navigation
      navigationText: ["Anterior", "Siguiente"],
      rewindNav: true,
      scrollPerPage: true,
      //Pagination
      pagination: true,
      paginationNumbers: false,
    });
  });
  