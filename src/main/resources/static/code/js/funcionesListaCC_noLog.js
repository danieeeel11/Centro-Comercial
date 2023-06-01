$('document').ready(function (){
    getDatos();
});

let dataAllCC = [];
let btnCercaActive = 0;
let distancias = []
let secciones = []; //nuevo
let nombresCC = []; //nuevo
let atributosPos = []; //nuevo

function getDatos() {
    getCC();
}
function getCC(){
    $.ajax({
        url: '/api/CC/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            dataAllCC = data;
            //console.log(dataAllCC);
            paintCC();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

function cercaDeMi() {
    if(btnCercaActive == 0){
        btnCercaActive = 1;
        obtenerUbicacion();
    }else{
        btnCercaActive = 0;
        getDatos();
    }
}

function obtenerUbicacion() {
    let latitude = 0;
    let longitude = 0;
    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        distancias = calcularDistancia(dataAllCC, [(latitude + 0.0137693), (longitude+ 0.0139309)]);
        getDatos();
    }

    function error() {
        console.log("Unable to retrieve your location");
    }
    const opciones = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000
    };

    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
    } else {
        navigator.geolocation.getCurrentPosition(success, error, opciones);
    }
}
function calcularDistancia(data, ubicacion) {
    let distancias = [];
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

function paramCode(id, nombre, logo, distancia, tipo, fondo) {
    let code = ``;
    let parte1 = `
        <div class="sec_container">
            <div class="sec_newBoton">
                <a href="../lista/infoCC.html" onclick="setId(${id})" class='btn newBoton' style="background-image:url('${fondo}')">
    `;
    let parteDist = `
        <div class='sec_distancia_cc'>
            <div class="sec_logo_ubi"></div>
            <p class='txt_distancia_cc'> A ${distancia} km </p>
        </div>
    `;
    let parte2 = `
            <div class="sec_logo_cc" style="background-image:url('${logo}')"></div>
            <p class='txt_newBoton'> ${nombre} </p>
        </a>
    `;
    let parte3 = `
            </div>
        </div>
    `;
    if(tipo == "Cerca"){
        code +=
            parte1 +
            parteDist +
            parte2 +
            parte3;
    }else{
        code +=
            parte1 +
            parte2 +
            parte3;
    }
    return code;
}

function paintCC(){
    let data = dataAllCC;
    let code= "";

    if (btnCercaActive == 1) {
        let sec = document.getElementById("btn_loc");
        sec.style.backgroundColor = "#505050";
        sec.style.color = "#ffffff";

        //Recorrer distancias
        for (let i = 0; i < distancias.length; i++) {
            //Recorrer la data de centros comerciales
            for (let j = 0; j < data.length; j++) {
                //Si el id en lista de distancias es igual al id en lista data (ordenar de mas cercano a mas lejano)
                if (distancias[i].id == data[j].id) {
                    let linksFotos = data[j].foto.split(", ");
                    //CC cerca
                    code += paramCode(data[j].id, data[j].nombre.toUpperCase(), data[j].logo, distancias[i].dist, "Cerca", linksFotos[0]);
                }
            }
        }
    }
    //Si no esta seleccionada la opcion de "Cerca de mi"
    else {
        let sec = document.getElementById("btn_loc");
        sec.style.backgroundColor = "#ffffff";
        sec.style.color = "#000000";

        //Recorrer la data de centros comerciales
        for (let i = 0; i < data.length; i++) {
            let linksFotos = data[i].foto.split(", ");
            //CC
            code += paramCode(data[i].id, data[i].nombre.toUpperCase(), data[i].logo, 0, "CC", linksFotos[0]);
        }
    }

    secciones = document.getElementsByClassName('sec_container'); //nuevo
    nombresCC = document.getElementsByClassName('txt_newBoton'); //nuevo
    //Anexar el codigo en la seccion dada en HTML
    $("#grid").html(code);
}

function busqueda(){ //nuevo
    let input = document.getElementById('name').value;
    input = input.toLowerCase();
    let data = secciones;
    for (let i = 0; i < data.length; i++) {
        if (!nombresCC[i].innerHTML.toLowerCase().includes(input)) {
            data[i].style.display = "none";
        }
        else {
            data[i].style.display = "block";
        }
    }
}

function setId(id){
    window.localStorage.setItem('id',id);
}