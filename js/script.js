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



function getArrows(arrLatlngs, color, arrowCount, mapObj) {

    if (typeof arrLatlngs === undefined || arrLatlngs == null ||    
(!arrLatlngs.length) || arrLatlngs.length < 2)          
    return [];

    if (typeof arrowCount === 'undefined' || arrowCount == null)
        arrowCount = 1;

    if (typeof color === 'undefined' || color == null)
        color = '';
    else
        color = 'color:' + color;

    var result = [];
    for (var i = 1; i < arrLatlngs.length; i++) {
        var icon = L.divIcon({ className: 'arrow-icon', bgPos: [15, 15], html: '<div style="' + color + ';transform: rotate(' + getAngle(arrLatlngs[i - 1], arrLatlngs[i], -1).toString() + 'deg)">▶</div>' });
        for (var c = 1; c <= arrowCount; c++) {
          //  if(c==1)
            result.push(L.marker(myMidPoint(arrLatlngs[i], arrLatlngs[i - 1], (c / (arrowCount + 1)), mapObj), { icon: icon }));
        }
    }
    return result;
}

function getAngle(latLng1, latlng2, coef) {
    var dy = latlng2[0] - latLng1[0];
    var dx = Math.cos(Math.PI / 180 * latLng1[0]) * (latlng2[1] - latLng1[1]);
    var ang = ((Math.atan2(dy, dx) / Math.PI) * 180 * coef);
    return (ang).toFixed(2);
}

function myMidPoint(latlng1, latlng2, per, mapObj) {
    if (!mapObj)
        throw new Error('map is not defined');

    var halfDist, segDist, dist, p1, p2, ratio,
        points = [];

    p1 = mapObj.project(new L.latLng(latlng1));
    p2 = mapObj.project(new L.latLng(latlng2));

    halfDist = distanceTo(p1, p2) * per;

    if (halfDist === 0)
        return mapObj.unproject(p1);

    dist = distanceTo(p1, p2);

    if (dist > halfDist) {
        ratio = (dist - halfDist) / dist;
        var res = mapObj.unproject(new Point(p2.x - ratio * (p2.x - p1.x), p2.y - ratio * (p2.y - p1.y)));
        return [res.lat, res.lng];
    }

}

function distanceTo(p1, p2) {
    var x = p2.x - p1.x,
        y = p2.y - p1.y;

    return Math.sqrt(x * x + y * y);
}

function toPoint(x, y, round) {
    if (x instanceof Point) {
        return x;
    }
    if (isArray(x)) {
        return new Point(x[0], x[1]);
    }
    if (x === undefined || x === null) {
        return x;
    }
    if (typeof x === 'object' && 'x' in x && 'y' in x) {
        return new Point(x.x, x.y);
    }
    return new Point(x, y, round);
}

function Point(x, y, round) {
    this.x = (round ? Math.round(x) : x);
    this.y = (round ? Math.round(y) : y);
}


  

fetch("./assets/location-data.json")
    .then(response => response.json())
    .then(data => {
        ourData = data;
        for(let i=0;i<data.length-1;i++) {
            let option = document.createElement("option");
            option.value = i+1;
            option.text = data[i].title;
            document.querySelector(".select-dropdown").appendChild(option);

            let marker = L.marker([data[i].latitude, data[i].longitude], {icon: ourCustomIcon}).bindPopup(`<h3> ${data[i].title} </h3> <p> ${data[i].description} </p>`).on('click', () => {
              //  map.flyTo([data[i].latitude, data[i].longitude], data[i].zoomLevel);
            }).addTo(map);

            // let simpleVector0 = L.polyline(
            //     [
            //         [data[i].latitude, data[i].longitude],
            //         [data[i+1].latitude, data[i+1].longitude]
            //     ],
            //     { color: "green" }
            //   )
            //    .addTo(map);
               var mylatlngs = [
                [data[i].latitude, data[i].longitude],
                [data[i+1].latitude, data[i+1].longitude]
            ];

            L.Polyline.Arc( [data[i].latitude, data[i].longitude],
                [data[i+1].latitude, data[i+1].longitude], {
                color: 'green',
                vertices: 200
            }).addTo(map);


               L.featureGroup(getArrows(mylatlngs, 'red', 1,map)).addTo(map);

            //    L.Polyline.Arc( [data[i].latitude, data[i].longitude],
            //     [data[i+1].latitude, data[i+1].longitude], {
            //     color: 'red',
            //     vertices: 200
            // }).addTo(map);


               

        }
    })
    .catch(error => alert(error))

document.querySelector(".map-zoom-out-btn").addEventListener('click', () => {
    map.flyTo([19.5937, 78.9629], 5);
});

document.querySelector(".search-btn").addEventListener('click', () => {
    let select = document.querySelector(".select-dropdown");
    let value = select.options[select.selectedIndex].value;
    map.flyTo([ourData[value-1].latitude, ourData[value-1].longitude],10);
});



