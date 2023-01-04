//let map = L.map('mymap').setView([19.5937, 78.9629], 5);
let ourData = [];

const myAPIKey = "fb78e7f91cd847519128e3b58e348171";
const locationurl = window.location.href;
let lat=39.8282,long= 58.5795;

if(locationurl.match("173b")=="173b")
{
    lat = 23.7986,
    long = 90.2680
}

if(locationurl.match("52f6")=="52f6")
{
    lat = 41.86266587498115,
    long = 12.47150071100284
}

// const myAPIKey = process.env["key"];
let map = L.map('mymap', {
    center: [lat, long],
    zoom: 8,
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

let cattleOption = {
    iconUrl: '/assets/cow.svg',
    iconSize: [40, 40]
};

let ourCustomIcon = L.icon(iconOption);
let chemicalIcon = L.icon(chemicalOption);
let cowIcon  = L.icon(cattleOption);


function getRandomInt(max) {
    return max * 1.5;
    //    return Math.floor(Math.random() * max);
}


fetch("/assets/location-data.json")
    .then(response => response.json())
    .then(data => {
        ourData = data;
        var tanArr = [];
        var chemArr = [];
        var prodArr = [];
        var catArr = [];
        var supArr = [];
        for (let i = 0; i < data.length ; i++) {
            let option = document.createElement("option");
            option.value = i + 1;
            option.text = data[i].title;
            document.querySelector(".select-dropdown").appendChild(option);

            var TanneryPosition = [data[i].latitude, data[i].longitude];
            var chemicalFactoryPosition = [data[i].latitude, data[i].longitude];
            var productionFactoryPosition = [data[i].latitude, data[i].longitude];
            var cattleHouseProduction = [data[i].latitude, data[i].longitude];
            var supplierFactoryPosition = [data[i].latitude, data[i].longitude];


            if (i ==4) {
                tanArr.push(TanneryPosition);
                let markerTan = L.marker([TanneryPosition[0], TanneryPosition[1]], { icon: ourCustomIcon }).bindPopup(`<h3> ${data[i].title} </h3> <img src=${"https://media.istockphoto.com/id/177292389/photo/ostrich-leather-tannery.jpg?s=612x612&w=0&k=20&c=O8sCRtnL2fvTd7eQHC0K1w66rLj8HZHvxn5BQTLNtHI="} width="100%" height = "5%"></img> <p> ${data[i].description} </p>`).on('click', () => {
                    //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
                }).addTo(map);
            }


            if (i == 3 || i==8) {
                chemArr.push(chemicalFactoryPosition);

                let markerChem = L.marker([chemicalFactoryPosition[0], chemicalFactoryPosition[1]], { icon: chemicalIcon }).bindPopup(`<h3> ${data[i].title} </h3> <img src=${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiOtG4TFSY2KqcXTtRNZdAWozreQehbpbq2isswPQyli0Ye8q4HPXs-3R7SKHEyhYHF3U&usqp=CAU"} width="100%" height = "5%"></img><p> ${data[i].description} </p>`).on('click', () => {
                    //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
                }).addTo(map);
            }

            if (i == 0 || i ==9) {
                prodArr.push(productionFactoryPosition);
                let markerProd = L.marker([productionFactoryPosition[0], productionFactoryPosition[1]], { icon: markerIconProd }).bindPopup(`<h3> ${data[i].title} </h3><img src=${"https://www.leatherluxury.it/media/brand/DAN_0798.jpg"} width="100%" height = "5%"></img> <p> ${data[i].description} </p>`).on('click', () => {
                    //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
                }).addTo(map);
            }

            if(i==1)
            {
                supArr.push(supplierFactoryPosition);
                let markerSup = L.marker([supplierFactoryPosition[0], supplierFactoryPosition[1]], { icon: markerIconSup }).bindPopup(`<h3> ${data[i].title} </h3> <img src=${"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH1W1-FEwCQA6_Y0X6YKvDQIBP7hbZ7IEEYdvoFQGvnQ&s"} width="100%" height = "5%"></img><p> ${data[i].description} </p>`).on('click', () => {
                    //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
                }).addTo(map);
            }

            
            if (i == 2 ) {
                catArr.push(cattleHouseProduction);
                let markerCattle = L.marker([cattleHouseProduction[0], cattleHouseProduction[1]], { icon: cowIcon }).bindPopup(`<h3> ${data[i].title} </h3> <img src=${"https://static6.depositphotos.com/1003671/579/i/450/depositphotos_5792338-stock-photo-red-angus.jpg"} width="100%" height = "5%"></img><p> ${data[i].description} </p>`).on('click', () => {
                    //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
                }).addTo(map);
            }
        }


            // var mylatlngs = [
            //     [data[i].latitude, data[i].longitude],
            //     [data[i + 1].latitude, data[i + 1].longitude]
            // ];


        
        // for (let i = 0; i < data.length - 1; i++) {
        //     {
        //         if (i > 3 && i < 7) {
        //             const arcLineChemSup = L.Polyline.Arc([data[i].latitude, data[i].longitude],
        //                 [data[i + 1].latitude, data[i + 1].longitude], {
        //                 color: 'purple',
        //                 vertices: 200
        //             }).addTo(map).setText('  ►  ', {
        //                 repeat: false, center: true,
        //                 offset: 6,
        //                 attributes: {
        //                     // 'font-weight': 'bold',
        //                     'font-size': '18', 'fill': 'purple'
        //                 }
        //             });
        //         }

        //         else if (i > 7 && i<=10) {
        //             const arcLineTenSup = L.Polyline.Arc([data[i-1].latitude, data[i-1].longitude],
        //                 [data[i ].latitude, data[i ].longitude], {
        //                 color: 'green',
        //                 vertices: 200
        //             }).addTo(map).setText('  ►  ', {
        //                 repeat: false, center: true,
        //                 offset: 6,
        //                 attributes: {
        //                     // 'font-weight': 'bold',
        //                     'font-size': '18', 'fill': 'green'
        //                 }
        //             });
        //         }


        //         else if (i >= 0 && i < 2) {
        //             const arcLineSupProd = L.Polyline.Arc([data[i+1].latitude, data[i+1].longitude],
        //                 [data[i ].latitude, data[i ].longitude], {
        //                 color: 'grey',
        //                 vertices: 20000
        //             }).addTo(map).setText('  ►  ', {
        //                 repeat: false, center: true,
        //                 offset: 6,
        //                 attributes: {
        //                     // 'font-weight': 'bold',
        //                     'font-size': '18', 'fill': 'grey'
        //                 }
        //             });
        //         }

        //         else if (i >= 2 && i < 4 || i>=9) {
        //             const arcLineCatTan = L.Polyline.Arc([data[i+1].latitude, data[i+1].longitude],
        //                 [data[i ].latitude, data[i ].longitude], {
        //                 color: 'red',
        //                 vertices: 20000
        //             }).addTo(map).setText('  ►  ', {
        //                 repeat: false, center: true,
        //                 offset: 6,
        //                 attributes: {
        //                     // 'font-weight': 'bold',
        //                     'font-size': '10', 'fill': 'red'
        //                 }
        //             });
        //         }

        //     }
        // }

        console.log(tanArr, chemArr, supArr, prodArr,catArr)

        for(let i=0;i <1;i++)
        {

            console.log("Cattle to Slaughter"+ catArr[i][0], catArr[i][1] +"and"+ supArr[i][0],supArr[i][1])
            const arcLineCatSlot = L.Polyline.Arc([catArr[i][0], catArr[i][1]],
                [supArr[i][0],supArr[i][1]], {
                color: 'black',
                vertices: 200
            }).addTo(map).setText('  ►  ', {
                repeat: false, center: true,
                offset: 6,
                attributes: {
                    // 'font-weight': 'bold',
                    'font-size': '18', 'fill': 'black'
                }
            });

            const arcLineslotTan = L.Polyline.Arc([supArr[i][0], supArr[i][1]],
                [tanArr[i][0],tanArr[i][1]], {
                color: 'black',
                vertices: 200
            }).addTo(map).setText('  ►  ', {
                repeat: false, center: true,
                offset: 6,
                attributes: {
                    // 'font-weight': 'bold',
                    'font-size': '18', 'fill': 'black'
                }
            });

            const arcLinesChemTan = L.Polyline.Arc([chemArr[i][0], chemArr[i][1]],
                [tanArr[i][0],tanArr[i][1]], {
                color: 'red',
                vertices: 200
            }).addTo(map).setText('  ►  ', {
                repeat: false, center: true,
                offset: 6,
                attributes: {
                    // 'font-weight': 'bold',
                    'font-size': '18', 'fill': 'red'
                }
            });

            const arcLinesChemTan2 = L.Polyline.Arc([chemArr[i+1][0], chemArr[i+1][1]],
                [tanArr[i][0],tanArr[i][1]], {
                color: 'red',
                vertices: 200
            }).addTo(map).setText('  ►  ', {
                repeat: false, center: true,
                offset: 6,
                attributes: {
                    // 'font-weight': 'bold',
                    'font-size': '18', 'fill': 'red'
                }
            });

            const arcLinesTanProd = L.Polyline.Arc([tanArr[i][0], tanArr[i][1]],
                [prodArr[i][0],prodArr[i][1]], {
                color: 'green',
                vertices: 200
            }).addTo(map).setText('  ►  ', {
                repeat: false, center: true,
                offset: 6,
                attributes: {
                    // 'font-weight': 'bold',
                    'font-size': '18', 'fill': 'green'
                }
            });
        }


    })
    .catch(error => alert(error))

// document.querySelector(".map-zoom-out-btn").addEventListener('click', () => {
//     map.flyTo([19.5937, 78.9629], 5);
// });

document.querySelector(".search-btn").addEventListener('click', () => {
    let select = document.querySelector(".select-dropdown");
    let value = select.options[select.selectedIndex].value;
    map.flyTo([ourData[value - 1].latitude, ourData[value - 1].longitude], 5);
});



