$('document').ready(function (){
    getId();
});

//import {datoId} from "../js/funcionesListaCC.js";
//var prueba = datoId;


function getId(){
    $.ajax({
        //url: `/api/CC/${id}`,
        url: "/api/CC/getId",
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

function getInfo(id){
    $.ajax({
        //url: `/api/CC/${id}`,
        url: "/api/CC/"+id,
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            paintInfo(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(id);
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

function paintInfo(data){
    let code= "";
    let des_lat = 5;
    let des_top= 55;
    let fila = 0;
    let conteo = 0;



    $("#data").html(code);
}