$('document').ready(function (){
    getCC();
});

function getCC(){
    $.ajax({
        url: '/api/CC/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            paintCC(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}
/*function saveGame(){

    let game={
        name:$("#gameName").val(),
        price:$("#gamePrice").val(),
        launchYear:$("#gameLaunchYear").val(),
        linkImage:$("#gameImage").val()
    }
    let dataToSend=JSON.stringify(game);
    $.ajax({
        url: 'api/games/save',
        type:'POST',
        data: dataToSend,
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            getGames();

            $("#gameName").val("");
            $("#gamePrice").val("");
            $("#gameLaunchYear").val("");
            $("#gameImage").val("");


        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}*/


function paintCC(data){
    let code= "";
    let des_lat = 5;
    let des_top= 55;
    let fila = 0;
    let conteo = 0;
    for(let i=0;i<data.length;i++){
        if(conteo%4==0 && conteo!=0){
            des_lat=5;
            fila=1;
        }
        if(fila == 0){
            //onclick="saveId(${data[i].id})"
            code += `
                <a onclick="getBuscar(${data[i].id})" class="btn cc" style="left:${des_lat}%;background-image:url('${data[i].logo}')">
                    <p class='txt_btn_cc'> ${data[i].nombre} </p>
                    <button id="${data[i].nombre}" class="btn star_cc" onclick="addFav('${data[i].nombre}')"></button>
                </a>`;
            conteo++;
            des_lat += 23;
        }else if(fila==1) {
            code += `
                <a href="../lista/infoCC.html" class="btn cc" style="left:${des_lat}%;top:${des_top}%;background-image:url('${data[i].logo}')">
                    <p class='txt_btn_cc'> ${data[i].nombre} </p>
                    <button id="${data[i].nombre}" class="btn star_cc" onclick="addFav('${data[i].nombre}')"></button>
                </a>`;
            conteo++;
            des_lat += 23;
        }
    }
    $("#grid").html(code);
}

let datoId = 0;
function saveId(id){
    datoId = id;
    console.log(datoId + 'rffrf');
}
//export { datoId };


function getBuscar(dato){
    $.ajax({
        //url: `/api/CC/${id}`,
        url: "/api/CC/"+dato,
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + dato + ' ' + errorThrown);
        }
    });

}

var estado = 0;
function addFav(name){
    console.log(name);
    let sec = document.getElementById(name);
    //console.log(sec);
    //const star = sec.querySelector("btn.star_cc");
    if(estado==0){
        sec.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Estrella_amarilla.png/2048px-Estrella_amarilla.png')";
        estado = 1;
    }else{
        sec.style.backgroundImage = "url('https://cdn-icons-png.flaticon.com/512/16/16666.png')";
        estado = 0;
    }
}