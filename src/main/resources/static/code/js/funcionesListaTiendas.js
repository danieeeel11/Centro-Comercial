$('document').ready(function (){
    getDatos();
});

let dataAllCC = [];
let dataAllTiendas = [];
let dataTiendasFavs = [];
let btnCategoriaActive = 0;
let btnFavActive = 0;
let secciones = [];
let nombresTiendas = [];
let atributosPos = [];

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
            //paintCC();
            getCC();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        }
    });
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
    atributosPos.push([des_lat + '%', des_top + '%']);
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
        sec.style.backgroundColor = "#ccbd13";
        for (let i = 0; i < data.length; i++) {
            if (ids.includes(data[i].id)) {
                if (conteo % 4 == 0 && conteo != 0) {
                    des_lat = 5;
                    fila += 1;
                    des_top += 55;
                }
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
        sec.style.backgroundColor = "#ffffff";
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
    secciones = document.getElementsByClassName('sec_btn_cc');
    nombresTiendas = document.getElementsByClassName('txt_btn_cc');
    //Anexar el codigo en la seccion dada en HTML
    $("#grid").html(code);
}

function busqueda(){ //nuevo
    let input = document.getElementById('name').value;
    input = input.toLowerCase();
    let data = secciones;
    let index = 0;
    for (let i = 0; i < data.length; i++) {
        if (!nombresTiendas[i].innerHTML.toLowerCase().includes(input)) {
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

function setId(id) {
    window.localStorage.setItem('id_cc', id);
}

function ventana_categorias(){
    //para que se bloquee el contenido
    let sec_contenido = document.getElementById("content");
    sec_contenido.style.pointerEvents = "none";
    background_color_init = document.body.style.backgroundColor + "";
    document.body.style.backgroundColor = "#808080";
    sec_contenido.style.filter = "opacity(5%)";
    //para que aparezca la ventana de categorias
    let sec_categorias = document.getElementById("sec_categorias");
    sec_categorias.style.display = "block";

    let categorias = [];
    for (let i = 0; i < dataAllTiendas.length; i++) {
        if(!categorias.includes(dataAllTiendas[i].tipo_productos)){
            categorias.push(dataAllTiendas[i].tipo_productos);
        }
    }

    let code = "";
    for (let i = 0; i < categorias.length; i++) {
        let tipo = categorias[i];
        code +=  `
            <div class = "sec_btn_categoria">
                <a onclick="filtro_categoria('${tipo}')" class = "btn_categoria">
                    <p class = "txt_btn_categoria">${categorias[i]}</p>
                </a>
            </div>
        `;
    }
    $("#sec_btn_grid").html(code);
}
function ventana_categorias_close(){
    //Es para que el contenido de la pantalla vuelva a ser accesible
    let sec_contenido = document.getElementById("content");
    sec_contenido.style.pointerEvents = "initial";
    document.body.style.backgroundColor = background_color_init;
    sec_contenido.style.filter = "opacity(100%)";
    //para que desaparezca la ventana categorias
    let sec_categorias = document.getElementById("sec_categorias");
    sec_categorias.style.display = "none";
}

//---------------------------------------------------------------------------------------------------------

function filtro_categoria(tipo) {
    let data = secciones;
    let index = 0;
    console.log(tipo);
    let tipos = [];
    for (let i = 0; i < nombresTiendas.length; i++) {
        for (let j = 0; j < dataAllTiendas.length; j++) {
            if (nombresTiendas[i].innerHTML.toLowerCase().includes(dataAllTiendas[j].nombre.toLowerCase())){
                tipos.push(dataAllTiendas[j].tipo_productos);
            }
        }
    }
    if(tipo == "general"){
        for (let i = 0; i < data.length; i++) {
            data[i].style.display = "initial";
            data[i].style.left = atributosPos[index][0];
            data[i].style.top = atributosPos[index][1];
            index++;
        }
    }else{
        for (let i = 0; i < data.length; i++) {
            if (tipos[i] != tipo) {
                data[i].style.display = "none";
            } else {
                data[i].style.display = "initial";
                data[i].style.left = atributosPos[index][0];
                data[i].style.top = atributosPos[index][1];
                index++;
            }
        }
    }
}

// ------------------------------------------------------------------------------------------------------------

function ventana_cc(){
    //para que se bloquee el contenido
    let sec_contenido = document.getElementById("content");
    sec_contenido.style.pointerEvents = "none";
    background_color_init = document.body.style.backgroundColor + "";
    document.body.style.backgroundColor = "#808080";
    sec_contenido.style.filter = "opacity(5%)";
    //para que aparezca la ventana de categorias
    let sec_cc = document.getElementById("sec_cc");
    sec_cc.style.display = "block";

    let cc = [];
    for (let i = 0; i < dataAllCC.length; i++) {
        cc.push(dataAllCC[i].nombre);
    }

    let code = "";
    for (let i = 0; i < cc.length; i++) {
        let tipo = cc[i];
        code +=  `
            <div class = "sec_btn_categoria">
                <a onclick="filtro_cc('${tipo}')" class = "btn_categoria">
                    <p class = "txt_btn_categoria">${cc[i]}</p>
                </a>
            </div>
        `;
    }
    $("#sec_btn_grid2").html(code);
}
function ventana_cc_close(){
    //Es para que el contenido de la pantalla vuelva a ser accesible
    let sec_contenido = document.getElementById("content");
    sec_contenido.style.pointerEvents = "initial";
    document.body.style.backgroundColor = background_color_init;
    sec_contenido.style.filter = "opacity(100%)";
    //para que desaparezca la ventana categorias
    let sec_cc = document.getElementById("sec_cc");
    sec_cc.style.display = "none";
}

//---------------------------------------------------------------------------------------------------------

//tipo es el nombre del centro comercial al que le de click
function filtro_cc(tipo) {
    let data = secciones;
    let index = 0;
    console.log(tipo);
    let cc = [];
    //recorre el nombre de las tiendas que se estan mostrando por pantalla
    for (let i = 0; i < nombresTiendas.length; i++) {
        //recorre las tiendas que estan en la base de datos
        for (let j = 0; j < dataAllTiendas.length; j++) {
            //si el nombre de la tienda esta en la base de datos
            if (nombresTiendas[i].innerHTML.toLowerCase().includes(dataAllTiendas[j].nombre.toLowerCase())){
                //Añade la lista de los ids de los centros comerciales en los que esta esta tienda
                cc.push(dataAllTiendas[j].id_cc);
            }
        }
    }
    //id_cc, variable que guarde el id del centro comercial al que le dimos click
    let id_cc = 0;
    //Recorre los centros comerciales que esta en la base de datos
    for (let i = 0; i < dataAllCC.length; i++) {
        if (dataAllCC[i].nombre == tipo){
            id_cc = dataAllCC[i].id;
        }
    }
    //general - volver a mostrar todos los datos de la pantalla
    if(tipo == "general"){
        for (let i = 0; i < data.length; i++) {
            data[i].style.display = "initial";
            data[i].style.left = atributosPos[index][0];
            data[i].style.top = atributosPos[index][1];
            index++;
        }
    }
    // se encarga de ocultar las tiendas
    else{
        for (let i = 0; i < data.length; i++) {
            if (!cc[i].includes(id_cc)) {
                data[i].style.display = "none";
            } else {
                data[i].style.display = "initial";
                data[i].style.left = atributosPos[index][0];
                data[i].style.top = atributosPos[index][1];
                index++;
            }
        }
    }
}

// ------------------------------------------------------------------------------------------------------------
