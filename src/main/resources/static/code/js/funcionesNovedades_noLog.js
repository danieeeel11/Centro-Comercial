$('document').ready(function (){
    getNovedad();
});

let dataAllCC = [];
let dataNovedad = [];
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
            paintNovedad();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

function paintNovedad(){
    let r = dataNovedad;
    let d="";
    for(let i=0;i<r.length;i++){
        d += `
            <div class="noticia">
                <div class="contenido">
                    <h2>${r[i].titular}</h2>
                    <p class="name_cc">${searchIdCC(r[i].id_cc)}</p>
                    <p class="descripcion_noti">${r[i].noticia}</p>
                    <p class="fecha_publi">${calcular_tiempo(r[i].tiempo_pub)}</p>
                </div>
                <img class="container" src="${r[i].imagen}">
            </div>
            <br>
        `;
    }
    secciones = document.getElementsByClassName('noticia'); //nuevo
    nombresCC = document.getElementsByClassName('name_cc'); //nuevo
    console.log(nombresCC);
    $("#grid").html(d);
}

function calcular_tiempo(publicacion) {
    //1000*60*60*24 ->milisegundos->segundos->minutos->horas->dias
    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);

    var fechaInicio = new Date(publicacion).getTime();
    var fechaFin    = hoy.getTime();

    var lapso_aux = fechaFin - fechaInicio;
    var lapso = Math.round(lapso_aux/(1000*60*60*24)); //dias

    //Si es el mismo dia
    if(lapso == 0){
        lapso = Math.round(lapso_aux/(1000*60*60)); //horas
        //Si es la misma hora
        if(lapso == 0){
            lapso = Math.round(lapso_aux/(1000*60)); //minutos
            return "Hace " + lapso + " minutos";
        }
        return "Hace " + lapso + " horas";
    }
    return "Hace " + lapso + " dias";
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