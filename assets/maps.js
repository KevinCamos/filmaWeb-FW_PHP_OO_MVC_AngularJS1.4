function openMaps() {
    geolocation()
  script_maps();

}

function script_maps() {
    if (document.getElementById("map") != null) {
        var script = document.createElement('script');
        script.src = "https://maps.googleapis.com/maps/api/js?key=" +
         API_KAY+ "&callback=initMap";
        script.async;
        script.defer;
        document.getElementsByTagName('script')[0].parentNode.appendChild(script);
        console.log(script);
      }
}
function initMap() {
  var options = {
    zoom: 13,
    center: {
      lat: parseFloat(sessionStorage.getItem("latitude")),
      lng: parseFloat(sessionStorage.getItem("longitude")),
    },
  };
  map = new google.maps.Map(document.getElementById("map"), options);

  const cityCircle = new google.maps.Circle({
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    map,
    center: {
      lat: parseFloat(sessionStorage.getItem("latitude")),
      lng: parseFloat(sessionStorage.getItem("longitude")),
    },
    radius: Math.sqrt(3000) * 100,
  });
}
