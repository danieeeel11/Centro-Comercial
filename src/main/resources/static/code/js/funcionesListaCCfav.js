$('document').ready(function (){
    getCCfavs();
});

function getCCfavs(){
    $.ajax({
        url: '/api/Favoritos/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(dataFavs) {
            // Aquí procesamos los datos obtenidos
            console.log(dataFavs);
            getCC(dataFavs);
            /*paintCCfav(dataFavs);*/
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });
}
function getCC(dataFavs){
    $.ajax({
        url: '/api/CC/all',
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            paintCCfav(data,dataFavs);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + errorThrown);
        }
    });

}
function getId(dato){
    $.ajax({
        url: "/api/CC/"+dato,
        type:'GET',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        success: function(data) {
            // Aquí procesamos los datos obtenidos
            console.log(data);
            window.localStorage.setItem('datoCC',data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Aquí manejamos cualquier error que pueda haber ocurrido
            console.log(textStatus + ': ' + dato + ' ' + errorThrown);
        }
    });
}

function paintCCfav(data, dataFavs){
    let code= "";
    let des_lat = 5;
    let des_top= 55;
    let fila = 0;
    let conteo = 0;
    /*let data = dataCC;
    for (let i = 0; i < id.length; i++) {
        getId(id[i].id_CC);
    }
    console.log(data);*/
    /*let data = id;*/
    for(let j=0;j<dataFavs.length;j++){
        for(let i=0;i<data.length;i++){
            if(dataFavs[j].id_CC == data[i].id){
                /*getId(id[i].id_CC);
                console.log(window.localStorage.getItem('datoCC'));
                let data = window.localStorage.getItem('datoCC');
                window.localStorage.removeItem('datoCC');*/
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
                            
                        </div>`;
                    conteo++;
                    des_lat += 23;
                }else if(fila==1) {
                    code += `
                        <div class="sec_btn_cc" style="left:${des_lat}%;top:${des_top}%;">
                            <a href="../lista/infoCC.html" onclick="setId(${data[i].id})" class="btn cc" style="background-image:url('${data[i].logo}')">
                                <p class='txt_btn_cc'> ${data[i].nombre} </p>
                            </a>
                            
                        </div>`;
                    conteo++;
                    des_lat += 23;
                }
            }
        }
    }
    $("#grid").html(code);
}
function setId(id){
    window.localStorage.setItem('id',id);
}