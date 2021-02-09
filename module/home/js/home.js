$(document).ready(function () {
  carrousel_head()
  });
  

  function carrousel_head(){
    
//Código espagueti
$('#carousel-header').empty(); //Borrar lo de dins

// $('<div></div>').attr({'class':'ed' }).appendTo('#carousel-header');
$('<div></div>').attr({id:'myCarousel', 'class':'carousel slide', 'data-ride':'carousel', 'style':'width:70%; margin:auto;'}).appendTo('#carousel-header');
$('<ol></ol>').attr({class:'carousel-indicators'}).appendTo('#myCarousel');
$('<li></li>').attr({'data-target':'#myCarousel','data-slide-to':'0','class':'active' }).appendTo('.carousel-indicators');
$('<li></li>').attr({'data-target':'#myCarousel','data-slide-to':'0' }).appendTo('.carousel-indicators');
$('<li></li>').attr({'data-target':'#myCarousel','data-slide-to':'0' }).appendTo('.carousel-indicators');
$('<div></div>').attr({ 'class':'carousel-inner'}).appendTo('#myCarousel');

$('<div></div>').attr({ 'class':'item active', 'id':'item1'}).appendTo('.carousel-inner');
$('<img>').attr({'src':'view\\img\\carousel_home\\portada\\Mandalorian.jpg', 'alt':'Mandalorian', 'style':'width:100%;' }).appendTo('#item1');
$('<div></div>').attr({'class':'carousel-caption', 'id':'carousel-head1' }).appendTo('#item1');
$('<h3></h3>').attr({ }).append(document.createTextNode("The Mandalorian")).appendTo('#carousel-head1');
$('<p></p>').attr({ }).append(document.createTextNode("Todas las temporadas en Blu-Ray")).appendTo('#carousel-head1');

$('<div></div>').attr({ class:'item', 'id':'item2'}).appendTo('.carousel-inner');
$('<img>').attr({'src':'view\\img\\carousel_home\\portada\\Esdla.jpg', 'alt':'Mundo Tolkien', 'style':'width:100%;' }).appendTo('#item2');
$('<div></div>').attr({'class':'carousel-caption', 'id':'carousel-head2' }).appendTo('#item2');
$('<h3></h3>').attr({ }).append(document.createTextNode("El Señor de Los Anillos y El Hobbit")).appendTo('#carousel-head2');
$('<p></p>').attr({ }).append(document.createTextNode("Sumérgete en el mundo de Tolkien")).appendTo('#carousel-head2');

$('<div></div>').attr({ 'class':'item', 'id':'item3'}).appendTo('.carousel-inner');
$('<img>').attr({'src':'view\\img\\carousel_home\\portada\\Clint.jpg', 'alt':'Clint Eastwood in', 'style':'width:100%;' }).appendTo('#item3');
$('<div></div>').attr({'class':'carousel-caption', 'id':'carousel-head3' }).appendTo('#item3');
$('<h3></h3>').attr({ }).append(document.createTextNode("La Trilogía del Dolar")).appendTo('#carousel-head3');
$('<p></p>').attr({ }).append(document.createTextNode("Disfruta del western de Sergio Leone")).appendTo('#carousel-head3');

$('<a></a>').attr({ 'class':'left carousel-control','href':'#myCarousel', 'data-slide':'prev', 'id':'control1'}).appendTo('#myCarousel');
$('<span></span>').attr({'class':'glyphicon glyphicon-chevron-left'}).appendTo('#control1')
$('<span></span>').attr({'class':'sr-only'}).append(document.createTextNode('Anterior')).appendTo('#control1')

$('<a></a>').attr({ 'class':'right carousel-control','href':'#myCarousel', 'data-slide':'next', 'id':'control2'}).appendTo('#myCarousel');
$('<span></span>').attr({'class':'glyphicon glyphicon-chevron-right'}).appendTo('#control2')
$('<span></span>').attr({'class':'sr-only'}).append(document.createTextNode('Siguiente')).appendTo('#control2')


  }
// <div class="container">
// <div id="myCarousel" class="carousel slide" data-ride="carousel">
//     <!-- Indicators -->
//     <ol class="carousel-indicators">
//         <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
//         <li data-target="#myCarousel" data-slide-to="1"></li>
//         <li data-target="#myCarousel" data-slide-to="2"></li>
//     </ol>

//     <!-- Wrapper for slides -->
//     <div class="carousel-inner" >

//         <div class="item active">
//             <img src="view\img\carousel_home\portada\Mandalorian.jpg" alt="Mandalorian" style="width:100%;">
//             <div class="carousel-caption">
//                 <h3>The Mandalorian</h3>
//                 <p>Todas las temporadas en Blu-Ray</p>
//             </div>
//         </div>

//         <div class="item">
//             <img src="view\img\carousel_home\portada\Esdla.jpg" alt="Los Angeles" style="width:100%;">
//             <div class="carousel-caption">
//                 <h3>El Señor de Los Anillos y El Hobbit</h3>
//                 <p>Sumérgete en el mundo de Tolkien</p>
//             </div>
//         </div>

//         <div class="item">
//             <img src="view\img\carousel_home\portada\Clint.jpg" alt="Los Angeles" style="width:100%;">
//             <div class="carousel-caption">
//                 <h3>La Trilogía del Dolar</h3>
//                 <p>Disfruta del western de Sergio Leone</p>
//             </div>
//         </div>

//     </div>

//     <!-- Left and right controls -->
//     <a class="left carousel-control" href="#myCarousel" data-slide="prev">
//         <span class="glyphicon glyphicon-chevron-left"></span>
//         <span class="sr-only">Previous</span>
//     </a>
//     <a class="right carousel-control" href="#myCarousel" data-slide="next">
//         <span class="glyphicon glyphicon-chevron-right"></span>
//         <span class="sr-only">Next</span>
//     </a>
// </div>
// </div>
