$('document').ready(function (){
    getDatos();
});

let dataAllCC = [];
let dataCCFavs = [];
let btnCercaActive = 0;
let btnFavActive = 0;
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
            getStar();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

function getStar() {
    let id_user = localStorage.getItem('id_Cliente');
    $.ajax({
        url: '/api/Favoritos/user',
        type:'GET',
        data: {id_Cliente: id_user},
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(dataFavs) {
            //console.log(dataFavs);
            dataCCFavs = dataFavs;
            paintCC();
        },
        error: function(jqXHR, textStatus, errorThrown) {
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

function favoritosBtn() {
    if(btnFavActive == 0){
        btnFavActive = 1;
    }else{
        btnFavActive = 0;
    }
    getDatos();
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
    //console.log("---");
    //console.log(distancias);
    distancias.sort((x, y) => x.dist - y.dist);
    //console.log(distancias);
    //console.log("---");
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
    let parteStarFav = `
        <button id="${id}" class="btn star" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/2048px-Estrella_amarilla.png')" onclick="addFav('${id}')"></button>
    `;
    let parteStarNoFav = `
        <button id="${id}" class="btn star" onClick="addFav('${id}')"></button>
    `;
    let parte3 = `
            </div>
        </div>
    `;
    if(tipo == "Cerca y Favorito"){
        code +=
            parte1 +
            parteDist +
            parte2 +
            parteStarFav +
            parte3;
    }else if(tipo == "Cerca"){
        code +=
            parte1 +
            parteDist +
            parte2 +
            parteStarNoFav +
            parte3;
    }else if(tipo == "Favorito"){
        code +=
            parte1 +
            parte2 +
            parteStarFav +
            parte3;
    }else if(tipo == "Sec_Favoritos"){
        code +=
            parte1 +
            parte2 +
            parte3;
    }else if(tipo == "Sec_Favoritos y Cerca"){
        code +=
            parte1 +
            parteDist +
            parte2 +
            parte3;
    }else{
        code +=
            parte1 +
            parte2 +
            parteStarNoFav +
            parte3;
    }
    return code;
}

function paintCC(){
    //console.log("Nuevo metodo");
    let data = dataAllCC;
    let dataFavs = dataCCFavs;
    let code= "";
    let ids =  [];
    for (let i = 0; i < dataFavs.length; i++) {
        ids.push(dataFavs[i].id_CC);
    }

    //Si esta seleccionada la opcion de "Favoritos"
    if(btnFavActive == 1){
        let sec = document.getElementById("btn_fav");
        sec.style.backgroundColor = "#c4c4c4";
        //Si esta seleccionada la opcion de "Cerca de mi"
        if(btnCercaActive == 1){
            let sec = document.getElementById("btn_loc");
            sec.style.backgroundColor = "#c4c4c4";
            //for (let i = 0; i < ids.length; i++) {
            for (let i = 0; i < distancias.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (distancias[i].id == data[j].id) {
                        if (ids.includes(data[j].id)) {
                            let linksFotos = data[j].foto.split(", ");
                            code += paramCode(data[j].id, data[j].nombre.toUpperCase(), data[j].logo, distancias[i].dist, "Sec_Favoritos y Cerca", linksFotos[0]);
                        }
                    }
                }
            }
            //}
        }
        //Si no esta seleccionada la opcion de "Cerca de mi"
        else {
            let sec = document.getElementById("btn_loc");
            sec.style.backgroundColor = "#ffffff";
            for (let i = 0; i < data.length; i++) {
                if (ids.includes(data[i].id)) {
                    let linksFotos = data[i].foto.split(", ");
                    code += paramCode(data[i].id, data[i].nombre.toUpperCase(), data[i].logo, 0, "Sec_Favoritos", linksFotos[0]);
                }
            }
        }
    }
    //Si no esta seleccionada la opcion de "Favoritos"
    else {
        let sec = document.getElementById("btn_fav");
        sec.style.backgroundColor = "#ffffff";

        //Si esta seleccionada la opcion de "Cerca de mi"
        if (btnCercaActive == 1) {
            let sec = document.getElementById("btn_loc");
            sec.style.backgroundColor = "#c4c4c4";
            //Recorrer distancias
            for (let i = 0; i < distancias.length; i++) {
                //Recorrer la data de centros comerciales
                for (let j = 0; j < data.length; j++) {
                    //Si el id en lista de distancias es igual al id en lista data (ordenar de mas cercano a mas lejano)
                    if (distancias[i].id == data[j].id) {
                        let linksFotos = data[j].foto.split(", ");
                        //CC cerca y favorito
                        if (ids.includes(data[j].id)) {
                            code += paramCode(data[j].id, data[j].nombre.toUpperCase(), data[j].logo, distancias[i].dist, "Cerca y Favorito", linksFotos[0]);
                        }
                        //CC cerca
                        else {
                            code += paramCode(data[j].id, data[j].nombre.toUpperCase(), data[j].logo, distancias[i].dist, "Cerca", linksFotos[0]);
                        }
                    }
                }
            }
        }
        //Si no esta seleccionada la opcion de "Cerca de mi"
        else {
            let sec = document.getElementById("btn_loc");
            sec.style.backgroundColor = "#ffffff";
            //Recorrer la data de centros comerciales
            for (let i = 0; i < data.length; i++) {
                let linksFotos = data[i].foto.split(", ");
                //CC favorito
                if (ids.includes(data[i].id)) {
                    code += paramCode(data[i].id, data[i].nombre.toUpperCase(), data[i].logo, 0, "Favorito", linksFotos[0]);
                }
                //CC
                else {
                    code += paramCode(data[i].id, data[i].nombre.toUpperCase(), data[i].logo, 0, "CC", linksFotos[0]);
                }
            }
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