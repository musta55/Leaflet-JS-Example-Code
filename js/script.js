//let map = L.map('mymap').setView([19.5937, 78.9629], 5);
let ourData = [];

const myAPIKey = "fb78e7f91cd847519128e3b58e348171";


// const myAPIKey = process.env["key"];
let map = L.map('mymap', {
    center: [39.8282, -98.5795],
    zoom: 2
});

const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const markerIcon = L.icon({
    iconUrl: `https://api.geoapify.com/v1/icon?size=xx-large&type=awesome&color=%233e9cfe&icon=paw&apiKey=${myAPIKey}`,
    iconSize: [31, 46], // size of the icon
    iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
});


const markerIconProd = L.icon({
    iconUrl: ` https://api.geoapify.com/v1/icon/?type=material&color=%238b6607&icon=industry&iconType=awesome&scaleFactor=2&apiKey=${myAPIKey}`,
    iconSize: [31, 46], // size of the icon
    iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
});

const markerIconSup = L.icon({
    iconUrl: ` https://api.geoapify.com/v1/icon/?type=material&color=red&icon=landmark&iconType=awesome&scaleFactor=2&apiKey=${myAPIKey}`,
    iconSize: [31, 46], // size of the icon
    iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
});



let iconOption = {
    iconUrl: './assets/location-marker.svg',
    iconSize: [30, 30]
};
let ourCustomIcon = L.icon(iconOption);


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


fetch("./assets/location-data.json")
    .then(response => response.json())
    .then(data => {
        ourData = data;
        for (let i = 0; i < data.length - 1; i++) {
            let option = document.createElement("option");
            option.value = i + 1;
            option.text = data[i].title;
            document.querySelector(".select-dropdown").appendChild(option);

            let marker = L.marker([data[i].latitude, data[i].longitude], { icon: ourCustomIcon }).bindPopup(`<h3> ${data[i].title} </h3> <p> ${data[i].description} </p>`).on('click', () => {
                //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
            }).addTo(map);

            let markerSup = L.marker([data[i].latitude + getRandomInt(50), data[i].longitude +  getRandomInt(50)], { icon: markerIconSup }).bindPopup(`<h3> ${data[i].title} </h3> <p> ${data[i].description} </p>`).on('click', () => {
                //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
            }).addTo(map);

            let markerProd = L.marker([data[i].latitude +  getRandomInt(50) , data[i].longitude +  getRandomInt(50)], { icon: markerIconProd }).bindPopup(`<h3> ${data[i].title} </h3> <p> ${data[i].description} </p>`).on('click', () => {
                //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
            }).addTo(map);

            let markerMan = L.marker([data[i].latitude +  getRandomInt(50) , data[i].longitude  +  getRandomInt(50)] , { icon: markerIcon }).bindPopup(`<h3> ${data[i].title} </h3> <p> ${data[i].description} </p>`).on('click', () => {
                //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
            }).addTo(map);

            var mylatlngs = [
                [data[i].latitude, data[i].longitude],
                [data[i + 1].latitude, data[i + 1].longitude]
            ];

         const layer =    L.Polyline.Arc([data[i].latitude, data[i].longitude],
                [data[i + 1].latitude, data[i + 1].longitude], {
                color: 'black',
                vertices: 200
            }).addTo(map);

        

            layer.setText('  ►  ', {repeat: false,center: true,
                offset: 8,
                attributes: {'font-weight': 'bold',
                             'font-size': '24'}});

        }
    })
    .catch(error => alert(error))

document.querySelector(".map-zoom-out-btn").addEventListener('click', () => {
    map.flyTo([19.5937, 78.9629], 5);
});

document.querySelector(".search-btn").addEventListener('click', () => {
    let select = document.querySelector(".select-dropdown");
    let value = select.options[select.selectedIndex].value;
    map.flyTo([ourData[value - 1].latitude, ourData[value - 1].longitude], 10);
});



