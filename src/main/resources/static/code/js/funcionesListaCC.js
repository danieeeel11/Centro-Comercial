$('document').ready(function () {
    getDatos();
});

let dataAllCC = [];
let dataCCFavs = [];
let btnCercaActive = 0;
let btnFavActive = 0;
let distancias = []

function getDatos() {
    getCC();
}
function getCC() {
    $.ajax({
        url: '/api/CC/all',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            // Aquí procesamos los datos obtenidos
            dataAllCC = data;
            //console.log(dataAllCC);
            //console.log(data);
            paintCC(data);
            getStar();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

function getStar() {
    let id_user = localStorage.getItem('id_Cliente');
    $.ajax({
        url: '/api/Favoritos/user',
        type: 'GET',
        data: { id_Cliente: id_user },
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (dataFavs) {
            //console.log(dataFavs);
            dataCCFavs = dataFavs;
            paintCC(dataCCFavs);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

function cercaDeMi() {
    if (btnCercaActive == 0) {
        btnCercaActive = 1;
        obtenerUbicacion();
    } else {
        btnCercaActive = 0;
        getDatos();
    }
}

function favoritosBtn() {
    if (btnFavActive == 0) {
        btnFavActive = 1;
    } else {
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
        distancias = calcularDistancia(dataAllCC, [(latitude + 0.0137693), (longitude + 0.0139309)]);
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
        if (data[i].coordenadas.includes(", ")) {
            coor = data[i].coordenadas.split(", ");
        } else {
            coor = data[i].coordenadas.split(" ");
        }
        distancias.push({ id: data[i].id, dist: getDistanceBetweenPoints(coor[0], coor[1], ubicacion[0], ubicacion[1]) });
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

/*function paintCC2(){
    let data = dataAllCC;
    let dataFavs = dataCCFavs;
    let code= "";
    let des_lat = 5;
    let des_top= 55;
    let fila = 0;
    let conteo = 0;
    let ids =  [];
    for (let i = 0; i < dataFavs.length; i++) {
        ids.push(dataFavs[i].id_CC);
    }
    if(btnCercaActive == 1){
        let sec = document.getElementById("sec_opc_loc");
        sec.style.width = "20%";
        sec.style.left = "40%";
        sec = document.getElementById("btn_loc");
        sec.style.backgroundColor = "#3ebdbb";

        for (let i = 0; i < distancias.length; i++) {
            for(let j=0;j<data.length;j++){
                if(distancias[i].id == data[j].id){
                    if(conteo%4==0 && conteo!=0){
                        des_lat=5;
                        fila=1;
                    }
                    if(fila == 0){
                        if(ids.includes(data[j].id)){
                            code += `
                                <div class="sec_btn_cc" style="left:${des_lat}%">
                                    <a href="../lista/infoCC.html" onclick="setId(${data[j].id})" class="btn cc" style="background-image:url('${data[j].logo}')">
                                        <div class='sec_distancia_cc'>
                                            <div class="sec_logo_ubi"></div>
                                            <p class='txt_distancia_cc'> A ${distancias[i].dist} km </p>
                                        </div>
                                        <p class='txt_btn_cc'> ${data[j].nombre} </p>
                                    </a>
                                    <button id="${data[j].id}" class="btn star_cc" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/2048px-Estrella_amarilla.png')" onclick="addFav('${data[j].id}')"></button>
                                </div>`;
                        }else{
                            code += `
                                <div class="sec_btn_cc" style="left:${des_lat}%">
                                    <a href="../lista/infoCC.html" onclick="setId(${data[j].id})" class="btn cc" style="background-image:url('${data[j].logo}')">
                                        <div class='sec_distancia_cc'>
                                            <div class="sec_logo_ubi"></div>
                                            <p class='txt_distancia_cc'> A ${distancias[i].dist} km </p>
                                        </div>
                                        <p class='txt_btn_cc'> ${data[j].nombre} </p>
                                    </a>
                                    <button id="${data[j].id}" class="btn star_cc" onclick="addFav('${data[j].id}')"></button>
                                </div>`;
                        }
                        conteo++;
                        des_lat += 23;
                    }else if(fila == 1) {
                        if(ids.includes(data[j].id)){
                            code += `
                                <div class="sec_btn_cc" style="left:${des_lat}%;top:${des_top}%;">
                                    <a href="../lista/infoCC.html" onclick="setId(${data[j].id})" class="btn cc" style="background-image:url('${data[j].logo}')">
                                        <div class='sec_distancia_cc'>
                                            <div class="sec_logo_ubi"></div>
                                            <p class='txt_distancia_cc'> A ${distancias[i].dist} km </p>
                                        </div>
                                        <p class='txt_btn_cc'> ${data[j].nombre} </p>
                                    </a>
                                    <button id="${data[j].id}" class="btn star_cc" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/2048px-Estrella_amarilla.png')"></button>
                                </div>`;
                        }else{
                            code += `
                                <div class="sec_btn_cc" style="left:${des_lat}%;top:${des_top}%;">
                                    <a href="../lista/infoCC.html" onclick="setId(${data[j].id})" class="btn cc" style="background-image:url('${data[j].logo}')">
                                        <div class='sec_distancia_cc'>
                                            <div class="sec_logo_ubi"></div>
                                            <p class='txt_distancia_cc'> A ${distancias[i].dist} km </p>
                                        </div>
                                        <p class='txt_btn_cc'> ${data[j].nombre} </p>
                                    </a>
                                    <button id="${data[j].id}" class="btn star_cc" onclick="addFav('${data[j].id}')"></button>
                                </div>`;
                        }
                        conteo++;
                        des_lat += 23;
                    }
                }
            }
        }
    }else{
        let sec = document.getElementById("sec_opc_loc");
        sec.style.width = "10%";
        sec.style.left = "45%";
        sec = document.getElementById("btn_loc");
        sec.style.backgroundColor = "#bcbcbc";
        for(let i=0;i<data.length;i++){
            if(conteo%4==0 && conteo!=0){
                des_lat=5;
                fila=1;
            }
            if(fila == 0){
                if(ids.includes(data[i].id)){
                    code += `
                <div class="sec_btn_cc" style="left:${des_lat}%">
                    <a href="../lista/infoCC.html" onclick="setId(${data[i].id})" class="btn cc" style="background-image:url('${data[i].logo}')">
                        <p class='txt_btn_cc'> ${data[i].nombre} </p>
                    </a>
                    <button id="${data[i].id}" class="btn star_cc" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/2048px-Estrella_amarilla.png')" onclick="addFav('${data[i].id}')"></button>
                </div>`;
                }else{
                    code += `
                <div class="sec_btn_cc" style="left:${des_lat}%">
                    <a href="../lista/infoCC.html" onclick="setId(${data[i].id})" class="btn cc" style="background-image:url('${data[i].logo}')">
                        <p class='txt_btn_cc'> ${data[i].nombre} </p>
                    </a>
                    <button id="${data[i].id}" class="btn star_cc" onclick="addFav('${data[i].id}')"></button>
                </div>`;
                }
                conteo++;
                des_lat += 23;
            }else if(fila == 1) {
                if(ids.includes(data[i].id)){
                    code += `
                <div class="sec_btn_cc" style="left:${des_lat}%;top:${des_top}%;">
                    <a href="../lista/infoCC.html" onclick="setId(${data[i].id})" class="btn cc" style="background-image:url('${data[i].logo}')">
                        <p class='txt_btn_cc'> ${data[i].nombre} </p>
                    </a>
                    <button id="${data[i].id}" class="btn star_cc" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/2048px-Estrella_amarilla.png')"></button>
                </div>`;
                }else{
                    code += `
                <div class="sec_btn_cc" style="left:${des_lat}%;top:${des_top}%;">
                    <a href="../lista/infoCC.html" onclick="setId(${data[i].id})" class="btn cc" style="background-image:url('${data[i].logo}')">
                        <p class='txt_btn_cc'> ${data[i].nombre} </p>
                    </a>
                    <button id="${data[i].id}" class="btn star_cc" onclick="addFav('${data[i].id}')"></button>
                </div>`;
                }
                conteo++;
                des_lat += 23;
            }
        }
    }
    $("#grid").html(code);
}
*/

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
    let parteStarFav = `
        <button id="${id}" class="btn star_cc" style="background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/2048px-Estrella_amarilla.png')" onclick="addFav('${id}')"></button>
    `;
    let parteStarNoFav = `
        <button id="${id}" class="btn star_cc" onClick="addFav('${id}')"></button>
    `;
    let parte3 = `
        </div>
    `;
    if (tipo == "Cerca y Favorito") {
        code +=
            parte1 +
            parteDist +
            parte2 +
            parteStarFav +
            parte3;
    } else if (tipo == "Cerca") {
        code +=
            parte1 +
            parteDist +
            parte2 +
            parteStarNoFav +
            parte3;
    } else if (tipo == "Favorito") {
        code +=
            parte1 +
            parte2 +
            parteStarFav +
            parte3;
    } else if (tipo == "Sec_Favoritos") {
        code +=
            parte1 +
            parte2 +
            parte3;
    } else if (tipo == "Sec_Favoritos y Cerca") {
        code +=
            parte1 +
            parteDist +
            parte2 +
            parte3;
    }
    else {
        code +=
            parte1 +
            parte2 +
            parteStarNoFav +
            parte3;
    }
    return code;
}
function paintCC(data) {
    //console.log("Nuevo metodo");
    //let data = dataAllCC;
    let dataFavs = dataCCFavs;
    let code = "";
    let des_lat = 5;
    let des_top = 55;
    let fila = 0;
    let conteo = 0;
    let ids = [];
    for(let i=0;i<data.length;i++){
        if(conteo==4 && conteo!=0){
            des_lat=5;
            fila=1;
        }else if(conteo==8 && conteo!=0){
            des_lat=5;
            fila=2;
        }else if(conteo==12 && conteo!=0){
            des_lat=5;
            fila=3;
        }
        if(fila == 0){
            code += `
                <div class="sec_btn_cc" style="left:${des_lat}%">
                    <a href="../lista/infoCC.html" onclick="setId(${data[i].id})" class="btn cc" style="background-image:url('${data[i].logo}')">
                        <p class='txt_btn_cc'> ${data[i].nombre} </p>
                    </a>
                    <button id="${data[i].id}" class="btn star_cc" onclick="addFav('${data[i].id}')"></button>
                </div>`;
            conteo++;
            des_lat += 23;
        }else if(fila==1) {
            code += `
                <div class="sec_btn_cc" style="left:${des_lat}%;top:${des_top}%;">
                    <a href="../lista/infoCC.html" onclick="setId(${data[i].id})" class="btn cc" style="background-image:url('${data[i].logo}')">
                        <p class='txt_btn_cc'> ${data[i].nombre} </p>
                    </a>
                    <button id="${data[i].id}" class="btn star_cc" onclick="addFav('${data[i].id}')"></button>
                </div>`;
            conteo++;
            des_lat += 23;
        }
        else if(fila==2) {
            code += `
                <div class="sec_btn_cc" style="left:${des_lat}%;top:${des_top+55}%;">
                    <a href="../lista/infoCC.html" onclick="setId(${data[i].id})" class="btn cc" style="background-image:url('${data[i].logo}')">
                        <p class='txt_btn_cc'> ${data[i].nombre} </p>
                    </a>
                    <button id="${data[i].id}" class="btn star_cc" onclick="addFav('${data[i].id}')"></button>
                </div>`;
            conteo++;
            des_lat += 23;
        }
        else if(fila==3) {
            code += `
                <div class="sec_btn_cc" style="left:${des_lat}%;top:${165}%;">
                    <a href="../lista/infoCC.html" onclick="setId(${data[i].id})" class="btn cc" style="background-image:url('${data[i].logo}')">
                        <p class='txt_btn_cc'> ${data[i].nombre} </p>
                    </a>
                    <button id="${data[i].id}" class="btn star_cc" onclick="addFav('${data[i].id}')"></button>
                </div>`;
            conteo++;
            des_lat += 23;
        }
    }
    $("#grid").html(code);
}

function setId(id) {
    window.localStorage.setItem('id', id);
}