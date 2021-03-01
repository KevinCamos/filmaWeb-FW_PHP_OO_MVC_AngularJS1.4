

// function geolocation(){
// if (navigator.geolocation) {

//     // console.log("Tu navegador permite la geolocalización ");
    
//     } else {
//     console.log("Tu navegador NO permite la geolocalización ");
//     }
    
//     function localizacion(posicion) {
//         sessionStorage.setItem("latitude", posicion.coords.latitude);
//         sessionStorage.setItem("longitude",posicion.coords.longitude);
//     // console.log(typeof(sessionStorage.getItem("latitude"))  +" "+ typeof(sessionStorage.getItem("longitude")))
//     }
    
//     function error() {
//     alert("No se pudo obtener tu geolocalización ");
//     }
//     navigator.geolocation.getCurrentPosition(localizacion, error);
//     }