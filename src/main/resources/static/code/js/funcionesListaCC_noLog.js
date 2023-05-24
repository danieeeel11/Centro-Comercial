$('document').ready(function (){
    getDatos();
});

let dataAllCC = [];
let dataCCFavs = [];
let btnCercaActive = 0;
//let btnFavActive = 0;
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
        //console.log("Mi ubicacion: " + latitude + " , " + longitude);
        //console.log("Mi ubicacion (precisa): " + (latitude + 0.0137693) + " , " + (longitude+ 0.0139309));
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

function paramCode(des_lat, des_top, id, nombre, logo, distancia, tipo) {
    let code = ``;
    let parte1 = `
        <div class="sec_btn_cc" style="left:${des_lat}%; top:${des_top}%;">
            <a href="../lista/infoCC.html" onclick="setId(${id})" class="btn cc" style="background-image:url('${logo}')">
    `;
    let parteDist = `
        <div class='sec_distancia_cc'>
            <div class="sec_logo_ubi"></div>
            <p class='txt_distancia_cc'> A ${distancia} km </p>
        </div>
    `;
    let parte2 = `
            <p class='txt_btn_cc'> ${nombre} </p>
        </a>
    `;
    let parte3 = `
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
    atributosPos.push([des_lat+"%",des_top+"%"]); //nuevo
    return code;
}
function paintCC(){
    let data = dataAllCC;
    //let dataFavs = dataCCFavs;
    let code= "";
    let des_lat = 5;
    let des_top= 0;
    let fila = 0;
    let conteo = 0;
    //let ids =  [];

    if (btnCercaActive == 1) {
        let sec = document.getElementById("sec_opc_loc");
        sec.style.width = "20%";
        sec.style.left = "10%";
        sec = document.getElementById("btn_loc");
        sec.style.backgroundColor = "#ccbd13";
        //Recorrer distancias
        for (let i = 0; i < distancias.length; i++) {
            //Recorrer la data de centros comerciales
            for (let j = 0; j < data.length; j++) {
                //Si el id en lista de distancias es igual al id en lista data (ordenar de mas cercano a mas lejano)
                if (distancias[i].id == data[j].id) {
                    //Hacer salto de linea
                    if (conteo % 4 == 0 && conteo != 0) {
                        des_lat = 5;
                        fila += 1;
                        des_top += 55;
                    }
                    //CC cerca
                    //else {
                    code += paramCode(des_lat, des_top, data[j].id, data[j].nombre, data[j].logo, distancias[i].dist, "Cerca");
                    //}
                    conteo++;
                    des_lat += 23;
                }
            }
        }
    }
    //Si no esta seleccionada la opcion de "Cerca de mi"
    else {
        let sec = document.getElementById("sec_opc_loc");
        sec.style.width = "10%";
        sec.style.left = "15%";
        sec = document.getElementById("btn_loc");
        sec.style.backgroundColor = "#ffffff";
        //Recorrer la data de centros comerciales
        for (let i = 0; i < data.length; i++) {
            if (conteo % 4 == 0 && conteo != 0) {
                des_lat = 5;
                fila += 1;
                des_top += 55;
            }
            //CC
            //else {
            code += paramCode(des_lat, des_top, data[i].id, data[i].nombre, data[i].logo, 0, "CC");
            //}
            conteo++;
            des_lat += 23;
        }
    }

    secciones = document.getElementsByClassName('sec_btn_cc'); //nuevo
    nombresCC = document.getElementsByClassName('txt_btn_cc'); //nuevo
    //Anexar el codigo en la seccion dada en HTML
    $("#grid").html(code);
}

function busqueda(){ //nuevo
    let input = document.getElementById('name').value;
    input = input.toLowerCase();
    let data = secciones;
    let index = 0;
    for (let i = 0; i < data.length; i++) {
        if (!nombresCC[i].innerHTML.toLowerCase().includes(input)) {
            data[i].style.display = "none";
        }
        else {
            //x[i].style.display="list-item";
            data[i].style.display = "initial";
            console.log(index);
            data[i].style.left = atributosPos[index][0];
            data[i].style.top = atributosPos[index][1];
            index++;
        }
    }
}

function setId(id){
    window.localStorage.setItem('id',id);
}