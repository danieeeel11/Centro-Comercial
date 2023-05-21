$('document').ready(function (){
    getNovedad();
});

let dataAllCC = [];
let dataCCFavs = [];
let dataNovedad = [];
let btnFavActive = 0;
let secciones = []; //nuevo
let nombresCC = []; //nuevo

function getNovedad(){
    $.ajax({
        url: '/api/Novedades/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            dataNovedad  = data;
            getCC();
            //paintNovedad(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
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
            paintNovedad();
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
    paintNovedad();
}

function paintNovedad(){
    let r = dataNovedad;
    let d="";
    for(let i=0;i<r.length;i++){
        //si se selecciona el boton de favorito
        if(btnFavActive == 1){
            let sec = document.getElementById("sec_opc_tipo");
            sec.style.width = "20%";
            sec.style.left = "10%";
            sec = document.getElementById("btn_fav");
            sec.style.backgroundColor = "#3ebdbb";
            for (let j = 0; j < dataCCFavs.length; j++) {
                if(r[i].id_cc == dataCCFavs[j].id_CC){
                    d += `
                        <div class="noticia">
                            <div class="contenido">
                                <h2>${r[i].titular}</h2>
                                <p class="name_cc">${searchIdCC(r[i].id_cc)}</p>
                                <p>${r[i].noticia}</p>
                                <p>${r[i].tiempo_pub}</p>
                            </div>
                            <!--<div class="container">-->
                                <img class="container" src="${r[i].imagen}">
                            <!--</div>-->
                        </div>
                        <br>
                    `;
                }
            }
        }
        else{
            let sec = document.getElementById("sec_opc_tipo");
            sec.style.width = "10%";
            sec.style.left = "15%";
            sec = document.getElementById("btn_fav");
            sec.style.backgroundColor = "#bcbcbc";
            d += `
                <div class="noticia">
                    <div class="contenido">
                        <h2>${r[i].titular}</h2>
                        <p class="name_cc">${searchIdCC(r[i].id_cc)}</p>
                        <p>${r[i].noticia}</p>
                        <p>${r[i].tiempo_pub}</p>
                    </div>
                    <!--<div class="container">-->
                        <img class="container" src="${r[i].imagen}">
                    <!--</div>-->
                </div>
                <br>
                <!--<div class='h-line'></div>-->
            `;
        }
    }
    secciones = document.getElementsByClassName('noticia'); //nuevo
    nombresCC = document.getElementsByClassName('name_cc'); //nuevo
    console.log(nombresCC);
    $("#grid").html(d);
}

function searchIdCC(id) {
    let nameCC = "";
    for (let i = 0; i < dataAllCC.length; i++) {
        if(dataAllCC[i].id == id){
            nameCC = dataAllCC[i].nombre;
        }
    }
    return nameCC;
}

function busqueda(){ //nuevo
    let input = document.getElementById('name').value;
    input = input.toLowerCase();
    let data = secciones;
    //let index = 0;
    for (let i = 0; i < data.length; i++) {
        if (!nombresCC[i].innerHTML.toLowerCase().includes(input)) {
            data[i].style.display = "none";
        }
        else {
            //x[i].style.display="list-item";
            data[i].style.display = "list-item";
        }
    }
}
