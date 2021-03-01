// function openMaps(id) {
//   sessionStorage.setItem("idmaps", id);
// $("#map").attr({ style: "height: 400px;width: 100%;" });

//   geolocation();
//   script_maps();
// }

// function script_maps() {
//   if (document.getElementById("map") != null) {
//     var script = document.createElement("script");
//     script.src =
//       "https://maps.googleapis.com/maps/api/js?key=" +
//       API_KEY +
//       "&callback=initMap";
//     script.async;
//     script.defer;
//     document.getElementsByTagName("script")[0].parentNode.appendChild(script);
//     // console.log(script);
//   }
// }
// function initMap() {
//   //Opciones de mapa
//   var options = {
//     zoom: 10,
//     center: {
//       lat: parseFloat(sessionStorage.getItem("latitude")),
//       lng: parseFloat(sessionStorage.getItem("longitude")),
//     },
//   };

//   // NEW MAP
//   map = new google.maps.Map(document.getElementById("map"), options);

//   //Add Marker
//   var marker = new google.maps.Marker({
//     position: {
//       lat: parseFloat(sessionStorage.getItem("latitude")),
//       lng: parseFloat(sessionStorage.getItem("longitude")),
//     },
//     map: map,
//     icon: "",
//     // 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
//   });
//   OpenCoords();

//   // const cityCircle = new google.maps.Circle({
//   //   strokeColor: "#FF0000",
//   //   strokeOpacity: 0.2,
//   //   strokeWeight: 2,
//   //   fillColor: "#FF0000",
//   //   fillOpacity: 0.35,
//   //   map,
//   //   center: {
//   //     lat: parseFloat(sessionStorage.getItem("latitude")),
//   //     lng: parseFloat(sessionStorage.getItem("longitude")),
//   //   },
//   //   radius: Math.sqrt(3000) * 100,
//   // });
// }

// function OpenCoords() {
//   let id = sessionStorage.getItem("idmaps");
//   var url =
//     "module/shop/controller/controllerShopPage.php?op=shopsGeolocation&product=" +
//     id;
//   // console.log(url);

//   ajaxPromise(url, "GET", "JSON")
//     .then(function (data) {
//       var pointMarker = new Array();

//       // console.log("Sí apleguen les coordenades");
//       // console.log(data);
//       pointMarker = setPoint(data);
//       return pointMarker;
//     })
//     .catch(function () {
//       console.log("No apleguen les coordenades");
//     });
// }
// function setPoint(coords) {
//   var pointMarker = new Array();

//   for (var i = 0; i < coords.length; i++) {
//     pointMarker[i] = new google.maps.Marker({
//       position: {
//         lat: parseFloat(coords[i]["latitude"]),
//         lng: parseFloat(coords[i]["longitude"]),
//       },
//       map: map,
//       icon:
//         "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
//     });
//   }
//   return pointMarker;
// }
