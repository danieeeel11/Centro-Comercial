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
    }
    $("#grid").html(code);
}

function setId(id){
    window.localStorage.setItem('id',id);
}