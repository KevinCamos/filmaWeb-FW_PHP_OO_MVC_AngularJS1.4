$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    items:3,
    loop:true,
    center:true,
    margin:0, //Separación entre imágenes
    URLhashListener:true,
    autoplayHoverPause:true,
    startPosition: 'URLHash'
  });});