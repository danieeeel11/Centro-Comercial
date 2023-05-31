/*$('document').ready(function (){
    getNovedad();
});*/

let dataNovedades = [];
let dataAllCentrosComerciales = [];

function getNovedadSlider(){
    $.ajax({
        url: '/api/Novedades/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            dataNovedades = data;
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
            dataAllCentrosComerciales = data;
            paintSlider();
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}

function paintSlider(){
    let code= "";
    let htmlFotos = [];
    for (let i = 0; i < dataNovedades.length; i++) {
        let nombreCC = searchIdCC(dataNovedades[i].id_cc);
        htmlFotos.push(
            `<p style="bottom: 80%; width: 20%; height: 10%; font-size: 20px; left: 2%;">${nombreCC}</p>
             <img src="${dataNovedades[i].imagen}" alt="">
             <p><br>${dataNovedades[i].titular.toUpperCase()}</p>
        `);
    }
    $("#insertImage1").html(htmlFotos[3]);
    $("#insertImage2").html(htmlFotos[2]);
    $("#insertImage3").html(htmlFotos[1]);
    $("#insertImage4").html(htmlFotos[0]);
    $("#insertImage5").html(htmlFotos[4]);
    $("#insertImage6").html(htmlFotos[5]);
    $("#insertImage7").html(htmlFotos[6]);
    $("#insertImage8").html(htmlFotos[7]);
    $("#insertImage9").html(htmlFotos[8]);
    $("#insertImage10").html(htmlFotos[9]);
    $("#insertImage11").html(htmlFotos[10]);
    $("#insertImage12").html(htmlFotos[11]);
}

function searchIdCC(id) {
    let nameCC = "";
    for (let i = 0; i < dataAllCentrosComerciales.length; i++) {
        if(dataAllCentrosComerciales[i].id == id){
            nameCC = dataAllCentrosComerciales[i].nombre;
        }
    }
    return nameCC;
}