// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

// Create the map object with a center and zoom level alternative
// This method is useful when we need to add multiple tile layers, 
// or a background image of our map
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map);
// let circle = L.circle([34.0522, -118.2437],{
//     radius: 500,
//     color: "black",
//     fillColor: "lightyellow",
//     fillOpacity: 0.5,
//     weight: 1.5
// }).addTo(map);

let circleMarker = L.circleMarker([34.0522, -118.2437],{
    radius: 300,
    color: "black",
    fillColor: '#ffffa1',
}).addTo(map);


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

var darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    accessToken: API_KEY
  });

// Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streets,
    "Dark Map": darkmap
  };

// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);
darkmap.addTo(map);


