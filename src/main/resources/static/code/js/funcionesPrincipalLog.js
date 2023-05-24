$('document').ready(function (){
    //getCliente();
    getNovedad();
});
let nameCliente = window.localStorage.getItem('name_Cliente');

let dataAllCC = [];
let dataCCFavs = [];
let dataNovedad = [];
let dataCuenta = [];
let conteo_noti = 0;
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
            dataCCFavs = dataFavs;
            //ventana_notificaciones();
            getCuenta();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

function getCuenta(){
    let id_Cliente = localStorage.getItem('id_Cliente');
    $.ajax({
        url: '/api/Cliente/'+id_Cliente,
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            dataCuenta = data;
            getCliente();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

function getCliente(){
    /*${window.localStorage.getItem('name_Cliente')}*/
    let code = `Bienvenido ${nameCliente}`;
    console.log(localStorage.getItem('id_Cliente'));
    $("#saludo").html(code);

    //let conteo_noti = 0;
    for (let i = 0; i < dataNovedad.length; i++) {
        for (let j = 0; j < dataCCFavs.length; j++) {
            if (dataNovedad[i].id_cc == dataCCFavs[j].id_CC) {
                conteo_noti++;
            }
        }
    }

    if (conteo_noti>0){
        code = `
            <div class="circulo_noti">
                <p class="num_noti">${conteo_noti}</p>
            </div>
        `;
        console.log(conteo_noti);
        $("#btn_campana").html(code);
    }
}

function removeCliente() {
    window.localStorage.setItem('name_Cliente',null);
    window.localStorage.setItem('id_Cliente',null);
}

//let background_color_init = "";

function ventana_notificaciones() {
    let sec_contenido = document.getElementById('content');
    //sec_contenido.style.display = "block";
    sec_contenido.style.pointerEvents = "none";
    //sec_contenido.style.filter = "blur(4px)";
    background_color_init = document.body.style.backgroundColor + "";
    document.body.style.backgroundColor = "#808080";
    sec_contenido.style.filter = "opacity(5%)";

    let sec_notificaciones = document.getElementById("sec_noti");
    sec_notificaciones.style.display = "block";

    if (conteo_noti>0) {
        let code = "";
        for (let i = 0; i < dataNovedad.length; i++) {
            for (let j = 0; j < dataCCFavs.length; j++) {
                if (dataNovedad[i].id_cc == dataCCFavs[j].id_CC) {

                    code += `
                    <div class="sec_noti_indi">
                        <div class="sec_tit_novedad">
                            <p class="tit_novedad">${dataNovedad[i].titular}</p>
                        </div>
                        <div class="sec_fecha_novedad">
                            <p class="cc_novedad">${searchIdCC(dataNovedad[i].id_cc)}</p>
                            <p class="fecha_novedad">${calcular_tiempo(dataNovedad[i].tiempo_pub)}</p>
                        </div>
                    </div>
                `;
                }
            }
        }
        $("#sec_noti_grid").html(code);
    }else{
        let code = "";
        code = `
                    <p class="no_noti">
                        <br><br>
                        Agrega centros comerciales a favoritos
                        <br>
                        para recibir notificaciones.
                    </p>
        `;
        $("#sec_noti_grid").html(code);
    }
}

function calcular_tiempo(publicacion) {

    //1000*60*60*24 ->milisegundos->segundos->minutos->horas->dias
    let tiempoTranscurrido = Date.now();
    let hoy = new Date(tiempoTranscurrido);

    var fechaInicio = new Date(publicacion).getTime();
    var fechaFin    = hoy.getTime();
    console.log(fechaInicio);
    console.log(fechaFin);
    var lapso_aux = fechaFin - fechaInicio;
    var lapso = Math.round(lapso_aux/(1000*60*60*24)); //dias
    console.log(lapso);
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

function ventana_notificaciones_close(){
    let sec_notificaciones = document.getElementById("sec_noti");
    sec_notificaciones.style.display = "none";

    let sec_contenido = document.getElementById('content');
    //sec_contenido.style.display = "block";
    sec_contenido.style.pointerEvents = "initial";
    //sec_contenido.style.filter = "blur(0px)";

    //document.body.style.backgroundColor = "transparent";
    document.body.style.backgroundColor = background_color_init;
    sec_contenido.style.filter = "opacity(100%)";
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

function ventana_perfil() {
    let sec_contenido = document.getElementById('content');
    //sec_contenido.style.display = "block";
    sec_contenido.style.pointerEvents = "none";
    //sec_contenido.style.filter = "blur(4px)";
    background_color_init = document.body.style.backgroundColor + "";
    document.body.style.backgroundColor = "#808080";
    sec_contenido.style.filter = "opacity(5%)";

    let sec_perfil = document.getElementById("sec_perfil");
    sec_perfil.style.display = "block";

    let user = "";
    user = `@${dataCuenta.usuario}`;
    $("#user_perfil").html(user);

}

function ventana_perfil_close() {
    let sec_contenido = document.getElementById('content');
    sec_contenido.style.pointerEvents = "initial";
    //sec_contenido.style.filter = "blur(0px)";

    //document.body.style.backgroundColor = "transparent";
    document.body.style.backgroundColor = background_color_init;
    sec_contenido.style.filter = "opacity(100%)";

    let sec_perfil = document.getElementById("sec_perfil");
    sec_perfil.style.display = "none";
}