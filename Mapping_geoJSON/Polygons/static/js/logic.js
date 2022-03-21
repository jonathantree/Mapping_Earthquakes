// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    accessToken: API_KEY
  });

let satmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/satellite-streets-v11',
  accessToken: API_KEY
});

let lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/light-v10',
  accessToken: API_KEY
});

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/jonathantree/Mapping_Earthquakes/main/Mapping_geoJSON/Polygons/static/js/torontoNeighborhoods.json"

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2,
  color: "black",
  fillColor: "red",
  opacity: 0.5

}

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data){
  console.log(data)
  L.geoJSON(data, {
    style: myStyle,
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3> Area Code: " + feature.properties.AREA_S_CD + "</h3> <hr><h3> Name: " + feature.properties.AREA_NAME + "</h3>")
    }
  }).addTo(map);
});


// Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streets,
    "Light Map" : lightmap,
    "Dark Map": darkmap,
    "Satellite" : satmap,
    
  };

// Create the map object with center and zoom level.
let map = L.map('mapid',{
  center: [43.7, -79.3], 
  zoom: 10,
  layers: [satmap]
});

// Add basemaps to maps
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);