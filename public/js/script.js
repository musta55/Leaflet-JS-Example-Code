//let map = L.map('mymap').setView([19.5937, 78.9629], 5);
let ourData = [];

const myAPIKey = "fb78e7f91cd847519128e3b58e348171";


// const myAPIKey = process.env["key"];
let map = L.map('mymap', {
    center: [39.8282, 58.5795],
    zoom: 1,
    boxZoom: true,
    trackResize: true
});

const tiles = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
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

const markerIconCattle = L.icon({
    iconUrl: `https://api.geoapify.com/v1/icon/?type=material&color=%23b33aba&icon=tree&iconType=awesome&apiKey=${myAPIKey}`,
    iconSize: [31, 46], // size of the icon
    iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
});

let iconOption = {
    iconUrl: '/assets/location-marker.svg',
    iconSize: [40, 40]
};

let chemicalOption = {
    iconUrl: '/assets/chemical.svg',
    iconSize: [60, 60]
};




let ourCustomIcon = L.icon(iconOption);
let chemicalIcon = L.icon(chemicalOption);


function getRandomInt(max) {
    return max * 1.5;
    //    return Math.floor(Math.random() * max);
}


fetch("/assets/location-data.json")
    .then(response => response.json())
    .then(data => {
        ourData = data;
        for (let i = 0; i < data.length - 1; i++) {
            let option = document.createElement("option");
            option.value = i + 1;
            option.text = data[i].title;
            document.querySelector(".select-dropdown").appendChild(option);

            var TanneryPosition = [data[i].latitude, data[i].longitude];
            var chemicalFactoryPosition = [data[i].latitude, data[i].longitude];
            var productionFactoryPosition = [data[i].latitude, data[i].longitude];
            var cattleHouseProduction = [data[i].latitude, data[i].longitude];
            if (i == 0) var supplierFactoryPosition = [data[i].latitude, data[i].longitude];

            // let marker = L.marker([data[i].latitude, data[i].longitude], { icon: ourCustomIcon }).bindPopup(`<h3> ${data[i].title} </h3> <p> ${data[i].description} </p>`).on('click', () => {
            //     //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
            // }).addTo(map);
            if (i > 3 && i < 7) {
                let markerTan = L.marker([TanneryPosition[0], TanneryPosition[1]], { icon: ourCustomIcon }).bindPopup(`<h3> ${data[i].title} </h3> <img src=${"https://media.istockphoto.com/id/177292389/photo/ostrich-leather-tannery.jpg?s=612x612&w=0&k=20&c=O8sCRtnL2fvTd7eQHC0K1w66rLj8HZHvxn5BQTLNtHI="} width="100%" height = "5%"></img> <p> ${data[i].description} </p>`).on('click', () => {
                    //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
                }).addTo(map);
            }


            if (i == 3) {
                let markerChem = L.marker([chemicalFactoryPosition[0], chemicalFactoryPosition[1]], { icon: chemicalIcon }).bindPopup(`<h3> ${data[i].title} </h3> <img src=${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiOtG4TFSY2KqcXTtRNZdAWozreQehbpbq2isswPQyli0Ye8q4HPXs-3R7SKHEyhYHF3U&usqp=CAU"} width="100%" height = "5%"></img><p> ${data[i].description} </p>`).on('click', () => {
                    //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
                }).addTo(map);
            }

            if (i >= 7 && i < 10) {
                let markerProd = L.marker([productionFactoryPosition[0], productionFactoryPosition[1]], { icon: markerIconProd }).bindPopup(`<h3> ${data[i].title} </h3><img src=${"https://www.lightcastlebd.com/wp-content/uploads/2019/05/bangladesh-leather-industry.jpg"} width="100%" height = "5%"></img> <p> ${data[i].description} </p>`).on('click', () => {
                    //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
                }).addTo(map);
            }

            let markerSup = L.marker([supplierFactoryPosition[0], supplierFactoryPosition[1]], { icon: markerIconSup }).bindPopup(`<h3> ${data[i].title} </h3> <img src=${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9eV6AsUfuLwUYTzp84XMhK6nKTgGeUkLO4w&usqp=CAU"} width="100%" height = "5%"></img><p> ${data[i].description} </p>`).on('click', () => {
                //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
            }).addTo(map);
            if (i == 1 || i == 2) {
                let markerCattle = L.marker([cattleHouseProduction[0], cattleHouseProduction[1]], { icon: markerIconCattle }).bindPopup(`<h3> ${data[i].title} </h3> <img src=${"https://media.gettyimages.com/id/944687452/photo/dairy-farm-cows-indoor-in-the-shed.jpg?s=612x612&w=gi&k=20&c=80P3HXhettkQ8pU0nNBC_vsPov_76x4gdAJYNZR1w-E="} width="100%" height = "5%"></img><p> ${data[i].description} </p>`).on('click', () => {
                    //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
                }).addTo(map);
            }


            // var mylatlngs = [
            //     [data[i].latitude, data[i].longitude],
            //     [data[i + 1].latitude, data[i + 1].longitude]
            // ];


        }
        for (let i = 0; i < data.length - 1; i++) {
            {
                if (i > 3 && i < 7) {
                    const arcLineChemSup = L.Polyline.Arc([data[i].latitude, data[i].longitude],
                        [data[i + 1].latitude, data[i + 1].longitude], {
                        color: 'purple',
                        vertices: 200
                    }).addTo(map).setText('  ►  ', {
                        repeat: false, center: true,
                        offset: 6,
                        attributes: {
                            'font-weight': 'bold',
                            'font-size': '18', 'fill': 'purple'
                        }
                    });
                }

                else if (i > 7 && i<=9) {
                    const arcLineTenSup = L.Polyline.Arc([data[i].latitude, data[i].longitude],
                        [data[i - 1].latitude, data[i - 1].longitude], {
                        color: 'green',
                        vertices: 200
                    }).addTo(map).setText('  ►  ', {
                        repeat: false, center: true,
                        offset: 6,
                        attributes: {
                            'font-weight': 'bold',
                            'font-size': '18', 'fill': 'green'
                        }
                    });
                }


                else if (i >= 0 && i < 2) {
                    const arcLineSupProd = L.Polyline.Arc([data[i].latitude, data[i].longitude],
                        [data[i + 1].latitude, data[i + 1].longitude], {
                        color: 'grey',
                        vertices: 20000
                    }).addTo(map).setText('  ►  ', {
                        repeat: false, center: true,
                        offset: 6,
                        attributes: {
                            'font-weight': 'bold',
                            'font-size': '18', 'fill': 'grey'
                        }
                    });
                }

                else if (i >= 2 && i < 4) {
                    const arcLineCatTan = L.Polyline.Arc([data[i].latitude, data[i].longitude],
                        [data[i + 1].latitude, data[i + 1].longitude], {
                        color: 'red',
                        vertices: 20000
                    }).addTo(map).setText('  ►  ', {
                        repeat: false, center: true,
                        offset: 6,
                        attributes: {
                            'font-weight': 'bold',
                            'font-size': '18', 'fill': 'red'
                        }
                    });
                }

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



