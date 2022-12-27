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
    iconUrl: ` https://api.geoapify.com/v1/icon/?type=material&color=%232b4607&icon=landmark&iconType=awesome&scaleFactor=2&apiKey=${myAPIKey}`,
    iconSize: [31, 46], // size of the icon
    iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
});



let iconOption = {
    iconUrl: './assets/location-marker.svg',
    iconSize: [40, 40]
};

let chemicalOption = {
    iconUrl: './assets/chemical.svg',
    iconSize: [60, 60]
};

let ourCustomIcon = L.icon(iconOption);
let chemicalIcon = L.icon(chemicalOption);


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

            var tennaryPosition = [data[i].latitude + getRandomInt(30), data[i].longitude + getRandomInt(30)];
            var chemicalFactoryPosition = [data[i].latitude + getRandomInt(20), data[i].longitude + getRandomInt(20)];
            var productionFactoryPosition = [data[i].latitude + getRandomInt(20), data[i].longitude + getRandomInt(30)];
           
           if(i==0) var supplierFactoryPosition = [data[i].latitude, data[i].longitude];



            // let marker = L.marker([data[i].latitude, data[i].longitude], { icon: ourCustomIcon }).bindPopup(`<h3> ${data[i].title} </h3> <p> ${data[i].description} </p>`).on('click', () => {
            //     //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
            // }).addTo(map);

            let marker = L.marker([tennaryPosition[0], tennaryPosition[1]], { icon: ourCustomIcon }).bindPopup(`<h3> ${data[i].title} </h3> <p> ${data[i].description} </p>`).on('click', () => {
                //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
            }).addTo(map);

            if(i%2)
            {
                let markerSup = L.marker([chemicalFactoryPosition[0], chemicalFactoryPosition[1]], { icon: markerIconSup }).bindPopup(`<h3> ${data[i].title} </h3> <p> ${data[i].description} </p>`).on('click', () => {
                    //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
                }).addTo(map);
    
                let markerProd = L.marker([productionFactoryPosition[0], productionFactoryPosition[1]], { icon: markerIconProd }).bindPopup(`<h3> ${data[i].title} </h3> <p> ${data[i].description} </p>`).on('click', () => {
                    //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
                }).addTo(map);
    
    
                let markerChem = L.marker([supplierFactoryPosition[0], supplierFactoryPosition[1]], { icon: chemicalIcon }).bindPopup(`<h3> ${data[i].title} </h3> <p> ${data[i].description} </p>`).on('click', () => {
                    //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
                }).addTo(map);
    
                // var mylatlngs = [
                //     [data[i].latitude, data[i].longitude],
                //     [data[i + 1].latitude, data[i + 1].longitude]
                // ];
    
    
                const arcLineChemSup = L.Polyline.Arc([chemicalFactoryPosition[0], chemicalFactoryPosition[1]],
                    [supplierFactoryPosition[0], supplierFactoryPosition[1]], {
                    color: 'green',
                    vertices: 200
                }).addTo(map).setText('  ►  ', {
                    repeat: false, center: true,
                    offset: 6,
                    attributes: {
                        'font-weight': 'bold',
                        'font-size': '18','fill': 'green'
                    }
                });
    
                const arcLineTenSup = L.Polyline.Arc([tennaryPosition[0], tennaryPosition[1]],
                    [supplierFactoryPosition[0], supplierFactoryPosition[1]], {
                    color: 'green',
                    vertices: 200
                }).addTo(map).setText('  ►  ', {
                    repeat: false, center: true,
                    offset: 6,
                    attributes: {
                        'font-weight': 'bold',
                        'font-size': '18','fill': 'green'
                    }
                });
    
    
                const arcLineSupProd = L.Polyline.Arc([supplierFactoryPosition[0], supplierFactoryPosition[1]],
                    [productionFactoryPosition[0], productionFactoryPosition[1]], {
                    color: 'violet',
                    vertices: 200
                }).addTo(map).setText('  ►  ', {
                    repeat: false, center: true,
                    offset: 6,
                    attributes: {
                        'font-weight': 'bold',
                        'font-size': '18','fill': 'violet'
                    }
                });
            }

            
        }
    })
    .catch(error => alert(error))

document.querySelector(".map-zoom-out-btn").addEventListener('click', () => {
    map.flyTo([19.5937, 78.9629], 5);
});

document.querySelector(".search-btn").addEventListener('click', () => {
    let select = document.querySelector(".select-dropdown");
    let value = select.options[select.selectedIndex].value;
    map.flyTo([ourData[value - 1].latitude, ourData[value - 1].longitude], 5);
});



