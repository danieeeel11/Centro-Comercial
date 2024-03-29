$('document').ready(function (){
    getDatos();
});

let dataAllTiendas = [];
let dataTiendasFavs = [];
let btnCategoriaActive = 0;
let btnFavActive = 0;

function getDatos() {
    getTiendas();
}
function getTiendas(){
    $.ajax({
        url: '/api/Tiendas/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            dataAllTiendas = data;
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
        url: '/api/FavoritosTienda/user',
        type:'GET',
        data: {id_Cliente: id_user},
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(dataFavs) {
            //console.log(dataFavs);
            dataTiendasFavs = dataFavs;
            paintCC();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

function favoritosBtn() {
    if(btnFavActive == 0){
        btnFavActive = 1;
    }else{
        btnFavActive = 0;
    }
    getDatos();
}

function paramCode(des_lat, des_top, id, nombre, logo, tipo) {
    let code = ``;
    let parte1 = `
        <div class="sec_btn_cc" style="left:${des_lat}%; top:${des_top}%;">
            <a href="../tiendas/InfoTiendas.html" onclick="setId(${id})" class="btn cc" style="background-image:url('${logo}')">
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
    if(tipo == "Favorito"){
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
    let data = dataAllTiendas;
    let dataFavs = dataTiendasFavs;
    let code= "";
    let des_lat = 5;
    let des_top= 0;
    let fila = 0;
    let conteo = 0;
    let ids =  [];
    for (let i = 0; i < dataFavs.length; i++) {
        ids.push(dataFavs[i].id_Tienda);
    }

    //Si esta seleccionada la opcion de "Favoritos"
    if(btnFavActive == 1){
        let sec = document.getElementById("sec_opc_tipo");
        sec.style.width = "20%";
        sec.style.left = "10%";
        sec = document.getElementById("btn_fav");
        sec.style.backgroundColor = "#3ebdbb";
        for (let i = 0; i < data.length; i++) {
            if (conteo % 4 == 0 && conteo != 0) {
                des_lat = 5;
                fila += 1;
                des_top += 55;
            }
            if (ids.includes(data[i].id)) {
                code += paramCode(des_lat, des_top, data[i].id, data[i].nombre, data[i].logo, "Sec_Favoritos");
                conteo++;
                des_lat += 23;
            }
        }
    }
    //Si no esta seleccionada la opcion de "Favoritos"
    else {
        let sec = document.getElementById("sec_opc_tipo");
        sec.style.width = "10%";
        sec.style.left = "15%";
        sec = document.getElementById("btn_fav");
        sec.style.backgroundColor = "#bcbcbc";
        //Recorrer la data de centros comerciales
        for (let i = 0; i < data.length; i++) {
            if (conteo % 4 == 0 && conteo != 0) {
                des_lat = 5;
                fila += 1;
                des_top += 55;
            }
            //CC favorito
            if (ids.includes(data[i].id)) {
                code += paramCode(des_lat, des_top, data[i].id, data[i].nombre, data[i].logo, "Favorito");
            }
            //CC
            else {
                code += paramCode(des_lat, des_top, data[i].id, data[i].nombre, data[i].logo, "Tienda");
            }
            conteo++;
            des_lat += 23;
        }
    }
    //Anexar el codigo en la seccion dada en HTML
    $("#grid").html(code);
}

function setId(id) {
    window.localStorage.setItem('id', id);
}