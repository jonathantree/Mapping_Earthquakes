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

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/jonathantree/Mapping_Earthquakes/main/Mapping_geoJSON/static/js/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    // We turn each feature into a marker on the map.
    pointToLayer: function(feature, latlng) {
      console.log(feature, latlng);
      return L.circleMarker(latlng).bindPopup("<h2>Airport Code: " + feature.properties.faa + "</h2> <p>Airport Name: " + feature.properties.name + "</p>");
    }
  }).addTo(map);
});
// Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streets,
    "Dark Map": darkmap,
    "Satellite" : satmap
  };

// Create the map object with center and zoom level.
let map = L.map('mapid',{
  center: [30, 30], 
  zoom: 2,
  layers: [streets, darkmap, satmap]
});

// Add basemaps to maps
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);