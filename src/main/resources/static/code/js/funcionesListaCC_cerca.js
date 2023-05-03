/*$('document').ready(function (){
    getCC();
});

function getCC(){
    $.ajax({
        url: '/api/CC/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            obtenerUbicacion(data);
            //calcularDistancia(data, ubicacion);
            //paintCC(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

function obtenerUbicacion(data) {
    //const status = document.querySelector("#status");
    //const mapLink = document.querySelector("#map-link");
    //mapLink.href = "";
    //mapLink.textContent = "";
    let latitude = 0;
    let longitude = 0;
    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        console.log("Mi ubicacion: " + latitude + " , " + longitude);
        console.log("Mi ubicacion (precisa): " + (latitude + 0.0137693) + " , " + (longitude+ 0.0139309));
        let distancias = calcularDistancia(data, [(latitude + 0.0137693), (longitude+ 0.0139309)]);
        paintCC(data, distancias);
    //    status.textContent = "";
    //    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    //    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    }

    function error() {
        //status.textContent = "Unable to retrieve your location";
        console.log("Unable to retrieve your location");
    }
    const opciones = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };

    if (!navigator.geolocation) {
        //status.textContent = "Geolocation is not supported by your browser";
        console.log("Geolocation is not supported by your browser");
    } else {
        //status.textContent = "Locating…";
        navigator.geolocation.getCurrentPosition(success, error, opciones);
        //console.log("Aqui");
        //navigator.geolocation.watchPosition(success, error, opciones);
        //return [latitude, longitude];
    }
}

function calcularDistancia(data, ubicacion) {
    console.log(ubicacion);
    let distancias = [];
    //console.log(latitude + " , " + longitude + " <--");
    for (let i = 0; i < data.length; i++) {
        let coor = [];
        if (data[i].coordenadas.includes(", ")){
            coor = data[i].coordenadas.split(", ");
        }else{
            coor = data[i].coordenadas.split(" ");
        }
        distancias.push({id:data[i].id, dist:getDistanceBetweenPoints(coor[0], coor[1], ubicacion[0], ubicacion[1])});
    }
    distancias.sort((x, y) => x.dist - y.dist);
    console.log(distancias);
    return distancias;
}
function getDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
    const radioTierra = 6371; // Radio de la Tierra en km
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = radioTierra * c; // Distancia en km
    return Number.parseFloat(distancia).toFixed(2);
}

function degToRad(deg) {
    return deg * (Math.PI / 180);
}

function paintCC(data, distancias){
    let code= "";
    let des_lat = 5;
    let des_top= 55;
    let fila = 0;
    let conteo = 0;

    for (let i = 0; i < distancias.length; i++) {
        for(let j=0;j<data.length;j++){
            if(distancias[i].id == data[j].id){
                if(conteo%4==0 && conteo!=0){
                    des_lat=5;
                    fila=1;
                }
                //<a href="../lista/prueba.html" onClick="setId(${data[j].id})" className="btn cc" style="background-image:url('${data[j].logo}')">
                if(fila == 0){
                    code += `
                <div class="sec_btn_cc" style="left:${des_lat}%">
                    <a href="../lista/infoCC.html" onClick="setId(${data[i].id})" className="btn cc" style="background-image:url('${data[i].logo}')">    
                        <div class='sec_distancia_cc'>
                            <div class="sec_logo_ubi"></div>
                            <p class='txt_distancia_cc'> A ${distancias[i].dist} km </p>
                        </div>
                        <p class='txt_btn_cc'> ${data[j].nombre} </p>
                    </a>
                </div>`;
                    conteo++;
                    des_lat += 23;
                }else if(fila == 1) {
                    code += `
                <div class="sec_btn_cc" style="left:${des_lat}%;top:${des_top}%;">
                    <a href="../lista/infoCC.html" onclick="setId(${data[j].id})" class="btn cc" style="background-image:url('${data[j].logo}')">
                        <div class='sec_distancia_cc'>
                            <div class="sec_logo_ubi"></div>
                            <p class='txt_distancia_cc'> A ${distancias[i].dist} km </p>
                        </div>
                        <p class='txt_btn_cc'> ${data[j].nombre} </p>
                    </a>
                </div>`;
                    conteo++;
                    des_lat += 23;
                }
            }
        }
    }

    $("#grid").html(code);
}

function setId(id){
    window.localStorage.setItem('id',id);
}*/